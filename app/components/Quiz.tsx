"use client";

// Hooks
import { useState, useEffect } from "react";
import useTimer from "../hooks/useTimer";

// External libraries
import axios from "axios";

// Components
import Result from "./Result";
import Pagination from "./Pagination";
import Answers from "./Answers";

type Quiz = {
  title: string;
  answers: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  right_answer: string;
};

function Quiz() {
  const [jsonData, setJsonData] = useState<Quiz[]>([]);
  const [count, setCount] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<number>(0);
  const [submitted, setSubmitted] = useState(false);

  const data = jsonData[count];

  const { minutes, seconds, start, isActive } = useTimer({
    initialMinutes: 0,
    initialSeconds: 10,
    onComplete: () => {
      handleSubmitButton();
    },
  });

  const getJsonData = async () => {
    try {
      const response = await axios.get("/data/quizzes.json");
      return response.data;
    } catch (error) {
      console.log("The error has been occuered: ", error);
      return null;
    }
  };

  const handleInputChange = (answer: string) => {
    setSelectedAnswers((prev) => {
      const updated = [...(prev ?? [])];
      updated[count] = answer;
      localStorage.setItem("selectedAnswers", JSON.stringify(updated));
      return updated;
    });
  };

  const handleSubmitButton = () => {
    let count = 0;
    if (!selectedAnswers) {
      console.log("No answers selected.");
      return;
    }

    // Check for correct answers
    for (let i = 0; i < jsonData.length; i++) {
      if (selectedAnswers[i] === jsonData[i].right_answer) {
        count += 1;
      }
    }
    setResult(count);

    setSubmitted(true);

    // Delete the local storage
    localStorage.clear();
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getJsonData();
      setJsonData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("selectedAnswers");
    if (saved) {
      setSelectedAnswers(JSON.parse(saved));
    }
  }, []);

  return !submitted ? (
    <div className="bg-[#eee] p-5 rounded-md w-full h-screen max-h-screen flex flex-col justify-center xl:block xl:h-1/2 xl:w-1/2 mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-3 rounded-md">
        <div className="flex items-start md:items-center gap-4">
          <span className="text-xl md:text-2xl font-bold">Q.{count + 1}</span>
          <h1 className="text-xl md:text-2xl font-bold">{data?.title}</h1>
        </div>
        <span className="text-[#008000] font-bold self-start">
          {minutes < 10 ? `0${minutes}` : minutes}:
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      {/* answers container */}
      <Answers
        data={data}
        count={count}
        selectedAnswers={selectedAnswers}
        handleInputChange={handleInputChange}
        start={start}
      />
      <Pagination
        count={count}
        setCount={setCount}
        jsonData={jsonData}
        handleSubmitButton={handleSubmitButton}
        isActive={isActive}
      />
    </div>
  ) : (
    <Result result={result} questions={jsonData.length} />
  );
}
export default Quiz;
