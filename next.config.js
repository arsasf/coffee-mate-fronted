module.exports = {
  reactStrictMode: true,
  env: {
    APP_NAME: "Coffee Mate",
    API_BASE_URL: "http://localhost:3005/backend5/api/v1/",
    API_IMG_URL: "http://localhost:3005/backend5/api/",
  },
  images: {
    domains: ["localhost"],
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
        source: "/forgot-password",
        destination: "/auth/forgot-password",
      },
      {
        source: "/change-password",
        destination: "/auth/change-password",
      },
      {
        source: "/admin/new-product",
        destination: "/admin/product/new-product",
      },
      {
        source: "/admin/update-product/:id",
        destination: "/admin/product/update-product/:id",
      },
      {
        source: "/admin/new-promo",
        destination: "/admin/product/new-promo",
      },
      {
        source: "/admin/update-promo/:id",
        destination: "/admin/product/update-promo/:id",
      },
      {
        source: "/historycust",
        destination: "/historycustomer",
      },
    ];
  },
};
