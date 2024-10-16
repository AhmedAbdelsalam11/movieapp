import React from 'react';

const Notfound = () => {
    return (
        <div className='vh-100 mx-auto pt-5 mt-5'>
            <h1 className='pt-5 text-center'>page not found</h1>
           <div className="pt-4 d-flex align-items-center justify-content-center">
           <p className='text-center'>This page doesn’t exist.
           If this is a mistake, let us know, and we will try to fix it!</p>
           </div>
        </div>
    );
}

export default Notfound;
