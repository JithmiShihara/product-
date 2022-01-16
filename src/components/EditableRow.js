import React from 'react'

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
       <tr>
           <td>
            <input 
                type="text"
                required="required"
                placeholder="Enter name..."
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
            ></input>
           </td>
           <td>
            <input 
               type="text"
               required="required"
               placeholder="Enter quantity..."
               name="quantity"
               value={editFormData.quantity}
               onChange={handleEditFormChange}
            ></input>
           </td>
           <td>
            <input 
               type="text"
               required="required"
               placeholder="Enter price..."
               name="price"
               value={editFormData.price}
               onChange={handleEditFormChange}
            ></input>
           </td>
           <td>
            <input 
               type="text"
               required="required"
               placeholder="Enter description..."
               name="description"
               value={editFormData.description}
               onChange={handleEditFormChange}
            ></input>
           </td>
           <td>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelClick}>
                 Cancel
              </button>
           </td>
       </tr>
    );
};

export default EditableRow;
