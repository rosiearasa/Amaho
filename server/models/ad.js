import { model, Schema, ObjectId } from "mongoose";

//ad model
const schema = new Schema({
    photos: [{}],
    price: { type: Number, maxLength: 255 },
    address: {
        type: String,
        maxLength: 255,
        required: true,
    },
    bedrooms: Number,
    bathrooms: Number,
    carpark: Number,
    apartmentsize: String,
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [30.104429,1.970579],

        },
    },
    title: {
        type: String,
        maxLength: 255
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true
    },
    description: {},
    postedBy: { type: ObjectId, ref: "User" },

    rented: { type: Boolean, default: false },
    googleMap: {},
    type: {
        type: String,
        default: "Other",
    },
    action:{
    type: String,
    default: "Rent",
},

    views: {
    type: Number,
    default: 0
},

},
{ timestamps: true }
);


export default model("Ad", schema);
