import { useState } from 'react';

import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg';
const AddProduct = () => {
    const [image,setImage] =useState(false);
    const [productDetails,setProductDetails] =useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:"",

    });
    const addProduct= async()=>{
console.log(productDetails);
     let reponseData;
     let product=productDetails;
     let formData= new FormData();
     formData.append('product',image);
     await fetch('http://localhost:4000/upload',{
        method:'post',
        headers:{
            Accept:'application/json',
        },
        body:formData,
     }).then((resp)=>resp.json()).then((data)=>{reponseData=data});
    if(reponseData.success){
        product.image=reponseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-type':'application/json',
            },
            body:JSON.stringify(product),
        }).then((resp)=>resp.json()).then((data)=>{
            data.success?alert('Product Added'):alert('failed')
        })
        
    }
    }

    const changeHandler=(e)=>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const imageHandler=(e)=>{
setImage(e.target.files[0]);
    }
    return <div className='add-product'>
        <div className="addproduct-itemfiled">
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder='Type here' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfiled">
                <p>Price</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
            </div>

            <div className="addproduct-itemfiled">
                <p>Offer Price</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
            </div>
            </div>

    
            <div className="addproduct-itemfiled">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="Handicraft">Handicraft</option>
                    <option value="Toys">Toys</option>
                    <option value="Art">Art</option>
                    <option value="Chappals">Chappals</option>
                    <option value="Koudi">Koudi</option>



                </select>
            </div>

            <div className="addproduct-itemfiled">
                <label htmlFor='file-input'>
                    <img src={image?URL.createObjectURL(image):upload_area } className='add-product-thubnail-img' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />

            </div>
            <button onClick={()=>addProduct()} className='add-product-btn'>Add </button>
    </div>;
};

export default AddProduct;
