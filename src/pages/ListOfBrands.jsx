import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsSelector } from "../redux/productSlice";
import { categorySelector } from "../redux/categorySlice";
import { Link, Outlet} from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

export default function ListOfBrands() {
  const { category } = useSelector(categorySelector);

  return (
    <div className="brandsPage">
      <div className="sidebar">
        <Box
          sx={{
            bgcolor: "#F4F4F4",
            position: "relative",
            overflow: "auto",
            maxHeight: "100vh",
            "& ul": { padding: 0 },
          }}
        >
          {category.map((item) => (
            <List
              sx={{
                direction: "ltr",
                width: "100%",
                bgcolor: "#F4F4F4",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
              key={uuidv4()}
            >
              <ListItemButton>
                <Link to={{ pathname: `brands/${item.name}` }} state={item}>
                  <ListItemText primary={item.name} />
                </Link>
              </ListItemButton>
            </List>
          ))}
        </Box>
      </div>
      <Outlet/>
    </div>
  );
}
