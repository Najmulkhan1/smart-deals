import React, { Suspense } from "react";
import LatestProducts from "../components/LatestProducts";

const Home = () => {
  const latestProductPromise = fetch(
    "http://localhost:3000/latest-products"
  ).then((res) => res.json());

  return (
    <div className="w-11/12 mx-auto">
      <Suspense>
        <LatestProducts
          latestProductPromise={latestProductPromise}
        ></LatestProducts>
      </Suspense>
    </div>
  );
};

export default Home;
