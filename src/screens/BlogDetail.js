import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addBlogReviewService,
  getAllBlogCategory,
  getBlogBySlugService,
} from "../admin/services/blog";
import { groupBy } from "../utils";
import { getAllBlogs } from "./../admin/services/blog";
import { useParams } from "react-router-dom";
import moment from "moment";
import { baseurl } from "./../utils/request";
import { FormModel } from "./../model/FormModel";
import { showAlert } from "./../utils/showAlert";

export default function BlogDetail(props) {
  const [btnLoading, setBtnLoading] = useState(false);
  const userDetails = useSelector((state) => state.forms.userDetails) || {};
  const [blog, setBlog] = useState({});
  const params = useParams();

  const formName = "reviewForm";
  useEffect(() => {
    getAllBlogCategory();
    getAllBlogs();
    (async () => {
      const response = await getBlogBySlugService(params?.title);
      setBlog(response?.data?.data || {});
    })();
  }, []);

  useEffect(() => {
    new FormModel(formName)._createForm({
      name: userDetails.first_name + userDetails.last_name || "",
      email: userDetails.email,
    });
  }, [userDetails]);

  const blogs = useSelector((reduxstate) => reduxstate.models.blog) || [];
  const categoryList =
    useSelector((reduxstate) => reduxstate.models.blogCategory) || [];
  const blogGroupByCategory = groupBy(blogs, (item) => item.category_id);
  const reviewFormValue = useSelector((state) => state.forms[formName]) || {};

  const addBlogReview = async () => {
    const { name, email, website = "", comment } = reviewFormValue;
    try {
      setBtnLoading(true);
      const response = await addBlogReviewService({
        name,
        email,
        website,
        comment,
        blog_id: blog.id,
      });
      new FormModel(formName)._update({
        comment: "",
        website: "",
        name: userDetails.first_name + userDetails.last_name || "",
        email: userDetails.email,
      });
      setBlog({
        ...blog,
        blog_comments: [...blog.blog_comments, response?.data?.data],
      });
      showAlert("Comment Added successfully!!", "success");
    } catch (error) {
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <section className="inner_bg blog_inner_bg">
        <div className="overlap-bg"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner_bg_text">
                <h1>What We Should Know About People We Don't Know</h1>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>Blog</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mt-5 mb-2">
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="blog-detail-box">
              <div className="blog-detail-img">
                <img
                  src={`${baseurl}/images/${blog.image}`}
                  className="img-fluid"
                  alt={blog.title}
                />
              </div>
              <div className="blog-detail-text">
                <div className="blog-detail-text-inner">
                  <ul>
                    <li>
                      <img src="/images/calendar-icon.png" />{" "}
                      {moment(blog.createdAt).format("MMM D, YYYY")}
                    </li>
                    <li>
                      <img src="/images/organizer-icon.png" /> Blog by Admin
                    </li>
                  </ul>
                  <h1>{blog.title}</h1>
                  <p dangerouslySetInnerHTML={{ __html: blog.description }} />
                  <div className="blog-social">
                    <h2>Share This Blog</h2>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
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
              </div>
            </div>
            <div className="read-more-post">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading_01">READ MORE POSTS</h1>
                </div>
                <div className="col-12 col-md-6 col-sm-6">
                  <div className="latest-box latest-box-two">
                    <div className="latest-box-img">
                      <img
                        src="/images/latest-03.png"
                        className="img-fluid w-100"
                        alt="latest-01"
                      />
                    </div>
                    <span className="pl-3 pr-3">
                      <img src="/images/calendar-icon.png" /> Sept 15, 2021
                    </span>
                    <h4 className="pl-3 pr-3">
                      Et a nisi qui consequatur officia ipsam reprehenderit.
                    </h4>
                    <p className="pl-3 pr-3">
                      Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                      South
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6">
                  <div className="latest-box latest-box-two">
                    <div className="latest-box-img">
                      <img
                        src="/images/latest-04.png"
                        className="img-fluid w-100"
                        alt="latest-01"
                      />
                    </div>
                    <span className="pl-3 pr-3">
                      <img src="/images/calendar-icon.png" /> Sept 15, 2021
                    </span>
                    <h4 className="pl-3 pr-3">
                      Et a nisi qui consequatur officia ipsam reprehenderit.
                    </h4>
                    <p className="pl-3 pr-3">
                      Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                      South
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="read-more-post">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading_01 mb-3">COMMENTS</h1>
                </div>
              </div>
              {(blog?.blog_comments || []).map(
                ({ id, name, comment, email }) => {
                  return (
                    <>
                      <div className="row">
                        <div className="col-3">
                          <div className="client-img">
                            <img
                              src="/images/c1.jpg"
                              className="img-fluid"
                              alt="c1"
                            />
                          </div>
                        </div>
                        <div className="col-9">
                          <div className="client-text">
                            <div className="ct-heading">
                              <div className="ct-heading-left">
                                <h2>{email}</h2>
                                <span>
                                  <img src="/images/calendar-icon.png" /> Sept
                                  15, 2021
                                </span>
                              </div>
                              {/* <div className="ct-heading-right">
                        <a href="#">
                          REPLY <img src="/images/reply.png" alt="reply" />
                        </a>
                      </div> */}
                            </div>
                            <div className="ct-comment">
                              <p>{comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="clearfix"></div>
                      <div className="clear">&nbsp;</div>
                    </>
                  );
                }
              )}
            </div>
            <div className="read-more-post">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading_01 mb-3">LEAVE A COMMENT</h1>
                </div>
              </div>
              <div className="comment-form">
                <div className="row">
                  <div className="col-12 col-md-6 col-sm-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputname">
                        Name <em className="red">*</em>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputname"
                        aria-describedby=""
                        placeholder=""
                        value={reviewFormValue.name || ""}
                        onChange={(e) =>
                          new FormModel(formName)._update({
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">
                        Email address<em className="red">*</em>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder=""
                        value={reviewFormValue.email || ""}
                        onChange={(e) =>
                          new FormModel(formName)._update({
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputWebsite">Website</label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputWebsite"
                        aria-describedby=""
                        placeholder=""
                        value={reviewFormValue.website || ""}
                        onChange={(e) =>
                          new FormModel(formName)._update({
                            website: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-sm-6">
                    <label htmlFor="exampleFormControlTextarea1">
                      Write Your Comment<em className="red">*</em>
                    </label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="8"
                      value={reviewFormValue.comment || ""}
                      onChange={(e) =>
                        new FormModel(formName)._update({
                          comment: e.target.value,
                        })
                      }
                    ></textarea>
                    <button
                      disabled={
                        btnLoading ||
                        !(
                          reviewFormValue.name &&
                          reviewFormValue.email &&
                          reviewFormValue.comment
                        )
                      }
                      onClick={addBlogReview}
                      className="btn btn-primary"
                    >
                      POST COMMENT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="event-details mb-4">
              <h3>ALL CATEGORIES</h3>
              <ul>
                {categoryList.map(({ name, id }) => {
                  console.log(blogGroupByCategory);
                  return (
                    <li key={id}>
                      <img src="/images/right-arrow.png" alt="right-arrow" />
                      <span className="text-uppercase pl-2">
                        {name}{" "}
                        <a href={`/blogs/cat/${id}`}>
                          {blogGroupByCategory[id]?.length || 0}
                        </a>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="event-details mb-4">
              <h3>ARCHIVE</h3>
              <ul>
                <li>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">September</span>
                </li>
                <li>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">August</span>
                </li>
                <li>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">July</span>
                </li>
                <li>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">June</span>
                </li>
                <li>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">May</span>
                </li>
              </ul>
            </div>
            <div className="event-details mb-4">
              <h3>LATEST POSTS</h3>
              <div className="latest-box">
                <div className="latest-box-img">
                  <img
                    src="/images/latest-01.png"
                    className="img-fluid"
                    alt="latest-01"
                  />
                </div>
                <h4>Et a nisi qui consequatur officia ipsam reprehenderit.</h4>
                <p>
                  Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                  South
                </p>
              </div>
              <div className="latest-box">
                <div className="latest-box-img">
                  <img
                    src="/images/latest-02.png"
                    className="img-fluid"
                    alt="latest-01"
                  />
                </div>
                <h4>Et a nisi qui consequatur officia ipsam reprehenderit.</h4>
                <p>
                  Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                  South
                </p>
              </div>
              <a href="#">View all</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
