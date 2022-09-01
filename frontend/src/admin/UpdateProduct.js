import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Layout from '../core/Layout'
import {getCategories, getSingleProduct, updateProduct } from './apiAdmin'

const UpdateProduct = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        author: '',
        price: '',
        categories:[],
        category:'',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: '',
        formData: ''
    })

    const {user, token} = isAuthenticated()

    const {
        name,
        description,
        author,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = (productId) => {
        getSingleProduct(productId).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values,
                name: data.name,
                description: data.description,
                author: data.author,
                price: data.price,
                category: data.category._id,
                shipping: data.shipping,
                quantity: data.quantity,
                formData: new FormData()
            })
                initCategories()
            }
        })
    }

    //load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setValues({categories:data,formData: new FormData() })
            }
        })
    } 

    useEffect(() => {
        init(match.params.productId)
    }, [])
    

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]:value})
    }

    const handleSubmit = event => {
        event.preventDefault()
        setValues({...values, error: '', loading:true})

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data =>{
            if(data.error)  {
                setValues({...values, error:data.error})
            }else{
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    author: '',
                    price: '',
                    category:'',
                    shipping: '',
                    quantity: '',
                    photo: '',
                    loading: false,
                    redirectToProfile: true,
                    error: false,
                    createdProduct: data.name,
                })
            }
        })
    }

    const newPostForm = () => {
        return(
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo"accept='image/*' />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name </label>
                <input type="text" onChange={handleChange('name')} value={name} className='form-control'  />
            </div>
            <div className="form-group">
                <label className="text-muted">Autthor </label>
                <input type="text" onChange={handleChange('author')} value={author} className='form-control'  />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} value={description} className='form-control'  />
            </div>
            <div className="form-group">
                <label className="text-muted">Price </label>
                <input type="number" onChange={handleChange('price')} value={price} className='form-control'  />
            </div>
            <div className="form-group">
                <label className="text-muted">Category </label>
                <select onChange={handleChange('category')} className='form-control' >
                    <option>Select Category</option>
                    {categories && categories.map((category, i) => (
                        <option key={i} value={category._id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity </label>
                <input type="number" onChange={handleChange('quantity')} value={quantity} className='form-control'  />
            </div>
            <div className="form-group">
                <label className="text-muted">Shipping </label>
                <select onChange={handleChange('shipping')} className='form-control' >
                    <option>Please Select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <button className="btn btn-outline-primary">Update Product</button>
        </form> 
        )
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display : error ? '' : 'none'}}>{error}</div>
    )
    const showSuccess = () => (
        <div className="alert alert-success" style={{display : createdProduct ? '' : 'none'}}><h4>A Product with name <b>{`${createdProduct}`} </b> is created...</h4></div>
    )
    const showLoading = () => (
        loading && (<div className="alert alert-info">Loading...</div>
    ))
    const redirectUser = () => {
        if(redirectToProfile){
            if(!error){
                return <Redirect to='/'/>
            }
        }
    }

  return (
    <div>
        <Layout title='Add a new Category' description={`G'day ${user.name}, ready to add a new product?`} className='container-fluid'>
            
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showError()}
                    {showSuccess()}
                    {showLoading()}
                    {newPostForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default UpdateProduct