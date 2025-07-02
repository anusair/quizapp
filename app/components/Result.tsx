"use client"

import { useEffect, useState } from "react";

type ResultInterface = {
    result: number;
    questions: number;
}

function Result({result , questions}: ResultInterface) {

    const [message , setMessage] = useState<string | null>("");

    useEffect(() => {
        if (result >= 8) setMessage(`Congragulation, You got ${result}/${questions}`)
        else if (result >= 5 && result < 9) setMessage(`You've passed, You got ${result}/${questions}`)
        else setMessage(`Didn't pass, You got ${result}/10. Try again another time.`)
    } , [questions, result])


  return (
    <div className="p-5 text-center">
        <div>
            <h1 className="text-3xl font-bold">{message}</h1>
        </div>
        <button className="bg-[#008000] text-white font-meduim py-1 px-4 rounded-md cursor-pointer mt-10" onClick={() => location.reload()}>Restart</button>
    </div>
  )
}
export default Result