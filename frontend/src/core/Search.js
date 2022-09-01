import React, {useState, useEffect} from 'react'
import { getCategories, list } from './apiCore'
import Card from './Card'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category:'',
        search:'',
        results:[],
        searched: false
    })

    const {categories, category, search, results, searched} = data

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error);
            }else{
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
      loadCategories()
    }, [])

    const handleSubmit = e => {
      e.preventDefault()
      searchData()
    }

    const searchData = () => {
      if(search){
        list({search: search || undefined, category: category})
        .then(response => {
          if(response.error){
            console.log(response.error);
          }else{
            setData({...data, results:response, searched: true})
          }
        })
      }
    }

    const handleChange = name => event => {
      setData({...data, [name]: event.target.value, searched: false})
    }

    const searchForm = () => (
      <form onSubmit={handleSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange('category')}>
                <option value="All">All</option>
                {categories.map((category, i) => (
                  <option key={i} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <input type="search" className='form-control' onChange={handleChange('search')} placeholder='Search by Name'/>
          </div>
          <div className="btn input-group-prepend" style={{border:'none'}}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    )

    const searchMessage = (searched, results) => {
      if(searched && results.length > 0) {
        return `Found ${results.length} products`
      }
      if(searched && results.length < 1) {
        return 'No products found'
      }
    }

    const searchedProducts = (results = []) => {
      return (
        <div>
          <h2 className='mt-4 mb-4'>
            {searchMessage(searched, results)}
          </h2>
          <div className="row">
          {results.map((product, index) => (
            <Card key={index} product={product} className='col-3 mb-3' />
          ))}
        </div>
        </div>
      )
    }
    
  return (
      <div className="row">
        <div className="container mb-3">
          {searchForm()}
        </div>
        <div className="container-fluid mb-3">
          {searchedProducts(results)}
        </div>
      </div>      
  )
}

export default Search
