import React, { useState } from 'react';

import { useFetchTrendingQuery } from '../App/MoviesSlice'; 
import { Link } from 'react-router-dom';
import Paginator from '../ui/Paginator';

const Movies = () => {
    const [page, setPage] = useState(1);
    
    const onClickPrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const onClickNext = () => {
        setPage((prev) => prev + 1);
    };

    
    const { data: trendingMovies, error, isLoading } = useFetchTrendingQuery({ mediaType: 'movie', page });

  
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

    
    const totalPages =  trendingMovies.total_results ; 
    const totalRecords = trendingMovies.total_results;

    return (
        <div className='container'>
            {trendingMovies && trendingMovies.results.length > 0 ? (
                <div className="row justify-content-center g-3 mt-3">
                    {trendingMovies.results.map((movie) => (
                        <div key={movie.id} className="col-md-3">
                            <div className="movie">
                                <Link to={`/moviedetails/${movie.id}`}>
                                    <img
                                        className="w-100"
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <div className="movie-caption">
                                        <h3 className="h6 my-2 text-white">{movie.title}</h3>
                                        <button>Watch Now</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No trending movies available.</p>
            )}

               <div className="my-4">
                      <Paginator className="my-5"
                          isLoading={isLoading}
                          total={totalRecords} 
                          page={page}
                          pageCount={totalPages} 
                          onClickPrev={onClickPrev}
                          onClickNext={onClickNext}
                      />
               </div>
        </div>
    );
};

export default Movies;