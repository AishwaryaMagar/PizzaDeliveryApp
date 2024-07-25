const { Router } = require('express');
const db = require('../database');
const flash = require('express-flash');
const { TwitterApi } = require('twitter-api-v2');
const {path} = require('path');

const router = Router();
router.use(flash());

router.use((request, response, next) => {
    console.log('Request made to /Order route');
    next();
});

router.get('/get-address/:query', async (request, response) => {
    const userID = request.params.query;
    const address = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.AddressBook WHERE address_userID = '${userID}' GROUP BY addressID`;

    try{
        const addressResult = await db.promise().query(address);
        if (addressResult[0][0].count === 0){
            return response.status(200).json({Message: "No Address Added"});
        }else{
            return response.status(200).json(addressResult[0]);
        }
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
});

router.post("/add-address", async (request, response) => {
    const address = request.body.Postaddress;
    const userID = request.body.userID;
    
    // Adding address to the table
    const addAddress = `INSERT INTO FoodOrderSys.AddressBook (address_userID, line1, line2, apt, zipcode) VALUES ('${userID}', '${address.line1}', '${address.line2}', '${address.apt}', '${address.zipcode}')`;
    
    try {
        await db.promise().query(addAddress);
        return response.status(200).json({Message: "Added successfully"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/confirm-order", async (request, response) => {
    const addressID = request.body.orderdetails.address;
    const paymethod = request.body.orderdetails.paymentmethod;
    const userID = request.body.userID;
    
    // get the cartID to add to the orderTable
    const getCartID = `SELECT cartID FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

    //update cart_status to "Ordered" once order is confirmed
    const cartStatusToOrdered = `UPDATE FoodOrderSys.cartTable SET cart_status = 'Ordered' WHERE cart_userID = '${userID}'`;
    
    try {
        const Q_cartID = await db.promise().query(getCartID);

        //Insert the order details to orderTable
        const InsertOrderDetails = `INSERT INTO FoodOrderSys.OrderTable (order_userID, order_addressID, paymethod, cartID_order) VALUES ('${userID}', '${addressID}', '${paymethod}', '${Q_cartID[0][0].cartID}');`;

        const getOrderID = `SELECT * FROM FoodOrderSys.OrderTable WHERE cartID_order = '${Q_cartID[0][0].cartID}'`;

        await db.promise().query(InsertOrderDetails);
        const querygetOrderID = await db.promise().query(getOrderID);
        await db.promise().query(cartStatusToOrdered);

        const cartID = querygetOrderID[0][0].cartID_order;
        console.log(cartID);

        response.status(200).json({id: cartID, Message: "Added successfully"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get-orders/:userID', async (request, response) => {
    const userID = request.params.userID;

    const getOrdersQuery = `
        SELECT * 
        FROM FoodOrderSys.OrderTable 
        WHERE order_userID = '${userID}'
        ORDER BY order_date DESC;
    `;

    try {
        const orders = await db.promise().query(getOrdersQuery);
        return response.status(200).json(orders[0]);
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get-ordered-items/:CartID', async (request, response) => {
    const CartID = request.params.CartID;
    const query_cartID = `SELECT 
                                MenuTable.menu_id as MenuID,
                                MenuTable.name as itemName,
                                cartItemsTable.quantity as quantity
                            FROM 
                                FoodOrderSys.cartItemsTable 
                            JOIN
                                FoodOrderSys.MenuTable ON cartItemsTable.cart_menuID = MenuTable.menu_id
                            WHERE 
                                cartItemsTable.cartID = '${CartID}' GROUP BY cart_menuID`;

    try{
        const cartID = await db.promise().query(query_cartID);
        return response.status(200).json({items: cartID[0], Message: "Here you Go!"})
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
});

router.post("/tweet-order", async (request, response) => {
    const menuID = request.body.MenuID;
    const menuName = request.body.itemName;

    const client = new TwitterApi({
        appKey: "ABhMRzAcyrNSVzeefOtxOcmwa",
        appSecret: "dpfCohIMk8cC2jr2oz7BREIkj8W2ekO7eHqxxWhatPe9G5Glr5",
        accessToken: "1729735088072757248-PpcAKarhBmj1vx0NBjBpJGRga148hC",
        accessSecret: "AEE45u6OygnhwzxRnwHJokDj0Oc3n0vPlJ3IvJqgkylyM",
    });
    
    const rwClient = client.readOnly; 

    const pathQuery = `SELECT poster FROM FoodOrderSys.MenuTable WHERE MenuTable.menu_id = '${menuID}'`;

    try { 

        const pathResult = await db.promise().query(pathQuery);
  
        const imagePath = __dirname + pathResult[0][0].poster;
        const TweetMessage = `Hi friends! 🌟 Just tried the '${menuName}' and it was absolutely delicious. 🍕💖 Made my day special! 😊 #Foodie #SpecialMoment`;

        const mediaId = await rwClient.v1.uploadMedia(imagePath);

        await rwClient.v2.tweet({ 
            text:  TweetMessage, 
            media: { media_ids: [mediaId] }, 
        }); 
        return response.status(200).json({Message: "Hurrah!! You just tweetted🍕"})

    } catch (error) { 
        return response.status(505).json({Message: "May be you should try again"})
    } 
});

module.exports = router;