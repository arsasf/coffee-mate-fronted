/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import styles from "styles/ProductDetails.module.css";
import { AiOutlineArrowRight } from "react-icons/ai";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { Row, Col } from "react-bootstrap";

export default function ProductDetails() {
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
                  &gt; Cold Brew
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
                <h1 className={styles.textDrink}>COLD BREW</h1>
                <p className={styles.textPrice}>IDR 30.000</p>
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
                  Cold brewing is a method of brewing that combines ground
                  coffee and cool water and uses time instead of heat to extract
                  the flavor. it is brewed in small batches and steeped for as
                  long as 48 hours
                </p>
                <h5 className={styles.textRight2}>Choose a size</h5>
                <div className={styles.boxSize}>
                  <button
                    className={`${styles.right_circle_button} btn-primary rounded-circle`}
                  >
                    R
                  </button>
                  <button
                    className={`${styles.right_circle_button} btn-primary rounded-circle`}
                  >
                    L
                  </button>
                  <button
                    className={`${styles.right_circle_button} btn-primary rounded-circle`}
                  >
                    XL
                  </button>
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
                  <h4 className={styles.textRight4}>COLD BREW</h4>
                  <div className={styles.buttonCounter}>
                    <button className={`${styles.buttonMinus} btn btn-primary`}>
                      -
                    </button>
                    <p className={styles.size}>0</p>
                    <button className={`${styles.buttonPlus} btn btn-primary`}>
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.boxCheckout}>
                  <h4 className={styles.textRight3}>Checkout</h4>
                  <button className={`${styles.buttonPlus} btn btn-primary`}>
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
