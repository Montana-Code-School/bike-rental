export default {

    readFile() {
    if (this.files && this.files[0]) {

      var FR= new FileReader();
      FR.addEventListener("load", function(e) {
        document.getElementById("img").src       = e.target.result;
        document.getElementById("b64").innerHTML = e.target.result;
      });
      FR.readAsDataURL( this.files[0] );
    }
  }
}
