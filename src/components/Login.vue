<template>
  <div class="container">
    <div class="text-center">
      <form class="text-center form-signin" onSubmit="{this.handleSubmit}" style="{style}">
        <div class="form-group">
          <!-- <div class="alert alert-primary" role="alert">
                                loginMessage
          </div>-->
          <h1 class="h3 mb-3 font-weight-normal">Sign in</h1>

          <label>Username*</label>
          <input type="text" class="form-control" v-model="userName" placeholder="Enter username">
        </div>

        <div class="form-group">
          <label>Password*</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            placeholder="Enter password"
          >
        </div>

        <h2 class="font-weight-light">{{serverResponse}}</h2>
        <button type class="btn btn-success" v-on:click="login">Submit</button>
        <p class="mt-3 mb-3 text-muted">© 2017-2018</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isLoggedIn"],
  data() {
    return {
      msg: "Login Page",
      userName: "",
      password: "",
      serverResponse: ""
    };
  },
  mounted() {
    // console.log(this.props.isLoggedIn);
    // console.log(this.$route.params.isLoggedInVar);
  },
  methods: {
    login: function() {
      fetch("http://localhost:3000/login/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams(
          "email=" + this.userName + "&password=" + this.password
        ) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        // .then(response => response.json())
        .then(myJson => {
          console.log(myJson);
          if (myJson.Message == "Okay") {
            localStorage.setItem("email", myJson.email);
            localStorage.setItem("userId", myJson.userId);
            localStorage.setItem("name", myJson.name);
            localStorage.setItem("token", myJson.token);

            // var functionA = this.props.updateLink;
            // functionA();
            // this.setState({
            this.serverResponse = myJson.Message;
            this.$store.commit("change", true);

            this.$router.push("/userDashboard");
            // });
            // this.setNoOfItemsInBasket();
            // this.props.history.push("/userDashboard");
          }
            this.serverResponse = myJson.Message;

          // this.setState({
          //   serverResponse: myJson.Message
          // });
          return myJson.MobileData;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  margin: auto;
  width: 100%;
  max-width: 330px;
  padding: 15px;
}
</style>
