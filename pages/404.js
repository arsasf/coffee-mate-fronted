import Cookie from "js-cookie";
import { useRouter } from "next/router";

export default function Page404() {
  const router = useRouter();

  const containerStyle = {
    height: "100vh",
  };
  const h1 = {
    fontSize: "82px",
    fontWeight: "800",
  };
  const paragraph = {
    fontWeight: "600",
    textAlign: "center",
    width: "30%",
  };
  const button = {
    marginTop: "50px",
    padding: "1em 5em",
    width: "25%",
  };

  return (
    <div
      style={containerStyle}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <h1 style={h1}>404</h1>
      <p style={paragraph}>
        {
          "Ooops... The page that you are looking for is doesn't exist. You can go back to your home now."
        }
      </p>
      <button
        style={button}
        className="btn btn-primary"
        onClick={() =>
          router.push(
            `${
              Cookie.get("userRole") ? "/customers/product" : "/admin/product"
            }`
          )
        }
      >
        Back to home...
      </button>
    </div>
  );
}
