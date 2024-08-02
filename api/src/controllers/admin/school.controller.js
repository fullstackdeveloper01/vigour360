const { response } = require('express');
const School = require('../../models/admin/school.model');
// this fun is for to create School
exports.create = async (req, res) => {
    req.body.doctor_id = JSON.parse(req.body.doctor_id);
    try {
        await School.findByEmail([req.body.email.trim()],(err,data)=>{
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
            } else {
                School.create(req,(err,response)=>{
                    if (err) {
                        res.status(500).send({
                            'status': "error",
                            'message': err.message
                        });
                    } else {
                        res.status(200).send({
                            'status': "success",
                            'data': response,
                        });
                    }
                });
            }
        })
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });   
    }
}
// this fun is for to Update School
exports.update = async (req, res) => {
    req.body.doctor_id = JSON.parse(req.body.doctor_id);
    try {
        if(req.body.email.trim() != ''){
            await School.findByEmail([req.body.email.trim()],(err,data)=>{
                console.log('error',err,'data',data)
                if (err) {
                    res.status(500).send({
                        status: "error",
                        message: err.message
                    });
                }else if(data !='' && data != null){
                    if(data.user_id != req.body.user_id){
                        res.status(500).send({
                            status: "error",
                            message: 'Email Already Exits.',
                        });
                    }
                } 
                School.update(req,(err,response)=>{
                    if (err) {
                        res.status(500).send({
                            'status': "error",
                            'message': err.message
                        });
                    } else {
                        res.status(200).send({
                            'status': "success",
                            'data': response,
                        });
                    }
                });
            });
        }else{
            await School.update(req,(err,response)=>{
                if (err) {
                    res.status(500).send({
                        'status': "error",
                        'message': err.message
                    });
                } else {
                    res.status(200).send({
                        'status': "success",
                        'data': response,
                    });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });   
    }
}
// this fun is for to get all Class list
exports.getAll = async (req, res) => {
    try {
        // this fun is for get all Class list
        await School.list(req,(err,data)=>{
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

// this fun is for to get particular Class data
exports.getById = async (req, res) => {
    const { id } = req.params;
    try {
        await School.getById(id,(err,data)=>{
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

// this fun is for to delete particular Class
exports.delete = async (req, res) => {
    const { id } = req.params;
    try {
        await School.delete(id,(err,data)=>{
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
    