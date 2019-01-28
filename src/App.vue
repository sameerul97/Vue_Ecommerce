<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Vue Store</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/" class="nav-link">Home</router-link>
              <!-- <a  href="#">Home <span class="sr-only">(current)</span></a> -->
            </li>
            <li class="nav-item">
              <router-link to="/allPhones" class="nav-link">All Phones</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown" v-if="$store.getters.isLogged">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link to="/userDashboard" class="nav-link">My Dashboard</router-link>
              </div>
            </li>
            <li class="nav-item" v-if="!$store.getters.isLogged">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>

            <li class="nav-item" v-if="!$store.getters.isLogged">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="$store.getters.isLogged">
              <router-link to="/basket" class="nav-link">My Basket</router-link>
            </li>

            <li class="nav-item" v-on:click="signOut" v-if="$store.getters.isLogged">
              <router-link to="/" class="nav-link">Sign out</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isLoggedIn: true
    };
  },
  mounted: function() {
    // this.$store.commit("change", true);
    console.log("APP vue ");

    console.log(localStorage.getItem("token"));
    const token = localStorage.getItem("token");
    console.log(token);
    fetch("http://localhost:3000/checkToken", {
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
        // localStorage.setItem("email", myJson.email)
        // localStorage.setItem("userId", myJson.userId)
        // localStorage.setItem("name", myJson.name)
        // localStorage.setItem("token", myJson.token)
        // this.setState({
        //     name: myJson.name
        // })
        var data = myJson.Message;
        console.log(data);
        if (data === "true") {
          this.$store.commit("change", data);
        } else {
          this.$store.commit("change", data);
        }
        console.log(this.$store.getters.isLogged);

        return data;
      });
    // this.$store.commit("change", false);
  },
  methods:{
    signOut : function(){
    console.log("Signing out");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.$store.commit("change", false);
    console.log("Signed Out");
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
.navbar {
  background-color: #41b883 !important ;
  color: #35495e !important;
}
</style>
