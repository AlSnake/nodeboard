import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateUser, validateUserIdParam } from '../validation/user';
import { isAuthenticated } from '../middlewares/isAuthenticated';

const router = Router();

router.get('/users', UserController.getUsers);
router.post('/users', validateUser(), UserController.postUsers);
router.get('/users/@me', isAuthenticated, UserController.getMe);
router.get('/users/:userId', validateUserIdParam(), UserController.getUser);
router.put(
	'/users/:userId',
	validateUserIdParam(),
	validateUser(),
	UserController.putUser
);
router.delete(
	'/users/:userId',
	validateUserIdParam(),
	UserController.deleteUser
);

export default router;
