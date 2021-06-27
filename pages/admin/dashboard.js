import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Dashboard.module.css";
import { Button } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { adminPage, authPage } from "middleware/authPage";

export const getServerSideProps = async (context) => {
  const res = await authPage(context);
  await adminPage(context);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return {
    props: { data, options },
  };
};

export default function Dashboard(props) {
  const handleDownloadReport = () => {
    window.alert("Download report");
  };

  return (
    <Layout title="Dashboard">
      <Navbar login={true} dashboard={true} />
      <div className={styles.container}>
        <h1>See how your store progress so far</h1>
        <div className={styles.chartContainer}>
          <Bar data={props.data} options={props.options} />
        </div>
        <Button variant="secondary" onClick={handleDownloadReport}>
          Download Report
        </Button>
      </div>
      <Footer />
    </Layout>
  );
}
