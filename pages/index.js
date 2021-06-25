import Head from "next/head";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import styles from "styles/Home.module.css";
import { unauthPage } from "middleware/authPage";
import Cookie from "js-cookie";

// export const getServerSideProps = async (context) => {
//   await unauthPage(context);
//   return {
//     props: {},
//   };
// };

export default function Home() {
  const token = Cookie.get("token");

  return (
    <Layout title="Home">
      <Navbar login={token ? true : false} />
      <div className={styles.container}>
        <h1>Home</h1>
      </div>
    </Layout>
  );
}
