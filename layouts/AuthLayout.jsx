import Router from "next/router";
import { useEffect, useState } from "react";

function AuthLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  return loading ? "loading" : <>{children}</>;
}

export default AuthLayout;
