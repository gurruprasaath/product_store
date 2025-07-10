import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'; // Make sure you create and import this CSS file

function HomePage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        console.error("Unexpected format", data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleUpdate = (id, update) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Update successful:', data);
        fetchProducts(); // Refresh product list
      })
      .catch((error) => console.error('Error updating product:', error));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      name: e.target.name.value,
      price: e.target.price.value,
      image: e.target.image.value,
    };
    handleUpdate(selectedProduct._id, updatedData);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data.message);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <h2>All Products</h2>
      <div className="product-grid">
        {products.length === 0 ? (
          <div className="no-products-msg">
            <p>🚫 No products found.
              <Link to="/create" className="create-link">➕ Create a new product</Link>
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} className="product-img" />
              <h3>{product.name}</h3>
              <p>₹ {product.price}</p>
              <div className="buttons">
                <button onClick={() => handleDelete(product._id)} className="delete-btn">
                 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 32 32">
                        <path d="M 15 4 C 14.476563 4 13.941406 4.183594 13.5625 4.5625 C 13.183594 4.941406 13 5.476563 13 6 L 13 7 L 7 7 L 7 9 L 8 9 L 8 25 C 8 26.644531 9.355469 28 11 28 L 23 28 C 24.644531 28 26 26.644531 26 25 L 26 9 L 27 9 L 27 7 L 21 7 L 21 6 C 21 5.476563 20.816406 4.941406 20.4375 4.5625 C 20.058594 4.183594 19.523438 4 19 4 Z M 15 6 L 19 6 L 19 7 L 15 7 Z M 10 9 L 24 9 L 24 25 C 24 25.554688 23.554688 26 23 26 L 11 26 C 10.445313 26 10 25.554688 10 25 Z M 12 12 L 12 23 L 14 23 L 14 12 Z M 16 12 L 16 23 L 18 23 L 18 12 Z M 20 12 L 20 23 L 22 23 L 22 12 Z"></path>
                      </svg>
              </button>

              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
                className="update-btn"
              >
                 <svg
                      className="feather feather-edit"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
              </button>
              </div>
              
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Update Product</h2>
            <form onSubmit={handleFormSubmit}>
              <input type="text" name="name" defaultValue={selectedProduct?.name} required />
              <input type="number" name="price" defaultValue={selectedProduct?.price} required />
              <input type="text" name="image" defaultValue={selectedProduct?.image} required />
              <button type="submit">✅ Update</button>
              <button type="button" onClick={() => setIsModalOpen(false)}>❌ Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
