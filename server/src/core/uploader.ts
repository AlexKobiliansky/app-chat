const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'do1zs5utw',
    api_key: '987898297736552',
    api_secret: 'xYLoS-A4UCRn1XbfrxJ_GKYSiqE',
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'app-chat',
        allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{width: 500, height: 500, crop: 'limit'}]
    }

})

const uploader = multer({storage});

export default uploader;