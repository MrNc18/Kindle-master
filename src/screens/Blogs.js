import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { getAllBlogCategory, getAllBlogs } from "../admin/services/blog";
import moment from "moment";
import { groupBy } from "../utils/index";
import { baseurl } from "./../utils/request";
import { useParams } from "react-router";
import { getAllBlogBycategoryService } from "./../admin/services/blog";

export default function Blogs({ history }) {
  const [pageNumber, setPageNumber] = useState(0);
  const { id } = useParams();
  const [allBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getAllBlogs();
      setAllBlogs(response.data);
    })();
    getAllBlogCategory();
  }, []);

  useEffect(() => {
    if (id) {
      getAllBlogBycategoryService(id);
    } else {
      getAllBlogs();
    }
  }, [id]);

  const blogs = useSelector((reduxstate) => reduxstate.models.blog) || [];
  const categoryList =
    useSelector((reduxstate) => reduxstate.models.blogCategory) || [];

  const blogsPerPage = 4;
  const blogsVisited = pageNumber * blogsPerPage;

  const blogGroupByCategory = groupBy(allBlogs, (item) => item.category_id);

  const displayBlogs = blogs
    .slice(blogsVisited, blogsVisited + blogsPerPage)
    .map((blog) => {
      return (
        <div key={blog.id} className="blog-detail-box">
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
                <li>
                  <img src="/images/category-icon.png" /> Leave a Comment
                </li>
              </ul>
              <h1>{blog.title}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    blog.description &&
                    blog.description.split(" ").splice(0, 20).join(" ") + "...",
                }}
              />
              <a
                onClick={() => history.push(`/blogs/${blog.slug}`)}
                className="btn-primary"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(blogs.length / blogsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
            {displayBlogs}
            <div className="row">
              <div className="col-12">
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
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="event-details mb-4">
              <h3>ALL CATEGORIES</h3>
              <ul>
                <li key={"all"}>
                  <img src="/images/right-arrow.png" alt="right-arrow" />
                  <span className="text-uppercase pl-2">
                    All
                    <a onClick={() => history.push(`/blogs`)}>
                      {allBlogs?.length || 0}
                    </a>
                  </span>
                </li>
                {categoryList.map(({ name, id }) => {
                  console.log(blogGroupByCategory);
                  return (
                    <li key={id}>
                      <img src="/images/right-arrow.png" alt="right-arrow" />
                      <span className="text-uppercase pl-2">
                        {name}{" "}
                        <a onClick={() => history.push(`/blogs/cat/${id}`)}>
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
              <a href="#">VIEW ALL</a>
            </div>
            <div className="event-details mb-4">
              <h3>READ MORE POSTS</h3>
              <div className="latest-box">
                <div className="latest-box-img">
                  <img
                    src="/images/latest-03.png"
                    className="img-fluid"
                    alt="latest-01"
                  />
                </div>
                <span>
                  <img src="/images/calendar-icon.png" /> Sept 15, 2021
                </span>
                <h4>Et a nisi qui consequatur officia ipsam reprehenderit.</h4>
                <p>
                  Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                  South
                </p>
              </div>
              <div className="latest-box">
                <div className="latest-box-img">
                  <img
                    src="/images/latest-04.png"
                    className="img-fluid"
                    alt="latest-01"
                  />
                </div>
                <span>
                  <img src="/images/calendar-icon.png" /> Sept 15, 2021
                </span>
                <h4>Et a nisi qui consequatur officia ipsam reprehenderit.</h4>
                <p>
                  Technology Digital Meetup Event 2021 15 Sep, 2021 MicDrop
                  South
                </p>
              </div>
              <a href="#">VIEW ALL</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
