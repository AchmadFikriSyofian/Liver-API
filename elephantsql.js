const pg = require('pg');

const conString = "postgres://xngbaqnj:kJj9JRUNN2QPakSwclHMc-DxFW5sx9dZ@rain.db.elephantsql.com/xngbaqnj";
const client = new pg.Client(conString);
client.connect(function(err){
    if(err){
        return console.log('could not connect to postgres', err);
    }
    client.query('SELECT NOW() AS "theTime"', function(err, result) {
        if(err){
            return console.log('error running query', err);
        }
        console.log(result.rows[0].theTime);
        client.end();
    });
});