module.exports = ctx => ({
    map: ctx.options.map,
    plugins: [require("precss")]
});
