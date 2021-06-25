import Link from "next/link";
import Image from "next/image";
import Cookie from "js-cookie";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Navbar.module.css";
import { ChatsCircle, MagnifyingGlass } from "phosphor-react";
import { Button } from "react-bootstrap";

export default function Navbar(props) {
  const router = useRouter();
  const userId = Cookie.get("userId");
  const userRole = Cookie.get("userRole");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axiosApiIntances
      .get(`user/by-id/${userId}`)
      .then((res) => {
        setUserData(res.data.data[0]);
      })
      .catch(() => {
        setUserData({});
      });
  }, []);

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-between ${styles.navbarContainer}`}
      >
        <Link href="/">
          <div className={styles.brand}>
            <div className={styles.logoContainer}>
              <Image src="/coffee-icon.png" layout="fill" alt="logo" />
            </div>
            <span>Coffee Mate</span>
          </div>
        </Link>
        <ul className={styles.navigationMenu}>
          <Link href="/">
            <li className={props.home ? styles.active : ""}>Home</li>
          </Link>
          <Link
            href={
              userRole === "admin"
                ? "/admin/product/all"
                : "/customers/product/all"
            }
          >
            <li className={props.product ? styles.active : ""}>Product</li>
          </Link>
          {userRole === "admin" ? (
            <>
              <Link href="/admin/manage-order">
                <li className={props.orders ? styles.active : ""}>Orders</li>
              </Link>
              <Link href={`/admin/dashboard`}>
                <li className={props.dashboard ? styles.active : ""}>
                  Dashboard
                </li>
              </Link>
            </>
          ) : (
            <>
              {" "}
              <Link href="/customers/payment-details">
                <li className={props.cart ? styles.active : ""}>My Cart</li>
              </Link>
              <Link href={`/customers/history-customer/${userId}`}>
                <li className={props.history ? styles.active : ""}>History</li>
              </Link>
            </>
          )}
        </ul>
        {props.login ? (
          <div className={styles.group}>
            <MagnifyingGlass
              color="#3a3d42"
              size={24}
              className={styles.searchIcon}
            />
            <ChatsCircle
              color="#3a3d42"
              size={24}
              className={styles.chatNotif}
            />
            <div
              className={`${styles.avatar}`}
              onClick={() =>
                router.push(
                  userRole === "user"
                    ? `/customers/profile/${userId}`
                    : `/admin/profile/${userId}`
                )
              }
            >
              <Image
                src={
                  userData.user_image
                    ? `http://localhost:3005/backend5/api/${userData.user_image}`
                    : "/default-img-placeholder.png"
                }
                layout="fill"
                alt="avatar"
              />
            </div>
          </div>
        ) : (
          <div className={`${styles.group} ${styles.modifyGap}`}>
            <Button variant="light" onClick={() => router.push("/login")}>
              Login
            </Button>
            <Button variant="primary" onClick={() => router.push("/signup")}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
