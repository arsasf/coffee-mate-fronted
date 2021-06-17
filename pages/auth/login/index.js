import { useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Login.module.css";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({});
  // const [loading, setLoading] = useState(false);

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  console.log(form);

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
                <a href="/">
                  <div className={styles.brand}>
                    <img src="/coffee-icon.png" className={styles.brandLogo} />
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
              <Form className={`${styles.loginForm}`}>
                <h1>Login</h1>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address :</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter yout email address"
                    className="shadow-none"
                    name="userEmail"
                    onChange={(e) => changeText(e)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    className="shadow-none"
                    name="userPassword"
                    onChange={(e) => changeText(e)}
                  />
                </Form.Group>
                <Link href="/reset-password">Forgot password?</Link>
                <Button
                  variant="primary"
                  type="submit"
                  className={styles.loginBtn}
                >
                  Login
                </Button>
                <Button
                  variant="light"
                  type="button"
                  className={styles.googleBtn}
                >
                  <img src="/google-icon.png" className={styles.googleIcon} />
                  Login with Google
                </Button>
              </Form>
              <div className={styles.overflowCard}>
                <div>
                  <h2>Get your member card now!</h2>
                  <span>Let's join with our member and enjoy the deals.</span>
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
    </Layout>
  );
}
