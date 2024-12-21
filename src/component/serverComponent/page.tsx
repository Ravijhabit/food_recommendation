// app/components/GptChat.tsx
import { Suspense } from "react";
import OpenAI from "openai";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";

// Initialize OpenAI client
const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Types
type Message = {
	role: "user" | "assistant";
	content: string;
};

async function getGptResponse(message: string) {
	try {
		const completion = await openai.chat.completions.create({
			messages: [{ role: "user", content: message }],
			model: "gpt-3.5-turbo",
		});

		return completion.choices[0]?.message?.content || "";
	} catch (error) {
		console.error("Error calling GPT API:", error);
		throw error;
	}
}

// Loading component
function LoadingCard() {
	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>Processing...</CardTitle>
				<CardDescription>GPT is thinking...</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="h-8 w-full bg-gray-200 animate-pulse rounded" />
			</CardContent>
		</Card>
	);
}

// Error component
function ErrorCard({ error }: { error: Error }) {
	return (
		<Alert variant="destructive" className="w-full max-w-2xl mx-auto">
			<AlertDescription>Error: {error.message}</AlertDescription>
		</Alert>
	);
}

// Response component
function ResponseCard({ response }: { response: string }) {
	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle>GPT Response</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="whitespace-pre-wrap">{response}</div>
			</CardContent>
		</Card>
	);
}

// Main component
async function GptChat({ ingredientList }: { ingredientList: string }) {
	let content: React.ReactNode;
	try {
        const message = `Given the ingredients ${ingredientList}, suggest a dish that can be prepared, including a brief recipe or steps.`;
		const response = await getGptResponse(message);
		content = <ResponseCard response={response} />;
	} catch (error) {
		content = <ErrorCard error={error as Error} />;
	}

	return (
		<div className="p-4">
			<Suspense fallback={<LoadingCard />}>{content}</Suspense>
		</div>
	);
}

export default GptChat;
