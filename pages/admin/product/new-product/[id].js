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
import { authPage, adminPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import { AiOutlinePropertySafety } from "react-icons/ai";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  // console.log(data);
  await adminPage(context);
  const id = context.query.id;
  const result = await axiosApiIntances
    .get(`/user/by-id/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.config.headers);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  const resultProduct =
    id === "0"
      ? {}
      : await axiosApiIntances
          .get(`/product/by-id/${id}`, {
            headers: {
              Authorization: `Bearer ${data.token || ""}`,
            },
          })
          .then((res) => {
            // console.log(res.config.headers);
            return res.data.data[0];
          })
          .catch((err) => {
            console.log(err);
            return {};
          });
  return {
    props: { data: result, userLogin: data, product: resultProduct },
  };
}

export default function NewProduct(props) {
  const router = useRouter();
  const [title, setTitle] = useState("Add Product");
  const [label, setLabel] = useState("Select Category");
  const [category] = useState([
    "Select Category",
    "Coffee",
    "Non Coffee",
    "Food",
    "Add On",
  ]);
  const [active, setActive] = useState(false);
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
  const [image, setImage] = useState(
    !props.product.product_id ? null : props.product.product_image
  );

  const [form, setForm] = useState({
    productName: "",
    productPrice: 0,
    productCategory: "",
    productDesc: "",
    productSize: "",
  });
  const [uplod, setUpload] = useState({
    productImage: `${process.env.API_IMG_URL}${image}`,
    imageUser: image,
  });
  const [msg, setMsg] = useState("");
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [idProduct, setIdProduct] = useState(
    !props.product.product_id ? "" : props.product.product_id
  );

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

  const handleImage = (event) => {
    console.log("upload");
    setUpload({
      productImage: URL.createObjectURL(event.target.files[0]),
      imageUser: event.target.files[0],
    });
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("productPrice", form.productPrice);
    formData.append("productCategory", form.productCategory);
    formData.append("productSize", form.productSize);
    formData.append("productDesc", form.productDesc);
    formData.append("imageUser", event.target.files[0]);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    axiosApiIntances
      .post("product/", formData, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        console.log(res);
        setShow(true);
        setInfo("UPLOAD IMAGE PRODUCT");
        setImage(res.data.data.product_image);
        setIdProduct(res.data.data.id);
        setMsg("Upload Image Product Succsess !");
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : UPLOAD IMAGE");
        setMsg(err.response.data.msg);
      });
  };

  const handleChangeImage = (event) => {
    console.log("update");
    setUpload({
      productImage: URL.createObjectURL(event.target.files[0]),
      imageUser: event.target.files[0],
    });
    const id = idProduct;
    console.log(id);
    const formData = new FormData();
    formData.append("imageUser", event.target.files[0]);

    //* ==================== Check Form Data ===================== */
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }
    //* ======================== End ============================== */

    axiosApiIntances
      .patch(`product/img/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((result) => {
        console.log(result);
        setShow(true);
        setInfo("UPLOAD IMAGE PRODUCT");
        setImage(result.data.data.product_image);
        setMsg("Change Image Product Succsess !");
        router.push(`/admin/new-product/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : UPLOAD IMAGE");
        setMsg(err.response.data.msg);
      });
  };

  const resetData = () => {
    setForm({
      productName: "",
      productPrice: 0,
      productCategory: "",
      productDesc: "",
      productSize: "",
    });
  };
  const handleSave = () => {
    console.log(form);
    const id = props.product.product_id;
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
      const data = {
        productName: form.productName,
        productPrice: parseInt(form.productPrice),
        productCategory: form.productCategory,
        productDesc: form.productDesc,
        productSize: form.productSize,
      };
      // console.log("running", data, form);
      axiosApiIntances
        .patch(`product/${id}`, data, {
          headers: {
            Authorization: `Bearer ${props.userLogin.token || ""}`,
          },
        })
        .then((result) => {
          console.log(result);
          setShow(true);
          setInfo("ADD PRODUCT");
          setMsg(`Success add product with id : ${id}!`);
          router.push(`/admin/new-product/${id}`);
          setAdd(true);
        })
        .catch((err) => {
          console.log(err);
          setAdd(false);
          setShow(true);
          setInfo("ERROR : ADD PRODUCT");
          setMsg(err.response.data.msg);
          resetData();
        });
    }
  };
  const changeText = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    if (idProduct === "") {
      router.push(`/admin/new-product/0`);
      setShow(false);
    } else if (
      info === "ERROR : ADD PRODUCT" ||
      info === "ERROR : UPLOAD IMAGE" ||
      info === "UPLOAD IMAGE PRODUCT"
    ) {
      router.push(`/admin/new-product/${idProduct}`);
      setShow(false);
    } else {
      router.push("/admin/product");
      setShow(false);
    }
  };

  const handleAdd = () => {
    setImage(null);
    setIdProduct("");
    setActive(false);
    setAdd(false);
    router.push(`/admin/new-product/0`);
    setShow(false);
    resetData();
  };

  const handleBack = () => {
    router.push(`/admin/product`);
    setShow(false);
  };

  const handleDelete = () => {
    console.log(idProduct);
    axiosApiIntances
      .delete(`product/${idProduct}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((result) => {
        console.log(result);
        router.push(`/admin/product`);
        resetData();
      })
      .catch((err) => {
        console.log(err);
        router.push(`/admin/product`);
        resetData();
      });
  };

  return (
    <Layout title="New Product">
      <div>
        {/* {console.log(image, cancel, form)} */}
        <Modal show={show} className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>INFO {info}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>{msg}</Modal.Body>
          {add === true ? (
            <Modal.Footer>
              <Button onClick={handleBack}>Go to Product Page</Button>
              <Button onClick={handleAdd}>Add Product Again</Button>
            </Modal.Footer>
          ) : (
            <Modal.Footer>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          )}
        </Modal>
        <Navbar product={true} login={true} admin={true} user={props.data} />
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
                  <Image
                    src={
                      image === null
                        ? "/product/camera.png"
                        : `${process.env.API_IMG_URL}${image}`
                    }
                    width={image === null ? "90px" : "250px"}
                    height={image === null ? "83px" : "250px"}
                    alt=""
                    className={image === null ? styles.img : styles.img1}
                  />
                </div>
                <Form.Group className={styles.formUserImage}>
                  {console.log(idProduct)}
                  <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
                    {idProduct !== ""
                      ? "Change image product"
                      : "Choose from gallery"}
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="files"
                    onChange={
                      idProduct === ""
                        ? (event) => handleImage(event)
                        : (event) => handleChangeImage(event)
                    }
                    className={styles.updateImage}
                  />
                  <Button className={styles.btnChoose}>
                    {idProduct !== ""
                      ? "Change image product"
                      : "Choose from gallery"}
                  </Button>
                </Form.Group>
                <Button
                  className={`${styles.btnSave} btn-secondary`}
                  onClick={() => handleSave(image)}
                >
                  Save Product
                </Button>
                <Button
                  variant="fff"
                  className={styles.btnCancel}
                  onClick={
                    idProduct === ""
                      ? () => router.push("/admin/product")
                      : () => handleDelete()
                  }
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
                      step="1"
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
