// ==================== Importing Dependencies ====================

const port = 4000; // defining port where our express server will be running
const express = require("express");  // importing express dependecy 
const app = express(); // using express we create our app instance
const mongoose = require("mongoose") ;// initialize mongoose package
const jwt = require("jsonwebtoken");// initilize json web token
const multer = require("multer");// initilize multer
const path = require ("path"); //include path from the express server, using this path we get access to our backend directory in our express app
const cors = require("cors");
const { type } = require("os");
const { error } = require("console");

require('dotenv').config();


// ==================== Middleware Setup ====================

app.use(express.json()); // with the help of this express.json, whatever request we get from cors, that will be automatically passed through json
app.use(cors()); // Allows frontend (running on different port) to connect with backend




// ==================== MongoDB Connection ====================
// initilize database, gotta create mongo db atlas database

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas"); 
  })
  .catch((error) => {
    console.log("❌ Failed to connect to MongoDB Atlas:", error);
  });




// ==================== Basic API Endpoint ====================

app.get("/",(req,res)=>{
    res.send("Express app is running");
})



// ==================== Image Upload Setup using Multer ====================

// Setting up storage engine for multer to store images in /upload/images folder
const storage = multer.diskStorage({
    destination: './upload/images', // Folder to save uploaded images
    filename: (req,file,cb)=>{ // Rename the file: product_1688832849123.jpg
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({storage:storage}) // Initialize multer with defined storage



// ==================== Static Files Endpoint ====================

// e.g., http://localhost:4000/images/product_123456.jpg
app.use('/images',express.static('upload/images')) //  static endpoint

// ==================== Upload Endpoint ====================

// To upload new images in out Upload/images folder
// POST endpoint to handle image uploads from the frontend
// Expects a single file under field name 'product'

app.post("/upload",upload.single('product'),(req,res)=>{ // to upload any image we use this endpoint
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}` // Send back the image URL
    })
})





// =============== Schema for products in mongoDB =================

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required: true
   },
   new_price:{
    type:Number,
    required:true
   },
   old_price:{
        type:Number,
        required:true
   },
   date:{
    type:Date,
    default:Date.now
   },
   available:{
     type:Boolean,
     default:true
   },
})

// ================= API endpoint for INSERTING a Product =================    

app.post('/addproduct', async (req,res)=> {

    // req = Request → everything the client (frontend/Postman) sends to the server
    // res = Response → what the server sends back to the client

    let products = await Product.find({}); // find all products in the database and put them in this array
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1); //only last product in array 
        let last_product = last_product_array[0]; 
        id = last_product.id+1;
    }else{
        id = 1;
    }

    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });

    console.log(product);
    await product.save(); // product saved in mongoDB database
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    }) 
})


// ================= API for DELETING Products =================

app.post('/deleteproduct', async (req,res) =>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

// ================= API Endpoint for GETTING our products =================

app.get('/getproduct', async (req,res) => {

    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);

})

// ================= Schema for USER MODEL =================

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})


// ================= API Endpoint for registering the user =================

app.post('/signup', async (req,res)=>{

    let check = await Users.findOne({email:req.body.email}); 

    if(check){
        return res.status(400).json({success:false, errors:"existing user found with same email ID"});
    }

    let cart = {}; // empty object

    for(let i = 0; i<300; i++){ // create an empty cart
        cart[i] = 0;

    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    }) // user created 

    //save the user into database now

    await user.save();

    // use jwt authentication

    const data = { // create token using data object where we have user key and in this user key we have one obj with id and user id
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom'); // token generated using jwt sign method and secret_ecom so token isnt redable

    res.json({success:true,token})

})

// ==================== Endpoint for user login ====================


app.post('/login',async (req,res) =>{

    let user = await Users.findOne({email:req.body.email}); 
    if(user){
        const passCompare = req.body.password === user.password; //true or false in passCompare

        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true, token});
        }else{
            res.json({success:false, error:"Wrong Password"});
        }
    }else{
        res.json({success:false, error:"Wrong Email ID"});
    }

})

// ==================== creating endpoint for new collection data ====================

app.get('/newcollections', async (req,res) => {
 
    let products = await Product.find({}); // stored all Product
    let newcollection = products.slice(1).slice(-8); // we get recently added 8 products
    console.log("NewCollections Fetched");
    res.send(newcollection);

})

// ==================== creating endpoint for popular in women ====================

app.get('/popularinwomen', async (req,res)=>{

    let products = await Product.find({category:"women"})
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
    
})


// ==================== Creating middleware to fetch user ====================


    const fetchUser = async (req,res,next)=>{ // like konsa user accessing which user cart
        
        const token = req.header('auth-token'); 
        if(!token){
            res.status(401).send({errors:"Please authenticate using valid token"});
        }else{
            try{
                const data = jwt.verify(token,'secret_ecom'); //using jwt library .verify function
                req.user = data.user; // decode token
                next();
            }catch(error){
                res.status(401).send({errors:"please authenticate using a valid token"});
            }
        }

    }


// ==================== creating endpoint for adding products in cart data ====================

app.post('/addtocart',fetchUser, async (req,res) => {
    
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id: req.user.id}); //entire id will be stored in the userData
    userData.cartData[req.body.itemId] +=1;

    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});

    res.send("Added");

})

// ==================== creating endpoint for removing products in cart data ====================

app.post('/removefromcart', fetchUser, async (req,res) => { 

    console.log("removed",req.body.itemId);

    let userData = await Users.findOne({_id: req.user.id}); //entire id will be stored in the userData

    if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -=1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed")

})


// ==================== get cart ====================

app.post('/getcart', fetchUser, async (req,res) => { 

    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id}); // we get using the middle ware
    res.json(userData.cartData);

})


 
// ==================== Start the Server ====================

app.listen(port,(error)=>{
    if(!error){
        console.log("Sever Running on Port:"+port);
    }else{
        console.log("Error:"+error);
    }
});
