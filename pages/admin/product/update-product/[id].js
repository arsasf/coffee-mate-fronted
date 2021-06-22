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
} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NewProduct() {
  const router = useRouter();
  const [title, setTitle] = useState("Add Product");
  const [label, setLabel] = useState("Select Category");
  const [category, setCategory] = useState([
    "Select Category",
    "Coffe",
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

  const handleClick = (params1, params2) => {
    router.push(params1);
    setTitle(params2);
  };

  const handleClickCategory = (param) => {
    setLabel(param);
  };

  const handleClickSize = (param) => {
    if (param === "R" || param === "L" || param === "XL") {
      setActive("coffee");
    } else if (param === 250 || param === 300 || param === 500) {
      setActive("food");
    } else {
      setActive(false);
    }
  };
  return (
    <Layout title="Update Product">
      <div>
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
              <div className={styles.boxLeft}>
                <div className={styles.boxImage}>
                  <Image
                    src="/product/camera.png"
                    width="90px"
                    height="83px"
                    alt=""
                    className={styles.img}
                  />
                </div>
                <Form.Group className={styles.formUserImage}>
                  <Form.Label htmlFor="files" className={styles.boxUpdateImage}>
                    Choose from gallery
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="files"
                    // onChange={(event) => handleImage(event)}
                    className={styles.updateImage}
                  />
                  <Button className={styles.btnChoose}>
                    Choose from gallery
                  </Button>
                </Form.Group>
                <Button className={`${styles.btnSave} btn-secondary`}>
                  Update Product
                </Button>
                <Button variant="fff" className={styles.btnCancel}>
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
                    placeholder="Type product name min. 50 characters"
                    className={styles.placeholder}
                    aria-label="Search"
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
                        >
                          {label}
                        </Dropdown.Toggle>
                      </div>
                      <Dropdown.Menu className={styles.menuDropdown1}>
                        {category.map((item, index) => {
                          return (
                            <Dropdown.Item
                              key={index}
                              className={styles.listDiscount}
                              onClick={() => handleClickCategory(item)}
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
                          className={`${styles.buttonCoffee} ${
                            active === item.category
                              ? "btn-secondary"
                              : "btn-primary"
                          }`}
                          onClick={() => handleClickSize(item.size)}
                        >
                          {item.size}
                        </Button>
                      );
                    })}

                    {sizeFood.map((item, index) => {
                      return (
                        <Button
                          key={index}
                          variant="fff"
                          className={`${styles.buttonFood} ${
                            active === "food"
                              ? "btn-secondary"
                              : `${styles.buttonFood}`
                          }`}
                          onClick={() => handleClickSize(item.size)}
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
