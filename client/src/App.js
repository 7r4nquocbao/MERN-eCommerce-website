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
  const RegisterJWT = React.lazy(() => import('./pages/register-jwt-auth'));
  const ActivationJWT = React.lazy(() => import('./pages/activation-jwt-auth'));
  const LoginJWT = React.lazy(() => import('./pages/login-jwt-auth'));
  const ResetRequestJWT = React.lazy(() => import('./pages/reset-request-jwt-auth'));
  const ResetPasswordJWT = React.lazy(() => import('./pages/reset-password-jwt-auth'));
  


  return (
      <Suspense fallback={<div>Loading...</div>}>
          <Router>
            <Switch>
              <Route exact path="/admin" component={Admin}/>        
              <Route exact path="/admin/create-product" component={CreateProduct}/>
              <Route exact path="/admin/create-product/:id" component={CreateProduct}/>
              <Route exact path="/admin/manage-cat-bra" component={ManageCatBra}/>
              <Route exact path="/registerJWT" render={props => <RegisterJWT {...props}/>}/>
              <Route exact path="/activationJWT/:token" render={props => <ActivationJWT {...props}/>}/>
              <Route exact path="/login" render={props => <LoginJWT {...props}/>}/>
              <Route exact path="/reset" render={props => <ResetRequestJWT {...props}/>}/>
              <Route exact path="/reset/:token" render={props => <ResetPasswordJWT {...props}/>}/>
            </Switch>
          </Router>
      </Suspense>    
  );
}

export default App;
