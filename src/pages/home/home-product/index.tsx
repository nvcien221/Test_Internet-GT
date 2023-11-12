import React from 'react'
import css from './product.module.scss'
import { useAppSelector } from 'src/redux/store'
import ListCard from 'src/components/listCard'


function HomeProduct() {

  const listProduct = useAppSelector((state) => state.productReducer.listProduct)
  // console.log('HomeProduct: ',listProduct)

  return (
    <div>
      <h2 className={css['product-heading']}>Product Feature</h2>
    
      <ListCard list={listProduct}/>

    </div>
  )
}

export default HomeProduct
