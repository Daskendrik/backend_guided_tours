import { Model } from '../settings/db';
import { LOV } from './LOV';

export class Contact extends Model {
  created: any;
  last_name: any;
  id: any;
  first_name: any;
  update: any;
  lov_name: any;
  tel: any;
  name: string | undefined;
  lov_type: string | undefined;
  middle_name: any;
  full_name: string | undefined;
  static get tableName() {
    //название таблицы
    return 'tr_contact';
  }
  static get idColumn() {
    //уникальный ключ
    return 'id';
  }

  //связи
  static relationMappings = {
    lov: {
      relation: Model.HasOneRelation,
      modelClass: LOV,
      join: {
        from: 'tr_contact.type_code',
        to: 'tr_lov.code',
      },
    },
  };
  fullName() {
    return this.first_name + ' ' + this.last_name + ' ' + (this.middle_name || '');
  }
}
