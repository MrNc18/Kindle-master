import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import LoginAdmin from "./containers/Login";
import SignupAdmin from "./containers/signUp";
import ForgotPassword from "./containers/ForgotPassword";
import Dashboard from "./containers/Dashboard";
import ResetPassword from "./containers/ResetPassword";
import { getCookie, AUTH_TOKEN } from "./../utils/cookie";
import { showAlert } from "./../utils/showAlert";
import BlogList from "./containers/blogManagement/BlogList";
import CategoryList from "./containers/blogManagement/CategoryList";
import EventCatrgoryList from "./containers/eventManagement/CategoryList";
import DashboardCategory from "./containers/bookCategory/CategoryList";
import EventList from "./containers/eventManagement/EventList";
import AuthorManagement from "./containers/AuthorManagement";
import StoreList from "./containers/storeManagement/StoreList";
import StoreTransaction from "./containers/storeManagement/StoreTransaction";
import TransactionDetails from "./containers/storeManagement/TransactionDetails";
import { getUserDetailsByToken } from "./services/authentication";
import CustomerList from "./containers/customerManegmemt/CustomerList";
import CustomerDetails from "./containers/customerManegmemt/CustomerDetails";
import { useSelector } from "react-redux";
import { isEmpty } from "./../utils/index";
import UnAuthorizePanel from "./components/atoms/UnAuthorizePanel";
import ContentList from "./containers/contentManagement/ContentList";
import { FAQList } from "./containers/contentManagement/FAQ";
import BookList from "./containers/bookManagement/BookList";
import Navbar from "./components/header/Navbar";
import { Orders } from "./../screens/Orders";
import OrderManagement from "./containers/orders/OrderManagement";

export const Admin = () => {
  React.useEffect(() => {
    getUserDetailsByToken();
  }, []);

  return (
    <Switch>
      <Route path="/admin/sign-up" component={SignupAdmin} />
      <Route path="/admin/forgot-password" component={ForgotPassword} />
      <AuthRoute exact path="/admin/dashboard" component={Dashboard} />
      <AuthRoute
        exact
        path="/admin/dashboard/category"
        component={DashboardCategory}
        accessKey="manageBookCategory"
      />
      <AuthRoute
        exAuthRoutect
        path="/admin/customer-management/:id"
        component={CustomerDetails}
        accessKey="customerManagement"
      />
      <AuthRoute
        exact
        path="/admin/customer-management"
        component={CustomerList}
        accessKey="customerManagement"
      />
      <Route exact path="/admin/content-management" component={ContentList} />
      <AuthRoute exact path="/admin/store-management" component={StoreList} />
      <AuthRoute
        exact
        path="/admin/store-management/transaction/:id"
        component={StoreTransaction}
      />
      <AuthRoute
        exact
        path="/admin/store-management/transaction-details/:id"
        component={TransactionDetails}
      />
      <AuthRoute
        exact
        path="/admin/blog-management/category"
        component={CategoryList}
        accessKey="manageBlogCategory"
      />
      <AuthRoute path="/admin/author-management" component={AuthorManagement} />
      <AuthRoute path="/admin/blog-management" component={BlogList} />
      <AuthRoute
        exact
        path="/admin/event-management/category"
        component={EventCatrgoryList}
        accessKey="manageEventCategory"
      />
      <AuthRoute path="/admin/events-management" component={EventList} />
      <AuthRoute path="/admin/order-management" component={OrderManagement} />
      <AuthRoute
        path="/admin/book-management"
        component={(props) => (
          <Navbar>
            <BookList {...props} />
          </Navbar>
        )}
      />

      <AuthRoute
        path="/admin/change-password/"
        component={(props) => <Dashboard {...props} showChangePasswordModal />}
      />
      <AuthRoute path="/admin/faq/" component={FAQList} />

      <AuthRoute path="/admin/orders/" component={Orders} accessKey="orders" />
      <Route path="/admin/emailVerification/:id" component={ResetPassword} />
      <Route path="/" component={LoginAdmin} />
    </Switch>
  );
};

const AuthRoute = (props) => {
  const isAuthenticated = getCookie(AUTH_TOKEN);

  const userAuth = useSelector((state) => state.forms.userAuth) || {};

  if (!isAuthenticated) {
    showAlert("You are not authorized user. Please login!", "error");
    return <Redirect from={props.path} to="/admin/login" />;
  }

  if (props.accessKey && !isEmpty(userAuth) && !userAuth[props.accessKey]) {
    return <Route path={props.path} component={UnAuthorizePanel} />;
  }

  return <Route {...props} />;
};
