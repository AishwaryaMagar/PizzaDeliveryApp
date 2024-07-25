import React, {useEffect, useState} from 'react'
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import AdminLogin from './Pages/AdminLogin';
import AdminPanel from './Pages/AdminPanel';
import AdminUsers from './Pages/AdminUsers';
import AdminMenu from './Pages/AdminMenu';
import AdminOrders from './Pages/AdminOrders';
import AdminOrderDetails from './Pages/AdminOrderDetails';
import AddMenuItem from './Pages/AddMenuItem';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ProfilePage from './Pages/ProfilePage';
import Contact from './Pages/Contact';
import Signup from './Pages/Signup';
import Menu from './Pages/Menu';
import Cart from './Pages/Cart';
import CheckOut from './Pages/Checkout';
import About from './Pages/About';
import SearchMenu from './Pages/searchmenu';
import OrderConfirm from './Pages/OrderConfirm';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Footer from './Components/Footer';
import Teamlead from './Pages/Teamlead';
import Frontendlead from './Pages/Frontendlead';
import Backendlead from './Pages/Backendlead';
import Scrummaster from './Pages/Scrummaster';
import Github from './Pages/Github';
import NotFound from './Pages/NotFound404';

function App() {

  const [auth, setAuth] = useState(false);
  const [userID, setUserID] = useState();

  const lookForAuth = async () => {
    try{
      const urlCurrentUser = "/api/UserController/CurrentUser";
      const response = await axios.get(process.env.REACT_APP_API_URL.concat(urlCurrentUser), {withCredentials: true});
      if (response.data.Status === "Success"){
        //if the token is created (i.e., user is autherised then set auth to true)
        setAuth(true);
        setUserID(response.data.userID);
      }
    }catch(err){
      console.log(err);
    } 
  };

  useEffect(() => {
    lookForAuth();
  }, []);

  return (
    <div className="App" data-testid = "app">
      <Router>
        <Routes>
          <Route path='/' element={<> <Navbar /> <Home /> <Footer /> </>} />

          <Route path='/admin' element={<> <AdminLogin /> </>} />
          <Route path='/adminpanel/:id' element={<> <AdminPanel /> </>}/>
          <Route path='/adminusers' element={<> <AdminUsers /> </>}/>
          <Route path='/adminmenu' element={<> <AdminMenu /> </>}/>
          <Route path='/adminorders' element={<> <AdminOrders /> </>}/>
          <Route path='/order-details/:orderID' element={<> <AdminOrderDetails /> </>} />
          <Route path='/addmenuitem' element={<> <AddMenuItem /> </>} />

          <Route path='/menu' element={<> <Navbar /> <Menu /> <Footer /> </>} />
          <Route path='/contact' element={<> <Navbar /> <Contact /> <Footer /> </>} />
          <Route path='/about' element={<> <Navbar /> <About /> <Footer /> </>}/>
          <Route path='/signup' element={<> <Navbar /> <Signup /> <Footer /> </>}/>

          <Route 
            path='/login' 
            element={auth ? <> <Navigate to={`/profile/${userID}`}/> </> : <><Navbar /> <Login /> <Footer/></>}
          />

          <Route path='/forgotpassword' element={<> <Navbar /> <ForgotPassword /> <Footer /> </>}/>
          
          <Route 
            path='/profile/:userID' 
            element={auth ? <><Navbar /><ProfilePage /><Footer /></> : <Navigate to='/login' />}
          />

          <Route path='/searchmenu/:searchTerm' element={<> <Navbar /> <SearchMenu /> <Footer /> </>}/>

          <Route path='/mycart/:userID' element={<> <Navbar /> <Cart /> <Footer /> </>}/>

          <Route path='/checkout/:userID' element={<> <Navbar /> <CheckOut /> <Footer /> </>}/>

          <Route 
            path='/orderconfirm/:CartID' 
            element={<> <Navbar /> <OrderConfirm /> <Footer /> </>}/>
            {/* element={auth ? <><Navbar /><OrderConfirm /><Footer /></> : <Navigate to='/not-found'/>}
          /> */}

          <Route path='/about/teamlead' element={<> <Navbar /> <Teamlead /> <Footer /> </>}/>
          <Route path='/about/frontendlead' element={<> <Navbar /> <Frontendlead /> <Footer /> </>}/>
          <Route path='/about/backendlead' element={<> <Navbar /> <Backendlead /> <Footer /> </>}/>
          <Route path='/about/github' element={<> <Navbar /> <Github /> <Footer /> </>}/>
          <Route path='/about/scrummaster' element={<> <Navbar /> <Scrummaster /> <Footer /> </>}/>
          
          <Route path='*' exact element={<NotFound />}/>
        </Routes>
      </Router>
    </div>

  );
}

export default App;
