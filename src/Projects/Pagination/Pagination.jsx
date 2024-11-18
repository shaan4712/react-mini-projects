import React, { useState } from 'react'
import './Pagination.css'

const Pagination = () => {

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;

  //Array of objects
  const dummyData = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`
  }));
  const totalPages = Math.ceil(dummyData.length / itemsPerPage);

  const generatePages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; ++i) {
      pages.push(i);
    }
    return pages;
  }

  const currentList = dummyData.slice(firstIndex, lastIndex);

  const onPageChange = (pageNo) => {
    setCurrentPage(pageNo);
  }

  return (
    <div className='pagination'>
      <h1 style={{fontSize: "2rem"}}>Pagination</h1>
      <div className='curr-page'>
        <ul className='product-list'>
          {
            currentList.map((prod) => (<li key={prod.id} className='product'> {prod.name} </li>))
          }
        </ul>
      </div>

      <div className='btns'>
        <button className='pagination-btn' 
        onClick={() => onPageChange(currentPage - 1)}
        disabled = {currentPage === 1}> Prev </button>

        {
          generatePages().map((pageNo) => (<button onClick={() => onPageChange(pageNo)}
          className={`pagination-btn ${currentPage === pageNo ? 'active' : ''}`}> {pageNo} </button>))
        }

        <button className='pagination-btn' 
        onClick={() => onPageChange(currentPage + 1)}
        disabled = {currentPage === totalPages}> Next </button>
      </div>
    </div>
  )
}

export default Pagination