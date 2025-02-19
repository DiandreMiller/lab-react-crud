import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneShow} from "../../api/fetch";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);

  const { id } = useParams();

  

  // useEffect(() => {
  //   getAllShows(id)
  //     .then((response) => {
  //       setShow(response);
  //       setLoadingError(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoadingError(true);
  //     });
  // }, [id]);

  useEffect(() => {
    getOneShow(id)
      .then((response) => {
        setShow(response);
        if (response.id) {
          setLoadingError(false);
        } else {
          setLoadingError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoadingError(true);
      });
  }, [id]);

  const handleDelete = (id) => {
    fetch(`/api/shows/${id}`, {
      method: "DELETE",
    })
    .then(response => response.json())
      .catch(error => console.log(error));
      loadingError(true);
  }
  


  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(show.id)}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;
