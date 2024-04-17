import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { api } from "../redux/api";
import service from "../redux/http";
import * as Yup from "yup";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "300px",
  overflow: "auto",
};

export default function BasicModal({ category, item, setState, state }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      image: item?.images,
      name: item?.name,
      category: item?.category,
      price: item?.price,
      count: item?.count,
      description: item?.description,
    },
    onSubmit: () => {

      service.updateProduct(item?.id, data);
      handleClose();
      setState(!state);
      toast.success("اطلاعات شما با موفقیت ویرایش گردید");
    },
  });
  const [gallery, setGallery] = useState();
  useEffect(() => {
    setGallery(formik.values?.image);
  }, [formik.values?.image]);
  console.log(gallery);

  const data = {
    name: formik.values?.name,
    category: formik.values?.category,
    price: formik.values?.price,
    count: formik.values?.count,
    description: formik.values?.description,
    images: gallery,
  };

  //get images as file
  const selectFileHandler = (e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
  };
  //save photos in gallery
  const uploadHandler = () => {
    const formData = new FormData();
    Object.entries(formik?.values).map((item) => {
      formData.append(item[0], item[1]);
    });
    api
      .post("/upload", formData, {})
      .then((res) => setGallery((gallery) => [...gallery, res.data.filename]));
  };
  //save description
  const handleDeleteImage = (e) => {
    const findImage = gallery?.find((item) => item == e);
    setGallery(gallery?.filter((item) => item != findImage));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        ویرایش
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="formBody">
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="img">تصویر کالا</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={selectFileHandler}
              onBlur={formik.handleBlur}
            />
            <button type="button" onClick={uploadHandler}>
              آپلود
            </button>
            <div className="thumbnail">
              {gallery?.map((photo) => (
                <div key={uuidv4()} className="imageDeletable">
                  <img
                    src={`http://localhost:3002/files/${photo}`}
                    key={uuidv4()}
                  />
                  <span
                    className="deleteIcon"
                    onClick={() => handleDeleteImage(photo)}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>

            <label htmlFor="name">نام کالا</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            <label htmlFor="category">دسته بندی</label>
            <select
              // value={data?.category}
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="">انتخاب کنید</option>
              {category?.map((item) => (
                <option value={item?.id} key={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            <label htmlFor="price">قیمت</label>
            <input
              id="price"
              name="price"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label htmlFor="count">تعداد</label>
            <input
              id="count"
              name="count"
              type="text"
              onBlur={formik.handleBlur}
              value={formik.values.count}
              onChange={formik.handleChange}
            />
            {/* <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onContentStateChange={onContentStateChange}           
            /> */}
            <label htmlFor="description">توضیحات</label>
            <textarea
              id="description"
              name="description"
              type="text"
              onBlur={formik.handleBlur}
              style={{ marginBottom: "10px" }}
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <button type="submit">ذخیره</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
