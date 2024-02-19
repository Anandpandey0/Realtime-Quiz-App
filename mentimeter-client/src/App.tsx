import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Dashboard from "./pages/Dashboard";
import Edit from "./pages/Edit";
// import Box from "./components/Box";

function App() {
  return (
    <>
      {/* <h1 className="text-blue-500">Hello There</h1> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit/:quizId" element={<Edit />} />
        {/* <Route path="/box" element={<Box />} /> */}
      </Routes>
    </>
  );
}

export default App;
