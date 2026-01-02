type Stage = "dev" | "prd";
interface Env {
	stage: Stage;
}

if (!["dev", "prd"].includes($app.stage)) {
	throw new Error(`Invalid stage: ${$app.stage}`);
}

const ENV = {
	dev: {
		stage: "dev",
	},
	prd: {
		stage: "prd",
	},
} as const satisfies Record<Stage, Env>;

export const env = ENV[$app.stage as Stage];
