
// Importing required components and modules
import React from "react";
import "./TableAdmin.css"; // Importing TableAdmin styles.

function Table({ id, roomID, name, bookingDate, startTime, endTime, totalHours, enquiry, isChecked, onSelect, handleEdit, toDelete }) {
  
  return (
    <tr
      className={isChecked ? "row-container-ab selected table-active" : "row-container-ab"}
      onClick={onSelect} 
    >
      <td className="table-data-ab hide-column-1">{id}</td>
      <td className="table-data-ab hide-column-2">{roomID}</td>
      <td className="table-data-ab hide-column-3">{name}</td>
      <td className="table-data-ab hide-column-4">{bookingDate}</td>
      <td className="table-data-ab hide-column-5">{startTime}</td>
      <td className="table-data-ab hide-column-6">{endTime}</td>
      <td className="table-data-ab hide-column-7">{totalHours}</td>
      <td className="table-data-ab hide-column-8">{enquiry}</td>
      <td className="table-data-ab hide-column-9">
        {isChecked && (
          <>
            <div className="row-button-ab">
              <button
                type="button"
                className="button-table-ab button-modify-ab"
                onClick={() => {
                  handleEdit({
                    id,
                    roomID,
                    name,
                    bookingDate,
                    startTime,
                    totalHours,
                    enquiry,
                    endTime,
                  });
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="button-table-ab button-delete-ab"
                onClick={() => {
                  toDelete(id, name);
                }}
              >
                Delete
              </button>
            </div>
            
          </>
        )}
      </td>
    </tr>
  );
}

export { Table }; // Exporting Table component

