//mysqlConfig.js
var mysql = require('mysql');
var config = require('./defaultConfig');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.log("数据库中连接错误",err)
                    reject(err)
                } else {
                    console.log("数据库连接成功")
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            console.log("数据库访问错误------",err)
                            reject(err)
                        } else {
                            console.log("数据库访问成功")
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
   findUserData: function () {
        let _sql = `select * from articles`
        return allServices.query(_sql)
    },
    addUserData: (obj) => {
        console.log('数据库中',obj)
         let _sql = "insert into articles set type=?,title=?,context=?,createtime=?;"
         return allServices.query(_sql, obj)
     },
     deleteData:(obj) => {
         console.log("删除数据库",obj)
         let _sql = "delete from articles where title = ?"
         return allServices.query(_sql,obj)
     },
     updateDate:(obj)=>{
        console.log("更新数据库中的内容",obj)
        let _sql = "update articles set type=?, title=?,context=?,createtime=? WHERE id=?"
        return allServices.query(_sql,obj)
     }
}

module.exports = allServices;