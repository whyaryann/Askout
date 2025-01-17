$(".no-button").on("mouseover", function () {
  var randTop = Math.random() * 80;
  var randLeft = Math.random() * 80;
  $(".no-button").css("top", randTop + "%");
  $(".no-button").css("left", randLeft + "%");
});
$(".no-button").on("click", function () {
  var randTop = Math.random() * 80;
  var randLeft = Math.random() * 80;
  $(".no-button").css("top", randTop + "%");
  $(".no-button").css("left", randLeft + "%");
});
$(".yes-button").on("click", function () {
  addNewEvent();
});
