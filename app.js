//LIBRARY IMPORTS
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require('./db.json');
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");

//FILE IMPORTS
const middle_jwt = require("./middleware/jwt");

//CONFIGS & DRIVEN
const app = express();
dotenv.config({ path: "./config.env" }); //config.env
app.use(cors({ credentials: true, origin: "http://localhost:8080" })); //cors, crendentials and origin for cookies
app.use(express.json());
app.use(cookieParser());

//ROUTES


//PORT SETUP
const PORT = process.env.PORT || 4421;

//LOGS
if (process.env.NODE_ENV == "development") {
    //  app.use(morgan); //for logging if in development mode
}

//PORT LISTENING
app.listen(PORT, () => {
    console.log(`PORT STARTED AT ${process.env.PORT} ${process.env.NODE_ENV.toUpperCase()} MODE`);
})

app.get('/', (req, res) => {
    console.log("Sup");
    res.send("Hi");
})

app.post('/login', async (req, res) => {

    const { userName, password } = req.body;

    try {

        if (!userName || !password)
            return res.
                status(403)
                .send("email or password field is empty");

        //find user from DB
        const found = db.find((user) => user.userName == userName && user.password == password);

        //if not found
        if (found == [] || found == undefined) {
            return res.
                status(404)
                .json({ message: "user does not exist" });
        }

        //hashing creates a random string, 25 are the salting rounds, 
        //which also increases the time taken depending on the value
        const salting = await bcrypt.genSalt(25);

        //store the hashed-password in the database, during sign-up !!!!
        //compare the hashed password with the entered hashed password to login
        const hashedPassword = await bcrypt.hash(found.password, salting);
        await bcrypt.compare(found.password, hashedPassword);
        //compare the entered with hashed password

        //if found then sign token
        jwt.sign(found, process.env.JWT_SECRET, { expiresIn: "1m" }, (error, token) => {

            console.log(token);

            return res.status(200)
                .cookie("Bearer", `Bearer ${token}`, { httpOnly: true })
                .json({ message: "HMMM" })
        })


    } catch (error) {
        console.log(error)
    }
})

app.get("/get-all-users", middle_jwt.verifyJsonWebToken, (req, res) => {

    console.log(req.token);

    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "token not verified" });
        } else {
            return res.status(200).json({ message: "SUCCESSFUL", data: data, users: db });
        }
    })
})

app.get("/token", (req, res) => {
    console.log(req.cookies.Bearer);
})