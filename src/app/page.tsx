import { IngredientForm } from "@/component/FormComponent/page";
import GptChat from "@/component/serverComponent/page";

export default function Home() {
  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-center">List of ingredients</h1>
        <IngredientForm />
        <GptChat />
      </div>
    </div>
  );
}
