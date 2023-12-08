const pool = require('../settings/bd');

module.exports.getAll = function (req, res) {
  console.log(req.query);

  const brRows = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'ФИО', id: 'name' },
    { title: 'Телефон', id: 'tel' },
    { title: 'Тип', id: 'type' },
  ];
  pool.query('SELECT * from TR_CONTACT', (err, result) => {
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

module.exports.find = function (req, res) {
  // console.log(req);
  console.log(req);
  res.status(200).json({
    status: 'OK',
  });
};

module.exports.create = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
  });
};

module.exports.edit = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
  });
};
