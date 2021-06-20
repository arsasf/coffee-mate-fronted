/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "styles/CustProducts.module.css";
import Image from "next/image";

export default function Product() {
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [selectedCategory, setSelectedCategory] = useState({ favourite: true });

  const handleSelectCoupon = (e) => {
    setSelectedCoupon({ [e.target.id]: true });
  };
  const handleSelectCategory = (e) => {
    setSelectedCategory({ [e.target.id]: true });
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
            {/* LOOPING HERE */}
            <div
              id="c1"
              className={`${styles.coupon} ${
                selectedCoupon.c1 && styles.selectedCoupon
              }`}
              onClick={(e) => handleSelectCoupon(e)}
            >
              <img id="c1" src="/sketch1.png" alt="coupon-sketch" />
              <div id="c1">
                <h6 id="c1">{"HAPPY MOTHER'S DAY"}</h6>
                <span id="c1">Get one of our favourite menu for free!</span>
              </div>
            </div>
            <div
              id="c2"
              style={{ backgroundColor: "#F5C361" }}
              className={`${styles.coupon} ${
                selectedCoupon.c2 && styles.selectedCoupon
              }`}
              onClick={(e) => handleSelectCoupon(e)}
            >
              <img id="c2" src="/sketch2.png" alt="coupon-sketch" />
              <div id="c2">
                <h6 id="c2">
                  {"Get a cup of coffee for free on sunday morning"}
                </h6>
                <span id="c2">Only at 7 to 9 AM</span>
              </div>
            </div>
            <div
              id="c3"
              className={`${styles.coupon} ${
                selectedCoupon.c3 && styles.selectedCoupon
              }`}
              onClick={(e) => handleSelectCoupon(e)}
            >
              <img id="c3" src="/sketch1.png" alt="coupon-sketch" />
              <div id="c3">
                <h6 id="c3">{"HAPPY MOTHER'S DAY"}</h6>
                <span id="c3">Get one of our favourite menu for free!</span>
              </div>
            </div>
            <div
              id="c4"
              style={{ backgroundColor: "#C59378" }}
              className={`${styles.coupon} ${
                selectedCoupon.c4 && styles.selectedCoupon
              }`}
              onClick={(e) => handleSelectCoupon(e)}
            >
              <img id="c4" src="/sketch3.png" alt="coupon-sketch" />
              <div id="c4">
                <h6 id="c4">{"HAPPY HALLOWEEN"}</h6>
                <span id="c4">
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
              className={selectedCategory.favourite && styles.activeCategory}
              onClick={(e) => handleSelectCategory(e)}
            >
              Favourite Product
            </h4>
            <h4
              id="coffee"
              className={selectedCategory.coffee && styles.activeCategory}
              onClick={(e) => handleSelectCategory(e)}
            >
              Coffee
            </h4>
            <h4
              id="nonCoffee"
              className={selectedCategory.nonCoffee && styles.activeCategory}
              onClick={(e) => handleSelectCategory(e)}
            >
              Non Coffee
            </h4>
            <h4
              id="foods"
              className={selectedCategory.foods && styles.activeCategory}
              onClick={(e) => handleSelectCategory(e)}
            >
              Foods
            </h4>
            <h4
              id="addOn"
              className={selectedCategory.addOn && styles.activeCategory}
              onClick={(e) => handleSelectCategory(e)}
            >
              Add-On
            </h4>
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
