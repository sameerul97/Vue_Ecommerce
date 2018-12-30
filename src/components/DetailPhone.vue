<template>
  <div class="detailPageBody bg-light">
    <div class="container bg-white">
      <div class="row p-3">
        <div class="col-md-6 text-left">
          <!-- <div *ngIf="success?.length >0 ;">
            <div class="alert alert-success" role="alert">{{success}}</div>
          </div>-->
          <div class="imagePlaceHolder text-center">
            <img v-bind:src="phone.imageUrl">
          </div>
        </div>
        <div class="col-md-6">
          <p class="font-weight-bold text-left text-uppercase">{{phone.mobileName}}</p>

          <div class="text-left mt-1">
            <p class="font-weight-bold text-left text-uppercase">
              Size :
              <span class="font-weight-light text-capitalize">{{selectedSizeVariant}}</span>
            </p>
            <span
              class="btn btn-outline-primary font-weight-light text-capitalize mr-1"
              v-for="(value, key) in phone.sizeVariant"
              :key="key"
            >{{value}}</span>
          </div>
          <div class="text-left mt-1">
            <p class="font-weight-bold text-left text-uppercase">
              Color :
              <span class="font-weight-light text-capitalize">{{selectedColorVariant}}</span>
            </p>
            <span
              class="btn btn-outline-primary font-weight-light text-capitalize mr-1"
              v-for="(value, key) in phone.colourVariant"
              :key="key"
            >{{value}}</span>
          </div>
          <p class="font-weight-bold text-left text-uppercase">
            Availability :
            <span class="font-weight-light text-capitalize">{{phone.mobileStock}}</span>
          </p>
          <p class="font-weight-bold text-left text-uppercase">
            Price
            <span class="font-weight-light text-capitalize">£{{phone.mobilePrice}}</span>
          </p>
          <div class="text-left">
            <button
              type="button"
              class="btn btn-primary font-weight-bold text-center text-uppercase shadow-lg"
            >
              Add
              to basket
            </button>
            <button
              type="button"
              class="btn btn-primary font-weight-bold text-center text-uppercase shadow-lg"
            >
              Add
              to wish list
            </button>
          </div>
        </div>
      </div>
      <div class="shadow p-3 mb-5 mt-4 bg-light rounded border border-primary">
        <p class="font-weight-light text-capitalize text-center" style="font-size:1.5rem">Top Spec</p>

        <div class="row text-center p-2">
          <div class="col">
            <i class="fas fa-camera fa-2x"></i>
            <p class="text-monospace font-weight-bold text-info">Camera</p>
            <p class="font-weight-light">{{phone.topSpec.camera}}</p>
          </div>
          <div class="col">
            <i class="fas fa-battery-three-quarters fa-2x"></i>
            <p class="text-monospace font-weight-bold text-info">Battery</p>
            <p class="font-weight-light">{{phone.topSpec.battery}}</p>
          </div>
          <div class="col">
            <i v-if="phone.topSpec.os === 'Android'" class="fab fa-android fa-2x"></i>
            <i v-else class="fab fa-apple fa-2x"></i>
            <p class="text-monospace font-weight-bold text-info">OS</p>
            <p class="font-weight-light">{{phone.topSpec.os}}</p>
          </div>
          <div class="col">
            <i class="fas fa-hdd fa-2x"></i>
            <p class="text-monospace font-weight-bold text-info">Storage</p>
            <p class="font-weight-light">{{phone.topSpec.storage}}</p>
          </div>
          <div class="col">
            <i class="fas fa-mobile-alt fa-2x"></i>
            <i class="far fa-mobile-android"></i>
            <p class="text-monospace font-weight-bold text-info">Display</p>
            <p class="font-weight-light">{{phone.topSpec.display}}</p>
          </div>
        </div>
      </div>
      <div class="shadow p-3 mb-5 bg-light rounded border border-info">
        <p class="font-weight-light text-capitalize text-center" style="font-size:1.5rem">Full Spec</p>
        <table class="table table-striped">
          <tbody>
            <tr v-for="(value,index, key) in phone.fullSpec" :key="index">
              <th>{{key}}</th>
              <th scope="row">{{index}}</th>
              <td>{{value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
//   name: "About",
  data() {
    return {
      msg: "Vue Store",
      phone: [],
      selectedSizeVariant: "",
      selectedColorVariant: ""
    };
  },
  mounted: function() {
    // console.log(this.$route.params.mobileId);
    var mobileIdToSearch = this.$route.params.mobileId;
    fetch("http://localhost:3000/getPhone/" + mobileIdToSearch)
      .then(function(response) {
        return response.json();
      })
      // .then(response => response.json())
      .then(function(myJson) {
        return myJson.MobileData;
      })
      .then(details => {
        // this.setState({ mobilePhone: details });
        this.phone = details;
        console.log(this.phone);
        // this.setState({
        //   selectedColorVariant: this.state.mobilePhone.colourVariant["colour1"]
        // });
        // this.setState({
        this.selectedSizeVariant = details.sizeVariant["size1"];
        this.selectedColorVariant = details.colourVariant["colour1"];
        // });
        // if (this.state.mobilePhone.topSpec.os == "Android") {
        //   this.setState({ android: true });
        // } else {
        //   this.setState({ android: false });
        // }
        // var tempColours = details.colourVariant;
        // console.log(tempColours);
        // for (let key in tempColours) {
        //   let value = tempColours[key];
        //   this.setState({ phoneDetails: details });
        //   colorVariant.push(value);
        // }
        // this.setState({ colorVar: colorVariant });
      });
  }
};
</script>
<style>
.imagePlaceHolder > img {
  height: 400px !important;
}
.btn-primary {
  font-family: Raleway-SemiBold;
  font-size: 18px;
  color: rgba(58, 133, 191, 0.75);
  letter-spacing: 1px;
  line-height: 15px;
  border: 2px solid rgba(58, 133, 191, 0.75);
  border-radius: 40px;
  background: transparent;
  transition: all 0.3s ease 0s;
}

.btn-primary:hover {
  color: #fff;
  background: rgba(58, 133, 191, 0.75);
  border: 2px solid rgba(58, 133, 191, 0.75);
}

i {
  color: rgba(58, 133, 191, 0.75);
}

.btn-outline-primary {
  color: #42b983;

  border-color: #42b983;
}
</style>
