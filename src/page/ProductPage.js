import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import { useDispatch, useSelector  } from 'react-redux';
import Evaluation from '../components/Evaluation';
import Loading from '../components/Loading';
import Messages from '../components/Messages';

export default function ProductPage(props) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails
  
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

    return (
      <div>
        {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <div>
        <Link to="/">Back to result</Link>
        <div className="row top">
          <div className="col-2">
            <img className="large" src={product.image} alt={product.name}></img>
          </div>
          <div className="col-1">
            <ul>
              <li>
                <h1>{product.name}</h1>
              </li>
              <li>
                <Evaluation
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Evaluation>
              </li>
              <li>Pirce : ${product.price}</li>
              <li>
                Description:
                <p>{product.description}</p>
              </li>
            </ul>
          </div>
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">${product.price}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Status</div>
                    <div>
                      {product.countInStock > 0 ? (<span className="success">In Stock</span>
                      ) : ( <span className="danger">Unavailable</span>
                      )}
                    </div>
                  </div>
                </li>
                {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => ( <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler} className="primary block">Add to Cart
                        </button>
                      </li>
                    </>
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )}
    </div>
    );
}
