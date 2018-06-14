var files = require('./Controllers/FilesPromise.js');
var trade = require('./Controllers/ApiWrapper.js');
var gate = require('./API/gate.js');
var settings = require('./settings/settings');
var GetDealsAndSave = require('./Controllers/GetDealsAndSave.js');
var exchange = settings.exchange;


// files.getFile('./JSON/deals.json',).then(function(res){

// 	print(JSON.parse(res));

// },function(err){
// 	console.log(err);
// });
	// GetDealsAndSave.do().then(function(res){
	// 	console.log('~~',res);
	// });



			
trade.placeOrder('gate','SELL',0.0114,'eth_btc',0.09239123, null, [1,2,3],function(res) {
    	console.log(res);
});




// function print(res){
// 	res.forEach(function(item,index){
// 		console.log(index+','+item.step1.pair+','+item.info.profit+','+item.info.delta);
// 	})
// }


// trade.getAccountBalance('gate', function(res) {
//     console.log(res);
//     // var result = {
//     // 	status: null,
//     // 	amount: null
//     // };
// });

// trade.orderSTatus(exchange, 'BUY', 152, 'FUN_ETH', 0.000066, null, [1,2,3], function(res) {

//         //print('orders veikts');
//         //tmp.push(data);
//         //Paziņot kka atpakaļ failam, ka ir pending....
//         console.log(res);
//         //loop(data); //atgriezam rekursiivajai funkcijai datus, par to, kurs solis tika izdariits veiksmiigi, lai pectam callbackaa vini visi paraadiitos


// });


// trade.orderStatus(exchange, 429740744, 'FUN_ETH', function(res) {

//         //print('orders veikts');
//         //tmp.push(data);
//         //Paziņot kka atpakaļ failam, ka ir pending....
//         console.log(res);
//         //loop(data); //atgriezam rekursiivajai funkcijai datus, par to, kurs solis tika izdariits veiksmiigi, lai pectam callbackaa vini visi paraadiitos


// });





// function someFunction(a, b, callback) {
//     console.log('Hey doing some stuff!');
//     callback();
// }



// asyncLoop(10, function(loop) {
//     someFunction(1, 2, function(result) {

//         // log the iteration
//         console.log(loop.iteration());

//         // Okay, for cycle could continue
//         loop.next();
//     })},
//     function(){console.log('cycle ended')}
// );









// function asyncLoop(iterations, func, callback) {
//     var index = 0;
//     var done = false;
//     var loop = {
//         next: function() {
//             if (done) {
//                 return;
//             }

//             if (index < iterations) {
//                 index++;
//                 func(loop);

//             } else {
//                 done = true;
//                 callback();
//             }
//         },

//         iteration: function() {
//             return index - 1;
//         },

//         break: function() {
//             done = true;
//             callback();
//         }
//     };
//     loop.next();
//     return loop;
// }