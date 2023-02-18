import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderRipository } from '../actions/orderActions.js'; 
import Loading from '../components/Loading';
import Messages from '../components/Messages';


export default function OrderHistoryScreen(props) {
  const orderRepositoryList = useSelector((state) => state.orderRepositoryList);
  const { loading, error, orders } = orderRepositoryList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderRipository())
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Messages variant="danger">{error}</Messages>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
        
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button type="button" className="small" onClick={() => { props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
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