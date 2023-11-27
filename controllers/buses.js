module.exports.getAllbus = function (req, res) {
  res.status(200).json({
    req: [
      {
        element: 'Header',
        nameColumn: [
          { title: 'Номер ТС', id: 'numTC' },
          { title: 'Фирма', id: 'firm' },
          { title: 'Телефон фирмы', id: 'firmTel' },
        ],
      },
      {
        element: 'Body',
        elements: [
          ['r451ww', 'Автобусы МСК', '879-9548-88'],
          ['r458ww', 'Автобусы МСК', '879-9548-88'],
        ],
      },
    ],
  });
};

module.exports.createBus = function (req, res) {
  console.log(req);
  res.status(200).json({
    status: 'OK',
    errorText: 'Все нормал',
    id: '12asdsaf',
  });
};

module.exports.deleteBus = function (req, res) {
  console.log(req);
  res.status(200).json({
    status: 'OK',
    errorText: 'Все нормал',
  });
};
