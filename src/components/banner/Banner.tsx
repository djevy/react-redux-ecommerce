import React, { useEffect } from "react";
import "./banner.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { loadBanner, selectBanner } from "./bannerSlice";
import { AppDispatch } from "../../store";
import { urlFor } from "../../client";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

type Props = {};

const Banner = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(loadBanner());
  }, [dispatch]);
  const banner = useSelector(selectBanner)[0];
  console.log(banner);
  return (
    <div>
      {banner ? (
        <div className="hero-banner-container">
          <div className="banner-large-text">
            <h3>{banner.midText}</h3>
            <h2>{banner.largeText}</h2>
            <p className="banner-small-text">{banner.smallText}</p>
            <Link to="/sales" className="buttons">
              <Button variant="contained" color="error">
                {banner.buttonText}
              </Button>
            </Link>
          </div>
          <Link to="/sales" className="hero-image-link">
            <img
              src={urlFor(banner.image)?.url()}
              alt={banner.smallText}
              className="hero-banner-image"
            />
          </Link>

          {/* <div className="desc">
          <h5>{}</h5>
          <p>{desc}</p>
        </div> */}
        </div>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
};

export default Banner;
