import React from 'react';
import { useDispatch } from 'react-redux';
import { remove } from '../App/AddToWatchSlice';

const DrawerItems = ({ id, title, poster_path }) => {
  const dispatch = useDispatch();

  const removeHandler = () => {
    dispatch(remove(id));
  };

  return (
    <div className="container border-bottom border-1 border-opacity-75 border-dark m-auto">
      <div className="row my-3 justify-content-center align-items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-50 h-50 rounded-5 object-fit-cover"
        />
        <p className='fw-bold fs-2 text-center my-1'>{title}</p>
        <button className="btn btn-outline-danger w-50 fw-bold " onClick={removeHandler}>Remove</button>
      </div>
    </div>
  );
};

export default DrawerItems;
          