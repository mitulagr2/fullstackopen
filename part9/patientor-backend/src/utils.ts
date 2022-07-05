import { Diagnosis, Gender, EntryType, Entry, NewPatient, EntryWithoutId } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isNotEntry = (entry: any): entry is Entry => {
  return !["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(entry.type);
}

const isEntryType = (type: any): type is EntryType => {
  return ["HealthCheck", "Hospital", "OccupationalHealthcare"].includes(type);
}

const parseString = (param: unknown): string => {
  if (!param || !isString(param)) {
    throw new Error("Incorrect or missing: " + param);
  }

  return param;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }

  return gender;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || entries.some((entry: any) => isNotEntry(entry))) {
    throw new Error('Incorrect or missing entries');
  }

  return entries;
}

const parseType = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }

  return type;
}

const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
  if (diagnosisCodes.some((code: any) => !isString(code))) {
    throw new Error('Incorrect diagnosis codes');
  }

  return diagnosisCodes;
}

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown,
  entries: unknown
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  type: unknown;
  healthCheckRating?: any;
  discharge?: any;
  employerName?: any;
  sickLeave?: any;
};

export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries } : Fields)
    : NewPatient => {
  const newEntry: NewPatient = {
    name: parseString(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseString(ssn),
    gender: parseGender(gender),
    occupation: parseString(occupation),
    entries: parseEntries(entries)
  };

  return newEntry;
};

export const toNewPatientEntry = ({
      description,
      date,
      specialist,
      diagnosisCodes,
      type,
      healthCheckRating,
      discharge,
      employerName,
      sickLeave
    } : EntryFields) : EntryWithoutId => {
  const newEntry: EntryWithoutId = {
    description: parseString(description),
    date: parseDate(date),
    specialist: parseString(specialist),
    type: parseType(type),
    healthCheckRating,
    discharge,
    employerName,
    sickLeave
  }
  
  if(diagnosisCodes) {
    newEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  switch(type) {
    case "HealthCheck":
      if (!healthCheckRating) {
        throw new Error('Missing health check rating');
      }
      break;
    case "Hospital":
      if (!discharge) {
        throw new Error('Missing discharge field');
      }
      break;
    case "OccupationalHealthcare":
      if (!employerName) {
        throw new Error('Missing employer name');
      }
      if (!sickLeave) {
        throw new Error('Missing sick leave field');
      }
      break;
    default:
      throw new Error("Incorrect type: " + type);
  }

  return newEntry;
}