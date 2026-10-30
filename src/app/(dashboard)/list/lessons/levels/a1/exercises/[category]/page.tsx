// /app/list/lessons/levels/a1/exercises/[category]/page.tsx
import ExercisesPage from "@/components/ExercisesPage";
import { A1Categories } from "@/data/a1";

interface Props { params: { category: string } }

export default function CategoryExercisesPage({ params }: Props) {
  const categoryParam = params.category.toLowerCase();
  const found = A1Categories.find(c => c.title.toLowerCase() === categoryParam);

  if (!found) {
    return <div className="p-8">Category not found</div>;
  }

  return (
    <ExercisesPage
      categories={[found]}
      title={`A1 - ${found.title}`}
      backPath="/list/lessons/levels/a1"   // ⬅⬅⬅ AQUÍ VA
    />
  );
}
