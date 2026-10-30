import { Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { speakWord } from "@/utils/speech";

interface Props {
  exercise: any;
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onBack: () => void;
}

export default function VocabularyView({
  exercise,
  isFirst,
  isLast,
  onPrev,
  onNext,
  onBack,
}: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={() => speakWord(exercise.word)}>
        <Volume2 />
      </button>

      <button onClick={onPrev} disabled={isFirst}>
        <ChevronLeft />
      </button>

      <div className="text-9xl">{exercise.image}</div>

      <button onClick={onNext} disabled={isLast}>
        <ChevronRight />
      </button>

      <button onClick={onBack}>Back</button>
    </div>
  );
}
