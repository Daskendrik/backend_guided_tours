import { Model } from '../settings/db';

export class LOV extends Model {
  static get tableName() {
    //название таблицы
    return 'tr_lov';
  }
  static get idColumn() {
    //уникальный ключ
    return 'id';
  }
  static get jsonSchema() {
    //проверка JSON
    return {
      type: 'object',
      require: ['id'],
      properties: {
        id: { type: 'integer' },
        lov_type: { type: 'string', minLength: 1, maxLength: 255 },
        code: { type: 'string', minLength: 1, maxLength: 255 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
      },
    };
  }
  static relationMappings = {
    contact: {
      relation: Model.BelongsToOneRelation,
      modelClass: LOV,
      join: {
        from: 'tr_lov.code',
        to: 'tr_contact.type_code',
      },
    },
  };
}
