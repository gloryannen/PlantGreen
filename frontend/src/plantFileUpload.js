document.addEventListener("DOMContentLoaded", function (event) {
  console.log("LOADED plantFileUpload");

  let imageUpload = document.getElementById("fileUpload");
  console.log("IMAGE UPDLOAD ->", imageUpload);

  imageUpload.onChange = function () {
    console.log("CHANGED ->", this.files.length);
  };
});
