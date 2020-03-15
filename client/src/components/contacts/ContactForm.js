import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const {
    addContact,
    current,
    clearCurrentContact,
    updateContact
  } = contactContext;

  const initialState = {
    name: '',
    email: '',
    phone: '',
    type: 'personal',
    notes: ''
  };

  // Imitate componentDidMount
  useEffect(() => {
    if (current !== null) {
      console.log('current is not null.', current);
      setContact(current);
    } else {
      console.log('current is null.');

      setContact(initialState);
    }
  }, [contactContext, current]); // the dependency list prevents useEffect from being called forever.

  const [contact, setContact] = useState(initialState);
  console.log('contact', contact);

  const { name, email, phone, type, notes } = contact;

  const onChange = e => {
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Use ContactContext to submit form fields to back-end.
  const onSubmit = e => {
    e.preventDefault();
    if (current) {
      updateContact(contact);
    } else {
      addContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    setContact(initialState);
    clearCurrentContact();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='phone'
        name='phone'
        value={phone}
        onChange={onChange}
      />

      <h4>Contact Type</h4>
      <label htmlFor='personal'>Personal </label>
      <input
        type='radio'
        name='type'
        id='personal'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />
      <label htmlFor='professional'> Professional </label>
      <input
        type='radio'
        name='type'
        id='professional'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />

      <textarea
        rows='3'
        cols='30'
        placeholder='Enter notes here...'
        name='notes'
        value={notes}
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
