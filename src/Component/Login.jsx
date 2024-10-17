
import Joi from 'joi';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser,selectAuth } from '../App/AuthSlice';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({saveUserData}) => {
  
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const{isLoading} =useSelector(selectAuth)
   const dispatch = useDispatch()
    const [errors, setErrors] = useState({});
   const navigate = useNavigate()

    const validateLoginForm = () => {
        const schema = Joi.object({
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

    const submitHandler =async e => {
        e.preventDefault();
        const { error } = validateLoginForm();
        if (error) {
            const newErrors = {};
            error.details.map((error) => newErrors[error.path[0]] = error.message)
            setErrors(newErrors);
        } else {
            setErrors({});
            const resultAction = await dispatch(loginUser({ email: user.email, password: user.password }));
            const userData = resultAction.payload; // Get the user data from the resolved action
            localStorage.setItem('userToken', userData.accessToken); // Assuming you want the access token
            saveUserData();
            navigate("/");
        }
 
       

    };

    return (
        <div className="container-fluid mx-auto">
        <form onSubmit={submitHandler} className=' needs-validation mx-auto mt-5 w-50 p-2 rounded-2 mt-2 '>
            <h2 className='text-center fs-4 fw-bold my-4'>Login Now!</h2>
            
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
                
                
            
            <button type="submit"  disabled={isLoading} className='btn btn-primary fluid ui button w-100 border-0 rounded-2 my-2 p-2 fw-medium fs-5'>
                {isLoading ? 'Logining...' : 'Login'}
            </button>
            
            
        </form>
        <div className='text-center fw-medium my-3 fs-5'>
        <span>Don't have an account? </span><Link to="/register">Register here.</Link>
        </div>
        </div>
    );
};

export default Login;