
// To hanlde the asynchronos errors.

const catchAsyncError = (func) => {
    return function (req, res, next) {
        return Promise.resolve(func(req, res, next)).catch(next)
    }
}
export default catchAsyncError