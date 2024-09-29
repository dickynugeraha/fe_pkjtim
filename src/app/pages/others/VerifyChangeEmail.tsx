import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import usePengguna from "../../modules/hooks/master-data/pengguna";

const VerifyChangeEmail = () => {
  const params = useParams();
  const { userid, token, newemail } = params;
  console.log(userid);
  console.log(token);
  console.log(newemail);

  const { confirmEmailVerif, loading } = usePengguna();

  useEffect(() => {
    confirmEmailVerif(userid, token, newemail);
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
