import * as config from "../config.js";
import { nanoid } from "nanoid";
import slugify from "slugify";
import Ad from "../models/ad.js";
import User from "../models/user.js";


export const uploadImage = async (req, res) => {
  try {
    console.log(req.body);
    const { image } = req.body;
    const base6Image = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );
    const type = image.split(';')[0].split('/')[1];

    //upload with image params
    const params={
        Bucket: 'amaho-images-bucket',
        Key:`${nanoid()}.${type}`,
        Body: base6Image,
        ACL:"public-read",
        ContentEncoding: "base64",
        ContentType: `image/${type}`,


    };
    config.AWSS3.upload(params, (err, data) =>{
        if (err){
            console.log(err)
            res.sendStatus(400);
        }
        else{
            console.log(data);
            res.send(data);
        }
    })
  } catch (err) {
    // console.log(err);
    res.json({ error: "Upload failed, Try Again." });
  }
};

export const removeImage =(req, res) =>{
    try {
        const {Key, Bucket}  = req.body;
        config.AWSS3.deleteObject({Bucket, Key}, (err, data)=>{
            if (err){
                console.log(err);
                res.sendStatus(400);
            }else{
                res.send({ok: true});
            }
        })

        
    } catch (error) {
        
    }
}

export const create = async(req, res) =>{
    try{
        console.log(req.body);

        const {photos, description , title, address, price, type, apartmentsize}= req.body;

            if (!photos?.length){
                return res.json({error: "Phototes are required"});
            
        }
        if (!price){
            return res.json({error: "Price is required"});
        
    }
    if (!type){
        return res.json({error: "Is house or apartment?"});
    
}
if (!address){
    return res.json({error: "Address is required"});

}
if (!description){
    return res.json({error: "Description is required"});

}
const geo = await config.GOOGLE_GEOCODER.geocode(address);
// console.log("geo=>", geo);
const ad = await new Ad({
    ...req.body,
    postedBy:req.user._id,
    location:{
        type:'Point',
        coordinates: [geo?.[0]?.longitude,geo?.[0]?.latitude ],
    },
    googleMap:geo,
}).save();

//make user role seller
const user = await User.findByIdAndUpdate(req.user._id,{
    $addToSet: {role: "Seller"},
},
{new: true});
user.password = undefined;
user.resetCode = undefined;

res.json({
    ad,
    user,
});




    } catch(err){
        res.json({error: "Something went wrong, Try Again"});
        console.log(err)

    }
}