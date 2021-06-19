import cookies from "next-cookies";

// for login page (public)
export function unauthPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (allCookies.token) {
      let location = "";
      allCookies.userRole === "user"
        ? (location = "/customers/product")
        : (location = "/admin/product");

      return context.res
        .writeHead(302, {
          Location: location,
        })
        .end();
    }
    return resolve("unauthorized");
  });
}

// for all pages after login (private)
export function authPage(context) {
  return new Promise((resolve) => {
    const allCookies = cookies(context);
    if (!allCookies.token) {
      return context.res
        .writeHead(302, {
          Location: "/login",
        })
        .end();
    }

    return resolve({
      token: allCookies.token,
      userId: allCookies.userId,
      userRole: allCookies.userRole,
    });
  });
}
