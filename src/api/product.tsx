import instance from "./instance";
interface IProduct {
    id: number,
    name: string,
    price: number
}
const getAllProduct = () => {
    return instance.get('/products')
}
const getOneProduct = (id: number) => {
    return instance.get('/products/' + id)
}
const addProduct = (product: IProduct) => {
    return instance.post('/products', product)
}
const deleteProduct = (id: number) => {
    return instance.delete('/products/' + id)
}
const updateProduct = (product: IProduct) => {
    return instance.put('/products/' + product.id, product)
}

export { getAllProduct, getOneProduct, deleteProduct, updateProduct, addProduct }