import { Dialog, DialogTitle, DialogContent, Divider } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddPatientEntryForm, { PatientEntryFormValues } from "./AddPatientEntryForm";
import { Diagnosis } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientEntryFormValues) => void;
  error?: string;
  allDiagnoses: Diagnosis[];
}

const AddPatientEntryModal = ({ modalOpen, onClose, onSubmit, error, allDiagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient entry</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddPatientEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={allDiagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddPatientEntryModal;
