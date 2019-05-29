var http = require('http');
var initApi = require('./initiative_jiraquery_api');
var socket_server = 0;

// http://bcho.tistory.com/899 
function socket_communication()
{
    if(socket_server == 0)
    {
        console.log("Initialize socket communication");
        socket_server = http.createServer((req, res) => { }).listen(6555);
        // upgrade http server to socket.io server
        var socketcommm = require('socket.io').listen(socket_server);

        socketcommm.sockets.on('connection', function (socket) {
        socket.on('clientcmd', function (data) {
            var cmd = data.msg;
            if ("fromclient" == cmd) {
                socket.emit('toclient', { msg: '[fromclient] New Contribution... Insert row First !!' });
                console.log('toclient :' + data.msg);
            }
            else if ("initiative_lists" == cmd) {
                socket.emit('toclient', { msg: '[initiative_lists] New Contribution... Insert row Last !!' });
                console.log('toclient :' + data.msg);

                // Use Promise Object
                initApi.get_InitiativeListfromJira("filterID", 46093, false).then(function (data)
                {
                    console.log("Initiative List gathering ok - Promise");
                    console.log(data);
                    socket.emit('initiative_lists', data);
                }).catch(function (err)
                {
                    console.log("Initiative List gathering NG - Promise");
                    console.log(err);
                    res.send('Initiative List gathering NG - Promise');
                });
            }
            else {
            }
            console.log('Message from client :' + data.msg);
           });

           socket.on('initiative_lists', function (data) {
            var cmd = data.msg;
            if ("all" == cmd) {
                // Use Promise Object
                initApi.get_InitiativeListfromJira("filterID", 46093, false).then(function (data)
                {
                    console.log("******Initiative List gathering ok - Promise*******");
                    console.log(JSON.stringify(data));
                    console.log("******Send Initiative List to client*******");
                    socket.emit('initiative_lists', data);
                }).catch(function (err)
                {
                    console.log("Initiative List gathering NG - Promise");
                    console.log(err);
                });
            }
            else {
            }
            console.log('Message from client :' + data.msg);
           });
        });
    }
    else{
        console.log("Already opened socket communication - Skip Initializing socket communication");
    }
}

module.exports = { socket_communication, };
