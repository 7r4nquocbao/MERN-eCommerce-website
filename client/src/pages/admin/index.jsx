import React, { useEffect, useState } from 'react';
import Filebase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, deleteProduct } from '../../slices/product-slice';
import './index.scss';

function Admin({ setActionProduct }) {
    const productList = useSelector(state => state.products);
    const dispatch = useDispatch();
    const [addNew, setAddNew] = useState(false);
    const [product, setProduct] = useState({
        name: '',
        price: '',
        thumbnail: null,
        sale: '',
        stock: '',
        images: [],
        idCategory: 'BeautyGirl',
        idBrand: 'BeautyGirl',   
    });

    const clearForm = () => {
        setProduct({
            name: '',
            price: '',
            thumbnail: null,
            sale: '',
            stock: '',
            images: [],
            idCategory: 'BeautyGirl',
            idBrand: 'BeautyGirl', 
        })
    } 

    const handleAddProduct = async (e) => {
        e.preventDefault();
        dispatch(createProduct(product));
        setActionProduct(true);
        clearForm();
    }

    const handleDeleteProduct = async (e, id) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        setActionProduct(true);
    }

    const showAddNew = () => {
        if(addNew) {
            return(
                <div className="col-4 pt-3">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Product name</label>
                            <input type="text" className="form-control" id="name" name="name"
                                value={product.name}
                                onChange={(e) => setProduct({...product, name: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Product price</label>
                            <input type="number" className="form-control" id="price" name="price"
                                value={product.price}
                                onChange={(e) => setProduct({...product, price: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="sale">Sale</label>
                            <input type="number" className="form-control" id="sale" name="sale"
                                value={product.sale}
                                onChange={(e) => setProduct({...product, sale: e.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <Filebase
                                type="file"
                                multiple={false}
                                onDone={(data) => setProduct({...product, thumbnail: data.base64})}                   
                            />
                        </div>
                        
                        {/* images */}
                        <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input type="number" className="form-control" id="stock" name="stock"
                                value={product.stock}
                                onChange={(e) => setProduct({...product, stock: e.target.value})}
                            />
                        </div>
                        <button onClick={handleAddProduct} className="btn btn-secondary btn-lg btn-block">Submit</button>
                    </form>
                </div>                
            )
        }
        return;
    }

    const displayProducts = (list) => {
        return (
            <div className="row">
                {
                    list && list.map((item, index) => {
                        return (
                            <div key={index} className={addNew ? "col-4 mt-2" : "col-3 mt-5"}>
                                <div className="card" style={{width: '15rem'}}>
                                    <img src={item.thumbnail} className="card-img-top" alt='img'/>
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(item.price)}</p>

                                        <div className="d-flex justify-content-around">
                                            <button onClick={() => setProduct(item)}  className="btn btn-success btn-action">Update</button>
                                            <button onClick={(e, id) => handleDeleteProduct(e, item._id)} className="btn btn-danger btn-action">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
        )        
    }

    return (
        <div>
            <div className="row">
                <div className="col">
                    <button className={addNew ? "btn btn-outline-secondary btn-lg btn-block mt-3 mb-3" : "btn btn-light btn-lg btn-block mt-3 mb-3"} onClick={() => setAddNew(!addNew)}>
                        {
                            addNew ? <h1>Close</h1> : <h1>Open</h1>
                        }                    
                    </button>
                </div>
                <div className="col-8 mt-3 mb-3">
                    {
                        addNew ? <h1>Products</h1> : <h1></h1>
                    } 
                </div>
            </div>
            <div className="row">
                {showAddNew()}        
                <div className="col">                    
                    {displayProducts(productList)}
                </div>
            </div>
        </div>
    );
}

export default Admin;