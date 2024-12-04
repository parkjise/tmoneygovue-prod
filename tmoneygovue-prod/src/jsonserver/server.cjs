/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const apiList = require('./dummy/apiList.cjs');
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server');
//import jsonServer from 'json-server';
const server = jsonServer.create();
const router = jsonServer.router('src/jsonserver/db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  // 1초 딜레이 추가
  setTimeout(next, 200);
});

// server.use((req, res) => {
//   res.status(401).jsonp({
//     error: 'Unauthorized'
//   });
// });

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});
server.get('/apiList', (req, res) => {
  res.send(apiList);
});

// const db = require('./dummy/travel/productList.json');
// server.post('/api/prd/v1/selectTrvlPrdList.do', (req, res) => {
//   const results = JSON.parse(JSON.stringify(db.productList)); // get all prdList
//   if (req.body.keyword) {
//     results.dta.prdList = results.dta.prdList.filter((prdList) => prdList.trvlPrdNm.includes(req.body.keyword)); // filter by keyword
//   }
//   if (req.body.areaId && req.body.areaId != 'ALL') {
//     results.dta.prdList = results.dta.prdList.filter((prdList) => prdList.areaId == req.body.areaId); // filter by title
//   }

//   // Pagination
//   const page = req.body.page || 1;
//   const limit = req.body.limit || 10;
//   const offset = (page - 1) * limit;
//   results.dta.prdList = results.dta.prdList.slice(offset, offset + limit);

//   res.send(JSON.stringify(results));
// });

const apis = {
  ...require('./dummy/member.json'),
  ...require('./dummy/main.json'),
  ...require('./dummy/notice.json'),
  ...require('./dummy/tmoneyCardInfo.json'),
  ...require('./dummy/trCreditCardInfo.json'),
  ...require('./dummy/transfer.json'),
  ...require('./dummy/goMileage.json'),
  ...require('./dummy/event.json'),
  ...require('./dummy/coupon.json'),
  ...require('./dummy/publicTransportHistory.json'),
  ...require('./dummy/busHistory.json'),
  ...require('./dummy/bikeScooter.json'),
  ...require('./dummy/publicBicycleHistory.json'),
  ...require('./dummy/goPassHistory.json'),
  ...require('./dummy/terms.json'),
  ...require('./dummy/payment.json'),
  ...require('./dummy/memberInfo.json'),
  ...require('./dummy/customerSupport.json'),
  ...require('./dummy/appSetting.json'),
  ...require('./dummy/travel/intro.json'),
  ...require('./dummy/travel/exhibition.json'),
  ...require('./dummy/travel/productList.json'),
  ...require('./dummy/travel/product.json'),
  ...require('./dummy/travel/reservation.json'),
  ...require('./dummy/travel/history.json'),
  ...require('./dummy/trainHistory.json'),
  ...require('./dummy/taxiHistory.json'),
  ...require('./dummy/airplane.json'),
  ...require('./dummy/carRentHistory.json'),
  ...require('./dummy/notification.json'),
  ...require('./dummy/travel/payment.json'),
  ...require('./dummy/trvlHistory.json')
};

apiList.forEach((x) => {
  if (apis[x.name]) {
    server[x.method](`/tgodummyspa${x.url}`, (req, res) => {
      res.send(JSON.stringify(apis[x.name]));
    });
  }
});

// Use default router
server.use('/tgodummyspa', router);
server.listen(5110, () => {
  console.log('JSON Server is running "http://localhost:5110/tgodummyspa"');
});
