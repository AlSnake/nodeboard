import express from 'express';
import UserRoutes from './User';
import AuthRoutes from './Auth';

export default class Router {
	private static router: express.Router;
	private static basePath = '/v1';

	static getRouter(): express.Router {
		if (!Router.router) {
			Router.router = express.Router();
			Router.registerLocalRoutes();
		}
		return Router.router;
	}

	private static registerLocalRoutes(): void {
		Router.router.use(Router.basePath, UserRoutes);
		Router.router.use(Router.basePath, AuthRoutes);
	}
}
