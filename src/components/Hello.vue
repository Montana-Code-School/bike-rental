<template>
  <div class="hero">
    <div>
    </br></br></br>
      <h1 class="display-3">Hello <b><strong>Zootown Bike Share</strong></b> World</h1>
      <p class="lead">Making Bikes Feel Loved, Needed and Wanted....Everyday!</p>
      <hr>
      <br>
      <img src="../assets/bikeimage.jpeg" alt="Zootown Bike Share" height="400" width="700">
      <br><br>
      <hr>
      <br>
      <br>
    </div>
  </div>
</template>
<script>
export default {
data: {
  backgroundImageUrl: "../"
},
methods:{
  getUrlMap () {
  var url = "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwjrxtX1yNzcAhXqqlkKHc9SAfYQjRx6BAgBEAU&url=http%3A%2F%2Fwww.safebee.com%2Ftech%2F5-gadgets-make-biking-safer&psig=AOvVaw2RarIrdpy7DokAREHFi3FC&ust=1533787232078042"
  return { 'background-image': 'url("' + url + '")' }
  }
}
}
</script>
<style>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>
