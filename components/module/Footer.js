import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "styles/Footer.module.css";

export default function Footer(props) {
  const [home] = useState(props.home ? props.home : true);
  return (
    <>
      <Container
        fluid
        className={home === true ? styles.fullArea1 : styles.fullArea}
      >
        <Container fluid className={styles.container}>
          <Row>
            <Col lg={8} className={styles.left}>
              <div className={styles.boxFooter}>
                <img
                  src="/navbar/coffee.png"
                  alt=""
                  className={styles.imgLogo}
                />
                <h1 className={styles.textLogo}>Coffee Mate</h1>
              </div>
              <h1 className={styles.textFooter}>
                Coffee Shop is a store that sells some good meals, and
                especially coffee. We provide high quality beans
              </h1>
              <div>
                <img
                  src="/footer/facebook.png"
                  alt=""
                  className={styles.imgSosmed}
                />
                <img
                  src="/footer/twitter.png"
                  alt=""
                  className={styles.imgSosmed}
                />
                <img
                  src="/footer/instagram.png"
                  alt=""
                  className={styles.imgSosmed}
                />
              </div>
            </Col>
            <Col lg={4} className={styles.right}>
              <div className={styles.boxRight}>
                <h1 className={styles.textFooter2}>Product</h1>
                <div className={styles.boxFooter1}>
                  <h2 className={styles.textFooter3}>Download</h2>
                  <h2 className={styles.textFooter3}>Pricing</h2>
                  <h2 className={styles.textFooter3}>Locations</h2>
                  <h2 className={styles.textFooter3}>Countries</h2>
                  <h2 className={styles.textFooter3}>Blog</h2>
                </div>
              </div>
              <div>
                <h1 className={styles.textFooter2}>Engage</h1>
                <div className={styles.boxFooter1}>
                  <h2 className={styles.textFooter3}>Coffe Mate?</h2>
                  <h2 className={styles.textFooter3}>FAQ</h2>
                  <h2 className={styles.textFooter3}>About Us</h2>
                  <h2 className={styles.textFooter3}>Privacy Policy</h2>
                  <h2 className={styles.textFooter3}>Terms of Service</h2>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <h1 className={styles.textFooter1}>©2021 Coffee Mate</h1>
          </Row>
        </Container>
      </Container>
    </>
  );
}
