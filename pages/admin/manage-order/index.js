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
import { authPage, customerPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";


SwiperCore.use([EffectCube, Pagination]);

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  // console.log(data.userId)

  // const res = await axiosApiIntances
  //   .get(`user/by-id/${data.userId}`, {
  //     headers: {
  //       Authorization: `Bearer ${data.token || ""}`,
  //     },
  //   })
  //   .then((res) => {
  //     return res.data.data[0]
  //   })
  //   .catch((err) => {
  //     return [];
  //   });
  // {
  //   headers: {
  //     Authorization: `Bearer ${data.token || ""}`,
  //   },
  // }
  const resres = await axiosApiIntances
    .get(`/cart`,)
    .then((resres) => {
      // Console.log(data)
      return resres.data.data
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { user: resres },
  };
};


export default function App(props) {
  console.log(props);

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
            <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
              <Col xs={12} md={12} lg={6} className={styles.left}>
                <h1 className={styles.textTitle}>
                  Finish your <br /> customer order now.
                </h1>
                <Row>


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
                    {props.user.map((item, index) => {
                      console.log(item)
                      return (
                        <Col key={index}>
                          lsdfsf
                          <SwiperSlide className={styles.swiperSlide}>
                            <div className={styles.card}>
                              <h1 className={styles.textCardTitle}>
                                {"Delivery Order"}
                              </h1>
                              <h1 className={styles.textName}>{item.user_name}</h1>
                              <div className={styles.cart}>
                                <div className={styles.boxCart}>
                                  <img
                                    src="https://swiperjs.com/demos/images/nature-1.jpg"
                                    alt=""
                                    className={styles.img}
                                  />
                                  <div className={styles.boxDesc}>
                                    <h1 className={styles.textDesc}>{item.product_name}</h1>
                                    <h1 className={styles.textDesc}>{item.product_qty}</h1>
                                    <h1 className={styles.textDesc}>{item.product_size}</h1>
                                  </div>
                                  <h1 className={styles.textPrice}>{item.product_base_price}</h1>
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
                                  <h1 className={styles.textOrder}>Discount</h1>
                                  <h1 className={styles.textOrder}>Sub Total</h1>
                                  <h1 className={styles.textOrder}>Tax & Fees</h1>
                                </div>
                                <div className={styles.boxOrder}>
                                  <h1 className={styles.textOrder}>Rp {item.invoice_discount}</h1>
                                  <h1 className={styles.textOrder}>Rp {item.invoice_sub_total}</h1>
                                  <h1 className={styles.textOrder}>RP {item.invoice_tax}</h1>
                                </div>
                              </div>
                              <div className={styles.boxTotal}>
                                <h1 className={styles.textTotal}>TOTAL</h1>
                                <h1 className={styles.textTotal}>{item.invoice_sub_total - item.invoice_tax - item.invoice_discount}</h1>
                              </div>
                            </div>
                          </SwiperSlide>
                        </Col>
                      );
                    })}
                    {/* <SwiperSlide className={styles.swiperSlide}>
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
                    </SwiperSlide> */}
                  </Swiper>

                </Row>

                <Button className={`${styles.buttonSwipe}`}>
                  Slide to see upcoming orders
                  <CaretRight size={30} />
                </Button>
              </Col>


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
                <Row>
                  {props.user.map((item, index) => {
                    console.log(item)
                    return (
                      <Col key={index} className={styles.right}>
                        lsdfsf
                        <SwiperSlide className={styles.swiperSlide}>
                          <Col xs={12} md={12} lg={6} className={styles.right}>
                            <div className={styles.boxTitle}>
                              <h1 className={styles.textRight}>Address details</h1>
                            </div>
                            <div className={styles.boxAddress}>
                              <h1 className={styles.textAddress1}>
                                <b> Delivery</b> to {item.user_name}
                              </h1>
                              <hr />
                              <h1 className={styles.textAddress2}>
                                {item.user_address}
                              </h1>
                              <hr />
                              <h1 className={styles.textAddress2}>{item.user_phone}</h1>
                            </div>
                          </Col>
                        </SwiperSlide>
                      </Col>
                    );
                  })}
                </Row>
              </Swiper>
              <Col xs={12} md={12} lg={6} className={styles.right}>
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
                        <CreditCard color="#ffffff" weight="bold" size={25} />
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
          </Container>
        </Container>
        <Footer />
      </Layout>
    </>
  );
}
