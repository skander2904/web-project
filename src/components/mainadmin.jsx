import React, { useState, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { AiFillCreditCard, AiFillDelete, AiFillEdit } from 'react-icons/ai';
import AddProductModal from './popUp';
import { getalltheproducts, deleteProduct, getProductByID } from '../service/service';
import AdminSidebar from './adminsidebar';
import EditProduct from './editPopUP';

const Mainadmin = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});


    const fetchProducts = async () => {
        try {
            const response = await getalltheproducts();
            if (response && Array.isArray(response.products)) {
                setProducts(response.products);
                setFilteredProducts(response.products);
            } else {
                console.error('Unexpected response format:', response);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };
    

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle search
    const searchHandler = (e) => {
        const filteredArray = products.filter((product) =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filteredArray);
    };

    const handleDelete = async (id) => {
        try {
            await deleteProduct(id);
            fetchProducts(); 
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit =  async (id) => {
        try {

            setIsEditModalOpen(true);
            const product = await getProductByID(id);

            setSelectedProduct(product);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };
    const onEditProduct=()=>{
        fetchProducts();
    }


    const onadProduct=()=>{
        fetchProducts();
    }

    return (

        <div className='w-full relative'>

            
            <div className='sticky top-0 z-10'>
                <div className='header flex justify-between items-center p-4 bg-white'>
                    <button
                        type='button'
                        onClick={() => setIsModalOpen(true)}
                        className='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 text-center'>
                        Add
                    </button>

                    <div className='search flex justify-between items-center px-5 py-2 bg-gray-100 rounded'>
                        <input
                            type='text'
                            placeholder='Search product'
                            className='bg-transparent outline-0'
                            onChange={searchHandler}
                        />
                        <CiSearch />
                    </div>
                </div>
            </div>

            <div className='products grid grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-9 p-4 z-20'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product._id} className="product h-[400px] bg-white drop-shadow-2xl p-2 border">
                            <img
                                src={product.imagePath ? `../../src/assets/${product.imagePath}` : '/default-image.jpg'}
                                alt={product.name || 'No name'}
                                className='w-full h-[60%] object-cover p-2'
                            />
                            <div className='m-2 bg-gray-100 p-2'>
                                <h1 className='text-xl font-semibold'>{product.name || 'Unnamed Product'}</h1>
                                <p className='text-sm'>{product.description || 'No description available.'}</p>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold'>
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p className='text-xl font-bold'>Quantity: {product.quantity || 0}</p>
                                </div>
                                <div className='flex justify-end'>
                                    <button onClick={() => handleDelete(product._id)}>
                                        <AiFillDelete size={'1.5rem'} color='red' />
                                    </button>
                                    <button onClick={()=>handleEdit(product._id)}>
                                        <AiFillEdit size={'1.5rem'} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            <EditProduct isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}   product={selectedProduct} onEditProduct={onEditProduct}
  />

            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onadProduct={onadProduct} />

            </div>
    );
};

export default Mainadmin;
