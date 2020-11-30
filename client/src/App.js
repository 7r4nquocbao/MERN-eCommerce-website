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

  return (
    <div className="App container mt-5">
      <h1>App.</h1>    
      <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>     
              <Route exact path="/admin" component={Admin}/>        
              <Route exact path="/admin/create-product" component={CreateProduct}/>
              <Route exact path="/admin/create-product/:id" component={CreateProduct}/>
              <Route exact path="/admin/manage-cat-bra" component={ManageCatBra}/>
            </Switch>
          </Router>          
      </Suspense>
    </div>   
    
  );
}

export default App;
