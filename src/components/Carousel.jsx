import React from "react";
import Carousel from "react-material-ui-carousel";
import Item from "./Item";
import samsung from "../assets/img/kv_galaxy-s22-ultra_l.jpg";
import apple from "../assets/img/Apple_iphone13_design_09142021_big.jpg.slideshow-xlarge_2x.jpg";
import xiaomi from "../assets/img/xiaomi-11t-specs-price-availability-philippines.jpg";
import huawei from "../assets/img/huawei-nova-9-3.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { itemsSelector } from "../redux/productSlice";

export default function CarouselCom() {
  const {items} = useSelector(itemsSelector);
  return (
    <>
      <div>
        <Carousel
          animation="slide"
          indicators={false}
          navButtonsAlwaysVisible={true}
        >
          <Item>
            <Link
              to={{ pathname: `..//mobile/${items[0]?.id}` }}
              state={items[0]}
            >
              <img src={samsung} />
            </Link>
          </Item>
          <Item>
          <Link
              to={{ pathname: `..//mobile/${items[13]?.id}` }}
              state={items[13]}
            >
              <img src={apple} />
            </Link>
          </Item>
          <Item>
          <Link
              to={{ pathname: `..//mobile/${items[28]?.id}` }}
              state={items[28]}
            >
              <img src={xiaomi} />
            </Link>
          </Item>
          <Item>
          <Link
              to={{ pathname: `..//mobile/${items[34]?.id}` }}
              state={items[34]}
            >
              <img src={huawei} />
            </Link>
          </Item>
        </Carousel>
      </div>
    </>
  );
}
