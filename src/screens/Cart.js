import React, { useEffect } from "react";
import data from "../data";
import { getAllCart, saveAllCart } from "./../admin/services/cart";
import { useSelector } from "react-redux";
import { FormModel } from "./../model/FormModel";
import { CartModel } from "./../model/CartModal";
import { showAlert } from "./../utils/showAlert";
import { getTotalAmmount } from "./../utils/checkoutUtils";
import { baseurl } from "./../utils/request";

export default function Cart({ history }) {
  useEffect(() => {
    getAllCart();
  }, []);

  const cart = useSelector((state) => state.models.cart) || [];

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
      <section className="container cart_details">
        <div className="row">
          <div className="col-md-8">
            <div className="row cart_top_row">
              <div className="col-8">
                <h2 className="body_heading">Cart</h2>
              </div>
              <div className="col-4 text-right">
                <a href="/stores">
                  <i className="fas fa-arrow-left"></i>&nbsp;Continue Shopping
                </a>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 table-responsive">
                <table className="book_info_tbl w-100">
                  <tr className="header_row">
                    <td>Product</td>
                    <td className="text-center price_col">Price</td>
                    <td className="text-center qty_col">Quantity</td>
                    <td className="text-center">Subtotal</td>
                    <td></td>
                  </tr>
                  {cart.map((product) => {
                    return (
                      <tr key={product.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              className="cart_book_img"
                              src={
                                product.cover_img
                                  ? `${baseurl}/images/${product.cover_img}`
                                  : "/images/book1.png"
                              }
                            />
                            <span className="cart_book_name">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="cart_price text-center">
                          {product.price} Kz
                        </td>
                        <td>
                          <div className="qty_counter d-flex">
                            <input
                              onClick={() => {
                                new CartModel()._updateById(product.id, {
                                  buyQantity: Math.min(
                                    product.buyQantity - 1 || 1
                                  ),
                                });
                                saveAllCart(CartModel.getAll());
                              }}
                              type="button"
                              value="-"
                              className="minus"
                            />
                            <input
                              type="text"
                              value={product.buyQantity}
                              className="text-center w-100"
                              style={{ width: "100px", borderColor: "#ccc" }}
                            />
                            <input
                              type="button"
                              onClick={() => {
                                new CartModel()._updateById(product.id, {
                                  buyQantity: product.buyQantity + 1,
                                });
                                saveAllCart(CartModel.getAll());
                              }}
                              value="+"
                              className="plus"
                            />
                          </div>
                        </td>
                        <td className="cart_price text-center">
                          {product.price * product.buyQantity} Kz
                        </td>
                        <td>
                          <a
                            onClick={() => {
                              new CartModel()._delete(product.id);
                              saveAllCart(CartModel.getAll());
                            }}
                            className="remove_from_cart"
                            style={{ fontSize: "15px", cursor: "pointer" }}
                          >
                            &times;
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </div>

            {/* <div className="row coupon_row mt-4">
              <div className="col-md-12">
                <div className="bg-light d-flex justify-content-between coupon_inner_row">
                  <div>
                    <form className="form-inline">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control mr-2"
                          id="coupon_code"
                          name="coupon_code"
                          placeholder="Coupon code"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary apply_coupon"
                      >
                        Apply coupon
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
           */}
          </div>

          <div className="col-md-4">
            <div className="cart_total">
              <h3 className="mb-4">Cart Total</h3>
              <div className="d-flex justify-content-between subtotal_row">
                <span>Subtotal</span>
                <span>{getTotalAmmount(cart)} Kz</span>
              </div>
              <div className="d-flex justify-content-between total_row">
                <span>Total</span>
                <span>{getTotalAmmount(cart)} Kz</span>
              </div>
              <p className="mt-4 mb-4">Shipping calculated at checkout</p>
              <button
                type="submit"
                className="btn btn-primary to_checkout w-100"
                onClick={() => history.push("/checkout")}
              >
                Proceed to checkout
              </button>
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
