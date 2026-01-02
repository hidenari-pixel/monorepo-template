import * as D from "date-fns";

export function formatDate(date: Date, format: string) {
	return D.format(date, format);
}
