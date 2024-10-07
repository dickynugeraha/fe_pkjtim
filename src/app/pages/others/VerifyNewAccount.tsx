import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import usePengguna from "../../modules/hooks/master-data/pengguna";
import { useAuth } from "../../modules/auth";

const VerifyNewAccount = () => {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  const token = searchParams.get("token");
  // const params = useParams();
  // const { userid, token } = params;

  const { confirmEmailVerif, loading } = usePengguna();
  const { logout } = useAuth();
  useEffect(() => {
    confirmEmailVerif(userid, token).then(() => logout());
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100%" }}
    >
      {loading && <Spinner />}
    </div>
  );
};

export default VerifyNewAccount;
