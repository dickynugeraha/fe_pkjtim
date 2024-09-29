import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import usePengguna from "../../modules/hooks/master-data/pengguna";

const VerifyNewAccount = () => {
  const params = useParams();
  const { userid, token } = params;

  const { confirmEmailVerif, loading } = usePengguna();

  useEffect(() => {
    confirmEmailVerif(userid, token);
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
