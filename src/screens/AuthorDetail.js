import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAllAuthorService } from '../admin/services/author';
import { getAllBookService } from '../admin/services/book';
import data from '../data'
import { groupBy } from '../utils';

export default function AuthorDetail(props) {

    useEffect(() => {
      getAllAuthorService();
  }, []);

  useEffect(() => {
    getAllBookService();
  }, []);

  const params = useParams();
  const authors = useSelector((reduxstate) => reduxstate.models.author) || [];
  const books = useSelector((reduxstate) => reduxstate.models.book) || [];
  // console.log(books);

  const author = authors.find((item) => item.id == params?.id) || {};

    const displayAuthorBooks = data.products
    .slice(0,4)
    .map(product => {
      return (
        <div className="col-md-3" key={product._id}>
          <div className="card">
              <div className="book_img">
                <a href="#"><img className="heart-icon" src={product.new_release ? "/images/new.png" : "/images/heart-icon.png"} alt="Add to Wishlist" /></a>
                <a href={`/products/${product._id}`}><img className="card-img-top" src={product.image} alt="Book1" /></a>
              </div>
              <div className="card-body">
                <a href={`/products/${product._id}`}><h5 className="card-title">{product.title}</h5></a>
                <p className="card-text">By {product.author}</p>
                <div className="rating">
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                </div>
                <div className="price">{product.price}</div>
                <a href="/cart"><img className="cart-icon" src="/images/cart-btn.png" alt="cart" /></a>
              </div> 
          </div>
        </div>
      )
    })

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
                  <li><a href="#">Home</a></li>
                  <li>Authors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5 pt-4 mb-5 pb-4">
        <div className="row">
          <div className="col-12 col-md-4 col-sm-4">
            <div className="author-full-img">
              <img src={author.image || '/images/author-11.jpg'} className="img-fluid" />
            </div>
          </div>
          <div className="col-12 col-md-8 col-sm-4">
            <div className="author-details">
              <h1>{`${author.first_name} ${author.last_name}`}</h1>
              <b>{author.heading || 'THE POET OF THE ENCONTRO COM FÁTIMA BERNARDES PROGRAM'}</b>
              <p>
                {author.description || 'Born on April 5, 1956, he completed his primary studies in the Municipality of Soyo, Zaire Province, having completed pre-university education at Liceu Salvador Correia in Luanda. He studied at the Polytechnic Institute of Vinnitsa in the Republic of Ukraine from 1986 to 1991 in the field of Energy. On May 5, 1995, he was recruited by SONANGOL to the Soyo Regional Directorate with the aim of creating a company dedicated to communications at the Kwanda BASE. In mid 1997, he went to New York, USA, for the company GSI, with the aim of training in Satellite. In the same year, he had other trainings, in England, in the city of London, at the companies Motorola Sistema Trunking and at Mitel Telephony, in the USA, at Comtech-EFDATA in the state of Arizona. Thus, he became the first Satellite Engineer and until the final creation of the Embryonic Company MSTELCOM SARL in 1999. His contribution to the growth of the company is reflected in the expansion of communications throughout the National Territory and the training of new technicians such as the legacy of leave after your retirement.'}
              </p>
            </div>
            <div className="author-social">
              <h2>Social Media</h2>
              <ul>
                <li><a href='#'><i className="fab fa-facebook-f"></i></a></li>
                <li><a href='#'><i className="fab fa-twitter"></i></a></li>
                <li><a href='#'><i className="fab fa-linkedin-in"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container auth_books">
        <div className="row">
          <div className="col-md-12">
            <h2 className="text-center mb-4">AUTHOR'S BOOKS</h2>
          </div>
        </div>
        <div className="row pb-5 main_store">
          {displayAuthorBooks}
        </div>
      </section>
    </div>
  )
}
