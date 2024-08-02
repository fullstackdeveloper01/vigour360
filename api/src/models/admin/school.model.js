const db = require('../../config/db.config');
const { findUserByEmail: findUserByEmailQuery, schoolContactSql:schoolContactSqlQuery, deleteDoctor: deleteSchoolCorporateQuery, deleteSchoolSql:deleteSchoolSqlQuery, deleteSchoolContactSql: deleteSchoolContactSqlQuery } = require('../../database/queries');
const { hash: hashPassword } = require('../../utils/password');
const { logger } = require('../../utils/logger');

class School {
    constructor() {
    }
    // this fun is for to create doctor 
    static async create(req, cb) {
        const{type,school_name,school_prefix,email,password,location,doctor_id,contact_persons} = req.body;
        const school_logo = req.files['school_logo'] ? req.files['school_logo'][0] : null;
        const corporate_Logo = req.files['logo'] ? req.files['logo'][0] : null;
        // console.log(req.file);
        // return;
        var userCol = '';
        var userVal = '3,"'+school_name+'","'+email+'","'+hashPassword(password.trim())+'",'+'3340'+',1';
        if(location !=''){
            userCol += ',location';
            userVal +=',"'+location+'"';
        }
        var userSql = 'INSERT INTO users (user_role, full_name, email, password, created_by, status'+userCol+') VALUES('+userVal+')';
        await db.query(userSql,userVal, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if(res){
                var schoolCol = '';
                var schoolVal = '"'+school_prefix+'",'+res.insertId+','+type+'';
                if(school_logo != '' && school_logo != null){
                    schoolCol += ',school_logo';
                    schoolVal += ',/uploads/schools/"'+school_logo.filename+'"';
                }
                if(corporate_Logo != '' && corporate_Logo != null){
                    schoolCol += ',logo';
                    schoolVal += ',/uploads/corporate/logo/"'+corporate_Logo.filename+'"';
                }
                if(doctor_id.length > 0){
                    schoolCol += ',doctors_id';
                    schoolVal += ',"'+doctor_id.join(',')+'"';
                }
                var schoolSql = 'INSERT INTO school (unique_prefix, user_id, type'+schoolCol+') VALUES('+schoolVal+')';
                db.query(schoolSql,(erro,response)=>{
                    if (erro) {
                        logger.error(erro.message);
                        cb(err, null);
                        return;
                    }else if(response){
                        var successCount = 0; 
                        contact_persons.forEach(contact => {
                            db.query(schoolContactSqlQuery,[contact.contact_name,contact.contact_mobile,response.insertId],(error,resp)=>{
                                if(resp){
                                    successCount++;
                                }
                            }) ;
                        });
                        cb(null, response.affectedRows);
                    }
                }) ;
            }
        });
    }
    // this fun is for to update Classes
    static async update(req, callback) {
        const { id } = req.params;
        const{type,school_prefix,school_name,email,password,location,doctor_id,contact_persons,user_id} = req.body;
        const school_logo = req.files['school_logo'] ? req.files['school_logo'][0] : null;
        const corporate_Logo = req.files['logo'] ? req.files['logo'][0] : null;
        // console.log(req.files);
        // return;
        // Build the SQL query dynamically based on provided fields for user table
        const userfields = [];
        const uservalues = [];
        const updatedUserFields = {};
        if (school_name) updatedUserFields.full_name = school_name;
        if (email) updatedUserFields.email = email;
        if (location) updatedUserFields.location = location;
        if (password) updatedUserFields.password = hashPassword(password.trim());
        for (const [key, value] of Object.entries(updatedUserFields)) {
            userfields.push(`${key} = ?`);
            uservalues.push(value);
        }
        const sql = `UPDATE users SET ${userfields.join(', ')} WHERE user_id = ?`;
        await db.query(sql, [...uservalues, user_id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            // Build the SQL query dynamically based on provided fields for school section
            const schoolfields = [];
            const schoolvalues = [];
            const updatedSchoolFields = {};
            if (school_prefix) updatedSchoolFields.unique_prefix = school_prefix;
            if (type) updatedSchoolFields.type = type;
            for (const [key, value] of Object.entries(updatedSchoolFields)) {
                schoolfields.push(`${key} = ?`);
                schoolvalues.push(value);
            }
            if(school_logo != '' && school_logo != null){
                schoolfields.push(`school_logo = ?`);
                schoolvalues.push('/uploads/schools/'+school_logo.filename);
            }
            if(corporate_Logo != '' && corporate_Logo != null){
                schoolfields.push(`logo = ?`);
                schoolvalues.push('/uploads/corporate/logo/'+corporate_Logo.filename);
            }
            if(doctor_id.length > 0){
                schoolfields.push(`doctors_id = ?`);
                schoolvalues.push(doctor_id.join(','));
            }
            var schoolSql = `UPDATE school SET ${schoolfields.join(', ')} WHERE school_id = ?`;
            db.query(schoolSql,[...schoolvalues, id],(erro,response)=>{
                if (erro) {
                    logger.error(erro.message);
                    callback(err, null);
                    return;
                }else if(response){
                    var successCount = 0; 
                    contact_persons.forEach(contact => {
                        if(contact.school_contact_id != '' && contact.school_contact_id != undefined){
                            var schoolContractSql = "UPDATE school_contact SET contact_name = ?, contact_mobile = ? WHERE school_contact_id = ?";
                            db.query(schoolContractSql,[contact.contact_name,contact.contact_mobile,contact.school_contact_id],(error,resp)=>{
                                if(resp){
                                    successCount++;
                                }
                            });
                        }else{
                            db.query(schoolContactSqlQuery,[contact.contact_name,contact.contact_mobile,id],(error,resp)=>{
                                if(resp){
                                    successCount++;
                                }
                            });
                        }
                    });
                    callback(null, response.affectedRows);
                }
            });
        });
        
    }
    // this fun is for to get classes
    static async list(req,callback) {
        const page = parseInt(req.query.page, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 0;
        const start_limit = (page - 1) * limit;
        const school_name = req.query.school_name || '';
        const type = req.query.type || '';
        const school_prefix = req.query.school_prefix || '';
        const email = req.query.email || '';
        const location = req.query.location || '';
        const sort = req.query.sort || '';
        var totalCountSql = "SELECT COUNT(*) AS count FROM school JOIN users ON `school`.`user_id` = `users`.`user_id` WHERE  `school`.`is_deleted` = 0 ";
        // LEFT JOIN (
        //     SELECT *, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY course_id) as row_num
        //     FROM enrollments
        // ) e ON s.id = e.student_id AND e.row_num = 1
        var getDataSql = "SELECT * FROM school JOIN users ON `school`.`user_id` = `users`.`user_id` WHERE  `school`.`is_deleted` = 0 ";
        if(type != ''){
            totalCountSql += 'AND `school`.`type` = "'+type+'" ';
            getDataSql += 'AND `school`.`type` = "'+type+'" ';
        }else{
            totalCountSql += 'AND `school`.`type` = "1" ';
            getDataSql += 'AND `school`.`type` = "1" ';
        }
        
        if(school_name != ''){
            totalCountSql += 'AND `users`.`full_name` LIKE "%'+school_name+'%" ';
            getDataSql += 'AND `users`.`full_name` LIKE "%'+school_name+'%" ';
        }

        if(school_prefix != ''){
            totalCountSql += 'AND `school`.`unique_prefix` LIKE "%'+school_prefix+'%" ';
            getDataSql += 'AND `school`.`unique_prefix` LIKE "%'+school_prefix+'%" ';
        }

        if(email != ''){
            totalCountSql += 'AND `users`.`email` LIKE "%'+email+'%" ';
            getDataSql += 'AND `users`.`email` LIKE "%'+email+'%" ';
        }

        if(location != ''){
            totalCountSql += 'AND `users`.`location` LIKE "%'+location+'%" ';
            getDataSql += 'AND `users`.`location` LIKE "%'+location+'%" ';
        }
        
        if(sort != ''){
            if(sort == 'new'){
                getDataSql += 'ORDER BY `users`.`user_id` DESC ';
            }else if(sort == 'old'){
                getDataSql += 'ORDER BY `users`.`user_id` ASC ';
            }else if(sort == 'a-z'){
                getDataSql += 'ORDER BY `users`.`full_name` ASC ';
            }else if(sort == 'z-a'){
                getDataSql += 'ORDER BY `users`.`full_name` DESC ';
            }
        }else{
            getDataSql += 'ORDER BY `users`.`user_id` ASC ';
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
        const sql = `SELECT * FROM school 
            JOIN users ON school.user_id = users.user_id WHERE school.is_deleted = 0 AND school.school_id = ?`;
        db.query(sql,[id], (err, results) => {
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
    static async delete(id,callback) {
        const getSql = `Select user_id FROM school WHERE school_id = ?`;
        // this fun is for to delete doctor data
        await db.query(getSql,[id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            db.query(deleteSchoolCorporateQuery,[1,results[0].user_id],(schoolcorerr,res)=>{
                if (schoolcorerr) {
                    logger.error(schoolcorerr.message);
                    callback(err, null);
                    return;
                }
                db.query(deleteSchoolSqlQuery,[1,id],(schoolerr,res)=>{
                    if (schoolerr) {
                        logger.error(schoolerr.message);
                        callback(err, null);
                        return;
                    }
                    db.query(deleteSchoolContactSqlQuery,[1,id],(schoolcontacterr,res)=>{
                        if (schoolcontacterr) {
                            logger.error(schoolcontacterr.message);
                            callback(err, null);
                            return;
                        }
                        callback(null, true);
                    });
                })
            });
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

module.exports = School;