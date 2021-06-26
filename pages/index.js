import Image from "next/image";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Layout from "components/Layout";
import Navbar from "components/module/Navbar";
import Footer from "components/module/Footer";
import styles from "styles/Home.module.css";
import { ArrowLeft, ArrowRight, Heart, MapPin, User } from "phosphor-react";
import { Button, Col, Row } from "react-bootstrap";
import { unauthPage } from "middleware/authPage";

// export const getServerSideProps = async (context) => {
//   await unauthPage(context);
//   return {
//     props: {},
//   };
// };

export default function Home() {
  const router = useRouter();
  const token = Cookie.get("token");

  return (
    <Layout title="Home">
      <Navbar home="true" login={token ? true : false} />
      <div className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.content}>
            <h1>Start Your Day with Coffee and Good Meals</h1>
            <p>
              We provide high quality beans, good taste, and healthy meals made
              by love just for you. Start your day with us for a bigger smile!
            </p>
            <Button
              variant="primary"
              onClick={() => router.push("/customers/product/all")}
            >
              Get Started
            </Button>
          </div>
          <div className={`d-flex justify-content-evenly ${styles.statistic}`}>
            <div>
              <User weight="bold" className={styles.staffIcon} />
              <div>
                <h4>90+</h4>
                <span>Staff</span>
              </div>
            </div>
            <div>
              <MapPin weight="bold" className={styles.storesIcon} />
              <div>
                <h4>30+</h4>
                <span>Stores</span>
              </div>
            </div>
            <div>
              <Heart weight="bold" className={styles.customersIcon} />
              <div>
                <h4>800+</h4>
                <span>Customers</span>
              </div>
            </div>
          </div>
        </div>
        <Row xs={1} md={2} className={styles.subHero}>
          <Col>
            <div className={styles.illustration}>
              <Image
                layout="fill"
                src="/1614e4f251061e5ddda15a8106a888d0.jpg"
                alt="asset"
              />
            </div>
          </Col>
          <Col>
            <div className={styles.subDescription}>
              <h2>We Provide Good Coffee and Healthy Meals</h2>
              <p>
                You can explore the menu that we provide with fun and have their
                own taste and make your day better.
              </p>
              <ul>
                <li>High quality beans</li>
                <li>Healthy meals, you can request the ingredients</li>
                <li>
                  Chat with our staff to get better experience for ordering
                </li>
                <li>
                  Free member card with a minimum purchase of IDR 200.000.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className={styles.favourite}>
          <h2>Here is People's Favourite</h2>
          <p>
            Let's choose and have a bit taste of people's favourite. It might be
            yours too!
          </p>
          <Row xs={1} sm={2} md={3} className={styles.rowFavourite}>
            <Col>
              <div className={styles.card}>
                <div className="d-flex flex-column align-items-center">
                  <div className={styles.productImg}>
                    <Image
                      src="/product3.png"
                      alt="hazelnut latte"
                      layout="fill"
                    />
                  </div>
                  <h6>Hazelnut Latte</h6>
                  <ul>
                    <li>Hazelnut Syrup</li>
                    <li>Vanilla Whipped Cream</li>
                    <li>Ice / Hot</li>
                    <li>Sliced Banana on Top</li>
                  </ul>
                </div>
                <div className="d-flex flex-column ">
                  <span className={styles.price}>IDR 30.000</span>
                  <Button variant="light">Select</Button>
                </div>
              </div>
            </Col>
            <Col>
              <div className={styles.card}>
                <div className="d-flex flex-column align-items-center">
                  <div className={styles.productImg}>
                    <Image
                      src="/product8.png"
                      alt="hazelnut latte"
                      layout="fill"
                    />
                  </div>
                  <h6>Pinky Promise</h6>
                  <ul>
                    <li>1 Shot of Coffee</li>
                    <li>Vanilla Whipped Cream</li>
                    <li>Chocolate Biscuits</li>
                    <li>Strawberry Syrup</li>
                    <li>Sliced Strawberry on Top</li>
                  </ul>
                </div>
                <div className="d-flex flex-column ">
                  <span className={styles.price}>IDR 30.000</span>
                  <Button variant="light">Select</Button>
                </div>
              </div>
            </Col>
            <Col sm={12}>
              <div className={styles.card}>
                <div className="d-flex flex-column align-items-center">
                  <div className={styles.productImg}>
                    <Image
                      src="/product7.png"
                      alt="hazelnut latte"
                      layout="fill"
                    />
                  </div>
                  <h6>Chicken Wings</h6>
                  <ul>
                    <li>Wing</li>
                    <li>Drum Sticks</li>
                    <li>Mayonaise and Lemon</li>
                    <li>Hot Fried</li>
                    <li>Secret Recipe</li>
                    <li>Buy 1 Get 1 Only For Dine In</li>
                  </ul>
                </div>
                <div className="d-flex flex-column ">
                  <span className={styles.price}>IDR 40.000</span>
                  <Button variant="light">Select</Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.map}>
          <h2>Here is People's Favourite</h2>
          <p>
            Let's choose and have a bit taste of people's favourite. It might be
            yours too!
          </p>
          <div className={styles.mapContainer}>
            <Image src="/Huge Global.svg" alt="map" layout="fill" />
          </div>
        </div>
        <div className={styles.sponsors}>
          <h2>Our Sponsors</h2>
          <Row xs={2} md={5} className="g-2 mt-2">
            <Col>
              <div className={styles.sponsorLogo}>
                <Image src="/netflix.svg" alt="netflix" layout="fill" />
              </div>
            </Col>
            <Col>
              <div className={styles.sponsorLogo}>
                <Image src="/reddit.svg" alt="reddit" layout="fill" />
              </div>
            </Col>
            <Col>
              <div className={styles.sponsorLogo}>
                <Image src="/amazon.svg" alt="amazon" layout="fill" />
              </div>
            </Col>
            <Col>
              <div className={styles.sponsorLogo}>
                <Image src="/discord.svg" alt="discord" layout="fill" />
              </div>
            </Col>
            <Col xs={12}>
              <div className={styles.sponsorLogo}>
                <Image src="/spotify.svg" alt="spotify" layout="fill" />
              </div>
            </Col>
          </Row>
        </div>

        <div className={styles.customersFeedback}>
          <h2 className="text-center">Here is People's Favourite</h2>
          <p className="text-center">
            Let's choose and have a bit taste of people's favourite. It might be
            yours too!
          </p>
          <div className={styles.feedbackContainer}>
            <div className={styles.feedbackCard}>
              <div className={styles.head}>
                <div className={styles.avaContainer}>
                  <Image src="/cust1.png" alt="customer avatar" layout="fill" />
                </div>
                <div>
                  <h5>Viezh Robert</h5>
                  <span>Warsaw, Poland</span>
                </div>
                <span>4.5</span>
              </div>
              <p>
                “Wow... I am very happy to spend my whole day here. the Wi-fi is
                good, and the coffee and meals tho. I like it here!! Very
                recommended!
              </p>
            </div>
            <div className={styles.feedbackCard}>
              <div className={styles.head}>
                <div className={styles.avaContainer}>
                  <Image src="/cust2.png" alt="customer avatar" layout="fill" />
                </div>
                <div>
                  <h5>Yessica Christy</h5>
                  <span>Shanxi, China</span>
                </div>
                <span>4.5</span>
              </div>
              <p>
                “I like it because I like to travel far and still can make my
                day better just by drinking their Hazelnut Latte
              </p>
            </div>
            <div className={styles.feedbackCard}>
              <div className={styles.head}>
                <div className={styles.avaContainer}>
                  <Image src="/cust3.png" alt="customer avatar" layout="fill" />
                </div>
                <div>
                  <h5>Kim Young Jou</h5>
                  <span>Seoul, South Korea</span>
                </div>
                <span>4.5</span>
              </div>
              <p>
                “This is very unusual for my taste, I haven’t liked coffee
                before but their coffee is the best! and yup, you have to order
                the chicken wings, the best in town!
              </p>
            </div>
          </div>
          <div className={styles.navigation}>
            <Button variant="light">
              <ArrowLeft weight="bold" />
            </Button>
            <Button variant="secondary">
              <ArrowRight weight="bold" />
            </Button>
          </div>
        </div>
        <div className={styles.overflowCard}>
          <div>
            <h2>Check our promo today!</h2>
            <span>{"Let's see the deals and pick yours!"}</span>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push("/customers/product/all")}
          >
            See Promo
          </Button>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
