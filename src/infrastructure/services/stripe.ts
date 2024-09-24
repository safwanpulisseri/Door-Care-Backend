import IStripe from "../../usecase/interface/services/IStripe";
import { IResponse} from "../../usecase/interface/services/Iresponse";
import { Req } from "../types/expressTypes";

import dotenv from "dotenv";
import Stripe from "stripe";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string,{
    apiVersion: "2024-04-10"
});

class StripeService implements IStripe {

  async createPaymentIntent(
    amount: number,
    bookingId: string,
    workerId: string
  ): Promise<IResponse> {
    try {
      // Create a Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, 
        currency: 'usd',
        metadata: {
          bookingId,
          workerId,
        },
      });

      console.log(paymentIntent, "paymentIntent");
      

      // Return the client secret to the frontend
      return {
        success: true,
        status: 200,
        data: paymentIntent.client_secret as string,  // Send client_secret to Flutter app
      };
    } catch (error) {
      console.error("Error creating payment intent:", error);
      return {
        success: false,
        status: 500,
      };
    }
  }

  async paymentSuccess(req:Req){
    const payload = req.body;   
      
    const payloadString = JSON.stringify(payload, null, 2);
    const signature = req.headers["stripe-signature"];

    if (typeof signature !== "string") {
      return false;
    }

    const endpointSecret= "whsec_ZB8SitzH0mFA9ZA9MbnbHgB7j62CDxHp";
    const header = stripe.webhooks.generateTestHeaderString({
      payload:payloadString,
      secret:endpointSecret
    });

    let event
       event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
    if (event.type == "charge.succeeded") {
      return true;
    } else {
      return false;
    }

  }
}

export default StripeService