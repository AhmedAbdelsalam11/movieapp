import React from 'react';
import {  useSelector } from 'react-redux';
import { selectWatch } from '../App/AddToWatchSlice';

const Navbar = ({ userData, logOut }) => {
    const { watches } = useSelector(selectWatch);
   
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">TMDF</a>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0 fs-5 fw-bold">
                        {userData && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/movies">Movies</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/people">People</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/tv">TV</a>
                                </li>
                           
                            </>
                        )}
                    </ul>
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-auto fs-5 fw-bold">
                        {userData && (
                            <>
                              
                                <li className="nav-item d-flex align-items-center me-2">
                                    <div 
                                        className="d-flex align-items-center cursor-pointer" 
                                        data-bs-toggle="offcanvas" 
                                        data-bs-target="#offcanvasRight" 
                                        aria-controls="offcanvasRight"
                                    >
                                        <i className="fas fa-clock me-1 fa-xl"></i>
                                        <span className='fs-4'>{watches.length}</span>
                                    </div>
                                </li>
                               
                                <li className="nav-item">
                                    <span className="nav-link cursor-pointer" onClick={logOut}>Log Out</span>
                                </li>
                            </>
                        )}
                        {!userData && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;