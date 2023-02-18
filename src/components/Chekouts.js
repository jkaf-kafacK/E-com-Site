import React from 'react';

export default function Checkouts(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? 'active' : ''}>Sign In</div>
      <div className={props.step2 ? 'active' : ''}>Shipping address</div>
      <div className={props.step3 ? 'active' : ''}>Payment</div>
      <div className={props.step4 ? 'active' : ''}>Place of Order</div>
    </div>
  );
}