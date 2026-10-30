import ExercisesPage from "@/components/ExercisesPage";
import { A2Categories } from "@/data/a2";

interface Props { params: { category: string } }

export default function CategoryExercisesPage({ params }: Props) {
  const categoryParam = params.category.toLowerCase();
  const found = A2Categories.find(c => c.title.toLowerCase() === categoryParam);

  if (!found) {
    return <div className="p-8">Category not found</div>;
  }

  return (
    <ExercisesPage
      categories={[found]}
      title={`A2 - ${found.title}`}
      backPath="/list/lessons/levels/a2"
    />
  );
}
