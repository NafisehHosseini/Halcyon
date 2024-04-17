import { categorySelector } from "../redux/categorySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsSelector, fetchItems } from "../redux/productSlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import ItemModal from "../components/ItemModal";
import service from "../redux/http";
import EditModal from "../components/EditModal";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const { items } = useSelector(itemsSelector);
  const { category } = useSelector(categorySelector);
  const [state, setState] = useState(false);
  let findItem

  useEffect(() => {
    dispatch(fetchItems());
  }, [state]);

  const handleDelete = (e) => {
    service.removeProduct(e);
    setState(!state);
  };
  const handleEdit = (e) => {
    findItem = items?.find((item) => item.id == e)
    console.log(e);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "thumbnail",
      headerName: "تصویر",
      width: 50,
      renderCell: (params) => {
        return (
          <div>
            <img style={{ width: "30px" }} src={params.row.thumbnail} alt="" />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "نام کالا",
      width: 150,
      editable: true,
    },
    {
      field: "category",
      headerName: "دسته‌بندی",
      width: 100,
    },
    {
      field: "action",
      headerName: "",
      width: 170,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{ paddingInline: "10px" }}
              onClick={() => handleEdit(params.row.id)}
            >
              <EditModal item={findItem} category={category} setState={setState} state={state} />
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.id)}
            >
              حذف
            </Button>
          </>
        );
      },
    },
  ];
  const rows = items?.map((item) => {
    return {
      id: item.id,
      thumbnail: `http://localhost:3002/files/${item.thumbnail}`,
      name: item.name,
      category: category?.find((el) => {
        return el.id == item.category;
      })?.name,
    };
  });
  return (
    <div className="managePage">
      <div className="topTable">
        <h3>مدیریت موجودی و قیمت‌ها</h3>
        <ItemModal category={category} setState={setState} state={state} />
      </div>
      <DataGrid
        className="dataGrid"
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={5}
        rowHeight={70}
        disableSelectionOnClick
      />
    </div>
  );
}
