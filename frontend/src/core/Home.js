import React, {useState, useEffect} from 'react'
import { getProducts } from './apiCore'
import Card from './Card'
import Layout from './Layout'
import Search from './Search'
import {Swiper, SwiperSlide} from 'swiper/react'
import { Navigation, Pagination, Scrollbar } from "swiper";
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProductsBySell(data)
      }
    })
  }
  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if(data.error){
        setError(data.error)
      }else{
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsBySell()
    loadProductsByArrival()
  }, [])
  

  return (
    <div>
        <Layout title='Home Page' description='Node React E-Commerce App' className='container-fluid'>
          <Search/>
            <h2 className='mb-4'>New Arrivals</h2>
            <div className="row">
            <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={0}
            slidesPerView={5}
            navigation >
            {productsByArrival.map((product, i) => (
              <div>
                <SwiperSlide>
                <div style={{marginLeft: '40px'}}>
                <Card key={i} product={product}/>
                </div>
              </SwiperSlide>
              </div>
            ))}
             </Swiper>
            </div>
            
            <h2 className='mb-4'>Best Sellers</h2>
            <div className="row">
            <Swiper
            modules={[Navigation, Pagination, Scrollbar]}
            spaceBetween={0}
            slidesPerView={5}
            navigation >
            {productsBySell.map((product, i) => (
              <div >
                <SwiperSlide>
                <div className='mb-4' style={{marginLeft: '40px'}}>
                <Card key={i} product={product}/>
                </div>
              </SwiperSlide>
              </div>
            ))}
             </Swiper>
            </div>
        </Layout>
    </div>
  )
}

export default Home