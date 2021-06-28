import Layout from "components/Layout";
import NavBar from "components/module/NavBar";
import Footer from "components/module/footer";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "../../../styles/HistoryCustomer.module.css";
import { useState, useEffect } from "react";
import { authPage, customerPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  // console.log(data.userId)

  const res = await axiosApiIntances
    .get(`user/by-id/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return [];
    });

  const resres = await axiosApiIntances
    .get(`invoice/history/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((resres) => {
      // Console.log(data)
      return resres.data.data;
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { resres, res },
  };
};

export default function HistoryCust(props) {
  const router = useRouter();
  // console.log(props);
  const [isClick, setIsClick] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [orderId, setOrderId] = useState(0);

  const handleClick = () => {
    setIsClick(true);
  };
  const handleCloseClick = () => {
    setIsClick(false);
  };
  const handleDelete = (id) => {
    setOrderId(id);
    setIsDelete(true);
    setIsClick(false);
  };
  const handleCloseDelete = () => {
    setIsDelete(false);

  };
  const handleDeleteItem = () => {
    console.log("asdasdsad", orderId);
    // window.location.reload();
    // router.push(
    //   `/customers/history-customer/${data.userId}`)
    axiosApiIntances
      .delete(`invoice/${orderId}`)
      .then((res) => {
        console.log(res);
        setIsDelete(false);
        router.push(`/customers/history-customer/${data.userId}`);
        setShowAlert([true, res.data.msg]);
      })
      .catch((err) => {
        return [];
      });
  };
  return (
    <Layout title="History Customer">
      <Modal
        show={isDelete}
        size="lg"
        centered
        className={styles.modal}
        onHide={handleCloseDelete}
      >
        <Modal.Body className={styles.bodyModal}>
          <div>
            <p className={styles.textDel}>
              Are you sure want to delete <br />
              the selected items?
            </p>
            <Button onClick={handleCloseDelete} className={styles.btnClose}>
              Cancel
            </Button>
            <Button onClick={handleDeleteItem} className={styles.btnDelete}>
              Delete
              {/* {console.log("wdijwdi")} */}
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <NavBar profile={true} login={true} />
      <Container fluid className={styles.mainContainer}>
        <Container className={styles.container}>
          <h1 className={styles.text1}>Let’s see what you have bought!</h1>
          <p className={styles.text2}>Long press to delete item</p>

          <Row>
            {props.resres.map((item, index) => {
              console.log(item);
              return (
                <Col key={index} sm={4}>
                  {isClick ? (
                    <Card className={styles.cardHistoryClick}>
                      <img
                        alt=""
                        src="/Ellipse 15.png"
                        className={styles.forDelete}
                        onClick={() => {
                          handleDelete(item.invoice_id);
                        }}
                      />
                      <img
                        alt=""
                        src="/Ellipse 183.png"
                        className={styles.forCancel}
                        onClick={handleCloseClick}
                      />
                      <img
                        alt=""
                        src="/Vector.png"
                        className={styles.imgDelete}
                        onClick={() => {
                          handleDelete(item.invoice_id);
                        }}
                      />
                      <img
                        alt=""
                        src="/x.png"
                        className={styles.imgCancel}
                        onClick={handleCloseClick}
                      />
                      <Row>
                        <Col xs={4}>
                          <img
                            alt=""
                            src={
                              item.product_image.length > 0
                                ? `${process.env.API_IMG_URL}/${item.product_image}`
                                : "/image 2.png"
                            }
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8}>
                          <h1 className={styles.nameHistory}>
                            {item.invoice_code}
                          </h1>
                          <p className={styles.priceHistory}>
                            {" "}
                            Rp {item.invoice_sub_total.toLocaleString()}
                          </p>
                          <p className={styles.statusHistory}>
                            {item.orders_status}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  ) : (
                    <Card className={styles.cardHistory} onClick={handleClick}>
                      <Row>
                        <Col xs={4}>
                          <img
                            alt=""
                            src={
                              item.product_image.length > 0
                                ? `${process.env.API_IMG_URL}/${item.product_image}`
                                : "/image 2.png"
                            }
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8}>
                          <h1 className={styles.nameHistory}>
                            {item.invoice_code}
                          </h1>
                          <p className={styles.priceHistory}>
                            {" "}
                            Rp {item.invoice_sub_total.toLocaleString()}
                          </p>
                          <p className={styles.statusHistory}>
                            {item.orders_status}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
      <Footer />
    </Layout >
  );
}
