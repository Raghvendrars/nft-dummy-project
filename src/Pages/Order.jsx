import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [getOrder, setGetOrder] = useState([]);

  useEffect(() => {
    axios
      .get("https://ethereum-api.rarible.org/v0.1/nft/items/byCollection?collection=0xa6d45c5e16adda2f2c24a94b71dc42c0e225a012&size=5")
      .then((res) => {
        setGetOrder(res.data.items);
      });
  }, []);

  console.log(getOrder);

  https://ethereum-api.rarible.org/v0.1/order/orders
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
