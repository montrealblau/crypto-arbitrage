var gate = require('../API/gate.js');


var bot = {

	placeOrder: function(exchange, type, amount, pair, rate, opt, data, callback) {
	    // ----- gate-io ----- //
	    // exchange 'string' gate.io --> gate
	    // pair *string* eth_btc
	    // rate *number* 0.123
	    // amount *number* 13.3
	    // type *string* BUY/SELL
	    // opt *string* or null
	    var result = {
	        success: null,
	        id: null,
	        response: null,
	        data: data
	    }

	    if (exchange === 'gate') {

	        if (type === "BUY") {
	            gate.buy(pair, rate, amount, function(res) {
	            	if(JSON.parse(res).result === 'true' || JSON.parse(res).result === true){
	            	result.success = true;
	                result.id = JSON.parse(res).orderNumber;
	                result.response = res;
	                callback(result);
	            	}else{
	            	result.success = false;
	                result.id = JSON.parse(res).orderNumber;
	                result.response = res;
	                callback(result);

	            	}


	            });
	        }
	        if (type === "SELL") {

	        	console.log('---------');
	        	console.log('---------');
	        	console.log('ir SELL vismaz');
	        	console.log('pair', pair);
	        	console.log('rate', rate);
	        	console.log('amount', amount);
	        	console.log('---------');
	        	console.log('---------');


	            gate.sell(pair, rate, amount, function(res) {
	            	if(JSON.parse(res).result === 'true' || JSON.parse(res).result === true){
	                result.success = true;
	                result.id = JSON.parse(res).orderNumber;
	                result.response = res;
	                callback(result);
	            	}else{
	            	result.success = false;
	                result.id = JSON.parse(res).orderNumber;
	                result.response = res;
	                callback(result);

	            	}
	            });
	        }
	    } else {
	        // MANS CALLBACK ATGRIEŽ TIKAI  2 PARAMETRUS, SUCCESS UN ID, KAS IR ORDERID
	        // {
	        // 	"result":"true",
	        // 	"orderNumber":"123456",
	        // 	"msg":"Success"
	        // }
	        //
	        // OR 
	        //
	        //{"result":"false","code":5,"message":"Error: invalid key or sign, please re-generate it from your account"}

	        throw new Error('something went terribly wrong!, maybe incorrect inputs in wrap function');
	    }
	},

	orderStatus: function(exchange, id, pair, data, callback) {
	    var result = {
	    	success: null,
	        status: null,
	        amount: null,
	        response: null,
	        data:data
	    };


	    if (exchange = 'gate') {

	        gate.getOrder(id, pair, function(res) {

	            if (JSON.parse(res).result === 'true' || JSON.parse(res).result === true) {
	            	result.success = true;
	                result.status = JSON.parse(res).order.status;
	                result.id = JSON.parse(res).order.amount;
	                result.response = res;
	                callback(result);
	            } else {
	            	result.success = false;
	                result.status = JSON.parse(res).result;
	                result.response = res;

	                callback(result);
	            }
	        });
	    }

	    // MANS CALLBACK ATGRIEŽ TIKAI  2 PARAMETRUS, status UN AMOUNT
	    // {
	    // 	"result":true,
	    // 	"order":{
	    // 		"id":"15088",
	    // 		"status":"cancelled",
	    // 		"pair":"eth_btc",
	    // 		"type":"sell",
	    // 		"rate":0.06930520,
	    // 		"amount":"0.39901357",
	    // 		"initial_rate":0.06930520,
	    // 		"initial_amount":"1"
	    // 	},
	    // 	"msg":"Success"
	    // }
	},

	cancelThisOrder: function(exchange, id, pair, callback) {
	    var result = {
	    	success: null,
	        response: null
	    };

	    if (exchange = 'gate') {

	        gate.cancelOrder(id, pair, function(res) {

	            if (JSON.parse(res).result === 'true' || JSON.parse(res).result === true) {
	            	result.success = true;
	                result.response = res;
	                callback(result);
	            } else {
	                result.success = false;
	                result.response = res;
	                callback(result);
	            }
	        });
	    }

	    // MANS CALLBACK ATGRIEŽ TIKAI  1 PARAMETRU, status

	    // S O  T E ATGRIEZ gateio ja true
	    // {
	    // 	"result":"true",
	    // 	"msg":"Success"
	    // }
	},
		orderBook: function(exchange, callback) {

	    if (exchange = 'gate') {

	        gate.orderBooks(function(res) {
	            
	        	callback(JSON.parse(res));
	        });
	    }

			//     {
			// "result": "true",
		 //        "asks": [
		 //                [29500,    4.07172355],
		 //                [29499,    0.00203397],
		 //                [29495,    1],
		 //                [29488,    0.0672],
		 //                [29475,    0.001]
		 //            ],
		 //        "bids": [
		 //                [28001, 0.0477],
		 //                [28000, 0.35714018],
		 //                [28000, 2.56222976],
		 //                [27800, 0.0015],
		 //                [27777, 0.1]
		 //            ]
		 //      ...........
		 //  }
	},


	getAccountBalance: function(exchange, callback) {
	    var result = {
	    	success: null,
	        available: null,
	        locked: null,
	        response: null
	    };

	    if (exchange = 'gate') {

	        gate.getBalances(function(res) {
	            if (JSON.parse(res).result === 'true' || JSON.parse(res).result === true) {
	            	result.success = true;
	                available = JSON.parse(res).available;
	                locked = JSON.parse(res).locked;
	                result.response = res;
	                callback(result);
	            } else {
	            	result.success = false;
	                result.response = res;
	                callback(result);
	            }
	        });
	    }

	    // {
	    // 		"result":"true",
	    // 		"available":{
	    // 			"BTC":"0.83337671",
	    // 			"LTC":"94.364",
	    // 			"ETH":"0.07161",
	    // 			"ETC":"82.35029899"
	    // 		},
	    // 		"locked":{
	    // 			"BTC":"0.0002",
	    // 			"YAC":"10.01"
	    // 		}
	    // 	}

	},
		getTickers: function(exchange, callback) {

	    if (exchange = 'gate') {

	        gate.getTickers(function(res) {
	        	//console.log(res);
	        	callback(JSON.parse(res));
	        });
	    }

	    // ---> result must always be like this <----

	    // 	{
		//     "btc_usdt": {
		//         "result": "true",
		//         "last": 11953,
		//         "lowestAsk": 11952.78,
		//         "highestBid": 11873.8,
		//         "percentChange": 4.9590736847452,
		//         "baseVolume": 7768219.88,
		//         "quoteVolume": 656.624,
		//         "high24hr": 12197.51,
		//         "low24hr": 11251.87
		//     }
		//  }

	},
		getTicker: function(exchange, pair, callback) {

	    if (exchange = 'gate') {

	        gate.getTicker(pair,function(res) {
	        	callback(JSON.parse(res));
	        });
	    }

	    // ---> result must always be like this <----

	    // 	{
		//     "btc_usdt": {
		//         "result": "true",
		//         "last": 11953,
		//         "lowestAsk": 11952.78,
		//         "highestBid": 11873.8,
		//         "percentChange": 4.9590736847452,
		//         "baseVolume": 7768219.88,
		//         "quoteVolume": 656.624,
		//         "high24hr": 12197.51,
		//         "low24hr": 11251.87
		//     }
		//  }

	},
		getAllPairsTradingNow: function(exchange, callback) {

	    if (exchange = 'gate') {

	        gate.getPairs(function(res) {
	        	callback(res);
	        });
	    }

	    // ---> result must always be like this <----

	    // Array --> [storj_btc","eos_eth","eos_btc",.....,"bts_usdt","bts_btc"]

	}
}


module.exports = bot;

// placeOrder('gate','SELL', 1, 'eth_btc', 0.30, null, function(res){
// 	console.log(res);
// 	// var result = {
// 	//   success: null,
// 	//   id: null
// 	// }
// });

// orderStatus('gate', '123', 'eth_btc', function(res){
// 	console.log(res);
// 	// var result = {
// 	// 	status: null,
// 	// 	amount: null
// 	// };
// });

// cancelThisOrder('gate', '123', 'eth_btc', function(res){
// 	console.log(res);
// 	// var result = {
// 	// 	status: null,
// 	// 	amount: null
// 	// };
// });


// getAccountBalance('gate', function(res) {
//     console.log(res);
//     // var result = {
//     // 	status: null,
//     // 	amount: null
//     // };
// });