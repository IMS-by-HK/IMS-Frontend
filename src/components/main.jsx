import '../styles/main.css';

function Main() {
    return (
        <div className="inventory">
          <h1 className="title">Inventory Management System</h1>

          <div className="search">
            <input
              type="text"
              className="input"
              placeholder="Search product name..."
            />
            <button className="button filter">Filter</button>
          </div>


        </div>
      );
    };

export default Main;
