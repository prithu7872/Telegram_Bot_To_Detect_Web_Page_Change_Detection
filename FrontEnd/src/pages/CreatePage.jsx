import React, { useState } from "react";

const CreatePage = () => {
  // State for product details
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: null,
  });

  // State for form errors
  const [newErrors, setNewErrors] = useState({});

  // State for submission status
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const isValidateForm = () => {
    const { name, price, image } = newProduct;
    let isValid = true;
    const errors = {};
    
    // Name validation
    if (!name.trim()) {
      isValid = false;
      errors.name = "Product name is required";
    }

    // Price validation
    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      isValid = false;
      errors.price = "Valid price format required (e.g., 10.99)";
    }

    // Image validation
    if (!image) {
      isValid = false;
      errors.image = "Product image is required";
    }

    // Update errors state
    setNewErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset errors and start submission
    setNewErrors({});
    setIsSubmitting(true);

    // Validate form
    if (isValidateForm()) {
      try {
        // Simulate API call or actual submission
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("image", newProduct.image);

        const response = await fetch("/api/products", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const savedItem = await response.json(); // Parse saved item response
          console.log("Item saved:", savedItem); // Log saved item
          // Reset form after successful submission
          setNewProduct({
            name: "",
            price: "",
            image: null,
          });
          alert("Product created successfully!");
        } else {
          alert("Failed to get response from server");
        }
      } catch (error) {
        console.error("Submission error:", error);
        alert("Failed to create product. Please try again.");
      } finally {
        // Always reset submitting state
        setIsSubmitting(false);
      }
    } else {
      console.log("Invalid parameters");
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { id, value, files } = event.target;
    // Clear specific error when user starts typing
    if (newErrors[id]) {
      setNewErrors((prev) => ({ ...prev, [id]: undefined }));
    }
    // Handle file input separately
    if (id === "image" && files) {
      setNewProduct((prev) => ({
        ...prev,
        image: files[0] || null,
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  return (
    <div className="container mx-auto max-w-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create a New Product
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              newErrors.name ? "border-red-500" : "border-gray-400"
            }`}
          />
          {newErrors.name && (
            <p className="text-red-500 text-sm mt-1">{newErrors.name}</p>
          )}
        </div>
        {/* Price Input */}
        <div className="form-group">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              newErrors.price ? "border-red-500" : "border-gray-400"
            }`}
            step="0.01"
            min="0"
          />
          {newErrors.price && (
            <p className="text-red-500 text-sm mt-1">{newErrors.price}</p>
          )}
        </div>

        {/* Image Input */}
        <div className="form-group">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              newErrors.image ? "border-red-500" : "border-gray-400"
            }`}
          />
          {newErrors.image && (
            <p className="text-red-500 text-sm mt-1">{newErrors.image}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2   
            ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CreatePage;
