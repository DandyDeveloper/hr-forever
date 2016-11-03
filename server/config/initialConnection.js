var mysql           = require('mysql');
var dbConfiguration = require('../config/database.js')

var pool            = mysql.createPool(dbConfiguration);

/* The below code will handle the initial mySql connection 
and any errors will be logged in the console.  */

function initializeConnection(dbConfiguration) {
    function addDisconnectHandler(connection) {
        connection.on("error", function (error) {
            if (error instanceof Error) {
                if (error.code === "PROTOCOL_CONNECTION_LOST") {
                    console.error(error.stack);
                    console.log("Lost connection. Reconnecting...");

                    initializeConnection(connection.dbConfiguration);
                } else if (error.fatal) {
                    throw error;
                }
            }
        });
    }

    var connection = mysql.createConnection(dbConfiguration);

    // Add handlers.
    addDisconnectHandler(connection);

    connection.connect();
    return connection;
}
