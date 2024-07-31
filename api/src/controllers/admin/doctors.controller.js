const Doctor = require('../../models/admin/doctor.model');
const { hash: hashPassword, compare: comparePassword } = require('../../utils/password');
const { generate: generateToken } = require('../../utils/token');

// this fun is for to create doctor
exports.create = async (req, res) => {
    const { name,code,email,specialist,phone,location,password } = req.body;
    const created_by = req.userId;
    try {
        // check email Already register
        await Doctor.findByEmail([email.trim()],(err,data)=>{
            console.log('error',err,'data',data)
            if (err) {
                res.status(500).send({
                    status: "error",
                    message: err.message
                });
            }else if(data !='' && data != null){
                res.status(500).send({
                    status: "error",
                    message: 'Email Already Exits.',
                });
            } else{
                const hashedPassword = hashPassword(password.trim());
                const user_role = 2;
                var doctor = new Doctor(name, email.trim(), hashedPassword,code.trim(),specialist.trim(),phone.trim(),location,user_role,created_by);
                // this fun is for create doctor
                Doctor.create(doctor, (err, response) => {
                    if (err) {
                        res.status(500).send({
                            'status': "error",
                            'message': err.message
                        });
                    } else {
                        const token = generateToken(response.id);
                        res.status(200).send({
                            'status': "success",
                            'data': {
                                token,
                                response
                            }
                        });
                    }
                });
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    } 
}
// this fun is for to Update doctor
exports.update = async (req, res) => {
    const { id } = req.params;
    const { name,code,specialist,phone,location,password } = req.body;
    try {
        //check parameters value 
        const updatedFields = {};
        if (name) updatedFields.full_name = name;
        if (code) updatedFields.code = code.trim();
        if (specialist) updatedFields.specialist = specialist.trim();
        if (phone) updatedFields.mobile = phone.trim();
        if (location) updatedFields.location = location;
        if (password) updatedFields.password = hashPassword(password.trim());
        // this fun is for to update doctor
        await Doctor.update(id,'2',updatedFields, (err, response) => {
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
// this fun is for to get all doctor list
exports.getAll = async (req, res) => {
    try {
        // this fun is for get all doctor list
        await Doctor.list(req,(err,data)=>{
            // await Doctor.list([created_by],[page,limit],(err,data)=>{
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "success",
                    'data': {data},
                });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// this fun is for to get particular doctor data
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        await Doctor.getById(id,(err,data)=>{
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "success",
                    'data': (data != null) ? data : {},
                });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// this fun is for to delete particular doctor
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await Doctor.delete(id,'1',(err,data)=>{
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "success",
                    'data': data,
                });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
    