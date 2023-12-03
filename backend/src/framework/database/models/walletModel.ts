import {Schema, model} from "mongoose";

const walletSchema = new Schema(
    {
        userId: {
            type: String,
            require: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        transactions: {
            type: Array,
        }
    }
)

const WALLET = model("Wallet", walletSchema, "wallet");

export default WALLET;