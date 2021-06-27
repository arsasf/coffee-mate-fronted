/* eslint-disable @next/next/no-img-element */
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Dropdown,
  Modal,
} from "react-bootstrap";
import styles from "styles/PaymentDetails.module.css";
import {
  CreditCard,
  Bank,
  Car,
  ShoppingCart,
  XCircle,
  CheckCircle,
} from "phosphor-react";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { useState } from "react";
import { authPage, customerPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await customerPage(context);
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
  //*=========================== REQ API Cart =========================
  const cart = await axiosApiIntances
    .get(`/cart/by-id-user/${data.userId}`, {
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
  //*======================= End REQ API Cart =========================

  //*=========================== REQ API Cart =========================
  const promo = await axiosApiIntances
    .get(`/promo/`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
  //*======================= End REQ API Cart =========================
  return {
    props: { user: result, userLogin: data, cart: cart, promo: promo },
  };
}

export default function PaymentDetails(props) {
  const router = useRouter();
  const [label, setLabel] = useState("Select Promo");
  const [card, setCard] = useState(false);
  const [bank, setBank] = useState(false);
  const [cod, setCod] = useState(false);
  const [code, setCode] = useState(false);
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart] = useState(props.cart.length > 0 ? props.cart : []);
  const [promo] = useState(props.promo.length > 0 ? props.promo : []);
  const [price] = useState(
    props.cart.length > 0
      ? props.cart.length === 1
        ? props.cart[0].product_sub_total
        : props.cart.reduce((a, b) => a.product_sub_total + b.product_sub_total)
      : 0
  );
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(props.cart.length > 0 ? 10000 : 0);
  //*===================== Count Promo ==================================
  const subTotal = price - discount + tax;
  console.log(price, props.cart.length);
  const date = Date.now();
  const formatDateDay = (dateString) => {
    const options = { day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatDateYear = (dateString) => {
    const options = { year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatDateMonth = (dateString) => {
    const options = { month: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const DateYear = formatDateYear(date);
  const DateMonth = formatDateMonth(date);
  const DateDay = formatDateDay(date);
  const handlePromo = (
    code,
    discount,
    minPrice,
    maxDiscount,
    expireStart,
    expireEnd
  ) => {
    setLabel(code);
    const date =
      DateDay >= formatDateDay(expireStart) &&
      DateDay <= formatDateDay(expireEnd) &&
      DateMonth >= formatDateMonth(expireStart) &&
      DateMonth <= formatDateMonth(expireEnd) &&
      DateYear >= formatDateYear(expireStart) &&
      DateYear <= formatDateYear(expireEnd);
    const discountTotal = (price * parseInt(discount)) / 100;
    if (price >= minPrice && discountTotal <= maxDiscount && date === true) {
      setDiscount(discountTotal);
      setTax(10000);
      setCode(code);
    } else if (date === false) {
      setDiscount(0);
    }
  };

  const handleOrder = () => {
    if (cart.length > 0) {
      const setData = {
        paymentMethod: paymentMethod,
        promoCode: code,
        discount: discount,
        totalPriceProduct: price,
        totalOrders: subTotal,
        tax: tax,
      };
      console.log(setData);

      axiosApiIntances
        .post(`/order/`, setData, {
          headers: {
            Authorization: `Bearer ${props.userLogin.token || ""}`,
          },
        })
        .then((res) => {
          setShow(true);
          setInfo("CREATE ORDER");
          setMsg("Success, Thank you !");
          console.log(res);
          router.push("/customers/payment-details");
        })
        .catch((err) => {
          console.log(err);
          setShow(true);
          setInfo("ERROR : CREATE ORDER");
          setMsg(err.response.data.msg);
        });
    } else {
      setShow(true);
      setInfo("ERROR : CREATE ORDER");
      setMsg("Please Choose Product !");
    }
  };

  //*===================== End Count Promo ==============================

  const handleClick = (param1) => {
    if (param1 === "bank") {
      setBank(true);
      setCard(false);
      setCod(false);
      setPaymentMethod("bank");
    } else if (param1 === "card") {
      setCard(true);
      setCod(false);
      setBank(false);
      setPaymentMethod("card");
    } else if (param1 === "cod") {
      setCod(true);
      setBank(false);
      setCard(false);
      setPaymentMethod("cod");
    }
  };

  //*========================= Handle For Modal =======================
  const handleClose = () => {
    if (info === "ERROR : CREATE ORDER") {
      router.push(`/customers/payment-details`);
      setShow(false);
    } else {
      router.push("/customers/payment-details");
      setShow(false);
    }
  };
  //*===================== End Handle For Modal =======================
  return (
    <>
      <Layout title="Manage Order">
        <Navbar login={true} admin={true} order={true} />
        <Modal show={show} className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Modal.Title className={styles.modalTitle}>
              {info === "ERROR : CREATE ORDER" ? (
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
            <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
              <Col xs={12} md={12} lg={6} className={styles.left}>
                <h1 className={styles.textTitle}>
                  Checkout your <br /> item now!
                </h1>

                <div className={styles.card}>
                  <h1 className={styles.textCardTitle}>{"Order Summary"}</h1>
                  <div className={styles.cart}>
                    {cart.map((item, index) => {
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
                            IDR {item.product_sub_total.toLocaleString("id-ID")}
                          </h1>
                        </div>
                      );
                    })}
                  </div>
                  <hr />
                  <Form.Group className={styles.formRow}>
                    <Dropdown className={styles.placeholder}>
                      <div className={styles.dropdownSort1}>
                        <Dropdown.Toggle
                          variant="#fff"
                          title="product"
                          id="dropdown-basic"
                          className={styles.titleSort1}
                        >
                          {label}
                        </Dropdown.Toggle>
                      </div>
                      <Dropdown.Menu className={styles.menuDropdown1}>
                        {props.user.user_coupon === "yes" ? (
                          promo.map((item, index) => {
                            return (
                              <Dropdown.Item
                                key={index}
                                className={styles.listDiscount}
                                onClick={() =>
                                  handlePromo(
                                    item.promo_code,
                                    item.promo_discount,
                                    item.promo_min_price,
                                    item.promo_max_discount,
                                    item.promo_expire_start,
                                    item.promo_expire_end
                                  )
                                }
                              >
                                {item.promo_code}
                              </Dropdown.Item>
                            );
                          })
                        ) : (
                          <Dropdown.Item className={styles.listDiscount}>
                            Not Found Promo
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <hr />
                  <div className={styles.boxTotal}>
                    <div className={styles.boxOrder}>
                      <h1 className={styles.textOrder}>SUBTOTAL</h1>
                      <h1 className={styles.textOrder}>DISCOUNT</h1>
                      <h1 className={styles.textOrder}>TAX & FEES</h1>
                    </div>
                    <div className={styles.boxOrder}>
                      <h1 className={styles.textOrder}>
                        IDR {price.toLocaleString("id-ID")}
                      </h1>
                      <h1 className={styles.textOrder}>
                        IDR {discount.toLocaleString("id-ID")}
                      </h1>
                      <h1 className={styles.textOrder}>
                        IDR {tax.toLocaleString("id-ID")}
                      </h1>
                    </div>
                  </div>
                  <div className={styles.boxTotal}>
                    <h1 className={styles.textTotal}>TOTAL</h1>
                    <h1 className={styles.textTotal}>
                      IDR {subTotal.toLocaleString("id-ID")}
                    </h1>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={12} lg={6} className={styles.right}>
                <div className={styles.boxTitle}>
                  <h1 className={styles.textRight}>Address details</h1>
                </div>
                <div className={styles.boxAddress}>
                  <h1 className={styles.textAddress1}>
                    <b> Delivery</b> to {props.user.user_name}
                  </h1>
                  <hr />
                  <h1 className={styles.textAddress2}>
                    {props.user.user_address}
                  </h1>
                  <hr />
                  <h1 className={styles.textAddress2}>
                    {props.user.user_phone}
                  </h1>
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
                        <CreditCard color="#ffffff" weight="bold" size={20} />
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
                        <Bank color="#ffffff" weight="bold" size={20} />
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
                        <Car color="#000" weight="bold" size={20} />
                      </div>
                      <h1 className={styles.textIcon}>Cash on delivery</h1>
                    </div>
                  </div>
                </div>
                <Button
                  className={`${styles.buttonDone} btn-secondary`}
                  onClick={() => handleOrder()}
                >
                  Confirm and Pay
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
