import axios from "axios";
import { Response } from "express";
import otpLogModel from "../models/otpLogModel";

// bulsms bd -> http://login.bulksmsbd.com/apidocs.php
const sendOTPResponse = async (
  number: string,
  statusCode: number,
  res: Response
) => {
  try {
    function generatedOtp() {
      const minm = 10000;
      const maxm = 99999;
      return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    }
    const otp = generatedOtp();
    console.log(otp);
    // insert otp details into db
    // get expire time after 5 minutes
    const expireTime = new Date(Date.now() + 5 * 60 * 1000);
    console.log(+number, otp, expireTime);
    const data = {
      phone: +number,
      code: otp,
      otp_expire_at: expireTime,
    };
    const doc = await otpLogModel.create(data);
    if (!doc) {
      res.status(500).json({
        message: "Something is rong, Please try again",
      });
    }
    console.log("running");

    // const { redisClient } = global as any;

    // (redisClient as RedisClient).setex(
    //   number,
    //   +process.env.OTP_EXPIRE,
    //   `${generatedOtp}`
    // );

    const otpProviderUrl = `${process.env.OTP_URL}?username=${
      process.env.OTP_USERNAME
    }&password=${
      process.env.OTP_PASSWORD
    }&number=${number}&message=${process.env.OTP_USERNAME.toUpperCase()} OTP Code is ${otp}`;

    const otpResponse = await axios.post(
      otpProviderUrl,
      {},
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (otpResponse) {
      res.status(statusCode).json({
        msg: "OTP sent successfully",
      });
    }
  } catch (error: any) {
    res.status(error.statusCode || 500).json({
      errors: {
        common: {
          msg: error.message || "Server error occured",
        },
      },
    });
  }
};

export default sendOTPResponse;
