import React, { useState, useEffect } from 'react';
import '../components/pop.css';
import { motion } from 'framer-motion';
import { UpdateProducts } from '../service/service';

const EditProduct = ({ isOpen, onClose, product, onEditProduct }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (product && product.product) {
      const productData = product.product;


      setTitle(productData.name || '');
      setPrice(productData.price || '');
      setDescription(productData.description || '');
      setProductType(productData.type || '');
      setQuantity(productData.quantity || '');
      setImage(productData.imagePath || null);
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('type', productType);
    formData.append('quantity', quantity);
    if (typeof image === 'string') {
      formData.append('imagePath', image);
    } else if (image) {
      formData.append('imagePath', image.name);
    }
    try {
      console.log(product.product._id);
      await (UpdateProducts(product.product._id, formData))
      onEditProduct();
      onClose();

    } catch {
      console.error(error.message);

    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: 100, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 100, scale: 0.5, rotate: 10 }}
        transition={{
          duration: 0.7,
          ease: [0.42, 0, 0.58, 1],
          delay: 0.5,
        }}
      >
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Product Title:</label>
            <input
              type="text"
              className="border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Price:</label>
            <input
              type="number"
              className="border p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Quantity:</label>
            <input
              type="number"
              className="border p-2"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Description:</label>
            <textarea
              className="border p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Product Type:</label>
            <select
              className="border p-2"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            >
              <option value="">Select Type</option>
              <option value="protein">protein</option>
              <option value="creatine">creatine</option>
              <option value="preworkout">preworkout</option>
              <option value="clothes">clothes</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label className="mb-2">Product Image:</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2"
              onChange={handleImageChange}
            />
            {image && <p className="text-sm mt-2">Selected: {image.name || image}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Product
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditProduct;
