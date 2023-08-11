
// Importing required components and modules
import React, { useState } from "react";
import { Table } from "./Table";
import "./Main.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function Main({
  totalRequests,
  searchValue,
  requests,
  handleSearchInputChange,
  toDelete,
  handleEdit,
  handleAddBooking,
  orderBy,
  setOrderBy,
  logo,
  currentPage,
  setCurrentPage,
  itemsPerPage,
}) {

  // State to keep track of selected rows
  const [selectedRows, setSelectedRows] = useState([]);
  const navigate = useNavigate();

  // Function to handle row selection
  const handleRowSelection = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  // Function to navigate to the admin panel when the button is clicked
  const navigateAdminPanel = () => {
    navigate("/adminPanel");
  };

  // Filtering and sorting requests based on search and orderBy
  const filteredAndSortedRequests = requests
    .filter((request) => {

      // Filtering based on searchValue
      const valueToLower = searchValue.toLowerCase();
      const roomIDLower = request.roomID.toString().toLowerCase();
      const nameToLower = request.name.toLowerCase();
      const bookingDateLower = request.bookingDate.toLowerCase();
      const startTimeLower = request.startTime.toLowerCase();
      const totalHoursLower = request.totalHours.toString().toLowerCase();
      const enquiryLower = request.enquiry.toLowerCase();
      const endTimeLower = request.endTime.toLowerCase();

      return (
        roomIDLower.includes(valueToLower) ||
        nameToLower.includes(valueToLower) ||
        bookingDateLower.includes(valueToLower) ||
        startTimeLower.includes(valueToLower) ||
        totalHoursLower.includes(valueToLower) ||
        enquiryLower.includes(valueToLower) ||
        endTimeLower.includes(valueToLower)
      );
    })

    // Sorting based on orderBy option
    .sort((a, b) => {
      if (orderBy === "bookingDate") {
        return a.bookingDate.localeCompare(b.bookingDate);
      } else if (orderBy === "id") {
        return a.id - b.id;
      } else if (orderBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (orderBy === "roomID") {
        return a.roomID.toString().localeCompare(b.roomID.toString());
      } else {
        return 0;
      }
    });

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1); // Incrementing the current Page
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1); // Decrementing the current Page
  };

  return (
    <>
      <section className="viewBooking">
          <div className="header-ab">
            <div className="header-ab-items">
              <img id="logo-ab" src={logo} alt="Prospect company logo" />
              <h1 className="title-ab">Bookings</h1>
            </div>

            <div className="filter-tools-ab">
              <select
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                className="sort-tool-ab"
                style={{
                  color: orderBy === "" ? "#808080" : "inherit",
                }}
              >
                <option value="">Sort by...</option>
                <option value="bookingDate">Booking Date</option>
                <option value="id">Order Number</option>
                <option value="name">Name</option>
                <option value="roomID">Room Number</option>
              </select>

              <div className="search-tool-ab">
                <input
                  type="text"
                  className="search-input-ab"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchInputChange}
                />
                <FaSearch className="search-icon-ab" />
              </div>
            </div>

            <div className="button-container-ab">
              <button
                type="button"
                className="button-header-ab button-add-booking"
                onClick={() => {
                  handleAddBooking();
                }}
              >
                New Booking
              </button>
              <button
                type="button"
                className="button-header-ab button-admin-panel"
                onClick={navigateAdminPanel}
              >
                Main Panel
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="header-container table-success">
                <tr className="row-container-ab">
                  <th className="table-header-ab hide-column-1">Order #</th>
                  <th className="table-header-ab hide-column-2">Room ID</th>
                  <th className="table-header-ab hide-colum3">Name</th>
                  <th className="table-header-ab hide-column-4">
                    Date of Booking
                  </th>
                  <th className="table-header-ab hide-column-5">Start Time</th>
                  <th className="table-header-ab hide-column-6">End Time</th>
                  <th className="table-header-ab hide-column-7">Total Hrs</th>
                  <th className="table-header-ab hide-column-8">Enquiry</th>
                  <th className="table-header-ab hide-column-9">Action</th>
                </tr>
              </thead>
              <tbody className="table-body-ab">
                {filteredAndSortedRequests.map((val, index) => (
                  <Table
                    key={val.id}
                    isChecked={selectedRows.includes(index)}
                    id={val.id}
                    roomID={val.roomID}
                    name={val.name}
                    // noOfGuest={val.noOfGuest}
                    bookingDate={val.bookingDate}
                    startTime={val.startTime}
                    totalHours={val.totalHours}
                    enquiry={val.enquiry}
                    endTime={val.endTime}
                    toDelete={() => toDelete(val.id, val.name)}
                    onSelect={() => handleRowSelection(index)}
                    handleEdit={handleEdit}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="footer-ab">
            <div className="total-container">
              <p className="total-search-ab">
                Total Bookings:{" "}
                <span className="totalBookings">{totalRequests}</span>
              </p>
            </div>
            <div className="pagination-container">
              <button
                className="button-footer-ab"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="page-indicator">Page {currentPage}</span>
              <button
                className="button-footer-ab" 
                onClick={handleNextPage}
                disabled={requests.length < itemsPerPage}
              >
                Next
              </button>
            </div>
          </div>
        </section>
    </>
  );
}

export default Main;
