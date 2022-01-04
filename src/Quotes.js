import React, { useEffect, useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SyncIcon from '@mui/icons-material/Sync';

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  content: {
    marging: `20px`
  },
  centered: {
    position: `fixed`,
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  },
  actions: {
    display: `flex`,
    justifyContent: `flex-end`
  }
}));

function Quotes() {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [randomQuote, setRandomQuote] = useState({});

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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment className={classes.body}>
        <CssBaseline />
            <div className={classes.centered}>
              <Card>
                <CardContent className={classes.content}>
                  <Typography gutterBottom variant="h3" color="text.primary">
                    {randomQuote.text}
                  </Typography>

                  <Typography gutterBottom variant="body" color="text.secondary">
                    {randomQuote.author}
                  </Typography>
                </CardContent>

                <CardActions className={classes.actions}>
                  <IconButton onClick={setQuote} color="primary">
                    <SyncIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </div>


      </React.Fragment>
    )
  }
}

export default Quotes;
