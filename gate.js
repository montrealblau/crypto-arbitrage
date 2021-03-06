var request = require('request');
var crypto = require('crypto');
var querystring = require('querystring');

// add your key and secret
const KEY  = 'key';
const SECRET  = 'secret';

const API_URL = 'https://data.gate.io/';
const PAIRS_URL = 'api2/1/pairs';
const MARKETINFO_URL = 'api2/1/marketinfo';
const MARKETLIST_URL = 'api2/1/marketlist';
const TICKERS_URL = 'api2/1/tickers';
const TICKER_URL = 'api2/1/ticker';
const ORDERBOOKS_URL = 'api2/1/orderBooks';
const ORDERBOOK_URL = 'api2/1/orderBook';
const TRADEHISTORY_URL = 'api2/1/tradeHistory';

const BALANCE_URL = 'api2/1/private/balances';
const DEPOSITADDRESS_URL = 'api2/1/private/depositAddress';
const DEPOSITSWITHDRAWALS_URL = 'api2/1/private/depositsWithdrawals';
const BUY_URL = 'api2/1/private/buy';
const CANCELORDER_URL = 'api2/1/private/cancelOrder';
const CANCELALLORDERS_URL = 'api2/1/private/cancelAllOrders';
const GETORDER_URL = 'api2/1/private/getOrder';
const OPENORDERS_URL = 'api2/1/private/openOrders';
const MYTRADEHISTORY_URL = 'api2/1/private/tradeHistory';
const WITHDRAW_URL = 'api2/1/private/withdraw';



const USER_AGENT = '';

function Request (params,cp){
    request(params, function(error, response, body) {
        if(error) {
            cp(error);
        }else{
            cp(body);
        }
    });
}
function getSign(form) {
    return crypto.createHmac('sha512', SECRET).update(form).digest('hex').toString();
}

var gate = {

    getPairs: function(cp) {
        Request({method: 'GET', url: API_URL + PAIRS_URL, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    getMarketinfo:function(cp) {
        Request({method: 'GET', url: API_URL + MARKETINFO_URL, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    getMarketlist:function (cp) {
        Request({method: 'GET', url: API_URL + MARKETLIST_URL, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    getTickers:function (cp) {
        Request({method: 'GET', url: API_URL + TICKERS_URL, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    getTicker:function (param,cp) {
        Request({method: 'GET', url: API_URL + TICKER_URL + '/'+ param, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    orderBooks:function (cp) {
        Request({method: 'GET', url: API_URL + ORDERBOOKS_URL, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    orderBook:function (param,cp) {
        Request({method: 'GET', url: API_URL + ORDERBOOK_URL+  '/'+ param, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    tradeHistory:function (param,cp) {
         Request({method: 'GET', url: API_URL + TRADEHISTORY_URL+  '/'+ param, headers: { 'User-Agent' : USER_AGENT } },cp);
    },

    getBalances:function (cp) {
        let form = {};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + BALANCE_URL, headers: header, form:form },cp);
    },

    depositAddress:function (currency, cp) {
        let form = {'currency':currency};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        console.log(header);
        console.log(querystring.stringify(form));
        console.log(API_URL + DEPOSITADDRESS_URL);
        Request({method: 'POST', url: API_URL + DEPOSITADDRESS_URL, headers: header, form:form },cp);
    },


    depositsWithdrawals:function (start,end, cp) {
        let form = {'start':start,'end':end};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + DEPOSITSWITHDRAWALS_URL, headers: header, form:form },cp);
    },

    buy:function (currencyPair, rate, amount, cp) {
        let form = {'currencyPair':currencyPair,'rate':rate,'amount':amount};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + BUY_URL, headers: header, form:form },cp);
    },

    sell:function (currencyPair, rate, amount, cp) {
        let form = {'currencyPair':currencyPair,'rate':rate,'amount':amount};
        let header = {};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + BUY_URL, headers: header, form:form },cp);
    },

    cancelOrder:function (orderNumber, currencyPair , cp) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + CANCELORDER_URL, headers: header, form:form },cp);
    },

    cancelAllOrders:function (type, currencyPair , cp) {
        let form = {'currencyPair':currencyPair,'orderNumber':type};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + CANCELALLORDERS_URL, headers: header, form:form },cp);
    },

    getOrder:function (orderNumber, currencyPair , cp) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + GETORDER_URL, headers: header, form:form },cp);
    },

    openOrders:function ( cp) {
        let form = {};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + OPENORDERS_URL, headers: header, form:form },cp);
    },

    myTradeHistory:function (currencyPair, orderNumber, cp) {
        let form = {'currencyPair':currencyPair,'orderNumber':orderNumber};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + MYTRADEHISTORY_URL, headers: header, form:form },cp);
    },

    withdraw:function (currency,amount, address, cp) {
        let form = {'currency':currency,'amount':amount,'address':address};
        let header = {'Content-Type':'application/x-www-form-urlencoded'};
        header.KEY = KEY;
        header.SIGN = getSign(querystring.stringify(form));
        Request({method: 'POST', url: API_URL + WITHDRAW_URL, headers: header, form:form },cp);
    },

};


module.exports = gate;