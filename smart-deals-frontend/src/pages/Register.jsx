import React, { Suspense, use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";

const Register = () => {
  const { createUser, updateUser,setUser } = use(AuthContext);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const url = form.url.value;
    const password = form.password.value;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must have at least one uppercase, one lowercase letter, and be 6+ characters long"
      );
    }

    createUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        updateUser({ displayName: name, photoURL: url })
          .then(() => {
            setUser({...user, displayName: name, photoURL: url})
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
        console.log(user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    console.log(name, email, url, password);
  };

  return (
    <div className="w-11/12 mx-auto flex items-center justify-center min-h-screen">
      <Suspense>
        <div className="bg-base-100 shadow-lg w-100 rounded p-4 text-black">
          <h2 className="text-4xl font-bold text-center">Register Now!</h2>
          <p className="text-center mt-3">
            Already have an account?{" "}
            <Link to={"/login"} className="text-[#632EE3]">
              Login Now
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="text-black p-4 space-y-5">
            <div>
              <label className="block font-semibold">Name</label>
              <input
                className="border w-full mt-2 py-2 px-1 border-gray-400 rounded"
                type="text"
                name="name"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label className="block font-semibold">Email</label>
              <input
                className="border w-full mt-2 py-2 px-1 border-gray-400 rounded"
                type="email"
                name="email"
                placeholder="Enter Your Email"
              />
            </div>

            <div>
              <label className="block font-semibold">Image-URL</label>
              <input
                className="border w-full mt-2 py-2 px-1 border-gray-400 rounded"
                type="url"
                name="url"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label className="block font-semibold">password</label>
              <input
                className="border w-full py-2 mt-2 px-1 border-gray-400 rounded"
                type="password"
                name="password"
                placeholder="Enter Your password"
              />
            </div>
            <button
              type="submit"
              className="btn bg-[linear-gradient(125deg,#632EE3_5.68%,#9F62F2_88.38%)] text-white w-full"
            >
              Register
            </button>
          </form>

          <div className="flex justify-between items-center gap-3 px-4">
            <div className="border-b border-gray-300 flex-1"></div>
            <span className="font-semibold">Or</span>
            <div className="border-b border-gray-300 flex-1"></div>
          </div>

          <div className="p-4">
            {/* Google */}
            <button className="btn bg-white text-black w-full shadow border-[#e5e5e5]">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default Register;
