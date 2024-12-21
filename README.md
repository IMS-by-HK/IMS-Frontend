# Inventory Management System - Front End

Developed by Hayden and Kate.

Hosted on Netlify: inventorymanagementsystem.au

#### Notice:

**Please be aware** that on mobile devices, you are not able to **add**, **edit** or **remove** items. This is a feature supported by only desktop users.

Please also make sure to be aware of the server/back-end start up time when initially loading onto the website

### Initialising/Dependencies/DevDependencies for the Front-End installed:

- Node.js:
    - ```npm init -y```
- React and related packages:
    - ```npm install axios cra-template react react-dom react-router-dom react-scripts```
- Babel:
    - ```npm install @babel/core @babel/preset-env @babel/preset-react```
- Babel Plugins:
    - ```npm install @babel/plugin-proposal-private-property-in-object @babel/plugin-transform-private-property-in-object```
- Testing:
    - ```npm install @testing-library/jest-dom @testing-library/react babel-jest identity-obj-proxy jest```
    - For testing, **make sure** to add ```"type": "module"``` to the package.json file and **make sure** to **remove** it once testing is complete.

### Setting up Environment:

Once everything is installed, **make sure** to:

- Add ```"proxy": "http://localhost:3000"``` to the package.json file. Make sure the port you are using is correct.
- Create a .env file in the root of the folder and add ```REACT_APP_API_URL=https://ims-backend-2qfp.onrender.com``` for the back-end/server to work.

### Front-End Testing:

![Test Image 2](docs/Front-End-Testing-2.png)
![Test Image 1](docs/Front-End-Testing-1.png)
![Test Image 3](docs/Front-End-Testing-3.png)

### Pages:
##### Main Page
![Main Page](docs/page1.png)
##### Main Page - Edit Item
![Main Page - Edit Item](docs/page2.png)
##### Main Page - Add Item
![Main Page - Add Item](docs/page3.png)
##### Login Page
![Login Page](docs/page4.png)
##### Sign-Up Page
![Sign-Up Page](docs/page5.png)


