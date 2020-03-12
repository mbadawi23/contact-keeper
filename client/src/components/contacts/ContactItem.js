import React from 'react';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  const { name, email, phone, type, notes } = contact;
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
      <button className='btn btn-dark btn-sm'>Edit</button>
      <button className='btn btn-danger btn-sm'>Delete</button>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
