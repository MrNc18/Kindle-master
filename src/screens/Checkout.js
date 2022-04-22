import React, { useEffect, useState } from "react";
import { getAllCart } from "./../admin/services/cart";
import { useSelector } from "react-redux";
import {
  getTotalAmmount,
  enableButton,
  getPayload,
} from "./../utils/checkoutUtils";
import { getCookie, AUTH_TOKEN } from "./../utils/cookie";
import { baseurl } from "./../utils/request";
import { FormModel } from "./../model/FormModel";
import { addOrderService } from "../admin/services/orders";
import { showAlert } from "./../utils/showAlert";

export default function Checkout({ history }) {
  const formName = "orderForm";
  const cart = useSelector((state) => state.models.cart) || [];
  const formData = useSelector((state) => state.forms[formName]) || {};
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const [shippingType, setShippingType] = useState(true);

  useEffect(() => {
    getAllCart();
    new FormModel(formName)._createForm({
      email: userDetails.email,
      userId: userDetails.userId,
      status: "Received",
    });
  }, []);

  const getProps = (id) => {
    return {
      value: formData[id],
      onChange: (e) =>
        new FormModel(formName)._update({ [id]: e.target.value }),
    };
  };

  const price = getTotalAmmount(cart);

  const [diffShippingAddress, setDiffShippingAddress] = useState();
  const isAuthenticated = getCookie(AUTH_TOKEN);
  const payload = {
    ...formData,
    price,
    diffShippingAddress,
  };
  const buttonEnable = enableButton(payload);
  return (
    <div>
      <section className="container">
        <div className="row">
          <div className="col-12 col-md-7 col-sm-7">
            <div className="cart_top_row">
              <h2 className="body_heading mt-5">Checkout</h2>
            </div>
            <div className="form-one">
              <div className="w-100">
                <span className="s1 float-left mb-2">Contact Information</span>
                {!isAuthenticated && (
                  <span className="s2 float-right mb-2">
                    Already have an account?{" "}
                    <a href="/login">
                      <b>Log in</b>
                    </a>
                  </span>
                )}
              </div>
              <form>
                <div className="form-group">
                  <input
                    {...getProps("email")}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email Address"
                  />
                  <div className="form-check mt-2 mb-2">
                    <input
                      {...getProps()}
                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                    />
                    <small
                      className="form-check-label text-muted"
                      htmlFor="exampleCheck1"
                    >
                      Keep me up to date on new Publish Books
                    </small>
                  </div>
                </div>
              </form>
            </div>
            <div className="cart_top_row">
              <h2 className="body_heading mt-4">Billing Address</h2>
            </div>
            <div className="form-one">
              <form id="myForm" action="#">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        First Name<em className="red">*</em>
                      </label>
                      <input
                        {...getProps("billing_firstname")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Last Name<em className="red">*</em>
                      </label>
                      <input
                        {...getProps("billing_lastname")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Company Name (Optional)
                      </label>
                      <input
                        {...getProps("billing_companyName")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Country / Town<em className="red">*</em>
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>Select Country/Town</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Address<em className="red">*</em>
                      </label>
                      <input
                        {...getProps("billing_address")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Street name and house number"
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Address (Optional)
                      </label>
                      <input
                        {...getProps("billing_address_optional")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Location<em className="red">*</em>
                      </label>
                      <input
                        {...getProps("billing_location")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Province<em className="red">*</em>
                      </label>
                      <select
                        className="form-control"
                        id="exampleFormControlSelect1"
                      >
                        <option>Select Province</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Phone<em className="red">*</em>
                      </label>
                      <input
                        {...getProps("billing_phone")}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Email address<em className="red">*</em>
                      </label>
                      <input
                        {...getProps()}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check mt-1 mb-1">
                      <input
                        {...getProps()}
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <small
                        className="form-check-label text-muted"
                        htmlFor="exampleCheck1"
                      >
                        Create an account?
                      </small>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-check mt-1 mb-1">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="changeShip"
                        onChange={() =>
                          setDiffShippingAddress(!diffShippingAddress)
                        }
                      />
                      <small
                        className="form-check-label text-muted text-uppercase"
                        htmlFor="exampleCheck1"
                      >
                        Ship to a Different Address?
                      </small>
                    </div>
                  </div>

                  {diffShippingAddress && (
                    <div id="changeShipInputs">
                      <div className="row ml-1 mr-1">
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              First Name<em className="red">*</em>
                            </label>
                            <input
                              {...getProps("shipping_firstname")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Last Name<em className="red">*</em>
                            </label>
                            <input
                              {...getProps("shipping_lastname")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Company Name (Optional)
                            </label>
                            <input
                              {...getProps("shipping_companyName")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Country / Town<em className="red">*</em>
                            </label>
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>Select Country/Town</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Address<em className="red">*</em>
                            </label>
                            <input
                              {...getProps("shipping_address")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder="Street name and house number"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Address (Optional)
                            </label>
                            <input
                              {...getProps("shipping_address_optional")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Location<em className="red">*</em>
                            </label>
                            <input
                              {...getProps("shipping_location")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Province<em className="red">*</em>
                            </label>
                            <select
                              className="form-control"
                              id="exampleFormControlSelect1"
                            >
                              <option>Select Province</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Phone<em className="red">*</em>
                            </label>
                            <input
                              {...getProps("shipping_phone")}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-12 col-md-6 col-sm-6">
                          <div className="form-group">
                            <label htmlFor="formGroupExampleInput">
                              Email address<em className="red">*</em>
                            </label>
                            <input
                              {...getProps()}
                              type="text"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="col-12">
                    <hr />
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <label htmlFor="formGroupExampleInput">
                        Order notes (optional)
                      </label>
                      <textarea
                        {...getProps("ordernote")}
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="3"
                        placeholder="Notes about your order (eg special delivery information)."
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-md-5 col-sm-5">
            <div className="cart_top_row">
              <h2 className="body_heading mt-5">Your Order</h2>
            </div>
            <div className="radio-box">
              <div className="form-check form-check-inline">
                <input
                  {...getProps("shipping")}
                  className="form-check-input"
                  type="radio"
                  checked={!payload.shipping}
                  onChange={(e) =>
                    new FormModel(formName)._update({ shipping: 0 })
                  }
                />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  Home Delivery
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  {...getProps("shipping")}
                  onChange={(e) =>
                    new FormModel(formName)._update({ shipping: 1 })
                  }
                  className="form-check-input"
                  type="radio"
                  checked={shippingType}
                  checked={payload.shipping}
                />
                <label className="form-check-label" htmlFor="inlineRadio2">
                  Pick-up from Acacias Store
                </label>
              </div>
            </div>
            <div className="order-box">
              <div className="row">
                <div className="col-md-12 table-responsive">
                  <table className="book_info_tbl w-100" border="0">
                    <tr className="header_row">
                      <td>Product</td>
                      <td>Qty</td>
                      <td className="text-center">Subtotal</td>
                    </tr>
                    {cart.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                className="cart_book_img"
                                src={
                                  item.cover_img
                                    ? `${baseurl}/images/${item.cover_img}`
                                    : "/images/book1.png"
                                }
                              />
                              <span className="cart_book_name">
                                {item.name}
                              </span>
                            </div>
                          </td>
                          <td className="cart_price text-center">
                            {item.buyQantity}
                          </td>
                          <td className="cart_price text-center">
                            {item.price}
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div className="subtotal row">
                  <div className="col-md-6">
                    <h2>Subtotal</h2>
                  </div>
                  <div className="col-md-6 text-right">
                    <h3>{price} Kz</h3>
                  </div>
                  <div className="col-md-6">
                    <h2>Shipping</h2>
                  </div>
                  <div className="col-md-6 text-right">
                    <a
                      data-toggle="collapse"
                      href="#collapseExample"
                      role="button"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      <b>Calculated at next step</b>
                    </a>
                  </div>
                  <div className="collapse w-100" id="collapseExample">
                    <form className="calculated">
                      <div className="form-group col-12">
                        <label htmlFor="inputState">
                          Select a Country/Region
                        </label>
                        <select id="inputState" className="form-control">
                          <option selected>Country</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="inputState">Select a State</label>
                        <select id="inputState" className="form-control">
                          <option selected>State</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="form-group col-12">
                        <label htmlFor="inputState">Select a State</label>
                        <input
                          {...getProps()}
                          type="text"
                          name=""
                          className="form-control"
                          placeholder="Zip/Postal Code"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary contact_btn cal_rate_btn"
                        href="#"
                      >
                        Calculate Rates
                      </button>
                    </form>
                  </div>
                  <div className="shipping">
                    <h1>
                      There are 4 shipping rates available for 91326,
                      California, United States, starting at 10.45 Kz.
                    </h1>
                    <div className="form-check">
                      <input
                        {...getProps()}
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        value="option1"
                        checked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Small Packet USA Air at 10.45 Kz
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        {...getProps()}
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        value="option2"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios2"
                      >
                        Tracked Packet USA at 13.75 Kz
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        {...getProps()}
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios3"
                        value="option3"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios3"
                      >
                        Expedited Parcel USA at 19.22 Kz
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        {...getProps()}
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios4"
                        value="option4"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios4"
                      >
                        Xpresspost USA at 31.66 Kz
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="row">
                <div className="col-12">
                  <hr />
                  <form>
                    <p>If you have a discount coupon, please enter it below.</p>
                    <div className="form-row align-items-center">
                      <div className="col-auto">
                        <label className="sr-only" htmlFor="inlineFormInput">
                          Name
                        </label>
                        <input
                        {...getProps()}
                          type="text"
                          className="form-control mb-2"
                          id="inlineFormInput"
                          placeholder="Coupon code"
                        />
                      </div>
                      <div className="col-auto">
                        <button type="submit" className="btn btn-primary mb-2">
                          Apply coupon
                        </button>
                      </div>
                    </div>
                  </form>
                  <hr />
                </div>
              </div>
               */}

              <div className="subtotal row">
                <div className="col-md-6">
                  <h4>Total</h4>
                </div>
                <div className="col-md-6 text-right">
                  <h6>
                    <strong>{getTotalAmmount(cart)} Kz</strong>
                  </h6>
                </div>
              </div>
              <div className="agree">
                <div className="form-group">
                  <div className="form-check">
                    <input
                      {...getProps()}
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      I have read and agree to the website{" "}
                      <a href="#">terms and conditions</a>
                    </label>
                  </div>
                </div>
              </div>
              <button
                // onClick={() => }
                onClick={() => {
                  try {
                    addOrderService(getPayload(payload, cart));
                    showAlert("Order Created Successfully.", "success");
                    history.push("/admin/order");
                  } catch (error) {}
                }}
                className="order-box-btn"
                disabled={buttonEnable}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="clear">&nbsp;</div>
      <div className="clear">&nbsp;</div>
    </div>
  );
}
