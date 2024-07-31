const db = require('../../config/db.config');
const { createNewclass: createNewclassQuery, updateDoctor:updateDoctorQuery,countDoctor:countDoctorQuery, getAllDoctor: getAllDoctorQuery, getAllDoctorpaginate: getAllDoctorpaginateQuery, getClasses: getClassesQuery, deleteClasses: deleteclassQuery, findUserByEmail: findUserByEmailQuery } = require('../../database/queries');
const { logger } = require('../../utils/logger');

class Classes {
    constructor(class_name, class_order,created_by) {
        this.class_name      = class_name;
        this.class_order     = class_order;
        this.created_by      = created_by;
    }
    // this fun is for to create doctor 
    static async create(classData, cb) {
        await db.query(createNewclassQuery, 
            [
                classData.class_name, 
                classData.class_order, 
                classData.created_by
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, res);
        });
    }
    // this fun is for to update Classes
    static async update(id,updatedFields, callback) {
        // Build the SQL query dynamically based on provided fields
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updatedFields)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        const sql = `UPDATE class SET ${fields.join(', ')} WHERE id = ? `;
        //this fun is for to print query
        // const finalQuery = db.format(sql, [...values, userRole,id]);
        // console.log('Executing query:', finalQuery);
        // this fun is for to update classes data
        await db.query(sql, [...values, id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results);
        });
    }
    // this fun is for to get classes
    static async list(req,callback) {
        const page = parseInt(req.query.page, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 0;
        const start_limit = (page - 1) * limit;
        const class_name = req.query.className || '';
        const class_order = req.query.order || '';
        var totalCountSql = 'SELECT COUNT(*) AS count FROM class ';
        var getDataSql = 'SELECT * FROM class ';
        // this fun is for to get all classess list
        if(class_name != ''){
            totalCountSql += 'WHERE class_name LIKE "%'+class_name+'%" ';
            getDataSql += 'WHERE class_name LIKE "%'+class_name+'%" ';
        }
        if(class_order != ''){
            if(class_order == 'new'){
                getDataSql += 'ORDER BY id DESC ';
            }else if(class_order == 'old'){
                getDataSql += 'ORDER BY id ASC ';
            }else if(class_order == 'a-z'){
                getDataSql += 'ORDER BY class_name ASC ';
            }else if(class_order == 'z-a'){
                getDataSql += 'ORDER BY class_name DESC ';
            }
        }else{
            getDataSql += 'ORDER BY id ASC ';
        }
        if(page > 0 && limit > 0 ){
            getDataSql += 'LIMIT '+limit+' OFFSET '+start_limit;
        }
        await db.query(totalCountSql, (countErr, countResult) => {
            if(countErr){
                logger.error(countErr.message);
                callback(countErr, null);
                return;
            }
            const totalCount = countResult[0].count;
            const totalPages = Math.ceil(totalCount / limit);
            db.query(getDataSql, (err, results) => {
                if (err) {
                    logger.error(err.message);
                    callback(err, null);
                    return;
                }
                var result = {
                    doctors: results,
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    totalCount: totalCount
                }
                callback(null, result);
            });
        });
    } 
    // this fun is for to get classes detail
    static getById(id,callback) {
        db.query(getClassesQuery,[id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }else if(results.length > 0 ){
                callback(null, results[0]);
            }else{
                callback(null, null);
            }
        });
    }

    // this fun is for to delete classes
    static delete(id,callback) {
        // this fun is for to delete doctor data
        db.query(deleteclassQuery,[id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows);
        });
    }

}

module.exports = Classes;