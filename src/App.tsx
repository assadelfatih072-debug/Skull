import { useState } from "react";
import { QuestionCard } from "./components/QuestionCard";
import { QuizResult, AnswerRecord } from "./components/QuizResult";
import { questions } from "./data/questions";
import { BriefcaseMedical } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentIndex(0);
    setAnswers([]);
    setIsFinished(false);
  };

  const handleAnswer = (selectedIndex: number) => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedIndex === currentQuestion.correctAnswerIndex;

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOptionIndex: selectedIndex,
        isCorrect,
      },
    ]);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const calculateScore = () => {
    return answers.filter((a) => a.isCorrect).length;
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar: Question Navigator */}
      {started && !isFinished && (
        <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col shrink-0 z-20 shadow-sm relative">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Exam Progress</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Completed</span>
              <span className="text-sm font-bold text-blue-600">{currentIndex} / {questions.length}</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 ease-out" 
                style={{ width: `${(currentIndex / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const isAnswered = i < currentIndex;
                const isCurrent = i === currentIndex;
                let dotClass = "h-8 w-8 rounded flex items-center justify-center text-xs font-semibold transition-all ";
                
                if (isCurrent) {
                  dotClass += "bg-blue-600 text-white shadow-md shadow-blue-200 ring-2 ring-blue-100 scale-110";
                } else if (isAnswered) {
                  dotClass += "bg-green-100 text-green-700 border border-green-200";
                } else {
                  dotClass += "bg-white text-slate-400 border border-slate-200";
                }

                return (
                  <div key={q.id} className={dotClass}>
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-200 mt-auto shrink-0">
            <div className="space-y-3 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-[3px]"></div> Answered
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-600 rounded-[3px]"></div> Current
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white border border-slate-300 rounded-[3px]"></div> Unanswered
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto overflow-x-hidden">
        {/* Top Header */}
        <header className="shrink-0 h-16 bg-white border-b border-slate-200 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 bg-blue-600 rounded flex items-center justify-center shadow-sm">
              <BriefcaseMedical className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight hidden sm:block">Medical Boards: Microbes & Skeleton</h1>
            <h1 className="font-bold text-lg text-slate-800 tracking-tight sm:hidden">Medical Quiz</h1>
          </div>
          
          {started && !isFinished && (
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setIsFinished(true)} 
                className="px-4 py-2 bg-slate-900 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
              >
                Finish Exam
              </button>
            </div>
          )}
        </header>

        <div className="flex-1 flex flex-col w-full px-4 sm:px-6 md:px-12 py-8">
          <AnimatePresence mode="wait">
            {!started && !isFinished && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6 my-auto"
              >
                <div className="bg-blue-100 p-4 rounded-full mb-2 shadow-inner">
                  <BriefcaseMedical className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
                  Microbes & Skeleton System
                </h2>
                <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
                  Test your knowledge with these {questions.length} comprehensive multiple-choice questions covering bacteriology, virology, parasitology, and the human skeletal system.
                </p>
                <button
                  onClick={handleStart}
                  className="mt-8 px-10 py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-lg text-lg transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  Start Quiz
                </button>
              </motion.div>
            )}

            {started && !isFinished && (
              <QuestionCard
                question={questions[currentIndex]}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                onAnswer={handleAnswer}
                key={currentIndex}
              />
            )}

            {isFinished && (
              <QuizResult
                key="result"
                score={calculateScore()}
                total={questions.length}
                answers={answers}
                questions={questions}
                onRestart={handleStart}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
