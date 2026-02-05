🛒 Grocery MERN Stack E-commerce App http://greencart-frontend-anjali-01.s3-website.us-east-2.amazonaws.com
A full-stack application for browsing, ordering, and managing grocery products, 
featuring separate customer and seller interfaces. 
Built using the MERN stack with a focus on secure authentication and data handling.

✨ Key Features
Technology Stack: Built with React (frontend) and Node.js/Express.js (backend).
Database: Uses MongoDB for data persistence.
Customer Workflow: Users can create an ID, browse products, and place orders.
Seller Workflow: Dedicated seller side allows adding products, which immediately show on the user's page.
Authentication: Secure customer and seller login.

Category	 Technology
Frontend	 React, Prebuilt UI
Backend 	 Node.js, Express.js
Database	 MongoDB

Role	          User ID (Email)          	Password
Customer	      dummy@gmail.com	          123456
Seller/Admin	  admin@gmail.com	          anjali123


🚀 Getting Started
Prerequisites
Node.js (LTS recommended)
MongoDB (running instance or an Atlas connection string)
Git

i)    Clone the repository:
      git clone [YOUR_REPOSITORY_URL]
      cd "Grocery App"


ii)   Install Dependencies:

      # Install server dependencies (navigate to your server folder)
         cd server
         npm install

      # Install client dependencies (navigate to your client folder)
         cd ../client
         npm install


 Configuration
 # Database Connection
MONGODB_URI = "mongodb+srv://<user>:<password>@<cluster-name>/grocery-db"
PORT = 4000
# Authentication Secrets
JWT_SECRET = "YOUR_SECURE_SECRET_KEY"
# Seller Credentials (Used for auth logic)
SELLER_EMAIL = admin@gmail.com
SELLER_PASSWORD = anjali123
# CLOUDINARY and other environment variables here
# ...


▶️ How to Run
npm run dev  # or your defined start script

The application will open in your browser, typically at http://localhost:5173.



🛍️ Workflow Guide
Adding Products (Seller Workflow)

Log in as the Seller (admin@gmail.com).
Navigate to the Add Product section.
Add product details.
The product is immediately visible on the customer's frontend page.


Viewing Orders
Customer: Orders placed will appear on the My Orders page.
Seller: Orders containing products you added will appear on the Orders page in the seller dashboard.

