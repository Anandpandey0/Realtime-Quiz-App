import { Link } from "react-router-dom";

const Home = () => {
  // const navigate = useNavigate();

  return (
    <div className="flex">
      <aside className="border-2 border-solid border-black h-screen w-64 p-4 bg-gray-50 flex flex-col gap-4">
        <Link to="/">Home</Link>
        <h2 className="mt-4"></h2>
        <Link to="/dashboard">Dashboard</Link>
      </aside>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
