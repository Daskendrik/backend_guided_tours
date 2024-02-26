import { pool } from '../settings/db.js';
import { GetDataNow } from '../Tool/GetDataNow.js';
import { FormatData } from '../Tool/FormatData.js';
import { Contact } from '../models/Contact.js';
import { title } from 'process';
import { LOVTitle } from '../Tool/LOVTitle.js';
import { TitleFieldsTable } from '../Types/Fields.js';
import { LOV } from '../models/LOV.js';

const dateNow = GetDataNow();

//поиск контакта по ID +
export async function getById(
  req: { query: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: string; req?: any[] }): void; new (): any };
    };
  },
) {
  const data = req.query;
  let reqData: any[] = [];
  try {
    const contactById: any = await Contact.query()
      .findById(data.ID)
      .select('tr_contact.*', 'lov.name as type')
      .leftJoinRelated('lov');
    const lov = await LOV.query().where('lov_type', 'CONTACT');
    console.log(contactById);
    console.log(lov);
    reqData = [
      {
        Lable: 'Фамилия',
        Value: contactById.last_name,
        Type: 'text',
        id: 'last_name',
      },
      {
        Lable: 'Имя',
        Value: contactById.first_name,
        Type: 'text',
        id: 'first_name',
      },
      {
        Lable: 'Отчество',
        Value: contactById.middle_name,
        Type: 'text',
        id: 'middle_name',
      },
      {
        Lable: 'Телефон',
        Value: contactById.tel,
        Type: 'tel',
        id: 'tel',
      },
      {
        Lable: 'Почта',
        Value: contactById.email,
        Type: 'email',
        id: 'email',
      },
      {
        Lable: 'Тип',
        Value: contactById.type,
        Type: 'select',
        id: 'type_code',
        arrSelect: lov,
      },
      {
        Lable: 'Комментарий',
        Value: contactById.comment,
        Type: 'textarea',
        id: 'comment',
      },
      {
        Lable: 'Создан',
        Value: FormatData(contactById.created),
        Type: 'data',
        id: 'created',
      },
      {
        Lable: 'Обновлен',
        Value: FormatData(contactById.update),
        Type: 'data',
        id: 'update',
      },
    ];
    console.log(reqData);
    res.status(200).json({
      status: 'OK',
      req: reqData,
    });
  } catch (error) {
    const err = Error('Ошибка');
    res.status(400).json({
      req: [err],
      status: 'Error',
    });
  }
}
//Поиск всех контактов +
export async function getAll(
  req: { query: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: {
        (arg0: {
          req:
            | Error[]
            | ({ element: string; elements: { title: string; id: string }[] } | { element: string; elements: any })[];
          status: any;
        }): void;
        new (): any;
      };
    };
  },
) {
  const data = req.query;
  const tableTitle: TitleFieldsTable = [
    //Заголовок таблиц
    { id: 'id' },
    { id: 'full_name' },
    { id: 'tel' },
    { id: 'type' },
  ];
  tableTitle.map((titleCode: { id: any; title?: any }) => {
    const id: string = titleCode.id;
    titleCode.title = LOVTitle[id];
  });
  let allContact;
  try {
    if (data.phone && data.surname) {
      allContact = await Contact.query()
        .select('tr_contact.*', 'lov.name as type')
        .leftJoinRelated('lov')
        .where('tel', data.phone)
        .where('last_name', data.surname)
        .orderBy('id');
    } else if (data.phone) {
      allContact = await Contact.query()
        .select('tr_contact.*', 'lov.name as type')
        .leftJoinRelated('lov')
        .where('tel', data.phone)
        .orderBy('id');
    } else if (data.surname) {
      allContact = await Contact.query()
        .select('tr_contact.*', 'lov.name as type')
        .leftJoinRelated('lov')
        .where('last_name', data.surname)
        .orderBy('id');
    } else {
      allContact = await Contact.query()
        .select('tr_contact.*', 'lov.name as type')
        .leftJoinRelated('lov')
        .orderBy('id');
    }
    if (allContact) {
      allContact.map((contact) => {
        contact.full_name = contact.fullName();
      });
    }

    res.status(200).json({
      req: [
        {
          element: 'Header',
          elements: tableTitle,
        },
        {
          element: 'Body',
          elements: allContact,
        },
      ],
      status: 'OK',
    });
  } catch (error) {
    const err = Error('Ошибка');
    res.status(400).json({
      req: [err],
      status: 'Error',
    });
  }
}
//Получение айдишника последнего созданного контакта
export function getLast(
  req: any,
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: string; req?: any[] }): void; new (): any };
    };
  },
) {
  let lastId: any;
  let lov;
  const seachSpek = 'SELECT MAX(ID) FROM TR_CONTACT';
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else lastId = result.rows[0].max;
    const seach = `Select * from tr_lov where lov_type = 'CONTACT'`;
    pool.query(seach, (err, result) => {
      if (err) {
        res.status(400).json({
          status: 'Error',
        });
      } else {
        const arr = result.rows;
        lov = result.rows;
        res.status(200).json({
          status: 'OK',
          req: [lastId, lov],
        });
      }
    });
  });
}
//удаление контакта +
export async function deleteRow(
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status?: string; req: Error[] | number[] }): void; new (): any };
    };
  },
) {
  const data = req.body;
  try {
    const result = await Contact.query().deleteById(data.targetRow);
    res.status(200).json({
      status: 'OK',
      req: [result],
    });
  } catch (error) {
    const err = Error('Ошибка');
    res.status(400).json({
      req: [err],
      status: 'Error',
    });
  }
}

//создание конакта
export function create(
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: string; error?: Error; text?: string }): void; new (): any };
    };
  },
) {
  const data = req.body;
  console.log(data);
  const namecol = [];
  const valuecol = [];
  data.forEach((element: { Value: any; id: any }) => {
    if (element.Value) {
      namecol.push(element.id);
      valuecol.push(`'${element.Value}'`);
    }
  });
  namecol.push('created', 'update');
  valuecol.push(`'${dateNow}'`, `'${dateNow}'`);

  const insert = `INSERT INTO TR_CONTACT(${namecol}) values (${valuecol})`;
  console.log(insert);

  pool.query(insert, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: 'BAD',
        error: err,
        text: 'Привышена длина в поле каком либо поле',
      });
    } else {
      res.status(200).json({
        status: 'OK',
      });
    }
  });
}
//Обновление данных
export function update(
  req: { body: any },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: { status: string; error?: Error; text?: string }): void; new (): any };
    };
  },
) {
  const data = req.body;
  console.log(data);
  const updateSet = [];
  let id;
  data.forEach((element: { id: string; Value: string }) => {
    if (element.id != 'id' && element.id != 'created' && element.id != 'update') {
      let value = '';
      if (!!element.Value) {
        value = element.Value;
      }
      updateSet.push(`${element.id} = '${value}'`);
    } else {
      id = element.Value;
    }
  });
  updateSet.push(`update = '${dateNow}'`);
  const update = `UPDATE TR_CONTACT SET ${updateSet} where id =${id} `;
  console.log(update);

  pool.query(update, (err, result) => {
    if (err) {
      console.log(err);
      res.status(200).json({
        status: 'BAD',
        error: err,
        text: 'Привышена длина в поле каком либо поле',
      });
    } else {
      res.status(200).json({
        status: 'OK',
      });
    }
  });
}
