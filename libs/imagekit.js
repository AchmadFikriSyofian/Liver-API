const Imagekit = require('imagekit');
const {IMAGEKIT_URL_ENDPOINT, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY} = process.env;

module.exports = new Imagekit({
    publicKey: "public_zxVyhwhgp5/sRFNzWwqYPHw/C/M=",
    privateKey: "private_Fe+KLll7Jf1Zw4nkKXlBVDtCp6E=",
    urlEndpoint: "https://ik.imagekit.io/livercourse"
});