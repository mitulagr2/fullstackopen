import { State } from "./state";
import { Entry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
    type: "ADD_PATIENT_ENTRY";
    payload: {
      entry: Entry,
      id: string
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT_ENTRY":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: state.patients[action.payload.id].entries.concat(action.payload.entry)
          }
        }
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi : Patient[]) : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient : Patient) : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const addPatientEntry = (newPatientEntry : {entry: Entry, id: string}) : Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload: newPatientEntry
  };
};