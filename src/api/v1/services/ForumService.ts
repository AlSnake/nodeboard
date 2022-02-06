import { ModelService } from './ModelService';
import { IForum } from '../interfaces/Forum';
import Forum from '../models/Forum';

export class ForumService extends ModelService<IForum> {
	constructor() {
		super(Forum);
	}
}
