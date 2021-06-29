import Cookie from "js-cookie";
import Image from "next/image";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Form,
  Modal,
  Row,
  Spinner,
  Toast,
} from "react-bootstrap";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Profile.module.css";
import { authPage, adminPage } from "middleware/authPage";
import moment from "moment";
import {
  Info,
  CheckCircle,
  UploadSimple,
  WarningCircle,
  XCircle,
} from "phosphor-react";

export const getServerSideProps = async (context) => {
  const data = await authPage(context);
  await adminPage(context);
  const authorization = { Authorization: `Bearer ${data.token || ""}` };
  const res = await axiosApiIntances
    .get(`user/by-id/${data.userId}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return new Error(err);
    });
  return {
    props: { user: res },
  };
};

export default function Profile(props) {
  const router = useRouter();
  const {
    user_address,
    user_birth,
    user_display_name,
    user_email,
    user_gender,
    user_id,
    user_image,
    user_name,
    user_phone,
  } = props.user;
  const [loading, setLoading] = useState(false);
  const [imageUser, setImageUser] = useState(null);
  const [editDetail, setEditDetail] = useState(false);
  const [editContact, setEditContact] = useState(false);
  const [updateDataError, setUpdateDataError] = useState(false);
  const [updateDataSuccess, setUpdateDataSuccess] = useState(false);
  const [form, setForm] = useState({
    userAddress: user_address,
    userBirth: user_birth ? user_birth : "",
    userDisplay: user_display_name,
    userEmail: user_email,
    userGender: user_gender,
    userName: user_name,
    userPhone: user_phone,
  });

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageSuccess, setImageSuccess] = useState(false);
  const [formPassword, setFormPassword] = useState({});
  const [passwordError, setPasswordError] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const radioGender = document.querySelectorAll("input[type='radio']");
    for (let item of radioGender) {
      item.disabled === true ? (item.disabled = false) : (item.disabled = true);
    }
  }, [editDetail]);

  const changeText = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeTextPassword = (e) => {
    setFormPassword({ ...formPassword, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImageUser(e.target.files[0]);
  };

  const handleUpload = (id, data) => {
    setUploading(true);
    const formData = new FormData();
    for (const field in data) {
      formData.append(field, data[field]);
    }
    axiosApiIntances
      .patch(`user/img/${id}`, formData)
      .then(() => {
        setImageUser(null);
        setImageSuccess(true);
        router.push(`/admin/profile/${id}`);
      })
      .catch((err) => {
        setImageUser(null);
        setImageError(true);
        setMessage(err.response.data.msg);
      })
      .finally(() => setUploading(false));
  };

  const handleDeleteImage = (id) => {
    axiosApiIntances.patch(`user/delete-img/${id}`).then(() => {
      router.push(`/admin/profile/${id}`);
    });
  };

  const handleUpdateData = (id, data) => {
    setLoading(true);
    axiosApiIntances
      .patch(`user/update-profile/${id}`, data)
      .then((res) => {
        setLoading(false);
        setEditDetail(false);
        setEditContact(false);
        setUpdateDataSuccess(true);
        router.push(`/admin/profile/${id}`);
      })
      .catch((err) => {
        setLoading(true);
        setUpdateDataError(true);
        setMessage(err.response.data.msg);
      });
  };

  const handleUpdatePassword = (id, data) => {
    setMessage("");
    setPasswordError(false);
    setPasswordSuccess(false);
    axiosApiIntances
      .patch(`user/update-password/${id}`, data)
      .then((res) => {
        setPasswordSuccess(true);
        setMessage(res.data.msg);
      })
      .catch((err) => {
        setPasswordError(true);
        setMessage(err.response.data.msg);
      });
  };

  const handleShowModal = () => {
    setShow(true);
    setPasswordSuccess(false);
    setPasswordError(false);
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    Cookie.remove("userRole");
    router.push("/login");
  };

  return (
    <Layout title="Profile">
      <Navbar login={true} userImageSSR={user_image} />
      <div className={styles.toastGroup}>
        <Toast
          onClose={() => setUpdateDataSuccess(false)}
          show={updateDataSuccess}
          delay={10000}
          className={styles.toast}
          autohide
        >
          <Toast.Header
            closeButton={false}
            className="d-flex align-items-center"
          >
            <Info
              color="rgb(107, 221, 0)"
              size={24}
              weight="fill"
              className="me-2"
            />
            <strong className="mr-auto">Personal Info Update</strong>
          </Toast.Header>
          <Toast.Body>
            Wohooo! Your personal detail has just updated successfully...
          </Toast.Body>
        </Toast>
        <Toast
          onClose={() => setImageSuccess(false)}
          show={imageSuccess}
          delay={10000}
          className={styles.toast}
          autohide
        >
          <Toast.Header
            closeButton={false}
            className="d-flex align-items-center"
          >
            <CheckCircle
              color="rgb(107, 221, 0)"
              size={24}
              weight="fill"
              className="me-2"
            />
            <strong className="mr-auto">Profile Picture Update</strong>
          </Toast.Header>
          <Toast.Body>
            Cool pose! Your profile picture has changed...
          </Toast.Body>
        </Toast>
        <Toast
          onClose={() => setImageError(false)}
          show={imageError}
          delay={10000}
          className={styles.toast}
          autohide
        >
          <Toast.Header
            closeButton={false}
            className="d-flex align-items-center"
          >
            <XCircle color="#b91929" size={24} weight="fill" className="me-2" />
            <strong className="mr-auto">Failed To Update</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        className={styles.passwordModal}
        centered
      >
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {passwordError && (
            <Alert
              variant="danger"
              className={`d-flex flex-column justify-content-center text-bold ${styles.errorAlert}`}
              style={{ fontWeight: "600" }}
            >
              <WarningCircle weight="bold" size={28} className="mb-2" />
              {message}
            </Alert>
          )}
          {passwordSuccess && (
            <Alert
              variant="success"
              className={`d-flex align-items-center text-bold ${styles.successAlert}`}
              style={{ fontWeight: "600" }}
            >
              <CheckCircle weight="bold" size={28} className="me-2" />
              {message}
            </Alert>
          )}
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="userNewPassword"
              placeholder="Password"
              className="shadow-none"
              onChange={(e) => changeTextPassword(e)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="userConfirmPassword"
              placeholder="Confirm password"
              className="shadow-none"
              onChange={(e) => changeTextPassword(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleUpdatePassword(user_id, formPassword)}
          >
            Change my password
          </Button>
        </Modal.Footer>
      </Modal>
      <div className={styles.container}>
        <h1>User Profile</h1>
        <Row xs={1} lg={2} className="mb-3 mb-mb-0 gy-3">
          <Col xs={12} md={4} lg={4}>
            <div className={`${styles.imageSection}`}>
              <div className={styles.avaContainer}>
                {/* {console.log(user_image)} */}
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
                {!imageUser ? (
                  <label htmlFor="upload" className={styles.edit}>
                    <img src="/pencil.svg" alt="pencil-icon" />
                  </label>
                ) : (
                  <div
                    title="Click to start upload your image"
                    htmlFor="upload"
                    className={styles.upload}
                    onClick={() => handleUpload(user_id, { imageUser })}
                  >
                    <UploadSimple color="#ffffff" size={14} weight="bold" />
                  </div>
                )}
                {uploading && (
                  <div htmlFor="upload" className={styles.uploading}>
                    <Spinner animation="border" variant="light" size="sm" />
                  </div>
                )}
              </div>
              <input type="file" id="upload" onChange={(e) => handleImage(e)} />
              <h3 title={user_display_name ? user_display_name : "User"}>
                {user_display_name ? user_display_name : "User"}
              </h3>
              <span>{user_email ? user_email : "Set your email"}</span>

              <Button
                variant="secondary"
                className={styles.remove}
                onClick={() => handleDeleteImage(user_id)}
              >
                Remove photo
              </Button>
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
                        name="userPhone"
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
                      onChange={(e) => changeText(e)}
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
                      <h5>
                        {user_birth
                          ? moment(user_birth).format("LL")
                          : "DD/MM/YY"}
                      </h5>
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
                    custom
                    type="radio"
                    label="--Male"
                    name="userGender"
                    id="radio1"
                    value="male"
                    checked={form.userGender === "male" && "checked"}
                    onChange={(e) => changeText(e)}
                  />
                  <Form.Check
                    custom
                    type="radio"
                    label="--Female"
                    name="userGender"
                    id="radio2"
                    value="female"
                    checked={form.userGender === "female" && "checked"}
                    onChange={(e) => changeText(e)}
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} md={4} lg={4}>
            <div className={`${styles.actionBtnSection}`}>
              <h6>Do you want to save the change?</h6>
              {loading ? (
                <Button
                  variant="secondary"
                  className="d-flex align-items-center justify-content-center"
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
                  <span className="sr-only">Updating...</span>
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    editContact || editDetail
                      ? handleUpdateData(user_id, form)
                      : "";
                  }}
                >
                  Save Change
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() => {
                  setEditContact(false), setEditDetail(false);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="light"
                className={styles.editPassword}
                onClick={handleShowModal}
              >
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
      <Footer />
    </Layout>
  );
}
