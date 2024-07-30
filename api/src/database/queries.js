const { DB_NAME } = require('../utils/secrets')

const createDB = `CREATE DATABASE IF NOT EXISTS ${DB_NAME}`;

const dropDB = `DROP DATABASE IF EXISTS ${DB_NAME}`;

const createTableUSers = `
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(50) NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    code int(20) NOT NULL,
    specialist VARCHAR(255) NOT NULL,
    mobile varchar(20) DEFAULT NULL,
    location VARCHAR(255) NOT NULL,
    user_role VARCHAR(255) NOT NULL,
    created_by VARCHAR(255) NOT NULL,
    status tinyint(1) NOT NULL DEFAULT '0' COMMENT '0=Inactive, 1=Active',
    created_at TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at TIMESTAMP(6) NOT NULL DEFAULT DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP
)
`;

const createNewUser = `
INSERT INTO users VALUES(null, ?, ?, ?, ?, NOW())
`;

const createNewDoctor = `
INSERT INTO users (full_name, email, password, code, specialist, mobile, location, user_role, created_by) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;
const updateDoctor = `
INSERT INTO users (full_name, email, password, code, specialist, mobile, location, user_role) VALUES( ?, ?, ?, ?, ?, ?, ?, ?)
`;
const getAllDoctor = `
SELECT * FROM users WHERE user_role = ? AND is_deleted = ?
`;
const getDoctor = `
SELECT * FROM users WHERE user_id = ?
`;
const deleteDoctor = `
UPDATE users SET is_deleted = ? WHERE user_id = ?
`;
const findUserByEmail = `
SELECT * FROM users WHERE email = ?
`;

module.exports = {
    createDB,
    dropDB,
    createTableUSers,
    createNewUser,
    findUserByEmail,
    createNewDoctor,
    updateDoctor,
    getAllDoctor,
    getDoctor,
    deleteDoctor,
};
