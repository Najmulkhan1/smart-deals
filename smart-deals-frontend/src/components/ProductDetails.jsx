import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const { _id: productId } = useLoaderData();
  const bidModalRef = useRef(null);

  const { user } = use(AuthContext);
  const [bids, setBids] = useState([])
  console.log(user?.accessToken);

  useEffect(() =>{

    if(!user?.accessToken) return

    fetch(`http://localhost:3000/products/bids/${productId}`,{
      headers: {
            authorization: `Bearer ${user?.accessToken}`
        }
    })
    .then(res=> res.json())
    .then(data => {
      console.log("bids for this product", data);
      setBids(data)
      
    })
  },[productId, user])

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    console.log("click");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const bitPrice = form.bitPrice.value;
    const contactInfo = form.contactInfo.value;
    const img = user?.photoURL;

    console.log(name, email, bitPrice, contactInfo, img);

    const newBid = {
      productId: productId,
      buyer_image: img,
      buyer_name: name,
      buyer_email: email,
      bid_price: parseFloat(bitPrice),
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("after placing bid:", data);
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bit has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          // add the new bid the state
          newBid._id = data.insertedId
          const newBids = [...bids, newBid];
          newBids.sort((a,b) => b.bid_price - a.bid_price)
          setBids(newBids)
        }
      });
  };

  return (
    <div>
      <div></div>

      <div>
        <button
          onClick={handleBidModalOpen}
          className="btn bg-gradient-to-r from-purple-500 to-violet-600 text-white"
        >
          I want to buy this product
        </button>

        <dialog ref={bidModalRef} className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-center mb-4">
              Give the best offer!
            </h3>
            <form onSubmit={handleBidSubmit}>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-black font-semibold label text-sm">
                      Name
                    </label>
                    <input
                      type="email"
                      className="input"
                      defaultValue={user?.displayName}
                      name="name"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-black font-semibold label text-sm">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="input"
                      defaultValue={user?.email}
                      readOnly
                    />
                  </div>
                </div>
                <label className="block text-black font-semibold label text-sm mt-3">
                  Buyer Image Url
                </label>
                <input
                  type="email"
                  className="input w-full"
                  defaultValue={user?.photoURL}
                  name="img"
                  readOnly
                />
                <label className="block text-black font-semibold label text-sm mt-3">
                  Place Your Pice
                </label>
                <input
                  type="number"
                  className="input w-full"
                  placeholder="Enter your price"
                  name="bitPrice"
                />
                <label className="block text-black font-semibold label text-sm mt-3">
                  Contact Info
                </label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Enter your phone number"
                  name="contactInfo"
                />
              </div>

              <button className="btn bg-gradient-to-r from-purple-500 to-violet-600 text-white mt-4">
                Submit bit
              </button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn border border-violet-500">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      {/* bids for this product */}
      <div>
          <h3>Bids for this Product: {bids.length}</h3>

          <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>
          SL No.
        </th>
        <th>Buyer Name</th>
        <th>Buyer Email</th>
        <th>Bit Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        bids.map((bid,index) => 
          <tr>
        <th>{index+1}</th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={bid.buyer_image}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{bid.buyer_name}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          {bid.buyer_email}
        </td>
        <td>{bid.bid_price}</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
        )
      }
      
      
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default ProductDetails;
