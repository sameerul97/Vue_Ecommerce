<template>
  <div>
    <div class="container mt-2 mb-2">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active"
            id="contact-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >My Profile</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="home-tab"
            data-toggle="tab"
            href="#myOrdersContent"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            v-on:click="getMyOrder()"
          >Orders</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            v-on:click="getMyWishedItems()"
          >Wished Items</a>
        </li>
      </ul>

      <div class="tab-content" id="nav-tabContent">
        <div
          class="tab-pane fade show active"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <div class="container pt-3">
            <div class="row">
              <div class="col-md-9">
                <div class="panel panel-default">
                  <div class="panel-body">
                    <div class="row">
                      <div class="col-md-12 lead text-left">User profile
                        <hr>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-4 text-center">
                        <img
                          class="img-circle avatar avatar-original"
                          style="-webkit-user-select:none; 
                        display:block; margin:auto;"
                          src="http://robohash.org/sitsequiquia.png?size=120x120"
                        >
                        <div class="p-2">
                          <label class="btn btn-primary p-2">
                            Change Picture
                            <input type="file" style="display: none;">
                          </label>
                        </div>
                      </div>

                      <div class="col-md-8 text-left">
                        <div class="row">
                          <div class="col-md-12">
                            <h2 class>Username: {{ username }}</h2>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6">
                            <span class="text-muted">Email:{{ email }}</span>
                            <br>
                            <br>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row text-left">
                      <div class="col-md-12">
                        <hr>
                        <button
                          class="btn btn-default pull-right"
                          data-toggle="modal"
                          data-target="#editUserDataModal"
                        >
                          <i class="glyphicon glyphicon-pencil"></i> Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="myOrdersContent" role="tabpanel" aria-labelledby="home-tab">
          <div class="container text-center">
            <h5>My Orders</h5>
            <div class="row">
              <div class="col-6 col-md-4 pt-2 pb-2" v-for="order in orders" :key="order.mobileId">
                <div class="card">
                  <div class="card-header text-primary">{{order.mobileName}}</div>
                  <div class="view overlay">
                    <img
                      class="img-thumbnail"
                      v-bind:src="order.mobileImageUrl"
                      alt="Card image cap"
                    >
                  </div>
                  <div class="card-body">
                    <span class="text-primary font-weight-light">£{{order.mobilePrice}}</span>
                    <div>
                      <a>
                        <router-link
                          class="btn btn-info text-white"
                          :to="`/detailPhone/${order.mobileId}`"
                        >Buy Again</router-link>
                      </a>
                      <!-- <a class="btn btn-info text-white">Buy Again</a> -->
                    </div>
                  </div>
                  <div class="card-footer text-muted ng-scope">
                    <p>Ordered on: {{order.orderedAt}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
          <div class="container text-center">
            <h5>My Wished Items</h5>

            <div class="row">
              <div
                class="col-6 col-md-4 pt-2 pb-2"
                v-for="item in wishedItems"
                :key="item.mobileId"
              >
                <div class="card">
                  <div class="card-header text-primary">{{item.mobileName}}</div>
                  <div class="view overlay">
                    <img
                      class="img-thumbnail"
                      v-bind:src=" item.mobileImageUrl"
                      alt="Card image cap"
                    >
                  </div>
                  <div class="card-body">
                    <span class="text-primary font-weight-light">{{item.mobilePrice}}</span>
                    <div>
                      <a>
                        <router-link
                          class="btn btn-info text-white"
                          :to="`/detailPhone/${item.mobileId}`"
                        >Select mobile</router-link>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   name: 'mostlyWishedComp'
  data() {
    return {
      username: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      orders: [],
      wishedItems: []
    };
  },
  mounted: function() {},
  methods: {
    getMyOrder: function() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      console.log(token);
      fetch("http://localhost:3000/myOrders/" + userId, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        }
      })
        .then(function(response) {
          return response.json();
        })
        // .then(response => response.json())
        .then(myJson => {
          console.log(myJson);
          console.log(myJson.Orders);
          if (myJson.Orders != "None") {
            this.orders = myJson.Orders;
            // this.setState({ ordererdItems: myJson.Orders });
            // console.log(this.state);
            // this.state.ordererdItems.forEach(element => {
            //   console.log(element);
            // });
          }
        });
    },
    getMyWishedItems: function() {
      fetch("http://localhost:3000/myWishedProduct/" + this.userId, {
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
          console.log(myJson);
          console.log(myJson.result);
          // if (myJson.result != "None") {
          this.wishedItems = myJson.result;
          //   console.log(this.state);
          // this.state.ordererdItems.forEach(element => {
          //     console.log(element)
          // });
          // }
        });
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

