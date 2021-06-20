/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "styles/CustProducts.module.css";
import Image from "next/image";

export default function Product() {
  const [active, setActive] = useState({
    favourite: false,
    coffee: false,
    nonCoffee: false,
    foods: false,
    addOn: false,
  });
  // const [favourite, setFavourite] = useState(false)
  console.log(active);

  const changeCategory = (e) => {
    if (e.target.id === "favourite") {
      setActive({
        favourite: false,
        coffee: false,
        nonCoffee: false,
        foods: false,
        addOn: false,
      });
    }
    setActive();
  };

  return (
    <Layout title="Products">
      <div className={styles.container}>
        <section className={styles.promoSection}>
          <div className={styles.head}>
            <h1>Promo Today</h1>
            <p>Coupons will be updated every weeks. Check them out!</p>
          </div>
          <div className={styles.coupons}>
            <div className={styles.coupon}>
              <img src="/sketch1.png" alt="coupon-sketch" />
              <div>
                <h6>{"HAPPY MOTHER'S DAY"}</h6>
                <span>Get one of our favourite menu for free!</span>
              </div>
            </div>
            <div
              className={styles.coupon}
              style={{ backgroundColor: "#F5C361" }}
            >
              <img src="/sketch2.png" alt="coupon-sketch" />
              <div>
                <h6>{"Get a cup of coffee for free on sunday morning"}</h6>
                <span>Only at 7 to 9 AM</span>
              </div>
            </div>
            <div className={styles.coupon}>
              <img src="/sketch1.png" alt="coupon-sketch" />
              <div>
                <h6>{"HAPPY MOTHER'S DAY"}</h6>
                <span>Get one of our favourite menu for free!</span>
              </div>
            </div>
            <div
              className={styles.coupon}
              style={{ backgroundColor: "#C59378" }}
            >
              <img src="/sketch3.png" alt="coupon-sketch" />
              <div>
                <h6>{"HAPPY HALLOWEEN"}</h6>
                <span>
                  Do you like chicken wings? Get 1 free only if you buy pinky
                  promise
                </span>
              </div>
            </div>
          </div>
          <Button variant="secondary">Apply Coupon</Button>
          <section className={styles.termsCondition}>
            <h2>Terms and Condition</h2>
            <ol>
              <li>You can only apply 1 coupon per day</li>
              <li>For dine in only</li>
              <li>Buy 1 get 1 only for new user</li>
              <li>Own member card required to apply coupon</li>
            </ol>
          </section>
        </section>
        <section className={styles.products}>
          <div className={styles.category}>
            <h4
              id="favourite"
              className={styles.activeCategory}
              onClick={(e) => changeCategory(e)}
            >
              Favorite Product
            </h4>
            <h4>Coffee</h4>
            <h4>Non Coffee</h4>
            <h4>Foods</h4>
            <h4>Add-On</h4>
          </div>
          <main className={styles.productList}>
            <Row xs={2} md={4} className={`gx-3 ${styles.row}`}>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product1.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Veggie tomato mix</h5>
                    <span>IDR 34.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product6.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Hazelnut Latte</h5>
                    <span>IDR 25.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product2.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Summer fried rice</h5>
                    <span>IDR 32.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product3.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Creamy Ice Latte</h5>
                    <span>IDR 27.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product5.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Drum Sticks</h5>
                    <span>IDR 30.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product4.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Salty Rice</h5>
                    <span>IDR 20.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product2.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Summer fried rice</h5>
                    <span>IDR 32.000</span>
                  </div>
                </div>
              </Col>
              <Col>
                <div className={styles.cardProduct}>
                  <div className={styles.imgContainer}>
                    <Image
                      layout="fill"
                      src="/product1.png"
                      alt="product-img"
                    />
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    <h5>Veggie tomato mix</h5>
                    <span>IDR 34.000</span>
                  </div>
                </div>
              </Col>
            </Row>
          </main>
        </section>
      </div>
    </Layout>
  );
}
