const range = document.getElementById("range");

range.addEventListener("input", () => {
  document.body.style.setProperty("--pos", range.value + "%");
});
