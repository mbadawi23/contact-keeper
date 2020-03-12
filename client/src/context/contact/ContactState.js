import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  SHOW_ALERT,
  REMOVE_ALERT
} from '../types';

const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Luke Skywalker',
        email: 'luke@jedi.com',
        phone: '111-111-1111',
        type: 'personal',
        notes: 'The last jedi'
      },
      {
        id: 2,
        name: 'Lia Organa',
        email: 'lia@rebels.com',
        phone: '222-222-2222',
        type: 'professional',
        notes: 'The first rebel.'
      },
      {
        id: 3,
        name: 'Han Solo',
        email: 'han@falcon.mil',
        phone: '333-333-3333',
        type: 'personal',
        notes: 'Badass smuggler.'
      }
    ]
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  /** Actions */
  // Add contact
  const addContact = () => {};

  // Delete contact
  const deleteContact = () => {};

  // Set current contact
  const setCurrentContact = () => {};

  // Clear current contact
  const clearCurrentContact = () => {};

  // Update contact
  const updateContact = () => {};

  // Filter contacts
  const filterContacts = () => {};

  // Clear filter
  const clearFilter = () => {};

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        addContact,
        deleteContact,
        setCurrentContact,
        clearCurrentContact,
        updateContact,
        filterContacts,
        clearFilter
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
