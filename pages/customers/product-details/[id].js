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
        <div className={`${styles.container} container`}>
          <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
            <Col xs={12} md={4} lg={5}>
              <p>
                Favorite &amp; Promo
                <span className={styles.left_column_text_1}>
                  {"  "} &gt; Cold Brew
                </span>
              </p>
              <div className="row">
                <div className="col justify-content-center">
                  <img
                    src="/default-cold-brew.png"
                    alt="coffee brew"
                    className={`${styles.left_column_image} rounded-circle`}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col text-center mt-3">
                  <h1>COLD BREW</h1>
                  <p>IDR 30.000</p>
                </div>
              </div>
              <div className="row">
                <div className="col text-center mt-3">
                  <button className="btn btn-secondary">Add to Cart</button>
                </div>
              </div>
            </Col>
            <Col xs={12} md={8} lg={7}>
              <div className="row">
                <div className={`${styles.right_column_1} col bg-light`}>
                  <p className="ms-3 mt-3">
                    Cold brewing is a method of brewing that combines ground
                    coffee and cool water and uses time instead of heat to
                    extract the flavor. it is brewed in small batches and
                    steeped for as long as 48 hours
                  </p>
                  <div className="row text-center mb-3">
                    <div className="col">
                      <h5>Choose a size</h5>
                    </div>
                  </div>
                  <div className="row text-center mb-3">
                    <div className="col">
                      <button
                        className={`${styles.right_circle_button} btn-primary rounded-circle`}
                      >
                        R
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className={`${styles.right_circle_button} btn-primary rounded-circle`}
                      >
                        L
                      </button>
                    </div>
                    <div className="col">
                      <button
                        className={`${styles.right_circle_button} btn-primary rounded-circle`}
                      >
                        XL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div
                  className={`${styles.right_column_1} col mt-4 bg-light shadow`}
                >
                  <div className="row my-3 ml-3">
                    <div className="col-3">
                      <img
                        src="/default-cold-brew.png"
                        alt="coffee brew"
                        className={`${styles.right_circle_image} rounded-circle`}
                      />
                    </div>
                    <div className="col-3 my-2">
                      <h4 className="text-center">COLD BREW</h4>
                      <div className="row">
                        <div className="col">
                          <button className="btn btn-primary rounded-circle">
                            -
                          </button>
                        </div>
                        <div className="col-1 my-2">
                          <p>0</p>
                        </div>
                        <div className="col">
                          <button className="btn btn-primary rounded-circle ms-3">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-4 ms-5">
                      <div className="row">
                        <div className="col">
                          <h4 className="my-4">Checkout</h4>
                        </div>
                        <div className="col">
                          <button className="btn btn-primary rounded-circle ms-3 my-4">
                            <AiOutlineArrowRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
