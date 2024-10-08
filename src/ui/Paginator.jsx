import React from 'react';
import PropTypes from 'prop-types';

const Paginator = ({
  page,
  pageCount,
  onClickPrev,
  isLoading,
  total,
  onClickNext,
}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <p className=" text-secondary mx-3">
        Page{" "}
        <span className="mx-1 fw-bold">
          {page}
        </span>{" "}
        to
        <span className="mx-1 fw-bold">{pageCount}</span> of
        <span className="mx-1 fw-bold">{total}</span>{" "}
        Records
      </p>
      <div>
      <button
        type="button"
        className="btn btn-secondary me-3"
        disabled={page === 1 || isLoading}
        onClick={onClickPrev}
      >
        <svg
          className="me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
          width="14"
          height="10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        disabled={page === pageCount || isLoading}
        onClick={onClickNext}
      >
        Next
        <svg
          className="ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
          width="14"
          height="10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
      </div>
     
    </div>
  );
};

Paginator.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onClickPrev: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default Paginator;