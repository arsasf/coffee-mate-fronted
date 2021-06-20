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

export default function NewPromo() {
  const router = useRouter();
  const [title, setTitle] = useState("Add Promo");
  const [label, setLabel] = useState("0%");
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

  const handleClick = (params1, params2) => {
    router.push(params1);
    setTitle(params2);
  };

  const handleClickDiscount = (param) => {
    setLabel(`${param}%`);
  };
  return (
    <Layout title="New Promo">
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
              <div className={styles.boxLeftPromo}>
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
                  />
                  <FormControl
                    type="date"
                    placeholder="DD/MM/YY"
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
                    className={styles.placeholder}
                  />
                </Form.Group>
                <Button className={`${styles.btnSave1} btn-secondary`}>
                  Save Promo
                </Button>
                <Button variant="fff" className={styles.btnCancel1}>
                  Cancel
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer home={true} />
      </div>
    </Layout>
  );
}
