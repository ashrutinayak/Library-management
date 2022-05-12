import multer from 'multer';

const userProfileImageStorage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null,'public/uploads/user_profile_images/');
    },
    filename: (req,file,cb)=>{
        cb(null,`${Date.now()}_${req.params.id}_${file.originalname}`)
    }
});

export const userProfileImageUpload = multer({
    storage:userProfileImageStorage,
    limits:{
        fieldSize: 1024*1024*5
    },
    fileFilter: (req,file,cb)=>{
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
          } 
        else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
          }
    }
})