import { IngredientForm } from "@/component/FormComponent/page";

export default async function Home(){

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg">
        <h1 className="text-center">List of ingredients</h1>
          <IngredientForm />
      </div>
    </div>
  );
}
