import { Router } from 'express';
import { ForumController } from '../controllers/ForumController';
import { validateForum } from '../validation/forum';
import { validateSnowflakeParam } from '../validation/param';

const router = Router();

router.get('/forums', ForumController.getForums);
router.post('/forums', validateForum(), ForumController.postForums);
router.get(
	'/forums/:forumId',
	validateSnowflakeParam('forumId'),
	ForumController.getForum
);
router.put(
	'/forums/:forumId',
	validateSnowflakeParam('forumId'),
	validateForum(),
	ForumController.putForum
);
router.delete(
	'/forums/:forumId',
	validateSnowflakeParam('forumId'),
	ForumController.deleteForum
);

export default router;
