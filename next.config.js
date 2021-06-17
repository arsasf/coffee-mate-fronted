module.exports = {
  env: {
    APP_NAME: "Coffee Mate",
    API_BASE_URL: "http://localhost:3004/backend5/api/v1/",
    API_IMG_URL: "http://localhost:3004/backend/api/",
  },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
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
