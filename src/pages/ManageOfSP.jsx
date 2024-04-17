import * as React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector } from "../redux/productSlice";
import { DataGrid } from "@mui/x-data-grid";
import service from "../redux/http";
export default function CustomizedTables() {
  const dispatch = useDispatch();
  const { items } = useSelector(itemsSelector);
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);
  
  const handleEdit = async (params) => {
    const {id, field, value} = params;
    service.updateProduct(id,{[field]:value})
    
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 10 },
    {
      field: "name",
      headerName: "نام کالا",
      width: 150,
    },
    {
      field: "price",
      headerName: "دسته‌بندی",
      width: 110,
      editable: true,
    },
    {
      field: "count",
      headerName: "تعداد",
      width: 200,
      sortable: false,
      editable: true,
    },
  ];
  const rows = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      count: item.count,
    };
  });

  return (
    <div className="managePage">
      <div className="topTable">
        <h3>مدیریت موجودی و قیمت‌ها</h3>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSize={5}
        onCellEditCommit={handleEdit}        
      />
    </div>
  );
}
