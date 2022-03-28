import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import "./styles/index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newFilter, setNewFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notif, setNotif] = useState({});

  const personsToShow = persons.filter(({ name }) =>
    name.toLowerCase().includes(newFilter.toLowerCase())
  );

  useEffect(() => {
    personsService.getAll().then((allPersons) => setPersons(allPersons));
  }, []);

  const formatError = (err) => err.substring(err.lastIndexOf(":") + 1);

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (updatePerson()) return;
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then((returnedPerson) => {
        setNotif({
          type: "success",
          message: `Added ${returnedPerson.name}`,
        });
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setTimeout(() => {
          setNotif({ ...notif, type: null });
        }, 5000);
      })
      .catch((err) => {
        setNotif({
          type: "error",
          message: formatError(err.response.data.error),
        });
        setTimeout(() => {
          setNotif({ ...notif, type: null });
        }, 5000);
      });
  };

  const updatePerson = () => {
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personsService
            .update(person.id, {
              ...person,
              number: newNumber,
            })
            .then((updatedPerson) => {
              setPersons(
                persons.map((curPerson) =>
                  curPerson.id === person.id ? updatedPerson : curPerson
                )
              );
              setNewName("");
              setNewNumber("");
              setNotif({
                type: "success",
                message: `Changed ${updatedPerson.name} to ${updatedPerson.number}`,
              });
              setTimeout(() => {
                setNotif({ ...notif, type: null });
              }, 5000);
            })
            .catch((err) => {
              setNotif({
                type: "error",
                message: formatError(err.response.data.error),
              });
              setTimeout(() => {
                setNotif({ ...notif, type: null });
              }, 5000);
            });
        }
        return true;
      }
    }
  };

  const deletePerson = (id) => {
    const thisPerson = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${thisPerson.name} ?`))
      personsService
        .delete(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch(() => {
          setNotif({
            type: "error",
            message: `Information of ${thisPerson.name} has already been removed from server`,
          });
          setTimeout(() => {
            setNotif({ ...notif, type: null });
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif} />
      <Filter filter={newFilter} handleChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        handleAdd={addPerson}
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <PersonList toShow={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
