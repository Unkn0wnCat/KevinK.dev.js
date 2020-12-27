/* eslint-disable no-undef */
let $ = require("jquery");

$(function () {
    $(window).on("scroll", function () {
        performUpdate();
    });

    $(window).on("navigate", function () {
        performUpdate();
    });

    window.setInterval(performUpdate, 500);
});

function performUpdate() {
    if (window.scrollY < 15) {
        $(".topBar").addClass("homeBarTransparent");
    } else {
        $(".topBar").removeClass("homeBarTransparent");
    }
}