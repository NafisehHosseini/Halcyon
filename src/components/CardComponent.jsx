import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import MobileItem from "./MobileItem";
import AddToCard from "./AddToCard";
import { addToCart, cartSelector } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import service from "../redux/http";
import { toast } from "react-toastify";

export default function CardComponent(props) {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);

  const increase = (e) => {
    const findQuantity = cart.cartItems.find(
      (item) => item.id === e.id
    )?.cartQuantity;

    if (e.count > findQuantity || findQuantity === undefined) {
      dispatch(addToCart(e));
    } else {
      toast.error("موجودی کالا کافی نیست");
    }
  };

  return (
    <Card>
      <Link to={{ pathname: `..//mobile/${props?.item?.id}` }} state={props?.item}>
        <Typography color="primary" className="title">
          {props?.item?.name}
        </Typography>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:3002/files/${props?.item?.thumbnail}`}
          alt={props?.item?.name}
        />
        <Typography className="price">
          {Number(props?.item?.price).toLocaleString()}
        </Typography>
      </Link>
      {props?.item?.count == 0 ? <Button
        variant="contained"
        color="primary"
        disabled
        onClick={() => increase(props?.item)}
      >
        افزودن به سبد کالا
      </Button>: <Button
        variant="contained"
        color="primary"
        onClick={() => increase(props?.item)}
      >
        افزودن به سبد کالا
      </Button>}
    </Card>
  );
}
