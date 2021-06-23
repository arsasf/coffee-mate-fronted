import Layout from "components/Layout";
import { useState } from "react";
import styles from "styles/ForgotPass.module.css";
import { Button, Form } from "react-bootstrap";
import Footer from "components/module/Footer";
import axiosApiIntances from "utils/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)
  
  const reqOtp = (email) => {
    event.preventDefault()

    axiosApiIntances
      .patch('auth/req-otp', email)
      .then(() => {
        window.setTimeout(() => {
          router.push('/lalala')
        }, 3000)
      })
      .catch(() => {
        setError(true);
      })
  }

  return (
    <Layout title="Forgot Password">
      <div className={styles.container}>
        <div className="d-flex flex-column align-items-center">
          <h1>Forgot your password?</h1>
          <span>{"Don't worry, we got your back!"}</span>
        </div>
        <div className="d-flex flex-column flex-sm-row align-items-center my-5 w-100">
          <Form.Group controlId="email" className="w-100" onSubmit={reqOtp}>
            <Form.Control
              type="email"
              placeholder="Enter your email adress to get link..."
              className="shadow-none"
              name="userEmail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" className={styles.send}>
            Send
          </Button>
        </div>
        <p>
          {"Click the button below if you don't receive any link in 2 minutes"}
        </p>
        <Button variant="secondary" className={styles.resend} onClick={reqOtp}>
          Resend Link
        </Button>
      </div>
      <Footer home={true} />
    </Layout>
  );
}
