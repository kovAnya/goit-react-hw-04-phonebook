import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { RootEl } from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const onFormSubmit = evt => {
    evt.preventDefault();
    const contactName = evt.currentTarget.elements.name.value;
    const contactPhone = evt.currentTarget.elements.number.value;

    if (searchForDublicate(contactName)) {
      evt.currentTarget.reset();
      return alert(`${contactName} is already in contacts.`);
    }

    setContacts(prevState => {
      return [
        ...prevState,
        {
          id: nanoid(),
          name: contactName,
          number: contactPhone,
        },
      ];
    });

    evt.currentTarget.reset();
  };

  const searchForDublicate = searchedName => {
    return contacts.some(contact => contact.name === searchedName);
  };

  const onFilterChange = event => {
    const filterValue = event.target.value;
    setFilter(filterValue);
  };

  const onDelete = evt => {
    const nameToRemove = evt.currentTarget.dataset.name;
    setContacts(prevState => {
      return prevState.filter(contact => contact.name !== nameToRemove);
    });
  };

  useEffect(() => {
    const contactsFromStoridge = JSON.parse(localStorage.getItem('CONTACTS'));

    if (contactsFromStoridge) {
      setContacts(contactsFromStoridge);
    }
  }, []);

  useEffect(() => {
    if (contacts.length === 0) {
      return;
    }

    localStorage.setItem('CONTACTS', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <RootEl>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilter={onFilterChange} />
      <ContactList
        contacts={contacts}
        filterValue={filter}
        onDelete={onDelete}
      />
    </RootEl>
  );
};
