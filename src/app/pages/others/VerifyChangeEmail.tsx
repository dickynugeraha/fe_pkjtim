import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import usePengguna from "../../modules/hooks/master-data/pengguna";
import { useAuth } from "../../modules/auth";

const VerifyChangeEmail = () => {
  const [searchParams] = useSearchParams();
  const userid = searchParams.get("userid");
  const token = searchParams.get("token");
  const newemail: any = searchParams.get("newemail");
  // const params = useParams();
  // const { userid, token, newemail } = params;

  const { confirmEmailVerif, loading } = usePengguna();
  const { logout } = useAuth();
  useEffect(() => {
    confirmEmailVerif(userid, token, newemail).then(() => logout());
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

export default VerifyChangeEmail;
