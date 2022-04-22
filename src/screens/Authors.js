import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { getAllAuthorService } from '../admin/services/author';
import data from '../data'

export default function Authors() {
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    getAllAuthorService();
  }, []);

  const authors = useSelector((reduxstate) => reduxstate.models.author) || [];
  const authorsPerPage = 12
  const authorsVisited = pageNumber * authorsPerPage;

  const displayAuthors = authors
    .slice(authorsVisited, authorsVisited + authorsPerPage)
    .map(author => {
      return (
        <div key={author.id} className="col-12 col-md-3 col-sm-3 author_details">
          <div className="black-effect">
            <a href={`/authors/${author.id}`}>
              <img src={author.image || '/images/author-11.jpg'} className="img-fluid" />
              <h1>{`${author.first_name} ${author.last_name}`}</h1>
            </a>
          </div>
        </div>
      )
    })

    const pageCount = Math.ceil(authors.length / authorsPerPage);

    const changePage = ({selected}) => {
      setPageNumber(selected);
    }

  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Authors</h1>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li>Authors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-4 mb-4">
        <div className="row">
          <div className="col-12 col-md-8">
            <h1 className="heading_01">Authors</h1>
          </div>
          <div className="col-12 col-md-4">
            <div className="searchtop">
              <div className="input-group">
                  <input type="text" className="form-control inner_page_search" placeholder="Search Authors" name="search" id="search" />
                  <button type="submit" className="input-group-text"><img src="/images/search.png" width="15" /></button>                         
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
        {displayAuthors}
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12 col-md-10">
            <ReactPaginate 
            previousLabel={"«"}
            nextLabel={"»"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination pagination-circle"}
            previousLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            disabledClassName={"disabled"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            />
          </div>
          <div className="col-12 col-md-2">
            <div className="page_no">
              <b>Page {pageNumber+1} of {pageCount}</b>
            </div>
          </div>
        </div>
      </section> 
    </div>
  )
}
