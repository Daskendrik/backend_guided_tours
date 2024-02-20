import { pool } from '../settings/db.js';
import { GetDataNow } from '../Tool/GetDataNow.js';
import { FormatData } from '../Tool/FormatData.js';

const dateNow = GetDataNow();

//поиск контакта по ID
export function getById(
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
  const seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.id = '${data.ID}' `;
  let reqData: any[] = [];
  console.log(`Получение контакта по селекту ${seachSpek}`);
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
      reqData = [
        {
          Lable: 'Фамилия',
          Value: result.rows[0].last_name,
          Type: 'text',
          id: 'last_name',
        },
        {
          Lable: 'Имя',
          Value: result.rows[0].first_name,
          Type: 'text',
          id: 'first_name',
        },
        {
          Lable: 'Отчество',
          Value: result.rows[0].middle_name,
          Type: 'text',
          id: 'middle_name',
        },
        {
          Lable: 'Телефон',
          Value: result.rows[0].tel,
          Type: 'tel',
          id: 'tel',
        },
        {
          Lable: 'Почта',
          Value: result.rows[0].email,
          Type: 'email',
          id: 'email',
        },
        {
          Lable: 'Тип',
          Value: result.rows[0].name,
          Type: 'select',
          id: 'type_code',
          // arrSelect: lov,
        },
        {
          Lable: 'Комментарий',
          Value: result.rows[0].comment,
          Type: 'textarea',
          id: 'comment',
        },
        {
          Lable: 'Создан',
          Value: FormatData(result.rows[0].created),
          Type: 'data',
          id: 'created',
        },
        {
          Lable: 'Обновлен',
          Value: FormatData(result.rows[0].update),
          Type: 'data',
          id: 'update',
        },
      ];
      console.log(FormatData(result.rows[0].update));
      let seach = `Select * from tr_lov where lov_type = 'CONTACT'`;
      pool.query(seach, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).json({
            status: 'Error',
          });
        } else {
          const arr = result.rows;
          const lov = result.rows;
          reqData.find((data) => data.id === 'type_code').arrSelect = lov;
          res.status(200).json({
            status: 'OK',
            req: reqData,
          });
        }
      });
    }
  });
}
//Поиск всех контактов
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
            | (
                | { element: string; elements: { title: string; id: string }[] }
                | { element: string; elements: any[][] }
              )[];
        }): void;
        new (): any;
      };
    };
  },
) {
  const data = req.query;
  const brRows: any[][] = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'ФИО', id: 'name' },
    { title: 'Телефон', id: 'tel' },
    { title: 'Тип', id: 'type' },
  ];
  let seachSpek = 'select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code order by id';
  if (data.phone && data.surname) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' AND a.last_name = '${data.surname}' order by id`;
  } else if (data.phone) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' order by id`;
  } else if (data.surname) {
    seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.last_name = '${data.surname}' order by id`;
  }
  pool.query(seachSpek, (err, result) => {
    if (err) {
      res.status(400).json({
        req: [err],
      });
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        let fullName =
          element.last_name + ' ' + element.first_name + ' ' + (element.middle_name != null ? element.middle_name : '');
        brRows.push([element.id, fullName, element.tel, element.name]); //Тут меняем поля, последовательсть надо сохранять, как у загловка таблиц
      }
      res.status(200).json({
        req: [
          {
            element: 'Header',
            elements: tableTitle,
          },
          {
            element: 'Body',
            elements: brRows,
          },
        ],
      });
    }
  });
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
//удаление контакта
const _delete = function (
  req: { body: any },
  res: { status: (arg0: number) => { (): any; new (): any; json: { (arg0: { status: string }): void; new (): any } } },
) {
  console.log('delete');
  const data = req.body;
  console.log(data);
  const del = `Delete FROM TR_CONTACT WHERE ID=${data.targetRow}`;
  pool.query(del, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
    res.status(200).json({
      status: 'OK',
    });
  });
};
export { _delete as delete };
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
