/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "styles/AdminProducts.module.css";
import Layout from "components/Layout";
import { X, PencilSimple } from "phosphor-react";

export default function Product() {
  const [selectedCategory, setSelectedCategory] = useState({ favourite: true });

  const handleSelectCategory = (e) => {
    setSelectedCategory({ [e.target.id]: true });
  };

  const handleDeleteCoupon = () => {};
  const handleDeleteProduct = () => {};

  const handleEditCoupon = () => {};
  const handleEditProduct = () => {};

  return (
    <Layout title="Products">
      <div className={styles.container}>
        <section className={styles.promoSection}>
          <div className={styles.head}>
            <h1>Promo Today</h1>
            <p>Coupons will be updated every weeks. Check them out!</p>
          </div>
          <div className={styles.coupons}>
            {/* LOOP HERE */}
            <div className={styles.coupon}>
              <img src="/sketch1.png" alt="coupon-sketch" />
              <div>
                <h6>{"HAPPY MOTHER'S DAY"}</h6>
                <span>Get one of our favourite menu for free!</span>
              </div>
              <div
                className={styles.delete}
                onClick={() => handleDeleteCoupon()}
              >
                <X color="#ffffff" weight="bold" />
              </div>
              <div className={styles.edit} onClick={() => handleEditCoupon()}>
                <PencilSimple color="#ffffff" weight="bold" />
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
              <div
                className={styles.delete}
                onClick={() => handleDeleteCoupon()}
              >
                <X color="#ffffff" weight="bold" />
              </div>
              <div className={styles.edit} onClick={() => handleEditCoupon()}>
                <PencilSimple color="#ffffff" weight="bold" />
              </div>
            </div>
          </div>
          <Button variant="secondary">Add New Promo</Button>
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
              {/* LOOP HERE */}
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
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
                  <div className={styles.actionBtn}>
                    <div
                      className={styles.delete}
                      onClick={() => handleDeleteProduct()}
                    >
                      <X color="#ffffff" weight="bold" />
                    </div>
                    <div
                      className={styles.edit}
                      onClick={() => handleEditProduct()}
                    >
                      <PencilSimple color="#ffffff" weight="bold" />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </main>
          <Button variant="secondary" className={styles.addNewProduct}>
            Add New Product
          </Button>
        </section>
      </div>
    </Layout>
  );
}
