exports.getDate = function () {
    const date = new Date();
    options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    return date.toLocaleDateString("en-us", options);
}
