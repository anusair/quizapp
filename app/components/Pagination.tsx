"use client";
import clsx from "clsx";
import Quiz from "./Quiz";
import Bullets from "./Bullets";

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
  isActive,
}: PaginationType) {
  return (
    <>
      <div className="flex flex-col xl:flex-row items-center justify-between mt-5 gap-2">
        <button
          className={clsx(
            "bg-[#008000] text-white font-meduim py-1 px-4 rounded-md cursor-pointer w-full xl:w-fit",
            count <= 0 ? "opacity-50 pointer-events-none" : ""
          )}
          onClick={() => {
            setCount((prevCount: number) => prevCount - 1);
          }}
        >
          Prev
        </button>
        <Bullets
          count={count}
          setCount={setCount}
          jsonData={jsonData}
          isActive={isActive}
          className="hidden xl:flex"
        />
        <button
          className={clsx(
            "bg-[#008000] text-white font-meduim py-1 px-4 rounded-md cursor-pointer w-full xl:w-fit",
            count == jsonData.length - 1 || !isActive
              ? "opacity-50 pointer-events-none"
              : ""
          )}
          onClick={() => {
            setCount((prevCount: number) => prevCount + 1);
          }}
        >
          Next
        </button>

        <Bullets
          count={count}
          setCount={setCount}
          jsonData={jsonData}
          isActive={isActive}
          className="flex xl:hidden"
        />
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
