
const getToken = (res, statusCode, user, message) => {
    const token = user.getWebToken();
    const time = process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    const options = {
        expires: new Date(
            Date.now() + time
        ),
        httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        message,
        user,
    });
};
export default getToken;