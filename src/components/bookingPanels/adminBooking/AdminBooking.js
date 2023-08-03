import React, { useState ,  useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';
import logo from '../assets/prospectLogo.png';
import Main from "./Main";
import { useNavigate} from "react-router-dom";

const AdminBooking = () => {

  const navigate = useNavigate();
  const [requests, setRequests] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [orderBy, setOrderBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;


  
  const searchedRequests = requests.filter(
    (request) => {
      const valueToLower = searchValue.toLowerCase();
      const roomIDLower = request.roomID.toString().toLowerCase();
      const nameToLower = request.name.toLowerCase();
      // const noOfGuestLower = request.noOfGuest.toString().toLowerCase();
      const bookingDateLower = request.bookingDate.toLowerCase();
      const startTimeLower = request.startTime.toLowerCase();
      const totalHoursLower = request.totalHours.toString().toLowerCase();
      const enquiryLower = request.enquiry.toLowerCase();
      const endTimeLower = request.endTime.toLowerCase();

      return (
        roomIDLower.includes(valueToLower) ||
        nameToLower.includes(valueToLower) ||
        // noOfGuestLower.includes(valueToLower) ||
        bookingDateLower.includes(valueToLower) ||
        startTimeLower.includes(valueToLower) ||
        totalHoursLower.includes(valueToLower) ||
        enquiryLower.includes(valueToLower) ||
        endTimeLower.includes(valueToLower) 
      );
    }
  );
  const totalRequests = searchedRequests.length;
  const handleSearchInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setOrderBy("");
  };
  
  const handleEdit = (values) => {
    const { id, roomID, name, bookingDate, startTime, totalHours, enquiry, endTime } = values;
    navigate('/createBooking', {
      state: {
        id,
        roomID,
        name,
        // noOfGuest,
        bookingDate,
        startTime,
        totalHours,
        enquiry,
        endTime,
      },
    });
  };
  
  const toDelete = (id, name) => {
    Swal.fire({
      title: 'Would you like to delete this register?',
      html: `<i><strong>${name}</strong> would be deleted from files.</i>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed) {
        Axios.delete(`https://back1234.onrender.com/delete/${id}` )
        .then(() => {
          getRequestList();
          Swal.fire({
            title:'Success!',
            html:`<strong>${name}</strong> has been deleted.`,
            icon:'success'
          });
        }).catch(function(error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! Delete process failed.',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error"?"Please try again this operation later":JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }


  // const getRequestList = () => {
  //   Axios.get("http://localhost:3001/requests").then((response) => {
  //     const formattedData = response.data.map((item) => {
  //       const formattedDate = new Date(item.bookingDate).toISOString().split('T')[0];
  //       return {
  //         ...item,
  //         bookingDate: formattedDate,
  //       };
  //     });
  //     setRequests(formattedData);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // };

  const getRequestList = () => {
    Axios.get(`https://back1234.onrender.com/requests?page=${currentPage}&perPage=${itemsPerPage}`)
      .then((response) => {
        const responseData = response.data.data; 
        const formattedData = responseData.map((item) => {
          const formattedDate = new Date(item.bookingDate).toISOString().split('T')[0];
          return {
            ...item,
            bookingDate: formattedDate,
          };
        });
        setRequests(formattedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  

  const handleAddBooking = () => {
    navigate('/createBooking');
  };

  React.useEffect(() => {
    getRequestList();
  }, [currentPage]); 

  return (
    <>
      <Main 
        logo={logo} 
        requests={requests}
        searchedRequests={searchedRequests}
        setRequests={setRequests}
        totalRequests={totalRequests}
        searchValue={searchValue}
        handleSearchInputChange={handleSearchInputChange}
        toDelete={toDelete}
        handleEdit={handleEdit}
        handleAddBooking={handleAddBooking}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
>
      </Main>
    </>
  );
}

export default AdminBooking;
