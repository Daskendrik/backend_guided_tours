const pool = require('../settings/bd');

module.exports.getById = function (req, res) {
  const data = req.query;
  console.log(data);
  const seachSpek = `select a.* from tr_lov where a.id = '${data.ID}' `;
  let reqData = [];
  console.log(data);
  console.log(seachSpek);
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result.rows);
      reqData = [
        {
          Lable: 'ID',
          Value: result.rows[0].id,
          Type: 'text',
          id: 'id',
        },
        {
          Lable: 'Тип справочника',
          Value: result.rows[0].lov_type,
          Type: 'text',
          id: 'lov_type',
        },
        {
          Lable: 'Код',
          Value: result.rows[0].code,
          Type: 'text',
          id: 'code',
        },
        {
          Lable: 'Отображаемое значение',
          Value: result.rows[0].name,
          Type: 'text',
          id: 'name',
        },
        {
          Lable: 'Дата создания',
          Value: 'будет дата',
          Type: 'text',
          id: 'created',
        },
        {
          Lable: 'Дата изменения',
          Value: 'будет дата',
          Type: 'text',
          id: 'update',
        },
      ];
      res.status(200).json({
        status: 'OK',
        req: reqData,
      });
    }
  });
};

module.exports.getAll = function (req, res) {
  const data = req.query;
  const brRows = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'Тип справочника', id: 'lov_type' },
    { title: 'Код', id: 'code' },
    { title: 'Отображаемое значение', id: 'name' },
  ];
  let seachSpek = 'select a.* from tr_lov a order by a.id';
  // if (data.phone && data.surname) {
  //   seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' AND a.last_name = '${data.surname}' order by id`;
  // } else if (data.phone) {
  //   seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.tel = '${data.phone}' order by id`;
  // } else if (data.surname) {
  //   seachSpek = `select a.*, b.name from tr_contact a left join tr_lov b on a.type_code=b.code where a.last_name = '${data.surname}' order by id`;
  // }
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        req: [err],
      });
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([element.id, element.lov_type, element.code, element.name]); //Тут меняем поля, последовательсть надо сохранять, как у загловка таблиц
      }
      let firsrRow;
      pool.query(
        `select a.* from tr_lov a where id=${brRows[0][0]}`,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            firsrRow = [
              {
                Lable: 'ID',
                Value: result.rows[0].id,
                Type: 'text',
                id: 'id',
              },
              {
                Lable: 'Тип справочника',
                Value: result.rows[0].lov_type,
                Type: 'text',
                id: 'lov_type',
              },
              {
                Lable: 'Код',
                Value: result.rows[0].code,
                Type: 'text',
                id: 'code',
              },
              {
                Lable: 'Отображаемое значение',
                Value: result.rows[0].name,
                Type: 'text',
                id: 'name',
              },
              {
                Lable: 'Дата создания',
                Value: 'будет дата',
                Type: 'text',
                id: 'created',
              },
              {
                Lable: 'Дата изменения',
                Value: 'будет дата',
                Type: 'text',
                id: 'update',
              },
            ];
            result.rows[0];
            console.log(result.rows[0]);
            res.status(200).json({
              req: [
                {
                  element: 'Header',
                  nameColumn: tableTitle,
                },
                {
                  element: 'Body',
                  elements: brRows,
                },
                { element: 'firstRow', elements: firsrRow },
              ],
            });
          }
        }
      );
    }
  });
};

module.exports.getLast = function (req, res) {
  let lastId;
  let lov;
  console.log(req);
  seachSpek = 'SELECT MAX(ID) FROM TR_CONTACT';
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else lastId = result.rows[0].max;
    console.log('getlov');
    const seach = `Select * from tr_lov where lov_type = 'CONTACT'`;
    pool.query(seach, (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({
          status: 'Error',
        });
      } else {
        console.log(result.rows);
        const arr = result.rows;
        console.log(arr);
        lov = result.rows;
        res.status(200).json({
          status: 'OK',
          req: [lastId, lov],
        });
      }
    });
  });
};

module.exports.delete = function (req, res) {
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

module.exports.create = function (req, res) {
  const data = req.body;
  console.log(data);
  const namecol = [];
  const valuecol = [];
  data.forEach((element) => {
    if (element.Value) {
      namecol.push(element.id);
      valuecol.push(`'${element.Value}'`);
    }
  });

  const insert = `INSERT INTO TR_CONTACT(${namecol}) values (${valuecol})`;
  console.log(insert);

  pool.query(insert, (err, result) => {
    if (err) {
      console.log(1);
      console.log(err);
      console.log(2);
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
};

module.exports.update = function (req, res) {
  const data = req.body;
  console.log(data);
  const updateSet = [];
  let id;
  data.forEach((element) => {
    if (element.id != 'id') {
      let value = '';
      if (!!element.Value) {
        value = element.Value;
      }
      updateSet.push(`${element.id} = '${value}'`);
    } else {
      id = element.Value;
    }
  });
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
};
