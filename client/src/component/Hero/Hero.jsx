// import { useState, useEffect, useCallback } from "react";
import FeedFetcher from "../Cards/FeedFetcher";
import testData from "../../sample-data.json";
import "./Hero.css";

const Hero = () => {
  // console.log(testData["sample-data"]);
  return (
    <>
      <div className="hero">
        <div className="hero__content">
          <FeedFetcher feedcontent={testData} />
        </div>
      </div>
    </>
  );
};

export default Hero;
