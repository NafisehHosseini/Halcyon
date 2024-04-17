import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import service from "../redux/http";

export default function Failed() {
  const dispatch = useDispatch();
  const buyed = JSON.parse(localStorage.getItem("order"));

  const handleCancel = () => {
    dispatch(clearCart())
    service.updateOrder(buyed.id, { orderStatus: 2 });
    localStorage.removeItem("order");
  }

  return (
    <div>
      <Typography variant="h4" sx={{ textAlign: "center", marginY: "1%" }}>
        متاسفانه نشد که بشه😔
      </Typography>
      <Typography variant="h4" sx={{ textAlign: "center", marginY: "1%" }}>
        ادامه بدیم یا بی‌خیال میشی؟!
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link to={{ pathname: "..//payment" }}>
          <Button variant="contained" color="warning" sx={{ color: "black" }}>
            نه بی‌خیال چیه دستم خورد بریم صفحه پرداخت
          </Button>
        </Link>
        <Link to={{ pathname: "..//" }}>
          <Button variant="contained" color="error" onClick={handleCancel}>
            شرمنده داداش روم نشد بگم ولی پول ندارم
          </Button>
        </Link>
      </Box>
    </div>
  );
}
