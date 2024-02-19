import { useState } from "react";

const SignUpCmponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login_fields text-start  flex flex-col gap-2">
      <label htmlFor="name">First and last name</label>
      <input
        type="text"
        className="border-2 border-solid border-black p-2 outline-orange-500"
        id="name"
        required
      />
      <label htmlFor="email">Your email address</label>
      <input
        type="email"
        className="border-2 border-solid border-black p-2 outline-orange-500"
        id="email"
        required
      />
      <label htmlFor="password">Your password</label>
      <div className="border-2 border-solid border-black outline-orange-500 p-2">
        <input
          type={showPassword ? "text" : "password"}
          className=" border-none outline-none w-5/6 "
          required
          id="password"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </g>
              </g>
            </svg>
          )}
        </button>
      </div>
      <button className="credentials_login_btn bg-blue-600 p-2 text-white font-medium mt-4">
        Login
      </button>
    </div>
  );
};

export default SignUpCmponent;
