import { useEffect, useRef, useState } from "react";
import "./Titlecard.css";
import { Link } from "react-router-dom";
//import cards_data from "../../assets/cards/Cards_data";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Titlecard = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMDA4NmYwNjhmMjU3ZGIxYzU5NWFlMWYzOTE5NmZjOCIsIm5iZiI6MTcyMjQ1MDMyMi44MjM1MzksInN1YiI6IjY2YWE3ZmM3YzU1ZjI2N2EyMzE5NDc4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JsClRnX-ExRB0Cctm52TI0VdaBl12_9NRZiBFavr2YA",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Titlecard;
