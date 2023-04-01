import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },

  const [contactItem, setContactItem] = useState({});
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setContactItem(prevContacts => ({
      ...prevContacts,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const inputValue = e.target[0].value;
    const ifNameExist = contacts.some(
      el => el.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (ifNameExist) {
      alert(`${inputValue} is already in contacts.`);
    } else {
      setContacts([
        ...contacts,
        { name: contactItem.name, number: contactItem.number, id: nanoid() },
      ]);
    }
    e.target.reset();
  };

  const handleFilter = e => {
    setFilter(e.target.value);
  };

  const handleDelete = e => {
    const x = e.target.id;
    setContacts(oldState => oldState.filter(el => el.id !== x));
  };

  const savedContacts = localStorage.getItem('contacts');
  useEffect(() => {
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    // if (state.contacts !== prevState.contacts) {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
    // }
  }, [contacts]);

  const filtered = contacts.filter(el =>
    el.name.toLowerCase().includes(filter)
  );
  return (
    <div className="box">
      <div className="form">
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={handleSubmit} handleChange={handleChange} />
      </div>

      <div className="contact">
        <h2>Contacts</h2>
        <Filter handleFilter={handleFilter} />
        <ContactList
          filtered={filtered}
          handleDelete={handleDelete}
        ></ContactList>
      </div>
    </div>
  );
};
export default App;
