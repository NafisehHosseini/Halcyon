import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../redux/useFetch";
import CardComponent from "./CardComponent";
import { v4 as uuidv4 } from "uuid";
import { SpinnerDotted } from "spinners-react";


export default function MainCategory(props) {
  const [loading, setLoading] = useState(false);
 
  const { data } = useFetch(
    `http://localhost:3002/products?category=${props.props.id}&_limit=4`
  );
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div>
      <Link
        to={{ pathname: `list-brands/brands/${props.props.name}` }}
        state={props.props}
        className="brand"
      >
        <h1>{props.props.name}</h1>
      </Link>
      <div className="homePageCardWrapper" key={uuidv4()}>
        {loading?<SpinnerDotted size={89} thickness={100} speed={58} color="rgba(57, 120, 172, 1)" />:data?.data?.map((item) => {
          if (props.props.id == item.category) {
            return <div className="cardStyle">
              <CardComponent item={item} key={uuidv4()} />
            </div>;
          }
        })}
      </div>
    </div>
  );
}
