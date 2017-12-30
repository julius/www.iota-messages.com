/**
 * Loads Transactions from random full nodes.
 * Retries automatically if node is not responding, using another random node.
 * 
 * Dependencies:
 *  - iota.lib.js
 */
(function () {

    var iotaLoader = window.iotaLoader = {
        HOSTS: [
            "http://5.9.137.199:14265",
            "http://eugene.iota.community:14265",
            "http://eugene.iotasupport.com:14999",
            "http://node01.iotatoken.nl:14265",
            "http://node02.iotatoken.nl:14265",
            "http://node.deviceproof.org:14265",
            "http://5.9.149.169:14265",
            "http://wallets.iotamexico.com:80",
        ],
        // HOSTS: [
        //     "https://testnet140.tangle.works",
        // ],

        LOADING_TIMEOUT: 5, //seconds

        findTransactionObjects: function (searchValues, cb) {
            var host = iotaLoader.HOSTS[Math.floor(Math.random() * iotaLoader.HOSTS.length)];
            var iota = new IOTA({'provider': host});
            var hasLoaded = false;

            console.log("[IOTA-LOADER] Loading from node", host, searchValues)
            iota.api.findTransactionObjects(searchValues, (err, txs) => {
                if (err) {
                    console.error(err);
                    return;
                }
                hasLoaded = true;
                cb(txs)
            });

            setTimeout(function () {
                if (!hasLoaded) {
                    iotaLoader.findTransactionObjects(searchValues, cb);
                    cb = function () { /* do nothing */ };
                }
            }, iotaLoader.LOADING_TIMEOUT*1000)
        },

        getTransactionsObjects: function (searchValues, cb) {
            var host = iotaLoader.HOSTS[Math.floor(Math.random() * iotaLoader.HOSTS.length)];
            var iota = new IOTA({'provider': host});
            var hasLoaded = false;

            console.log("[IOTA-LOADER] Loading from node", host, searchValues)
            iota.api.getTransactionsObjects(searchValues, (err, txs) => {
                hasLoaded = true;
                if (err) {
                    console.error("ERR", err);
                    cb(err, null);
                    return;
                }
                cb(null, txs)
            });

            setTimeout(function () {
                if (!hasLoaded) {
                    iotaLoader.getTransactionsObjects(searchValues, cb);
                    cb = function () { /* do nothing */ };
                }
            }, iotaLoader.LOADING_TIMEOUT*1000)
        }
    }

})()