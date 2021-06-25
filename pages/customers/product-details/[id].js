/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axiosApiIntances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/ProductDetails.module.css";
import { Row, Col } from "react-bootstrap";
import { authPage, customerPage } from "middleware/authPage";
import { ShoppingCart } from "phosphor-react";
import { Button, Modal } from "react-bootstrap";
import { AiOutlineArrowRight } from "react-icons/ai";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  const { id } = context.query;
  const authorization = {
    Authorization: `Bearer ${data.token || ""}`,
  };

  const user = await axiosApiIntances
    .get(`user/by-id/${data.userId}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch(() => {
      return [];
    });

  const product = await axiosApiIntances
    .get(`product/by-id/${id}`, {
      headers: authorization,
    })
    .then((res) => {
      console.log(res);
      return res.data.data[0];
    })
    .catch(() => {
      return {};
    });

  return {
    props: { product, id, user },
  };
};

export default function ProductDetails(props) {
  const router = useRouter();
  const data = props.product.product_size.split(", ");

  const [size, setSize] = useState("R");
  const [count, setCount] = useState(1);
  const [modal, setModal] = useState(false);
  const [price, setPrice] = useState(props.product.product_base_price);
  const [initialPrice, setInitialPrice] = useState(
    props.product.product_base_price
  );

  const handleAddToChart = () => {
    const data = {
      userId: props.user.user_id,
      productId: props.product.product_id,
      productPrice: price,
      productQty: count,
      productSize: size,
    };
    axiosApiIntances
      .post("cart/", data)
      .then((res) => {
        setModal(true);
      })
      .catch((err) => {
        window.alert(err.response.data.msg);
      });
  };

  const handleCheckOut = () => {
    const data = {
      userId: props.user.user_id,
      productId: props.product.product_id,
      productPrice: price,
      productQty: count,
      productSize: size,
    };
    axiosApiIntances.post("cart/", data).then((res) => {
      router.push("/customers/payment-details");
    });
  };

  const handleProductSize = (event) => {
    if (event === "R") {
      setPrice(props.product.product_base_price);
      setInitialPrice(props.product.product_base_price);
      setSize("R");
    } else if (event === "L") {
      setPrice(props.product.product_base_price + 3000);
      setInitialPrice(props.product.product_base_price + 3000);
      setSize("L");
    } else {
      setPrice(props.product.product_base_price + 5000);
      setInitialPrice(props.product.product_base_price + 5000);
      setSize("XL");
    }
  };

  const handleQuantityIncrease = () => {
    setCount(count + 1);
    setPrice(price + initialPrice);
  };

  const handleQuantityDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(price - initialPrice);
    }
  };

  return (
    <div>
      <Layout title="Product Details">
        <Navbar product={true} login={true} />

        <div className={`${styles.container}`}>
          <Modal
            size="md"
            show={modal}
            onHide={() => {
              setModal(false);
              setCount(1);
              setSize("R");
              setPrice(props.product.product_base_price);
              setInitialPrice(props.product.product_base_price);
            }}
            aria-labelledby="example-modal-sizes-title-sm"
            centered
          >
            <Modal.Header>
              <Modal.Title id="example-modal-sizes-title-md">
                <div className="d-flex flex-row align-items-center me-2">
                  <ShoppingCart width="bold" className="me-2" />
                  <span>Added To Your Cart</span>
                </div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body className="text-start py-5">
              <p>
                Product has stored to your cart. Do you want to choose another
                size or find another product?
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                style={{ padding: "1em 0", width: "100%" }}
                variant="light"
                onClick={() => {
                  setModal(false);
                  setCount(1);
                  setSize("R");
                  setPrice(props.product.product_base_price);
                  setInitialPrice(props.product.product_base_price);
                }}
              >
                Choose another size
              </Button>
              <Button
                style={{ padding: "1em 0", width: "100%" }}
                variant="primary"
                onClick={() => {
                  setModal(false);
                  router.push("/customers/product/all");
                }}
              >
                Find another product
              </Button>
            </Modal.Footer>
          </Modal>
          <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3 py-5">
            <Col xs={12} md={4} lg={5} className={styles.left}>
              <p className={styles.textPromo}>
                Favorite &amp; Promo
                <span>&gt; {props.product.product_name}</span>
              </p>
              <div className={`${styles.row}`}>
                <div className={styles.lgImageContainer}>
                  <img
                    src={
                      props.product.product_image
                        ? `http://localhost:3005/backend5/api/${props.product.product_image}`
                        : "/default-img-placeholder.png"
                    }
                    alt="coffee brew"
                  />
                </div>
              </div>
              <div className={`${styles.row} row my-5`}>
                <h1 className={styles.textDrink}>
                  {props.product.product_name}
                </h1>
                <p className={styles.textPrice}>
                  IDR {price.toLocaleString("id-ID")}
                </p>
              </div>
              <div className={`${styles.row} row`}>
                <button
                  className={`${styles.buttonCart} btn btn-secondary`}
                  onClick={handleAddToChart}
                >
                  Add to Cart
                </button>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7} className={styles.right}>
              <div className={styles.chooseSizeSection}>
                <p>
                  {props.product.product_desc
                    ? props.product.product_desc
                    : "No description for this product."}
                </p>
                <h5>Choose a size</h5>
                <div className={styles.boxSize}>
                  {data.map((size, index) => {
                    return (
                      <button
                        key={index}
                        className="btn-primary rounded-circle"
                        onClick={() => handleProductSize(size)}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={`${styles.checkoutSection}`}>
                <div className={styles.smImageContainer}>
                  <img
                    src={
                      props.product.product_image
                        ? `http://localhost:3005/backend5/api/${props.product.product_image}`
                        : "/default-img-placeholder.png"
                    }
                    alt="coffee brew"
                  />
                </div>
                <div className={styles.countProduct}>
                  <h4>{props.product.product_name}</h4>
                  <div className={styles.btnCount}>
                    <button
                      className={`${styles.minus} btn btn-primary`}
                      onClick={handleQuantityDecrease}
                    >
                      -
                    </button>
                    <p className={styles.quantity}>{count}</p>
                    <button
                      className={`${styles.plus} btn btn-primary`}
                      onClick={handleQuantityIncrease}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.boxCheckout}>
                  <h4>Checkout</h4>
                  <button
                    className={`${styles.btnCheckout} btn btn-primary`}
                    onClick={handleCheckOut}
                  >
                    <AiOutlineArrowRight className={styles.arrow} />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Footer />
      </Layout>
    </div>
  );
}
