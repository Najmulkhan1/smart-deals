import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
  const { user } = use(AuthContext);
  const [bids, setBids] = useState([]);

//   const token = user?.accessToken
//   console.log(token)
  

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bids?email=${user.email}`,{
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setBids(data);
        });
    }
  }, [user]);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:3000/bids?email=${user.email}`,{
//         headers: {
//             authorization: `Bearer ${user?.accessToken}`
//         }
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log(data);
//           setBids(data);
//         });
//     }
//   }, [user]);

  const handleRemoveBids = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("click");
        fetch(`http://localhost:3000/bids/${_id}`, {
          method: "delete",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("after delete", data);
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Your bit has been deleted.",
                icon: "success",
              });

            //   

            const remainingBids = bids.filter(bid => bid._id !== _id)
            setBids(remainingBids)
            }
          });
      }
    });
  };

  return (
    <div>
      <h3>
        MyBids: <span>{bids.length}</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Product</th>
              <th>seller</th>
              <th>Bid Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={bid._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">Hart Hagerty</div>
                      <div className="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                </td>
                <td>
                  Zemlak, Daniel and Leannon
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Desktop Support Technician
                  </span>
                </td>
                <td>{bid.bid_price}</td>
                <td>
                  {bid.status === "pending" ? (
                    <div className="badge badge-warning">{bid.status}</div>
                  ) : (
                    <div className="badge badge-success">{bid.status}</div>
                  )}
                </td>
                <th>
                  <button
                    onClick={() => handleRemoveBids(bid._id)}
                    className="btn border border-red-500 btn-xs"
                  >
                    Remove Bid
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBids;
