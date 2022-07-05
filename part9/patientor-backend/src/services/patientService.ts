import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, PublicPatient, Entry, EntryWithoutId, NewPatient } from '../types';

const getEntries = () : Array<Patient> => {
  return patients;
};

const getPublicEntries = () : PublicPatient[] => {
  return patients.map((patient) => {
    const newPatient = patient;
    delete newPatient.ssn;
    return newPatient
  });
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addPatient = (entry : NewPatient) : Patient => {
  const NewPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(NewPatient);
  return NewPatient;
};

const addPatientEntry = (patient: Patient, entry : EntryWithoutId) : Entry => {
  const NewEntry = {
    id: uuid(),
    ...entry
  };

  patient?.entries?.push(NewEntry);
  return NewEntry;
};

export default {
  getEntries,
  getPublicEntries,
  findById,
  addPatient,
  addPatientEntry
};