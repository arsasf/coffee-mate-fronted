module.exports = {
  reactStrictMode: true,
  env: {
    APP_NAME: "Coffee Mate",
    API_BASE_URL: "http://localhost:3004/backend5/api/v1/",
    API_IMG_URL: "http://localhost:3004/backend5/api/",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/signup",
        destination: "/auth/signup",
      },
      {
        source: "/create-pin",
        destination: "/auth/create-pin",
      },
      {
        source: "/create-pin/success",
        destination: "/auth/create-pin/success",
      },
      {
        source: "/reset-password",
        destination: "/auth/reset-password",
      },
    ];
  },
};
