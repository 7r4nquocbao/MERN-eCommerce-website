import { useDispatch } from 'react-redux';
import React, { Suspense, useEffect, useState } from 'react';
import { fetchProductData } from './slices/product-slice';
import Admin from './pages/admin';
import { BrowserRouter as Router,  Switch,  Route,  Link } from "react-router-dom";

function App() {
  // const dispatch = useDispatch();
  // const [actionProduct, setActionProduct] = useState(false);
  // useEffect(() => {
  //   console.log("data...")
  //   dispatch(fetchProductData());
  //   setActionProduct(false);
  // }, [actionProduct,dispatch]);

  const Admin = React.lazy(() => import('./pages/admin'));
  const CreateProduct = React.lazy(() => import('./pages/admin/create-product'));
  const ManageCatBra = React.lazy(() => import('./pages/admin/manage-categories-brands'));
  const HomePage = React.lazy(() => import('./pages/customer/HomePage'));
  const Search = React.lazy(() => import('./pages/customer/Search'));
  const Cart = React.lazy(() => import('./pages/customer/Cart'));
  return (
   
      <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <Route exact path="/search" component={Search}/>     
              <Route exact path="/admin" component={Admin}/>        
              <Route exact path="/admin/create-product" component={CreateProduct}/>
              <Route exact path="/admin/create-product/:id" component={CreateProduct}/>
              <Route exact path="/admin/manage-cat-bra" component={ManageCatBra}/>
              <Route exact path="/cart" component={Cart}/>
            </Switch>
          </Router>          
      </Suspense>

    
  );
}

export default App;
