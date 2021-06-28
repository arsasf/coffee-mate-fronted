/* eslint-disable @next/next/no-img-element */
import axiosApiIntances from "utils/axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { authPage, customerPage } from "middleware/authPage";
import styles from "styles/CustProducts.module.css";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { MagnifyingGlass, SmileySad } from "phosphor-react";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);

  const authorization = { Authorization: `Bearer ${data.token || ""}` };
  let { category } = context.params;
  let { keyword, order, page } = context.query;

  const promos = await axiosApiIntances
    .get("promo", {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  category === "all" ? (category = "") : category;
  !keyword ? (keyword = "") : keyword;
  !order ? (order = "") : order;
  !page ? (page = "1") : page;

  let products;
  if (category) {
    products = await axiosApiIntances
      .get(
        `product/category?category=${category}&keyword=${keyword}&orderBy=${order}&page=${page}`,
        {
          headers: authorization,
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return { data: [], pagination: { totalPage: "0" } };
      });
  } else {
    products = await axiosApiIntances
      .get(`product/?keyword=${keyword}&orderBy=${order}&page=${page}`, {
        headers: authorization,
      })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return { data: [], pagination: { totalPage: "0" } };
      });
  }
  return {
    props: {
      pagination: products.pagination,
      products: products.data,
      promos,
      userLogin: data,
    },
  };
};

export default function Product(props) {
  const router = useRouter();
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [coupon, setCoupon] = useState(false);

  const handleSelectCoupon = (e) => {
    setSelectedCoupon({
      [e.target.id]: true,
    });
  };

  const handleSearch = () => {
    keyword && order
      ? router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { keyword, order },
        })
      : keyword
      ? router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { keyword },
        })
      : router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { order },
        });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);

    keyword && order
      ? router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { keyword, order, page: selectedPage },
        })
      : keyword
      ? router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { keyword, page: selectedPage },
        })
      : order
      ? router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { order, page: selectedPage },
        })
      : router.push({
          pathname: `/customers/product/${selectedCategory}`,
          query: { page: selectedPage },
        });
  };

  const handleCoupon = () => {
    axiosApiIntances
      .patch(`/order/update-coupon/${data.userLogin.userId}`, {
        headers: {
          Authorization: `Bearer ${data.userLogin.token || ""}`,
        },
      })
      .then((res) => {
        setCoupon(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
            {props.promos.length > 0 ? (
              props.promos.map((item, index) => (
                <div
                  id={`c${item.promo_id}`}
                  className={`${styles.coupon}`}
                  // ${
                  //   `
                  //   ${selectedCoupon.c}${item.promo_id}` && styles.selectedCoupon
                  // }
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
              ))
            ) : (
              <div className={styles.emptyPromo}>
                <p className="m-0 mb-lg-3">
                  Sorry, We don't have promo for now
                </p>
                <SmileySad size={32} weight="bold" />
              </div>
            )}
          </div>
          <Button variant="secondary" onClick={() => handleCoupon()}>
            {coupon === false ? "Apply Coupon" : "Coupon Already Added"}
          </Button>
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
                  setPage(1),
                  router.push(`/customers/product/${e.target.id}?page=1`);
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
                  setPage(1),
                  router.push(`/customers/product/${e.target.id}?page=1`);
              }}
            >
              Coffee
            </h4>
            <h4
              id="noncoffee"
              className={
                selectedCategory === "noncoffee" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  setPage(1),
                  router.push(`/customers/product/${e.target.id}?page=1`);
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
                  setPage(1),
                  router.push(`/customers/product/${e.target.id}?page=1`);
              }}
            >
              Foods
            </h4>
            <h4
              id="addon"
              className={
                selectedCategory === "addon" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  setPage(1),
                  router.push(`/customers/product/${e.target.id}?page=1`);
              }}
            >
              Add-On
            </h4>
          </div>
          <div className={styles.searchBar}>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Search product..."
              className="shadow-none"
              onChange={(e) => setKeyword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              variant="light"
              className={styles.searchBtn}
              onClick={handleSearch}
            >
              <MagnifyingGlass weight="bold" />
            </Button>
            <DropdownButton
              id="dropdown-basic-button"
              menuAlign="right"
              title="Sort By"
              className={styles.sortBtn}
              value={keyword}
            >
              <Dropdown.Item onClick={() => setOrder("product_name ASC")}>
                Name a-z
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOrder("product_name DESC")}>
                Name z-a
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setOrder("product_base_price ASC")}>
                Price lowest-highest
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setOrder("product_base_price DESC")}
              >
                Price highest-lowest
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
                        <span>
                          IDR {item.product_base_price.toLocaleString("id-ID")}
                        </span>
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
