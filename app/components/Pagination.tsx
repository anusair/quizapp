"use client";
import clsx from "clsx";
import Quiz from "./Quiz";

type PaginationType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  jsonData: Quiz[];
  handleSubmitButton: () => void;
  isActive: boolean;
};

function Pagination({
  count,
  setCount,
  jsonData,
  handleSubmitButton,
  isActive
}: PaginationType) {
  return (
    <>
      <div className="flex items-center justify-between mt-5">
        <button
          className={clsx(
            "bg-[#008000] text-white font-meduim py-1 px-4 rounded-md cursor-pointer",
            count <= 0 ? "opacity-50 pointer-events-none" : ""
          )}
          onClick={() => {
            setCount((prevCount: number) => prevCount - 1);
          }}
        >
          Prev
        </button>
        <div className="flex items-center gap-1">
          {Array.from({ length: jsonData.length }).map((_, i) => (
            <span
              key={i}
              className={clsx(
                "w-2 h-2 rounded-full cursor-pointer transition-all duration-200",
                count == i ? "bg-[#008000] w-3 h-3" : "bg-white",
                !isActive ? 'pointer-events-none' : 'pointer-events-auto'
              )}
              onClick={() => setCount(i)}
            />
          ))}
        </div>
        <button
          className={clsx(
            "bg-[#008000] text-white font-meduim py-1 px-4 rounded-md cursor-pointer",
            count == jsonData.length - 1 || !isActive? "opacity-50 pointer-events-none" : ""
          )}
          onClick={() => {
            setCount((prevCount: number) => prevCount + 1);
          }}
        >
          Next
        </button>
      </div>
      <button
        className={clsx(
          "bg-[#008000] w-full mt-5 text-white font-medium py-1 px-3 rounded-md cursor-pointer",
          count == jsonData.length - 1 ? "visible" : "invisible"
        )}
        onClick={handleSubmitButton}
      >
        Submit
      </button>
    </>
  );
}
export default Pagination;
