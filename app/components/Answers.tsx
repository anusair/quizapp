import Quiz from "./Quiz";

type AnswersProps = {
  data: Quiz;
  count: number;
  selectedAnswers: string[];
  handleInputChange: (value: string) => void;
  start: () => void;
}

function Answers({ data, count, selectedAnswers, handleInputChange, start }: AnswersProps) {
  return (
          <div className="mt-5 flex flex-col gap-5">
        {Object.entries(data?.answers ?? {}).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-3 bg-white py-3 px-3 rounded-md cursor-pointer"
          >
            <input
              type="radio"
              id={key}
              name={`question_${count}`}
              value={key}
              checked={(selectedAnswers ?? [])[count] === value}
              onChange={() => {
                handleInputChange(value);
                start();
              }}
              className="peer accent-[#008000] h-4 w-4"
            />
            <label
              htmlFor={key}
              className="cursor-pointer font-medium peer-checked:text-[#008000] transition-all duration-200"
            >
              {value}
            </label>
          </div>
        ))}
      </div>
  )
}
export default Answers