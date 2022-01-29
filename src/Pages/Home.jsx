import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://api.rarible.org/v0.1/items/all").then((res) => {
      setPosts(res.data.items);
      console.log(posts);
    });
  }, []);

  // console.log(p);
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ bgcolor: "#e3f2fd" }}>
        {posts ? (
          <>
            {posts.map((d, k) => (
              <Grid container spacing={0} key={k}>
                <Grid item xl={3} lg={3} sm={6} xs={12} md={6}>
                  <h3>{d.meta.name}</h3>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12} md={6}>
                  <Typography variant="h6">{d.blockchain}</Typography>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12} md={6}>
                  <h3>{d.value}</h3>
                </Grid>
                <Grid item xl={3} lg={3} sm={6} xs={12} md={6}>
                  <img src={d.meta.url} alt="images" />
                </Grid>
              </Grid>
            ))}
          </>
        ) : (
          <Typography>No Data Found</Typography>
        )}
      </Container>
    </div>
  );
};

export default Home;
