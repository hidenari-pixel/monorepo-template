export function createBffStack() {
	const bff = new sst.cloudflare.Worker(`Bff-${$app.stage}`, {
		handler: "../apps/bff/src/index.ts",
		url: true,
	});

	return bff;
}
