import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EntryDetails from "../components/EntryDetails";
import { Box, Button, Typography } from "@material-ui/core";

import { PatientEntryFormValues } from "../AddPatientEntryModal/AddPatientEntryForm";
import AddPatientEntryModal from "../AddPatientEntryModal";
import { apiBaseUrl } from "../constants";
import { Diagnosis, Entry, Patient } from "../types";
import { useStateValue, addPatientEntry } from "../state";

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [diagnosisDetails, setDiagnosisDetails] = useState<Array<Diagnosis>>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const { id } = useParams<{ id: string }>();
  let patient : Patient | undefined;

  for (const key in patients) {
    if (key === id) {
      patient = patients[key];
    }
  }

  React.useEffect(() => {
    const fetchDiagnosisDetails = async () => {
      try {
        const { data: allDiagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        setDiagnosisDetails(allDiagnoses);
      } catch (e) {
        console.error(e);
      }
    };
    void fetchDiagnosisDetails();
  }, []);

  if (!patient) {
    return <div>loading...</div>;
  }

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatientEntry = async (values: PatientEntryFormValues) => {
    try {
      const { data: newPatientEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      // eslint-disable-next-line
      const payload : { entry: Entry, id: any } = {entry: newPatientEntry, id};
      dispatch(addPatientEntry(payload));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data?.error) || "Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      <br/>
      <Box>
        <Typography variant="h4">
          {patient.name}
        </Typography>
        <Typography variant="h6">
          {patient.gender}
        </Typography>
        <p>
          ssn: {patient.ssn}
        </p>
        <p>
          occupation: {patient.occupation}
        </p>
      </Box>
      <h3>entries</h3>
      {patient.entries.map(entry => 
        <React.Fragment key={entry.id}>
          <EntryDetails entry={entry} />
          <ul>
            {entry.diagnosisCodes?.map(code => 
              <li key={code}>
                {code}{" "}
                {diagnosisDetails?.find(diagnosis => diagnosis.code === code)?.name}
              </li>
            )}
          </ul>
        </React.Fragment>
      )}
      <AddPatientEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
        allDiagnoses={diagnosisDetails}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
