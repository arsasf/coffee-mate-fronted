/* eslint-disable @next/next/no-img-element */
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "styles/ManageOrder.module.css";
import SwiperCore, { EffectCube, Pagination } from "swiper/core";
import { CreditCard, Bank, Car, CaretRight } from "phosphor-react";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { useState } from "react";

SwiperCore.use([EffectCube, Pagination]);

export default function App() {
  const [card, setCard] = useState(false);
  const [bank, setBank] = useState(false);
  const [cod, setCod] = useState(false);

  const handleClick = (param1) => {
    if (param1 === "bank") {
      setBank(true);
      setCard(false);
      setCod(false);
    } else if (param1 === "card") {
      setCard(true);
      setCod(false);
      setBank(false);
    } else if (param1 === "cod") {
      setCod(true);
      setBank(false);
      setCard(false);
    }
  };
  return (
    <>
      <Layout title="Manage Order">
        <Navbar login={true} admin={true} order={true} />
        <Container fluid className={styles.container}>
          <Container>
            <Swiper
              effect={"cube"}
              grabCursor={true}
              cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
              }}
              pagination={true}
              className={styles.swiperContainer}
            >
              <SwiperSlide className={styles.swiperSlide}>
                <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
                  <Col xs={12} md={12} lg={6} className={styles.left}>
                    <h1 className={styles.textTitle}>
                      Finish your <br /> customer order now.
                    </h1>
                    <div className={styles.card}>
                      <h1 className={styles.textCardTitle}>
                        {"Delivery Order"}
                      </h1>
                      <h1 className={styles.textName}>{"for Zulaikha"}</h1>
                      <div className={styles.cart}>
                        <div className={styles.boxCart}>
                          <img
                            src="https://swiperjs.com/demos/images/nature-1.jpg"
                            alt=""
                            className={styles.img}
                          />
                          <div className={styles.boxDesc}>
                            <h1 className={styles.textDesc}>Hazelnut Latte</h1>
                            <h1 className={styles.textDesc}>x 1</h1>
                            <h1 className={styles.textDesc}>Regular</h1>
                          </div>
                          <h1 className={styles.textPrice}>IDR 24.0</h1>
                        </div>
                        <div className={styles.boxCart}>
                          <img
                            src="https://swiperjs.com/demos/images/nature-1.jpg"
                            alt=""
                          />
                          <div className={styles.boxDesc}>
                            <h1 className={styles.textDesc}>Hazelnut Latte</h1>
                            <h1 className={styles.textDesc}>x 1</h1>
                            <h1 className={styles.textDesc}>Regular</h1>
                          </div>
                          <h1 className={styles.textPrice}>IDR 24.0</h1>
                        </div>
                      </div>
                      <hr />
                      <div className={styles.boxTotal}>
                        <div className={styles.boxOrder}>
                          <h1 className={styles.textOrder}>SUBTOTAL</h1>
                          <h1 className={styles.textOrder}>TAX & FEES</h1>
                          <h1 className={styles.textOrder}>SHIPPING</h1>
                        </div>
                        <div className={styles.boxOrder}>
                          <h1 className={styles.textOrder}>IDR 120.000</h1>
                          <h1 className={styles.textOrder}>IDR 20.000</h1>
                          <h1 className={styles.textOrder}>{"IDR 10.000"}</h1>
                        </div>
                      </div>
                      <div className={styles.boxTotal}>
                        <h1 className={styles.textTotal}>TOTAL</h1>
                        <h1 className={styles.textTotal}>{"IDR 150.000"}</h1>
                      </div>
                    </div>
                    <Button className={`${styles.buttonSwipe}`}>
                      Slide to see upcoming orders
                      <CaretRight size={30} />
                    </Button>
                  </Col>
                  <Col xs={12} md={12} lg={6} className={styles.right}>
                    <div className={styles.boxTitle}>
                      <h1 className={styles.textRight}>Address details</h1>
                    </div>
                    <div className={styles.boxAddress}>
                      <h1 className={styles.textAddress1}>
                        <b> Delivery</b> to Iskandar Street
                      </h1>
                      <hr />
                      <h1 className={styles.textAddress2}>
                        Km 5 refinery road oppsite re public road, effurun,
                        Jakarta
                      </h1>
                      <hr />
                      <h1 className={styles.textAddress2}>+62 81348287878</h1>
                    </div>
                    <div>
                      <h1 className={styles.boxTitle2}>Payment Method</h1>
                    </div>
                    <div className={styles.payment}>
                      <div className={styles.boxIcon}>
                        <input
                          type="radio"
                          className={
                            card === true ? `${styles.radioCard}` : styles.radio
                          }
                          onClick={() => handleClick("card")}
                        />
                        <div className={styles.textRadio}>
                          <div className={styles.icon}>
                            <CreditCard
                              color="#ffffff"
                              weight="bold"
                              size={25}
                            />
                          </div>
                          <h1 className={styles.textIcon}>Card</h1>
                        </div>
                      </div>
                      <hr />
                      <div className={styles.boxIcon}>
                        <input
                          type="radio"
                          className={
                            bank === true ? `${styles.radioBank}` : styles.radio
                          }
                          onClick={() => handleClick("bank")}
                        />
                        <div className={styles.textRadio}>
                          <div className={styles.icon2}>
                            <Bank color="#ffffff" weight="bold" size={25} />
                          </div>
                          <h1 className={styles.textIcon}>Bank account</h1>
                        </div>
                      </div>
                      <hr />
                      <div className={styles.boxIcon}>
                        <input
                          type="radio"
                          className={
                            cod === true ? `${styles.radioCod}` : styles.radio
                          }
                          onClick={() => handleClick("cod")}
                        />
                        <div className={styles.textRadio}>
                          <div className={styles.icon3}>
                            <Car color="#000" weight="bold" size={25} />
                          </div>
                          <h1 className={styles.textIcon}>Cash on delivery</h1>
                        </div>
                      </div>
                    </div>
                    <Button className={`${styles.buttonDone} btn-secondary`}>
                      Mark as done
                    </Button>
                  </Col>
                </Row>
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <img
                  src="https://swiperjs.com/demos/images/nature-2.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <img
                  src="https://swiperjs.com/demos/images/nature-3.jpg"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide className={styles.swiperSlide}>
                <img
                  src="https://swiperjs.com/demos/images/nature-4.jpg"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </Container>
        </Container>
        <Footer />
      </Layout>
    </>
  );
}
