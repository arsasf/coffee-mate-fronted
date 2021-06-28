import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form } from "react-bootstrap";
import axiosApiIntances from "../../utils/axios";
import Footer from "components/module/Footer";
import Layout from "components/Layout";
import styles from "styles/ForgotPass.module.css";
import { unauthPage } from "middleware/authPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function ForgotPassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: ""
  });
  const [alert, setAlert] = useState([false, ""]);

  const handleRequest = (event) => {
    event.preventDefault();
    axiosApiIntances
      .post("auth/req-otp", {
        email: form.email
      })
      .then((res) => {
        setAlert([true, res.data.msg]);
        setTimeout(() => {
          setAlert([false, ""]);
          router.push("/change-password");
        }, 3000);
      })
      .catch((error) => {
        setAlert([true, error.response.data.msg]);
        setTimeout(() => {
          setAlert([false, ""]);
        }, 3000)
      })
  }

  return (
    <Layout title="Forgot Password">
      <div className={styles.container}>
        <div className="d-flex flex-column align-items-center">
          <h1>Forgot your password?</h1>
          <span>{"Don't worry, we got your back!"}</span>
        </div>
        {alert[0] ? 
          (<div className="alert alert-warning text-center" role="alert">
          {alert[1]}</div>) : ("")}
        <div className="d-flex flex-column flex-sm-row align-items-center my-5 w-100">
          <Form.Group controlId="email" className="w-100">
            <Form.Control
              type="email"
              placeholder="Enter your email adress to get link..."
              className="shadow-none"
              name="userEmail"
              onChange={(event) => {
                setForm({
                  ...form,
                  ...{ email: event.target.value },
                })
              }}
              required
            />
          </Form.Group>
          
          <Button variant="primary" className={styles.send}
            onClick={handleRequest}
          >
            Send
          </Button>
        </div>
        
        <p>
          {"Click the button below if you don't receive any link in 2 minutes"}
        </p>
        <Button variant="secondary" className={styles.resend}
          onClick={handleRequest}
        >
          Resend Link
        </Button>
      </div>
      <Footer home={true} />
    </Layout>
  );
}
