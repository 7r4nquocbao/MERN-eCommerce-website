import { StepContent } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import dataAdditional from '../../constants/local-db.json';
import { getOrderDetails } from '../../api';
import './style.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        border: 'solid 2px #e9ecef',
        display: 'block'
    },
    heading: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightRegular,
      fontFamily: 'Cabin',
    },
    column: {
        flexBasis: '25%',
    },
    accordion: {
        background: 'secondary'
    }
}));

function TrackingItem(props) {

    const {handleCancel} = props;

    const {orderId} = props;
    
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [order, setOrder] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);
    const productList = useSelector(state => state.products);
    const [productData, setProductData] = useState([]);
    const [isModify, setIsModify] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const {orderStatus} = dataAdditional;

    useEffect(() => {
        getOrderDetails(orderId).then(res => {
            console.log(res.data);
            setOrder(res.data.order);
            setOrderDetail(res.data.orderDetailsUpdated.map(item => {
                return {...item, orderCode: truncateText(item.orderCode)}
            }));
            if(getStep(res.data.order.status) <= 1) {
                setIsModify(true);
            } else {
                setIsModify(false);
            }
        }).catch(err => {
            console.log(err);
        })
    }, []);

    const getStep = (text) => {
        return orderStatus.findIndex(stt => stt.status === text);
    }

    const truncateText = (text) => {
        if(text) {
            return text.split("").reverse().join("").slice(0,7);
        } else {
            return '';
        }
    }

    const displayItem = () => {
        console.log(orderDetail);
        if(orderDetail) {
            return (
                orderDetail && orderDetail.map((item, index) => {
                    return(
                        <tr key={index}>
                            <td>{item.productName}</td>
                            <td className="text-center">{item.quantity}</td>
                        </tr>
                    )
                })
            )
        }
    }

    return (
        <div className={classes.root}>
            <Accordion classes={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>#{truncateText(order.orderCode)}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>{order.name}</Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            <small className='font-italic font-weight-bold text-muted'>Order At </small> {moment(order.date).fromNow()}
                        </Typography>
                    </div>
                    <div className={classes.column}>
                        <Typography className={classes.heading}>
                            <p className={`font-weight-bold p-0 m-0 ${order.isCancel ? 'text-danger' : 'text-success'}`}>{order.status}</p>
                        </Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className="d-block">
                    <div className="row pl-5 pr-5 pb-5 pt-2">
                        <div className="col">
                            <table className="table">
                                <thead class="thead-light">
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayItem()}
                                </tbody>
                                <tfoot className="table-danger text-danger">
                                    <tr>
                                        <th scope="col">Total</th>
                                        <th colSpan='2'>{Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD' }).format(order.total)}</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="col">
                            <div className="form-shadow p-3">
                                <div className="d-block">
                                    <p>Customer name: <b>{order.name}</b></p>
                                </div>
                                <div className="d-block">
                                    <p>Phone number: <b>{order.phone}</b></p>
                                </div>
                                <div className="d-block">
                                    <p>Email: <b>{order.email}</b></p>
                                </div>
                                <div className="d-block">
                                    <p>Address: <b>{order.address}</b></p>
                                </div>
                            </div>
                        </div>                                        
                    </div>
                    {order.isCancel ? '' : <div className={`d-block ${isModify === true ? '' : 'status-disable'}`}>
                        <Stepper activeStep={getStep(order.status)} alternativeLabel>
                            {orderStatus.map((label) => (
                                <Step key={label.id}>
                                    <StepLabel style={{cursor: 'pointer'}}>
                                        <p style={{fontFamily: 'Quicksand'}}>
                                            {label.status}
                                        </p>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>}
                    
                    {!isModify || order.isCancel ? '' : <div className="d-flex justify-content-end p-5">
                        <button className={`btn ${isModify ? 'btn-danger' : 'btn-secondary'}`}
                            style={{width: '150px'}} onClick={(id) => handleCancel(order._id)}>
                            Cancel Order
                        </button>
                    </div>}
                    
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export default TrackingItem;