/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import styles from "styles/ProductDetails.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { Row, Col } from "react-bootstrap";
import { authPage, customerPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import { useState, useEffect } from "react";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await customerPage(context);
  const { id } = context.query;

  const user = await axiosApiIntances
    .get(`user/by-id/${data.userId}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return [];
    });

  const product = await axiosApiIntances
    .get(`product/by-id/${id}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      console.log(res);
      return res.data.data[0];
    })
    .catch((err) => {
      return {};
    });

  return {
    props: { product, id, user },
  };
}

export default function ProductDetails(props) {
  const [size, setSize] = useState("R");
  const [price, setPrice] = useState(props.product.product_base_price);
  const [count, setCount] = useState(1);
  const data = props.product.product_size.split(", ");
  // const [formProductData, setFormProductData] = useState({
  //   userId: "",
  //   productId: "",
  //   productPrice: "",
  //   productQty: "",
  //   productSize: "",
  // });

  const handleCheckOut = () => {
    const data = {
      userId: props.user.user_id,
      productId: props.product.product_id,
      productPrice: price,
      productQty: count,
      productSize: size,
    };
    axiosApiIntances.post("cart/", data).then((res) => {
      console.log(res);
    });
  };
  const [initialPrice, setInitialPrice] = useState(
    props.product.product_base_price
  );
  const handleProductSize = (event) => {
    console.log(event);
    setCount(1);
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
                <button className={`${styles.buttonCart} btn btn-secondary`}>
                  Add to Cart
                </button>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7} className={styles.right}>
              <div className={styles.chooseSizeSection}>
                <p>{props.product.product_desc}</p>
                <h5>Choose a size</h5>
                <div className={styles.boxSize}>
                  {data.map((size, index) => {
                    return (
                      <button
                        key={index}
                        className={`${styles.right_circle_button} btn-primary rounded-circle`}
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
                    <p className={styles.size}>{count}</p>
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
