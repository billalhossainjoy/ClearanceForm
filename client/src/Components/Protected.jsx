import { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, auth = true }) => {
  const {
    state: { status },
  } = useContext(AdminContext);
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth && status !== auth) navigator("/login");
    else if (!auth && status !== auth) navigator("/admin/dashboard");


    setLoading(false);
  }, [auth, navigator, status]);

  return loading ? <div>Loading...</div> : <>{children}</>;
};

export default Protected;
