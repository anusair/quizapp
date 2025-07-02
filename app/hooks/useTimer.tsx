import {useState, useEffect, useRef} from "react"
interface useTimerOptions {
    initialMinutes?: number;
    initialSeconds?: number;
    onComplete?: () => void;
}

function useTimer({initialMinutes = 0, initialSeconds = 0, onComplete}: useTimerOptions) {
  const [minutes , setMinutes] = useState(initialMinutes);
  const [seconds , setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false)
  const intervalRef = useRef<number | null>(null);


    useEffect(() => {
        if (!isActive) return;

    intervalRef.current = window.setInterval(() => {
        setSeconds(prevSeconds => {
            if (prevSeconds === 0) {
                setMinutes(prevMinutes => {
                    if (prevMinutes === 0) {
                        if (intervalRef.current) clearInterval(intervalRef.current);
                        onComplete?.();
                        return 0;
                    } else {
                        setSeconds(59);
                        return prevMinutes - 1;
                    }
                });
                return 0;
            } else {
                return prevSeconds - 1;
            }
        });
    }, 1000)

    return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }
  } , [isActive, onComplete])

  
    const start = () => setIsActive(true)
    const pause = () => {
        setIsActive(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
    }

    const reset = () => {
        pause();
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    }

  return {
    minutes,
    seconds,
    isActive,
    start,
    pause,
    reset
  }
}
export default useTimer