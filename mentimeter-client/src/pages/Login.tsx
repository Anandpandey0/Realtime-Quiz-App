import { useNavigate } from "react-router-dom";
import LoginComponent from "../components/LoginComponent";
import { getUserId } from "../utils/cookiesUtils";
import Cookies from "js-cookie";

const Login = () => {
  // console.log(setShowLogin);
  const userId = getUserId();
  const navigate = useNavigate();
  const logoutHandler = () => {
    Cookies.remove("user_id");
    navigate("/login");
  };
  if (userId) {
    return <button onClick={logoutHandler}>Logout</button>;
  }

  return (
    <div className="bg-gray-200 h-[100vh] w-[100vw]  ">
      <LoginComponent />
    </div>
  );
};

export default Login;
