// //const fs = require('fs');
// import fs from "fs"
// const uidGenerator = require('node-unique-id-generator');
//
//
// exports.findById = function (id, cb) {
//     process.nextTick(function () {
//         const idx = id - 1
//         if (records[idx]) {
//             cb(null, records[idx])
//         } else {
//             cb(new Error('User ' + id + ' does not exist'))
//         }
//     })
// }
//
// exports.findByUsername = function (username, cb) {
//     process.nextTick(function () {
//         let i = 0, len = records.length
//         for (; i < len; i++) {
//             const record = records[i]
//             if (record.username === username) {
//                 return cb(null, record)
//             }
//         }
//         return cb(null, null)
//     })
// }
//
// exports.verifyPassword = (user, password) => {
//     // TODO: не хранить пароли в БД
//     return user.password === password
// }
//
// exports.signupUser = (username, password, displayName, email) => {
//     const data = {
//         id: uidGenerator.generateUniqueId(),
//         username: username,
//         // TODO: не хранить пароли в БД
//         password: password,
//         displayName: displayName,
//         email: email
//     }
//     console.log(data)
//     console.log(JSON.stringify(data))
//     fs.writeFile("routes/passport/records.txt", JSON.stringify(data), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//         console.log("The file was saved!");
//     });
//
// }