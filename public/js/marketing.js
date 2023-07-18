
$(function() {

  $(".switch-input").on("change", function() {
    $(".fecha").toggle()
  })
  const newRecord = document.querySelector('.nuevo'),
    offCanvasElement = document.querySelector('#nueva-camp')
  // To open offCanvas, to add new record
  if (newRecord) {
    newRecord.addEventListener('click', function() {
      console.log(newRecord)
      offCanvasEl = new bootstrap.Modal(offCanvasElement);
      offCanvasEl.show();
    });
  }
});