import '../styles/main.css';
import Add from '../images/add.png';
import Edit from '../images/edit.png';

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
                    <div className="headerLeft">
                        <p>ITEM</p>
                        <img src={Add} alt="Add" className='addImage' />
                    </div>
                    {/* Item Categories */}
                    <div className="headerRight">
                        <p>PRICE</p>
                        <p>QTY</p>
                        <p>CATEGORY</p>
                        <p>ID</p>
                    </div>

                </div>

                {/* Contains the Items and Item Specifics */}
                <div className="tableContainer">

                    <div className="itemName">
                        <p>Sausage</p>
                        <p>Pizza</p>
                        <p>Doughnut</p>
                        <p>Sausage</p>
                        <p>Pizza</p>
                        <p>Doughnut</p>
                        <p>Sausage</p>
                        <p>Pizza</p>
                        <p>Doughnut</p>
                    </div>

                    <div className="itemSpecificsContainer">
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        <div className="itemSpecifics">
                            <p>10.00</p>
                            <p>10</p>
                            <p>Grocery</p>
                            <p>1</p>
                            <div className="buttonContainer">
                                <img src={Edit} alt="Edit" className='editButton'/>
                            </div>
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Main;
