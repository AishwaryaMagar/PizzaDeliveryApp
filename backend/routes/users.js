const { Router } = require('express');
const db = require('../database');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const router = Router();

router.use((request, response, next) => {
    console.log('Request made to /Users route');
    next();
});

router.use(cookieParser());

const verifyUser = (request, response, next) => {
    const token = request.cookies.token;
    if(!token){
        return response.status(200).json({message: 'Token needed!'});
    }else{
        jwt.verify(token, "OurPizzaCrazeApplicationTeam07Section04CSC848648", (err, decoded) => {
            if(err){
                return response.json({message: "Authentication Error!"});
            }else{
                request.username = decoded.username;
                request.userID = decoded.userID;
                next();
            }
        })
    }
}

router.get('/CurrentUser', verifyUser, async (request, response) => {
    return response.status(200).json({Status: "Success", userID: request.userID, username: request.username});
});

router.get('/GetUsers', async (request, response) => {
    const results = await db.promise().query('SELECT * FROM FoodOrderSys.LoginDetails');
    response.status(200).send(results[0]);
});

router.post("/PostUsers", async (request, response) => {
    const password = request.body.password;
    const phone = request.body.phone;
    const username = request.body.username;
    const email = request.body.email.toLowerCase();

    //to check if the email exists
    const checkEmail = `SELECT COUNT(*) AS count FROM FoodOrderSys.LoginDetails WHERE email = '${email}'`;
    //if new user, then insert the users data
    const q = `INSERT INTO FoodOrderSys.LoginDetails (password, phone, email, username) VALUES ('${password}', '${phone}', '${email}', '${username}')`;
    
    try {

        const countOfEmail = await db.promise().query(checkEmail);
        const countNum = countOfEmail[0][0].count;

        //if the email given by the user does not exist in the database then insert
        if (countNum === 0){

            const insertUser = await db.promise().query(q);
            response.status(200).json({ message: "You have registered successfully", result: "Success" });

        }
        //if email is already there in the database then say so to the user
        else{
            response.status(200).json({ message: "Email is already used.", result: "Error"  });
            return;
        }

    } catch (error) {
        response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/login',async (request, response) => {
    
    const email = request.body.email.toLowerCase(); 
    const password = request.body.password;

    //query to return the row with correct email and pass from db
    const query = `SELECT *, COUNT(*) as count FROM FoodOrderSys.LoginDetails WHERE email = '${email}' AND password = '${password}'`;
    //query to update the loggenIN row for the loggedIn user
    const update = `UPDATE FoodOrderSys.LoginDetails SET loggedIn = 1 WHERE email = '${email}'`;

        try
        {    
            const validation = await db.promise().query(query);
            const emailExists = validation[0][0].count;

            if(emailExists > 0) 
            {
                // query to update the login status of a user 
                await db.promise().query(update);

                //cookie-token
                const username = validation[0][0].username;
                const userID = validation[0][0].userID;
                const token = jwt.sign({userID, username}, "OurPizzaCrazeApplicationTeam07Section04CSC848648", {expiresIn : '1d'});
                response.cookie('token', token);

                return response.status(200).json({message: "Login successful"});
            }
            else
            {
                return response.status(200).json({Failmessage: "Either Email or Password is invalid"});
            }

        }
        catch (error)
        {
            console.log(error);
            response.status(500).json({ error: "Internal Server Error" });
        }            
});  

router.get("/profile/:userID", async (request, response) => {
    const user = request.params.userID;
    //user details
    const userDetails = `SELECT * FROM FoodOrderSys.LoginDetails WHERE userID = '${user}'`;

    //user address
    const userAddress = `SELECT * FROM FoodOrderSys.AddressBook WHERE address_userID = '${user}'`;

    //orders
    // const OrderTable = `SELECT * FROM FoodOrderSys.OrderTable WHERE order_userID = '${user}'`;

    try{
        const Userresults = await db.promise().query(userDetails);
        const addressResults = await db.promise().query(userAddress);
        // const Orders = await db.promise().query(OrderTable);

        // const ToGetorderItems = `SELECT * FROM FoodOrderSys.cartItemsTable WHERE cartID IN (SELECT cartID_order FROM FoodOrderSys.OrderTable WHERE order_userID = '${user}')`;

        const ToGetorderItems = `SELECT 
                                    cartItemsTable.*, 
                                    MenuTable.name as MenuName, 
                                    MenuTable.menu_id as menuID, 
                                    OrderTable.*
                                FROM 
                                    FoodOrderSys.cartItemsTable 
                                JOIN 
                                    FoodOrderSys.MenuTable ON cartItemsTable.cart_menuID = MenuTable.menu_ID
                                JOIN 
                                    FoodOrderSys.OrderTable ON cartItemsTable.cartID = OrderTable.cartID_order
                                WHERE 
                                    OrderTable.order_userID = '${user}'
                                ORDER BY 
                                    OrderTable.order_date`;

        const orderItems = await db.promise().query(ToGetorderItems);

        response.status(200).send({user: Userresults[0][0], address: addressResults[0], orderItems: orderItems[0]});
    }catch (error){
        console.log(error);
    }
    
});

router.post("/forgot-password", async (request, response) => {
    const email = request.body.email.toLowerCase();
    //to check if the email exists
    const query = `SELECT COUNT(*) AS count FROM FoodOrderSys.LoginDetails WHERE email = '${email}'`;
    const checkEmail = await db.promise().query(query);
    //if new user, then insert the users data
    const newPassword = request.body.password;
    const update = `UPDATE FoodOrderSys.LoginDetails SET password = '${newPassword}' WHERE email = '${email}'`;
    console.log(checkEmail[0][0].count);
    try {
        if(checkEmail[0][0].count >= 1)
        {
            
            await db.promise().query(update);
            return response.status(200).json({message: "Valid Email"});
        }
        else 
            return response.status(200).json({Failmessage: "Email is invalid"});
        }
    catch (error) {
        console.log(error);
        response.status(500).json({ error: "Internal Server Error" });
        
    }
});


router.get("/logout", async (request, response) => {
    console.log("Executing");
    response.clearCookie('token');
    return response.json({Message: "Logged out successfully"});
});

module.exports = router;
