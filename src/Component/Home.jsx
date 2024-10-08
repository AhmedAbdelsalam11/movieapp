
import React from 'react';
import { Link } from 'react-router-dom';
import {
  useFetchTrendingQuery,
} from '../App/MoviesSlice'; 

const Home = () => {
 
  
  const { data: trendingMovies, error: moviesError, isLoading: moviesLoading } = useFetchTrendingQuery({ mediaType: 'movie',page:1 });
  const { data: trendingTv, error: tvError, isLoading: tvLoading } = useFetchTrendingQuery({ mediaType: 'tv',page:1 });
  const { data: trendingPeople, error: peopleError, isLoading: peopleLoading } = useFetchTrendingQuery({ mediaType: 'person',page:1 });

  
  if (moviesLoading || tvLoading || peopleLoading) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center'>
        <i className='fas fa-spinner fa-spin fa-3x'></i>
      </div>
    );
  }

  
  if (moviesError || tvError || peopleError) {
    return (
      <div className='vh-100 d-flex align-items-center justify-content-center fw-bold fs-5'>
        {moviesError?.message || tvError?.message || peopleError?.message}
      </div>
    );
  }

  
  const sliceMovies = trendingMovies?.results.slice(0, 10) || [];
  const sliceTv = trendingTv?.results.slice(0, 10) || [];
  const slicePeople = trendingPeople?.results.slice(10, 20) || [];

  return (
    <div className='container'>
      <div className="row ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
           
            <h2 className="h3">Trending <br/> Movies <br/> To Watch Right Now</h2>
            <p className="text-muted">Top Trending Movies by Day</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
       
        {sliceMovies.map((movie) => (
           <div key={movie.id} className=" col-md-2 p-1">
           <div >
           
               <Link to={`/moviedetails/${movie.id}`}>
               <div className="home">
             <img
                       className="w-100"
                       src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                       alt={movie.title}
                   />
            </div>
               <h3 className="h6 my-2 text-white text-center fw-bold ">{movie.title}</h3>
               </Link>
           </div>
          
       </div>
       
        ))}
        </div>
        <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h2 className="h3">Trending people To Watch Right Now</h2>
            <p className="text-muted">Top Trending people by Day</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
        {slicePeople.map((person) => (
   <div key={person.id} className="col-md-2 p-1">
   <div className="home">
  
           <img
               className="w-100"
               src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
               alt={person.name} 
           />
          
   </div>
   <h3 className="h6 my-2 text-white text-center fw-bold ">{person.name}</h3>
  </div>
  ))}
  </div>
      <div className="row pb-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-4"></div>
            <h2 className="h3">Trending tv To Watch Right Now</h2>
            <p className="text-muted">Top Trending tv by Day</p>
            <div className="brdr mt-4"></div>
          </div>
        </div>
        {sliceTv.map((tv) => (
          <div key={tv.id} className="col-md-2 p-1">
          <div className="home">
             
                  <img
                      className="w-100"
                      src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} 
                      alt={tv.name} 
                  />
                 
                 
          </div>
          <h3 className="h6 my-2 text-white text-center fw-bold ">{tv.name}</h3>
      </div>
        ))}
      </div>
    </div>
  );
};

export default Home;