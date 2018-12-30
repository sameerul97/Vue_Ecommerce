<template>
  <div>
    
    <div class="container">
      <div class="display-4 p-2 text-center"><h1>{{msg}}</h1></div>
      <div class="row">
        <div class="col d-flex" v-for="phone in bestSelling" :key="phone.mobileId" >
          <div class="card flex-fill shadow-sm">
            <div class="view overlay">
              <img class="img-thumbnail" v-bind:src="phone.mobileImageUrl">
            </div>
            <div class="card-body">{{phone.mobileName}}</div>
            <div class="card-footer text-muted">
              <span class="float-center mt-1">
                <span>{{phone.mobilePrice}}</span>
              </span>
              <span class="float-right">
                <a class="btn btn-sm btn-info text-white" v-on:click="sendPhone(phone)">
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
</template>

<script>
export default {
  data() {
    return {
      msg: "Mostly Wished",
      bestSelling: []
    };
  },
  mounted: function() {
    fetch("http://localhost:3000/bestSelling")
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        return myJson.result;
      })
      .then(mostlyWished => {
        this.bestSelling = mostlyWished;
      });
  }, methods: {
    sendPhone: function(phone) {
      const mobId = phone.mobileId;
      this.$router.push("/detailPhone/" + mobId);
    }
  }
};
</script>
<style>
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

