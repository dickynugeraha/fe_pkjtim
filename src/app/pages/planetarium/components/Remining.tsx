import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const now: any = new Date();

type Props = {
  expired: any;
  onFinishTime: () => void;
};

const Remining: React.FC<Props> = ({ expired, onFinishTime }) => {
  const navigate = useNavigate();
  const expiredConvert: any = new Date(expired);
  const gapTime = now - expiredConvert;
  const remainingSeconds = gapTime % 60;

  console.log("now", now);
  console.log("expired", expired);

  if (now > expired) {
    Swal.fire({
      icon: "error",
      title: "EROR",
      text: "Pesanan anda sudah kadaluarsa",
      showConfirmButton: false,
    }).then(() => {
      navigate("/pesanan-saya");
    });

    return;
  }

  const [timeRemaining, setTimeRemaining] = useState<number>(remainingSeconds);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          onFinishTime();
          Swal.fire({
            icon: "error",
            title: "EROR",
            text: "Pesanan anda sudah kadaluarsa",
            showConfirmButton: false,
          });
          console.log("Countdown complete!");
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return (
    <div className="d-block badge badge-light-warning p-6 ">
      <p className="fs-6 p-0 m-0">
        Selesaikan pesanan sebelum ({`0${minutes}:${seconds}`})
      </p>
      {/* <p className="p-0 m-0 fs-6 text-right">{`0${minutes}:${seconds}`}</p> */}
    </div>
  );
};

export default Remining;
