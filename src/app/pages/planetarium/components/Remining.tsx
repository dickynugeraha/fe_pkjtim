import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  now: any;
  expired: any;
  onFinishTime: () => void;
};

const Remining: React.FC<Props> = ({ expired, onFinishTime }) => {
  const [timeLeft, setTimeLeft] = useState<any>({});

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now: any = new Date();
      const expirationTime: any = new Date(expired);
      const difference = expirationTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        onFinishTime();
      }
    };

    // Initial calculation
    calculateTimeLeft();

    // Update countdown every second
    const intervalId = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [expired]);

  console.log(`0${timeLeft.minutes}:${timeLeft.seconds}`);

  return (
    <div className="d-block badge badge-light-warning p-6 ">
      <p className="fs-6 p-0 m-0">
        Selesaikan pesanan sebelum ({`0${timeLeft.minutes}:${timeLeft.seconds}`}
        )
      </p>
      {/* <p className="p-0 m-0 fs-6 text-right">{`0${minutes}:${seconds}`}</p> */}
    </div>
  );
};

export default Remining;
