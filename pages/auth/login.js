/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Link from "next/link";
import Layout from "components/Layout";
import Footer from "components/module/Footer";
import styles from "styles/Login.module.css";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { unauthPage } from "middleware/authPage";
import axios from "utils/axios";

export const getServerSideProps = async (context) => {
  await unauthPage(context);
  return { props: {} };
};

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e, data) => {
    e.preventDefault();
    setLoading(true);
    setEmptyEmail(false);
    setWrongEmail(false);
    setEmptyPassword(false);
    setWrongPassword(false);

    if (!form.userEmail && !form.userPassword) {
      setLoading(false);
      setEmptyEmail(true);
      setEmptyPassword(true);
    } else if (!form.userEmail) {
      setLoading(false);
      setEmptyEmail(true);
    } else if (!form.userPassword) {
      setLoading(false);
      setEmptyPassword(true);
    } else {
      // Will execute API login
      axios.axiosApiInstances
        .post("auth/login", data)
        .then((res) => {
          const { token, user_id, user_role } = res.data.data;
          Cookie.set("token", token, {
            expires: 1,
            secure: true,
          });
          Cookie.set("userId", user_id, {
            expires: 1,
            secure: true,
          });
          Cookie.set("userRole", user_role, {
            expires: 1,
            secure: true,
          });
          user_role === "user"
            ? router.push("/customers/product")
            : router.push("/admin/product");
        })
        .catch((err) => {
          setLoading(false);
          const msg = err.response.data.msg.toLowerCase();
          msg.includes("email")
            ? setWrongEmail(true)
            : msg.includes("password")
            ? setWrongPassword(true)
            : new Error(err);
        });
    }
  };

  return (
    <Layout title="Login">
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
                  className={styles.signupBtn}
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </div>
              <Form
                className={`${styles.loginForm}`}
                onSubmit={(e) => handleLogin(e, form)}
              >
                <h1>Login</h1>
                <Form.Group controlId="email" className={styles.email}>
                  <Form.Label>Email address :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    className={`shadow-none ${
                      emptyEmail || wrongEmail ? styles.errorBorder : ""
                    }`}
                    name="userEmail"
                    onChange={(e) => changeText(e)}
                  />
                  {emptyEmail && (
                    <span className={styles.errorAlert}>
                      {"Please input your email, mate!"}
                    </span>
                  )}
                  {wrongEmail && (
                    <span className={styles.errorAlert}>
                      {"Email is not registered..."}
                    </span>
                  )}
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    className={`shadow-none ${
                      emptyPassword || wrongPassword ? styles.errorBorder : ""
                    }`}
                    name="userPassword"
                    onChange={(e) => changeText(e)}
                  />
                  {emptyPassword && (
                    <span className={styles.errorAlert}>
                      {"Please input your password, mate!"}
                    </span>
                  )}
                  {wrongPassword && (
                    <span className={styles.errorAlert}>
                      {"Mate, your password is incorrect..."}
                    </span>
                  )}
                </Form.Group>
                <Link href="/forgot-password">Forgot password?</Link>
                {loading ? (
                  <Button
                    variant="primary"
                    className={styles.loginBtn}
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
                    <span className="sr-only">Login...</span>
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    className={styles.loginBtn}
                  >
                    Login
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
                  Login with Google
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
