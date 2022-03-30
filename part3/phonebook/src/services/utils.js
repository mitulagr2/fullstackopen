import personsService from "./services/persons";

const utils = {
  formatError: (err) => err.substring(err.lastIndexOf(":") + 1),
  updateSuccessful: (persons, newName, newNumber) => {
    for (let person of persons) {
      if (person.name.toLowerCase() === newName.toLowerCase()) {
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
  },
};

export default utils;
