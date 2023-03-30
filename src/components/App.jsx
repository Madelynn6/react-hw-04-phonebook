import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    const ifNameExist = this.state.contacts.some(
      el => el.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (ifNameExist) {
      alert(`${inputValue} is already in contacts.`);
    } else {
      this.setState(state => ({
        contacts: [
          ...state.contacts,
          { name: state.name, number: state.number, id: nanoid() },
        ],
      }));
    }
    e.target.reset();
  };

  handleFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleDelete = e => {
    const x = e.target.id;
    this.setState(oldState => ({
      contacts: oldState.contacts.filter(el => el.id !== x),
    }));
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      const stringifiedContacts = JSON.stringify(this.state.contacts);
      localStorage.setItem('contacts', stringifiedContacts);
    }
  }

  render() {
    const { contacts, filter } = this.state;
    const filtered = contacts.filter(el =>
      el.name.toLowerCase().includes(filter)
    );
    return (
      <div className="box">
        <div className="form">
          <h1>Phonebook</h1>
          <ContactForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>

        <div className="contact">
          <h2>Contacts</h2>
          <Filter handleFilter={this.handleFilter} />
          <ContactList
            filtered={filtered}
            handleDelete={this.handleDelete}
          ></ContactList>
        </div>
      </div>
    );
  }
}

export default App;
