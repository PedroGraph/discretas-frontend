import React from "react";
import "./MainPage.css";
import RelatedProduct from "../../components/common/RelatedProducts";
import HomeSlider from "../../components/common/HomeSlider";

const MainPage = () => {
  return (
    <>
      <HomeSlider />
      <RelatedProduct />
    </>
  );
};

export default MainPage;