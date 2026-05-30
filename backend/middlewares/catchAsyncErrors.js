
// To hanlde the asynchronos errors.

const catchAsyncError = (func) => {
    return function (req, res, next) {
        return Promise.resolve(func(req, res, next)).catch(next)
    }
}
export default catchAsyncError


// The first version (Correct): Returns a function definition. Express stores this function and runs it later when someone visits the URL.

// By returning a new function, you are creating a "wrapper" that waits for Express to pass it the real req, res, and next objects when a request actually hits your server.