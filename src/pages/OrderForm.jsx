import React from "react";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterJalali from "@date-io/date-fns-jalali";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../redux/cartSlice";
import service from "../redux/http";
import { orderSelector } from "../redux/orderSlice";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const OrderForm = () => {
  // const dispatch = useDispatch()
  const cart = useSelector(cartSelector);
  const { orders } = useSelector(orderSelector);
  const last = orders.slice(-1)[0];
  const orderNumber = last?.orderNumber + 1;
  const [value, setValue] = React.useState(null);
  console.log(value);
  const timeStamp = Date.parse(value);
  const newDate = new Date();
  const orderTimeStamp = newDate.getTime();

  function disablePrevDates(startDate) {
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    };
  }
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 3);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      date: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("وارد کردن نام الزامی است!"),
      lastName: Yup.string().required("وارد کردن نام خانوادگی الزامی است!"),
      address: Yup.string().required("وارد کردن آدرس الزامی است!"),
      phoneNumber: Yup.string().required("وارد کردن شماره تلفن الزامی است!"),
    }),
    onSubmit: () => {
      // service.creatOrder(data);
      // localStorage.setItem("order", JSON.stringify(data));
    },
  });

  const data = {
    customerDetail: {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      phoneNumber: formik.values.phoneNumber,
      address: formik.values.address,
    },
    id: uuidv4(),
    orderNumber: orderNumber,
    orderDate: orderTimeStamp,
    purchaseTotal: cart.cartTotalAmount,
    orderStatus: 5,
    delivery: timeStamp,
    deliveryAt: "",
    orderItems: cart.cartItems.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        thumbnail: item?.thumbnail,
        price: item?.price,
        quantity: item?.cartQuantity,
        count: item?.count,
      };
    }),
  };

  const handlePayment = () => {
    service.creatOrder(data);
    localStorage.setItem("order", JSON.stringify(data));
  };

  return (
    <div className="orderBody">
      <div className="orderForm">
        <form onSubmit={formik.handleSubmit}>
          <input
            className="inputs"
            placeholder="نام"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error1">{formik.errors.firstName}</div>
          ) : null}

          <input
            className="inputs"
            placeholder="نام خانوادگی"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error1">{formik.errors.lastName}</div>
          ) : null}
          <input
            className="inputs"
            placeholder="آدرس"
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error1">{formik.errors.address}</div>
          ) : null}

          <input
            className="inputs"
            placeholder="تلفن همراه"
            id="phoneNumber"
            name="phoneNumber"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error1">{formik.errors.phoneNumber}</div>
          ) : null}
          <LocalizationProvider dateAdapter={AdapterJalali}>
            <DatePicker
              className="date"
              id="date"
              name="date"
              value={value}
              shouldDisableDate={disablePrevDates(startDate)}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ padding: 0 }} />
              )}
            />
          </LocalizationProvider>
          {formik.touched.date && formik.errors.date ? (
            <div className="error1">{formik.errors.date}</div>
          ) : null}
        </form>
            <Link to={{ pathname: "..//payment" }} onClick={handlePayment}>
          <Button variant="contained" color="success" type="submit">
              پرداخت
          </Button>
              </Link>
      </div>
    </div>
  );
};

export default OrderForm;
