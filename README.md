# PopnShop
E-commerce site with frontend, backend, and admin panel.

**frontend**: The UI of the project

**backend**: Contains all API endpoints the frontend uses to connect with the database

**admin panel**: Allows the admin to insert or remove products from the frontend

## Database Setup
This project uses MongoDB Atlas.  
Please set up your own MongoDB Atlas cluster and update the `.env` file in the `backend` folder with your connection string:

## How to Run
1. Clone the repository:
    (in your terminal)
    git clone <your-repo-link>

2. Navigate to frontend:
    cd ../frontend
    npm install
    npm start
   
3. Navigate to backend:
    cd backend
    npm install
    node index.js

4. Navigate to admin panel:
    cd ../admin
    npm install
    npm run dev
