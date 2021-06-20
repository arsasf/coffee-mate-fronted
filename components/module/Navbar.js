/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { useState } from "react";
import { Container, Button, Modal, Form, FormControl } from "react-bootstrap";
import styles from "styles/Navbar.module.css";

export default function NavbarComponent(props) {
  const [login] = useState(props.login ? props.login : false);
  const [admin] = useState(props.admin ? props.admin : false);
  const [home] = useState(props.home ? props.home : false);
  const [product] = useState(props.product ? props.product : false);
  const [cart] = useState(props.cart ? props.cart : false);
  const [history] = useState(props.history ? props.history : false);
  const [dashboard] = useState(props.dashboard ? props.dashboard : false);
  const [order] = useState(props.order ? props.order : false);
  const [pageProfile] = useState(props.profile ? props.profile : false);
  const [chat] = useState(props.chat ? props.chat : false);
  const [modalShow, setModalShow] = useState(false);

  const router = useRouter();

  const handleClose = () => {
    setModalShow(false);
  };
  const handleSearch = () => {
    setModalShow(true);
  };

  const handleMenu = (param) => {
    if (admin === true) {
      router.push(`/admin/${param}`);
    } else if (admin === false) {
      router.push(`/customers/${param}`);
    }
  };

  return (
    <>
      <Container fluid className={styles.fullArea}>
        <Container fluid className={styles.container}>
          <Modal
            show={modalShow}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header className={styles.modalHeader}>
              <Modal.Title
                className={styles.modalTitle}
                id="contained-modal-title-vcenter"
              >
                <Form className={`${styles.form} d-flex`}>
                  <FormControl
                    type="search"
                    placeholder="Search here.."
                    className={styles.placeholder}
                    aria-label="Search"
                  />
                  <Button>Search</Button>
                </Form>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>Ini hasil Search</Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
              <Button onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
          <div className={styles.boxLogo}>
            <img src="/navbar/coffee.png" alt="" className={styles.imgLogo} />
            <h1 className={styles.textLogo}>Coffee Mate</h1>
          </div>
          <div className={styles.listMenu}>
            <div className={styles.boxMenu}>
              <Button variant="light" className={styles.boxImgMenu}>
                <img
                  src={
                    home === true
                      ? "/navbar/homeactive.png"
                      : "/navbar/home.png"
                  }
                  alt=""
                  className={styles.imgMenu}
                />
              </Button>
              <h1
                className={
                  home === true ? styles.textMenuActive : styles.textMenu
                }
              >
                Home
              </h1>
            </div>
            <div
              className={styles.boxMenu}
              onClick={() => handleMenu("product")}
            >
              <Button variant="light" className={styles.boxImgMenu}>
                <img
                  src={
                    product === true
                      ? "/navbar/productactive.png"
                      : "/navbar/product.png"
                  }
                  alt=""
                  className={styles.imgMenu}
                />
              </Button>
              <h1
                className={
                  product === true ? styles.textMenuActive : styles.textMenu
                }
              >
                Product
              </h1>
            </div>
            {admin === true ? (
              <div className={styles.boxMenu}>
                <Button variant="light" className={styles.boxImgMenu}>
                  <img
                    src={
                      order === true
                        ? "/navbar/orderactive.png"
                        : "/navbar/order.png"
                    }
                    alt=""
                    className={styles.imgMenu}
                  />
                </Button>
                <h1
                  className={
                    order === true ? styles.textMenuActive : styles.textMenu
                  }
                >
                  Orders
                </h1>
              </div>
            ) : (
              <div className={styles.boxMenu}>
                <Button variant="light" className={styles.boxImgMenu}>
                  <img
                    src={
                      cart === true
                        ? "/navbar/cartactive.png"
                        : "/navbar/cart.png"
                    }
                    alt=""
                    className={styles.imgMenu}
                  />
                </Button>
                <h1
                  className={
                    cart === true ? styles.textMenuActive : styles.textMenu
                  }
                >
                  Your Cart
                </h1>
              </div>
            )}
            {admin === true ? (
              <div className={styles.boxMenu}>
                <Button variant="light" className={styles.boxImgMenu}>
                  <img
                    src={
                      dashboard === true
                        ? "/navbar/dashboardactive.png"
                        : "/navbar/dashboard.png"
                    }
                    alt=""
                    className={styles.imgMenu}
                  />
                </Button>
                <h1
                  className={
                    dashboard === true ? styles.textMenuActive : styles.textMenu
                  }
                >
                  Dashboard
                </h1>
              </div>
            ) : (
              <div className={styles.boxMenu}>
                <Button variant="light" className={styles.boxImgMenu}>
                  <img
                    src={
                      history === true
                        ? "/navbar/historyactive.png"
                        : "/navbar/history.png"
                    }
                    alt=""
                    className={styles.imgMenu}
                  />
                </Button>
                <h1
                  className={
                    history === true ? styles.textMenuActive : styles.textMenu
                  }
                >
                  History
                </h1>
              </div>
            )}
          </div>
          {login === true ? (
            <div>
              <div className={styles.boxMenu1}>
                <Button
                  variant="light"
                  className={styles.profile}
                  onClick={() => handleSearch()}
                >
                  <img
                    src="/navbar/search.png"
                    alt=""
                    className={styles.imgMenuProfile}
                  />
                </Button>
                <Button
                  variant="light"
                  className={chat === true ? styles.profile1 : styles.profile}
                >
                  <img
                    src="/navbar/chat.png"
                    alt=""
                    className={styles.imgMenuProfile}
                  />
                </Button>
                <Button
                  variant="light"
                  className={
                    pageProfile === true ? styles.profile1 : styles.profile
                  }
                  onClick={() => handleMenu("profile/1")}
                >
                  <img
                    src="/navbar/img-not-found.png"
                    alt=""
                    className={styles.imgProfile}
                  />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className={styles.boxMenu1}>
                <Button
                  variant="light"
                  className={styles.login}
                  onClick={() => router.push("/login")}
                >
                  <img
                    src="/navbar/login.png"
                    alt=""
                    className={styles.imgMenu}
                  />
                  <h1 className={styles.textMenu2}>Login</h1>
                </Button>
                <Button
                  variant="light"
                  className={styles.signUp}
                  onClick={() => router.push("/signup")}
                >
                  <img
                    src="/navbar/signup.png"
                    alt=""
                    className={styles.imgMenu}
                  />
                  <h1 className={styles.textMenu2}>Sign Up </h1>
                </Button>
              </div>
            </div>
          )}
        </Container>
      </Container>
    </>
  );
}
