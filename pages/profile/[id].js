/* eslint-disable @next/next/no-img-element */
import Cookie from "js-cookie";
import Image from "next/image";
import axios from "utils/axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Profile.module.css";
import { authPage, customerPage } from "middleware/authPage";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await customerPage(context);

  const res = await axios.axiosApiInstances
    .get(`user/by-id/${data.userId}`)
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return new Error(error);
    });
  return {
    props: { user: res },
  };
};

export default function Profile(props) {
  const router = useRouter();
  const [editContact, setEditContact] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

  const {
    user_address,
    user_birth,
    user_display_name,
    user_email,
    user_gender,
    user_image,
    user_name,
    user_phone,
  } = props.user;
  const [form, setForm] = useState({
    userAddress: user_address,
    userDisplay: user_display_name,
    userEmail: user_email,
    userGender: user_gender,
    userName: user_name,
    userPhone: user_phone,
    userBirth: user_birth,
  });

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    Cookie.remove("userRole");
    router.push("/login");
  };

  return (
    <Layout title="Profile">
      <Navbar profile={true} login={true} />
      <div className={styles.container}>
        <h1>User Profile</h1>
        <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
          <Col xs={12} md={4} lg={4}>
            <div className={`${styles.imageSection}`}>
              <div className={styles.avaContainer}>
                <Image
                  src={
                    user_image
                      ? `${process.env.API_IMG_URL}${user_image}`
                      : "/default-img-placeholder.png"
                  }
                  alt="avatar"
                  layout="fill"
                  className={styles.userAvatar}
                />
                <label htmlFor="upload" className={styles.edit}>
                  <img src="/pencil.svg" alt="pencil-icon" />
                </label>
              </div>
              <input type="file" id="upload" />
              <h3 title={user_display_name ? user_display_name : "User"}>
                {user_display_name ? user_display_name : "User"}
              </h3>
              <span>{user_email ? user_email : "Set your email"}</span>
              <Button variant="secondary">Remove photo</Button>
            </div>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <div className={`${styles.contactSection}`}>
              <div
                className={styles.edit}
                onClick={() =>
                  editContact ? setEditContact(false) : setEditContact(true)
                }
              >
                <img src="/pencil.svg" alt="pencil-icon" />
              </div>
              <h4>Contact</h4>
              <div>
                <div className="d-flex flex-column flex-md-row justify-content-md-between">
                  <Form.Group controlId="email" className="w-100 me-md-5">
                    <Form.Label>Email address :</Form.Label>
                    {!editContact ? (
                      <h5>{user_email ? user_email : "Set your email"}</h5>
                    ) : (
                      <Form.Control
                        type="email"
                        placeholder="New email address"
                        className="shadow-none"
                        name="userEmail"
                        value={form.userEmail}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                  <Form.Group controlId="phone" className="w-100">
                    <Form.Label>Mobile number :</Form.Label>
                    {!editContact ? (
                      <h5>(+62) {user_phone ? user_phone.substr(1) : "-"}</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="New phone number"
                        className="shadow-none"
                        name="userPassword"
                        value={form.userPhone}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Delivery address</Form.Label>
                  {!editContact ? (
                    <h5>{user_address ? user_address : "Set your address"}</h5>
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="shadow-none"
                      name="userAddress"
                      value={form.userAddress}
                    />
                  )}
                </Form.Group>
              </div>
            </div>
          </Col>
        </Row>
        <Row xs={1} md={2} className="gy-3">
          <Col xs={12} md={8} lg={8}>
            <div className={`${styles.detailSection}`}>
              <div
                className={styles.edit}
                onClick={() =>
                  editDetail ? setEditDetail(false) : setEditDetail(true)
                }
              >
                <img src="/pencil.svg" alt="pencil-icon" />
              </div>
              <h4>Details</h4>
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className={styles.nameInput}>
                  <Form.Group controlId="email">
                    <Form.Label>Display name :</Form.Label>
                    {!editDetail ? (
                      <h5>{user_display_name ? user_display_name : "User"}</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="Display name"
                        className="shadow-none"
                        name="userDisplay"
                        value={form.userDisplay}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                  <Form.Group controlId="userName">
                    <Form.Label>Full name :</Form.Label>
                    {!editDetail ? (
                      <h5>{user_name ? user_name : "Set your name"}</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="Full name"
                        className="shadow-none"
                        name="userName"
                        value={form.userName}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                </div>
                <div className={styles.additionalDetail}>
                  <Form.Group controlId="userName">
                    <Form.Label>Birth date :</Form.Label>
                    {!editDetail ? (
                      <h5>{user_birth ? user_birth : "DD/MM/YY"}</h5>
                    ) : (
                      <Form.Control
                        type="date"
                        className="shadow-none"
                        name="userBirth"
                        value={form.userBirth}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="userGender"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="userGender"
                    id="formHorizontalRadios2"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <div className={`${styles.actionBtnSection}`}>
              <h6>Do you want to save the change?</h6>
              <Button variant="secondary">Save Change</Button>
              <Button variant="primary">Cancel</Button>
              <Button variant="light" className={styles.editPassword}>
                Edit Password
                <img src="/chevron-right.svg" alt="chevron-right" />
              </Button>
              <Button
                variant="light"
                className={styles.logout}
                onClick={handleLogout}
              >
                Log Out
                <img src="/chevron-right.svg" alt="chevron-right" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Footer home={true} />
    </Layout>
  );
}
