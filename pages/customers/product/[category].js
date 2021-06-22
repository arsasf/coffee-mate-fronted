/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import { useState } from "react";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import styles from "styles/CustProducts.module.css";
import Image from "next/image";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import { authPage, customerPage } from "middleware/authPage";
import { useRouter } from "next/router";
import axiosApiIntances from "utils/axios";
import ReactPaginate from "react-paginate";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);
  let { category } = context.params;
  let { keyword, order, page } = context.query;

  const promos = await axiosApiIntances
    .get("promo", {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data;
    });

  if (category === "all") {
    category = "";
  }
  if (!keyword) {
    keyword = "";
  }
  if (!order) {
    order = "";
  }
  if (!page) {
    page = "1";
  }
  const products = await axiosApiIntances
    .get(
      `product/category?category=${category}&keyword=${keyword}&orderBy=${order}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${data.token || ""}`,
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { data: [], pagination: [] };
    });
  return {
    props: { pagination: products.pagination, products: products.data, promos },
  };
};

export default function Product(props) {
  const router = useRouter();
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSelectCoupon = (e) => {
    setSelectedCoupon({
      [e.target.id]: true,
    });
  };

  const handleSearch = () => {
    router.push(
      `/customers/product/${selectedCategory}?keyword=${keyword}&order=${order}&page=${page}`
    );
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
    router.push(
      `/customers/product/${selectedCategory}?keyword=${keyword}&order=${order}&page=${selectedPage}`
    );
  };

  return (
    <Layout title="Products">
      <Navbar product={true} login={true} />
      <div className={styles.container}>
        <section className={styles.promoSection}>
          <div className={styles.head}>
            <h1>Promo Today</h1>
            <p>Coupons will be updated every weeks. Check them out!</p>
          </div>
          <div className={styles.coupons}>
            {/* LOOPING HERE */}
            {props.promos.map((item, index) => (
              <div
                id={`c${item.promo_id}`}
                className={`${styles.coupon} ${
                  `
                  ${selectedCoupon.c}${item.promo_id}` && styles.selectedCoupon
                }`}
                key={item.promo_id}
                onClick={(e) => handleSelectCoupon(e)}
              >
                {item.promo_image && (
                  <img
                    id={`c${item.promo_id}`}
                    src={`${process.env.API_IMG_URL}${item.promo_image}`}
                    alt="coupon-image"
                  />
                )}
                <div id={`c${item.promo_id}`}>
                  <h6 id={`c${item.promo_id}`}>{item.promo_name}</h6>
                  <span id={`c${item.promo_id}`}>{item.promo_desc}</span>
                </div>
              </div>
            ))}
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
              id="all"
              className={
                selectedCategory === "all" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/customers/product/${e.target.id}?page=${page}`);
              }}
            >
              All Products
            </h4>
            <h4
              id="coffee"
              className={
                selectedCategory === "coffee" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/customers/product/${e.target.id}?page=${page}`);
              }}
            >
              Coffee
            </h4>
            <h4
              id="nonCoffee"
              className={
                selectedCategory === "nonCoffee" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/customers/product/${e.target.id}?page=${page}`);
              }}
            >
              Non Coffee
            </h4>
            <h4
              id="food"
              className={
                selectedCategory === "food" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/customers/product/${e.target.id}?page=${page}`);
              }}
            >
              Foods
            </h4>
            <h4
              id="addOn"
              className={
                selectedCategory === "addOn" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/customers/product/${e.target.id}?page=${page}`);
              }}
            >
              Add-On
            </h4>
          </div>
          <div className={styles.searchBar}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Small text"
              className="shadow-none"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <DropdownButton
              id="dropdown-basic-button"
              menuAlign="right"
              title="Sort By"
              value={keyword}
            >
              <Dropdown.Item onClick={() => setOrder("product_name ASC")}>
                Name a-Z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOrder("product_name DESC")}>
                Name A-z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOrder("product_base_price ASC")}>
                Price 0-100
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setOrder("product_base_price DESC")}
              >
                Price 100-0
              </Dropdown.Item>
            </DropdownButton>
          </div>
          <main className={styles.productList}>
            <Row xs={2} md={4} className={`gx-3 ${styles.row}`}>
              {props.products.length === 0 ? (
                <Col style={{ width: "100%" }}>
                  <div
                    style={{
                      display: "grid",
                      height: "20vh",
                      placeItems: "center",
                    }}
                  >
                    <strong style={{ fontSize: "2em" }}>No Products</strong>
                  </div>
                </Col>
              ) : (
                props.products.map((item, index) => (
                  <Col
                    key={index}
                    onClick={() =>
                      router.push(
                        `/customers/product-details/${item.product_id}`
                      )
                    }
                  >
                    <div className={styles.cardProduct}>
                      <div className={styles.imgContainer}>
                        <Image
                          layout="fill"
                          src={
                            item.product_image
                              ? `${process.env.API_IMG_URL}${item.product_image}`
                              : "/default-img-placeholder.png"
                          }
                          alt="product-img"
                        />
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <h5>{item.product_name}</h5>
                        <span>IDR {item.product_base_price}</span>
                      </div>
                    </div>
                  </Col>
                ))
              )}
            </Row>
          </main>
          <div
            className={`d-flex justify-content-center mb-5 ${styles.pagination}`}
          >
            <ReactPaginate
              previousLabel={""}
              nextLabel={""}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={props.pagination.totalPage} // Total page
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
        </section>
      </div>
      <Footer />
    </Layout>
  );
}
