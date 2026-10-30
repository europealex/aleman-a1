import ExercisesPage from "@/components/ExercisesPage";
import { B1Categories } from "@/data/b1";

interface Props { 
  params: { category: string } 
}

export default function CategoryExercisesPage({ params }: Props) {
  const categoryParam = params.category.toLowerCase();
  const found = B1Categories.find(c => c.title.toLowerCase() === categoryParam);

  if (!found) {
    return <div className="p-8">Category not found</div>;
  }

  return (
    <ExercisesPage
      categories={[found]}
      title={`B1 - ${found.title}`}
      backPath="/list/lessons/levels/b1"
    />
  );
}
