import React, { useEffect, useState } from 'react';
import './Quotes.css';

function Quotes() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});
  const author = randomQuote.author ? randomQuote.author : "anonymous"

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          setRandomQuote(result[randomIndex(result.length)]);
          setIsLoaded(true);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function setQuote() {
    setRandomQuote(items[randomIndex(items.length)]);
  }

  function randomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  if (error) {
    return <div className="centered lead">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div className="centered lead">Loading...</div>;
  } else {
    return (
      <div className="container centered">
        <blockquote className="blockquote text-center">
          <p>{randomQuote.text}</p>

          <footer class="blockquote-footer">
            <cite title="Source Title">
              {author}
            </cite>
          </footer>
        </blockquote>

        <div class="d-flex justify-content-center">
          <button onClick={setQuote} type="button" className="btn btn-sm btn-warning">
            Another quote
          </button>
        </div>

      </div>
    )
  }
}

export default Quotes;
