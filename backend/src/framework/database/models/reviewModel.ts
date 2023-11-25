import {Schema, model} from "mongoose";

const reviewSchema = new Schema(
    {
        rating: {
            type: Number,
            require: true,
        },
        reviewTitle: {
            type: String,
            require: true,
        },
        reviewDescription: {
            type: String,
            require: true,
        },
        workerId:{
            type: String,
            require: true
        },
        userName:{
            type: String,
            require: true
        },
        userEmail:{
            type: String,
            require: true
        },
        isHidden: {
            type: Boolean,
            default: false
        }
    }
)

const REVIEW = model("Review", reviewSchema, "review");

export default REVIEW;