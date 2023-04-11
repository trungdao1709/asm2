import instance from "./instance";
interface IUser {
    id: number,
    name: string,
    eamil:string,
    role: string,
    password: string
}
const getAllUser = () => {
    return instance.get('/auth')
}
const getOneUser = (id: number) => {
    return instance.get('/auth/' + id)
}
const addUser = (user: IUser) => {
    return instance.post('/auth/signup', user)
}


export { getAllUser, getOneUser, addUser }