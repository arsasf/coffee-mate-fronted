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
  console.log(data);

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
  console.log(props);

  const [size, setSize] = useState("");
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
    console.log(data);
    axiosApiIntances.post("cart/", data).then((res) => {
      console.log(res);
    });
  };

  const handleProductSize = (event) => {
    console.log(event);
    setCount(1);
    if (event === "R") {
      setPrice(props.product.product_base_price);
      setSize("R");
    } else if (event === "L") {
      setPrice(props.product.product_base_price + 3000);
      setSize("L");
    } else {
      setPrice(props.product.product_base_price + 5000);
      setSize("XL");
    }
  };

  const handleQuantityIncrease = () => {
    setCount(count + 1);
    setPrice(price * (count + 1));
  };

  const handleQuantityDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setPrice(price * (count - 1));
    }
  };

  console.log(price);

  return (
    <div>
      <Layout title="Product Details">
        <Navbar product={true} login={true} />
        <div className={`${styles.container} container-fluid`}>
          <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
            <Col xs={12} md={4} lg={5} className={styles.left}>
              <p className={styles.textPromo}>
                Favorite &amp; Promo
                <span className={styles.left_column_text_1}>
                  &gt; {props.product.product_name}
                </span>
              </p>
              <div className={`${styles.row} row`}>
                <div className="row justify-content-center">
                  <img
                    src="/default-cold-brew.png"
                    alt="coffee brew"
                    className={`${styles.left_column_image} rounded-circle`}
                  />
                </div>
              </div>
              <div className={`${styles.row} row`}>
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
              <div className={styles.boxRight1}>
                <p className={styles.textRight1}>
                  {props.product.product_desc}
                </p>
                <h5 className={styles.textRight2}>Choose a size</h5>
                <div className={styles.boxSize}>
                  {data.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className={`${styles.right_circle_button} btn-primary rounded-circle`}
                        onClick={() => handleProductSize(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className={`${styles.boxRight2}`}>
                <div className="col-3">
                  <img
                    src="/default-cold-brew.png"
                    alt="coffee brew"
                    className={`${styles.right_circle_image} rounded-circle`}
                  />
                </div>
                <div className={styles.boxCounter}>
                  <h4 className={styles.textRight4}>
                    {props.product.product_name}
                  </h4>
                  <div className={styles.buttonCounter}>
                    <button
                      className={`${styles.buttonMinus} btn btn-primary`}
                      onClick={handleQuantityDecrease}
                    >
                      -
                    </button>
                    <p className={styles.size}>{count}</p>
                    <button
                      className={`${styles.buttonPlus} btn btn-primary`}
                      onClick={handleQuantityIncrease}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.boxCheckout}>
                  <h4 className={styles.textRight3}>Checkout</h4>
                  <button
                    className={`${styles.buttonPlus} btn btn-primary`}
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
