import React from 'react';
import ProductPage from '../components/ProductPage';

export default function Product() {
  return (
    <ProductPage
      name="1 World Smiling Tee"
      img="/t-shirt-yellow-front.jpg"
      basePrice={14.95}
    />
  );
}
