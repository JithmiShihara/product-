import React, { useState, Fragment } from "react";
import { nanoid } from 'nanoid'; 
import './App.css';
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  })

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData};
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    
    const fieldName = event.target.getAttribute("name");
    const fieldvalue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldvalue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      quantity: addFormData.quantity,
      price: addFormData.price,
      description: addFormData.description,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      quantity: editFormData.quantity,
      price: editFormData.price,
      description: editFormData.description
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null)
  };

const handleEditClick = (event, contact) => {
  event.preventDefault();
  setEditContactId(contact.id);

  const formValues = {
    name: contact.name,
    quantity: contact.quantity,
    price: contact.price,
    description: contact.description,
  }; 

  setEditFormData(formValues);
};

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact)=> contact.id === contactId);
 
    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (
    <div className="App-container">
      <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead> 
          <tr>
            <th> Name </th>
            <th> Quantity </th>
            <th> Price </th>
            <th> Description </th>
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Fragment>
              {editContactId === contact.id ? (
                <EditableRow 
                  editFormData={editFormData} 
                  handleEditFormChange={handleEditFormChange}
                  handleCancelClick={handleCancelClick}
                /> 
              ) : (
                <ReadOnlyRow 
                  contact={contact} 
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick}
                />
              )}          
            </Fragment>
          ))}
        </tbody>
      </table>
      </form>

      <h2>Add item</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input 
          type="text"
          name="name"
          required="required"
          placeholder="Enter name..."
          onChange={handleAddFormChange}
        />
        <input 
          type="text"
          name="quantity"
          required="required"
          placeholder="Enter quantity..."
          onChange={handleAddFormChange}
        />
        <input 
          type="text"
          name="price"
          required="required"
          placeholder="Enter price..."
          onChange={handleAddFormChange}
        />
        <input 
          type="text"
          name="description "
          required="required"
          placeholder="Enter description..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;
