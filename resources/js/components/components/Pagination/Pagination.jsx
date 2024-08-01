import React from 'react';
import style from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const maxPageButtons = 5;
    const pages = [];

    const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <button
                key={i}
                onClick={() => onPageChange(i)}
                className={currentPage === i ? style.activePage : ''}
            >
                {i}
            </button>
        );
    }

    return (
        <div className={style.pagination}>
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                First
            </button>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {pages}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
