import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { createProduct,listProducts,deleteProduct } from '../actions/productActions.js';
import Loading from '../components/Loading.js';
import Messages from '../components/Messages.js';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants.js';



export default function ListProductPage(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate,successDelete]);
  
    const deleteHandler = (product) => {
      if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteProduct(product._id));
        /// TODO: dispatch delete action
      }
    
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
      <Link to="/">Back to result</Link>
     <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" 
            onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <Loading></Loading>}
      {errorDelete && <Messages variant="danger">{errorDelete}</Messages>}
      {loadingCreate && <Loading></Loading>}
      {errorCreate && <Messages variant="danger">{errorCreate}</Messages>}
      {successDelete && (
        <Messages variant="success">product Deleted Successfully</Messages>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}