import React, { useState, useEffect } from "react";
import {
  getAllBookCategoryService,
  getAllBookService,
  getAllTags,
} from "../admin/services/book";
import data from "../data";
import { useSelector } from "react-redux";
import { ProductCard } from "./../components/ProductCard";
import { getAllAuthorService } from "../admin/services/author";
import { debounce } from "@material-ui/core";
import {
  covertNumberToPrice,
  parseParams,
} from "./../admin/components/uploadBook/utils";
import { filterBook } from "./../admin/services/book";

const filterBooksByParams = debounce(
  (filterMinPrice, filterMaxPrice, category, authorList, storeId, tagList) => {
    filterBook(
      filterMinPrice,
      filterMaxPrice,
      category,
      authorList,
      storeId,
      tagList
    );
  },
  400
);

export default function Stores(props) {
  const {
    category = "",
    filterMaxPrice = 4000,
    filterMinPrice = 0,
    author,
    store,
    tagList = "",
  } = parseParams(props.location.search || "");
  const authorList = JSON.parse(author || "[]");

  useEffect(() => {
    getAllBookCategoryService();
    getAllBookService();
    getAllAuthorService();
    getAllTags();
  }, []);

  useEffect(() => {
    if (
      category ||
      filterMaxPrice ||
      filterMinPrice ||
      author ||
      store ||
      tagList
    ) {
      filterBooksByParams(
        filterMinPrice,
        filterMaxPrice,
        category,
        authorList,
        store,
        tagList
      );
    }
  }, [category, filterMaxPrice, filterMinPrice, author, store, tagList]);

  const convertQueryParams = (
    authorList,
    category,
    filterMaxPrice,
    filterMinPrice
  ) => {
    return new URLSearchParams({
      author: JSON.stringify(authorList),
      filterMaxPrice,
      filterMinPrice,
      category,
      store,
    });
  };

  const addFilter = (...all) => {
    props.history.push(`/stores?${convertQueryParams(...all)}`);
  };

  const { author: authors = [], tag = [] } =
    useSelector((reduxstate) => reduxstate.models) || [];

  const { book = [], bookCategory = [] } = useSelector((state) => state.models);
  console.log(book);
  const displayProducts = book.map((product) => {
    return <ProductCard key={product.id} product={product} />;
  });

  const displayBestRecommendedBooks = data.products.map((product) => {
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
            <a href={`/products/${product.slug}`}>
              <img className="card-img-top" src={product.image} alt="Book1" />
            </a>
          </div>
          <div className="card-body">
            <a href={`/products/${product.slug}`}>
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
                    <a href="#">Home</a>
                  </li>
                  <li>Store</li>
                  <li>Scientific</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid main_store">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="searchtop">
                <div className="input-group">
                  <input
                    type="text"
                    className="htmlForm-control"
                    placeholder="Search Book Here"
                    name="search_book"
                    id="search_book"
                  />
                  <button type="submit" className="input-group-text">
                    <img src="/images/search.png" />
                  </button>
                </div>
              </div>
              <div className="filters mt-4">
                <div className="filter_heading">SHOP BY</div>
                <div className="filter_body">
                  <div className="by_price mb-3">
                    <p className="headng mb-2">FILTER BY PRICE</p>
                    <div className="row mb-2">
                      <div className="col-4">
                        <p className="small mb-0">Min</p>
                        <input
                          type="text"
                          className="w-100"
                          name="min_price"
                          id="min_price"
                          value={filterMinPrice}
                        />
                      </div>
                      to
                      <div className="col-4">
                        <p className="small mb-0">Max</p>
                        <input
                          type="text"
                          className="w-100"
                          name="max_price"
                          id="max_price"
                          value={covertNumberToPrice(filterMaxPrice)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <input
                          type="range"
                          className="w-100"
                          name="rangeInput"
                          min="0"
                          max="50000"
                          defaultValue={filterMaxPrice}
                          step="500"
                          onChange={(event) => {
                            addFilter(
                              authorList,
                              category,
                              event.target.value,
                              filterMinPrice,
                              store,
                              tagList
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="by_author mb-3">
                    <p className="headng mb-2 mt-2">FILTER BY AUTHOR</p>
                    <div className="author_chkbox">
                      {authors.map((author) => (
                        <>
                          <input
                            type="checkbox"
                            id={`author${author.id}`}
                            name={`author${author.id}`}
                            value={`${author.first_name} ${author.last_name}`}
                            checked={authorList?.includes(author.id)}
                            onChange={() => {
                              let newList = [];
                              if (authorList.includes(author.id)) {
                                newList = authorList.filter(
                                  (item) => item != author.id
                                );
                              } else {
                                newList = [...authorList, author.id];
                              }

                              addFilter(
                                newList,
                                category,
                                filterMaxPrice,
                                filterMinPrice,
                                store,
                                tagList
                              );
                            }}
                          />
                          <label htmlFor={`author${author.id}`}>
                            {" "}
                            {`${author.first_name} ${author.last_name}`}
                            (0)
                          </label>
                          <br />
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="hang_tags">
                    <p className="headng mb-2 mt-2">HANG TAGS</p>
                    <div className="author_chkbox">
                      {tag.map((tag) => (
                        <>
                          <input
                            type="checkbox"
                            id={`tag${tag.id}`}
                            name={`tag${tag.id}`}
                            value={tag.name}
                            onChange={(e) => {
                              let tags = tagList.split(",") || [];
                              if (e.target.checked) {
                                tags = tags.filter((item) => item !== tag.id);
                              } else {
                                tags = [...tags, tag.id];
                              }
                              addFilter(
                                authorList,
                                category,
                                filterMaxPrice,
                                filterMinPrice,
                                author,
                                store,
                                tags
                              );
                            }}
                          />
                          <label htmlFor={`tag${tag.id}`}> {tag.name}</label>
                          <br />
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 store_right_col">
              <div className="row mb-3">
                <div className="col-md-8">
                  <h3>Store</h3>
                </div>
                <div className="col-md-4">
                  <select
                    onChange={(event) => {
                      addFilter(
                        authorList,
                        event.target.value,
                        filterMaxPrice,
                        filterMinPrice,
                        store,
                        tagList
                      );
                    }}
                    name="categories"
                    className="w-100"
                  >
                    <option value="">Categories</option>
                    {bookCategory.map(({ id, name }) => (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="row pb-4">
                {book.length ? displayProducts : "No Book Found."}
              </div>
              <div className="row pb-4">
                <div className="col-md-12">
                  <h3 className="mb-3">Best Sellers</h3>
                  <div className="store_slider">
                    {displayBestRecommendedBooks}
                  </div>
                </div>
              </div>

              <div className="row pb-4">
                <div className="col-md-12">
                  <h3 className="mb-3">Recommended</h3>
                  <div className="store_slider">
                    {displayBestRecommendedBooks}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
