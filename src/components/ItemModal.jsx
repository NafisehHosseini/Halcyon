import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { api } from "../redux/api";
import service from "../redux/http";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";

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

export default function BasicModal({ category, setState, state }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gallery, setGallery] = useState([]);
  const [des, setDes] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  React.useEffect(()=>{

  },[])
  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      image: "",
      name: "",
      category: "",
      price: "",
      count: "",
      description: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("وارد کردن حداقل یک تصویر الزامی است!"),
      name: Yup.string().required("وارد کردن نام کالا الزامی است!"),
      category: Yup.string().required("وارد کردن دسته بندی کالا الزامی است!"),
      price: Yup.number()
        .typeError("فقط مقدار عددی مجاز است")
        .required("وارد کردن قیمت کالا الزامی است!"),
      count: Yup.number()
        .typeError("فقط مقدار عددی مجاز است")
        .required("وارد کردن تعداد کالا الزامی است!"),
    }),
    onSubmit: () => {
      service.creatProduct(data);
      setGallery([]);
      setEditorState(EditorState.createEmpty());
      handleClose();
      formik.values.id = uuidv4();
      setState(!state);
      toast.success("اطلاعات شما با موفقیت ثبت گردید");
    },
  });

  const data = {
    id: formik.values.id,
    name: formik.values.name,
    category: formik.values.category,
    price: formik.values.price,
    count: formik.values.count,
    description: des,
    images: gallery,
    thumbnail: gallery[0],
    createdAt: new Date().getTime(),
  };

  //get images as file
  const selectFileHandler = (e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
  };
  //save photos in gallery
  const uploadHandler = () => {
    const formData = new FormData();
    Object.entries(formik.values).map((item) => {
      formData.append(item[0], item[1]);
    });
    api
      .post("/upload", formData, {})
      .then((res) => setGallery((gallery) => [...gallery, res.data.filename]));
  };

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  setDes(draftToHtml(convertToRaw(editorState.getCurrentContent())));

  };

  console.log(des);

  const handleDeleteImage = (e) => {
    const findImage = gallery.find((item) => item == e);
    setGallery(gallery.filter((item) => item != findImage));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        افزودن
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
            {formik.touched.image && formik.errors.image ? (
              <div className="error1">{formik.errors.image}</div>
            ) : null}
            <button type="button" onClick={uploadHandler}>
              آپلود
            </button>
            <div className="thumbnail">
              {gallery.map((photo) => (
                <div className="imageDeletable">
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
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error1">{formik.errors.name}</div>
            ) : null}
            <label htmlFor="category">دسته بندی</label>
            <select
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {category?.map((name) => (
                <option value={name.id} key={name.id}>
                  {name?.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="error1">{formik.errors.category}</div>
            ) : null}
            <label htmlFor="price">قیمت</label>
            <input
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error1">{formik.errors.price}</div>
            ) : null}
            <label htmlFor="count">تعداد</label>
            <input
              id="count"
              name="count"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.count && formik.errors.count ? (
              <div className="error1">{formik.errors.count}</div>
            ) : null}
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
            />

            <button type="submit">ذخیره</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
