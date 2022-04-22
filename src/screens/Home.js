import React, { useState, useEffect } from "react";
import DisplayAdvanceEditorText from "../admin/components/atoms/DisplayAdvanceEditorText";
import data from "../data";
import { baseurl } from "./../utils/request";
import { getCMSforAll } from "../admin/services/cms";

export default function Home() {
  const [cmsData, setCMSData] = useState([]);

  const getCmsData = async () => {
    const response = await getCMSforAll();
    setCMSData(response);
  };

  useEffect(() => {
    getCmsData();
  }, []);

  const displayProducts = data.products.map((product) => {
    console.log("data",data)
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

  const displayChildrenProducts = data.products.slice(0, 6).map((product) => {
    return (
      <div className="col-lg-4 pb-4" key={product._id}>
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

  const displayChildrenProducts2 = data.products.slice(0, 4).map((product) => {
    return (
      <div className="col-6 pb-4" key={product._id}>
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

  const displayTopAuthors = data.authors.slice(0, 11).map((author) => {
    return (
      <div key={author._id} className="text-center">
        <a href={`/authors/${author._id}`}>
          <img src="/images/topauth1.png" alt="" />
          <p className="tauth_name">{author.name}</p>
        </a>
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
        <p className="tauth_books pt-3">64 Books</p>
      </div>
    );
  });

  const displayFeaturedBlogs = data.blogs.map((blog) => {
    return (
      <div className="feat_blog" key={blog._id}>
        <a
          href={`/blogs/${blog.title
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")}`}
        >
          <img className="w-100" src="/images/blog1.png" alt="" />
        </a>
        <div className="blog_info">
          <p className="blog_date mb-2">
            <a
              href={`/blogs/${blog.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")}`}
            >
              {blog.category} / {blog.date}
            </a>
          </p>
          <p className="blog_desc">
            <a
              href={`/blogs/${blog.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")}`}
            >
              {blog.title.slice(0, 40) + "..."}
            </a>
          </p>
        </div>
      </div>
    );
  });

  return (
    <div>
      <section className="container-fluid home_slider">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  {cmsData.map((item, index) => (
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={index}
                      className={!index ? "active" : ""}
                      key={item.id}
                    />
                  ))}
                </ol>
                <div className="carousel-inner">
                  {cmsData.map(
                    (
                      {
                        title = "",
                        subtitle = "",
                        link = "",
                        description = "",
                        image = "",
                      },
                      index
                    ) => (
                      <div
                        className={`carousel-item ${!index ? "active" : ""}`}
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="slider_left">
                              <p className="subtitle mb-0">{subtitle}</p>
                              <h1 className="slider_heading">{title}</h1>
                              <p className="desc">
                                <DisplayAdvanceEditorText data={description} />
                              </p>
                              <a
                                className="btn btn-primary contact_btn"
                                href={"/stores" + link}
                              >
                                Buy Now
                              </a>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <img
                              className="d-block w-100"
                              src={`${baseurl}/images/${image}`}
                              alt="First slide"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
                <a
                  className="carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid bestsell_new">
        <div className="container">
          <div className="row bestseller">
            <div className="col-md-12">
              <h2 className="body_heading">Best Sellers</h2>
              <div className="best_slider">{displayProducts}</div>
            </div>
          </div>

          <div className="row newreleases">
            <div className="col-md-12">
              <h2 className="body_heading">New Releases</h2>
              <div className="best_slider">{displayProducts}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid services">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="multicolor_heading text-center">
                Discover Our Editorial{" "}
                <span className="green_font">Services</span>
              </h2>
              <div className="border_div"></div>
            </div>
          </div>
          <div className="row services_row">
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/proofreading.png" alt="proofreading" />
                <p className="text-center">
                  <a href="#">Proofreading and Editing</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/layout.png" alt="layout" />
                <p className="text-center">
                  <a href="#">Layout</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/cover.png" alt="cover-design" />
                <p className="text-center">
                  <a href="#">Cover Design</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/print.png" alt="print" />
                <p className="text-center">
                  <a href="#">Print</a>
                </p>
              </div>
            </div>
          </div>
          <div className="row services_row">
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/advisory.png" alt="Editorial Advisory" />
                <p className="text-center">
                  <a href="#">Editorial Advisory</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img src="/images/copyesque.png" alt="Copyesque" />
                <p className="text-center">
                  <a href="#">Copyesque</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box">
                <img
                  src="/images/coordination.png"
                  alt="Editorial Coordination"
                />
                <p className="text-center">
                  <a href="#">Editorial Coordination</a>
                </p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="service-box more">
                <p className="text-center">
                  <span className="big_font">15</span>
                  <br />
                  Services are More
                </p>
                <a className="btn btn-primary contact_btn" href="/services">
                  View All&nbsp;
                  <img src="/images/arrow-right.png" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid bookofweek">
        <div className="container">
          <div className="row">
            <div className="col-10 col-lg-11">
              <h2 className="body_heading">Book of the Week</h2>
            </div>
            <div className="col-2 col-lg-1">
              <a href="/stores" className="seeall">
                See all
              </a>
            </div>
          </div>
          <div className="row bookweek">
            <div className="col-md-6 green-bg">
              <div className="botw">
                <div className="row botw_main">
                  <div className="col-lg-6">
                    <img
                      className="best_book"
                      src="/images/bookofweek.png"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <p className="botw_month mb-2 mt-1">August 2021</p>
                    <h3 className="botw_name">A desafiar os Limites da Vida</h3>
                    <p className="botw_auth mb-2">By António Pascoal Eduardo</p>
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
                    <div className="botw_location mt-2">
                      <img src="/images/location.png" alt="" />
                      <p>Rua Reverendo Agostinho Pedro Neto - Luanda</p>
                    </div>
                    <a className="btn btn-primary contact_btn" href="/cart">
                      <img src="/images/cart-with-bg.png" alt="" />
                      <span>Add to cart</span>
                    </a>
                  </div>
                </div>
                <div className="row white_bg">
                  <div className="col-md-12">
                    <div className="booklovers">
                      <img src="/images/booklover1.png" alt="" />
                      <img src="/images/booklover2.png" alt="" />
                      <img src="/images/booklover3.png" alt="" />
                      <p>
                        <span>+23</span> Book Lovers
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="rec_author pl-5">
                <h3>Recommended Author</h3>
                <div className="d-flex align-items-center mb-3">
                  <img src="/images/auth1.png" />
                  <div>
                    <p className="author_name">Jerald Toy</p>
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
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img src="/images/auth2.png" />
                  <div>
                    <p className="author_name">Josephine McDermott DDS</p>
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
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img src="/images/auth3.png" />
                  <div>
                    <p className="author_name">Rene Witting</p>
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
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img src="/images/auth4.png" />
                  <div>
                    <p className="author_name">Mrs. Ernestine Feest</p>
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
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <img src="/images/auth5.png" />
                  <div>
                    <p className="author_name">Darlene Bahringer</p>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid child_book">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="body_heading">Children's Book</h2>
            </div>
          </div>
          <div className="row childbook">
            <div className="col-4 col-lg-3 customer">
              <div className="cust_top">
                <p className="cust">
                  Customer
                  <br />
                  <span>100% Satisfaction</span>
                </p>
                <p className="child_desc mb-0">
                  It was popularised in the 1960s with the release of Letraset
                  sheets containing Lorem Ipsum passages, and more recently with
                  desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>
                <img className="w-100" src="/images/childbook_2.png" alt="" />
              </div>
            </div>

            <div className="col-8 col-lg-9">
              <div className="cbook_slider">
                <div className="cbooks">
                  <div className="row">{displayChildrenProducts}</div>
                </div>

                <div className="cbooks">
                  <div className="row">{displayChildrenProducts}</div>
                </div>
              </div>

              <div className="cbook_slider_md">
                <div className="cbooks">
                  <div className="row">{displayChildrenProducts2}</div>
                </div>

                <div className="cbooks">
                  <div className="row">{displayChildrenProducts2}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid pub_book">
        <div className="row">
          <div className="col-md-6">
            <img className="w-100" src="/images/Slide-2.png" />
          </div>
          <div className="col-md-5">
            <div className="pub_book_rightcol">
              <h2 className="multicolor_heading">
                Publish <span className="green_font">Book</span>
              </h2>
              <div className="border_div"></div>
              <p>
                Dictum vel donec viverra habitasse vitae commodo neque libero
                odio tempus eget laoreet id arcu molestie.
              </p>
              <div className="row">
                <div className="col-sm-6">
                  <p className="mt-3">
                    <span className="bullet">1</span>Register
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mt-3">
                    <span className="bullet">2</span>Fill Form
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mt-3">
                    <span className="bullet">3</span>Upload Book
                  </p>
                </div>
                <div className="col-sm-6">
                  <p className="mt-3">
                    <span className="bullet">4</span>Publish a Book
                  </p>
                </div>
              </div>
              <a className="btn btn-primary contact_btn mt-3" href="#">
                Get Started&nbsp;
                <img src="/images/services/arrow-right.png" alt="" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid special_offer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>Special Offer</h3>
              <h2>Get 10% Discount In 2 Order.</h2>
              <p>
                It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with
                desktop publishing software like Aldus PageMaker including
                versions of Lorem Ipsum.
              </p>
              <a className="btn btn-primary contact_btn mt-1" href="/stores">
                Explore Shop
              </a>
            </div>
            <div className="col-md-6">
              <img className="w-100 pt-4" src="/images/sp_offer.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid featured_blog pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="body_heading mb-0">Featured Blog</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="best_slider">{displayFeaturedBlogs}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid top_authors pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="body_heading mb-0">Top Authors</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="topauth_slider">{displayTopAuthors}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
