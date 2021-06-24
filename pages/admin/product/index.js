/* eslint-disable @next/next/no-img-element */
import axiosApiIntances from "utils/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/AdminProducts.module.css";
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
import { X, PencilSimple } from "phosphor-react";
import { authPage, adminPage } from "middleware/authPage";
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  await adminPage(context);

  const result = await axiosApiIntances
    .get(`/user/by-id/${data.userId}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      // console.log(res.config.headers);
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err);
      return [];
    });

  return {
    props: { data: result, userLogin: data },
  };
}

export default function Product(props) {
  const router = useRouter();
  const [page, setPage] = useState("");
  const [order, setOrder] = useState("");
  const [promos, setPromos] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [emptyProduct, setEmptyProduct] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const limit = "3";

  useEffect(() => {
    axiosApiIntances.get("promo").then((res) => {
      setPromos(res.data.data);
    });
  }, []);

  useEffect(() => {
    setEmptyProduct(false);
    selectedCategory === "coffee"
      ? axiosApiIntances
          .get(`product/category?category=coffee&limit=${limit}`)
          .then((res) => {
            setProducts(res.data.data);
            setPagination(res.data.pagination);
          })
          .catch(() => {
            setEmptyProduct(true);
          })
      : selectedCategory === "nonCoffee"
      ? axiosApiIntances
          .get(`product/category?category=noncoffee&limit=${limit}`)
          .then((res) => {
            setProducts(res.data.data);
            setPagination(res.data.pagination);
          })
          .catch(() => {
            setEmptyProduct(true);
          })
      : selectedCategory === "food"
      ? axiosApiIntances
          .get(`product/category?category=food&limit=${limit}`)
          .then((res) => {
            setProducts(res.data.data);
            setPagination(res.data.pagination);
          })
          .catch(() => {
            setEmptyProduct(true);
          })
      : selectedCategory === "addOn"
      ? axiosApiIntances
          .get(`product/category?category=addon&limit=${limit}`)
          .then((res) => {
            setProducts(res.data.data);
            setPagination(res.data.pagination);
          })
          .catch(() => {
            setEmptyProduct(true);
          })
      : axiosApiIntances
          .get(`product/category?limit=${limit}`)
          .then((res) => {
            setProducts(res.data.data);
            setPagination(res.data.pagination);
          })
          .catch(() => {
            setEmptyProduct(true);
          });
  }, [selectedCategory]);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e.target.id);
  };

  const handleDeleteCoupon = (id) => {
    axiosApiIntances.delete(`promo/${id}`).then(() => {
      axiosApiIntances.get("promo").then((res) => {
        setPromos(res.data.data);
      });
    });
  };

  const handleDeleteProduct = (id) => {
    axiosApiIntances.delete(`product/${id}`).then(() => {
      axiosApiIntances
        .get(
          `product/category/?keyword=${keyword}&page=${
            page > page - 1 ? page : page - 1
          }&limit=${limit}&category=${selectedCategory}&orderBy=${order}`
        )
        .then((res) => {
          setProducts(res.data.data);
          setPagination(res.data.pagination);
        })
        .catch((err) => {
          console.log(err.response);
        });
    });
  };

  const handleSearch = () => {
    axiosApiIntances
      .get(
        `product/category/?keyword=${keyword}&page=&limit=${limit}&category=${selectedCategory}&orderBy=${order}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setPagination(res.data.pagination);
        router.push(
          `/admin/product`,
          `/admin/product?keyword=${keyword}&sort=${order}`,
          { shallow: true }
        );
      })
      .catch((err) => {
        setEmptyProduct(true);
      });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);
    axiosApiIntances
      .get(
        `product/category/?keyword=${keyword}&page=${selectedPage}&limit=${limit}&category=${selectedCategory}&orderBy=${order}`
      )
      .then((res) => {
        setProducts(res.data.data);
        router.push(`/admin/product`, `/admin/product?page=${selectedPage}`, {
          shallow: true,
        });
      });
  };

  return (
    <Layout title="Products">
      {console.log(products)}

      <Navbar product={true} login={true} admin={true} user={props.data} />
      <div className={styles.container}>
        <section className={styles.promoSection}>
          <div className={styles.head}>
            <h1>Promo Today</h1>
            <p>Coupons will be updated every weeks. Check them out!</p>
          </div>
          <div className={styles.coupons}>
            {/* LOOP HERE */}
            {promos.map((item, index) => (
              <div className={styles.coupon} key={index}>
                {item.promo_image && (
                  <img
                    src={`${process.env.API_IMG_URL}${item.promo_image}`}
                    alt="coupon-image"
                  />
                )}
                <div>
                  <h6>{item.promo_name}</h6>
                  <span>{item.promo_desc}</span>
                </div>
                <div
                  className={styles.delete}
                  onClick={() => handleDeleteCoupon(item.promo_id)}
                >
                  <X color="#ffffff" weight="bold" />
                </div>
                <div
                  className={styles.edit}
                  onClick={() =>
                    router.push(`/admin/update-promo/${item.promo_id}`)
                  }
                >
                  <PencilSimple color="#ffffff" weight="bold" />
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="secondary"
            onClick={() => router.push("/admin/new-promo")}
          >
            Add New Promo
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
              id=""
              className={!selectedCategory ? styles.activeCategory : ""}
              onClick={(e) => handleSelectCategory(e)}
            >
              All Products
            </h4>
            <h4
              id="coffee"
              className={
                selectedCategory === "coffee" ? styles.activeCategory : ""
              }
              onClick={(e) => handleSelectCategory(e)}
            >
              Coffee
            </h4>
            <h4
              id="nonCoffee"
              className={
                selectedCategory === "nonCoffee" ? styles.activeCategory : ""
              }
              onClick={(e) => handleSelectCategory(e)}
            >
              Non Coffee
            </h4>
            <h4
              id="food"
              className={
                selectedCategory === "food" ? styles.activeCategory : ""
              }
              onClick={(e) => handleSelectCategory(e)}
            >
              Foods
            </h4>
            <h4
              id="addOn"
              className={
                selectedCategory === "addOn" ? styles.activeCategory : ""
              }
              onClick={(e) => handleSelectCategory(e)}
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
              {/* LOOP HERE */}
              {emptyProduct ? (
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
                products.map((item, index) => (
                  <Col key={index}>
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
                      <div className={styles.actionBtn}>
                        <div
                          className={styles.delete}
                          onClick={() => handleDeleteProduct(item.product_id)}
                        >
                          <X color="#ffffff" weight="bold" />
                        </div>
                        <div
                          className={styles.edit}
                          onClick={() =>
                            router.push(
                              `/admin/update-product/${item.product_id}`
                            )
                          }
                        >
                          <PencilSimple color="#ffffff" weight="bold" />
                        </div>
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
              pageCount={pagination.totalPage} // Total page
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(e) => handlePageClick(e)}
              containerClassName={styles.pagination}
              subContainerClassName={`${styles.pages} ${styles.pagination}`}
              activeClassName={styles.active}
            />
          </div>
          <Button
            variant="secondary"
            className={styles.addNewProduct}
            onClick={() => router.push("/admin/new-product/0")}
          >
            Add New Product
          </Button>
        </section>
      </div>
      <Footer />
    </Layout>
  );
}
