/* eslint-disable @next/next/no-img-element */
import axiosApiIntances from "utils/axios";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { authPage, adminPage } from "middleware/authPage";
import styles from "styles/AdminProducts.module.css";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import {
  Alert,
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import ReactPaginate from "react-paginate";
import { MagnifyingGlass } from "phosphor-react";
import { X, PencilSimple, Warning } from "phosphor-react";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await adminPage(context);

  const authorization = { Authorization: `Bearer ${data.token || ""}` };
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
    props: { pagination: products.pagination, products: products.data, promos },
  };
};

export default function Product(props) {
  const router = useRouter();
  const { pagination, products, promos } = props;
  const [page, setPage] = useState("1");
  const [order, setOrder] = useState("");
  const [keyword, setKeyword] = useState("");
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteCoupon, setDeleteCoupon] = useState({ true: false });
  const [deleteProduct, setDeleteProduct] = useState({ true: false });

  const handleDeleteCoupon = (id) => {
    axiosApiIntances.delete(`promo/${id}`).then(() => {
      setDeleteCoupon({ true: false });
      keyword && order
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { keyword, order, page },
          })
        : keyword
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { keyword, page },
          })
        : order
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { order, page },
          })
        : router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { page },
          });
    });
  };

  const handleDeleteProduct = (id) => {
    axiosApiIntances.delete(`product/${id}`).then(() => {
      setDeleteProduct({ true: false });
      keyword && order
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { keyword, order, page },
          })
        : keyword
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { keyword, page },
          })
        : order
        ? router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { order, page },
          })
        : router.push({
            pathname: `/admin/product/${selectedCategory}`,
            query: { page },
          });
    });
  };

  const handleSearch = () => {
    keyword && order
      ? router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { keyword, order },
        })
      : keyword
      ? router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { keyword },
        })
      : router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { order },
        });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    setPage(selectedPage);

    keyword && order
      ? router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { keyword, order, page: selectedPage },
        })
      : keyword
      ? router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { keyword, page: selectedPage },
        })
      : order
      ? router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { order, page: selectedPage },
        })
      : router.push({
          pathname: `/admin/product/${selectedCategory}`,
          query: { page: selectedPage },
        });
  };

  return (
    <Layout title="Products">
      <Navbar login={true} />
      <div className={styles.container}>
        <Modal
          size="sm"
          show={confirmModal}
          onHide={() => {
            setConfirmModal(false),
              setDeleteCoupon({ true: false }),
              setDeleteProduct({ true: false });
          }}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-sm">
              Delete Item
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="text-start">
            Are you sure want to delete this item?
            <Alert
              variant="danger"
              className="d-flex flex-column align-items-center justify-content-center text-bold text-center mt-3"
              style={{
                fontSize: ".8em",
                fontWeight: "600",
                backgroundColor: "#ff9aa4",
                color: "#b91929",
              }}
            >
              <Warning weight="bold" size={28} className="mb-2" />
              Warning! Unable to recover data while action is executed.
            </Alert>
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ height: "36px", padding: "0px 10%" }}
              variant="light"
              onClick={() => {
                setConfirmModal(false);
                setDeleteCoupon({ true: false });
                setDeleteProduct({ true: false });
              }}
            >
              Close
            </Button>
            <Button
              style={{ height: "36px", padding: "0px 10%" }}
              variant="primary"
              onClick={() => {
                setConfirmModal(false);
                deleteCoupon.true
                  ? handleDeleteCoupon(deleteCoupon.id)
                  : handleDeleteProduct(deleteProduct.id);
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
                  onClick={() => {
                    setConfirmModal(true),
                      setDeleteCoupon({
                        ...deleteCoupon,
                        true: true,
                        id: item.promo_id,
                      });
                  }}
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
              id="all"
              className={
                selectedCategory === "all" ? styles.activeCategory : ""
              }
              onClick={(e) => {
                setSelectedCategory(e.target.id),
                  router.push(`/admin/product/${e.target.id}?page=1`);
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
                  router.push(`/admin/product/${e.target.id}?page=1`);
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
                  router.push(`/admin/product/${e.target.id}?page=1`);
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
                  router.push(`/admin/product/${e.target.id}?page=1`);
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
                  router.push(`/admin/product/${e.target.id}?page=1`);
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
              {/* LOOP HERE */}
              {products.length === 0 ? (
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
                        <span>
                          IDR {item.product_base_price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className={styles.actionBtn}>
                        <div
                          className={styles.delete}
                          onClick={() => {
                            setConfirmModal(true),
                              setDeleteProduct({
                                ...deleteProduct,
                                true: true,
                                id: item.product_id,
                              });
                          }}
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
            onClick={() => router.push("/admin/new-product")}
          >
            Add New Product
          </Button>
        </section>
      </div>
      <Footer />
    </Layout>
  );
}
