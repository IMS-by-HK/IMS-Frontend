import '../styles/main.css';

function Main() {
    return (
        <div className="inventory">
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
                <button className="button filter">Filter</button>
            </div>

            {/* NEED: Container for Table, Header Container for Item Details, 2 Containers side-by-side under header */}

            <div className="mainContainer">

                {/* Header Container containing Add Item and Item Categories  */} 
                <div className="headerContainer">

                    {/* Add Item */}
                    <div className="headerLeft"></div>
                    {/* Item Categories */}
                    <div className="headerRight"></div>

                </div>

                {/* Contains the Items and Item Specifics */}
                <div className="tableContainer">
                    <div className="itemName"></div>
                    <div className="itemSpecifics"></div>
                </div>

            </div>

        </div>
    );
};

export default Main;
