/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Profile.module.css";
// import Image from "next/image";

export default function Profile() {
  const [editContact, setEditContact] = useState(false);
  const [editDetail, setEditDetail] = useState(false);
  const [form, setForm] = useState({});

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="Profile">
      <Navbar profile={true} login={true} admin={true} />
      <div className={styles.container}>
        <h1>User Profile</h1>
        <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
          <Col xs={12} md={4} lg={4}>
            <div className={`${styles.imageSection}`}>
              <div className={styles.avaContainer}>
                <img
                  src="/user.jpg"
                  alt="avatar"
                  className={styles.userAvatar}
                />
                <label htmlFor="upload" className={styles.edit}>
                  <img src="/pencil.svg" alt="pencil-icon" />
                </label>
              </div>
              <input type="file" id="upload" />
              <h3 title="Hasna Medika">Hasna Medika</h3>
              <span>hasna.medika@mail.com</span>
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
                      <h5>hasna.medika@mail.com</h5>
                    ) : (
                      <Form.Control
                        type="email"
                        placeholder="New email address"
                        className="shadow-none"
                        name="userEmail"
                        // value={userEmail}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                  <Form.Group controlId="phone" className="w-100">
                    <Form.Label>Mobile number :</Form.Label>
                    {!editContact ? (
                      <h5>(+62)813456782</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="New phone number"
                        className="shadow-none"
                        name="userPassword"
                        // value={userPhone}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Delivery address</Form.Label>
                  {!editContact ? (
                    <h5>Iskandar Street no. 67 Block A Near Bus Stop</h5>
                  ) : (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="shadow-none"
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
                      <h5>Hasnaaa ^_^</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="Display name"
                        className="shadow-none"
                        name="userDisplayName"
                        // value={userDisplayName}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                  <Form.Group controlId="userName">
                    <Form.Label>Full name :</Form.Label>
                    {!editDetail ? (
                      <h5>Hasna Medika</h5>
                    ) : (
                      <Form.Control
                        type="text"
                        placeholder="Full name"
                        className="shadow-none"
                        name="userName"
                        // value={userName}
                        onChange={(e) => changeText(e)}
                      />
                    )}
                  </Form.Group>
                </div>
                <div className={styles.additionalDetail}>
                  <Form.Group controlId="userName">
                    <Form.Label>Birth date :</Form.Label>
                    {!editDetail ? (
                      <h5>May 26th, 1995</h5>
                    ) : (
                      <Form.Control
                        type="date"
                        className="shadow-none"
                        name="userBirthDate"
                        // value={userBirthDate}
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
              <Button variant="light" className={styles.logout}>
                Log Out
                <img src="/chevron-right.svg" alt="chevron-right" />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </Layout>
  );
}
