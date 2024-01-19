        import axios from "axios";
        import { useEffect, useState } from "react";
        import Button from "react-bootstrap/Button";
        import Modal from "react-bootstrap/Modal";
        import { ToastContainer, toast } from "react-toastify";
        import "react-toastify/dist/ReactToastify.css";
        import * as jsx from "react/jsx-runtime";
        import {format,parseISO} from "date-fns";

        const ClinicManagment = () => {
        //...copied with modal for edit page...
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        //...copied for save new entry
        const [showSave, setShowSave] = useState(false);

        const handleSaveClose = () => setShowSave(false);
        const handleSaveShow = () => setShowSave(true);

        //...To add new appointment...
        const [name, setName] = useState("");
        const [symtopms, setSymtopms] = useState("");
        const [date, setDate] = useState("");
        const [time, setTime] = useState("");

        //...To Edit a Appointment...
        const [editId, setEditId] = useState("");
        const [edituserId, setEditUserId] = useState("");
        const [editName, setEditName] = useState("");
        const [editSymtopms, setEditSymtopms] = useState("");
        const [editDate, setEditDate] = useState("");
        const [editTime, setEditTime] = useState("");

        const clinicdata = [
            {
            Id: 101,
            Name: "Dr. John Doe",
            Symtopms: "Headache",
            Date: "25th June 2023",
            Time: "11 AM",
            },
            {
            Id: 102,
            Name: "Dr. Jack",
            Symtopms: "Cough",
            Date: "3rd July 2023",
            Time: "12 PM",
            },
            {
            Id: 103,
            Name: "Dr. Jill",
            Symtopms: "Fever",
            Date: "6th August 2023",
            Time: "9 AM",
            },
        ];
        //...get data...
        const [data, setData] = useState([]);

        useEffect(() => {
            getData();
        }, []);

        const getData = () => {
            axios.get("https://localhost:7118/api/Clinic/Get").then((result) => {
            // Sort the data by date in descending order (latest date first)
            const sortedData = result.data.sort((a, b) =>
            parseISO(b.date) - parseISO(a.date)
            );
            setData(result.data);
            });
        };
        //..Edit Appointment..
        const handleEdit = (id) => {
            handleShow();
            axios.get("https://localhost:7118/api/Clinic/Get/" + id).then((result) => {
            setEditName(result.data.name);
            setEditSymtopms(result.data.symtopms);
            setEditDate(result.data.date);
            setEditTime(result.data.time);
            setEditId(id);
            setEditUserId(result.data.userId);
            });
        };

        //...Delete Appointment...
        const handleDelete = (id) => {
            if (
            window.confirm("Are You sure want to delete this appointment") === true
            ) {
            axios
                .delete(`https://localhost:7118/api/Clinic/Delete/` + id)
                .then((result) => {
                if (result.status === 200) {
                    alert("Appointment Deleted Successfully");
                    getData();
                }
                })
                .catch((error) => {
                alert(error);
                toast.error(error);
                });
            }
        };

        //... Update Appointment..
        const handleUpdate = () => {
            const formattedDate = format(new Date(editDate),  "yyyy-MM-dd");
            const url = "https://localhost:7118/api/Clinic/Update/" + editId;

            const data = {
                id: editId,
                name: editName,
                symtopms: editSymtopms,
                date: formattedDate,
                time: editTime,
                userId: edituserId,
            };

            axios
            .put(url, data)
            .then((result) => {
                handleClose();
                getData();
                clear();
                alert("Appointment Updated Successfully");
            })
            .catch((error) => {
                toast.error(error);
            });
        };
        //..show the form to save appointment..
        const handleSaveShowForm = () => {
            handleSaveShow();
        };

        //...save the appointment data..
        const handleSave = () => {
            const url = "https://localhost:7118/api/Clinic/Add";
            const data = {
            name: name,
            symtopms: symtopms,
            date: date,
            time: time,
            };
            axios.post(url, data).then((result) => {
            handleSaveClose();
            getData();
            clear();
            alert("Appointment Saved Successfully");
            });
        };

        const clear = () => {
            setName("");
            setSymtopms("");
            setDate("");
            setTime("");
            setEditId("");
            setEditName("");
            setEditSymtopms("");
            setEditDate("");
            setEditTime("");
        };
        //... data validate...
        const dataValidate = () => {
            if (editName.trim() === null || editName.trim() === "")
            alert("Please enter valid name!");
            else if (editSymtopms.trim() === null || editSymtopms.trim() === "")
            alert("Please enter valid symptoms!");
            else if (editTime.trim() === null || editTime.trim() === "")
            alert("Please Enter Valid Time");
            else {
            handleSave();
            }
        };

        const [searchTerm, setSearchTerm] = useState("");
        const [filteredData, setFilteredData] = useState([]);

        const handleSearch = (e) => {
            const searchTerm = e.target.value.toLowerCase();
            setSearchTerm(searchTerm);
          
            const filtered = data.filter((item) =>
              item.userId.toLowerCase().includes(searchTerm)
            );
            setFilteredData(filtered);
          };
          
          


        return (
            <div className="vh-100">
            <div>
                <h2 className="text-center">All Appointment</h2>
            </div>
            <hr />
            <ToastContainer />

            <div className="mb-3 container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
                placeholder="Search UserId"
            />
            </div>

            <table className="table-main table table-striped">
                <thead>
                <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">ID</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Symtopms</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {(searchTerm === "" ? data : filteredData).map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.userId}</td>
                            <td>{item.name}</td>
                            <td>{item.symtopms}</td>
                            <td>{item.date}</td>
                            <td>{item.time}</td>
                            <td colSpan={2}>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleEdit(item.id)}
                            >
                                Edit
                            </button>{" "}
                            &nbsp;
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        );
                    })
                    }
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row d-felx justify-content-center">
                    <form className="col-8" onSubmit={dataValidate}>
                    {/* <div className="mb-3">
                                        <label for="exampleInputEmail1" className="form-label">ID</label>
                                        <input type="text" value={editName} onChange={(e)=> setEditName(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter book name"/>
                                    </div> */}
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">
                        Name
                        </label>
                        <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter book name"
                        />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">
                        Symptoms
                        </label>
                        <input
                        type="text"
                        value={editSymtopms}
                        onChange={(e) => setEditSymtopms(e.target.value)}
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Enter Symtopms"
                        />
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">
                        Date
                        </label>
                        <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="form-control"
                        placeholder="Enter Date"
                        required
                        />
                    </div>
                    <div className="mb-3">
                <label className="form-label">Select Time</label>
                <select
                  type="text"
                  value={editDate}
                  className="form-control"
                  onChange={(e) => setEditTime(e.target.value)}
                >
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
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
        };
        export default ClinicManagment;
