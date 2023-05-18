import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Message = () => {
  const [book, setBook] = useState({
    message: "",
    name: "",
  });
  const [isSubmited, setIsSubmited] = useState(false);
  const [requestStatus, setRequestStatus] = useState(null);

  // comment navigate because of task for disabled button on the page
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetForm = () => {
    setBook({
      message: "",
      name: "",
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8800/guestbook", book);
      setIsSubmited(true);
      resetForm();
      console.log(res);
      if (res.status === 200) {
        setRequestStatus("Success!");
      } else {
        setRequestStatus("Failed");
      }
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={submitForm} className="form-container">
      <div className="input-container">
        <p>Message:</p>
        <textarea
          type="text"
          rows={10}
          cols={20}
          name="message"
          value={book.message}
          onChange={handleChange}
        />
      </div>

      <div className="input-container">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={book.name}
          onChange={handleChange}
        />
      </div>

      <button className={isSubmited ? "hidden" : "visible"}>Post</button>
      <p>Http status: {requestStatus && <span>{requestStatus}</span>}</p>
      <Link to="/">Back to Welcome Page</Link>
    </form>
  );
};

export default Message;
