import { React, useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllAuthorService } from "../admin/services/author";
import { addOrUpdateCart } from "../admin/services/cart";
import { showAlert } from "./../utils/showAlert";
import { addWishlistService } from "./../admin/services/cart";
import { useHistory } from "react-router-dom";
import { baseurl } from "./../utils/request";

export const ProductCard = ({ product }) => {
  const authors = useSelector((reduxstate) => reduxstate.models.author) || [];
  const author = authors.find((item) => item.id == product.author) || {};
  const cart = useSelector((reduxstate) => reduxstate.models.cart) || [];
  const history = useHistory();

  const addToWishList = async () => {
    try {
      await addWishlistService({
        book_id: product.id,
        book_name: product.name,
        book_slug: product.slug,
        image_url: product.cover_img,
      });
      showAlert("Added wishlist.", "success");
    } catch (error) {}
  };

  return (
    <div className="col-md-4" key={product.id}>
      <div className="card mb-4">
        <div className="book_img">
          <a onClick={addToWishList}>
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
          <a onClick={() => history.push(`/products/${product.slug}`)}>
            <img
              className="card-img-top"
              src={
                product.cover_img
                  ? `${baseurl}/images/${product.cover_img}`
                  : "/images/book1.png"
              }
              alt="Book1"
            />
          </a>
        </div>
        <div className="card-body">
          <a onClick={() => history.push(`/products/${product.slug}`)}>
            <h5 className="card-title">{product.name}</h5>
          </a>
          <p className="card-text">
            By {`${author.first_name || ""} ${author.last_name || ""}`}
          </p>
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
          <div className="price">{product.price} Kz</div>
          {!!cart.find((ins) => ins.id == product.id) ? (
            <img className="cart-icon" src="/images/addedToCart.png" alt="cart-added" />
          ) : (
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                addOrUpdateCart({ ...product, buyQantity: 1 });
                showAlert("Product successfully added in cart .", "success");
              }}
            >
              <img
                className="cart-icon"
                src="/images/cart-btn.png"
                alt="cart"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
