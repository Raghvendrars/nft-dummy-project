import { CardMedia, Container, Paper, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Card, Box } from "@mui/material";
import Dummy from "./Dummy.jpg";
import Datas from "./Data.json";
import { useParams } from "react-router-dom";

const ViewProduct = (props) => {
  const [viewProduct, setViewProduct] = useState(null);

  const loc = useParams();

  console.log("This is location", loc);
  useEffect(() => {
    axios
      .get(
        `https://api.rarible.org/v0.1/items/${loc.id}`
        // `https://api.rarible.org/v0.1/items/ETHEREUM:0x3deb701b7f157f95f72fb1fcead7a3248a50549e:802669977553638620281961310539078150812387827040807151125677367725098270722`
      )
      .then((res) => {
        setViewProduct(res.data);
        console.log(viewProduct);
      });
  }, []);
  console.log(viewProduct)

  return (
    <div>
      {viewProduct ? (
        <div>
          <h6>{viewProduct.id}</h6>
        </div>
      ) : (
        <h4>Nothing to show</h4>
      )}
      <Container mt={4}> {viewProduct ? (
        <>
          <Grid container>
            <Grid item xl={5} md={6}>
              <Card>
                <CardMedia>
                  <img src={viewProduct.meta.content[0].url} width={500} height="auto" alt="Image" />
                </CardMedia>
              </Card>
            </Grid>
            <Grid item xl={7} md={6}>


              <Paper>
                <Grid container xl={12} sx={{ paddingLeft: "5%" }}>
                  <Typography variant="h6" sx={{ color: "green" }}>
                    Name:
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "left", marginLeft: "2%" }}
                  >
                    {viewProduct.id}
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
                    {viewProduct.meta.name}
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
                    {viewProduct.mobile}
                  </Typography>
                </Grid>
              </Paper>


            </Grid>
          </Grid>  </>
      ) : (
        <h5>Nothing to show here</h5>
      )}
      </Container>
    </div>
  );
};

export default ViewProduct;
