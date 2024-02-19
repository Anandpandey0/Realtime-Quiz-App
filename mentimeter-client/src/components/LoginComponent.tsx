import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import SignUpCmponent from "./SignUpCmponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserInfo } from "../features/userSlice";
import Cookies from "js-cookie";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const signInformSubmit = async () => {
    Cookies.remove("user_id");
    // console.log(email, password);
    const response = await axios.post("http://localhost:3000/user/login", {
      email,
      password,
    });
    // console.log(data);
    if (response.data) {
      console.log(response.data);
      Cookies.set("user_id", response.data, { expires: 1 });
      console.log("user_id is ", Cookies.get("user_id"));
      dispatch(setUserInfo(email));
      navigate("/");
    }
  };
  return (
    <div className="bg-gray-200 h-max w-[100vw] flex flex-col text-center gap-8 ">
      <div className="logo pt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="25"
          aria-label="Mentimeter Logo"
          viewBox="0 0 5663.44 679.01"
        >
          <g fill="#000000">
            <polygon
              fill="#FFB9D0"
              points="67.06 663 532.44 663 201.01 0 67.06 0 67.06 663"
            ></polygon>
            <polygon
              fill="#196CFF"
              points="602.86 0 602.86 133.95 468.91 133.95 468.91 267.9 334.96 267.9 334.96 663 736.81 663 736.81 0 602.86 0"
            ></polygon>
            <path
              fill="#FF80AB"
              d="M67.06,267.9V663H468.85C465.23,444.16,286.73,267.9,67.06,267.9Z"
            ></path>
            <path
              fill="#FF403D"
              d="M67.06,468.82V662.9h200.8C264.25,555.11,175.74,468.82,67.06,468.82Z"
            ></path>
            <rect y="662.97" width="803.87" height="13.41"></rect>
          </g>
          <g fill="#000000">
            <path d="M1797.7,0V669.45H1692.5V58.34L1536.62,669.45H1332.91L1178,58.34V669.45H1072.79V0h203.7L1436.2,629.28,1595.91,0Z"></path>
            <path d="M2329.46,438l-382.54,55.47c22,55.47,74.6,92.76,137.72,92.76,64.07,0,113.8-34.42,137.71-87l92.77,31.56C2277.82,616.85,2190.79,679,2083.68,679,1943.1,679,1836,570.94,1836,434.18c0-137.71,107.11-244.82,247.69-244.82S2331.37,294.56,2329.46,438Zm-115.72-65c-21-64.07-66-91.81-130.06-91.81-81.29,0-137.71,54.51-147.28,130.06Z"></path>
            <path d="M2794.27,362.46v307H2692.9V386.37c0-74.6-30.61-105.2-95.64-105.2-74.59,0-128.15,47.82-128.15,131V669.45H2367.74V198.92h101.37v67.9c30.61-51.64,87-77.46,151.11-77.46C2720.63,189.36,2794.27,249.61,2794.27,362.46Z"></path>
            <path d="M2992.25,198.92h146.32v82.25H2992.25v247.7c0,41.12,26.79,59.29,63.13,59.29,24.86,0,47.81-5.74,70.77-17.22v89.9c-21,9.56-58.34,17.21-85.12,17.21-101.38,0-150.15-47.81-150.15-149.18V281.17H2823V198.92h67.9V83.2L2992.25,5.74Z"></path>
            <path d="M3171.11,79.38a62.16,62.16,0,1,1,62.16,62.16A62,62,0,0,1,3171.11,79.38Zm13.39,119.54h101.37V669.45H3184.5Z"></path>
            <path d="M4014.6,356.72V669.45H3913.22V369.16c0-62.17-28.68-88-80.33-88s-104.24,41.13-104.24,115.72V669.45H3627.28V369.16c0-62.17-28.7-88-80.34-88S3442.7,322.3,3442.7,397.84V669.45H3341.33V198.92H3442.7V263c27.73-48.78,75.55-73.64,131-73.64,59.3,0,111.9,26.78,134.85,85.11,32.51-52.59,84.16-85.11,151.1-85.11C3946.7,189.36,4014.6,247.7,4014.6,356.72Z"></path>
            <path d="M4546.36,438l-382.54,55.47c22,55.47,74.6,92.76,137.72,92.76,64.07,0,113.8-34.42,137.71-87L4532,530.78C4494.72,616.85,4407.69,679,4300.58,679c-140.58,0-247.69-108.07-247.69-244.83,0-137.71,107.11-244.82,247.69-244.82S4548.28,294.56,4546.36,438Zm-115.72-65c-21-64.07-66-91.81-130.06-91.81-81.29,0-137.71,54.51-147.28,130.06Z"></path>
            <path d="M4716.62,198.92h146.32v82.25H4716.62v247.7c0,41.12,26.78,59.29,63.12,59.29,24.86,0,47.82-5.74,70.77-17.22v89.9c-21,9.56-58.34,17.21-85.12,17.21-101.37,0-150.15-47.81-150.15-149.18V281.17h-67.9V198.92h67.9V83.2L4716.62,5.74Z"></path>
            <path d="M5365,438l-382.54,55.47c22,55.47,74.6,92.76,137.71,92.76,64.08,0,113.81-34.42,137.72-87l92.76,31.56C5313.39,616.85,5226.36,679,5119.25,679c-140.58,0-247.69-108.07-247.69-244.83,0-137.71,107.11-244.82,247.69-244.82S5367,294.56,5365,438Zm-115.72-65c-21-64.07-66-91.81-130.06-91.81-81.29,0-137.72,54.51-147.28,130.06Z"></path>
            <path d="M5663.44,191.28V284a229.09,229.09,0,0,0-35.39-2.87c-74.6,0-123.37,49.73-123.37,135.8V669.45H5403.31V198.92h99.46V269.7c22-48.78,70.77-80.34,132-80.34C5647.17,189.36,5658.65,190.31,5663.44,191.28Z"></path>
          </g>
        </svg>
      </div>
      <h1 className="text-4xl font-semibold">Welcome back!</h1>
      <div className="login_box bg-white  w-[28vw]  mx-auto  h-max  p-2 px-8">
        <h3 className="mt-4 text-gray-800 font-medium">
          Login in to your account
        </h3>
        <button className="border-2 border-solid border-gray-200 w-full mt-4 py-1 font-medium flex items-center justify-center gap-2 rounded-md">
          <FcGoogle />
          Login with Google
        </button>
        <button className="border-2 border-solid border-gray-200 w-full mt-4 py-1 font-medium flex items-center justify-center gap-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            width="16"
            height="16"
            viewBox="0 0 48 48"
          >
            <g color="inherit">
              <rect fill="#FFFFFF" x="0" y="0" width="100" height="100"></rect>
              <rect fill="#05A5F0" x="3" y="25" width="20" height="20"></rect>
              <rect fill="#FFBA06" x="25" y="25" width="20" height="20"></rect>
              <rect fill="#F35424" x="3" y="3" width="20" height="20"></rect>
              <rect fill="#81BC08" x="25" y="3" width="20" height="20"></rect>
            </g>
          </svg>
          Login with Microsoft
        </button>
        <button className="border-2 border-solid border-gray-200 w-full mt-4 py-1 font-medium flex items-center justify-center gap-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            preserveAspectRatio="xMidYMid meet"
            width="16"
            height="16"
            aria-label=""
            viewBox="0 0 24 24"
          >
            <g color="inherit">
              <path
                d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"
                fill="#1877F2"
              ></path>
            </g>
          </svg>
          Login with Facebook
        </button>
        <h4 className="my-4">or using your email</h4>
        {showLogin && (
          <div className="login_fields text-start  flex flex-col gap-2">
            <label htmlFor="email">Your email address</label>
            <input
              type="email"
              className="border-2 border-solid border-black p-2 outline-orange-500"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Your password</label>
            <div className="border-2 border-solid border-black outline-orange-500 p-2">
              <input
                type={showPassword ? "text" : "password"}
                className=" border-none outline-none w-5/6 "
                required
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="float-right"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    preserveAspectRatio="xMidYMid meet"
                    width="20"
                    height="20"
                    aria-label="Invisible"
                    viewBox="0 0 24 24"
                  >
                    <g color="#101834">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    preserveAspectRatio="xMidYMid meet"
                    width="20"
                    height="20"
                    aria-label="Visible"
                    viewBox="0 0 24 24"
                  >
                    <g color="#101834">
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </g>
                    </g>
                  </svg>
                )}
              </button>
            </div>
            <button
              className="credentials_login_btn bg-blue-600 p-2 text-white font-medium mt-4"
              onClick={signInformSubmit}
            >
              Login
            </button>
          </div>
        )}
        {!showLogin && (
          <div>
            <SignUpCmponent />
          </div>
        )}
        <button className="text-blue-600 mt-2 float-start">
          Forgot password ?
        </button>
      </div>
      <h1 className="text-3xl">New to Mentimeter?</h1>
      <button
        className="text-2xl text-blue-600 font-semibold"
        onClick={() => setShowLogin(!showLogin)}
      >
        {showLogin ? "Signup Now" : "Login in"}
      </button>
    </div>
  );
};

export default LoginComponent;
