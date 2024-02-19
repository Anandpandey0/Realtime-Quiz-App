const Box = ({ title, date }) => {
  return (
    <div className="border-2 border-solid border-black w-96 h-[30vh] bg-blue-200 text-white flex text-center">
      <h1 className="text-lg text-center">{title || "Title"}</h1>
      {date}
    </div>
  );
};

export default Box;
