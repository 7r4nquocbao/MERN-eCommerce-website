import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchProductData } from './slices/product-slice';
import Admin from './pages/admin';

function App() {
  const dispatch = useDispatch();
  const [actionProduct, setActionProduct] = useState(false);
  useEffect(() => {
    console.log("data...")
    dispatch(fetchProductData());
    setActionProduct(false);
  }, [actionProduct,dispatch]);
  return (
    <div className="App container mt-5">
      <h1>App.</h1>
      <Admin setActionProduct={setActionProduct}/>
    </div>
  );
}

export default App;
