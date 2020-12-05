import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { fetchOrderData } from '../../../slices/order-slice';
import { deleteProduct } from '../../../slices/product-slice';
import dataAdditional from '../../../constants/local-db.json';

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LinearProgress from '@material-ui/core/LinearProgress';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import './style.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: 'solid 2px #e9ecef',
        display: 'block'
    },
    heading: {
      fontSize: theme.typography.pxToRem(20),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Quicksand',
    },
    column: {
        flexBasis: '33.33%',
    }
}));

function OrderList(props) {

    var day1 = new Date("Sun Nov 29 2020 00:22:41 GMT+0700 (Indochina Time)");
    
    const classes = useStyles();
    const {orderStatus} = dataAdditional;
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const [actionOrder, setActionOrder] = useState(false);
    const orderList = useSelector(state => state.orders);
    const itemOnPage = 6;
    const [page, setPage] = useState(1);
    const [progressValue, setProgressValue] = useState(7); // 7 37 66 100
    const [progressStatus, setProgressStatus] = useState(1);

    useEffect(() => {
        console.log("get data...")
        dispatch(fetchOrderData());
        setActionOrder(false);
    }, [actionOrder,dispatch]);

    const handleDeleteProduct = async (e, id) => {
        e.preventDefault();
        dispatch(deleteProduct(id));
        setActionOrder(true);
    }

    const changeStt = (id) => {
        console.log(id);
        switch (id) {
            case 1:
                setProgressValue(7);
                setProgressStatus(1);
                break;
            case 2:
                setProgressValue(37);
                setProgressStatus(2);
                break;
            case 3:
                setProgressValue(66);
                setProgressStatus(3);
                break;
            case 4:
                setProgressValue(100);
                setProgressStatus(4);
        }
    }

    const displayOrderData = (data, page) => {

        const start = (page - 1) * itemOnPage;
        const dataOnPage = data.slice(start, start + itemOnPage);

        return(
            // dataOnPage && dataOnPage.map((item, index) => {
            //     return(
            //         <tr key={index}>
            //             <td>{index + 1 + start}</td>
            //             <td>{item.name}</td>
            //             <td>{item.category}</td>
            //             <td>{item.price}</td>
            //             <td>{item.stock}</td>
            //             <td>
            //                 <p className={item.isEnable === true ? 'text-success' : 'text-danger'}>
            //                     {item.isEnable === true ? 'Available' : 'Not available'}
            //                 </p>
            //             </td>
            //             <td>
            //                 <button onClick={() => history.push(`${location.pathname}/create-product/${item._id}`)} className="btn btn-primary btn-action"><i class="fas fa-edit"></i></button>
            //                 <button className="btn btn-danger btn-action" onClick={(e, id) => handleDeleteProduct(e, item._id)}><i class="fas fa-trash"></i></button>
            //             </td>
            //         </tr>
            //     )
            // })

            <tbody className="fix-tbody">
                <tr>
                    <td>
                        <div className={classes.root}>
                            <Accordion color="secondary">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>#1</Typography>
                                    </div>
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>Tran Quoc Bao</Typography>
                                    </div>
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>{moment(day1).fromNow()}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="d-block">
                                    <div className="row pl-5 pr-5 pb-5 pt-2">
                                        <div className="col">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>GTX 1060</th>
                                                        <th>2</th>
                                                    </tr>
                                                </tbody>
                                                <tfoot className="table-danger text-danger">
                                                    <tr>
                                                        <th scope="col">Total</th>
                                                        <th colSpan='2'>{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(2000)}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="col form-shadow pt-3 pl-3">
                                            <div className="d-block">
                                                <p>Customer name: <b>Tran Quoc Bao</b></p>
                                            </div>
                                            <div className="d-block">
                                                <p>Phone number: <b>0123456789</b></p>
                                            </div>
                                            <div className="d-block">
                                                <p>Address: <b>Su Van Hanh, Ho Chi Minh City</b></p>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div className="d-block pl-5 pr-5">
                                        <div className="d-flex justify-content-between">
                                            {orderStatus && orderStatus.map((item, index) => {
                                                return(
                                                    <div key={index}>
                                                        <p style={{cursor: 'pointer'}} className={progressStatus === item.id ? 'font-weight-bold' : ''} onClick={(id) => {changeStt(item.id)}}>
                                                            {item.status}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className={classes.root}>
                                            <LinearProgress variant="determinate" value={progressValue} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end p-5">
                                        <button className="btn btn-success">Save</button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td>
                        <div className={classes.root}>
                            <Accordion color="secondary">
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>#2</Typography>
                                    </div>
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>Tran Quang Sang</Typography>
                                    </div>
                                    <div className={classes.column}>
                                        <Typography className={classes.heading}>{moment(day1).fromNow()}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className="d-block">
                                    <div className="row pl-5 pr-5 pb-5 pt-2">
                                        <div className="col">
                                            <table className="table">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>ASUS G812</th>
                                                        <th>2</th>
                                                    </tr>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>RTX 2060</th>
                                                        <th>4</th>
                                                    </tr>
                                                </tbody>
                                                <tfoot className="table-danger text-danger">
                                                    <tr>
                                                        <th scope="col">Total</th>
                                                        <th colSpan='2'>{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(10000)}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="col form-shadow pt-3 pl-3">
                                            <div className="d-block">
                                                <p>Customer name: <b>Tran Quang Sang</b></p>
                                            </div>
                                            <div className="d-block">
                                                <p>Phone number: <b>0123456789</b></p>
                                            </div>
                                            <div className="d-block">
                                                <p>Address: <b>Su Van Hanh, Ho Chi Minh City</b></p>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div className="d-block pl-5 pr-5">
                                        <div className="d-flex justify-content-between">
                                            {orderStatus && orderStatus.map((item, index) => {
                                                return(
                                                    <div key={index}>
                                                        <p style={{cursor: 'pointer'}} className={progressStatus === item.id ? 'font-weight-bold' : ''} onClick={(id) => {changeStt(item.id)}}>
                                                            {item.status}
                                                        </p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className={classes.root}>
                                            <LinearProgress variant="determinate" value={progressValue} />
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-end p-5">
                                        <button className="btn btn-success">Save</button>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    </td>
                </tr>

            </tbody>

                
        )
    }

    const calcPagination = () => {

        let arrPageNums = [];
        for (let index = 1; index <= Math.ceil(orderList.length / itemOnPage); index++) {
            arrPageNums.push(index);
        }

        return (
            arrPageNums.map(item => {
                return (
                    <li className={`page-item ${item === page ? 'active' : ''}`} key={item}><button className="page-link" onClick={() => setPage(item)}>{item}</button></li>
                )
            })
        )
    }
    
    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <button className="btn btn-light m-3">Refresh</button>
            </div>
            <table class="table table-hover table-shadow table-order">
                <thead>
                    <tr>
                        <th scope="col">#Code</th>
                    </tr>
                </thead>
                <tbody>
                    {displayOrderData(orderList, page)}
                </tbody>
                <tfoot>
                    <tr>
                        <th scope="col">#Code</th>
                    </tr>
                </tfoot>
            </table>

            <div>
                <ul className="pagination justify-content-end">
                    <li className={`page-item ${page > 1 ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page-1)}>Prev</button>
                    </li>                    
                    {calcPagination()}
                    <li className={`page-item ${page < Math.ceil(orderList.length / itemOnPage) ? '' : 'disabled'}`}>
                        <button className="page-link" onClick={() => setPage(page+1)}>Next</button>
                    </li>
                </ul>
            </div>
                
        </div>
    );
}

export default OrderList;