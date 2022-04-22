import React, { useState } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import AuthorDetail from "./screens/AuthorDetail";
import Authors from "./screens/Authors";
import BlogDetail from "./screens/BlogDetail";
import Blogs from "./screens/Blogs";
import Cart from "./screens/Cart";
import ContactUs from "./screens/ContactUs";
import CreateNewPassword from "./screens/CreateNewPassword";
import Distributors from "./screens/Distributors";
import EventDetail from "./screens/EventDetail";
import Events from "./screens/Events";
import FAQs from "./screens/FAQs";
import ForgetPassword from "./screens/ForgetPassword";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PreSaleForm from "./screens/PreSaleForm";
import ProductDetail from "./screens/ProductDetail";
import Register from "./screens/Register";
import RegisterForm from "./screens/RegisterForm";
import Services from "./screens/Services";
import Stores from "./screens/Stores";
import VerifyEmailAddress from "./screens/VerifyEmailAddress";
import WhoWeAre from "./screens/WhoWeAre";
import { Admin } from "./admin/AdminRoutes";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import store from "./redux/store";
import { Provider, useSelector } from "react-redux";
import Checkout from "./screens/Checkout";
import OrderReceived from "./screens/OrderReceived";
import PaymentMethods from "./screens/PaymentMethods";
import { getUserDetailsByToken } from "./admin/services/authentication";
import { getCookie, AUTH_TOKEN, deleteCookie } from "./utils/cookie";
import { getAllBlogBycategoryService } from "./admin/services/blog";
import { getAllCart, getAllWishListService } from "./admin/services/cart";
import { getAllBookCategoryService } from "./admin/services/book";
import { WishList } from "./admin/components/customer/wishList";
import { getAllStoreService } from "./admin/services/store";
import { MenuItem } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

