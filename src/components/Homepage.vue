<template>
  <div>
    <div class="landingPage">
      <div class="titlePageText text-white text-uppercase position-sticky">
        <p class="display-4">{{msg}}</p>
        <hr>
      </div>
    </div>
    <!-- <div class="container"> -->
      <mostlyWishedComp>/</mostlyWishedComp>
    <!-- </div> -->
  </div>
</template>

<script>
import mostlyWishedComp from "./mostlyWished.vue";

export default {
  name: "Homepage",
  components: {
    mostlyWishedComp: mostlyWishedComp
  },
  data() {
    return {
      msg: "Vue Store",
      bestSelling: []
    };
  },
  mounted: function() {
    // fetch("http://localhost:3000/bestSelling")
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(myJson) {
    //     console.log(myJson.result);
    //     console.log(myJson);
    //     return myJson.result;
    //   })
    //   .then(mostlyWished => {
    //     this.bestSelling = mostlyWished;
    //     console.log(this.bestSelling);
    //     // this.setState({ hits: mostlyWished });
    //   });
  }
//   ,
//   methods: {
//     sendPhone: function(phone) {
//       console.log(phone.mobileId);
//       const mobId = phone.mobileId;
//       this.$router.push("/detailPhone/" + mobId);
//     }
//   }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.landingPage {
  text-align: center;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
    url("https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=966&q=80");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
}
hr {
  border-style: solid none;
  border-width: 2px 0;
  margin: 50px 0;
}

.titlePageTitle {
  font-size: 1rem;
  text-align: center;
  justify-items: center;
  justify-content: center;
  font-weight: 100;
}
</style>
