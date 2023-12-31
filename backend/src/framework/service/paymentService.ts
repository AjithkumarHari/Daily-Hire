import Stripe from "stripe";
import configKeys from "../../config";
import { Worker } from "../../types/Worker";

const stripeClient = new Stripe(configKeys.STRIPE_SECRET_KEY);

export const paymentService = () => {
 
    const createSession = async (paymentDetails: {user: object, worker: Worker, bookingTime: Date}) => {
        try {
            console.log("paymentrService",paymentDetails);
            
            const session = await stripeClient.checkout.sessions.create({
                line_items: [
                    {
                      price_data: {
                        currency: 'inr',
                        product_data: {
                          name: paymentDetails.worker.name,
                        },
                        unit_amount: paymentDetails.worker.wageForDay*100,
                      },
                      quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `${configKeys.ORIGIN_PORT}/workerDetails/${paymentDetails.worker._id}`,
                cancel_url: `${configKeys.ORIGIN_PORT}`,
            })
            console.log(`${configKeys.ORIGIN_PORT}/${paymentDetails.worker._id}`);
            
            return session;
        } catch (error) {
            return error;
        }
    }

    

    return {
        createSession,
    }
}

export type PaymentService = typeof paymentService;