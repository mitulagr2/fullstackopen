import { useState, useEffect } from "react";
import personsService from "./services/persons";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import "./styles/index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notif, setNotif] = useState({});

  useEffect(() => {
    personsService.getAll().then((prevPersons) => {
      setPersons(prevPersons);
    });
  }, []);

  const handleAddPerson = (e) => {
    e.preventDefault();
    if (existingUser()) return;

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPerson).then((returnedPerson) => {
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
    });
  };

  const existingUser = () => {
    for (let i = 0; i < persons.length; ++i) {
      let curName = persons[i].name.toLowerCase();
      if (curName === newName.toLowerCase()) {
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          personsService
            .update(persons[i].id, {
              ...persons[i],
              number: newNumber,
            })
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== persons[i].id ? person : updatedPerson
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
            });
        }
        return true;
      }
    }
  };

  const handleDeletePerson = (id) => {
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

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };

  const personsToShow = persons.filter(({ name }) =>
    name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <PersonList
        personsToShow={personsToShow}
        handleDelete={handleDeletePerson}
      />
    </div>
  );
};

export default App;
