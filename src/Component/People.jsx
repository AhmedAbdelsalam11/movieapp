import React, {useState } from 'react';

import Paginator from '../ui/Paginator';
import { useFetchTrendingQuery} from '../App/MoviesSlice';

const People = () => {
    const [page, setPage] = useState(1);
    
    const onClickPrev = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    const onClickNext = () => {
        setPage((prev) => prev + 1);
    };

    
    const { data: trendingPeople, error, isLoading } = useFetchTrendingQuery({ mediaType: 'person', page });

  
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

   
    const totalPages = trendingPeople.total_results ; 
    const totalRecords = trendingPeople.total_results;


    return (
        <div className='container'>
             {trendingPeople && trendingPeople.results.length > 0 ?(
    <div className="row justify-content-center g-3 mt-3">
        {trendingPeople.results.map((person) => (
            <div key={person.id} className="col-md-3">
                <div className="movie">
                   
                        <img
                            className="w-100"
                            src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} 
                            alt={person.name} 
                        />
                       
                        <div className="people-caption">
                          <h3 className="h6 my-2 text-white">{person.name}</h3>  
                        </div>
                </div>
            </div>
        ))}
    </div>
)
: (
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

export default People;