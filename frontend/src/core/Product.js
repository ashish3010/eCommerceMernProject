import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { listRelated, read } from './apiCore'
import Card from './Card'
import { addItem } from './cartHelpers'
import Layout from './Layout'
import ShowImage from './ShowImage'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const [error, setError] = useState(false)
    const [redirect, setRedirect] = useState(false);

    const loadSingleProduct = (productId) => {
        read(productId).then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setProduct(data)
                // fetch related products
                listRelated(data._id).then(data => {
                    if(data.error) {
                        setError(data.error)
                    }else{
                        setRelatedProducts(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
      const productId = props.match.params.productId
      loadSingleProduct(productId)
    }, [props])

    let randomNumber = Math.floor(Math.random()*20)+5

    const showStock = quantity => (
        quantity > 0 ? (
        <span className='badge badge-primary badge-pill'>In Stock</span>
        ) : (
        <span className='badge badge-warning badge-pill'>Out of Stock</span>
        ))
    
    const addToCart = () => {
            addItem(product, setRedirect(true));
          };
        
    const shouldRedirect = redirect => {
            if (redirect) {
              return <Redirect to="/cart" />;
            }
          };

    const showCartButton = () => (
        <button onClick={addToCart} className="btn btn-outline-warning mt-0 mb-2 card-btn-1  ">
          Add to cart
        </button>    )

  return (
    <div>
      <Layout title={product && product.name} description={product && product.description && product.description.substring(0,50)} className='container-fluid'>

        <div className="d-flex flex-row">
            <div className="p-4">
            {shouldRedirect(redirect)}
            <ShowImage item={product} url='product' />
            </div>
            <div className='ml-5 mt-3'>
                <h2>{product.name}</h2>
                <h4>{product.description}</h4>
                <span> Buy New: 
                <span className='text-danger h5 ml-3'><span className='h6'>$</span>{product.price}</span>
                <s className='text-secondary h6 ml-1'><span className='h6'>$</span>{product.price + randomNumber}</s>
                </span>
                <p>Save: ${randomNumber} ({Math.round(randomNumber*100/product.price)}%) </p>
                <p>Free delivery</p>
                {showStock(product.quantity)}
                <br />
                {showCartButton()}
            </div>
        </div>

        <h2>Related Products</h2>
        <div className="d-flex">
        {relatedProducts.map((product, index) => (
                <div key={index} className="ml-2 mr-2">
                    <Card key={index} product={product} />
                    </div>
                ))}
        </div>
      </Layout>
    </div>
  )
}

export default Product
