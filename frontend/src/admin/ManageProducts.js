import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import { deleteProduct, getProducts } from './apiAdmin'

const ManageProducts = () => {
    const [products, setProducts] = useState([])
    const {user, token} = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setProducts(data)
            }
        })
    }

    const destroy = (productId) => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                loadProducts()
            }
        })
    }

    useEffect(()=>{
        loadProducts()
    })

    return (
        <div >
            <Layout title='Manage Products' description={`G'day ${user.name}!!! Perform CRUD on products...`}>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center">Total {products.length} products</h2>
                        <ul className="list-group">
                            {products.map((p,i) => (
                                <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                    <strong>{p.name}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge badge-warning badge-pill">Update</span>
                                    </Link>
                                    <span onClick={() => destroy(p._id)} className="badge badge-danger badge-pill">Delete</span>
                                </li>

                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
      )
}

export default ManageProducts
