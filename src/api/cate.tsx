import instance from "./instance";
interface ICate {
    id: number,
    name: string,
}
const getAllCate = () => {
    return instance.get('categories')
}
const getOneCate = (id: number) => {
    return instance.get('categories/' + id)
}
const addCate = (category: ICate) => {
    return instance.post('categories', category)
}
const deleteCate = (id: number) => {
    return instance.delete('categories/' + id)
}
const updateCate = (category: ICate) => {
    return instance.put('categories/' + category.id, category)
}

export { getAllCate, getOneCate, deleteCate, updateCate, addCate }