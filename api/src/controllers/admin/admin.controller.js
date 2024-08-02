const User = require('../../models/admin/admin.model');
const { hash: hashPassword, compare: comparePassword } = require('../../utils/password');
const { generate: generateToken } = require('../../utils/token');

// this fun is for to login admin
exports.signin = async (req, res) => {
    const { email, password } = req.body;
    await User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.user_id);
                res
                .status(200)
                .cookie('token', token, {
                  maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
                  sameSite: 'Lax',
                  httpOnly: true,
                  secure: false,
                  domain: req.hostname,
                  path: '/',
                  Partitioned: true,
                })
                .json({
                  success: true,
                  result: token,
                  message: 'Successfully login user',
                }); 
                 
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    });

}
// this fun is for to change admin password
exports.changePassword = async (req,res)=>{
    const { old_password, new_password } = req.body;
    await User.getUserDetail(req.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(old_password.trim(), data.password)) {
                const hashedPassword = hashPassword(new_password.trim());
                User.updatePassword(req.userId,hashedPassword,(err,response)=>{
                    if (err) {
                        res.status(500).send({
                            'status': "error",
                            'message': err.message
                        });
                    } else {
                        res.status(200).send({
                            'status': "successFully Updated",
                            'data': response,
                        });
                    }
                })
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect old password'
            });
        }
    });
}

// this fun is for to admin data
exports.getAdminData = async (req,res)=>{
    try{
        await User.getUserDetail(req.userId, (err, data) => {
            if (err) {
                res.status(500).send({
                    status: 'error',
                    message: err.message
                });
                return;
            }
            res.status(200).send({
                'status': "successFully Updated",
                'data': data,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    }
}

// this fun is for to Update doctor
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name,code,specialist,phone,location } = req.body;
    try {
        //check parameters value 
        const updatedFields = {};
        if (name) updatedFields.full_name = name;
        if (code) updatedFields.code = code.trim();
        if (specialist) updatedFields.specialist = specialist.trim();
        if (phone) updatedFields.mobile = phone.trim();
        if (location) updatedFields.location = location;
        // if (password) updatedFields.password = hashPassword(password.trim());
        // this fun is for to update doctor
        await User.update(id,updatedFields, (err, response) => {
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "successFully Updated",
                    'data': response,
                });
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    } 
}