import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ filtered, handleDelete }) => {
  return (
    <ul>
      {filtered.map(el => (
        <li key={el.id} className={css.li}>
          <p className={css.text}>{el.name}</p>
          <p className={css.text}>{el.number}</p>

          <button
            name={el.name}
            id={el.id}
            onClick={handleDelete}
            className={css.btn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filtered: PropTypes.array,
  handleChange: PropTypes.func,
};

export default ContactList;
