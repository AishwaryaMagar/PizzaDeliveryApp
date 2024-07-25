import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/Checkout.css';
import Cash from '../Assests/cash.svg';
import Card from '../Assests/card.svg';

function CheckOut() {

  let { userID } = useParams();
  const [addressAdded, setAddressAdd] = useState();
  const [address, setAddress] = useState([]);
  const [Postaddress, setPostAddress] = useState({
    line1: "",
    line2: "",
    apt: "",
    zipcode: ""
  });

  const [selectedOption, setSelectedOption] = useState(null);
  const [AddressForm, isAddressForm] = useState(false);
  const [AddAddressButton, SetAddAddressButton] = useState(true);

  // To disable Place order button if address, payment method not selected and card details not added(if card) 
  const [selectedPayment, setForPayment] = useState(false);
  const [selectedAddress, setForAddress] = useState(false);
  const [addedCard, setaddedCard] = useState(false);

  const [CartID, setCartID] = useState(null);

  const [orderdetails, setorderdetails] = useState({
    address:"",
    paymentmethod: ""
  });

  const navigte = useNavigate();

  useEffect( () => {
    const fetchCartItems = async () => {
      try{
        const urlCartItems = `/api/OrderController/get-address/${userID}`;
        const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlCartItems), {withCredentials: true});
        if(res.data.Message == "No Address Added"){
            setAddressAdd(false);
        }else{
            setAddress(res.data);
        }        
      }catch(err){
        console.log(err);
      }
    }
    fetchCartItems()
  }, [])

  const handleInputChange = (e) => {
    setPostAddress(prev => ({...prev, [e.target.id]: e.target.value}));
  };

  const addAddress = async () => {
    try{
      const urladdress = `/api/OrderController/add-address`;
      const res = await axios.post(process.env.REACT_APP_API_URL.concat(urladdress), {userID, Postaddress}, {withCredentials: true});
      if(res.data.Message === "Added successfully"){
          window.location.reload();
      }else{
        toast.error("Try again");
      }        
    }catch(err){
      console.log(err);
    }
  };

  const ShowAddressForm = () => {
    isAddressForm(true);
    SetAddAddressButton(false);
  };

  const handleAddressSelection = (event) => {
    setorderdetails({
      ...orderdetails,
      address: event.target.value
    });
    // Address is selected
    setForAddress(true);
  };

  const handlePaymentOption = (event) => {
    const selectedValue = event.target.value;

    setSelectedOption(selectedValue);

    setorderdetails((prevOrderDetails) => {
      return {
        ...prevOrderDetails,
        paymentmethod: selectedValue,
      };
    });

    // Payment is selected
    setForPayment(true);

    //Enable Place order button if payment method is cash
    setaddedCard(selectedValue === 'cash');
  };

  const CardDetailsAdded = () => {
    setaddedCard(true);
    toast.success("Payment successful");
  };

  const PlaceOrderNow = async () => {
    try {
      const urladdress = `/api/OrderController/confirm-order`;
      const response = await axios.post(
        process.env.REACT_APP_API_URL.concat(urladdress),
        { userID, orderdetails },
        { withCredentials: true }
      );
      if (response.data.Message === "Added successfully") {
        setCartID(response.data.id);
        
        const url = `/orderconfirm/${response.data.id}`;

        toast.success("Order placed successfully");

        setTimeout(() => {
          navigte(url);
        }, 1500);
        
      } else {
        toast.error("Try again");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (  
    <div>
      <ToastContainer/>
    <div className='backgrey'> 
      <div className='address'>
        <h2><b>Shipping Address</b></h2>
        {AddAddressButton && (
          <button type='button' className="addAddressBtn" onClick={ShowAddressForm}>Add Address</button>
        )}
        {AddressForm && (
          <div>
          <form onSubmit={addAddress}>
            <div className='addressline'>
            <div>
              <label htmlFor='addressinput'>Address Line 1</label>
              <input type='text'id = 'line1' className='form-control' onChange={handleInputChange} required/>
            </div>
            <div>
              <label htmlFor='addressinput'>Address Line 2</label>
              <input type='text'id = 'line2' className='form-control' onChange={handleInputChange}/>
            </div>
            </div>
            <div className='aptzip'>
            <div>
              <label htmlFor='apt'>Apt. building landmark</label>
              <input type='text'id = 'apt' className='form-control' onChange={handleInputChange}/>
            </div>
            <div>
              <label htmlFor='addressinput'>Zipcode</label>
              <input type='text'id = 'zipcode' className='form-control' pattern="[0-9]{5}" onChange={handleInputChange} required/>
            </div>
            </div>
            <button type='submit' className='submitAddressBtn'>Submit</button>
          </form>  
        </div>
        )}

        {address.length === 0 ? (
          <div>
            <h1>Please add adress</h1>
          </div>
        ):(
          <div>
  <h2><b>Existing addresses</b></h2>
  <table className='table'>
    <tbody>
      {address.map((eachItem, index) => (
        <tr className='address-row' key={eachItem.addressID}>
          <td className='tdclass'>
            <input
              className='form-check-input mt-0 address-check'
              type="radio"
              value={eachItem.addressID}
              name='addresses'
              id={`address-${index}`}
              onChange={handleAddressSelection}
            />
          </td>
          <td className='tdclass2'>
            <p>{`${eachItem.line1}, ${eachItem.line2}, ${eachItem.apt}, ${eachItem.zipcode}`}</p>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        )}
      </div>

      <div className='payment'>
        <h2><b>Payment Method</b></h2>
        <div className='cardcash'>
        <input type="radio" id="cash" name = "paymenthmethod" value="cash" checked = {selectedOption === 'cash'} onChange={handlePaymentOption}/>
        <label htmlFor="cash"><img src={Cash} style={{width:50}}></img>Cash</label>
        </div>
        <div className='cardcash'>
        <input type="radio" id="card" name = "paymenthmethod" value="card" checked = {selectedOption === 'card'} onChange={handlePaymentOption}/>
        <label htmlFor="card"><img src={Card} style={{width:50}}></img>Card</label>
        </div>
        

        {selectedOption === 'card' && (
        <div>
          <h2><b>Enter Card Details</b></h2>
          <form className="form-group">
            <div className='carddet'>
              <div>
              <label htmlFor='cardNumber'>Card Number</label>
            <input type='text' id = 'cardNumber' className="form-control" required/>
            </div>
            <div>
            <label>Card Holder Name</label>
            <input type='text' id = 'CardHolderName' className="form-control" required/>

              </div>


            </div>
            <div className='cardnum'>
              <div>
              <label>CVV</label>
            <input type='text' id = 'CVV' className="form-control" required/>

              </div>
              <div>
              <label>Expiry Date</label>
            <input type='date' id = 'exp' className="form-control" required/>

              </div>



            </div>

            <button type = 'button' className="btn btn-dark" onClick={CardDetailsAdded} style={{marginTop:20,marginBottom: 20, marginLeft:460, width:400, height:50}}>Add</button>
          </form>
        </div>
      )}
      <button type = 'submit' className='btn btn-dark' onClick={PlaceOrderNow} style={{marginTop:10,marginBottom: 20, width:400, height:50}} disabled = {!selectedAddress || !selectedPayment || !addedCard}>Place order</button>
      </div>
      
    </div>
    </div>
  )
}

export default CheckOut;
