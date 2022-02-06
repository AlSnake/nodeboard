import { Router } from 'express';
import { ThreadController } from '../controllers/ThreadController';
import { validateThread } from '../validation/thread';
import { validateSnowflakeParam } from '../validation/param';

const router = Router();

router.get('/threads', ThreadController.getThreads);
router.post('/threads', validateThread(), ThreadController.postThreads);
router.get(
	'/threads/:threadId',
	validateSnowflakeParam('threadId'),
	ThreadController.getThread
);
router.put(
	'/threads/:threadId',
	validateSnowflakeParam('threadId'),
	validateThread(),
	ThreadController.putThread
);
router.delete(
	'/threads/:threadId',
	validateSnowflakeParam('threadId'),
	ThreadController.deleteThread
);

export default router;
