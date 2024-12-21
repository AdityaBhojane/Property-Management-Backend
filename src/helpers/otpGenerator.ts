
// generate number between 1000 to 9999
// ( max-min +1) + min formula for understanding

export default function otpGenerator(){
    const otp = Math.floor((Math.random()*9000)+1000)
    return otp
}

