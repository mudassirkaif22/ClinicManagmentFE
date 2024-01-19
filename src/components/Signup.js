import React, { useEffect,useRef } from 'react'
import { Link } from 'react-router-dom'
import {useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { faCheck,faTimes,faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])[A-Za-z0-9!@#$%]{8,24}$/;


const Signup=()=>{

    const nameRef = useRef();
    const errRef = useRef();
    //to set values...
const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   //..for password
   const [password, setPassword] = useState('');
   const [validpwd, setValidPwd] = useState(false);
   const [pwdFocus, setPwdFocus] = useState(false);

   //..for confirm password
   const [matchPwd, setMatchPwd] = useState('');
   const [validMatch, setValidMatch] = useState(false);
   const [matchFocus, setMatchFocus] = useState(false);

   const [errMsg, setErrMsg] = useState('');
   const [success, setSuccess] = useState(false);

   useEffect(()=>{
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
    const match = password ==matchPwd;
    setValidMatch(match);
    },[password,matchPwd])

    useEffect(()=>{

    })

   const clear =() =>{
    setName('');
    setEmail('');
    setPassword('');
    setMatchPwd('');
    
  }
  
   //...Validate...
   const dataValidate = () =>{
    if(name.trim() === null || name.trim() === "")
        alert("Please enter valid name!");
    else if (email.trim() === null || email.trim() === "")
        alert("Please enter valid email id!");
    else if (password.trim() === null || password.trim() === "") 
        alert("Please enter password!");
    else{
        handleSave();
       }
    }

   //...Save the new Appointment (Post request)...
   const handleSave =() =>{

    const url ='https://localhost:7118/api/Signup';
    const data={
        "name": name,
        "email": email,
        "password": password
       
    }
    axios.post(url,data).then((result)=>{
        clear();
        alert('Registeration Done successfully');
        }).catch((error)=>{
        toast.error(error);
    })
}

 
  return (
    <div className='d-flex justify-content-center align-items-center img vh-100'>
        <div className='transparent p-3 rounded w-25'>
        <section>
            <p ref={errRef}className={errMsg ? "errMsg": "offscreen"} aria-live='asserative'>{errMsg}</p>
        <form className=" needs-validation" onSubmit={dataValidate}>
                        <div className="mb-3">
                            <label className="form-label"><strong>Name</strong></label>
                            <input type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className="form-control" 
                            aria-describedby="inputGroup" 
                            placeholder="Enter Name" required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label"><strong>Email</strong></label>
                            <input 
                            type="text" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="form-control" 
                            aria-describedby="inputGroup" 
                            placeholder="Enter Email" 
                            required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">
                            <strong>Password:</strong>
                            {pwdFocus && !validpwd ? (
                            <span className="invalid">
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            ) : pwdFocus && validpwd ? (
                            <span className="valid">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            ) : null}
                        </label>
                        <input
                        type="password"
                        id="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        placeholder='Enter Password'
                        aria-invalid={validpwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}/>
                            {pwdFocus && !validpwd && (
                                <p id="pwdnote" className="instructions">
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                        8 to 24 characters.<br />
                                        Must include uppercase and lowercase letters, a number, and a special 
                                        character.<br />
                                        Allowed special characters: <span aria-label="exclamation mark">!</span>
                                        <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span>
                                        <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                        </p>
                                        )}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="confirm_pwd">
                                <strong>Confirm Password: </strong>
                                {matchFocus && !validMatch && (
                                <span className="invalid">
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                                )}
                            {matchFocus && validMatch && (
                            <span className="valid">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            )}
                            </label>
                            <input
                            type="password"
                            id='confirm_pwd'
                            className='form-control'
                            onChange={(e)=> setMatchPwd(e.target.value)}
                            value={matchPwd}
                            placeholder='Confirm Password'
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby='confirmnote'
                            onFocus={()=> setMatchFocus(true)}
                            onBlur={()=> setMatchFocus(false)}
                            />
                            {matchFocus && (
                            <p id='confirmnote' className={!validMatch ? "instruction" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must Match the first password input field.
                            </p>
                            )}
                            </div>
                    </form>
                    </section>
                   {/* Button... */}
                <button  className='btn btn-success w-100  mb-3' onClick={dataValidate}>
                    <strong>Signup</strong>
                </button>
        </div>
    </div>
  )
}
export default Signup;