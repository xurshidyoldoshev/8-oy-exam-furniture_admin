import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Auth/Register/Register'
import AdminLayout from './pages/AdminLayout'
import CategoryPage from './pages/Categories/CategoryPage'
import Login from './pages/Auth/Login/Login'
import ProductPage from './pages/Product/ProductPage'
import Protected from './components/Protected'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminLayout />}>
          <Route index element={<Protected><Home /></Protected>} />
          <Route path='/category' element={<Protected><CategoryPage /></Protected>} />
          <Route path='/products' element={<Protected><ProductPage /></Protected>} />
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
