import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BsArrowLeft } from 'react-icons/bs';
import { getPurchasesByUser, getProductByID, getPurchaseIdByUserAndProduct, deletePurchase } from '../service/service';
import { jwtDecode } from 'jwt-decode';
import { NavLink } from 'react-router-dom';

const Cartitems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }
      const decodedToken = jwtDecode(token);
      const userid = decodedToken.id;
      const cartResponse = await getPurchasesByUser(userid);

      if (cartResponse && cartResponse.length > 0) {
        const productIds = cartResponse.map((item) => item.productId);
        setCartItems(cartResponse);

        const initialQuantities = {};
        cartResponse.forEach((item) => {
          initialQuantities[item.productId] = item.quantity;
        });
        setQuantities(initialQuantities);

        await fetchProductDetails(productIds);
      } else {
        console.error('No products found in the cart.');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart(); 
  }, []);

  const fetchProductDetails = async (productIds) => {
    try {
      const productsResponse = [];
      for (let id of productIds) {
        const response = await getProductByID(id);
        const product = response.product;
        productsResponse.push(product);
      }
      setProducts(productsResponse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleDelete =async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }
    const decodedToken = jwtDecode(token);
    const userid = decodedToken.id;
    const purchaseId=await getPurchaseIdByUserAndProduct(userid,productId);
    await deletePurchase(purchaseId)
    fetchCart();

  };


  const handleQuantityChange = async(productId, newQuantity) => {

    const product=await getProductByID(productId)
    let   MAX_QUANTITY = product.product.quantity;


    const validatedQuantity = Math.min(Math.max(Number(newQuantity), 1), MAX_QUANTITY); 
    setQuantities((prev) => ({
      ...prev,
      [productId]: validatedQuantity,
    }));
  };
  

  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p._id === item.productId);
      const quantity = quantities[item.productId] || 1;
      return total + (product?.price || 0) * quantity;
    }, 0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const subTotal = calculateSubTotal();
  const shippingCost = 20;
  const total = subTotal + shippingCost;

  return (
    <div className="w-11/12 m-auto py-10">
      <h1 className="text-3xl font-bold">Shopping Cart</h1>
      <p className="text-sm text-gray-400">There are {cartItems.length} items in your cart</p>
      <section className="flex justify-between items-center space-x-10">
        <div className="w-[60%] space-y-3">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <td className="text-gray-40 py-2">Product</td>
                <td className="text-gray-40 py-2">Price</td>
                <td className="text-gray-40 py-2">Quantity</td>
                <td className="text-gray-40 py-2">Total</td>
                <td className="text-gray-40 py-2">Delete</td>
              </tr>
            </thead>
            <tbody className="space-y-10">
              {cartItems.map((cartItem) => {
                const product = products.find((p) => p._id === cartItem.productId);
                console.log(cartItem.productId)
                if (!product) return null;
                return (
                  <tr className="border-dashed border-b" key={cartItem.productId}>
                    <td className="py-5">
                      <div className="flex items-center space-x-3 py-2">
                        <img
                          src={product.imagePath ? `../../src/assets/${product.imagePath}` : '/default-image.jpg'}
                          alt={product.name}
                          className="w-[100px] h-[100px] border rounded p-2"
                        />
                        <div>
                          <h1 className="text-xl font-bold">{product.name}</h1>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>
                      <div className="border w-24 p-2">
                        <input
                          type="number"
                          className="w-full outline-0"
                          value={quantities[cartItem.productId] || 1}
                          min={1}
                          onChange={(e) => handleQuantityChange(cartItem.productId, e.target.value)}
                        />
                      </div>
                    </td>
                    <td>${(product.price * (quantities[cartItem.productId] || 1)).toFixed(2)}</td>
                    <td>
                      <button onClick={() => handleDelete(cartItem.productId)}>
                        <AiFillDelete size="1.5rem" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="my-5">
          <NavLink to="/Home">

            <button className="flex items-center space-x-3 bg-gray-200 font-semibold rounded p-2">
              <BsArrowLeft />
              <span>Continue Shopping</span>
              </button>
              </NavLink>

          </div>
        </div>
        <div className="w-[40%] h-fit border rounded p-5 space-y-5">
          <div className="flex justify-between items-center border-b border-dashed p-2">
            <h1 className="text-xl">Sub Total</h1>
            <p>${subTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center border-b border-dashed p-2">
            <h1 className="text-xl">Discount</h1>
            <p>$0.00</p>
          </div>
          <div className="flex justify-between items-center border-b p-2">
            <h1 className="text-xl">Shipping</h1>
            <p>${shippingCost.toFixed(2)}</p>
          </div>
          <div className="flex justify-between items-center p-2">
            <h1 className="text-xl">Total</h1>
            <p>${total.toFixed(2)}</p>
          </div>
          <button className="w-full p-2 bg-gray-800 text-center text-white rounded">
            Check Out
          </button>
        </div>
      </section>
    </div>
  );
};

export default Cartitems;
