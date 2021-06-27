import { useRouter } from "next/router";
import axiosApiIntances from "utils/axios";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Dashboard.module.css";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { adminPage, authPage } from "middleware/authPage";
import { Bar } from "react-chartjs-2";

export const getServerSideProps = async (context) => {
  let { time } = context.query;

  const data = await authPage(context);
  await adminPage(context);
  const authorization = {
    Authorization: `Bearer ${data.token || ""}`,
  };

  // To get last week date
  const today = new Date();
  let lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  const lastWeekDateFormat = `${lastWeek.getFullYear()}/${
    lastWeek.getMonth() + 1
  }/${lastWeek.getDate()}`;
  // =====

  const date =
    !time || time === "thisWeek"
      ? (time = new Date(Date.now()).toISOString())
      : lastWeekDateFormat;

  const dataPerDay = await axiosApiIntances
    .get(`invoice/dashboard?time=${date}`, {
      headers: authorization,
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: { dataPerDay, date },
  };
};

export default function Dashboard(props) {
  const router = useRouter();
  const { dataPerDay } = props;

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednessday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Total Earnings",
        data: [
          dataPerDay[0].total,
          dataPerDay[1].total,
          dataPerDay[2].total,
          dataPerDay[3].total,
          dataPerDay[4].total,
          dataPerDay[5].total,
          dataPerDay[6].total,
        ],
        backgroundColor: ["#ffba33"],
        borderColor: ["#ffba33"],
        borderWidth: 1,
        borderRadius: 10,
        barThickness: 30,
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

  const handleDownloadReport = () => {
    window.alert("Download report");
  };

  return (
    <Layout title="Dashboard">
      <Navbar login={true} dashboard={true} />
      <div className={styles.container}>
        <h1>See how your store progress so far</h1>
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter"
          variant="light"
          className={styles.filter}
        >
          <Dropdown.Item
            onClick={() => router.push("/admin/dashboard?time=thisWeek")}
          >
            This Week
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => router.push("/admin/dashboard?time=lastWeek")}
          >
            Last Week
          </Dropdown.Item>
        </DropdownButton>
        <div className={styles.chartContainer}>
          <Bar data={data} options={options} />
        </div>
        <Button variant="secondary" onClick={handleDownloadReport}>
          Download Report
        </Button>
      </div>
      <Footer />
    </Layout>
  );
}
