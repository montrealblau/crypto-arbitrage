var files = require('./FilesPromise.js');
var trade = require('./ApiWrapper.js');
var settings = require('../settings/settings');
var exchange = settings.exchange;

// TO DO />
// vajag atstat karajoties gaisaa orderus, kas bija neveiksmiigi ielikti, varbūut noapaļošana or smth.... ?
// peec callbacka updateot dealus

exports.do = function(){
    return new Promise(function(resolve, reject) {
        // return new Promise(function(resolve, reject) {
        files.getFile('./JSON/deals.json', ).then(function(res) {
            // toPlaceOrder atgriez visus pirmos solus no dealiem, kuriem status ir 0,2,4
            var toDos = toPlaceOrder(JSON.parse(res));
            if (toDos.length > 0) {
                // izpilda atkartoti katru asinhrono darbiibu ar katru no elementiem no pirmaa parametra Array'a ;)
                // beigas atgriez callbacku, kas iedot visus solus(=== ievaddatus), kurus tikko veiksmigi izpildija,
                // ja neveiksmigi izveidots orders, tad throw error, bet kad sapratisu kados gadijumos ir error, tad varesi te atstat kkadus orderus gaisaa karaajamies
                asyncLoop(toDos, function functionToLoop(loop, i) {
                        var toDo = toDos[i];
                        var pair = toDo.pair;
                        var id = toDo.id;
                        var orderid = toDo.orderid;
                        //var data = toDo;

                        trade.orderStatus(exchange, orderid, pair, toDo, function(res) {
                            console.log('orderStatus res -->',res);
                            if (res.success) {
                                if(res.status == 'open'){
                                    print('orders parbaudits!, bet nav izdariits');
                                    loop();
                                }else if(res.status == 'closed'){
                                    print('orders ir izdariits');
                                    //console.log('orders ir izdariits');
                                    //console.log(toDo);
                                    loop(toDo);
                                }else{
                                reject('orderi sanava parbaudiit, bet status nebija ne open, ne closed ?');
                                throw new Error('neizdevas veikt orderi');
                                }

                                // atgriests, ka izpildiits un var iet taalaak,
                                // mosh pielikt sanemto amount ?

                                // { success: true/false,
                                //   status: 'open/closed',
                                //   amount: null,
                                //   response: '{....}'}
                               
                                 //atgriezam rekursiivajai funkcijai datus, par to, kurs solis tika izdariits veiksmiigi, lai pectam callbackaa vini visi paraadiitos

                            }else{
                                reject('nesanaca parbaudiit ordera statusu, laikam nepareizs ordera nr vai pair');
                                throw new Error('neizdevas veikt orderi');
                            }
                        });

                    },
                    // CALLBACKS PEEC ATTIECIIGAA STEPA ORDERU IZDARISHANAS, JA DELAM IR STATUS 0 2 4 UN 1 2 3 STEPAM STATUS == 0 
                    function callback(a) {

                        var updatedDeals = JSON.stringify(updateStatus(JSON.parse(res), a));
                        files.postFile('./JSON/deals.json', updatedDeals).then(function(res) {
                            resolve(true);
                        }, function(err) {
                            print('nesanaca updateot dealu failu, callbacks asinhronajam dealu veiceejam!', err);
                        });
                    });
            } else {
                print('nav dealu ar stausu 0 2 4, tapec izlaista darbiba');
                resolve(false);
            }

        }, function(err) {
            reject(err);
        });
    });
}

function toPlaceOrder(deals) {
    var result = [];
    deals.forEach(function(item, index) {

        var toDo = {
            id: null,
            step: null,
            pair: null,
            orderid: null
        };

        if (item.info.status === 1) {
            toDo.id = item.info.tmpid;
            toDo.step = "step1";
            toDo.pair = item.step1.pair;
            toDo.orderid = item.step1.id;
            result.push(toDo);
        } else if (item.info.status === 3) {
            toDo.id = item.info.tmpid;
            toDo.step = "step2";
            toDo.pair = item.step2.pair;
            toDo.orderid = item.step2.id;

            result.push(toDo);
        } else if (item.info.status === 5) {
            toDo.id = item.info.tmpid;
            toDo.step = "step3";
            toDo.pair = item.step3.pair;
            toDo.orderid = item.step3.id;
            result.push(toDo);
        }
    })
    return result;
}

function updateStatus(res, done) {
    res.forEach(function(responseitem) {
        done.forEach(function(doneitem) {
            if (doneitem.id === responseitem.info.tmpid) {
                var step = doneitem.step;
                responseitem[step].status = 2;
                responseitem.info.status = responseitem.step1.status + responseitem.step2.status + responseitem.step3.status;
            }
        });
    });
    return res;
}

function print(msg){
    //console.log(msg);
}

function asyncLoop(arr, functionToLoop, callback) {
    var i = -1;
    var done = [];

    function loop(z) {
        if (z != undefined) {
            done.push(z);
        }

        i++;
        if (i == arr.length) {
            print('done --->', done);
            callback(done);
            return;
        }
        functionToLoop(loop, i);
    }
    loop();
}
function print(msg){
    //console.log(msg);
}