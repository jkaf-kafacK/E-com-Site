import React, { useEffect } from 'react'
import Loading from '../components/Loading';
import Messages from '../components/Messages';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';

export default function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => { dispatch(listProducts());
}, [dispatch]);
    return (
      <div>
        {loading ? (
        <Loading> </Loading>
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <div className="row center">
          {products.map((product) => (
             <Product key={product._id} product={product}></Product>
             ))}
           </div>
         )}
      </div>
    );
}
