import express from 'express';
import { toNewPatient, toNewPatientEntry } from '../utils';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const NewPatient = toNewPatient(req.body);

    const addedEntry = patientService.addPatient(NewPatient);
    
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewPatientEntry(req.body);
  
      const addedEntry = patientService.addPatientEntry(patient, newEntry);
      
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  } else {
    res.sendStatus(404);
  }
});

export default router;