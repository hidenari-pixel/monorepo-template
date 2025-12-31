import { Button } from "@acme/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
	return (
		<div>
			<Button variant="default" size="lg">
				こんにちは
			</Button>
		</div>
	);
}
