import { useState } from "react";
import axios from "axios";

function AddReview() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/reviews", {
      name,
      message,
      rating
    });

    alert("Review submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name"
        onChange={(e) => setName(e.target.value)} />

      <textarea placeholder="Write review"
        onChange={(e) => setMessage(e.target.value)} />

      <input type="number" max="5" min="1"
        onChange={(e) => setRating(e.target.value)} />

      <button type="submit">Submit Review</button>
    </form>
  );
}

export default AddReview;
