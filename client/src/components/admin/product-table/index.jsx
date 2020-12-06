import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { deleteProduct, fetchProductData } from '../../../slices/product-slice';
import './style.scss';

function ProductTable(props) {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [actionProduct, setActionProduct] = useState(false);
    const productList = useSelector(state => state.products);
    const itemOnPage = 10;
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        console.log("get data...")
        dispatch(fetchProductData());
        setActionProduct(false);
    }, [actionProduct, dispatch]);

    const handleDeleteProduct = async (e, id) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        setActionProduct(true);
    }

    const displayProductData = (data, page) => {

        const start = (page - 1) * itemOnPage;
        const dataOnPage = data.slice(start, start + itemOnPage);

        return (
            dataOnPage && dataOnPage.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{index + 1 + start}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>
                            <p className={item.isEnable === true ? 'text-success' : 'text-danger'}>
                                {item.isEnable === true ? 'Available' : 'Not available'}
                            </p>
                        </td>
                        <td>
                            <button onClick={() => history.push(`${location.pathname}/create-product/${item._id}`)} className="btn btn-primary btn-action"><i class="fas fa-edit"></i></button>
                            <button className="btn btn-danger btn-action" onClick={(e, id) => handleDeleteProduct(e, item._id)}><i class="fas fa-trash"></i></button>
                        </td>
                    </tr>
                )
            })
        )
    }

    const calcPagination = () => {

        let arrPageNums = [];
        for (let index = 1; index <= Math.ceil(productList.length / itemOnPage); index++) {
            arrPageNums.push(index);
        }

        return (
            arrPageNums.map(item => {
                return (
                    <li className={`page-item ${item === page ? 'active' : ''}`} key={item}>
                        <button className="page-link" onClick={() => setPage(item)}>{item}</button>
                    </li>
                )
            })
        )
    }

    const filterData = () => {
        let data = productList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()));
        return data;
    }

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-6">
                    <div className="input-group mb-2">
                        <input type="text" className="form-control" onChange={(e) => setKeyword(e.target.value)}/>
                        <div className="input-group-append">
                            <span className="input-group-text" id="basic-addon2">Search</span>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="d-flex justify-content-end mb-2">
                        <Link to={`${location.pathname}/create-product`}>
                            <button className="btn btn-light">Add product</button>
                        </Link>
                    </div>
                </div>
            </div>
            <table class="table table-hover table-shadow">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayProductData(filterData(), page)}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </tfoot>
            </table>

            <div>
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${page > 1 ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page - 1)}>Prev</button>
                    </li>
                    {calcPagination()}
                    <li className={`page-item ${page < Math.ceil(productList.length / itemOnPage) ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default ProductTable;