import React from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'

const AdminDashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated()

    const AdminLinks = () => {
        return (
            <div className="card mb-5">
                <h4 className="card-header">Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className='nav-link' to='/create/category'>Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to='/create/product'>Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to='/admin/orders'>View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className='nav-link' to='/admin/products'>Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const AdminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Admin Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">{name}</li>
                    <li className="list-group-item">{email}</li>
                    <li className="list-group-item">{role === 1 ? 'Admin' : 'Registered Admin'}</li>
                </ul>
            </div>
        )
    }


  return (
    <div>
        <Layout title='Dashboard' description={`G'day ${name}!!`} className='container-fluid'>
            <div className="row">
                <div className="col-3">
                    {AdminLinks()}
                </div>
                <div className="col-9">
                    {AdminInfo()}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default AdminDashboard