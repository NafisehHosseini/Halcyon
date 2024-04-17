import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrder, orderSelector } from "../redux/orderSlice";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import StatusModal from "../components/StatusModal";

export default function CustomizedTables() {
  const [state, setState] = useState(false);
  const [rows, setRows] = useState([]);
  const [all, setAll] = useState([]);
  const [findItem, setFindItem] = useState(null);
  let moment = require("moment-jalaali");
  const dispatch = useDispatch();
  const { orders } = useSelector(orderSelector);

  useEffect(() => {
    dispatch(fetchOrder());
  }, [state]);

  const statusName = (status) => {
    console.log(status);
    switch (status) {
      case 1:
        return "کامل شده";
      case 2:
        return "لغو شده";
      case 3:
        return "در حال آماده سازی";
      case 4:
        return "پرداخت ناموفق";
      case 5:
        return "در انتظار پرداخت";
      case 6:
        return "تحویل داده شده";
      default:
        return "";
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "name",
      headerName: "نام کاربر",
      width: 100,
    },
    {
      field: "price",
      headerName: "مجموع مبلغ",
      width: 110,
    },
    {
      field: "time",
      headerName: "زمان ثبت سفارش",
      width: 120,
      sortable: false,
    },
    {
      field: "status",
      headerName: "وضعیت سفارش",
      width: 120,
      sortable: false,
    },
    {
      field: "action",
      headerName: "",
      width: 170,
      sortable: false,
      renderCell: (params) => {
        const handleStatus = (e) => {
          setFindItem(orders?.find((item) => item.id == e));
        };
        return (
          <div onClick={() => handleStatus(params.row.id)}>
            <StatusModal props={findItem} state={state} setState={setState} />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    orders?.map((item) =>
      setRows((rows) => [
        ...rows,
        {
          id: item?.id,
          name:
            item?.customerDetail.firstName +
            " " +
            item?.customerDetail.lastName,
          price: Number(item?.purchaseTotal).toLocaleString(),
          time: moment(item?.orderDate).format("jYYYY/jM/jD"),
          status: statusName(item?.orderStatus),
        },
      ])
    );
  }, []);
  useEffect(() => {
    orders?.map((item) =>
      setAll((rows) => [
        ...rows,
        {
          id: item?.id,
          name:
            item?.customerDetail.firstName +
            " " +
            item?.customerDetail.lastName,
          price: Number(item?.purchaseTotal).toLocaleString(),
          time: moment(item?.orderDate).format("jYYYY/jM/jD"),
          status: statusName(item?.orderStatus),
        },
      ])
    );
  }, []);

  const handleChange = (e) => {
    if (e.target.value === "recived") {
      return setRows(
        all.filter((item) => item?.status === "کامل شده" || item?.status === "تحویل داده شده")
      );
    } else if (e.target.value === "waiting") {
      return setRows(
        all.filter((item) => item?.status === "در انتظار پرداخت" || item?.status === "در حال آماده سازی")
      );
    } else {
    }
  };
  return (
    <div className="managePage">
      <div className="topTable">
        <h3>مدیریت سفارش‌ها</h3>
        <FormControl className="radioGroup">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            sx={{ paddingTop: "20px" }}
            onChange={handleChange}
          >
            <FormControlLabel
              value="recived"
              control={<Radio />}
              label="سفارش‌های تحویل داده شده"
            />
            <FormControlLabel
              value="waiting"
              control={<Radio />}
              label="سفارش‌های در انتظار تحویل"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <DataGrid rows={rows} columns={columns} autoHeight pageSize={5} />
    </div>
  );
}
