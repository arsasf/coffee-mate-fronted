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
      return {};
    });
  //*==================== END REQ API USER LOGIN ======================
  return {
    props: { data: result, userLogin: data },
  };
}

export default function NewPromo(props) {
  // console.log(props);
  //*=============================== UseState =========================
  const router = useRouter();
  const [title, setTitle] = useState("Add Promo");
  const [label, setLabel] = useState("0%");
  const [msg, setMsg] = useState("");
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState(false);
  const [info, setInfo] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [discount] = useState([
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
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
      link: "/admin/update-product/1",
      category: "Update Product",
    },
    {
      link: "/admin/update-promo/1",
      category: "Update Promo",
    },
  ]);
  const [form, setForm] = useState({
    promoName: "",
    promoMinPrice: "",
    promoMaxDiscount: "",
    promoCode: "",
    promoDesc: "",
    promoDiscountpersent: "",
    promoExpiredStart: "",
    promoExpiredEnd: "",
  });
  //*=========================== End UseState =========================
  const resetData = () => {
    setForm({
      promoName: "",
      promoMinPrice: 0,
      promoMaxDiscount: 0,
      promoCode: "",
      promoDesc: "",
      promoDiscountpersent: "",
      promoExpiredStart: "",
      promoExpiredEnd: "",
    });
    setPreview("");
    setLabel("0%");
    setFiles([]);
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

  const handleClickDiscount = (param) => {
    setLabel(`${param}%`);
    setForm({
      ...form,
      promoDiscountpersent: `${param}%`,
    });
  };
  const changeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //*======================= End Handle Form Input =====================

  //*============================ Handle REQ API =======================
  const handleSave = () => {
    console.log("create", form);
    if (
      form.promoName === "" ||
      parseInt(form.promoMinPrice) === 0 ||
      parseInt(form.promoMaxDiscount) === 0 ||
      form.promoCode === "" ||
      form.promoDesc === "" ||
      form.productSize === "" ||
      form.promoDiscountpersent === "" ||
      form.promoExpiredStart === "" ||
      form.promoExpiredEnd === ""
    ) {
      setShow(true);
      setInfo("ERROR : ADD PROMO");
      setMsg("Please Input Field !");
    } else {
      const formData = new FormData();
      formData.append("promoName", form.promoName);
      formData.append("promoMinPrice", form.promoMinPrice);
      formData.append("promoMaxDiscount", form.promoMaxDiscount);
      formData.append("promoCode", form.promoCode);
      formData.append("promoDesc", form.promoDesc);
      formData.append("promoDiscountpersent", form.promoDiscountpersent);
      formData.append("promoExpiredStart", form.promoExpiredStart);
      formData.append("promoExpiredEnd", form.promoExpiredEnd);
      formData.append("imageUser", files[0]);
      //*=========== Cek Form Data
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      //*=============== End
      axiosApiIntances
        .post("promo/", formData, {
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
          setInfo("ADD PROMO");
          setMsg(`Success add promo with id : ${res.data.data.id}!`);
          router.push(`/admin/new-promo`);
          resetData();
        })
        .catch((err) => {
          console.log(err);
          setPreview(false);
          setAdd(false);
          setShow(true);
          setInfo("ERROR : ADD PROMO");
          setMsg(err.response.data.msg);
          resetData();
        });
    }
  };
  //*========================== End Handle REQ API =====================

  //*======================= Handle Modal  =============================
  const handleClose = () => {
    if (idProduct === "") {
      router.push(`/admin/new-promo`);
      setShow(false);
      resetData();
    } else if (info === "ERROR : ADD PROMO") {
      router.push(`/admin/new-promo`);
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
    setAdd(false);
    router.push(`/admin/new-promo`);
    setShow(false);
    resetData();
  };

  const handleBack = () => {
    router.push(`/admin/product/all`);
    setShow(false);
  };
  //*======================= End Handle Modal  ========================

  return (
    <Layout title="Add Promo">
      <div>
        <Modal show={show} className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>INFO {info}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
          {add === true ? (
            <Modal.Footer>
              <Button onClick={handleBack}>Go to Product Page</Button>
              <Button onClick={handleAdd}>Add Another Promo</Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          )}
        </Modal>
        <Navbar product={true} login={true} admin={true} />
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
              <div className={styles.boxLeftPromo}>
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
                <Form.Group className={styles.formRow1}>
                  <Form.Label className={styles.textLabel}>
                    Enter the discount :
                  </Form.Label>
                  <Dropdown className={styles.placeholder2}>
                    <div className={styles.dropdownSort1}>
                      <Dropdown.Toggle
                        variant="#fff"
                        title="product"
                        id="dropdown-basic"
                        className={styles.titleSort2}
                      >
                        <h1 className={styles.textFormDropdown}>{label}</h1>
                      </Dropdown.Toggle>
                    </div>
                    <Dropdown.Menu className={styles.menuDropdown1}>
                      {discount.map((item, index) => {
                        return (
                          <Dropdown.Item
                            title="coffe"
                            key={index}
                            className={styles.listDiscount}
                            onClick={() => handleClickDiscount(item)}
                          >
                            {item}%
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
                <Form.Group className={styles.formRow1}>
                  <Form.Label className={styles.textLabel}>
                    Expire date :
                  </Form.Label>
                  <FormControl
                    type="date"
                    placeholder="DD/MM/YY"
                    className={styles.placeholder3}
                    name="promoExpiredStart"
                    value={form.promoExpiredStart}
                    onChange={(e) => changeText(e)}
                    required
                  />
                  <FormControl
                    type="date"
                    placeholder="DD/MM/YY"
                    className={styles.placeholder3}
                    name="promoExpiredEnd"
                    value={form.promoExpiredEnd}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7} className={styles.right}>
              <Form className={`${styles.formPromo} d-flex`}>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>Name :</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Type product name max. 20 characters"
                    className={styles.placeholder}
                    maxLength="20"
                    aria-label="Search"
                    name="promoName"
                    value={form.promoName}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
                <div className={styles.boxFormRow}>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Min Total Price :
                    </Form.Label>
                    <FormControl
                      type="number"
                      step="1000"
                      placeholder="Type the min total price"
                      className={styles.placeholder}
                      name="promoMinPrice"
                      value={form.promoMinPrice}
                      onChange={(e) => changeText(e)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Max Discount :
                    </Form.Label>
                    <FormControl
                      type="number"
                      step="1000"
                      placeholder="Type the max discount"
                      className={styles.placeholder}
                      name="promoMaxDiscount"
                      value={form.promoMaxDiscount}
                      onChange={(e) => changeText(e)}
                      required
                    />
                  </Form.Group>
                </div>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>
                    Input promo code :
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Type the promo code"
                    className={styles.placeholder}
                    name="promoCode"
                    value={form.promoCode}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>
                    Description :
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Describe your product min. 150 characters"
                    className={styles.placeholder}
                    name="promoDesc"
                    value={form.promoDesc}
                    onChange={(e) => changeText(e)}
                    required
                  />
                </Form.Group>
                <Button
                  className={`${styles.btnSave1} btn-secondary`}
                  onClick={() => handleSave()}
                >
                  Save Promo
                </Button>
                <Button variant="fff" className={styles.btnCancel1}>
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Layout>
  );
}
