import React, {useState, useEffect} from 'react'
import { isAuthenticated } from '../auth'
import { getStatusValues, listOrders, updateOrderStatus } from './apiAdmin'
import Layout from '../core/Layout'
import moment from 'moment'

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])
    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setOrders(data)
            }
        })
    }

    const loadStatusvalues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error){
                console.log(data.error);
            }else{
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusvalues()
    }, [])

    const showOrdersLength = () => {
        if(orders.length > 0){
            return (
                <h1 className='text-danger dispay-2'> Total orders: {orders.length}</h1>
            )
        }else{
            return <h1 className='text-danger'>No Orders</h1>
        }
    }

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(data => {
            if(data.error){
                console.log('Status Update failed');
            }else {
                loadOrders()
            }
        })
    }

    const showStatus = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status : {o.status}</h3>
            <select className="form-control" onChange={(e) => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>{status}</option>
                ))}
            </select>
        </div>
    )

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className='form-control' readOnly/>
        </div>
    )

  return (
    <div>
        <Layout title='Orders' description={`G'day ${user.name}, you can manage all the orders here`} className='container-fluid'>
            
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}
                    
                    {orders.map((order, oIndex) => {
                        return (
                            <div className='mt-5' key={oIndex} style={{borderBottom: '5px solid indigo'}}>
                                <h2 className='mb-5'>
                                    <span className="text-primary">Order ID: {order._id}</span>
                                </h2>

                                <ul className="list-group mb-2">
                                    <li className="list-group-item">{showStatus(order)}</li>
                                    <li className="list-group-item">{order.transaction_id}</li>
                                    <li className="list-group-item">${order.amount}</li>
                                    <li className="list-group-item">Ordered By : {order.user.name}</li>
                                    <li className="list-group-item">Ordered on: {moment(order.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery Address: {order.address}</li>
                                </ul>

                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total products in the order : {order.products.length}
                                </h3>

                                {order.products.map((product, pIndex) => (
                                    <div className="mb-4" key={pIndex} style={{padding:'20px', border:'1px solid indigo'}}>
                                        {showInput('Product name', product.name)}
                                        {showInput('Product price', product.price)}
                                        {showInput('Product count', product.count)}
                                        {showInput('Product ID', product._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Orders
