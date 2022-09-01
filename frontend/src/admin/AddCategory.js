import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout'
import { createCategory } from './apiAdmin';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false)

    // destructure user and token from localStorage
    const {user, token} = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        // make request to api to create category
        createCategory(user._id, token, {name})
        .then(data => {
            if(data.error) {
                setError(true)
            }else {
                setError('')
                setSuccess(true)
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className='form-control' onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className='btn btn-outline-primary'>Create Category</button>
        </form>
    )

    const showError = () => {
        if(error){
            return <h3 className='alert alert-danger'>Category should be unique</h3>
        }
    }

    const showSuccess = () => {
        if(success){
            return <h3 className='alert alert-success'>Category with name {name} is created</h3>
        }
    }

    const goBack = () => {
        return (
            <div className="mt-5">
                <Link to='/admin/dashboard' className='text-warning'>Back to Dashboard</Link>
            </div>
        )
      }

  return (
    <div >
        <Layout title='Add a new Category' description={`G'day ${user.name}, ready to add a new category?`}>
                <div className="col-md-8 offset-2">
                    {showError()}
                    {showSuccess()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
        </Layout>
    </div>
  )
}

export default AddCategory