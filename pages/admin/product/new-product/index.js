import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/NewProduct.module.css";
import {
  Container,
  Col,
  Row,
  Dropdown,
  Form,
  Button,
  FormControl,
  Modal,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Image from "next/image";
import { authPage, adminPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await adminPage(context);
  //*======================== REQ API USER LOGIN ======================
  const result = await axiosApiIntances
    .get(`/user/by-id/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  //*==================== END REQ API USER LOGIN ======================

  return {
    props: { data: result, userLogin: data },
  };
}

export default function NewProduct(props) {
  //*=========================== UseState =============================
  const router = useRouter();
  const [title, setTitle] = useState("Add Product");
  const [label, setLabel] = useState("Select Category");
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("");
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [preview, setPreview] = useState(false);
  const [idProduct, setIdProduct] = useState("");
  const [category] = useState([
    "Select Category",
    "Coffee",
    "Non Coffee",
    "Food",
    "Add On",
  ]);
  const [menuProduct] = useState([
    {
      link: "/admin/new-product/0",
      category: "Add Product",
    },
    {
      link: "/admin/new-promo/0",
      category: "Add Promo",
    },
    {
      link: `/admin/update-product/${idProduct}`,
      category: "Update Product",
    },
    {
      link: "/admin/update-promo/1",
      category: "Update Promo",
    },
  ]);
  const [sizeDrink] = useState([
    { category: "coffee", size: "R" },
    { category: "coffee", size: "L" },
    { category: "coffee", size: "XL" },
  ]);
  const [sizeFood] = useState([
    { category: "food", size: 250 },
    { category: "food", size: 300 },
    { category: "food", size: 500 },
  ]);
  const [form, setForm] = useState({
    productName: "",
    productPrice: 0,
    productCategory: "",
    productDesc: "",
    productSize: "",
    imageUser: null,
  });
  //*======================= End UseState =============================

  const resetData = () => {
    setForm({
      productName: "",
      productPrice: 0,
      productCategory: "",
      productDesc: "",
      productSize: "",
    });
    setPreview("");
    setActive(false);
  };
  //*================================ Drag & Drop Image ===============
  const thumb = {
    borderRadius: 100,
    width: 250,
    height: 250,
    objectFit: "cover",
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  const img = {
    borderRadius: "100%",
    width: "250px",
    height: "250px",
    objectFit: "cover",
  };
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  //*============================ End Drag & Drop Image ===============

  //*========================== Handle Form Input =====================
  const handleClick = (params1, params2) => {
    router.push(params1);
    setTitle(params2);
  };
  const handleClickCategory = (param) => {
    setLabel(param);
    if (param === "Food") {
      setForm({
        ...form,
        productCategory: "food",
      });
    } else if (param === "Coffee") {
      setForm({
        ...form,
        productCategory: "coffee",
      });
    } else if (param === "Non Coffee") {
      setForm({
        ...form,
        productCategory: "noncoffee",
      });
    } else if (param === "Add On") {
      setForm({
        ...form,
        productCategory: "addon",
      });
    }
  };
  const handleClickSize = (param) => {
    if (param === "R" || param === "L" || param === "XL") {
      setActive("coffee");
      setForm({
        ...form,
        productSize: "R, L, XL",
      });
    } else if (param === 250 || param === 300 || param === 500) {
      setActive("food");
      setForm({
        ...form,
        productSize: "250gr, 300gr, 500gr",
      });
    } else {
      setActive(false);
    }
  };
  const changeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //*====================== End Handle Form Input =====================
  //*========================== Handle REQ API  =======================
  const handleSave = () => {
    console.log("addImage");
    if (
      form.productName === "" ||
      parseInt(form.productPrice) === 0 ||
      form.productCategory === "" ||
      form.productDesc === "" ||
      form.productSize === ""
    ) {
      setShow(true);
      setInfo("ERROR : ADD PRODUCT");
      setMsg("Please Input Field !");
    } else {
      const formData = new FormData();
      formData.append("productName", form.productName);
      formData.append("productPrice", form.productPrice);
      formData.append("productCategory", form.productCategory);
      formData.append("productSize", form.productSize);
      formData.append("productDesc", form.productDesc);
      formData.append("imageUser", files[0]);
      //*=========== Cek Form Data
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      //*=============== End
      axiosApiIntances
        .post("product/", formData, {
          headers: {
            Authorization: `Bearer ${props.userLogin.token || ""}`,
          },
        })
        .then((res) => {
          console.log(res);
          setPreview(false);
          setShow(true);
          setAdd(true);
          setIdProduct(res.data.data.id);
          setInfo("ADD PRODUCT");
          setMsg(`Success add product with id : ${res.data.data.id}!`);
          router.push(`/admin/new-product`);
        })
        .catch((err) => {
          console.log(err);
          setPreview(false);
          setAdd(false);
          setShow(true);
          setInfo("ERROR : ADD PRODUCT");
          setMsg(err.response.data.msg);
          resetData();
        });
    }
  };
  //*======================= End Handle REQ API  =======================

  //*======================= Handle Modal  =============================
  const handleClose = () => {
    if (idProduct === "") {
      router.push(`/admin/new-product`);
      setShow(false);
      resetData();
    } else if (info === "ERROR : ADD PRODUCT") {
      router.push(`/admin/new-product`);
      setShow(false);
      resetData();
    } else {
      router.push("/admin/product/all");
      setShow(false);
      resetData();
    }
  };
  const handleAdd = () => {
    setIdProduct("");
    setActive(false);
    setAdd(false);
    router.push(`/admin/new-product`);
    setShow(false);
    resetData();
  };

  const handleBack = () => {
    router.push(`/admin/product/all`);
    setShow(false);
  };
  //*======================= End Handle Modal  ========================

  return (
    <Layout title="Add Product">
      <div>
        <Modal show={show} className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>INFO {info}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
          {add === true ? (
            <Modal.Footer>
              <Button onClick={handleBack}>Go to Product Page</Button>
              <Button className="btn-secondary" onClick={handleAdd}>
                Add Another Product
              </Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          )}
        </Modal>
        <Navbar login={true} />
        <Container fluid className={styles.container}>
          <Dropdown>
            <div className={styles.dropdownSort}>
              <Dropdown.Toggle
                variant="#fff"
                title="product"
                id="dropdown-basic"
                className={styles.titleSort}
              >
                Product
              </Dropdown.Toggle>
              <h1 className={styles.titleProduct}>{title}</h1>
            </div>
            <Dropdown.Menu className={styles.menuDropdown}>
              {menuProduct.map((item, index) => {
                return (
                  <Dropdown.Item
                    key={index}
                    className={styles.listSort}
                    onClick={() => handleClick(item.link, item.category)}
                  >
                    {item.category}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
          <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
            <Col xs={12} md={4} lg={5} className={styles.left}>
              <div className={styles.boxLeft}>
                <div className={styles.boxImage}>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {preview === true ? thumbs : ""}
                  </div>
                  <Image
                    src="/product/camera.png"
                    width="90px"
                    height="83px"
                    alt=""
                    className={styles.img}
                  />
                </div>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className={styles.boxDropzone}
                >
                  <input {...getInputProps()} />
                  <Button
                    className={styles.btnChoose1}
                    onClick={() => setPreview(true)}
                  >
                    {idProduct !== ""
                      ? "Change image product"
                      : "Choose from gallery"}
                  </Button>
                </div>
                <Button
                  className={`${styles.btnSave} btn-secondary`}
                  onClick={() => handleSave()}
                >
                  Save Product
                </Button>
                <Button
                  variant="fff"
                  className={styles.btnCancel}
                  onClick={() => router.push("/admin/product")}
                >
                  Cancel
                </Button>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7} className={styles.right}>
              <Form className={`${styles.form} d-flex`}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>Name :</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Type product name max 20 characters"
                    className={styles.placeholder}
                    maxLength="20"
                    name="productName"
                    value={form.productName}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
                <div className={styles.boxFormRow}>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Price :
                    </Form.Label>
                    <FormControl
                      type="number"
                      step="1000"
                      placeholder="Type the price"
                      className={styles.placeholder}
                      name="productPrice"
                      value={form.productPrice}
                      onChange={(e) => changeText(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Category :
                    </Form.Label>
                    <Dropdown className={styles.placeholder}>
                      <div className={styles.dropdownSort1}>
                        <Dropdown.Toggle
                          variant="#fff"
                          title="product"
                          id="dropdown-basic"
                          className={styles.titleSort1}
                          required
                        >
                          {label}
                        </Dropdown.Toggle>
                      </div>
                      <Dropdown.Menu className={styles.menuDropdown1}>
                        {category.map((item, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              id={item}
                              className={styles.listDiscount}
                              onClick={() => handleClickCategory(item)}
                              onChange={(e) => changeText(e)}
                              required
                            >
                              {item}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                </div>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>
                    Description :
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Describe your product min. 150 characters"
                    className={styles.placeholder}
                    name="productDesc"
                    value={form.productDesc}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>
                    Input product size :
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Click size you want to use for this product"
                    className={styles.placeholder1}
                    disabled
                  />
                  <div className={styles.boxSize}>
                    {sizeDrink.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          id={item.size}
                          className={`${styles.buttonCoffee} ${
                            active === item.category
                              ? "btn-secondary"
                              : "btn-primary"
                          }`}
                          onClick={() => handleClickSize(item.size)}
                          onChange={(e) => changeText(e)}
                        >
                          {item.size}
                        </Button>
                      );
                    })}

                    {sizeFood.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          id={item.size}
                          variant="fff"
                          className={`${styles.buttonFood} ${
                            active === "food"
                              ? "btn-secondary"
                              : `${styles.buttonFood}`
                          }`}
                          onClick={() => handleClickSize(item.size)}
                          onChange={(e) => changeText(e)}
                        >
                          {item.size} gr
                        </Button>
                      );
                    })}
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Layout>
  );
}
