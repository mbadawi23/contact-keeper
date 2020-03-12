import React, { useState, useContext } from 'react';

const ContactForm = () => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
    notes: ''
  });

  const { name, email, phone, type, notes } = contact;

  const onChange = e => {
    console.log('e.target.name', e.target.name);
    console.log('e.target.value', e.target.value);
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <h2 className='text-primary'>Add Contact</h2>
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
      <label for='personal'>Personal </label>
      <input
        type='radio'
        name='type'
        id='personal'
        value='personal'
        onChange={onChange}
      />
      <label for='professional'> Professional </label>
      <input
        type='radio'
        name='type'
        id='professional'
        value='professional'
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
          value='Add Contact'
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  );
};

export default ContactForm;
