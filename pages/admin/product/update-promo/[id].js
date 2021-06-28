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
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { adminPage, authPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await adminPage(context);
  const { id } = context.query;
  const user = await axiosApiIntances
    .get(`user/by-id/${data.userId}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return [];
    });

  const promo = await axiosApiIntances
    .get(`promo/by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.data.data[0]);
      return res.data.data[0];
    })
    .catch((err) => {
      return {};
    });

  return {
    props: { user, promo },
  };
}

export default function NewPromo(props) {
  console.log(props);

  const router = useRouter();
  const [title, setTitle] = useState("Update Promo");
  const [label, setLabel] = useState(props.promo.promo_discount);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [discount] = useState([
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
  ]);
  const [menuProduct] = useState([
    {
      link: "/admin/new-product",
      category: "Add Product",
    },
    {
      link: "/admin/new-promo",
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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const [form, setForm] = useState({
    promoName: props.promo.promo_name,
    promoMinPrice: props.promo.promo_min_price,
    promoMaxDiscount: props.promo.promo_max_discount,
    promoCode: props.promo.promo_code,
    promoDesc: props.promo.promo_desc,
    promoDiscountpersent: props.promo.promo_discount,
    promoExpiredStart: new Date(props.promo.promo_expire_start)
      .toISOString()
      .slice(0, 10),
    promoExpiredEnd: new Date(props.promo.promo_expire_end)
      .toISOString()
      .slice(0, 10),
  });
  const [imageUser, setImageUser] = useState(props.promo.promo_image);
  const handleClick = (params1, params2) => {
    router.push(params1);
    setTitle(params2);
  };
  var todayDate = new Date(props.promo.promo_expire_start)
    .toISOString()
    .slice(0, 10);
  console.log(todayDate);
  const handleClickDiscount = (param) => {
    setLabel(`${param}%`);
    setForm({
      ...form,
      promoDiscountpersent: `${param}%`,
    });
  };

  const changeText = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const resetData = () => {
    setForm({
      promoName: "",
      promoMinPrice: "",
      promoMaxDiscount: "",
      promoCode: "",
      promoDesc: "",
      promoDiscountpersent: "",
      promoExpiredStart: "",
      promoExpiredEnd: "",
    });
  };

  const handleUpdatePromo = () => {
    console.log(form);
    axiosApiIntances
      .patch(`promo/update-promo/${props.promo.promo_id}`, form)
      .then((res) => {
        // console.log(res);
        setShow(true);
        setInfo("UPDATE PROMO");
        setMsg(res.data.msg);
        resetData();
        resetData();
      })
      .catch((err) => {
        // console.log(err);
        setShow(true);
        setInfo("ERROR : UPDATE PROMO");
        setMsg(err.response.data.msg);
        resetData();
      });
  };

  const handleImage = (event) => {
    const formData = new FormData();
    formData.append("imageUser", event.target.files[0]);
    axiosApiIntances
      .patch(`promo/img/${props.promo.promo_id}`, formData)
      .then((res) => {
        // console.log(res);
        setShow(true);
        setImageUser(res.data.data.promo_image);
        setInfo("UPLOAD IMAGE PRODUCT");
        setMsg(res.data.msg);
        router.push(`/admin/update-promo/${props.promo.promo_id}`);
      })
      .catch((err) => {
        // console.log(err);
        setShow(true);
        setInfo("ERROR : UPLOAD IMAGE");
        setMsg(err.response.data.msg);
      });
  };

  const handleClose = () => {
    if (
      info === "ERROR : UPDATE PROMO" ||
      info === "ERROR : UPLOAD IMAGE" ||
      info === "UPLOAD IMAGE PRODUCT"
    ) {
      router.push(`/admin/update-promo/${props.promo.promo_id}`);
      setShow(false);
    } else {
      router.push("/admin/product/all");
      setShow(false);
    }
  };

  return (
    <Layout title="Update Promo">
      <div>
        <Navbar product={true} login={true} admin={true} />
        <Container fluid className={styles.container}>
          <Modal show={show} className={styles.modal}>
            <Modal.Header className={styles.modalHeader}>
              <Modal.Title className={styles.modalTitle}>
                INFO {info}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
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
                  <Image
                    src={
                      props.promo.promo_image !== ""
                        ? `${process.env.API_IMG_URL}${imageUser}`
                        : "/product/camera.png"
                    }
                    width={props.promo.promo_image === "" ? "90px" : "250px"}
                    height={props.promo.promo_image === "" ? "83px" : "250px"}
                    alt=""
                    className={
                      props.promo.promo_image === "" ? styles.img : styles.img1
                    }
                  />
                </div>
                <Form.Group className={styles.formUserImage}>
                  <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
                    Choose from gallery
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="files"
                    onChange={(event) => handleImage(event)}
                    className={styles.updateImage}
                  />
                  <Button className={styles.btnChoose}>
                    Choose from gallery
                  </Button>
                </Form.Group>
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
                    value={form.promoExpiredStart}
                    name="promoExpiredStart"
                    onChange={(event) => changeText(event)}
                    className={styles.placeholder3}
                  />
                  <FormControl
                    type="date"
                    placeholder="DD/MM/YY"
                    value={form.promoExpiredEnd}
                    name="promoExpiredEnd"
                    onChange={(event) => changeText(event)}
                    className={styles.placeholder3}
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
                    placeholder="Type product name min. 50 characters"
                    value={form.promoName}
                    name="promoName"
                    onChange={(event) => changeText(event)}
                    className={styles.placeholder}
                    aria-label="Search"
                  />
                </Form.Group>
                <div className={styles.boxFormRow}>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Min Total Price :
                    </Form.Label>
                    <FormControl
                      type="number"
                      step="1"
                      value={form.promoMinPrice}
                      name="promoMinPrice"
                      onChange={(event) => changeText(event)}
                      placeholder="Type the min total price"
                      className={styles.placeholder}
                    />
                  </Form.Group>
                  <Form.Group className={styles.formRow}>
                    <Form.Label className={styles.textLabel}>
                      Max Discount :
                    </Form.Label>
                    <FormControl
                      type="number"
                      step="1"
                      value={form.promoMaxDiscount}
                      name="promoMaxDiscount"
                      onChange={(event) => changeText(event)}
                      placeholder="Type the max discount"
                      className={styles.placeholder}
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
                    value={form.promoCode}
                    name="promoCode"
                    onChange={(event) => changeText(event)}
                    className={styles.placeholder}
                  />
                </Form.Group>
                <Form.Group className={styles.formGroup}>
                  <Form.Label className={styles.textLabel}>
                    Description :
                  </Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Describe your product min. 150 characters"
                    value={form.promoDesc}
                    name="promoDesc"
                    onChange={(event) => changeText(event)}
                    className={styles.placeholder}
                  />
                </Form.Group>
                <Button
                  className={`${styles.btnSave1} btn-secondary`}
                  onClick={() => handleUpdatePromo()}
                >
                  Update Promo
                </Button>
                <Button
                  variant="fff"
                  className={styles.btnCancel1}
                  onClick={() => router.push("/admin/product/all")}
                >
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
