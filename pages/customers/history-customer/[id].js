import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import axiosApiIntances from "utils/axios";
import Layout from "components/Layout";
import NavBar from "components/module/NavBar";
import Footer from "components/module/footer";
import styles from "../../../styles/HistoryCustomer.module.css";
import { authPage, customerPage } from "middleware/authPage";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { X, Trash } from "phosphor-react";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  const authorization = {
    Authorization: `Bearer ${data.token || ""}`,
  };

  const res = await axiosApiIntances
    .get(`user/by-id/${data.userId}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch(() => {
      return {};
    });

  const resres = await axiosApiIntances
    .get(`invoice/history/${data.userId}`, {
      headers: authorization,
    })
    .then((resres) => {
      return resres.data.data;
    })
    .catch((err) => {
      return [];
    });

  return {
    props: { resres, res },
  };
};

export default function historyCust(props) {
  const router = useRouter();
  const { user_id } = props.res;

  const [id, setId] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [selected, setSelected] = useState({ id: null });
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSelect = (id) => {
    setId(id);
    showButton ? setShowButton(false) : setShowButton(true);
    selected.id === id
      ? setSelected({ id: null })
      : setSelected({ ...selected, id });
  };

  const handleDeleteItem = () => {
    axiosApiIntances
      .delete(`invoice/${id}`, {
        headers: {
          Authorization: `Bearer ${props.res.token || ""}`,
        },
      })
      .then(() => {
        setConfirmModal(false);
        router.push(`/customers/history-customer/${user_id}`);
      })
      .catch(() => {
        return [];
      });
  };

  const handleCancel = () => {
    setShowButton(false);
    setSelected({ id: null });
  };

  return (
    <Layout title="History Customer">
      <Modal
        show={confirmModal}
        size="md"
        centered
        className={styles.modal}
        onHide={() => setConfirmModal(false)}
      >
        <Modal.Body
          className="d-flex flex-column align-items-center"
          style={{ margin: "3em auto" }}
        >
          <>
            <h5>Are you sure want to delete the selected items?</h5>
            <div className="d-flex justify-content-between">
              <Button
                variant="light"
                className={styles.btnCancel}
                onClick={() => setConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="light"
                className={styles.btnDelete}
                onClick={handleDeleteItem}
              >
                Delete
              </Button>
            </div>
          </>
        </Modal.Body>
      </Modal>

      <NavBar history={true} login={true} />
      <div className={styles.container}>
        <h1>Let’s see what you have bought!</h1>
        <p>Click card to delete item</p>

        <Row className="g-4 g-md-3 mt-4">
          {props.resres.map((item, index) => (
            <Col key={index}>
              <div
                id={item.invoice_id}
                className={`${
                  selected.id === item.invoice_id ? styles.selectedCard : ""
                } ${styles.card}`}
                onClick={() => handleSelect(item.invoice_id)}
              >
                <div className={styles.productImgContainer}>
                  <Image
                    src={
                      item.product_image
                        ? `${process.env.API_IMG_URL}/${item.product_image}`
                        : "/public/default-img-placeholder.png"
                    }
                    alt="product image"
                    layout="fill"
                  />
                </div>
                <div>
                  <h4>{item.invoice_code}</h4>
                  <span className={styles.subTotal}>
                    IDR {item.invoice_sub_total.toLocaleString("id-ID")}
                  </span>
                  <span className={styles.status}>{item.orders_status}</span>
                </div>
                <div
                  className={`${
                    (showButton && selected.id === item.invoice_id) ||
                    selected.id === item.invoice_id
                      ? styles.showActionBtn
                      : ""
                  } ${styles.actionBtn}`}
                >
                  <Trash
                    weight="bold"
                    className={styles.delete}
                    onClick={() => setConfirmModal(true)}
                  />
                  <X
                    weight="bold"
                    className={styles.cancel}
                    onClick={handleCancel}
                  />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </Layout>
  );
}
