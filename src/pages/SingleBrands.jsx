import React, { useEffect, useMemo } from "react";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import { useFetch } from "../redux/useFetch";
import { Box } from "@mui/system";
import { SpinnerRoundOutlined , SpinnerInfinity } from "spinners-react";

export default function SingleBrands() {
  const [loading, setLoading] = useState(false);
  let state = useLocation();
  const map = state.state;
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [map]);

  const limit = useMemo(() => 6, []);
  const [activePage, setActivePage] = useState(1);
  const { data } = useFetch(
    `http://localhost:3002/products?category=${map.id}&_page=${activePage}&_limit=${limit}`
  );
  

  return (
    <Box className='singleBrands' sx={{display:"flex",flexDirection:'column'}}>
      <div className="cardWrapper">
        {loading?<SpinnerInfinity size={89} thickness={100} speed={58} color="rgba(57, 120, 172, 1)" />:data?.data?.map((item) => {
          if (item.category == map.id) {
          return  <div className="brandCardStyle">
            <CardComponent item={item}></CardComponent>
          </div>
          }
        })}
      </div>
        <Pagination
          variant="outlined"
          sx={{marginTop:'10px', display:'flex', justifyContent:'center'}}
          defaultPage={1}
          color="primary"
          page={activePage}
          count={Math.ceil(data?.headers['x-total-count'] / limit)}
          onChange={(_, page) => {
            console.log("page:", page);
            setActivePage(page);
          }}
        />
    </Box>
  );
}
