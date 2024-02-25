const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel")
const Car = require("../models/carModel")
//const { v4: uuidv4 } = require("uuid");
//const stripe = require('stripe')('sk_test_51OlW0YSGIrVx63avRr0ZKsff7zVxLUAWAXWGd4Fue8dxSty4f7oAYuC0nyPEdexGtf3guv1x7MKUKT6th2E0SUWO00wJqnzJoa')

router.post("/bookcar",async(req,res)=>{
    
  //  const {token} = req.body
    
     req.body.transactionId = '1234'
    try {
        
        // const customer = await stripe.customers.create({
        //     email : token.email,
        //     source : token.id
        // })

        // const payment = await stripe.paymentIntents.create({
        //     amount : req.body.totalAmount * 100,
        //     currency : "inr",
        //     customer : customer.id,
        //     receipt_email : token.email
        // },{
        //     idempotencyKey : uuidv4()
        // })

        // if(payment)
        // {
          //  req.body.transactionId = payment.source.id
            const newbooking = new Booking(req.body)
            await newbooking.save()
            const car = await Car.findOne({_id : req.body.car}) 
            console.log(car)
            if (!car) {
                return res.status(404).send('Car not found');
            }
            car.bookedTimeSlots.push(req.body.bookedTimeSlots)
            await car.save()
            res.send('Your booking is success')
        // }
        // else
        // {
        //     return res.status(400).json(error);
        // }

        
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
});

router.get("/getallbookings",async(req,res)=>{
    try{
        const bookings = await Booking.find().populate('car')
        res.send(bookings)
    }catch (error){
        return res.status(400).json(error);
    }
})

module.exports = router