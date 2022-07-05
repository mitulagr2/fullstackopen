import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { SelectField } from "./FormField";
import { Diagnosis, HealthCheckRating, NewEntry, typeType } from "../types";

export type PatientEntryFormValues = Omit<NewEntry, 'id'>;

interface Props {
  onSubmit: (values: PatientEntryFormValues) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const typeOptions : {value: typeType, label: string}[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const ratingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

export const AddPatientEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  return (
    <Formik
      initialValues={{
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [""],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
        discharge: {
          date: "",
          criteria: ""
        },
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        }
      }}
      onSubmit={() => {return;}}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        switch (values.type) {
          case "HealthCheck":
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
            break;
          case "Hospital":
            if (!values.discharge.date) {
              errors.discharge = requiredError;
            }
            if (!values.discharge.criteria) {
              errors.discharge = requiredError;
            }
            break;
          case "OccupationalHealthcare":
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (!values.sickLeave?.startDate) {
              errors.sickLeave = requiredError;
            }
            if (!values.sickLeave?.endDate) {
              errors.sickLeave = requiredError;
            }
        }
        return errors;
      }}
    >
      {({ dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === "HealthCheck"
              ?
                <SelectField label="Rating" name="healthCheckRating" options={ratingOptions} />
              : values.type === "Hospital"
              ?
                <>
                  <Field
                    label="Discharge date"
                    placeholder="YYYY-MM-DD"
                    name="discharge.date"
                    component={TextField}
                  />
                  <Field
                    label="Discharge criteria"
                    placeholder="Discharge Criteria"
                    name="discharge.criteria"
                    component={TextField}
                  />
                </>
              :
                <>
                  <Field
                    label="Employer name"
                    placeholder="Employer Name"
                    name="employerName"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave start date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.startDate"
                    component={TextField}
                  />
                  <Field
                    label="Sick leave end date"
                    placeholder="YYYY-MM-DD"
                    name="sickLeave.endDate"
                    component={TextField}
                  />
                </>
            }
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  onClick={() => onSubmit(values)}
                  variant="contained"
                  disabled={!dirty}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientEntryForm;
