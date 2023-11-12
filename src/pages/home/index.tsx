import React, { useEffect } from 'react'
import HomeCarousel from './home-carousel'
import HomeProduct from './home-product'
import { getAllProduct } from 'src/services/product.service'

// useSelector lấy store từ redux về
// useDispatch set lại state trên redux
import { useSelector, useDispatch } from 'react-redux'
import { setListProduct } from 'src/redux/slices/product.slice'
import {useAppSelector } from 'src/redux/store'

export default function Home() {

  const listProduct = useAppSelector((state) =>{
    return state.productReducer.listProduct
    
  })
  // console.log('listProduct: ',listProduct)

  const dispatch = useDispatch()
    
  useEffect(() => {
    // getAllProduct() là một function async nên giá trị trả về luôn là một promise;

    // sử dụng async await -IIFE (GỌI NGAY LẬP TỨC)
    (async () => {
      const resp = await getAllProduct()
      const action = setListProduct(resp.content)

      dispatch(action)

    })()

  }, [])

  return (
    <div>
      <HomeCarousel />
      <HomeProduct />
    </div>
  )
}
