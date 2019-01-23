<template>
  <div>
    <div class="text-center">
      <div class="container">
        <div class="row">
          <div
            class="col-12 col-md-6 col-lg-3 d-flex p-2"
            v-for="phone in phones"
            :key="phone.mobileId"
          >
            <div class="card flex-fill shadow-sm">
              <div class="view overlay">
                <img class="img-thumbnail" v-bind:src="phone.mobileImageUrl">
              </div>
              <div class="card-body">{{phone.mobileName}}</div>

              <div class="card-footer text-muted">
                <span class="float-left mt-1">
                  <span>{{phone.mobilePrice}}</span>
                </span>
                <span class="float-right">
                  <a class="btn btn-info btn-sm text-white" v-on:click="sendPhone(phone)">
                    <span>
                      <i class="lnr lnr-cart"></i>
                    </span>Select Phone
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import mostlyWishedComp from "./mostlyWished.vue";

export default {
  data() {
    return {
      msg: "All Phones",
      phones: []
    };
  },
  mounted: function() {
    fetch("http://localhost:3000/allPhones")
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson.result);
        return myJson.result;
      })
      .then(allMob => {
        // this.setState({ mobilePhones: mostlyWished });
        this.phones = allMob;
        console.log(this.phones);
      });
    console.log(this.$store.getters.isLogged);
      this.$store.commit("change", false);
    console.log(this.$store.getters.isLogged);

  },
  methods: {
    sendPhone: function(phone) {

      // console.log(this.$store.getters.flavor);

      console.log(phone.mobileId);
      const mobId = phone.mobileId;
      this.$router.push("/detailPhone/" + mobId);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: 200px !important;
  border: none;
}
.img-thumbnail {
  border: none;
}

.card {
  transition: all 0.2s;
  /* color: white; */
}

.card:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.card-body {
  color: #2572c8;
}
</style>
