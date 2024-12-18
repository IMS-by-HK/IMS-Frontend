import "../styles/main.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Add from "../images/add.png";
import Edit from "../images/edit.png";
import LoadingIcon from "../images/loading-icon.gif";
import Delete from "../images/delete.png";

function Main() {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
    });

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle edit click for edit item button
    const handleEditClick = (item) => {
        setFormData({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            category: item.category
        });
        setEditingItem(item);
        setShowEditPopup(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "https://ims-backend-2qfp.onrender.com/products/create",
                formData
            );
    
            if (response.status === 201 || response.status === 200) {
                console.log("Item successfully added!");
                togglePopup(); // Close the popup after success
                setFormData({ name: "", price: "", quantity: "", category: "" }); // Clear form fields
                fetchItems(); // Refresh the items list
            } else {
                console.error("Failed to add item. Response status:", response.status);
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Trying to fetch edit item");
            const response = await axios.patch(
                `https://ims-backend-2qfp.onrender.com/products/${editingItem._id}`,
                formData
            );

            if (response.status === 201 || response.status === 200) {
                console.log("Item successfully updated!");
                setShowEditPopup(false); // Close the popup after success
                setEditingItem(null);
                setFormData({ name: "", price: "", quantity: "", category: "" }); // Clear form fields
                fetchItems(); // Refresh the items list
            } else {
                console.error("Failed to update item. Response status:", response.status);
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleDelete = async () => {
        try {
            console.log("Trying to delete item with ID:", editingItem._id);

            const token = localStorage.getItem('token') || 'your-static-token-if-not-using-auth';
            
            const response = await axios.delete(
                `https://ims-backend-2qfp.onrender.com/products/${editingItem._id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
    
            if (response.status === 204 || response.status === 200) {
                console.log("Item successfully deleted!");
                setShowEditPopup(false);
                setEditingItem(null);
                setFormData({ name: "", price: "", quantity: "", category: "" });
                fetchItems();
            } else {
                console.error("Unexpected response status when deleting item:", response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error("Error deleting item - Server responded with:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("Error deleting item - No server response:", error.request);
            } else {
                console.error("Error deleting item - Request setup failed:", error.message);
            }
        }
    };


    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                "https://ims-backend-2qfp.onrender.com/products/all"
            );
            console.log("Response data:", response.data);
            setItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className={`inventory ${showPopup || showEditPopup ? "dimmed" : ""}`}>
            {/* Main Page Title */}
            <h1 className="title">Inventory Management System</h1>

            {/* Container for Input and Filter Button */}
            <div className="search">
                {/* Input Field */}
                <input
                    type="text"
                    className="input"
                    placeholder="Search product name..."
                />
                {/* Filter Button */}
                <select className="button filter" id="filterOptions">
                    <option value="FILTER">FILTER</option>
                    <option value="Price">PRICE</option>
                    <option value="Quantity">QUANTITY</option>
                    <option value="Category">CATEGORY</option>
                    <option value="Id">ID</option>
                    <option value="Name">NAME</option>
                </select>
            </div>

            {/* Main Container for Table */}
            <div className="mainContainer">
                {/* Header Container */}
                <div className="headerContainer">
                    <div className="headerLeft">
                        <p>ITEM</p>
                        <button className="addButtonSubmit" onClick={togglePopup}>
                            <img src={Add} alt="Add" className="addImage" />
                        </button>
                    </div>
                    <div className="headerRight">
                        <p>PRICE</p>
                        <p>QTY</p>
                        <p>CATEGORY</p>
                        <p>ID</p>
                    </div>
                </div>

                {/* Items List */}
                <div className="tableContainer">
                    {isLoading ? (
                        <div className="loading-icon-container">
                            <img src={LoadingIcon} alt="Loading..." className="loading-icon" />
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item._id} className="itemSpecifics">
                                <div className="itemName">{item.name}</div>
                                <div className="specificsRight">
                                    <p className="itemPrice">${item.price.toFixed(2)}</p>
                                    <p className="itemQuantity">{item.quantity}</p>
                                    <p className="itemCategory">{item.category}</p>
                                    <p className="itemId">{item.productId}</p>
                                    <button className="editButtonSubmit" onClick={() => handleEditClick(item)}>
                                        <img src={Edit} alt="Edit" className="editButton" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Popup Window for Adding */}
            {showPopup && (
                <div className="popupOverlay">
                    <div className="popupContainer">
                        <h2>Add New Item</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Item Name:
                                <input
                                    type="text"
                                    className="popupInput"
                                    placeholder="Enter item name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Price:
                                <input
                                    type="number"
                                    className="popupInput"
                                    placeholder="Enter item price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Quantity:
                                <input
                                    type="number"
                                    className="popupInput"
                                    placeholder="Enter item quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Category:
                                <select
                                    className="popupSelect"
                                    id="itemCategory"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option value="Produce">Produce</option>
                                    <option value="Frozen">Frozen</option>
                                    <option value="Fridge">Fridge</option>
                                    <option value="Dry">Dry</option>
                                    <option value="Deli">Deli</option>
                                    <option value="Bakery">Bakery</option>
                                </select>
                            </label>
                            <div className="popupActions">
                                <button type="button" className="button closeButton" onClick={togglePopup}>
                                    Close
                                </button>
                                <button type="submit" className="button addItem">
                                    Add Item
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Popup Window for Editing */}
            {showEditPopup && (
                <div className="popupOverlay">
                    <div className="popupContainer">
                        <h2>Edit Item</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Item Name:
                                <input
                                    type="text"
                                    className="popupInput"
                                    placeholder="Enter item name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Price:
                                <input
                                    type="number"
                                    className="popupInput"
                                    placeholder="Enter item price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Quantity:
                                <input
                                    type="number"
                                    className="popupInput"
                                    placeholder="Enter item quantity"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label>
                                Item Category:
                                <select
                                    className="popupSelect"
                                    id="itemCategory"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Category
                                    </option>
                                    <option value="Produce">Produce</option>
                                    <option value="Frozen">Frozen</option>
                                    <option value="Fridge">Fridge</option>
                                    <option value="Dry">Dry</option>
                                    <option value="Deli">Deli</option>
                                    <option value="Bakery">Bakery</option>
                                </select>
                            </label>
                            <div className="popupActions">
                                <button type="button" className="button closeButton" onClick={() => {
                                    setShowEditPopup(false);
                                    setEditingItem(null);
                                    setFormData({ name: "", price: "", quantity: "", category: "" });
                                }}>
                                    Close
                                </button>
                                <button type="submit" className="button addItem">Save Changes</button>
                                <button type="button" className="button deleteButton" onClick={handleDelete}>
                                    <img src={Delete} alt="Delete" className="deleteIcon" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;