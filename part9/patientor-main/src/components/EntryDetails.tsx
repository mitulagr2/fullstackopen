import { HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Entry } from "../types";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <>
    <p>{entry.date} {entry.type}</p>
    <em>{entry.description}</em>
    Rating: {entry.healthCheckRating}/3
    <p>diagnose by {entry.specialist}</p>
  </>
);

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <>
    <p>{entry.date} {entry.type}</p>
    <em>{entry.description}</em>
    <p>diagnose by {entry.specialist}</p>
  </>
);

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <>
    <p>{entry.date} {entry.type}</p>
    <em>{entry.description}</em>
    <p>diagnose by {entry.specialist}, {entry.employerName}</p>
  </>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryDetails;