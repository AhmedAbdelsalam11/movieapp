import { useParams } from 'react-router-dom';
import { AddToWatch } from '../App/AddToWatchSlice';
import { useFetchDetailsQuery } from '../App/MoviesSlice';
import { useDispatch } from 'react-redux';

const MovieDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: fetchDetails, error, isLoading } = useFetchDetailsQuery(id);

   
    const AddToWatchHandler = () =>{
        dispatch(AddToWatch(fetchDetails))
        }

        if (isLoading) return (
            <div className='vh-100 d-flex align-items-center justify-content-center'>
                <i className='fas fa-spinner fa-spin fa-3x'></i>
            </div>
        );
    
        if (error) return (
            <div className='vh-100 d-flex align-items-center justify-content-center fw-bold fs-5'>
                {error.message || "An error occurred"}
            </div>
        );

    return (
      <div>
        {fetchDetails?<div className="container my-5">
           <div className="row">
           <div className="col-md-4">
           <img
           src={'https://image.tmdb.org/t/p/w500' + fetchDetails.poster_path}
           alt={fetchDetails.title}
           className="img-fluid"
          />
        </div>
     <div className="col-md-8">
           <h2>{fetchDetails?.title}</h2>
           <p className=" py-3">{fetchDetails.overview}</p>
           <ul className="list-unstyled">
           <li>Budget: {fetchDetails.budget} </li>
           <li>Vote Average: {fetchDetails.vote}</li>
           <li>Popularity: {fetchDetails.popularity}</li>
           <li>Vote Count: {fetchDetails.vote_count}</li>
         <button className='my-5 p-2 rounded-3 fw-semibold' onClick={AddToWatchHandler} >Add to Watch Later</button>
       </ul>
      </div>
     </div>
     </div>:<div className='vh-100 d-flex align-items-center justify-content-center'>

    <i className='fas fa-spinner fa-spin fa-3x'></i>

     </div> }

   </div>
    );
};

export default MovieDetails;