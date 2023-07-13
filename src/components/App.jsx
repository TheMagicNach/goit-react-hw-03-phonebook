import { Component } from "react";
import FormContact from './FormContact/FormContact'
import ContactList from "./ContactList/ContactList";
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import css from './App.module.css';


export class App extends Component {
    state = {
    contacts: [
      { id: 'id-1', name: 'Tom', number: ' 555-35-35' },
      { id: 'id-2', name: 'Jerry', number: ' 122-12-12' },
      { id: 'id-3', name: 'SJ', number: ' 222-24-42' },
      { id: 'id-4', name: 'Peter Parker', number: ' 227-91-26' },
      { id: 'id-5', name: 'Naruto', number: ' 124-2442' },
      { id: 'id-6', name: 'D.Luffy', number: ' 111111' },
      { id: 'id-7', name: 'Ви', number: ' 2444-123' },
    ],
      filter: '',
    
  };
    
  storageKey = 'contacts';
  
    componentDidMount() {
        const savedContacts = localStorage.getItem(this.storageKey);
        if (savedContacts) {
          this.setState({ contacts: JSON.parse(savedContacts) });
        }
      }

    componentDidUpdate(prevState) {
      const { contacts } = this.state;
      if (prevState.contacts !== contacts) {
        localStorage.setItem(this.storageKey, JSON.stringify(contacts));
      }
    }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };


  handleAddContact = newContact => {
    const { contacts } = this.state;
    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${newContact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

    handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };


  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );


    return (
      <div className={css.wraper} >
        <h1>Phonebook</h1>
        <FormContact contacts={contacts} onAddContact={this.handleAddContact}/>

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilterChange}/>
        <ContactList contacts={filteredContacts}
        onDeleteContact={this.handleDeleteContact} />
      </div>
    )
  }
}
App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};