import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "motion/react";

export type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
};

export type AnswerRecord = {
  questionId: number;
  selectedOptionIndex: number;
  isCorrect: boolean;
};

export function QuizResult({
  score,
  total,
  answers,
  questions,
  onRestart,
}: {
  score: number;
  total: number;
  answers: AnswerRecord[];
  questions: Question[];
  onRestart: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto p-4 md:p-8 space-y-8"
    >
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Quiz Completed!</h2>
        <div className="text-6xl font-black text-blue-600">
          {percentage}%
        </div>
        <p className="text-xl text-slate-600 font-medium">
          You scored {score} out of {total}
        </p>
        <button
          onClick={onRestart}
          className="mt-6 px-8 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Restart Quiz
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-slate-900">Review Answers</h3>
        <div className="space-y-4">
          {questions.map((q, index) => {
            const answer = answers.find((a) => a.questionId === q.id);
            const isCorrect = answer?.isCorrect;
            const selectedText = answer ? q.options[answer.selectedOptionIndex] : "Not answered";
            const correctText = q.options[q.correctAnswerIndex];

            return (
              <div
                key={q.id}
                className={`p-6 rounded-xl border ${
                  isCorrect ? "bg-emerald-50 border-emerald-100" : "bg-red-50 border-red-100"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="font-semibold text-slate-900 leading-snug">
                      <span className="text-slate-500 mr-2">{index + 1}.</span>
                      {q.text}
                    </p>
                    <div className="space-y-1 text-sm">
                      <p className={`${isCorrect ? "text-emerald-700 font-medium" : "text-red-700"}`}>
                        <span className="font-medium">Your answer:</span> {selectedText}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-700 font-medium">
                          <span className="font-medium">Correct answer:</span> {correctText}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
