// /src/app/list/lessons/levels/b2/exercises/[category]/page.tsx

import ExercisesPage from "@/components/ExercisesPage";
import { B2Categories } from "@/data/b2";

interface Props {
  params: { category: string };
}

export default function CategoryExercisesPage({ params }: Props) {
  const categoryParam = params.category.toLowerCase();
  const found = B2Categories.find(
    (c) => c.title.toLowerCase() === categoryParam
  );

  if (!found) {
    return <div className="p-8">Category not found</div>;
  }

  return (
    <ExercisesPage
      categories={[found]}
      title={`B2 - ${found.title}`}
      backPath="/list/lessons/levels/b2"
    />
  );
}
