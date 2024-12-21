import "../styles/main.css";
import "../styles/mainMobile.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Add from "../images/add.png";
import Edit from "../images/edit.png";
import LoadingIcon from "../images/loading-icon.gif";
import Delete from "../images/delete.png";

function Main() {
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOption, setFilterOption] = useState('FILTER');
    
    const { isLoggedIn, logout } = useAuth();

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleFilterChange = (e) => {
        setFilterOption(e.target.value);
    };

    useEffect(() => {
        const filtered = items.filter((item) => {
            const matchesSearchTerm = searchTerm
                ? [item.name, item.price, item.quantity, item.category, item.productId]
                      .map((field) => field.toString().toLowerCase())
                      .some((field) => field.includes(searchTerm))
                : true;
            
            return matchesSearchTerm;
        });

        let sortedItems = filtered;
        

        if (filterOption !== 'FILTER') {
            sortedItems = filtered.sort((a, b) => {
                if (filterOption === "Price") {
                    return a.price - b.price;
                } else if (filterOption === "Quantity") {
                    return a.quantity - b.quantity;
                } else if (filterOption === "Category") {
                    return a.category.localeCompare(b.category);
                } else if (filterOption === "Id") {
                    return a.productId - b.productId;
                } else if (filterOption === "Name") {
                    return a.name.localeCompare(b.name);
                }
                return 0;
            });
        }

        setDisplayedItems(sortedItems);
    }, [searchTerm, items, filterOption]);

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
                togglePopup();
                setFormData({ name: "", price: "", quantity: "", category: "" });
                fetchItems();
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            const response = await axios.patch(
                `https://ims-backend-2qfp.onrender.com/products/${editingItem._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
    
            if (response.status === 201 || response.status === 200 || response.status === 204) {
                setShowEditPopup(false);
                setEditingItem(null);
                setFormData({ name: "", price: "", quantity: "", category: "" });
                fetchItems();
            }
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log(token);
            console.log(`${editingItem._id}`);
            
            const response = await axios.delete(
                `https://ims-backend-2qfp.onrender.com/products/${editingItem._id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
    
            if (response.status === 201 || response.status === 200 || response.status === 204) {
                setShowEditPopup(false);
                setEditingItem(null);
                setFormData({ name: "", price: "", quantity: "", category: "" });
                fetchItems();
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const fetchItems = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(
                "https://ims-backend-2qfp.onrender.com/products/all"
            );
            setItems(response.data);
            setDisplayedItems(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleLogout = () => {
        console.log("Logging out...")
        logout();
        window.location.reload();
        console.log("Logged out")
    };

    return (
        <div className={`inventory ${showPopup || showEditPopup ? "dimmed" : ""}`}>
            <div className="logout-container">
                {isLoggedIn && (
                    <button onClick={handleLogout} className="logout-button">
                        Log Out
                    </button>
                )}
            </div>
            <h1 className="title">Inventory Management System</h1>

            <div className="search">
                <input
                    type="text"
                    className="input"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <select className="button filter" id="filterOptions" onChange={handleFilterChange} value={filterOption}>
                    <option value="FILTER">FILTER</option>
                    <option value="Price">PRICE</option>
                    <option value="Quantity">QUANTITY</option>
                    <option value="Category">CATEGORY</option>
                    <option value="Id">ID</option>
                    <option value="Name">NAME</option>
                </select>
            </div>

            <div className="mainContainer">
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

                <div className="tableContainer">
                    {isLoading ? (
                        <div className="loading-icon-container">
                            <img src={LoadingIcon} alt="Loading..." className="loading-icon" />
                        </div>
                    ) : (
                        displayedItems.map((item) => (
                            <div key={item._id} className="itemSpecifics">
                                <div className="itemName">
                                    <p>{item.name}</p>
                                </div>
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