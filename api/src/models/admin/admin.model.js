const db = require('../../config/db.config');
const { getDoctor: getAdminDataQuery,  findUserByEmail: findUserByEmailQuery, updateUserPassword:updateUserPasswordQuery } = require('../../database/queries');
const { logger } = require('../../utils/logger');

class Admin {
    constructor(firstname, lastname, email, password) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    static create(newUser, cb) {
        db.query(createNewUserQuery, 
            [
                newUser.firstname, 
                newUser.lastname, 
                newUser.email, 
                newUser.password
            ], (err, res) => {
                if (err) {
                    logger.error(err.message);
                    cb(err, null);
                    return;
                }
                cb(null, {
                    id: res.insertId,
                    firstname: newUser.firstname,
                    lastname: newUser.lastname,
                    email: newUser.email
                });
        });
    }

    static findByEmail(email, cb) {
        db.query(findUserByEmailQuery, email, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }

    static getUserDetail(id, cb) {
        db.query(getAdminDataQuery, id, (err, res) => {
            if (err) {
                logger.error(err.message);
                cb(err, null);
                return;
            }
            if (res.length) {
                cb(null, res[0]);
                return;
            }
            cb({ kind: "not_found" }, null);
        })
    }
    // this fun is for to update password
    static async updatePassword(id,data, callback) {
        // this fun is for to update doctor data
        await db.query(updateUserPasswordQuery, [data, id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows);
        });
    }
    // this fun is for to update doctor
    static async update(id,updatedFields, callback) {
        // Build the SQL query dynamically based on provided fields
        const fields = [];
        const values = [];

        for (const [key, value] of Object.entries(updatedFields)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        const sql = `UPDATE users SET ${fields.join(', ')} WHERE user_id = ? `;
        //this fun is for to print query
        // const finalQuery = db.format(sql, [...values, userRole,id]);
        // console.log('Executing query:', finalQuery);

        // this fun is for to update doctor data
        await db.query(sql, [...values, id], (err, results) => {
            if (err) {
                logger.error(err.message);
                callback(err, null);
                return;
            }
            callback(null, results.affectedRows);
        });
    }
}

module.exports = Admin;