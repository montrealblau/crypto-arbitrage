var GetDealObject = require('./Controllers/GetDealObject');
var files = require('./Controllers/FilesPromise.js');


function init(){
	t(1);
	GetDealObject.data(function(res){
		t(2);
		console.log('Got ',res.length,' new deals');
		if (res.length !== 0) {
			var newDeals = res;
			files.getFile('./JSON/deals.json',).then(function(res){
				t(3);
				return addToFile(JSON.parse(res),newDeals);
			})
			.then(function(labots){
				t(4);
			files.postFile('./JSON/deals.json',JSON.stringify(labots)).then(function(res){
				t(5);
				console.log(res);
				setTimeout(init, 7000);
			}, function(err){
				console.log(err);
			})	
			},function(err){
				console.log(err);
			    console.log(55);
			})
		}else{
			setTimeout(init, 5000);
		}

	});
}


init();


function t(n){
	result = ". ";
	for(i=1;i<n;i++){
	 result += ". ";
	}
	console.log(result);
}

function addToFile(old,newDeals){
	var result = old;
	if(newDeals.length > 0){
		for (var i = 0; i < newDeals.length; i++) {
			var bool = contains(old,newDeals[i]);
			if (!bool) {
				result.push(newDeals[i]);
			}
		}
	}	
	return result;
}

function contains(old, newDeal) {
	var tmpid = [];

    for (var i = old.length -1; i >= 0 ; i--) {
    	tmpid.push(old[i].info.tmpid);
    }
    console.log('->',tmpid);
    console.log('->',newDeal.info.tmpid);
    if(tmpid.includes(newDeal.info.tmpid)){
    	return true;
    }else{
    	return false;
    }
}

//pirmais

// ko dariit ja tiek pievienoti vairāaki vienaadi deali?
// 1. atlasiit dealus
// unikalais id = parejie id un timestamp starpiba nav lielaka par 5 min


// otrais

// panemt no faila
// parbaudiit timestamp dealam
// izpildiit no deala pirmo soli, kam status ir ka japilda
// iet talak uz nakosho dalu
// parbaudiit timestamp dealam
// izpildiit no deala pirmo soli, kam status ir ka japilda
// katraa briidii veikt izmaiņas ar dealu un soliem, kad deali beigušies sgalabaat ar attiiciigajiem pievienotajiem datiem



// atkal panemt no faila visus dealus

// iet cauri katra deala soliem un cekot statusu, ja stats izpildiits iet talaak par soli, ja ne izlaist un atzimeet ka izlaists
// iziet cauri visiem


// utt...



// place order
// save order number pie deala
// get order status
// update deal
// save deal












// (function repeat(number) {
//     fillWebsitePlaceFiller(number);
//     if (number < 7) repeat(number + 1);
// })(1);










		// function print(deals){
		// var d = new Date();
		// var laiks = ""+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+"";
		// 	deals.forEach(function(item){
  //               var save = [];
		// 		if (item.info.profit > 0.99 && item.info.delta != 0) {
		// 			//console.log(laiks,",",item.step1.pair,",",item.step2.pair,",",item.step3.pair,",",item.info.delta); //usdt delta ir dollari
  //                   save.push(item);
		// 		}
  //               console.log(save);							
		// 	});
  //           console.log(4);
		// }



// var cronJob = cron.job('0 * * * * *', function(){

// trades.get(exchange, paris, minProfit, maxProfit, function(res){
//      console.log(res);

//         // res.forEach(function(item){
//         //     var pair = JSON.stringify(item[1][1]);
//         //     var profit = JSON.stringify(item[0][0]);
//         //     var volume = JSON.stringify(item[2][2][2]);
//         //     var string = ""+pair+", "+profit+", "+volume+"";
//         //     console.log(res);
//         // });

// });


//     //console.info('cron completed');
// }); 
// cronJob.start();