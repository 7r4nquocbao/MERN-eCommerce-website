// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import Header from '../../../components/UI/Header';
// import TopMenu from '../../../components/UI/TopMenu';
// import Title from '../../../components/UI/Title';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchProductData } from '../../../slices/product-slice';
// import { Button, Container, Table } from 'reactstrap';
// import { Link } from 'react-router-dom';

// Cart.propTypes = {

// };

// function Cart(props) {

//   const [cart, setCart] = useState([]);
//   const productList = useSelector(state => state.products);
//   const dispatch = useDispatch();


//   useEffect(() => {
//     dispatch(fetchProductData());
//   }, [dispatch])

//   function handleDecreaseItem(targetID) {

//   }
//   function handleIncreaseItem(targetID) {

//   }
//   function handleRemoveItem(targetID) {
//     const itemList = [];
//     console.log(targetID);
//     let cartItem = JSON.parse(localStorage.getItem('cart'));
//     cartItem.filter(item => item.id !== targetID);
//     for (let x of cartItem) {
//       const newList = productList.find(item => item._id === x.id)
//       if (newList) {
//         itemList.push(newList);
//       }
//     }
//     localStorage.setItem('cart', JSON.stringify(itemList));
//     setCart(itemList);
//   }

//   function genData() {

//     const itemList = [];
//     const cartItem = JSON.parse(localStorage.getItem('cart'));

//     for (let x of cartItem) {
//       const newList = productList.find(item => item._id === x.id)
//       if (newList) {
//         itemList.push(newList);
//       }
//     }


//     if (itemList) {
//       if (itemList.length > 0) {
//         return (
//           <div className="cart">
//             <Container>
//               <Table bordered>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Product name</th>
//                     <th>Image</th>
//                     <th>Price</th>
//                     <th>Quantity</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {itemList.map((item, index) => (
//                     <tr>
//                       <th scope="row">{index + 1}</th>
//                       <td>{item.name}</td>
//                       <td><img src={item.thumbnail} style={{ width: "100px", height: "100px" }} /></td>
//                       <td>{`${item.price}$`}</td>
//                       <td>
//                         <div className="button-cart">
//                           <Button
//                             color="none"
//                             className="button-cart__quantity"
//                             onClick={() => handleDecreaseItem(item._id)}
//                           >
//                             -
//                           </Button>
//                           <p>{item.quantity}</p>
//                           <Button
//                             color="none"
//                             className="button-cart__quantity"
//                             onClick={() => handleIncreaseItem(item._id)}
//                           >
//                             +
//                           </Button>
//                         </div>


//                       </td>
//                       <td><Button color='danger' onClick={(targetID) => handleRemoveItem(item._id)}>Remove</Button></td>
//                       {console.log('id', item)}
//                     </tr>
//                   ))
//                   }
//                 </tbody>
//               </Table>

//               <div className="checkout">
//                 <div className="checkout__total">
//                   <p>Total : { }</p>
//                 </div>
//                 <div className="checkout__button">
//                   <Link to="cart/checkout">Check out</Link>
//                 </div>

//               </div>

//             </Container>

//           </div>

//         )
//       }
//       else {
//         return <Title title="Nothing here" />
//       }
//     }
//     else {
//       return <Title title="Nothing here" />
//     }
//   }

//   return (
//     <div className="Cart">
//       <Header />
//       <TopMenu />
//       <Title title="Cart" />
//       {genData()}
//     </div>
//   );
// }

// export default Cart;