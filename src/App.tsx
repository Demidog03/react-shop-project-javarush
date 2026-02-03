import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from "./components/header/Header.tsx";
import ProductList from "./components/products/ProductsList.tsx";

function App() {

  return (
    <>
        <Header/>
        <ProductList/>
    </>
  )
}

export default App
