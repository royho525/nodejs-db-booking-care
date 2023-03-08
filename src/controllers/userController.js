import userService from "../sevices/userService";

let hanleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter'
        })
    }
    let userData = await userService.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleGetAllUser = async (req, res) =>{
    let id = req.query.id;// all , id
    let users = await userService.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}
let createHandleCreateNewUser = async (req, res) =>{
    let message = await userService.createNewUser(req.body);
    console.log(message);
    return res.status(200).json(message);
}
let handleDeleteUser = async (req, res)=>{
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(req.body.id);
    console.log(message);
    return res.status(200).json(message);
}
let handleEditUser = async (req, res) =>{
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message);
}
module.exports = {
    hanleLogin, handleGetAllUser, createHandleCreateNewUser, handleDeleteUser, handleEditUser, 
}