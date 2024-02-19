import { useParams } from "react-router-dom";
import { getUserId } from "../utils/cookiesUtils";
import { useEffect } from "react";
const Room = () => {
  const { roomId } = useParams();
  useEffect(() => {
    const userEmail = getUserId();
    console.log(userEmail);
  });
  return <div>Room {roomId ? ` ${roomId}` : "0"} </div>;
};

export default Room;
