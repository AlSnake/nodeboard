import { Router } from 'express';
import { PostController } from '../controllers/PostController';
import { validatePost } from '../validation/post';
import { validateSnowflakeParam } from '../validation/param';

const router = Router();

router.get(
	'/threads/:threadId/posts',
	validateSnowflakeParam('threadId'),
	PostController.getPosts
);

router.post(
	'/threads/:threadId/posts',
	validateSnowflakeParam('threadId'),
	validatePost(),
	PostController.postPosts
);

router.get(
	'/threads/:threadId/posts/:postId',
	validateSnowflakeParam('threadId'),
	validateSnowflakeParam('postId'),
	PostController.getPost
);

router.put(
	'/threads/:threadId/posts/:postId',
	validateSnowflakeParam('threadId'),
	validateSnowflakeParam('postId'),
	validatePost(),
	PostController.putPost
);

router.delete(
	'/threads/:threadId/posts/:postId',
	validateSnowflakeParam('threadId'),
	validateSnowflakeParam('postId'),
	PostController.deletePost
);

export default router;
