
import Joi from 'joi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuth } from '../App/AuthSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const{isLoading} =useSelector(selectAuth)
   const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const validateRegisterForm = () => {
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'string.empty': 'Name is required',
                    'string.alphanum': 'Name must be alphanumeric',
                    'string.min': 'Name must be at least 3 characters',
                    'string.max': 'Name must be at most 10 characters',
                }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required()
                .messages({
                    'string.empty': 'Email is required',
                    'string.email': 'Email must be a valid email',
                }),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
                .required()
                .messages({
                    'string.empty': 'Password is required',
                    'string.pattern.base': 'Password must be at least 6 characters',
                }),
        });
        return schema.validate(user, { abortEarly: false });
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const submitHandler = e => {
        e.preventDefault();
        const { error } = validateRegisterForm();
        if (error) {
            const newErrors = {};
            error.details.map((error) => newErrors[error.path[0]] = error.message)
            setErrors(newErrors);
        } else {
            setErrors({});
            dispatch(registerUser({ email: user.email, password: user.password }));
            navigate("/login");
        }
 
       

    };

    return (
        <div className="container-fluid">
          <form onSubmit={submitHandler} className='mx-auto mt-5 w-50 p-2 rounded-2 mt-2 needs-validation'>
            <h2 className='text-center fs-4 fw-bold my-4'>Register Now!</h2>
            
            <div className="my-4">
            
            <input
                value={user.name}
                type="text"
                name="text"
                onChange={onChangeHandler}
                className='form-control p-2 fs-5'
                placeholder='Name'
            />
               <div className="text-danger ">{errors.name}</div>
         </div>
  
         <div className="my-4">
            
            <input
                value={user.email}
                type="email"
                name="email"
                onChange={onChangeHandler}
                className='form-control p-2 fs-5'
                placeholder='Email'
            />
               <div className="text-danger ">{errors.email}</div>
         </div>
    
         <div className='my-4'>
                           
                 <input
                     className='form-control p-2 fs-5'
                     value={user.password}
                     type="password"
                     name="password"
                     onChange={onChangeHandler}
                     placeholder='Password'
                 />
                          <div className="text-danger">{errors.password}</div>
                </div>
  

            <button type="submit"  disabled={isLoading} className='btn btn-primary fluid ui button w-100 border-0 rounded-2 mt-2 p-2 fw-medium fs-5'>
                {isLoading ? 'Logining...' : 'Register'}
            </button>
        </form>
     </div>
      
    );
};

export default Register;