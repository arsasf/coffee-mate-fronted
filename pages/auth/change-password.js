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

export default function changePassword() {
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [alert, setAlert] = useState([false, ""]);

  const handleRequest = (event) => {
    event.preventDefault();
    if (newPassword === confirmPassword) {
      axiosApiIntances
      .patch("auth/reset-password", {
        email,
        otp,
        newPassword
      })
      .then((res) => {
        setAlert([true, res.data.msg]);
        setTimeout(() => {
          setAlert([false, ""]);
          router.push("/login");
        }, 3000);
      })
      .catch((error) => {
        setAlert([true, error.response.data.msg]);
        setTimeout(() => {
          setAlert([false, ""]);
        }, 3000)
      })
    } else {
      setAlert([true, "Password mismatch"])
      setTimeout(() => {
        setAlert([false, ""])
      }, 3000)
    }
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

        <div className="d-flex flex-column flex-sm-row align-items-center my-1 w-70">
          <input 
            placeholder="Enter your email"
            type="email"
            className="shadow-none"
            name="userEmail"
            onChange={(event) => {
              setEmail(event.target.value)
            }}
            required
          />
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center my-1 w-70">
          <input
            type="number"
            placeholder="Enter OTP sent to your email"
            name="otp"
            onChange={(event) => {
              setOtp(event.target.value)
            }}
            required
          />
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center my-1 w-70">
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            onChange={(event) => {
              setNewPassword(event.target.value)
            }}
            required
          />
        </div>

        <div className="d-flex flex-column flex-sm-row align-items-center my-1 w-70">
          <input
            type="password"
            name="newPassword"
            placeholder="Confirm new password"
            onChange={(event) => {
              setConfirmPassword(event.target.value)
            }}
            required
          />
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
