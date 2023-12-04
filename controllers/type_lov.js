const pooltest = require('../settings/bd');

module.exports.get = function (req, res) {
  const brRows = [];
  const tableTitle = [
    //Заголовок таблиц
    { title: 'Id', id: 'Id' },
    { title: 'Название', id: 'name' },
    { title: 'Код', id: 'code' },
  ];
  pooltest.query('SELECT * from TR_TYPE_LOV', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([element.id, element.name, element.code]); //Тут меняем поля, последовательсть надо сохранять, как у загловка таблиц
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

module.exports.create = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
    errorText: 'Все нормал',
    id: '12asdsaf',
  });
};

module.exports.delete = function (req, res) {
  console.log(req.query);
  console.log(req.query.targetRow);
  res.status(200).json({
    status: 'OK',
    errorText: '',
    comment: `Была удалена запись с id = ${req.query.targetRow}`,
  });
};
