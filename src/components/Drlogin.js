import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

    const Drlogin = () => {
        const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

//     const [loginData,setLoginData]=useState({
//         email:'',
//         password:''
//    });


    

    const [data,setData] = useState([]);
    const navigate = useNavigate();

   

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(email.trim()=='' && password.trim()==''){
             toast.error("Please enter valid credentials!");
         }

        try {
            const response = await axios.get('https://localhost:7118/api/Signup').then((result)=>{
                    //console.log(result.data);
                    
                    setData(result.data);

                    console.log(data);

                    data.map((item) =>{
                        console.log(item.email)

                        if(item.email==email && item.password==password){
                            navigate('/clinicmanagment',
                            );
                        }
                           
                    })


            })
        
            // if (response.status === 200) {
            //     console.log('Login successful');
            // }
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
            } else {
                setError('Email or Password is Wrong');
            }
        }
    };
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 img'>
    <div className='transparent p-3 rounded w-25'>
    <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label><strong>Email</strong>:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required className='form-control rounded'
                    />
                </div>
                <div className='mb-3'>
                    <label><strong>Password</strong>:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required className='form-control'
                    />
                </div>
                <button type="submit" className='btn btn-success w-100 mb-3'>Login</button>
            </form>
            {error && <p className="error">{error}</p>}

        <Link to='/' className='btn btn-default border bg-light w-100'>Patient Login</Link>

    </div>
</div>
  )
}
export default Drlogin;

