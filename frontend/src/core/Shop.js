import React, {useState, useEffect} from 'react'
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import Card from './Card'
import { prices } from './fixedPrices';
import Layout from "./Layout";
import RadioBox from './RadioBox';

const Shop = () => {

    const [myFilters, setMyFilters] = useState({
        filters: {category: [], price: []}
    })
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(false)
    const [limit, setLimit] = useState(8)
    const [skip, setSkip] = useState(0)
    const [size, setSize] = useState(0)
    const [filteredResults, setFilteredResults] = useState([])

    //load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    } 

    const loadFilteredResults = newFilters => {
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        })
    }

    const loadMore = () => {
        let toSkip = skip + limit
        getFilteredProducts(skip, limit, myFilters.filters).then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults([...filteredResults, ...data.data])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    }

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className='btn btn-warning mb-5 mr-1'>Load More</button>
            )
        )
    }

    useEffect(() => {
        init()
        loadFilteredResults(skip, limit, myFilters.filters)
    }, [])

    const handleFilters = (filters, filterBy) => {
        // console.log(filters, filterBy);
        const newFilters = {...myFilters}
        newFilters.filters[filterBy]=filters

        if(filterBy=='price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy]=priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }

    const handlePrice = value => {
        const data = prices
        let array = []

        for (let key in data){
            if(data[key]._id === parseInt(value)){
                array=data[key].array
            }
        }
        return array
    }
 
  return (
    <div>
        <Layout title='Shop Page' description='Search and Find Books of your choice' className='container-fluid'>
            <div className="row">
                <div className="col-4">
                    <h2>Filter by Categories</h2>
                    <ul className='ml-5'>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')}/>
                    </ul>
                    <h2>Filter by Price Range</h2>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')}/>
                    </div>
                </div>

                <div className="col-8">
                    <h2 className='mb-4'>Products</h2>
                    <div className="row">
                        {filteredResults.map((product, i)=> (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Shop