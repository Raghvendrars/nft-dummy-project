import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [getOrder, setGetOrder] = useState([]);

  useEffect(() => {
    axios
      .get("https://ethereum-api.rarible.org/v0.1/nft/items/byCollection?collection=0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d&size=20")
      .then((res) => {
        setGetOrder(res.data.items);
      });
  }, []);

  console.log(getOrder);

  return (
    <div>
      <div className="container">
        <table className="table">
          <thead>
            <th>Type</th>
            <th>TokenId</th>
            <th>Price In USD</th>
            <th>Maker</th>
          </thead>
          <tbody>
            {getOrder ? (
              <>
                {getOrder.map((dmap) => (
                  <tr>
                    <td>{dmap.meta.name}</td>
                    <td>{dmap.tokenId}</td>
                    <td>{dmap.id}</td>
                    <td>{dmap.makePriceUsd}</td>
                    <td><img src={dmap.meta.image.url.BIG} alt="imges" /></td>
                  </tr>
                ))}
              </>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
