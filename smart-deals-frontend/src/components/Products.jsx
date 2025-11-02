import React from "react";
import { Link } from "react-router";

const Products = ({ product }) => {
  const { _id,title, price_min, price_max, image } = product;
  return (
    <div>
      <div className="card bg-base-100  shadow-sm">
        <figure className="px-4 pt-4">
          <img
          
            src={image}
            alt="Shoes"
            className="rounded-xl w-[432px] h-[276px] object-contain"
          />
        </figure>
        <div className="card-body ">
          <h2 className="card-title">{title}</h2>
          <p>
           Price: ${price_min} - {price_max}
          </p>
          <div className="">
            <Link to={`/product-details/${_id}`} className="btn  w-full">View Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
