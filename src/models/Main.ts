import { MaybeCompositeId, PartialModelObject } from 'objection';
import { Model } from '../settings/db';

export class MainModel extends Model {
  static CREATE: any;
  static GETall: () => Promise<MainModel[]>;
  static GETbyId: (id: any) => Promise<MainModel>;
  static UPDATE: any;
  static REMOVE: any;
  constructor() {
    super();
  }
}

MainModel.CREATE = function (data: PartialModelObject<MainModel>) {
  return this.query().insert(data);
};

MainModel.GETall = async function () {
  try {
    const data = await this.query().orderBy('id', 'desc');
    if (!data.length) throw { message: 'Empty response', status: 404 };
    return data;
  } catch (error) {
    throw error;
  }
};

MainModel.GETbyId = async function (id) {
  try {
    const data = await this.query().findById(id);
    if (!data) throw { message: 'Empty response', status: 404 };
    return data;
  } catch (error) {
    throw error;
  }
};

MainModel.UPDATE = function (id: MaybeCompositeId, data: PartialModelObject<MainModel>) {
  return this.query().patchAndFetchById(id, data);
};

MainModel.REMOVE = function (id: MaybeCompositeId) {
  return this.query().deleteById(id);
};
