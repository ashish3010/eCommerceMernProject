import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import AdminRoute from './auth/AdminRoutes'
import PrivateRoutes from './auth/PrivateRoutes'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'
import AdminDashboard from './user/AdminDashboard'
import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'
import ManageProducts from './admin/ManageProducts'
import Profile from './user/Profile'
import UpdateProduct from './admin/UpdateProduct'


const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/shop' exact component={Shop} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/signin' exact component={Signin} />
            <Route path='/cart' exact component={Cart} />
            <PrivateRoutes path = '/user/dashboard' exact component={UserDashboard} />
            <AdminRoute path='/admin/dashboard' exact component={AdminDashboard}/>
            <AdminRoute path='/create/category' exact component={AddCategory}/>
            <AdminRoute path='/create/product' exact component={AddProduct}/>
            <Route path='/product/:productId' exact component={Product} />
            <AdminRoute path='/admin/orders' exact component={Orders}/>
            <AdminRoute path='/admin/products' exact component={ManageProducts}/>
            <PrivateRoutes path = '/profile/:userId' exact component={Profile} />
            <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
        </Switch>
    </BrowserRouter>
  )
}

export default Routes