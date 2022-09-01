import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {BsCart2} from 'react-icons/bs'
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = ({
  product, 
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-0 mb-2 card-btn-1">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <div onClick={addToCart} style={{cursor: 'pointer'}} className='d-flex hover-shadow flex-row mt-2 border border-warning p-1 justify-content-center'>
          <BsCart2 className='text-warning h4'  />
          <span className='text-warning mt-1'>Add to Cart</span>
        {/* <button onClick={addToCart} className="btn btn-outline-warning mt-0 mb-2 card-btn-1  ">
          Add to cart
        </button> */}
        </div>
      )
    );
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
              <span className="input-group-text">Adjust Quantity</span>
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
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
    <div>
    <div className="d-flex flex-column w-75 mt-3 justify-content-center" style={{marginleft: '20px', height: '460px'}}>
      {shouldRedirect(redirect)}
      {showViewButton && 
      <Link to={`/product/${product._id}`} className="mr-2">
      <ShowImage item={product} url="product" />
      </Link>}
      <p className="text-dark mb-0">{product.name}</p>
      <p className="text-muted mb-0">{product.description.substring(0, 100)} </p>
      <p className="text-dark h5 mb-0">$ {product.price}</p>
      <p className="text-muted mb-0">Category: {product.category && product.category.name}</p>
      <p className="text-muted mb-0">Added on {moment(product.createdAt).fromNow()}</p>
      {showStock(product.quantity)}
      {showAddToCartBtn(showAddToCartButton)}
      {showRemoveButton(showRemoveProductButton)}
      {showCartUpdateOptions(cartUpdate)}
    </div>
    </div>
  );
};

export default Card;
