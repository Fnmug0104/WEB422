// generate-secrets.js
const crypto = require('crypto');

const generateSecret = () => crypto.randomBytes(32).toString('hex');

console.log('NEXTAUTH_SECRET:', generateSecret());
console.log('NEXTAUTH_JWT_SECRET:', generateSecret());