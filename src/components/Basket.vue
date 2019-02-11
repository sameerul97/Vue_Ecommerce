<template>
  <div>
    <div class="container text-center">
      <div
        v-if="successState"
        class="alert alert-success mt-2"
        role="alert"
      >success, your order has been placed</div>
      <h3 class="font-italic font-weight-normal">My Basket</h3>
      <div class="row text-center">
        <div v-if="basketMessage.length >0" class="text-center">
          <div class="display-4 text-center">{{basketMessage}}</div>
        </div>
        <div class="col-6 col-md-4 pt-2 pb-2" v-for="order in basketItems" :key="order.mobileId">
          <div class="card">
            <div class="row no-gutters m-1">
              <div class="col-auto">
                <img v-bind:src="order.mobileImageUrl" class="img-thumbnail">
              </div>
              <div class="col">
                <div class="card-block pt-2 text-info">
                  <a class="card-text font-weight-light">{{order.mobileName}}</a>
                  <p class="card-text">£{{order.mobilePrice}}</p>
                  <a class="btn btn-primary text-dark" v-on:click="orderPhone(order)">Buy Now</a>
                </div>
              </div>
            </div>

            <div class="card-footer text-muted mt-2">
              <span class="float-left ml-1">
                <a v-on:click="deleteItemInBasket(order)" class="text-muted">
                  <span class>
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </a>
              </span>
              <span class="float-right">On Stock!</span>
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
      username: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      basketItems: [],
      basketMessage: "",
      successState: ""
    };
  },
  mounted: function() {
    this.getMyBasket();
  },
  methods: {
    getMyBasket: function() {
      this.basketItems = [];
      fetch("http://localhost:3000/basket/" + this.userId, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.token
        }
      })
        .then(function(response) {
          return response.json();
        })
        // .then(response => response.json())
        .then(myJson => {
          if (myJson.basketItems != "None") {
            this.basketItems = myJson.basketItems;
          } else {
            this.basketMessage = "No Items in Basket";
          }
        });
    },
    orderPhone: function(phone) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(token, phone);
      // Requires:  userId,mobileId,mobileName,mobilePrice,mobileImageUrl
      // var userId = localStorage.getItem("userId")
      var mobileId = phone.mobileId;
      var mobileName = phone.mobileName;
      var mobilePrice = phone.mobilePrice;
      var mobileImageUrl = phone.mobileImageUrl;
      fetch("http://localhost:3000/orderPhone/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },
        body: new URLSearchParams(
          "userId=" +
            userId +
            "&mobileId=" +
            mobileId +
            "&mobileName=" +
            mobileName +
            "&mobilePrice=" +
            mobilePrice +
            "&mobileImageUrl=" +
            mobileImageUrl
        ) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          // console.log(myJson);
          this.successState = true;
          // this.setState({ success: true })
          setTimeout(
            function() {
              this.successState = false;
            }.bind(this),
            2000
          );
          this.deleteItemInBasket(phone);
        });
    },
    deleteItemInBasket: function(phone) {
      console.log(phone._id);
      fetch("http://localhost:3000/basket/" + phone._id, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + this.token
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          console.log(myJson);
          //   this.componentDidMount();
          this.getMyBasket();
          // vm.$forceUpdate();
        });
    }
  }
};
</script>
<style>
img {
  height: 200px !important ;
  border: none;
}

.img-thumbnail {
  border: none;
}

.card {
  transition: all 0.2s;
  color: white;
}

.card:hover {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

a {
  text-decoration: none;
}
</style>
