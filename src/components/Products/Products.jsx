import React from 'react'
import './products.css'
import {useState, useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';




function Products({category, search, pageNumber}) {
    const [shopProducts, setShopProducts] = useState([]);
    const [initialShopProducts, setInitialShopProducts] = useState([]);
    const [cat, setCat] = useState([]);
    let categoryId;
    // console.log(category + ' ' + search.length);
    useEffect(() => {
      const getCategories = async () =>{
        try {
          const result = await axios.get('http://localhost:3000/categories');
          setCat(result.data);
        } catch (err) {
          console.log(err)
        }
      }
      getCategories();
        setInitialShopProducts(JSON.parse(sessionStorage.getItem('preloadedItems')));
    }, [])

    useEffect(()=>{
      let test = search.split('');
      let queryString = '';
      for(let i=0; i<test.length;i++){
        if(test[i] === ' '){
          test[i] = '+';
          queryString += test[i];
        }
        else{
          queryString += test[i];
        }
      }
      if(category !== 'none'){
        for(let i=0; i<cat.length;i++){
          if(category === cat[i].name){
            categoryId = cat[i].id;
            break;
          }
          else{
            continue;
          }
        }
      }else{
        categoryId = 0;
      }
      let id = categoryId;
      const getProducts = async () => {
        try{
          if(id !== 0){
          const result = await axios.get('http://localhost:3000/products/category/'+id);
          setShopProducts(result.data);
          }
          else if(queryString.length !== 0){
            const result = await axios.get('http://localhost:3000/products/search/'+queryString);
            setShopProducts(result.data);
          }else{
        const result = await axios.get('http://localhost:3000/product/page/'+pageNumber);
        setShopProducts(result.data);
          }
        }catch(err){
          console.log(err);
        }
      }
      getProducts();
    }, [category, search, pageNumber]);
    console.log(initialShopProducts);
    const renderInitialItems = () =>(
      <div className="products">
      {initialShopProducts.map((item) =>(
      <Link to={'/store/product/' + item.id}>
      <ul className='product' id='product'>
        <li className='brand'>Air Jordan 1 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg></li>
        <li><img src = {item?.images?.[0]?.src}/></li>
        <div className='itemDesc'>
          <div className="itemName">
            <li className='subtitle'>Men's Shoes</li>
            <li className='title'>{item.name}</li>
          </div>
          <li className='price'>${item.price}</li>
        </div>
      </ul>
    </Link>
     ))}</div>  
    )
    
    const renderItems = () =>(
      <div className="products">
            {shopProducts.map(item =>(
              <Link to={'/store/product/' + item.id}>
                <ul className='product' id='product'>
                  <li className='brand'>Air Jordan 1 <button></button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0"/></svg></li>
                  <li><img src = {item?.images?.[0]?.src}/></li>
                  <div className='itemDesc'>
                    <div className="itemName">
                      <li className='subtitle'>Men's Shoes</li>
                      <li className='title'>{item.name}</li>
                    </div>
                    <li className='price'>${item.price}</li>
                  </div>
                </ul>
              </Link>
            ))}
        </div>
    )

    return (
    <div>{
      category === 'none' && search.length === 0
        ? renderInitialItems()
        : renderItems()
    }</div>
  )
}

export default Products