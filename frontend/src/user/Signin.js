import React, {useState} from 'react'
import {Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from '../auth';
import Layout from '../core/Layout'

const Signin = () => {

  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToRefferer: false,
  })

  const {email, password, error, loading, redirectToRefferer} = values
  const {user} = isAuthenticated()

  const handleChange = name => event => {
    setValues({...values, error:false, [name]:event.target.value})
  }

  

  const handleSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error:false, loading:true})
    signin({email, password})
    .then(data => {
      if(data.error){
        setValues({...values, error:data.error, loading:false})
      }else{
        authenticate(data, () => {
          setValues({
            ...values,
            redirectToRefferer: true
          })
        })
      }
    })
  }
  const signinForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className='text-muted'>Email</label>
          <input type="email" onChange={handleChange('email')} className='form-control' value={email} />
        </div>
        <div className="form-group">
          <label className='text-muted'>Password</label>
          <input type="password" onChange={handleChange('password')} className='form-control' value={password} />
        </div>
        <button onClick={handleSubmit} className='btn btn-primary'>Submit</button>
      </form>
    )
  }

  const showError = () => (
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
  )

  const showLoading = () => (
    <div className="alert alert-success" style={{display: loading ? '' : 'none'}}>
      <h2>Loading</h2>
    </div>
  )

  const redirectUser = () => {
    if(redirectToRefferer){
      if(user && user.role === 1) {
        return <Redirect to='/admin/dashboard' />
      }else {
        return <Redirect to='/user/dashboard' />
      }
    }
    if (isAuthenticated()) {
      return <Redirect to='/' />
    }
  }

  return (
    <div>
      <Layout title='Signin Page' description='Signin on Node React E-Commerce App' className='container col-md-8 offset-md-2'>
            {showError()}
            {showLoading()}
            {signinForm()}
            {redirectUser()}
        </Layout>
    </div>
  )
}

export default Signin