import React, { useEffect } from "react";
import { getAllEventCategoryService } from "../admin/services/event";
import data from "../data";
import { getAllEventService } from "./../admin/services/event";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { baseurl } from "./../utils/request";

export default function EventDetail(props) {
  useEffect(() => {
    getAllEventCategoryService();
    getAllEventService();
  }, []);

  const events = useSelector((reduxstate) => reduxstate.models.event) || [];
  const categoryList =
    useSelector((reduxstate) => reduxstate.models.eventCategory) || [];

  const getCategoryName = (id) => {
    return categoryList.find((item) => item.id === id)?.name;
  };

  const params = useParams();
  const event = events.find((item) => item.slug === params.id) || {};

  return (
    <div>
      <section className="inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>Events</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/events">Events</a>
                  </li>
                  <li>{event.slug}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="event-full-img mt-5">
                <img
                  src={
                    `${baseurl}/images/${event.image}` ||
                    "/images/event-full-img.png"
                  }
                  alt="event-full-img"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5 mb-5 pb-4">
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="author-details">
              <h1>{event.name}</h1>
              <p dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
            <div className="author-social">
              <h2>Share This Event</h2>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="event-details">
              <h3>Event Details</h3>
              <ul>
                <li>
                  <strong>
                    <img src="/images/calendar-icon.png" alt="calendar-icon" />
                  </strong>
                  <span>
                    <b>Date</b>
                    <p>{moment(event.createdAt).format("MMM D, YYYY")}</p>
                  </span>
                </li>
                <li>
                  <strong>
                    <img src="/images/clock-icon.png" alt="clock-icon" />
                  </strong>
                  <span>
                    <b>Time</b>
                    <p>
                      {moment(event.time, "hh:mm:ss").format("h:mm a")}
                      {}
                    </p>
                  </span>
                </li>
                <li>
                  <strong>
                    <img
                      src="/images/organizer-icon.png"
                      alt="organizer-icon"
                    />
                  </strong>
                  <span>
                    <b>Organizer</b>
                    <p>{event.organizer}</p>
                  </span>
                </li>
                <li>
                  <strong>
                    <img src="/images/category-icon.png" alt="category-icon" />
                  </strong>
                  <span>
                    <b>CATEGORY</b>
                    <p>{getCategoryName(event.category_id)}</p>
                  </span>
                </li>
                <li>
                  <strong>
                    <img src="/images/address-icon.png" alt="address-icon" />
                  </strong>
                  <span>
                    <b>ADDRESS</b>
                    <p>{event.address}</p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="row">
          <div className="body_heading w-100 text-center text-uppercase mb-4">
            <h2>Related Events</h2>
          </div>
        </div>
        <div className="row related_events">
          <div className="col-12 col-md-6">
            <div className="event-box">
              <div className="row">
                <div className="col-12 col-md-5 col-sm-5">
                  <div className="event-box-img">
                    <img
                      src="/images/event-img.png"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-12 col-md-7 col-sm-7">
                  <div className="event-box-text">
                    <h1>Children</h1>
                    <ul>
                      <li>
                        <img
                          src="/images/calendar-icon.png"
                          alt="calendar-icon"
                        />{" "}
                        Sept 19, 2021
                      </li>
                      <li>
                        <img src="/images/clock-icon.png" alt="clock-icon" />{" "}
                        4:56:11 PM
                      </li>
                    </ul>
                    <h3>
                      Sit pariatur molestias est nihil fuga Quo voluptas veniam
                      perferendis.
                    </h3>
                    <p>
                      Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                      South
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="event-box">
              <div className="row">
                <div className="col-12 col-md-5 col-sm-5">
                  <div className="event-box-img">
                    <img
                      src="/images/event-img.png"
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
                <div className="col-12 col-md-7 col-sm-7">
                  <div className="event-box-text">
                    <h1>Children</h1>
                    <ul>
                      <li>
                        <img
                          src="/images/calendar-icon.png"
                          alt="calendar-icon"
                        />{" "}
                        Sept 19, 2021
                      </li>
                      <li>
                        <img src="/images/clock-icon.png" alt="clock-icon" />{" "}
                        4:56:11 PM
                      </li>
                    </ul>
                    <h3>
                      Sit pariatur molestias est nihil fuga Quo voluptas veniam
                      perferendis.
                    </h3>
                    <p>
                      Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                      South
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="clear">&nbsp;</div>
      <div className="clear">&nbsp;</div>
    </div>
  );
}
