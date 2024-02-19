export function getAllbus(req, res) {
  const brRows = [];
  query('SELECT * from TR_BUSES', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(result.rows);
      //собираем данные для отображения на лист апплете - все ТС
      for (let i = 0; i < result.rows.length; i++) {
        const element = result.rows[i];
        brRows.push([element.id, element.gos_number, 'Заглуха']);
      }
      console.log(brRows);
    }
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
          elements: brRows,
        },
      ],
    });
  });
}

export function createBus(req, res) {
  const data = req.query;
  console.log(data);
  res.status(200).json({
    status: 'OK',
    errorText: 'Все нормал',
    id: '12asdsaf',
  });
}

export function deleteBus(req, res) {
  console.log(req.query);
  console.log(req.query.targetRow);
  res.status(200).json({
    status: 'OK',
    errorText: '',
    comment: `Была удалена запись с id = ${req.query.targetRow}`,
  });
}
