var BuyAndUpdateAll = require('./Controllers/BuyAndUpdateAll.js');
var GetDealsAndSave = require('./Controllers/GetDealsAndSave.js');
var CheckAndUpdateAll = require('./Controllers/CheckAndUpdateAll.js');
var DeletaCompleatedDeals = require('./Controllers/DeletaCompleatedDeals.js');


var cron = require('node-cron');

//atgriež resolve, true vai false attieciibaa, vai ir izdarits darbs veiksmigi vai nebija ko dariit, ja reject, tad ERROR


 
// cron.schedule('* * * * *', function(){
//   console.log('running task....');
// 	GetDealsAndSave.do().then(function(res){
// 		console.log('Got some Deals ',res);
// 		BuyAndUpdateAll.do().then(function(res){
// 			console.log('Bought all what needed ',res);
// 			CheckAndUpdateAll.do().then(function(res){
// 				console.log('Updated all Deal statuses ',res);
// 				DeletaCompleatedDeals.do().then(function(res){
// 					console.log('Deletet all done Deals ',res);
// 				},function(err){
// 					console.log('~~~!',err);
// 				});
// 			},function(err){
// 				console.log('~~~!',err);
// 			});
// 		},function(err){
// 			console.log('~~~!',err);
// 		});		
// 	},function(err){
// 		console.log('~~~!',err);
// 	});
// });



 

	GetDealsAndSave.do().then(function(res){
		console.log(res);
		// console.log('Got some Deals ',res);
		// BuyAndUpdateAll.do().then(function(res){
		// 	console.log('Bought all what needed ',res);
		// 	CheckAndUpdateAll.do().then(function(res){
		// 		console.log('Updated all Deal statuses ',res);
		// 		DeletaCompleatedDeals.do().then(function(res){
		// 			console.log('Deletet all done Deals ',res);
		// 		},function(err){
		// 			console.log('~~~!',err);
		// 		});
		// 	},function(err){
		// 		console.log('~~~!',err);
		// 	});
		// },function(err){
		// 	console.log('~~~!',err);
		// });		
	},function(err){
		console.log('~~~!',err);
	});


