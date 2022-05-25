'use strict'
const oracledb = require('oracledb');
const oracleDBRealease = function(conn){
	conn.release(function(err){
		if(err)
			console.error(err.message);
	});
};

function deletet(sql, bindParams, options){
	oracledb.getConnection({
		user: 'system',
		password: '123',
		connectString: '(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))'
	})
	.then(function(connection){
		connection.execute(sql, bindParams, options)
		.then(function(results){
			resolve(results);
			process.nextTick(function(){
				oracleDBRealease(connection);
			});
		})
		.catch(function(err){
			reject(err);
			process.nextTick(function(){
				oracleDBRealease(connection);
			});
		});
	})
	.catch(function(err){
		reject(err);
	});
}

function queryArray(sql, bindParams, options){
	options.isAutoCommit = true;
	return new Promise(function(resolve, reject){
		oracledb.getConnection({
			user: 'system',
			password: '123',
			connectString: '(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))'
		})
		.then(function(connection){
			connection.execute(sql, bindParams, options)
			.then(function(results){
				resolve(results);
				process.nextTick(function(){
					oracleDBRealease(connection);
				});
			})
			.catch(function(err){
				reject(err);
				process.nextTick(function(){
					oracleDBRealease(connection);
				});
			});
		})
		.catch(function(err){
			reject(err);
		});
	});
}

function queryObject(sql, bindParams, options){
	options['outFormat'] = oracledb.OBJECT;
	return queryArray(sql, bindParams, options);
}

var cns = {
	user: 'system',
	password: '123',
	connectString: '(DESCRIPTION =(LOAD_BALANCE = ON)(FAILOVER = ON)(ADDRESS =(PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=XE)(FAILOVER_MODE=(TYPE=SELECT)(METHOD = BASIC))))'
	};

function error1(err, res, cn){
	if(err){
		console.log(err.message);
		res.contentType('application/json').status(500);
		res.send(err.message);
		if(cn != null)
			oracleDBRealease(cn);
		return -1
	}
	return 0;
}

function insert(sql, binds, dml, rs){
	//console.log('sql', sql);
	oracledb.getConnection(cns, function(err, cn){
		if(error1(err,rs,null) == -1) return;
		cn.execute(sql,binds,{autoCommit: dml}, function(err, result){
			if(error1(err, rs, cn) == -1) return;
			rs.contentType('application/json').status(200);
			if(dml){
				rs.send(JSON.stringify(result.rowsAffected));
			}else{
				console.log(result.metaData);
				rs.send(JSON.stringify(result.rows));
			}
			oracleDBRealease(cn);
		});
	})
}


module.exports = queryArray;
module.exports.queryArray = queryArray;
module.exports.queryObject = queryObject;
module.exports.insert = insert;
module.exports.deletet = deletet;