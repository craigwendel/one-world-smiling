import React from 'react';
import ProductPage from '../components/ProductPage';

export default function Product() {
  return (
    <ProductPage
      name="1 World Smiling Tee"
      price={19.99}
      img="/t-shirt-front-back.png"
    />
  );
}
