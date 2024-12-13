

export default function otpGenerator(){
    // generate number between 1000 to 9999
    // ( max-min +1) + min formula for understanding
    const otp = Math.floor((Math.random()*9000)+1000)
    return otp
}

