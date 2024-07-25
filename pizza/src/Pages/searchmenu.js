import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Menuitem from './Menuitem'


function SearchMenu() {
    let { searchTerm } = useParams();

    const [searchresults, setResult] = useState( [] );

    // const navigate = useNavigate();

    useEffect( () => {
        const fetchSearchResults = async () => {
          try{
            const urlHI = `/api/MenuController/searchBar/${searchTerm}`;
            const res = await axios.get(process.env.REACT_APP_API_URL.concat(urlHI));
            setResult(res.data);              
          }catch(err){
            console.log(err);
          }
        }
        fetchSearchResults();
      }, [searchTerm]);

  return (
    <div>
      <div className='container my-4' >
        <div className='row'>
          {searchresults.length === 0 ? (<p>No such items</p>) : (
          searchresults.map(eachItem => (
          <div className='col-md-4' key={eachItem.menu_id} >
            <Menuitem itemID = {eachItem.menu_id} name = {eachItem.name} price = {eachItem.price} image_url = {eachItem.image_url} description = {eachItem.description}></Menuitem>
          </div> 
          )))}
        </div>
      </div>
    </div>

  )
}

export default SearchMenu;