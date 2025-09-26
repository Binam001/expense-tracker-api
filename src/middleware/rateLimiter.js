import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    //in production, we need to use userId/IP Address inside limit()
    const { success } = await ratelimit.limit("my-rate-limit")

    if(!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later."
      })
    }
    
    next(); // Continue to the next middleware/route handler
  } catch (error) {
    console.log("Rate limit error", error);
    next(error)
  }
}

export default ratelimiter;
