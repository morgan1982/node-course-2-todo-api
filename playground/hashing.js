const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

let obj = {
    id: 10
}

let token2 = jwt.sign(obj, '123abc');
console.log(token2);

let decoded = jwt.verify(token2, '123abc');
console.log(decoded);


let message = "ti kanei ekei re skyle?"
let hash = SHA256(message).toString();

console.log(hash);

// TOKENS

let data = {
    id: 4
};

let token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
    console.log('data wasn\'t changed')
} else {
    console.log('data was changed untrusted');
}