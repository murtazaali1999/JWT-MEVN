//LIBRARY IMPORTS
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const db = require('./db.json');

//FILE IMPORTS
const middle_jwt = require("./middleware/jwt");

//CONFIGS & DRIVEN
const app = express();
dotenv.config({ path: "./config.env" }); //config.env
app.use(cors()); //cors
app.use(express.json());

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

app.post('/login', (req, res) => {

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

        //if found then sign token
        jwt.sign(found, process.env.JWT_SECRET, { expiresIn: "1m" }, (error, token) => {
            console.log(token);
            return res.status(200)
                .json({ message: "Welcome to Jurrasic World", token: token })
                .cookie("token", token, { httpOnly: true })
        })


    } catch (error) {
        console.log(error)
    }
})

app.get("/get-all-user-names", middle_jwt.verifyJsonWebToken, (req, res) => {
    console.log(req.token);

    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json({ message: "token not verified" });
        } else {
            res.status(200).json({ message: "SUCCESSFUL", data: data });
        }
    })



    return res.status(200).json({ users: db });
})