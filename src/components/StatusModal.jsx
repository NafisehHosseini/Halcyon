import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";
import service from "../redux/http";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '80%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StatusModal({ props, state, setState }) {
  console.log(state);
  let moment = require("moment-jalaali");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const newDate = new Date();
  const orderTimeStamp = newDate.getTime();
  console.log(orderTimeStamp);
  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    { field: "name", headerName: "نام کالا", width: 150 },
    { field: "price", headerName: "قیمت", width: 110 },
    { field: "count", headerName: "تعداد", width: 200 },
  ];

  const rows = props?.orderItems.map((item) => {
    return {
      id: uuidv4(),
      name: item.name,
      price: item.price,
      count: item.quantity,
    };
  });

  const handleStatus = () => {
    service.updateOrder(props.id, { orderStatus: 6 });
    service.updateOrder(props.id, { deliveryAt: orderTimeStamp });
    setState(!state);
  };

  return (
    <div>
      <Button onClick={handleOpen}>وضعیت سفارش</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            نام مشتری :{" "}
            {props?.customerDetail?.firstName +
              " " +
              props?.customerDetail?.lastName}
          </Typography>
          <Typography>آدرس: {props?.customerDetail?.address}</Typography>
          <Typography>
            شماره تماس : {props?.customerDetail?.phoneNumber}
          </Typography>
          <Typography>
            زمان تحویل : {moment(props?.delivery).format("jYYYY/jM/jD")}
          </Typography>
          <Typography>
            زمان سفارش : {moment(props?.orderDate).format("jYYYY/jM/jD")}
          </Typography>
          <DataGrid autoHeight rows={rows} columns={columns} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {props?.orderStatus === 3 ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleStatus}
              >
                تحویل سفارش
              </Button>
            ) : (
              <Button
                disabled
                variant="contained"
                color="success"
                onClick={handleStatus}
              >
                تحویل سفارش
              </Button>
            )}
            <Typography>
              تحویل داده شد در تاریخ :{" "}
              {moment(props?.deliveryAt).format("jYYYY/jM/jD")}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
