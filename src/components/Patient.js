import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Patient = () => {
  //...copied for save new entry
  const [showSave, setShowSave] = useState(false);

  const handleSaveClose = () => setShowSave(false);
  const handleSaveShow = () => setShowSave(true);

  //...To add new appointment...
  const [userid, setUserId] = useState("");
  const [name, setName] = useState("");
  const [symtopms, setSymtopms] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  //..to get data with path
  const location = useLocation();
  console.log(location.state.id);
  const idAsString = location.state.id.toString();

  //..show the form to save appointment..
  const handleSaveShowForm = () => {
    handleSaveShow();
  };

  //...Save the new Appointment...
  const handleSave = () => {
    const url = "https://localhost:7118/api/Clinic/Add";
    const data = {
      userid: idAsString,
      name: name,
      symtopms: symtopms,
      date: date,
      time: time,
    };
    axios
      .post(url, data)
      .then((result) => {
        handleSaveClose();
        getData();
        clear();
        alert("Appointment Added Successfully");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  //....to get the data of all patients..
  const getData = () => {
    axios.get("https://localhost:7118/api/Clinic/Get").then((result) => {
      setData(result.data);
    });
  };
  const clear = () => {
    setName("");
    setSymtopms("");
    setDate("");
    setTime("");
  };

  //...Validate...
  const dataValidate = () => {
    if (name.trim() === null || name.trim() === "")
      alert("Please enter valid name!");
    else if (symtopms.trim() === null || symtopms.trim() === "")
      alert("Please enter valid symptoms!");
    else if (time.trim() === null || time.trim() === "")
      alert("Please Enter Valid Time");
    else {
      handleSave();
    }
  };
  //... Doctore Details...
  const doctor = {
    name: "Dr. John snow",
    qualificatoin: "MD degree from [IIM]",
    specialization: "MultiSpecialist",
    Clinic: "New Life",
    location: "Solapur, India",
    time: "Mon-Fri: 11 AM - 1 PM",
  };

  return (
    <div className="container">
      <div className="text-center">
        <h3>Welcome {location.state.name}</h3>
        <h4>User Id : {location.state.id}</h4>
      </div>
      <div className="two-column-layout">
        <div className="left-section text-center">
          <img
            src="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
            alt="{}doctor.name"
          />
        </div>

        <div className="right-section">
          <strong>{doctor.name}</strong>
          <p>
            <strong>Qualification:</strong>&nbsp;{doctor.qualificatoin}&nbsp;
          </p>
          <p>
            <strong>Specialization:&nbsp;&nbsp;</strong>
            {doctor.specialization}&nbsp;<br></br>
          </p>
          <p>
            <strong>Clinc:&nbsp;&nbsp;</strong>
            {doctor.Clinic}&nbsp;<br></br>
          </p>
          <p>
            <strong>Location:&nbsp;&nbsp;</strong>
            {doctor.location}&nbsp;<br></br>
          </p>
          <p>
            <strong>Timings:&nbsp;&nbsp;</strong>
            {doctor.time}&nbsp;<br></br>
          </p>
          <strong style={{ color: "red" }}>*&nbsp;</strong>For more details
          contact the clinic.
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-center">Book A new Appointment</h2>
        <button
          className="btn-save btn btn-dark text-white"
          onClick={() => handleSaveShowForm()}
        >
          Add New Appointment{" "}
        </button>
      </div>
      <Modal show={showSave} onHide={handleSaveClose}>
        <Modal.Header>
          <Modal.Title>Add Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row d-flex justify-content-center">
            <form className="col-8 needs-validation" onSubmit={dataValidate}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={idAsString}
                  onChange={(e) => setUserId(e.target.value)}
                  className="form-control"
                  disabled
                  aria-describedby="inputGroup"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  aria-describedby="inputGroup"
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Symtopms</label>
                <input
                  type="text"
                  value={symtopms}
                  onChange={(e) => setSymtopms(e.target.value)}
                  className="form-control"
                  aria-describedby="inputGroup"
                  placeholder="Enter Symptoms"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                {/* <ReactDatePicker selected={date} onChange={(date) => setDate(date)} className="form-control" dateFormat="dd/MM/yyyy" placeholder="Enter Date" required/> */}
                <input
                  type="date"
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control"
                  placeholder="Enter Date"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Select Time</label>
                <select
                  type="text"
                  value={time}
                  className="form-control"
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="Select Time">Select Time</option>
                  <option value="11.00 am">11.00 am</option>
                  <option value="11.15 am">11.15 am</option>
                  <option value="11.30 am">11.30 am</option>
                  <option value="11.45 am">11.45 am</option>
                  <option value="12.00 pm">12.00 pm</option>
                  <option value="12.15 pm">12.15 pm</option>
                  <option value="12.30 pm">12.30 pm</option>
                  <option value="12.45 pm">12.45 pm</option>
                </select>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowSave(!showSave);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={dataValidate}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Patient;