import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6005/api', 

  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/signIn', { email, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg || 'Error during login');
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg || 'Error during registration');
  }
};



export const getallUsers=async()=>{
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};
export const updateUser=async(id,user)=>{
  try {
    const response = await api.put(`/users/${id}`,user);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};
export const getOneUser = async (id, token) => {
  try {
    const response = await api.get(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error; 
  }
};

export const addproduct=async(product)=>{

  try{
    const response=await api.post('/products',product);
    return response.data;
  }catch(error){
    throw new error(error.response.Error.data.msg || 'error')
  }
  };

  
export const getalltheproducts=async()=>{
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
};
export const getProductsByType=async(Type)=>{
  try {
    const response = await api.get(`/products/type/${Type}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};
export const getProductByID= async (id) => {
  try {
    const response = await api.get(`/products/${id}`); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
};
export const UpdateProducts= async(id,product)=>{
  try {
    const response = await api.put(`/products/${id}`,product); 
    return response.data; 
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error; 
  }
};





export const createPurchase = async (purchaseData) => {
  try {
    const response = await api.post(`/purchase`, purchaseData, {
    
    });
    return response.data;
  } catch (error) {
    console.error('Error creating purchase:', error.response || error.message);
    throw error;
  }
};


export const getAllPurchases = async () => {
  try {
    const response = await api.get(`/purchases`);
    return response.data;
  } catch (error) {
    console.error('Error fetching purchases:', error);
    throw error;
  }
};

export const getPurchasesByUser= async (userId) => {
  try {
    const response = await api.get(`/purchases/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching purchases for user ${userId}:`, error);
    throw error;
  }
};

export const deletePurchase = async (purchaseId) => {
  try {
    const response = await api.delete(`/purchase/${purchaseId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting purchase ${purchaseId}:`, error);
    throw error;
  }
};



export const getPurchaseIdByUserAndProduct = async (userId, productId) => {
  try {
    const response = await api.get(`/purchase/${userId}/${productId}`);
    return response.data.purchaseId;  
  } catch (error) {
    console.error('Error fetching purchaseId:', error);
    throw error;
  }
};