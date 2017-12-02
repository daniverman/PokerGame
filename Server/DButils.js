/**
 * Created by daniel on 02/12/2017.
 */
let express = require('express');
let Connection = require('tedious').Connection;
let Request = require('tedious').Request;

//connect to the database
//-------------------------------------------------------------------------------------------------------------------
let config = {
    userName: 'daniel',
    password: 'd1991L27',
    server: 'danielpokerdb.database.windows.net',
    requestTimeout: 15000,
    options: {encrypt: true, database: 'db_poker'}
};


let connection;

exports.Select = function (query) {
    return new Promise(function (resolve, reject) {
        connection = new Connection(config);
        let ans = [];
        let properties = [];
        connection.on('connect', function (err) {
            if (err) {
                console.error('error connecting: ' + err.message);
                reject(err.message);
            }
            console.log('connection on');
            let dbReq = new Request(query, function (err, rowCount) {
                if (err) {
                    console.log(err);
                    reject(err.message);
                }
            });

            dbReq.on('columnMetadata', function (columns) {
                columns.forEach(function (column) {
                    if (column.colName != null)
                        properties.push(column.colName);
                });
            });
            dbReq.on('row', function (row) {
                let item = {};
                for (i = 0; i < row.length; i++) {
                    item[properties[i]] = row[i].value;
                }
                ans.push(item);
            });

            dbReq.on('requestCompleted', function () {
                console.log('request Completed: ' + dbReq.rowCount + ' row(s) returned');
                console.log(ans);
                connection.close();
                resolve(ans);


            });
            connection.execSql(dbReq);
        });
    });
};

exports.Insert = function insert(query) {
    connection = new Connection(config);
    connection.on('connect', function (err) {
        if (err) {
            console.log(err);
        } else {
            let request = new Request(query, function (err, rowCount, rows) {
                console.log(request);


            });
            connection.execSql(request);

        }
    });


}
