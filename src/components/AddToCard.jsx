import { Button, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartSelector, decreaseCartItem } from "../redux/cartSlice";
import { toast } from "react-toastify";
import service from "../redux/http";

export default function AddToCard({ count, map }) {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  console.log(map.count);
  const findQuantity = cart.cartItems.find(
    (item) => item.id === map.id
  )?.cartQuantity;
  console.log(findQuantity);

  const increase = (map) => {
    if(map.count>findQuantity||findQuantity===undefined){
      dispatch(addToCart(map));
    }else{
      toast.error('موجودی کالا کافی نیست');
    }
  };
  const decrease = (e) => {
    dispatch(decreaseCartItem(e));
  };

  return (
    <>
      {findQuantity > 0 ? (
        <>
          <Box sx={{ display: "flex" }}>
            <Button onClick={() => increase(map)}>+</Button>
            <Typography>{findQuantity}</Typography>
            <Button onClick={() => decrease(map)}>
              {findQuantity == 1 ? <DeleteIcon color="error" /> : "-"}
            </Button>
          </Box>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ padding: "5px", margin: "10px 0" }}
          onClick={() => increase(map)}
        >
          افزودن به سبد خرید
        </Button>
      )}
    </>
  );
}
