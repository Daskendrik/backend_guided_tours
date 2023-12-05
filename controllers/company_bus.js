const pool = require('../settings/bd');

module.exports.allCompanyBus = function (req, res) {
  const brRows = [];
  pool.query('SELECT * from TR_COMPANY_BUS', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([element.id, element.name, element.site, element.tel]);
      }
    }
    if (brRows) {
      res.status(200).json({
        req: [
          {
            element: 'Header',
            nameColumn: [
              { title: 'ID', id: 'id' },
              { title: 'Название', id: 'name' },
              { title: 'Сайт', id: 'site' },
              { title: 'Телефон', id: 'tel' },
            ],
          },
          {
            element: 'Body',
            elements: brRows,
          },
        ],
      });
    } else {
      res.status(400);
    }
  });
};

module.exports.createCompanyBus = function (req, res) {
  // console.log(req);
  res.status(200).json({
    status: 'OK',
    errorText: 'Все нормал',
    id: '12asdsaf',
  });
};

module.exports.deleteCompanyBus = function (req, res) {
  console.log(req.query);
  console.log(req.query.targetRow);
  res.status(200).json({
    status: 'OK',
    errorText: '',
    comment: `Была удалена запись с id = ${req.query.targetRow}`,
  });
};
