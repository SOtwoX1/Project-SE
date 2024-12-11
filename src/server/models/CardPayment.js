import { Schema, model } from 'mongoose';

const cardpaymentSchema = new Schema({
  userID: String,
  CardID: { type: String, AutoIncrement: true },
  holderName: String,
  cardNumber: String,
  MMYY: Date,
  cvv: String
});

const CardPayment = model('CardPayment', cardpaymentSchema);

export default CardPayment;