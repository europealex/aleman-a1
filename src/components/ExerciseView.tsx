interface Props {
  exercise: any;
  selectedAnswer: number | null;
  showResult: boolean;
  onSelect: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export default function ExerciseView({
  exercise,
  selectedAnswer,
  showResult,
  onSelect,
  onBack,
  onNext,
  hasNext,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2>{exercise.question}</h2>

      {exercise.options.map((opt: string, i: number) => (
        <button key={i} onClick={() => onSelect(i)}>
          {opt}
        </button>
      ))}

      <button onClick={onBack}>Back</button>
      {showResult && hasNext && <button onClick={onNext}>Next</button>}
    </div>
  );
}
