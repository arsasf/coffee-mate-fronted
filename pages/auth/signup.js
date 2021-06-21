/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import Footer from "components/module/Footer";
import styles from "styles/Signup.module.css";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { CircleWavyCheck } from "phosphor-react";
import { unauthPage } from "middleware/authPage";
import axiosApiIntances from "utils/axios";

export const getServerSideProps = async (context) => {
  await unauthPage(context);
  return { props: {} };
};

export default function Signup() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createAccount = (e, data) => {
    e.preventDefault();
    setError(false);

    if (form.userEmail && form.userPassword && form.userPhone) {
      setLoading(true);

      axiosApiIntances
        .post("auth/register", data)
        .then(() => {
          setLoading(false);
          setSuccess(true);
          window.setTimeout(() => {
            router.push("/login");
          }, 5000);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
          setMessage("Whoops... Someone has already used this email.");
        });
    }
  };

  return (
    <Layout title="Signup">
      <div className={styles.outerContainer}>
        <Row xs={1} md={2} className="g-0">
          <Col>
            <div className={`${styles.leftBanner}`} />
          </Col>
          <Col>
            <div className={`p-5 ${styles.rightSide}`}>
              <div className="d-flex align-items-center justify-content-between">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/" style={{ textDecoration: "none" }}>
                  <div className={styles.brand}>
                    <img
                      src="/coffee-icon.png"
                      className={styles.brandLogo}
                      alt="logo"
                    />
                    <span>Coffee Mate</span>
                  </div>
                </a>
                <Button
                  variant="primary"
                  type="button"
                  className={styles.loginBtn}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </div>
              <Form
                className={`${styles.signupForm}`}
                onSubmit={(e) => createAccount(e, form)}
              >
                <h1>Sign Up</h1>
                {success && (
                  <div className={styles.successAlert}>
                    <CircleWavyCheck weight="fill" />
                    <p>
                      Cool! Your account is setup. You will be directed to Log
                      In page in 3 seconds.
                    </p>
                  </div>
                )}
                <Form.Group controlId="email" className={styles.email}>
                  <Form.Label>Email address :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    className={`shadow-none ${error && styles.errorBorder}`}
                    name="userEmail"
                    onChange={(e) => changeText(e)}
                  />
                  {error && (
                    <span className={styles.errorAlert}>{message}</span>
                  )}
                  {!form.userEmail && (
                    <span className={styles.errorAlert}>
                      {"You can't leave this field empty"}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    className="shadow-none"
                    name="userPassword"
                    onChange={(e) => changeText(e)}
                  />
                  {!form.userPassword && (
                    <span className={styles.errorAlert}>
                      {"You can't leave this field empty"}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="phoneNumber" className={styles.phone}>
                  <Form.Label>Phone Number :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    className="shadow-none"
                    name="userPhone"
                    onChange={(e) => changeText(e)}
                  />
                  {!form.userPhone && (
                    <span className={styles.errorAlert}>
                      {"You can't leave this field empty"}
                    </span>
                  )}
                </Form.Group>
                {loading ? (
                  <Button
                    variant="primary"
                    className={`d-flex align-items-center justify-content-center ${styles.signupBtn}`}
                    disabled
                  >
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    <span className="sr-only">Creating your account...</span>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.signupBtn}
                  >
                    Sign Up
                  </Button>
                )}
                <Button
                  variant="light"
                  type="button"
                  className={styles.googleBtn}
                >
                  <img
                    src="/google-icon.png"
                    className={styles.googleIcon}
                    alt="google-icon"
                  />
                  Sign up with Google
                </Button>
              </Form>
              <div className={styles.overflowCard}>
                <div>
                  <h2>Get your member card now!</h2>
                  <span>
                    {"Let's join with our member and enjoy the deals."}
                  </span>
                </div>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => router.push("/signup")}
                >
                  Create Now
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Footer home={false} />
    </Layout>
  );
}
