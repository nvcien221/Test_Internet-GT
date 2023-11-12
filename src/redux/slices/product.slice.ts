import {createSlice} from '@reduxjs/toolkit'
import { TCardItem } from 'src/types'

const initialState = {
    listProduct: [] as TCardItem[]
}
 
const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers:{
        setListProduct: (state, action) =>{
            // console.log({action})
            state.listProduct = action.payload
        }
    }

})
// action creative
export const {setListProduct} = productSlice.actions
export default productSlice.reducer