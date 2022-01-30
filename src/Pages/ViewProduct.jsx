import { CardMedia, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Card, Box } from "@mui/material";
import Dummy from "./Dummy.jpg";
import Datas from "./Data.json";

const ViewProduct = () => {
  const [viewProduct, setViewProduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.rarible.org/v0.1/items/ETHEREUM:0xc9154424b823b10579895ccbe442d41b9abd96ed:17496895875211293639816640804941068368963080332876347216125204408786464276508"
      )
      .then((res) => {
        setViewProduct(res.data);
        console.log(viewProduct);
      });
  }, []);

  return (
    <div>
      {viewProduct ? (
        <div>
          <h6>{viewProduct.id}</h6>
        </div>
      ) : (
        <h4>Nothing to show</h4>
      )}
      <Container mt={4}>
        <Grid container>
          <Grid item xl={5} md={6}>
            <Card>
              <CardMedia>
                <img src={Dummy} width={500} height="auto" alt="Image" />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xl={7} md={6}>
            {Datas ? (
              <>
                {Datas.data.map((dmap) => (
                  <Paper>
                    <Grid container xl={12} sx={{ paddingLeft: "5%" }}>
                      <Typography variant="h6" sx={{ color: "green" }}>
                        Name:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "left", marginLeft: "2%" }}
                      >
                        {dmap.name}
                      </Typography>
                    </Grid>
                    <Grid container xl={12} sx={{ paddingLeft: "5%" }}>
                      <Typography variant="h6" sx={{ color: "green" }}>
                        Email:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "left", marginLeft: "3%" }}
                      >
                        {dmap.email}
                      </Typography>
                    </Grid>
                    <Grid container xl={12} sx={{ paddingLeft: "5%" }}>
                      <Typography variant="h6" sx={{ color: "green" }}>
                        Mobile:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ textAlign: "left", marginLeft: "2%" }}
                      >
                        {dmap.mobile}
                      </Typography>
                    </Grid>
                  </Paper>
                ))}
              </>
            ) : (
              <h5>Nothing to show here</h5>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ViewProduct;
