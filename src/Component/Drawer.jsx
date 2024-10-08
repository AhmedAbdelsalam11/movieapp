import React from 'react';
import DrawerItems from './DrawerItems';
import { useDispatch, useSelector } from 'react-redux';
import { clear, selectWatch } from '../App/AddToWatchSlice';

const Drawer = () => {
  const { watches } = useSelector(selectWatch);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold text-center fs-2 mx-auto" id="offcanvasRightLabel">Your Watch Later Movies</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body mb-5">
          {watches.length > 0 ? (
            watches.map(item => (
              <DrawerItems key={item.id} {...item} />
            ))
          ) : (
            <p className='fw-bold text-center fs-5 m-auto'>No Movies Added To Watch Later <br/>Add Movies Now</p>
          )}
        </div>
        <div className="position-relative">
          <div className="position-absolute bottom-0 end-0 p-3 mt-3">
            <button type="button" className="btn btn-danger rounded-3" onClick={() => dispatch(clear())}>Clear All</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Drawer;