import React from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { RootEl } from './App.styled';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    const contactName = evt.currentTarget.elements.name.value;
    const contactPhone = evt.currentTarget.elements.number.value;

    if (this.searchForDublicate(contactName)) {
      evt.currentTarget.reset();
      return alert(`${contactName} is already in contacts.`);
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: contactName,
            number: contactPhone,
          },
        ],
      };
    });

    evt.currentTarget.reset();
  };

  searchForDublicate = searchedName => {
    return this.state.contacts.some(contact => contact.name === searchedName);
  };

  onFilterChange = event => {
    const filterValue = event.target.value;
    this.setState({ filter: filterValue });
  };

  onDelete = evt => {
    const nameToRemove = evt.currentTarget.dataset.name;
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.name !== nameToRemove
        ),
      };
    });
  };

  componentDidMount() {
    const contactsFromStoridge = JSON.parse(localStorage.getItem('CONTACTS'));

    if (contactsFromStoridge) {
      this.setState({ contacts: contactsFromStoridge });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts === prevState.contacts) {
      return;
    }
    localStorage.setItem('CONTACTS', JSON.stringify(this.state.contacts));
  }

  render() {
    return (
      <RootEl>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter value={this.state.filter} onFilter={this.onFilterChange} />
        <ContactList
          contacts={this.state.contacts}
          filterValue={this.state.filter}
          onDelete={this.onDelete}
        />
      </RootEl>
    );
  }
}
