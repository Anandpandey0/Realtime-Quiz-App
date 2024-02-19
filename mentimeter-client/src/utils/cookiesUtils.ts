// utils/cookieUtils.js

import Cookies from "js-cookie";

// Function to check if the user is logged in
export const getUserId = () => {
  // Get the value of the "user_email" cookie
  const userId = Cookies.get("user_id");

  // Return true if user_email is present, indicating the user is logged in
  return userId || null;
};
