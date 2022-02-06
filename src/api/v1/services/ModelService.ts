import { Model } from 'mongoose';
import { ThrowExtendedError } from '../helpers/error';

export class ModelService<T extends {}> {
	constructor(private _model: Model<T>) {}

	async getById(id: string) {
		const findData = await this._model.findOne({ id });
		if (!findData)
			ThrowExtendedError(`${this._model.modelName} not Found!`, 404);
		return findData;
	}

	async getAll() {
		return await this._model.find({});
	}

	async getAllByProperty(data: object) {
		const findData = await this._model.find(data);
		if (!findData)
			ThrowExtendedError(`${this._model.modelName} not Found!`, 404);
		return findData;
	}

	async create(data: T) {
		return await this._model.create(data);
	}

	async update(id: string, data: T) {
		await (await this.getById(id)).updateOne(data);
		return await this.getById(id);
	}

	async delete(id: string) {
		return await (await this.getById(id)).deleteOne();
	}
}
