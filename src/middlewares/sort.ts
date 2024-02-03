import moment from "moment";
import { Request, Response, NextFunction } from "express";

type IRequest = Request & {
	search?: string;
	sort?: string;
	page?: number;
	limit?: number;
	skip?: number;
	meta?: {
		user?: string;
		userEmail?: string;
		search?: string;
		sort?: string;
		page?: number;
		limit?: number;
		skip?: number;
		date?: string;
		query?: any;
	};
	query: {
		search?: string;
		sort?: string;
		page?: any;
		limit?: any;
		skip?: number;
		date?: any;
	};
	date?: any;
};

export default function sort(req: IRequest, res: Response, next: NextFunction) {
	const sort: string = req.query.sort ? req.query.sort : "-createdAt";
	const page: number = req.query.page && req.query.page > 0 ? parseInt(req.query.page) : 1;
	const limit: number = req.query.limit ? parseInt(req.query.limit) : 10;
	const search: string | undefined = req.query.search || "";
	if (limit < 1) {
		return res
			.status(400)
			.json({ code: "E003", message: "Limit must be greater than 0" });
	}

	req.search = search;
	req.sort = sort;
	req.page = page;
	req.limit = limit;
	req.skip = (page - 1) * limit;
	req.meta = {
		search,
		sort,
		page,
		limit,
		skip: (page - 1) * limit,
		date: req.query.date,
	};
	req.date = getDate(req.query.date);
	req.meta.query = { ...req.date };
	next();
}

const getDate = (query: any) => {
	if (query == "today" || query == "daily") {
		return {
			createdAt: {
				$gte: moment().startOf("day").toDate(),
				$lte: moment().endOf("day").toDate(),
			},
		};
	} else if (query == "weekly") {
		return {
			createdAt: {
				$gte: moment().startOf("week").toDate(),
				$lte: moment().endOf("week").toDate(),
			},
		};
	} else if (query == "monthly") {
		return {
			createdAt: {
				$gte: moment().startOf("month").toDate(),
				$lte: moment().endOf("month").toDate(),
			},
		};
	} else if (query == "yearly") {
		return {
			createdAt: {
				$gte: moment().startOf("year").toDate(),
				$lte: moment().endOf("year").toDate(),
			},
		};
	}
	return {};
};

export type RequestSortType = Request & {
	sort?: string;
	page?: number;
	limit?: number;
	skip?: number;
	meta?: any;
	date?: any;
};
