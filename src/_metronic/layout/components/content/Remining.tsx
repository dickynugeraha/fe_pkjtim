import React, { useEffect, useState } from "react";

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

    calculateTimeLeft();

    const intervalId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(intervalId);
  }, [expired]);

  return (
    <div className="d-block badge badge-light-warning p-6 ">
      <p className="fs-6 p-0 m-0">
        Selesaikan pesanan sebelum ({`${timeLeft.minutes < 10 ? "0" + timeLeft.minutes : timeLeft.minutes}:${timeLeft.seconds < 10 ? "0" + timeLeft.seconds : timeLeft.seconds}`}
        )
      </p>
    </div>
  );
};

export default Remining;
