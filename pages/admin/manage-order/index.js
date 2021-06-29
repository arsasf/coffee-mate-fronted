import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import styles from "styles/ManageOrder.module.css";
import SwiperCore, { EffectCube, Pagination } from "swiper/core";
import {
  CreditCard,
  Bank,
  Car,
  CaretRight,
  ShoppingCart,
  XCircle,
  CheckCircle,
} from "phosphor-react";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { useState } from "react";
import { authPage, adminPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";

SwiperCore.use([EffectCube, Pagination]);

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await adminPage(context);
  //*======================== REQ API USER LOGIN ======================
  const result = await axiosApiIntances
    .get(`/user/by-id/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      return {};
    });

  //*==================== END REQ API USER LOGIN ======================
  //*=========================== REQ API Order =========================
  const order = await axiosApiIntances
    .get(`/order/`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return {};
    });
  //*======================= End REQ API Order =========================
  return {
    props: { user: result, userLogin: data, order: order },
  };
}

export default function ManageOrder(props) {
  console.log(props);
  const [orders] = useState(props.order);
  const router = useRouter();
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");

  var outObject = orders.reduce(function (a, e) {
    let estKey = e["invoice_id"];
    (a[estKey] ? a[estKey] : (a[estKey] = null || [])).push(e);
    return a;
  }, []);

  const handleUpdate = (param) => {
    console.log(param);
    axiosApiIntances
      .patch(`/order/update/${param}`, {
        headers: {
          Authorization: `Bearer ${props.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        console.log(res);
        setShow(true);
        setInfo("UPDATE ORDER");
        setMsg("Success, Mark as done!");
        router.push("/admin/manage-order");
      })
      .catch((err) => {
        console.log(err);
        setShow(true);
        setInfo("ERROR : UPDATE ORDER");
        setMsg(err.response.data.msg);
      });
  };
  //*========================= Handle For Modal =======================
  const handleClose = () => {
    if (info === "ERROR : UPDATE ORDER") {
      router.push("/admin/manage-order");
      setShow(false);
    } else {
      router.push("/admin/manage-order");
      setShow(false);
    }
  };
  //*===================== End Handle For Modal =======================
  return (
    <>
      <Layout title="Manage Order">
        <Navbar login={true} orders={true} />
        <Modal show={show} className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>
              {info === "ERROR : UPDATE ORDER" ? (
                <XCircle size={30} color="#ff3d33" />
              ) : (
                <CheckCircle size={30} color="#33ff8b" />
              )}
              {info}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <ShoppingCart size={72} color="#ffba33" />
            {msg}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
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
              {outObject.length < 0
                ? ""
                : outObject.map((item, index) => {
                    return (
                      <SwiperSlide className={styles.swiperSlide} key={index}>
                        <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
                          <Col xs={12} md={12} lg={6} className={styles.left}>
                            <h1 className={styles.textTitle}>
                              Finish your <br /> customer order now.
                            </h1>
                            <div className={styles.card}>
                              <h1 className={styles.textCardTitle}>
                                {"Delivery Order"}
                              </h1>
                              <h1 className={styles.textName}>
                                {item[0].user_name}
                              </h1>
                              <div className={styles.cart}>
                                {item.map((item, index) => {
                                  return (
                                    <div className={styles.boxCart} key={index}>
                                      <img
                                        src={
                                          item.product_image
                                            ? `${process.env.API_IMG_URL}${item.product_image}`
                                            : "/default-img-placeholder.png"
                                        }
                                        alt=""
                                        className={styles.img}
                                      />
                                      <div className={styles.boxDesc}>
                                        <h1 className={styles.textDesc}>
                                          {item.product_name}
                                        </h1>
                                        <h1 className={styles.textDesc}>
                                          x {item.product_qty}
                                        </h1>
                                        <h1 className={styles.textDesc}>
                                          {item.product_size === "R"
                                            ? "Reguler"
                                            : item.product_size === "L"
                                            ? "Large"
                                            : item.product_size === "XL"
                                            ? "Extra Large"
                                            : item.product_size}
                                        </h1>
                                      </div>
                                      <h1 className={styles.textPrice}>
                                        IDR{" "}
                                        {item.product_sub_total.toLocaleString(
                                          "id-ID"
                                        )}
                                      </h1>
                                    </div>
                                  );
                                })}
                              </div>
                              <hr />
                              <div className={styles.boxTotal}>
                                <div className={styles.boxOrder}>
                                  <h1 className={styles.textOrder}>SUBTOTAL</h1>
                                  <h1 className={styles.textOrder}>
                                    TAX & FEES
                                  </h1>
                                  <h1 className={styles.textOrder}>DISCOUNT</h1>
                                </div>
                                <div className={styles.boxOrder}>
                                  <h1 className={styles.textOrder}>
                                    IDR{" "}
                                    {item[0].orders_all_product_price.toLocaleString(
                                      "id-ID"
                                    )}
                                  </h1>
                                  <h1 className={styles.textOrder}>
                                    IDR{" "}
                                    {item[0].orders_tax.toLocaleString("id-ID")}
                                  </h1>
                                  <h1 className={styles.textOrder}>
                                    IDR{" "}
                                    {parseInt(
                                      item[0].orders_discount
                                    ).toLocaleString("id-ID")}
                                  </h1>
                                </div>
                              </div>
                              <div className={styles.boxTotal}>
                                <h1 className={styles.textTotal}>TOTAL</h1>
                                <h1 className={styles.textTotal}>
                                  IDR{" "}
                                  {item[0].orders_total_price.toLocaleString(
                                    "id-ID"
                                  )}
                                </h1>
                              </div>
                            </div>
                            <Button className={`${styles.buttonSwipe}`}>
                              Slide to see upcoming orders
                              <CaretRight size={30} />
                            </Button>
                          </Col>
                          <Col xs={12} md={12} lg={6} className={styles.right}>
                            <div className={styles.boxTitle}>
                              <h1 className={styles.textRight}>
                                Address details
                              </h1>
                            </div>
                            <div className={styles.boxAddress}>
                              <h1 className={styles.textAddress1}>
                                <b> Delivery</b> to {item[0].user_name}
                              </h1>
                              <hr />
                              <h1 className={styles.textAddress2}>
                                {item[0].user_address}
                              </h1>
                              <hr />
                              <h1 className={styles.textAddress2}>
                                {item[0].user_phone}
                              </h1>
                            </div>
                            <div>
                              <h1 className={styles.boxTitle2}>
                                Payment Method
                              </h1>
                            </div>
                            <div className={styles.payment}>
                              <div className={styles.boxIcon}>
                                {console.log(
                                  item[0].orders_payment_method === "card",
                                  item[0].orders_payment_method
                                )}
                                <input
                                  type="radio"
                                  className={
                                    item[0].orders_payment_method === "card"
                                      ? `${styles.radioCard}`
                                      : styles.radio
                                  }
                                  checked={
                                    item[0].orders_payment_method === "card"
                                      ? true
                                      : false
                                  }
                                  readOnly
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
                                    item[0].orders_payment_method === "bank"
                                      ? `${styles.radioBank}`
                                      : styles.radio
                                  }
                                  checked={
                                    item[0].orders_payment_method === "bank"
                                      ? true
                                      : false
                                  }
                                  readOnly
                                />
                                <div className={styles.textRadio}>
                                  <div className={styles.icon2}>
                                    <Bank
                                      color="#ffffff"
                                      weight="bold"
                                      size={25}
                                    />
                                  </div>
                                  <h1 className={styles.textIcon}>
                                    Bank account
                                  </h1>
                                </div>
                              </div>
                              <hr />
                              <div className={styles.boxIcon}>
                                <input
                                  type="radio"
                                  className={
                                    item[0].orders_payment_method === "cod"
                                      ? `${styles.radioCod}`
                                      : styles.radio
                                  }
                                  checked={
                                    item[0].orders_payment_method === "cod"
                                      ? true
                                      : false
                                  }
                                  readOnly
                                />
                                <div className={styles.textRadio}>
                                  <div className={styles.icon3}>
                                    <Car color="#000" weight="bold" size={25} />
                                  </div>
                                  <h1 className={styles.textIcon}>
                                    Cash on delivery
                                  </h1>
                                </div>
                              </div>
                            </div>
                            <Button
                              className={`${styles.buttonDone} btn-secondary`}
                              onClick={() => handleUpdate(item[0].invoice_id)}
                            >
                              Mark as done
                            </Button>
                          </Col>
                        </Row>
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
          </Container>
        </Container>

        <Footer />
      </Layout>
    </>
  );
}
