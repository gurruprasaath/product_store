import React from 'react';
import "../style.css";
import { useNavigate } from 'react-router-dom';

function CreatePage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      price: e.target.price.value,
      image: e.target.image.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Redirect to home page
        navigate("/");
      } else {
        alert("Failed to add product");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <h1 className="create-title">Create Product</h1>
      <div className="form-container">
        <form className="product-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Product Name:
            <input type="text" name="name" className="form-input" required />
          </label>
          <label className="form-label">
            Price:
            <input type="number" name="price" className="form-input" required />
          </label>
          <label className="form-label">
            Image URL:
            <input type="text" name="image" className="form-input" required />
          </label>
          <button type="submit" className="submit-btn">Create Product</button>
        </form>
      </div>
    </>
  );
}

export default CreatePage;
