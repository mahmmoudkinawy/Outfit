import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Catalog from "../../features/catalog/catalog";
import { Product } from "../models/product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((preState) => [
      ...preState,
      {
        id: preState.length + 101,
        name: "product" + (preState.length + 1),
        price: preState.length * 100 + 100,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200",
        // quantityInStock: 100,
        // type: "some type",
      },
    ]);
  }

  return (
    <>
      <Typography variant='h1'>Julia</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </>
  );
}

export default App;
