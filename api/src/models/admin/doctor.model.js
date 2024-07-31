const db = require('../../config/db.config');
const { createNewDoctor: createNewDoctorQuery, updateDoctor:updateDoctorQuery,countDoctor:countDoctorQuery, getAllDoctor: getAllDoctorQuery, getAllDoctorpaginate: getAllDoctorpaginateQuery, getDoctor: getDoctorQuery, deleteDoctor: deleteDoctorQuery, findUserByEmail: findUserByEmailQuery } = require('../../database/queries');
const { logger } = require('../../utils/logger');

class Doctor {
    constructor(full_name, email, password,code,specialist,mobile,location,user_role,created_by) {
        this.full_name      = full_name;
        this.email          = email;
        this.password       = password;
        this.code           = code;
        this.specialist     = specialist;
        this.mobile         = mobile;
        this.location       = location;
        this.user_role      = user_role;
        this.created_by      = created_by;
    }
    // this fun is for to create doctor 
    static async create(newUser, cb) {
        await db.query(createNewDoctorQuery, 
            [
                newUser.full_name, 
                newUser.email, 
                newUser.password,
                newUser.code,
                newUser.specialist,
                newUser.mobile,
                newUser.location,
                newUser.user_role,
                newUser.created_by
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    full_name: newUser.full_name,
                    email: newUser.email
                });
        });
    }
    // this fun is for to update doctor
    static async update(id,userRole,updatedFields, callback) {
        // Build the SQL query dynamically based on provided fields
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updatedFields)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ? AND user_role = ?`;
        //this fun is for to print query
        // const finalQuery = db.format(sql, [...values, userRole,id]);
        // console.log('Executing query:', finalQuery);

        // this fun is for to update doctor data
        await db.query(sql, [...values, id,userRole], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows);
        });
    }
    // this fun is for to update doctor
    static async list(req,callback) {
        const page = parseInt(req.query.page, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 0;
        const start_limit = (page - 1) * limit;
        // this fun is for to get all doctor list
        if(page == 0 && limit == 0){
            await db.query(countDoctorQuery,[2], (countErr, countResult) => {
                if(countErr){
                    logger.error(countErr.message);
                    callback(countErr, null);
                    return;
                }
                const totalCount = countResult[0].count;
                const totalPages = Math.ceil(totalCount / limit);
                db.query(getAllDoctorQuery,[2,0], (err, results) => {
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
        }else{
            await db.query(countDoctorQuery,[2], (countErr, countResult) => {
                if(countErr){
                    logger.error(countErr.message);
                    callback(countErr, null);
                    return;
                }
                const totalCount = countResult[0].count;
                const totalPages = Math.ceil(totalCount / limit);
                db.query(getAllDoctorpaginateQuery,[2,0,limit,start_limit], (err, results) => {
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
    }
    // this fun is for to update doctor
    static getById(id,callback) {
        //this fun is for to print query
        // const finalQuery = db.format(getDoctorQuery,[2]);
        // console.log('Executing query:', finalQuery);
        // return;
        db.query(getDoctorQuery,[id], (err, results) => {
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

    // this fun is for to update doctor
    static delete(id,status,callback) {
        // this fun is for to delete doctor data
        db.query(deleteDoctorQuery,[status,id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows);
        });
    }

    // this fun is for to find user by email
    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }else if (res.length) {
                cb(null, res[0]);
                return;
            }else 
            cb(null, null);
        })
    }
}

module.exports = Doctor;