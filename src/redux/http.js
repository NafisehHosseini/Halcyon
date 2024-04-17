import { api } from "./api";
const token = localStorage.getItem('token')

const array=[1,2,3,4,5,6,7,8,9,10]
array.map(item=> item)

const getProducts = () =>{
    return api.get('/products')
}
const getProductsLimited = (category,activePage,limit) =>{
    return api.get(`/products?category=${category}&_page=${activePage}&_limit=${limit}`)
}
const getCategory = () =>{
    return api.get('/category')
}
const getUsers = () =>{
    return api.get('/users')
}
const getOrders = () =>{
    return api.get('/orders',{headers:{token:token}})
}
const getOrderStatus = () =>{
    return api.get('/orderStatus')
}

const creatProduct = data =>{
    return api.post('/products',data)
}

const creatOrder = data =>{
    return api.post('/orders',data)
}

const updateProduct = (id,data) =>{
    return api.patch(`/products/${id}`,data,{headers:{token:token}})
}

const updateOrder = (id,data) =>{
    return api.patch(`/orders/${id}`,data,{headers:{token:token}})
}

const removeProduct = id =>{
    return api.delete(`/products/${id}`)
}

const service = {
    getProducts,
    getCategory,
    getUsers,
    getOrders,
    getOrderStatus,
    creatProduct,
    creatOrder,
    updateProduct,
    removeProduct,
    updateOrder,
    getProductsLimited
}

export default service