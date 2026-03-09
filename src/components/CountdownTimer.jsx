import { useEffect, useState } from "react";

const CountdownTimer = ({ end }) => {

  const calculateTime = () => {

    const diff = new Date(end) - new Date();

    if (diff <= 0) return "Expired";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;

  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {

    const interval = setInterval(() => {

      setTimeLeft(calculateTime());

    }, 1000);

    return () => clearInterval(interval);

  }, [end]);

  return (

    <div className="text-center text-red-500 font-semibold mt-2">

      Offer ends in: {timeLeft}

    </div>

  );

};

export default CountdownTimer;