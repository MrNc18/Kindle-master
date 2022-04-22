import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllAuthorService } from "../admin/services/author";
import {
  getAllBookService,
  getBookBySlugService,
} from "../admin/services/book";
import data from "../data";
import { FormModel } from "./../model/FormModel";
import { showAlert } from "./../utils/showAlert";
import { baseurl } from "./../utils/request";
import { getBookByTag } from "./../admin/services/book";

export default function ProductDetail({ history }) {
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const params = useParams();
  const formName = "reviewForm";
  const [book, setBook] = useState({});
  const [review, setReview] = useState([]);
  const [otherBooks, setOtherBooks] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getBookBySlugService(params?.id);
        setBook(response?.data?.data?.result);
        setReview(response?.data?.data?.book_comments);
        const otherBooks = await getBookByTag(params?.id);
        setOtherBooks(otherBooks?.data?.data?.result || []);
      } catch (error) {
        showAlert("Not to fetch book details.", "error");
        history.push("store");
      } finally {
      }
    })();
    getAllAuthorService();
  }, []);

  useEffect(() => {
    new FormModel(formName)._createForm({
      name: userDetails.first_name + userDetails.last_name || "",
      email: userDetails.email,
    });
  }, [userDetails]);

  const authors = useSelector((reduxstate) => reduxstate.models.author) || [];
  const author = authors.find((item) => item.id == book.author) || {};
  const reviewFormValue = useSelector((state) => state.forms[formName]) || {};

  const displayProducts = data.products.map((product) => {
    return (
      <div key={product._id}>
        <div className="card">
          <div className="book_img">
            <a href="#">
              <img
                className="heart-icon"
                src={
                  product.new_release
                    ? "/images/new.png"
                    : "/images/heart-icon.png"
                }
                alt="Add to Wishlist"
              />
            </a>
            <a href={`/products/${product._id}`}>
              <img className="card-img-top" src={product.image} alt="Book1" />
            </a>
          </div>
          <div className="card-body">
            <a href={`/products/${product._id}`}>
              <h5 className="card-title">{product.title}</h5>
            </a>
            <p className="card-text">By {product.author}</p>
            <div className="rating">
              <span>
                {" "}
                <i className="fa fa-star"></i>{" "}
              </span>
              <span>
                {" "}
                <i className="fa fa-star"></i>{" "}
              </span>
              <span>
                {" "}
                <i className="fa fa-star"></i>{" "}
              </span>
              <span>
                {" "}
                <i className="fa fa-star"></i>{" "}
              </span>
              <span>
                {" "}
                <i className="fa fa-star"></i>{" "}
              </span>
            </div>
            <div className="price">{product.price}</div>
            <a href="/cart">
              <img
                className="cart-icon"
                src="/images/cart-btn.png"
                alt="cart"
              />
            </a>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Store</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Store</li>
                  <li>Scientific</li>
                  <li>{book.name}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5 pt-4 mb-5 pb-4">
        <div className="row cart_added">
          <div className="col-12">
            <div className="view-box">
              <div className="float-left">
                <ul>
                  <li>
                    <img
                      src="/images/check-circle.png"
                      alt="feather-check-circle"
                    />
                    “Prison Reeducation Methods” has been added to your cart.
                  </li>
                </ul>
              </div>
              <div className="float-right">
                <a href="/cart">View Cart</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5">
            <div className="book-full-img">
              <img
                src={
                  book.cover_img
                    ? `${baseurl}/images/${book.cover_img}`
                    : "/images/book1.png"
                }
                className="img-fluid"
              />
              <img
                src="/images/magnify-icon.png"
                className="img-fluid magnify-icon"
              />
            </div>
          </div>
          <div className="col-12 col-md-7">
            <div className="book-details">
              <h1>{book.name}</h1>
              <div className="price">
                {book.price} Kz&nbsp;
                <span className="old_price">7,200.00 Kz</span>
              </div>
              <div className="rating">
                <span>
                  {" "}
                  <i className="fa fa-star-o"></i>{" "}
                </span>
                <span>
                  {" "}
                  <i className="fa fa-star-o"></i>{" "}
                </span>
                <span>
                  {" "}
                  <i className="fa fa-star-o"></i>{" "}
                </span>
                <span>
                  {" "}
                  <i className="fa fa-star-o"></i>{" "}
                </span>
                <span>
                  {" "}
                  <i className="fa fa-star-o"></i>{" "}
                </span>
                <span className="review">
                  Be the first to review this product
                </span>
              </div>
            </div>
            <div className="book-specs">
              <p className="book_auth mb-2">
                By{" "}
                <span className="auth_name">{`${author.first_name} ${author.last_name}`}</span>
              </p>
              <p className="book_info mb-2">
                Sales Format: <span className="black_clr">Book</span>
              </p>
              <p className="book_info mb-2">
                Size: <span className="black_clr">{book.size}</span>
              </p>
              <p className="book_info mb-2">
                Number of pages:{" "}
                <span className="black_clr">{book.page_count}</span>
              </p>
              <p className="book_info mb-2">
                Release: <span className="black_clr">{book.edition_year}</span>
              </p>
            </div>
            <div className="book-qty row">
              <div className="col-md-2 qty">Quantity</div>
              <div className="col-md-2">
                <div className="qty_counter d-flex">
                  <input type="button" value="-" className="minus" />
                  <input
                    type="text"
                    name="qty"
                    value="1"
                    className="text-center input-qty w-100"
                  />
                  <input type="button" value="+" className="plus" />
                </div>
              </div>
              <div className="col-md-4 addcart">
                <a
                  className="btn btn-primary contact_btn addcart_btn w-100"
                  href="#"
                >
                  add to cart
                </a>
              </div>
              <div className="col-md-4 add_wishlist">
                <button className="btn btn-primary">
                  <img src="/images/green-heart-icon.png" />
                  <span>Add to wishlist</span>
                </button>
              </div>
            </div>
            <div className="book-specs">
              <p className="book_auth mb-2">
                Author{" "}
                <span className="auth_name">{`${author.first_name} ${author.last_name}`}</span>
              </p>
              <p className="book_info mb-2">
                Categories:{" "}
                <span className="black_clr">{book?.book_category?.name}</span>
              </p>
              <p className="book_info mb-2">
                Tags:{" "}
                <span className="black_clr">
                  {(book?.book_tags || []).map((item) => item.name).join(", ")}
                </span>
              </p>
              <p className="book_info mb-2">
                Product code: <span className="black_clr">{book.id}</span>
              </p>
            </div>

            <div className="author-social pt-2 pb-2">
              <h2 className="book_social">
                Share <span>on social media</span>
              </h2>
              <div className="author_links">
                <a href="#">
                  <i className="fa fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="author_pic_name pt-2">
              <img src="/images/author_pic.png" />
              <span className="auth_name">{`${author.first_name} ${author.last_name}`}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid book_tabs">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ul
                className="nav nav-pills mb-3 pb-2"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="pills-desc-tab"
                    data-toggle="pill"
                    href="#pills-desc"
                    role="tab"
                    aria-controls="pills-desc"
                    aria-selected="true"
                  >
                    Description
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-info-tab"
                    data-toggle="pill"
                    href="#pills-info"
                    role="tab"
                    aria-controls="pills-info"
                    aria-selected="false"
                  >
                    Additional Information
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-toggle="pill"
                    href="#pills-reviews"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews ({review.length})
                  </a>
                </li>
              </ul>
              <div className="row">
                <div className="col-md-8 offset-md-2">
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="pills-desc"
                      role="tabpanel"
                      aria-labelledby="pills-desc-tab"
                    >
                      {/* <p className="desc_text">
                        We are Editora Acácias, since November 2015 we have been proudly operating in the Angolan publishing market. We are focused on publishing books that set the imagination free. We believe that knowledge transforms humanity and that's why we share it in every book we commit to publish. We live to innovate, dynamize, explore, integrate and make knowledge accessible through paper, digital and oral. Acácias is currently the publisher of all established and new writers/authors, national and foreign, young people, adults and/or children.
                      </p>
                      <h4>WE BET ON THE FOLLOWING EDITORIAL LINES:</h4>
                      <ul className="our_bet">
                        <li>Literature: Romance | Poetry | Tale | Chronicle | Novel</li>
                        <li>Self-help: Well-being | Health | Sexuality | Relationships | Motivational | Finance | Spirituality</li>
                        <li>Management and Education: Career | Business | Administration | Leadership | Human resource Management</li>
                        <li>Technicians / Didactics: Theses | Educational Manuals | Guides</li>
                      </ul>
                      <p className="mb-0 btm_line">AS THE NEXT BOOK COULD BE YOURS, WE INVITE YOU TO DISCOVER BOOKS THAT SET YOUR IMAGINATION FREE.</p> */}
                      {book.description || "Demo description"}
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-info"
                      role="tabpanel"
                      aria-labelledby="pills-info-tab"
                    >
                      <table className="book_info_tbl w-100">
                        <tr>
                          <td className="short">Size:</td>
                          <td>{book.size}</td>
                        </tr>
                        <tr>
                          <td>Number of pages:</td>
                          <td>{book.page_count}</td>
                        </tr>
                      </table>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="pills-reviews"
                      role="tabpanel"
                      aria-labelledby="pills-reviews-tab"
                    >
                      <h5>Reviews</h5>
                      <p>There are no reviews yet.</p>
                      <h5>{book.name}</h5>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                      {userDetails && (
                        <>
                          <h5>Your Rating</h5>
                          <div className="rating">
                            <span>
                              {" "}
                              <i className="fa fa-star-o"></i>{" "}
                            </span>
                            <span>
                              {" "}
                              <i className="fa fa-star-o"></i>{" "}
                            </span>
                            <span>
                              {" "}
                              <i className="fa fa-star-o"></i>{" "}
                            </span>
                            <span>
                              {" "}
                              <i className="fa fa-star-o"></i>{" "}
                            </span>
                            <span>
                              {" "}
                              <i className="fa fa-star-o"></i>{" "}
                            </span>
                          </div>
                        </>
                      )}
                      <form className="review_form mt-3">
                        <div className="row">
                          <div className="col-12">
                            <div className="form-group">
                              <label>Your review *</label>
                              <textarea
                                className="form-control"
                                name="review_message"
                                id="review_message"
                                rows="5"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Name *</label>
                              <input
                                type="text"
                                className="form-control"
                                id="reviewer_name"
                                name="reviewer_name"
                                aria-describedby=""
                                placeholder=""
                                value={reviewFormValue.name}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group">
                              <label>Email *</label>
                              <input
                                type="email"
                                className="form-control"
                                id="reviewer_email"
                                name="reviewer_email"
                                aria-describedby="emailHelp"
                                placeholder=""
                                value={reviewFormValue.email}
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="form-group">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="reviewer_name_save"
                                  id="gridCheck"
                                />
                                <label className="form-check-label">
                                  Save my name, email, and website in this
                                  browser for the next time I comment.
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                            >
                              SUBMIT
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid bestsell_new u_may_like">
        <div className="container">
          <div className="row bestseller">
            <div className="col-md-12">
              <h2 className="body_heading">You may also like</h2>
              <div className="best_slider">{displayProducts}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
