const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const path = require('path');
const ejs = require('ejs');
const { log } = require("console");
const { text } = require("body-parser");

const bcrypt = require('bcrypt');

//rest object
//create an instance of an Express application using Node.js
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
//including your CSS files.
// app.use(express.static(path.join(__dirname, 'pubilc')));

//middlewares
// Enables Cross-Origin Resource Sharing for your server.
app.use(cors());
// Parses JSON data in incoming requests.
app.use(express.json());
// Logs HTTP requests in a developer-friendly format.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));


const uri = "mongodb+srv://vk:Bhavani1201@cluster0.kslyn8z.mongodb.net/libraryManagement";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`Connected to MongoDB Successfully ${conn.connection.host} `.bgGreen.white);
    }
    catch (err) {
        console.log(`Error connecting to MongoDB`.bgWhite.re);
    }
}
connectDB();

//
// SCHEMAS
//
const usersSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    }
    ,
    password:{
        type: String,
        required: true
    }
    , role: {
        type: Number,
        default: 0
    }
}, { timeStamps: true });




const users = new mongoose.model("users", usersSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email: email });
        if (!user) {
            console.log("User not found");
            res.redirect('/register');
            
        }

        if (password === user.password) {
            console.log("Login successful");
            res.redirect('/library');
        } else {
            console.log("Incorrect password");
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            res.send("Email already registered");
            res.redirect('/login');
        }
        else{
            try {
                const newUser = new users({
                    email,
                    password
                });
                await newUser.save();
                console.log("New user created");
                res.redirect("/library");
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: "Database save error" });
            }
        }
        
            
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server error" });
    }
});

app.get('/register', async (req, res) => {
    res.render("register");

});
app.get('/login', async (req, res) => {
    res.render("login");
});

app.get("/library", async (req, res) => {
    try {
        const userid = req.query.userid;
        const user = await users.findOne({ _id: userid });
        console.log(user)
        res.render("library",
            {
                user
            });
    }
    catch (err) {
        console.log(err);
    }

});

app.get("/thankyou", async (req, res) => {
    try {
        res.render("thankyou");
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(9002, () => {
    console.log("BE started at port 9002");
})
