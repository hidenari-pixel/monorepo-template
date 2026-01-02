import * as v from "valibot";

export const User = v.object({
	id: v.string(),
	name: v.pipe(v.string(), v.minLength(1)),
	email: v.pipe(v.string(), v.email()),
	createdAt: v.string(),
	updatedAt: v.string(),
});
