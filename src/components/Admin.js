import React from 'react'
import { Link } from 'react-router-dom'


export default function Admin() {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 img'>
    <div className='transparent p-3 rounded w-25'>
        <form action="">
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder="Enter Email" className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder="Enter Password" className='form-control rounded-0'/>
            </div>
            <Link to='' className='btn btn-success w-100'><strong>Login</strong></Link>
        </form>
    </div>
</div>
  )
}
