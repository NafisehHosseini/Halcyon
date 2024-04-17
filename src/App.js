import "./assets/css/main.scss";
import { Route, Routes } from "react-router-dom";
import HomePage from "./layout/HomePage";
import Dashboard from "./layout/Dashboard";
import Login from "./pages/Login";
import CartPage from "./pages/CartPage";
import ManagePage from "./pages/ManagePage";
import ManageOfSP from "./pages/ManageOfSP";
import OrderPage from "./pages/OrderPage";
import MainPage from "./components/MainPage";
import ListOfBrands from "./pages/ListOfBrands";
import SingleBrands from "./pages/SingleBrands";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems, itemsSelector } from "./redux/productSlice";
import Mobile from "./pages/Mobile";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import OrderForm from "./pages/OrderForm";
import { categorySelector, fetchCategory } from "./redux/categorySlice";
import { cartSelector, getTotals } from "./redux/cartSlice";
import { fetchOrder } from "./redux/orderSlice";
import Payment from "./layout/Payment";
import Success from "./pages/Success";
import Failed from "./pages/Failed";
import { SpinnerDotted } from "spinners-react";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector(itemsSelector);
  const { category } = useSelector(categorySelector);
  const cart = useSelector(cartSelector);
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart]);
  useEffect(() => {
    dispatch(fetchOrder());
  }, []);

  return (
    <div className="container">

        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="/" element={<MainPage />} />
            {items.map((item, index) => (
              <Route
                path={`/mobile/${item.id}`}
                element={<Mobile />}
                key={index}
              />
            ))}
            <Route path="login" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="success" element={<Success />} />
            <Route path="failed" element={<Failed />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/list-brands" element={<ListOfBrands />}>
              {category?.map((item, index) => (
                // console.log(item.name)

                <Route
                  path={`/list-brands/brands/${item?.name}`}
                  element={<SingleBrands />}
                  key={index}
                />
              ))}
            </Route>
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="manage-page" element={<ManagePage />} />
              <Route path="manage-of-sp" element={<ManageOfSP />} />
              <Route path="order-page" element={<OrderPage />} />
            </Route>
          </Route>

          <Route path="/payment" element={<Payment />}></Route>
        </Routes>
      
    </div>
  );
}

export default App;
