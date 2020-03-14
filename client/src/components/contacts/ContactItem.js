import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const {
    deleteContact,
    setCurrentContact,
    clearCurrentContact
  } = contactContext;
  const { id, name, email, phone, type, notes } = contact;

  const onDelete = () => {
    console.log('deleting contact:', name, ', id', id);
    deleteContact(id);
    clearCurrentContact();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
        <span
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'> {email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'> {phone}</i>
          </li>
        )}
        {notes && (
          <li>
            <i className='fas fa-file-alt'> {notes}</i>
          </li>
        )}
      </ul>
      <button
        className='btn btn-dark btn-sm'
        onClick={() => setCurrentContact(contact)}
      >
        Edit
      </button>
      <button className='btn btn-danger btn-sm' onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
