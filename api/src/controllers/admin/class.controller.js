const Classes = require('../../models/admin/class.model');
// this fun is for to create Classes
exports.create = async (req, res) => {
    const { className , order } = req.body;
    const created_by = req.userId;
    try {
        var ClassData = new Classes(className, order.trim(), created_by);
        // this fun is for create Class
        Classes.create(ClassData, (err, response) => {
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "success",
                    'data': (response.affectedRows > 0)?true:false,
                });
            }
        });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    } 
}
// this fun is for to Update Classes
exports.update = async (req, res) => {
    const { id } = req.params;
    const { className,order} = req.body;
    try {
        //check parameters value 
        const updatedFields = {};
        if (className) updatedFields.class_name = className;
        if (order) updatedFields.class_order = order.trim();
        // this fun is for to update Class
        await Classes.update(id,updatedFields, (err, response) => {
            if (err) {
                res.status(500).send({
                    'status': "error",
                    'message': err.message
                });
            } else {
                res.status(200).send({
                    'status': "successFully Updated",
                    'data': (response.affectedRows > 0)?true:false,
                });
            }
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: error.message });
    } 
}
// this fun is for to get all Class list
exports.getAll = async (req, res) => {
    try {
        // this fun is for get all Class list
        await Classes.list(req,(err,data)=>{
            // await Class.list([created_by],[page,limit],(err,data)=>{
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
        await Classes.getById(id,(err,data)=>{
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
        await Classes.delete(id,(err,data)=>{
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
    