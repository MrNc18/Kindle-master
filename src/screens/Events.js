import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  getAllEventCategoryService,
  getAllEventService,
} from "../admin/services/event";
import { useSelector } from "react-redux";
import moment from "moment";
import { getAllEventBycategoryService } from "./../admin/services/event";
import { baseurl } from "./../utils/request";

export default function Events() {
  const [pageNumber, setPageNumber] = useState(0);
  const [catName, setCatName] = useState("All Events");

  useEffect(() => {
    getAllEventCategoryService();
    getAllEventService();
  }, []);

  const events = useSelector((reduxstate) => reduxstate.models.event) || [];
  const categoryList =
    useSelector((reduxstate) => reduxstate.models.eventCategory) || [];

  const eventsPerPage = 18;
  const eventsVisited = pageNumber * eventsPerPage;

  const getCategoryName = (id) => {
    return categoryList.find((item) => item.id === id)?.name;
  };

  const displayEvents = events
    .slice(eventsVisited, eventsVisited + eventsPerPage)
    .map((event) => {
      return (
        <div key={event.id} className="col-12 col-md-3 col-sm-3">
          <div className="event-box">
            <div className="row" style={{ height: "200px" }}>
              <div className="col-12 col-md-5">
                <div className="event-box-img">
                  <img
                    src={
                      event.image
                        ? `${baseurl}/images/${event.image}`
                        : "/images/event-img.png"
                    }
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="col-12 col-md-7">
                <div className="event-box-text">
                  <h1>{getCategoryName(event.category_id)}</h1>
                  <ul>
                    <li>
                      <img
                        style={{ width: "12px", height: "10px" }}
                        src="/images/calendar-icon.png"
                        alt="calendar-icon"
                      />{" "}
                      {moment(event.date).format("MMM D, YYYY")}
                    </li>
                    <li>
                      <img
                        style={{ width: "12px", height: "10px" }}
                        src="/images/clock-icon.png"
                        alt="clock-icon"
                      />{" "}
                      {event.time}
                    </li>
                  </ul>
                  <a class="event-link" href={`/events/${event.slug}`}>
                    <h3>
                      {event.name.split(" ").splice(0, 4).join(" ") + "..."}
                    </h3>
                    {/* <p>{event.description}</p> */}
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          event.description &&
                          event.description.split(" ").splice(0, 7).join(" ") +
                            "...",
                      }}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(events.length / eventsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

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
                  <li>Events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-4 mb-4">
        <div className="row">
          <div className="col-12 col-md-7">
            <h1 className="heading_01">{catName}</h1>
          </div>
          <div className="col-12 col-md-3">
            <div className="searchtop">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control inner_page_search"
                  placeholder="Search Events on Keywords"
                  name="search"
                  id="search"
                />
                <button type="submit" className="input-group-text">
                  <img src="/images/search.png" width="15" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-2">
            <div class="input-group">
              <select
                onChange={(e) => {
                  const filterValue = e.target.value;
                  if (filterValue == "all") {
                    getAllEventService();
                    setCatName("All Events");
                  } else {
                    setCatName(getCategoryName(Number(filterValue)));
                  }
                  getAllEventBycategoryService(filterValue);
                }}
                class="custom-select"
                id="filter_events"
              >
                <option value="all" selected>
                  Filter
                </option>
                {categoryList.map(({ id, name }) => {
                  return (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5">
        <div className="row">{displayEvents}</div>
      </section>

      <section className="container">
        <div className="row">
          <div className="col-12 col-md-10">
            <ReactPaginate
              previousLabel={"«"}
              nextLabel={"»"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination pagination-circle"}
              previousLinkClassName={"page-link"}
              previousClassName={"page-item"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              disabledClassName={"disabled"}
              activeClassName={"active"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
            />
          </div>
          <div className="col-12 col-md-2">
            <div className="page_no">
              <b>
                Page {pageNumber + 1} of {pageCount}
              </b>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
