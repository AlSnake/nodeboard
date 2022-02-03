import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateLogin, validateVerifyUser } from '../validation/auth';
import { validateEmail } from '../validation/user';

const router = Router();

router.post('/auth/login', validateLogin(), AuthController.postLogin);
router.post(
	'/auth/verify/send',
	validateEmail(),
	AuthController.postVerifySend
);
router.post(
	'/auth/verify',
	validateVerifyUser(),
	AuthController.postVerifyUser
);

export default router;
