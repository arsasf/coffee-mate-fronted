/* eslint-disable @next/next/no-img-element */
import Layout from "components/Layout";
import styles from "styles/PaymentDetails.module.css";
import { BiCreditCardFront } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { FaTruck } from "react-icons/fa";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";

export default function PaymentDetails() {
  return (
    <div>
      <Layout title="Payment Details">
        <Navbar login={true} cart={true} />
        <div className={`${styles.payment_details_background} container-fluid`}>
          <div className="row ms-5">
            <div className="col mt-5 ms-5 mb-5">
              <h3 className="text-light shadow">Checkout Your Item Now!</h3>
              <div className="row">
                <div className={`${styles.left_column_1} col-8 bg-light ms-3`}>
                  <h3
                    className={`${styles.left_column_text_1} text-center my-3`}
                  >
                    Order Summary
                  </h3>
                  {/* ****************** */}
                  <div className="row">
                    <div className="col">
                      <img src="/payment-img-menu-1.png" alt="payment menu 1" />
                    </div>
                    <div className="col">
                      <p>Hazelnut Latte</p>
                      <p>x 1</p>
                      <p>Regular</p>
                    </div>
                    <div className="col my-3">
                      <p>IDR 24.000</p>
                    </div>
                  </div>
                  {/* ****************** */}
                  <div className="row">
                    <div className="col">
                      <img src="/payment-img-menu-2.png" alt="payment menu 2" />
                    </div>
                    <div className="col">
                      <p>Chicken Fire Wings</p>
                      <p>x 2</p>
                      <p>250 gr</p>
                    </div>
                    <div className="col">
                      <p>IDR 30.000</p>
                    </div>
                  </div>
                  {/* ****************** */}
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Promo...</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <div className="row mt-4 mx-auto">
                    <div className="col">
                      <p>DISCOUNT</p>
                      <p>SUBTOTAL</p>
                      <p>TAX &amp; FEES</p>
                    </div>
                    <div className="col">
                      <p>IDR 10.000</p>
                      <p>IDR 120.000</p>
                      <p>IDR 20.000</p>
                    </div>
                  </div>
                  <div className="row mt-4 mb-4 mx-auto">
                    <div className="col">
                      <h5 className={styles.left_column_text_1}>Total</h5>
                    </div>
                    <div className="col">
                      <h5 className={styles.left_column_text_1}>IDR 130.000</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mt-5 mb-5">
              <div className="row">
                <div className="col mt-2">
                  <h5 className={`${styles.right_column_text} text-light`}>
                    Address detail
                  </h5>
                  <div className="row">
                    <div className={`${styles.right_column_1} col-5 bg-light`}>
                      <p>
                        <b>Delivery</b> to Iskandar Street
                      </p>
                      <p>
                        Km 5 refinery road oppsite re public road, effurun,
                        Jakarta
                      </p>
                      <p>+62 81348287878</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col mt-5">
                  <h5 className={`${styles.right_column_text} text-light`}>
                    Payment method
                  </h5>
                  <div className="row">
                    <div className={`${styles.right_column_2} col-5 bg-light`}>
                      <div className="form-check my-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label className="form-check-label">
                          <i>
                            <BiCreditCardFront
                              className={styles.right_column_icon_size_1}
                            />
                          </i>{" "}
                          Card
                        </label>
                      </div>
                      <div className="form-check my-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label className="form-check-label">
                          <i>
                            <AiOutlineBank
                              className={styles.right_column_icon_size_2}
                            />
                          </i>{" "}
                          Bank account
                        </label>
                      </div>
                      <div className="form-check my-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                        />
                        <label className="form-check-label">
                          <i>
                            <FaTruck
                              className={styles.right_column_icon_size_3}
                            />
                          </i>{" "}
                          Cash on delivery
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className={`${styles.right_column_button_size} btn btn-secondary mt-4`}
              >
                Confirm and Pay
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </Layout>
    </div>
  );
}
