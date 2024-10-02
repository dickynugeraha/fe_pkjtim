import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import usePengguna from "../../modules/hooks/master-data/pengguna";
import { useAuth } from "../../modules/auth";

const VerifyChangeEmail = () => {
  const params = useParams();
  const { userid, token, newemail } = params;

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
