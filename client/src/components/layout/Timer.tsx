import { useEffect, useState } from "react";

export const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex gap-2">
      <span>{time.toLocaleTimeString()}</span>
      <span>{time.toLocaleDateString()}</span>
    </div>
  );
};
