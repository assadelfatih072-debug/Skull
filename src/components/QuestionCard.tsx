import { Question } from "../data/questions";
import { motion } from "motion/react";

export function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
}: {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (selectedIndex: number) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col w-full max-w-4xl mx-auto my-auto py-8"
    >
      <div className="mb-8 lg:mb-12">
        <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-6 uppercase tracking-wider shadow-sm border border-blue-100">
          Question {currentIndex + 1} of {totalQuestions}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug">
          {question.text}
        </h3>
      </div>

      <div className="grid gap-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className="flex items-center w-full text-left p-4 md:p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="h-10 w-10 shrink-0 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold mr-4 md:mr-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
              {String.fromCharCode(65 + index)}
            </div>
            <span className="text-lg font-medium text-slate-700 group-hover:text-blue-900 transition-colors">
              {option}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
