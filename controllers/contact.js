const pool = require('../settings/bd');

module.exports.getAll = function (req, res) {
  const data = req.query;
  console.log(data);
  const brRows = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'ФИО', id: 'name' },
    { title: 'Телефон', id: 'tel' },
    { title: 'Тип', id: 'type' },
  ];
  let seachSpek = 'SELECT * from TR_CONTACT';
  if (data.phone && data.surname) {
    seachSpek = `SELECT * from TR_CONTACT where tel = '${data.phone}' AND last_name = '${data.surname}'`;
  } else if (data.phone) {
    seachSpek = `SELECT * from TR_CONTACT where tel = '${data.phone}'`;
  } else if (data.surname) {
    seachSpek = `SELECT * from TR_CONTACT where last_name = '${data.surname}'`;
  }
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([
          element.id,
          element.last_name +
            ' ' +
            element.first_name +
            ' ' +
            element.middle_name,
          element.tel,
          element.type_code,
        ]); //Тут меняем поля, последовательсть надо сохранять, как у загловка таблиц
      }
      console.log(brRows);
    }

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
      ],
    });
  });
};

module.exports.getLast = function (req, res) {
  console.log(req);
  seachSpek = 'SELECT MAX(ID) FROM TR_CONTACT';
  pool.query(seachSpek, (err, result) => {
    if (err) {
      console.log(err);
    } else
      res.status(200).json({
        req: result.rows[0].max,
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
      console.log(err);
    } else {
      console.log(result);
    }

    res.status(200).json({
      status: 'OK',
    });
  });
};

module.exports.edit = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
  });
};
