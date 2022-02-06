import request from 'supertest';
import { Server } from '../../../../../Server';
import Forum from '../../../models/Forum';
import { generateRandomForum } from '../../../helpers/tests';
import { Config } from '../../../../../config/Config';

const app = new Server();

describe('/v1/forums', () => {
	beforeAll(() => app.listen(Config.get('PORT') || '0'));
	afterAll(async () => {
		app.close();
		await Forum.deleteMany({});
	});

	describe('GET /', () => {
		it('should return all Forums', async () => {
			await Forum.insertMany([
				generateRandomForum(),
				generateRandomForum(),
			]);
			const res = await request(app.server).get('/api/v1/forums');
			expect(res.status).toBe(200);
			expect(res.body).not.toBeNull();
			expect(res.body).not.toEqual([]);
		});
	});

	describe('POST /', () => {
		it('should return 422 if Input Validation Failed', async () => {
			const res = await request(app.server).post('/api/v1/forums').send({
				name: 'j',
				description: 't',
			});
			expect(res.status).toBe(422);
		});

		it('should save Forum if Input Validation Succeed', async () => {
			const forum = generateRandomForum();
			await request(app.server).post('/api/v1/forums').send(forum);

			const findforum = await Forum.findOne({
				name: forum.name,
				description: forum.description,
			});
			expect(findforum).not.toBeNull();
		});

		it('should return Forum if Successfully Created', async () => {
			const forum = generateRandomForum();
			const res = await request(app.server)
				.post('/api/v1/forums')
				.send(forum);
			expect(res.status).toBe(201);
			expect(res.body).toHaveProperty('id');
			expect(res.body).toHaveProperty('name', forum.name);
			expect(res.body).toHaveProperty('description', forum.description);
		});
	});

	describe('GET /:forumId', () => {
		it('should return 422 if forumId is invalid format', async () => {
			const res = await request(app.server).get(
				'/api/v1/forums/hello12345world'
			);
			expect(res.status).toBe(422);
		});

		it('should return 404 if forumId is invalid', async () => {
			const res = await request(app.server).get('/api/v1/forums/5123');
			expect(res.status).toBe(404);
		});

		it('should return Forum if forumId is valid', async () => {
			const forum = generateRandomForum();
			await Forum.create(forum);
			const res = await request(app.server).get(
				'/api/v1/forums/' + forum.id
			);
			expect(res.status).toBe(200);
			expect(res.body).toMatchObject(forum);
			expect(res.body).toHaveProperty('id', forum.id);
			expect(res.body).toHaveProperty('name', forum.name);
		});
	});

	describe('PUT /:forumId', () => {
		it('should return 422 if forumId is invalid format', async () => {
			const res = await request(app.server)
				.put('/api/v1/forums/hello12345world')
				.send({});
			expect(res.status).toBe(422);
		});

		it('should return 422 if Input Validation Failed', async () => {
			const forum = await Forum.create(generateRandomForum());
			const res = await request(app.server)
				.put('/api/v1/forums/' + forum.id)
				.send({
					name: 'j',
					description: 't',
				});
			expect(res.status).toBe(422);
		});

		it('should return 404 if forumId is invalid', async () => {
			const res = await request(app.server)
				.put('/api/v1/forums/5123')
				.send(generateRandomForum());
			expect(res.status).toBe(404);
		});

		it('should update Forum if Input Validation Succeed', async () => {
			const forum = await Forum.create(generateRandomForum());
			await request(app.server)
				.put('/api/v1/forums/' + forum.id)
				.send({
					name: forum.name + 'updated',
					description: forum.description,
				});

			const findforum = await Forum.findOne({
				id: forum.id,
				name: forum.name + 'updated',
			});
			expect(findforum).not.toBeNull();
		});

		it('should return Forum if Successfully Updated', async () => {
			const forum = await Forum.create(generateRandomForum());
			const res = await request(app.server)
				.put('/api/v1/forums/' + forum.id)
				.send({
					name: forum.name + 'updated',
					description: forum.description,
				});
			expect(res.status).toBe(200);
			expect(res.body).toHaveProperty('id', forum.id);
			expect(res.body).toHaveProperty('name', forum.name + 'updated');
		});
	});

	describe('DELETE /:forumId', () => {
		it('should return 422 if forumId is invalid format', async () => {
			const res = await request(app.server).delete(
				'/api/v1/forums/hello12345world'
			);
			expect(res.status).toBe(422);
		});

		it('should return 404 if forumId is invalid', async () => {
			const res = await request(app.server).delete('/api/v1/forums/5123');
			expect(res.status).toBe(404);
		});

		it('should delete Forum if forumId is valid', async () => {
			const forum = await Forum.create(generateRandomForum());
			await request(app.server).delete('/api/v1/forums/' + forum.id);

			const findforum = await Forum.findOne({
				id: forum.id,
				name: forum.name,
			});
			expect(findforum).toBeNull();
		});

		it('should return 204 if Successfully Deleted', async () => {
			const forum = await Forum.create(generateRandomForum());
			const res = await request(app.server).delete(
				'/api/v1/forums/' + forum.id
			);
			expect(res.status).toBe(204);
		});
	});
});
