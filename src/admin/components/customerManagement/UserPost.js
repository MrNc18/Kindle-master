import { Grid } from "@material-ui/core";
import React from "react";
import Navbar from "../header/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import PostCard from "./PostCard";

const useStyles = makeStyles(() => ({
  alignRight: {
    textAlign: "right",
    marginBottom: "20px",
  },
  chartPanel: {
    marginTop: "20px",
  },
}));

export default () => {
  const classes = useStyles();

  return (
      <Grid item md={12}>
        <Grid container spacing={6}>
          {[
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
            {
              image: "/images/custImg.png",
              name: "Diana Flaska",
              profession: "Writer",
              published_on: "Thursday 28/9/2021",
              post_img: "/images/postImg.png",
            },
          ].map((ins) => {
            return (
              <Grid item md={3}>
                <PostCard {...ins} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
  );
};
