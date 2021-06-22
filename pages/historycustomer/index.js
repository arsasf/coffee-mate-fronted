import Layout from "components/Layout";
import NavBar from "components/module/NavBar";
import Footer from "components/module/footer";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/HistoryCustomer.module.css";
import { useState, useEffect } from "react";
import { authPage, customerPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";


// export async function getServerSideProps(context) {
//   const data = await authPage(context);

//   return {
//     props: {},
//   };
// }

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  const res = await axiosApiIntances
    .get(`invoice/history/${data.userId}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return new Error(err);
    });
  return {
    props: { user: res },
  };

};
export default function historyCust(props) {
  console.log(props);
  const [dataHistory, setDataHistory] = useState([
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
    {
      name: "CS-1234567",
      price: "IDR 34.000",
      status: "Done",
    },
  ]);
  const [isClick, setIsClick] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  };
  const handleCloseClick = () => {
    setIsClick(false);
  };
  const handleDelete = () => {
    setIsDelete(true);
  };
  const handleCloseDelete = () => {
    setIsDelete(false);
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
        <Modal.Body className={styles.modalBody}>
          <div>
            <p className={styles.textDelete}>
              Are you sure want to delete <br />the selected items?
            </p>
            <Button onClick={handleCloseDelete} className={styles.btnClose}>
              Cancel
            </Button>
            <Button onClick={handleCloseDelete} className={styles.btnDelete}>
              Delete
              {console.log("wdijwdi")}
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
            {dataHistory.map((item, index) => {
              return (
                <Col key={index} sm={4}>
                  {isClick ? (
                    <Card className={styles.cardHistoryClick}>
                      <img
                        alt=""
                        src="/Ellipse 15.png"
                        className={styles.forDelete}
                        onClick={handleDelete}
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
                        onClick={handleDelete}
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
                            src="/image 2.png"
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8}>
                          <h1 className={styles.nameHistory}>{item.name}</h1>
                          <p className={styles.priceHistory}>{item.price}</p>
                          <p className={styles.statusHistory}>{item.status}</p>
                        </Col>
                      </Row>
                    </Card>
                  ) : (
                    <Card className={styles.cardHistory} onClick={handleClick}>
                      <Row>
                        <Col xs={4}>
                          <img
                            alt=""
                            src="/image 2.png"
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8}>
                          <h1 className={styles.nameHistory}>{item.name}</h1>
                          <p className={styles.priceHistory}>{item.price}</p>
                          <p className={styles.statusHistory}>{item.status}</p>
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
    </Layout>
  );
}