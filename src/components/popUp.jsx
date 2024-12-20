import React, { useState } from 'react';
import { addproduct } from '../service/service';
import '../components/pop.css'
import { motion } from 'framer-motion';
const AddProductModal = ({ isOpen, onClose, onadProduct }) => {



  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [productType, setProductType] = useState('');
  const [quentity, setquentity] = useState('');

  const [image, setImage] = useState(null);
  const init = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setProductType('');
    setquentity('');
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('type', productType);
    formData.append('imagePath', image);
    formData.append('quantity', quentity)

    try {
      const addedProduct = await addproduct(formData);
      console.log('Product added successfully:', addedProduct);
      init();
      onadProduct();

    } catch (error) {
      console.error(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const filePath = file.name;
      console.log("File Path:", filePath);
      setImage(filePath);
    }
  };
  return (
    <div className={`modal ${isOpen ? 'show' : ''}`}>
      <motion.div className="modal-content"
        initial={{ opacity: 0, y: 100, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        exit={{ opacity: 0, y: 100, scale: 0.5, rotate: 10 }}
        transition={{
          duration: 0.7,
          ease: [0.42, 0, 0.58, 1],
          delay: 0.5,
        }}




      >
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2>Add New Product</h2>
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
              value={quentity}
              onChange={(e) => setquentity(e.target.value)}
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
              required
            />
            {image && <p className="text-sm mt-2">Selected: {image.name}</p>}
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
              Add Product
            </button>
          </div>
        </form>
      </motion.div>


    </div>
  );
};

export default AddProductModal;
