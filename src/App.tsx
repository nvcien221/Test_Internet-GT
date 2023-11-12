import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import GlobalStyle from "./components/global/global"

// as để đổi tên
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./redux/store"
import { CartProvider } from "./components/context/cartContext"

function App() {
  return (
    <ReduxProvider store={store}>
      <GlobalStyle>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </GlobalStyle>
    </ReduxProvider>


  )

}

export default App
