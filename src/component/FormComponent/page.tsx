"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GptChat from "../serverComponent/page";

const formSchema = z.object({
	ingredients: z.array(z.object({ ingredient: z.string() })),
});

export function IngredientForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			ingredients: [{ ingredient: "" }],
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
        const queryParams = new URLSearchParams();
		let ingredientsList = '';
		for (const ingredient of values.ingredients) {
			ingredientsList += `${ingredient},`;
		}
        queryParams.append('ingredients', ingredientsList);
        const url = `?${queryParams.toString()}`;
        window.location.href = url;
	}

	function addIngredient() {
		form.setValue("ingredients", [
			...form.getValues("ingredients"),
			{ ingredient: "" },
		]);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				{form.watch("ingredients").map((_, index) => (
					<FormField
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						control={form.control}
						name={`ingredients.${index}.ingredient`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ingredient {index + 1}</FormLabel>
								<FormControl>
									<Input placeholder={`Ingredient ${index + 1}`} {...field} />
								</FormControl>
								<FormDescription>
									Enter the name of the ingredient.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
                <div className="flex justify-between w-full my-8">
                    <Button type="button" onClick={addIngredient}>
                        Add More Ingredient
                    </Button>
                    <Button type="submit">Submit</Button>
                </div>
			</form>
		</Form>
	);
}
