import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import {
  decreaseCartItem,
  removeFromCart,
  addToCart,
  clearCart,
  cartSelector,
} from "../redux/cartSlice";
import { itemsSelector } from "../redux/productSlice";
import { toast } from "react-toastify";

export default function DataTable() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const { items } = useSelector(itemsSelector);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.error("سبد خرید خالی شد");
  };

  const handleFinalization = (e) => {
    if (cart.cartTotalAmount === 0) {
      e.preventDefault();
      toast.error("سبد خرید خالی است");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "نام کالا", width: 130 },
    { field: "price", headerName: "قیمت", width: 130 },
    {
      field: "count",
      headerName: "تعداد",
      type: "number",
      width: 190,
      renderCell: (params) => {
        const handleDecrease = (e) => {
          dispatch(decreaseCartItem(e));
        };

        const handleIncrease = (e) => {
          if (e.count > e.cartQuantity) {
            dispatch(addToCart(e));
          } else {
            toast.error("موجودی کافی نیست");
          }
        };
        return (
          <>
            <Box sx={{ display: "flex" }}>
              <Button onClick={() => handleIncrease(params.row)}>+</Button>
              <Typography>{params.row.cartQuantity}</Typography>
              <Button onClick={() => handleDecrease(params.row)}>-</Button>
            </Box>
            <Typography id="alertText"></Typography>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "",
      renderCell: (params) => {
        const handleDelete = (e) => {
          dispatch(removeFromCart(e));
        };
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(params.row)}
          >
            حذف
          </Button>
        );
      },
    },
  ];
  const rows = cart.cartItems?.map((cartItem) => {
    return {
      id: cartItem.id,
      name: cartItem.name,
      price: Number(cartItem.price).toLocaleString(),
      cartQuantity: cartItem.cartQuantity,
      count: cartItem.count,
    };
  });
  return (
    <div className="cartPage">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        autoHeight
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          flexDirection: { sm: "row", xs: "column" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>
          مجموع سبد خرید: {Number(cart.cartTotalAmount).toLocaleString()} تومان
        </Typography>
        <Button
          className="cartPageButton"
          color="error"
          variant="contained"
          onClick={handleClearCart}
        >
          خالی کردن سبد خرید
        </Button>
        <Button variant="contained" color="success" sx={{ color: "black" }} className="cartPageButton">
          <Link to={{ pathname: "..//order" }} >
            نهایی کردن سبد خرید
          </Link>
        </Button>
      </Box>
    </div>
  );
}
