import { aj } from "../config/arcjet.js";
import { getAuth } from "@clerk/express"; // or @clerk/clerk-sdk-node if using that

export const arcjetMiddleware = async (req, res, next) => {
  try {
    // ✅ Bypass Arcjet if user is authenticated via Clerk
    const { userId } = getAuth(req);
    if (userId) {
      return next();
    }

    // Otherwise, run Arcjet protection
    const decision = await aj.protect(req, {
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too Many Requests",
          message: "Rate limit exceeded. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Bot access denied",
          message: "Automated requests are not allowed.",
        });
      } else {
        return res.status(403).json({
          error: "Forbidden",
          message: "Access denied by security policy.",
        });
      }
    }

    if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({
        error: "Spoofed bot detected",
        message: "Malicious bot activity detected.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(); // Let the request through if Arcjet fails
  }
};
