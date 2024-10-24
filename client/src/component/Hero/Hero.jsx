// import { useState, useEffect, useCallback } from "react";
import FeedFetcher from "../Cards/FeedFetcher";
import testData from "../../sample-data.json";
import "./Hero.css";

const Hero = () => {

  return (
    <>
      <div className="hero">
        <div className="hero__content">
          <FeedFetcher feedcontent={testData["sample-data"]} />
        </div>
      </div>
    </>
  );
};

export default Hero;
