import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { updateItem, removeItem } from './cartHelpers';
import {MdOutlineDelete} from 'react-icons/md'

const Card = ({
  product, 
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill w-50">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill w-25">Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };




  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Count</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
            
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <div onClick={() => { 
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }} className='border border-danger bg-danger ml-2' style={{cursor:'pointer', width: '44px', height: '37px'}}>
            <MdOutlineDelete className='h3 text-light mt-1' style={{marginLeft: '4px'}}/>
        </div>
        // <button
        //   onClick={() => {
        //     removeItem(product._id);
        //     setRun(!run); // run useEffect in parent Cart
        //   }}
        //   className="btn btn-outline-danger mt-2 mb-2"
        // >
        //   Remove Product
        // </button>
      )
    );
  };
  return (
    <div>
    <div className="d-flex flex-row w-75 mt-3 justify-content-center" style={{marginleft: '20px'}}>
      {shouldRedirect(redirect)}
      <div>
      <ShowImage item={product} url="product" />
      </div>
      <div className="d-flex flex-column" style={{marginLeft:'20px'}}>
      <p className="text-dark mb-0">{product.name}</p>
      <p className="text-muted mb-0">{product.description.substring(0, 100)} </p>
      <p className="text-dark h5 mb-0">$ {product.price}</p>
      <p className="text-muted mb-0">Category: {product.category && product.category.name}</p>
      <p className="text-muted mb-0">Added on {moment(product.createdAt).fromNow()}</p>
      {showStock(product.quantity)}
      <div className="d-flex flex-row mt-1">
      {showCartUpdateOptions(cartUpdate)}
      {showRemoveButton(showRemoveProductButton)}
      </div>
      </div>
    </div>
    <hr />
    </div>
  );
};

export default Card;
