import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import AddProductPage from './pages/admin/AddProduct'
import UpdateProductPage from './pages/admin/UpdateProduct'
import Dashboard from './pages/admin/dashboard'
import HomePage from './pages/HomePage'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/ProductDetail'
import { IProduct } from './types/product'
import { ICate } from './types/cate'
import { addCate, deleteCate, getAllCate, updateCate } from './api/cate'
import Category from './pages/admin/cate'
import UpdateCatePage from './pages/admin/UpdateCate'
import AddCatePages from './pages/admin/Addcate'
import LoginPage from './pages/Login'
import { addUser, getAllUser } from './api/user'
import { IUser } from './types/user'
import LogupPage from './pages/logup'

function App() {
  const [products, setProducts] =  useState<IProduct[]>([])
  const [cates, setCate] =  useState<ICate[]>([])
  const [users, setUser] =  useState<IUser[]>([])
  useEffect(() => {
    getAllCate().then(({ data }) => setCate(data))
  }, [])

  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])
  useEffect(() => {
    getAllUser().then(({ data }) => setUser(data))
  }, [])
  const onHandleRemove = (id: number) => {
  deleteProduct(id).then(() => setProducts(products.filter(item => item.id !== Number(id))))
  }
  const onHandleRemoveCate = (id: number) => {
    deleteCate(id).then(() => setCate(cates.filter(item => item.id !== Number(id))))
    }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product)
  }
  const onHandleAddCate = (cate: ICate) => {
    addCate(cate)
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product)
  }
  const onHandleUpdateCate = (cate: ICate) => {
    updateCate(cate)
  }
  const onHandleUpdateUser = (user: IUser) => {
    addUser(user)
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage products={products}/>} />
          <Route path='products' element={<ProductPage products={products} onRemove={onHandleRemove} />} />
          <Route path='login' element={<LoginPage products={products} />} />
          <Route path='logup' element={<LogupPage onUpdate={onHandleUpdateUser} users={users} />} />
          <Route path='products/:id' element={<ProductDetailPage products={products} />} />
        </Route>
        <Route path='/admin'>
          <Route path='products'>
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            <Route path='all' element={<Dashboard products={products} onRemove={onHandleRemove} />} />
            <Route path=':id/up' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
          <Route path='categories'>
            <Route path='add' element={<AddCatePages onAdd={onHandleAddCate} />} />
            <Route path='all' element={<Category Cate={cates} onRemove={onHandleRemoveCate} />} />
            <Route path=':id/up' element={<UpdateCatePage onUpdate={onHandleUpdateCate} cates={cates} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App

