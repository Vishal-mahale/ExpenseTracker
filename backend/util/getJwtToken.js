
const getToken = (res, statusCode, user, message) => {
    const token = user.getWebToken();
    const time = process.env.COOKIE_EXPIRES
    const days = parseInt(process.env.COOKIE_EXPIRES);
    const expiresMs = days * 24 * 60 * 60 * 1000;

    const options = {
        expires: new Date(Date.now() + expiresMs),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user,
    });
};
export default getToken;

// httpOnly: true: This is a critical security feature.
// It prevents client-side JavaScript (like document.cookie) from accessing the cookie.
// Why it matters: It protects the user from XSS (Cross-Site Scripting) attacks. Even if a hacker manages to run a malicious script on your site, they cannot "steal" the session token because the browser hides it from JavaScript.