export default () => {
  return (
    <Provider store={store}>
      <ToastContainer
        transition={Slide}
        position="bottom-center"
        hideProgressBar
        newestOnTop={false}
      />
      <BrowserRouter>
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

function App() {
  const history = useHistory();
  const [showDrawer, setShowDrawer] = useState(false);
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  React.useEffect(() => {
    getUserDetailsByToken();
    getAllBlogBycategoryService();
    getAllCart();
    getAllBookCategoryService();
    getAllWishListService();
    getAllStoreService();
  }, []);
  const { first_name, last_name } = userDetails;
  const full_name = `${first_name} ${last_name}`;

  const isAuthenticated = getCookie(AUTH_TOKEN);

  const bookCategory = useSelector((state) => state.models.bookCategory) || [];
  const cart = useSelector((state) => state.models.cart) || [];
  const wishList = useSelector((state) => state.models.wishList) || [];
  const stores = useSelector((state) => state.models.store) || [];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="main-content">
      <WishList
        data={wishList}
        open={showDrawer}
        toggleDrawer={() => setShowDrawer(false)}
      />
      <header>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <a className="navbar-brand logo" href="/">
                <img style={{ height: "58px" }} src="/images/logo1.png" />
              </a>
            </div>
            <div className={"col-md-5"}>
              <div className="searchtop">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="To search for"
                    name="search"
                    id="search"
                  />
                  <button type="submit" className="input-group-text">
                    <img src="/images/search.png" />
                  </button>
                </div>
              </div>
            </div>
            <div className={"col-md-4"}>
              <ul id="header-right-menu">
                {isAuthenticated && (
                  <li
                    style={{
                      marginTop: "5px",
                    }}
                    onClick={() => setShowDrawer(true)}
                  >
                    {!!wishList?.length && (
                      <div className="notification">{wishList.length}</div>
                    )}
                    <img
                      src="/images/Favorite.png"
                      className={"no-border"}
                      style={{ width: "30px", height: "25px" }}
                    />
                    {/* {showDrawer && ( */}

                    {/* )} */}
                  </li>
                )}
                <li
                  style={{
                    marginTop: "5px",
                    minWidth: "100px",
                    display: "flex",
                    position: "relative",
                  }}
                  onClick={() => history.push("/cart")}
                >
                  {!!cart?.length && (
                    <div className="notification">{cart.length}</div>
                  )}
                  <img
                    style={{ width: "30px", height: "25px" }}
                    src="/images/shopping-cart.png"
                  />
                </li>
                <li
                  style={{
                    width: "170px",
                    display: "flex",
                    fontSize: "14px",
                    paddingLeft: "10px",
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <div
                        aria-describedby={id}
                        style={{ display: "flex" }}
                        onClick={handleClick}
                      >
                        <img
                          src="/images/author-12.jpg"
                          style={{ height: " 36px" }}
                          className="userpic"
                        />
                        <div style={{ margin: "10px 0px 0 10px" }}>
                          {full_name}
                        </div>
                      </div>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        style={{ padding: "5px" }}
                      >
                        <MenuItem
                          onClick={() => {
                            if (userDetails.role === 5) {
                              history.push(`/admin/orders`);
                            } else {
                              history.push(`/admin/dashboard`);
                            }
                          }}
                        >
                          Dashboard
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            deleteCookie(AUTH_TOKEN);
                            history.push(`/login`);
                            window.location.reload();
                          }}
                        >
                          Logout
                        </MenuItem>
                      </Popover>
                    </>
                  ) : (
                    <img
                      onClick={() => history.push("/login")}
                      src="/images/User.png"
                      style={{
                        width: "30px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div id="explore_menu">
                <p>
                  <img src="/images/Icon-bar.png" />
                  &nbsp;<span>Explore Books</span>
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-7">
              <nav
                className="navbar navbar-expand-lg navbar-light"
                id="header_menu"
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarNav"
                  aria-controls="navbarNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li
                      className={
                        window.location.pathname === "/"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/">
                        Home <span className="sr-only">(current)</span>
                      </a>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/who-we-are"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/who-we-are">
                        Who We Are
                      </a>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/services"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/services">
                        Services
                      </a>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        data-toggle="dropdown"
                      >
                        Stores
                      </a>
                      <ul className="dropdown-menu">
                        {stores.map(({ name, id }) => (
                          <li>
                            <a
                              onClick={() =>
                                history.push(`/stores?store=${id}`)
                              }
                              className="dropdown-item"
                            >
                              {name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/authors"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/authors">
                        Authors
                      </a>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/events"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/events">
                        Events
                      </a>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/blogs"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/blogs">
                        Blogs
                      </a>
                    </li>
                    <li
                      className={
                        window.location.pathname === "/faqs"
                          ? "nav-item active"
                          : "nav-item"
                      }
                    >
                      <a className="nav-link" href="/faqs">
                        FAQs
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-md-3 col-lg-2">
              <a className="btn btn-primary contact_btn" href="/contact-us">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </header>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/who-we-are" component={WhoWeAre}></Route>
        <Route path="/services" component={Services}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/forget-password" component={ForgetPassword}></Route>
        <Route
          path="/verify-emailaddress"
          component={VerifyEmailAddress}
        ></Route>
        <Route
          path="/create-new-password"
          component={CreateNewPassword}
        ></Route>
        <Route path="/presale-form" component={PreSaleForm}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/register-form/:type" component={RegisterForm}></Route>
        <Route path="/authors" component={Authors} exact></Route>
        <Route path="/authors/:id" component={AuthorDetail}></Route>
        <Route path="/stores" component={Stores}></Route>
        <Route path="/contact-us" component={ContactUs}></Route>
        <Route path="/faqs" component={FAQs}></Route>
        <Route path="/events" component={Events} exact></Route>
        <Route path="/events/:id" component={EventDetail}></Route>
        <Route exact path="/blogs/cat/:id" component={Blogs}></Route>
        <Route exact path="/blogs/" component={Blogs} exact></Route>
        <Route exact path="/blogs/:title" component={BlogDetail}></Route>

        <Route path="/products/:id" component={ProductDetail}></Route>
        <Route path="/cart" component={Cart}></Route>
        <Route path="/distributors" component={Distributors}></Route>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/payment-methods" component={PaymentMethods}></Route>
        <Route path="/order-received" component={OrderReceived}></Route>
      </Switch>
      <div className="container-fluid newsletter">
        <div className="container">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h2 className="section_heading text-center">
                Subscribe to our newsletter
              </h2>
              <div className="input-group mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control subs_email"
                  placeholder="Your email address"
                />
                <input
                  type="submit"
                  className="input-group-text subs_btn"
                  value="Subscribe"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3 first_col">
              <a className="navbar-brand logo" href="#">
                <img style={{ height: "58px" }} src="/images/logo1.png" />
              </a>
              <p>
                Somos a Editora Acácias, desde novembro de 2015 actuamos
                orgulhosamente no mercado editorial Angolano. Estamos focados em
                publicar livros que libertam a imaginação.
              </p>
              <h3>Social Links</h3>
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
              <a href="#">
                <i className="far fa-envelope"></i>
              </a>
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#">
                <i className="fab fa-telegram-plane"></i>
              </a>
            </div>
            <div className="col-md-6 col-lg-3 second_col">
              <h3>Useful Link</h3>
              <ul>
                <li>
                  <a href="/distributors">Distributors</a>
                </li>
                <li>
                  <a href="/authors">Authors and Illustrators</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
                <li>
                  <a href="/contact-us">Contact</a>
                </li>
                <li>
                  <a href="#">Frequently Asked Questions</a>
                </li>
                <li>
                  <a href="#">Security and Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Exchanges and Returns Policy</a>
                </li>
              </ul>
            </div>
            <div className="col-md-6 col-lg-3 payment_col">
              <h3>Safe Buy:</h3>
              <img src="/images/payments.png" className="w-100" alt="" />
              <h3 className="mt-4">Payment Methods Accepted:</h3>
              <p>
                <span className="green_font">Our Partners:</span> Leendo Books,
                Kufuta, Castelo das Edições, Soba, Starmarket, Buitanda,
                Stekargo
              </p>
            </div>
            <div className="col-md-6 col-lg-3 third_col">
              <h3>Contact Info</h3>
              <ul>
                <li>
                  Rua Reverendo Agostinho Pedro Neto, Prédio 20, 1º Andar, Porta
                  nº 15- Luanda - Angola.
                </li>
                <li>
                  Contact Number: <br />
                  <a href="tel:+244226432020">+244 226 432 020</a> <br />
                  <a href="tel:+244931167191">+244 931 167 191</a>
                </li>
                <li>
                  Email Address:{" "}
                  <a href="mailto:editora.acacias@eacacias.com">
                    editora.acacias@eacacias.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row copyright_row">
            <div className="col-md-12">
              <p className="text-center">
                © 2021 Editora Acácias. Todos os direitos reservados - Desenhado
                pela Moce Desenhos.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="modal fade popup-newsletter"
        id="newsletterModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="newletter-img">
                    <img
                      src="/images/newsletter-img.png"
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">
                      <img src="/images/close-circle.png" />
                    </span>
                  </button>
                  <h5 className="modal-title" id="exampleModalLabel">
                    Receive our news first hand
                  </h5>
                  <form>
                    <div className="form-group">
                      <label>
                        Name<em className="red">*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label>
                        Email address<em className="red">*</em>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                      />
                    </div>
                    <button type="button" className="btn btn-primary">
                      I want to receive the News!
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
