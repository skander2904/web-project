import React, { useEffect, useState } from 'react';
import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import { createPurchase, getalltheproducts, getProductsByType } from '../service/service';
import { jwtDecode } from 'jwt-decode';

const Main = () => {
    const types = ["all", "protein", "creatine", "preworkout", "clothes"];

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

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

    const searchHandler = (e) => {
        const filteredArray = products.filter((product) =>
            product.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredProducts(filteredArray);
    };

    const handleEdit = async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }

            const decodedToken = jwtDecode(token);
            const userid = decodedToken.id;

            const formData = {
                userId: userid,
                productId: id
            };

            console.log('Sending purchase data:', formData);

            await createPurchase(formData);
            console.log('Purchase created successfully');

        } catch (error) {
            console.error('Error creating purchase:', error.response || error.message);
        }
    };

    const handleCategoryClick = async (type) => {
        if (type === "all") {
            setFilteredProducts(products);
        } else {
            try {
                const response = await getProductsByType(type);
                if (response && Array.isArray(response.products) && response.products.length > 0) {
                    setFilteredProducts(response.products);
                } else {
                    setFilteredProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products by type:', error);
                setFilteredProducts([]);
            }
        }
    };

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 z-10 rounded-xl'>
                <div className='header flex justify-between items-center p-4 bg-white '>
                    <img
                        src="../../src/assets/logo.png"
                        alt="MuscleUp Logo"
                        className="inline-block"
                        style={{ height: "90px", width: "auto" }}
                    />


                    <div className="flex-1 flex justify-center">
                        <div className="search flex justify-between items-center px-5 py-2 bg-gray-100 rounded w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Search product"
                                className="bg-transparent outline-0 w-full marginleft"
                                onChange={searchHandler}
                            />
                            <CiSearch size="1.5rem" />
                        </div>
                    </div>
                </div>

                <div className="categories bg-white w-full flex justify-center space-x-4 px-2 py-5">
                    {types.map((type) => (
                        <div
                            key={type}
                            className={`cursor-pointer bg-gray-100 hover:bg-blue-500 hover:text-white px-5 py-2 rounded-full drop-shadow-md transition duration-200 transform hover:scale-105`}
                        >
                            <button onClick={() => handleCategoryClick(type)}>
                                <p className="text-lg font-medium">{type}</p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='products grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 p-4'>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            key={product._id}
                            className="product bg-white border rounded-xl drop-shadow-md hover:drop-shadow-lg transition duration-200 transform hover:scale-105"
                        >
                            <img
                                src={product.imagePath ? `../../src/assets/${product.imagePath}` : '/default-image.jpg'}
                                alt={product.name || 'No name'}
                                className='w-full h-48 object-cover rounded-t-xl'
                            />
                            <div className='p-4'>
                                <h1 className='text-xl font-bold mb-2'>{product.name || 'Unnamed Product'}</h1>
                                <p className='text-sm text-gray-600 mb-4'>{product.description || 'No description available.'}</p>
                                <div className='flex justify-between items-center mb-4'>
                                    <p className='text-lg font-bold text-blue-600'>${product.price?.toFixed(2) || '0.00'}</p>
                                    <p className='text-sm text-gray-500'>Qty: {product.quantity || 0}</p>
                                </div>
                                <button
                                    onClick={() => handleEdit(product._id)}
                                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                                >
                                    <CiShoppingCart size={'1.5rem'} className="inline mr-2" />
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-center w-full col-span-full text-xl font-bold text-gray-600'>
                        No products found for the selected category.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Main;
