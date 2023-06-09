import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:8800/guestbook");
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, []);

  return (
    <div className="home-container">
      <h1>Guestbook</h1>
      <p>See what people wrote about us and feel free to leave a message</p>
      <div className="posts">
        {data.map((d) => (
          <div key={d.id}>
            <h2>{d.name}</h2>
            <p>{d.message}</p>
          </div>
        ))}
      </div>
      <button>
        <Link to="/message" className="link">
          Leave a message
        </Link>
      </button>
    </div>
  );
};

export default WelcomePage;
