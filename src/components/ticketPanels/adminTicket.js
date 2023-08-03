import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../bookingPanels/assets/prospectLogo.png";
import { FaSearch } from "react-icons/fa";

const AdminTicket = () => {
  const navigate = useNavigate();
  const [subject, setTicket] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
 
  const sortedData = [...subject].sort((a, b) => {
    const priorityValues = {
      high: 3,
      medium: 2,
      low: 1,
    };
  
    if (sortOption === "priority") {
      return priorityValues[b.TICKET_PRIORITY.toLowerCase()] - priorityValues[a.TICKET_PRIORITY.toLowerCase()];
    } else if (sortOption === "date") {
      return new Date(a.TICKET_DATE) - new Date(b.TICKET_DATE);
    } else if (sortOption === "category") {
      return a.TICKET_CATEGORY.localeCompare(b.TICKET_CATEGORY);
    }
  
    return 0; // Si no hay opción de ordenación válida, se mantiene el orden original
  });
  

  const handleAdminPanelButtonClick = () => {
    navigate("/createTicket");
  };

  const handleCreateTicketButtonClick = () => {
    navigate("/adminPanel");
  };


  const filteredData = sortedData.filter((data) =>
    data.TICKET_SUBJECT.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRequests = filteredData.length;

  function deleteTicket(ticketID) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this ticket?"
    );
    if (isConfirmed) {
      axios
        .post("https://back1234.onrender.com/deleteTicket", { ticketID })
        .then((res) => {
          navigate("/viewTickets");
          console.log(res);
          fetchData(currentPage);
        })
        .catch((err) => console.log(err));
    }
  }

  function solveTicket(ticketID) {
    axios
      .post("https://back1234.onrender.com/solveTicket", { ticketID }) // Wrap ticketID in an object
      .then((res) => {
        navigate("/viewTickets");
        console.log(res);
        fetchData(currentPage);
      })
      .catch((err) => console.log(err));
  }

  const fetchData = (page) => {
    axios
      .get(`https://back1234.onrender.com/adminTickets?page=${page}`)
      .then((res) => {
        console.log(res.data); // Verifica la respuesta de la API en la consola
        if (Array.isArray(res.data)) {
          setTicket(res.data);
        } else {
          console.log("Data is not in the expected format.");
        }
      })
      .catch((err) => console.log(err));
  };

 useEffect(() => {
    // Fetch data on initial load
    fetchData(currentPage);
  }, [currentPage]);
  

  return (
    <>
      <section className="viewTicket">
        <div className="header-at">
          <div className="header-at-items">
            <img id="logo-at" src={logo} alt="Prospect company logo" />
            <h1 className="title-at">Tickets</h1>
          </div>
        </div>

        <div className="filter-tools-at">
          <select
            className="sort-tool-at"
            value={sortOption}
            onChange={handleSort}
            style={{
              color: sortOption === "" ? "#808080" : "inherit",
            }}
          >
            <option value="">Sort by...</option>
            <option value="priority">Priority</option>
            <option value="date">Date</option>
            <option value="category">Category</option>
          </select>

          <div className="search-tool-at">
            <input
              type="text"
              className="search-input-at"
              placeholder="Search by Subject..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="search-icon-at" />
          </div>
        </div>

        <div className="button-container-at">
          <button
            type="button"
            className="button-header-at button-add-ticket"
            onClick={handleAdminPanelButtonClick}
          >
            New Ticket
          </button>
          <button
            type="button"
            className="button-header-at button-admin-panel"
            onClick={handleCreateTicketButtonClick}
          >
            Admin Panel
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead className="header-container table-success">
              <tr className="row-container-at">
                <th className="table-header-at hide-at-column-1">
                  Issued Date
                </th>
                <th className="table-header-at hide-at-column-2">Email</th>
                <th className="table-header-at hide-at-column-3">Category</th>
                <th className="table-header-at hide-at-column-4">Subject</th>
                <th className="table-header-at hide-at-column-5">
                  Description
                </th>
                <th className="table-header-at hide-at-column-6">Priority</th>
                <th className="table-header-at hide-at-column-7">Status</th>
                <th className="table-header-at hide-at-column-8">Images</th>
                <th className="table-header-at hide-at-column-9">
                  Delete Ticket
                </th>
                <th className="table-header-at hide-at-column-10">
                  Mark As Solved
                </th>
              </tr>
            </thead>
            <tbody className="table-body-at">
              {filteredData.map((data, i) => (
                <tr className="row-container-at" key={i}>
                  <td className="table-data-at hide-at-column-1">
                    {new Date(data.TICKET_DATE).toLocaleDateString("en-GB")}
                  </td>
                  <td className="table-data-at hide-at-column-2">
                    {data.USER_EMAIL}
                  </td>
                  <td className="table-data-at hide-at-column-3">
                    {data.TICKET_CATEGORY}{" "}
                  </td>
                  <td className="table-data-at hide-at-column-4">
                    {data.TICKET_SUBJECT}
                  </td>
                  <td className="table-data-at hide-at-column-5">
                    {data.TICKET_DESCRIPTION}
                  </td>
                  <td className="table-data-at hide-at-column-6">
                    {data.TICKET_PRIORITY}
                  </td>
                  <td className="table-data-at hide-at-column-7">
                    {data.TICKET_STATUS}
                  </td>
                  <td className="table-data-at hide-at-column-8">
                    <img
                      className="adminTicketPic"
                      src={`https://back1234.onrender.com/uploads/` + data.TICKET_PIC}
                      alt="Ticket Issued"
                    ></img>
                  </td>
                  <td className="table-data-at hide-at-column-9">
                    <button
                      type="button"
                      className="button-table-at button-delete-at"
                      onClick={() => deleteTicket(data.TICKET_ID)}
                    >
                      Delete!
                    </button>
                  </td>
                  <td className="table-data-at hide-at-column-10">
                    <button
                      type="button"
                      className="button-table-at button-resolve-at"
                      onClick={() => solveTicket(data.TICKET_ID)}
                    >
                      Resolve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="footer-at">
          <div className="total-container">
            <p className="total-search-at">
              Total Bookings:{" "}
              <span className="totalTickets">{totalRequests}</span>
            </p>
          </div>
          <div className="pagination-container">
            <button
              className="button-footer-at"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="page-indicator">Page {currentPage}</span>
            <button
              className="button-footer-at" /*btn btn-secondary*/
              onClick={handleNextPage}
              disabled={subject.length < 20}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminTicket;
