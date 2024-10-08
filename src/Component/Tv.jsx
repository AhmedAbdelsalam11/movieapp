import React, {useState } from 'react';

import {useFetchTrendingQuery} from '../App/MoviesSlice';
import Paginator from '../ui/Paginator';

const Tv = () => {
    const [page, setPage] = useState(1);
    
    const onClickPrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const onClickNext = () => {
        setPage((prev) => prev + 1);
    };

    
    const { data: trendingTv, error, isLoading } = useFetchTrendingQuery({ mediaType: 'tv', page });

    
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

   
    const totalPages = trendingTv.total_results; 
    const totalRecords = trendingTv.total_results ;

    return (
        <div className='container'>
          {trendingTv && trendingTv.results.length > 0 ? (
    <div className="row justify-content-center g-3 mt-3 ">
        {trendingTv.results.map((tv) => (
            <div key={tv.id} className="col-md-3">
                <div className="movie">
                   
                        <img
                            className="w-100"
                            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`} 
                            alt={tv.name} 
                        />
                         <div className="movie-caption">
                           <h3 className="h6 my-2 text-white">{tv.name}</h3> 
                          <button>Watch Now</button>
                        </div>
                       
                </div>
            </div>
        ))}
    </div>
) : (
                <p>No trending Tv available.</p>
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

export default Tv;