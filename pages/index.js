import Head from "next/head";
import Image from "next/image";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import styles from "styles/Home.module.css";
import { unauthPage } from "middleware/authPage";

export const getServerSideProps = async (context) => {
  await unauthPage(context);
  return {
    props: {},
  };
};

export default function Home() {
  return (
    <Layout title="Home">
      <Navbar login={false} />
      <div className={styles.container}>
        <h1>Home</h1>
      </div>
    </Layout>
  );
}
