const { Router } = require('express');
const db = require('../database');
const flash = require('express-flash');
const { Console } = require('console');

const router = Router();
router.use(flash());

router.use((request, response, next) => {
    console.log('Request made to /Cart route');
    next();
});

router.post("/add-to-cart", async (request, response) => {
    const item = request.body.item;
    const userID = request.body.user;
    
    // to check if the userid exists and status of cart is "In Cart"
    const checkCartExistsQuery = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;
    
    try {

        const checkCartExistsExecute = await db.promise().query(checkCartExistsQuery);
        const ifexists = checkCartExistsExecute[0][0].count;

        //if there is no active cart for that user
        if (ifexists === 0){

            //if no cart exists for user
            const InsertCart = `INSERT INTO FoodOrderSys.cartTable (cart_userID, cart_status) VALUES ('${userID}', "In Cart")`;
    
            await db.promise().query(InsertCart);

            // const getCartID = `SELECT * FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

            const ResultCartID = await db.promise().query(checkCartExistsQuery);
            const cartID = ResultCartID[0][0].cartID;

            //to insert items into cartItemsTable
            const InsertItems = `INSERT INTO FoodOrderSys.cartItemsTable (cartID, cart_menuID, cheese_level, sauce_level, meat_level, spice_level) VALUES ('${cartID}', '${item.itemID}', '${item.cheese}', '${item.sauce}', '${item.meat}', '${item.spice}')`;

            await db.promise().query(InsertItems);
            return response.status(200).json({ message: "Added to your cart" });

        }
        //if there is a active cart for that user
        else{
            const ExistingcartID = checkCartExistsExecute[0][0].cartID;

            //check if the item already exists in the user's cart, if so then increase the quantiy
            const checkItemQuery = `SELECT *, COUNT(*) AS count FROM FoodOrderSys.cartItemsTable WHERE cartID = '${ExistingcartID}' AND cart_menuID = '${item.itemID}' AND cheese_level = '${item.cheese}' AND sauce_level = '${item.sauce}' AND meat_level = '${item.meat}' AND spice_level = '${item.spice}'`;

            const checkItemExecute = await db.promise().query(checkItemQuery);
            const checkItemExists = checkItemExecute[0][0].count;

            if(checkItemExists > 0){
                console.log(checkItemExecute[0][0]);
                const IncQuan = `UPDATE FoodOrderSys.cartItemsTable
                    SET quantity = quantity + 1
                    WHERE cart_itemID = '${checkItemExecute[0][0].cart_itemID}'`;

                await db.promise().query(IncQuan);
            }else{
                const InsertItemsToOldCart = `INSERT INTO FoodOrderSys.cartItemsTable (cartID, cart_menuID, cheese_level, sauce_level, meat_level, spice_level) VALUES ('${ExistingcartID}', '${item.itemID}', '${item.cheese}', '${item.sauce}', '${item.meat}', '${item.spice}')`;

                await db.promise().query(InsertItemsToOldCart);
            }

            // response.flash("success", "Added to cart");
            return response.status(200).json({ message: "Added to your cart" });
        }

    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/get-cart-items/:query', async (request, response) => {
    const userID = request.params.query;
    const query_cartID = `SELECT COUNT(*) AS count, cartID FROM FoodOrderSys.cartTable WHERE cart_userID = '${userID}' AND cart_status = "In Cart"`;

    try{
        const cartID = await db.promise().query(query_cartID);
        if (cartID[0][0].count === 0){
            return response.status(200).json({Message: "Your cart is empty"});
        }
        else{
            const getItemsQuery = `SELECT C.*, M.* FROM cartItemsTable C, MenuTable M WHERE C.cartID = '${cartID[0][0].cartID}' and C.cart_menuID = M.menu_id`;
            const getItems = await db.promise().query(getItemsQuery);
            response.status(200).send(getItems[0]);
        }
    }catch(error){
        return response.status(505).json({Message: "Internal server error"});
    }
});

router.post("/dec-quantity", async (request, response) => {
    const itemID = request.body.itemID;
    
    // decreasing the quantity with cart_itemID 
    const decQuan = `UPDATE FoodOrderSys.cartItemsTable
                    SET quantity = quantity - 1
                    WHERE cart_itemID = '${itemID}';`;
    
    try {
        await db.promise().query(decQuan);
        return response.status(200).json({success: "Yes"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/Inc-quantity", async (request, response) => {
    const itemID = request.body.itemID;
    
    // increasing the quantity with cart_itemID 
    const IncQuan = `UPDATE FoodOrderSys.cartItemsTable
                    SET quantity = quantity + 1
                    WHERE cart_itemID = '${itemID}';`;
    
    try {
        await db.promise().query(IncQuan);
        return response.status(200).json({success: "Yes"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/remove-from-cart", async (request, response) => {
    const itemID = request.body.itemID;
    const itemName = request.body.name;
    
    // removing item from cart using the cart_itemID
    const removeItem = `DELETE FROM FoodOrderSys.cartItemsTable WHERE cart_itemID = '${itemID}'`;
    
    try {
        await db.promise().query(removeItem);
        return response.status(200).json({ message: `Removed '${itemName}' from your cart`, success: "Yes"});
    } catch (error) {
        console.log(error);
        return response.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
