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
  const [category, setCategory] = useState("Select category");
  const [active, setActive] = useState(false);

  const handleClick = (params1, params2) => {
    router.push(params1);
    setTitle(params2);
  };

  const handleClickCategory = (param) => {
    if (param === "coffee") {
      setCategory("Coffee");
    } else if (param === "noncoffee") {
      setCategory("Non Coffee");
    } else if (param === "food") {
      setCategory("Food");
    } else {
      setCategory("Add On");
    }
  };

  const handleClickSize = (param) => {
    if (param === "R" || param === "L" || param === "XL") {
      setActive("coffee");
    } else if (param === "250gr" || param === "300gr" || param === "500gr") {
      setActive("food");
    } else {
      setActive(false);
    }
  };
  return (
    <Layout title="New Product">
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
              <Dropdown.Item
                className={styles.listSort}
                onClick={() => handleClick("/admin/new-product", "Add Product")}
              >
                Add Product
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.listSort}
                onClick={() =>
                  handleClick("/admin/update-product/:id", "Update Product")
                }
              >
                Update Product
              </Dropdown.Item>
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
                  Save Product
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
                      type="text"
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
                          {category}
                        </Dropdown.Toggle>
                      </div>
                      <Dropdown.Menu className={styles.menuDropdown1}>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() => handleClickCategory("coffee")}
                        >
                          Coffee
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() => handleClickCategory("noncoffee")}
                        >
                          Non Coffee
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() => handleClickCategory("food")}
                        >
                          Food
                        </Dropdown.Item>
                        <Dropdown.Item
                          className={styles.listSort}
                          onClick={() => handleClickCategory("addon")}
                        >
                          Add On
                        </Dropdown.Item>
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
                    <Button
                      className={`${styles.buttonCoffee} ${
                        active === "coffee" ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={() => handleClickSize("R")}
                    >
                      R
                    </Button>
                    <Button
                      className={`${styles.buttonCoffee} ${
                        active === "coffee" ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={() => handleClickSize("L")}
                    >
                      L
                    </Button>
                    <Button
                      className={`${styles.buttonCoffee} ${
                        active === "coffee" ? "btn-secondary" : "btn-primary"
                      }`}
                      onClick={() => handleClickSize("XL")}
                    >
                      XL
                    </Button>
                    <Button
                      variant="fff"
                      className={`${styles.buttonFood} ${
                        active === "food"
                          ? "btn-secondary"
                          : `${styles.buttonFood}`
                      }
                      `}
                      onClick={() => handleClickSize("250gr")}
                    >
                      250 gr
                    </Button>
                    <Button
                      variant="fff"
                      className={`${styles.buttonFood} ${
                        active === "food"
                          ? "btn-secondary"
                          : `${styles.buttonFood}`
                      }
                      `}
                      onClick={() => handleClickSize("300gr")}
                    >
                      300 gr
                    </Button>
                    <Button
                      variant="fff"
                      className={`${styles.buttonFood} ${
                        active === "food"
                          ? "btn-secondary"
                          : `${styles.buttonFood}`
                      }
                      `}
                      onClick={() => handleClickSize("500gr")}
                    >
                      500 gr
                    </Button>
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer home={true} />
      </div>
    </Layout>
  );
}
