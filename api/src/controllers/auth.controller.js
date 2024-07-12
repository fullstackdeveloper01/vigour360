const User = require('../models/user.model');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken } = require('../utils/token');

exports.signup = (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = hashPassword(password.trim());

    const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } else {
            const token = generateToken(data.id);
            res.status(201).send({
                status: "success",
                data: {
                    token,
                    data
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
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
                const token = generateToken(data.id);

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
                  result: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
                        _id: data.id,
                        name: data.firstname+' '+data.lastname,
                        surname: data.firstname,
                        role: "admin", 
                        photo: "",
                  },
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