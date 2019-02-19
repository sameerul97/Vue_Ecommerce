<template>
  <div class="detailPageBody bg-light">
    <div class="container bg-white">
      <div v-if="successState">
        <div class="alert alert-success" role="alert">{{loggInMessage}}</div>
      </div>
      <div class="row p-3">
        <div class="col-md-6 text-left">
          <div class="imagePlaceHolder text-center">
            <img v-bind:src="phone.imageUrl">
          </div>
        </div>
        <div class="col-md-6">
          <div class="mt-1 mb-1 text-left">
            <span v-for="number in [1,2,3,4,5]" :key="number">
              <span v-if="number <= avgRating" class="fa fa-star checked"></span>
              <span v-else class="fa fa-star noStar"></span>
            </span>
            <span class="totalReviews">{{totalCustomerReviews}} customer reviews</span>
          </div>
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
              v-on:click="addToBasket(phone)"
            >
              Add
              to basket
            </button>
            <button
              type="button"
              class="btn btn-primary font-weight-bold text-center text-uppercase shadow-lg"
              v-on:click="addToWishlist(phone)"
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
      <div class="bg-light rounded text-center p-3 mb-5">
        <p
          class="font-weight-light text-capitalize text-center"
          style="font-size:1.5rem;"
        >Customer questions & answers</p>
        <div class="row">
          <div class="col-sm-8">
            <div v-if="questionAndAnswers.length > 1">
              <div
                v-for="(qandA,index) in questionAndAnswers"
                :key="index"
                class="shadow-sm bg-light rounded text-left"
              >
                <div class="border p-3 mb-5 mt-4">
                  <p class="font-weight-bold text-primary">{{qandA.question}}</p>
                  <div class="card-footer text-muted">
                    <img
                      src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png"
                    >
                    {{qandA.userName}}
                    <span class="float-right mt-1">
                      <a
                        class="btn btn-info text-light btn-sm"
                        data-toggle="modal"
                        v-on:click="loadQuestionIntoModal(qandA)"
                        data-target="#writingAnAnswer"
                      >Answer {{qandA.userName}} question</a>
                    </span>
                  </div>
                  <div v-if="qandA.answers.length <= 2" >
                  <div v-for="(qandA,index) in qandA.answers" :key="index" class="p-1 ml-3 mb-2 mt-2">
                    <p class="font-weight-light">{{qandA.answer}}</p>
                    <div class="card-footer text-muted">
                      <img src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png">
                      Answered by {{qandA.userName}}
                    </div>
                  </div>
                  </div>
                  <div v-else>
                  <div class="accordion" id="accordionExample">
                    <h5 class="mb-0">
                      <button class="btn btn-link " type="button" data-toggle="collapse" v-bind:data-target="'#demo'+ qandA._id"
                        aria-expanded="false" aria-controls="collapseOne">
                        <i class="fas fa-chevron-circle-down"></i>
                      </button>
                      <span class="btn btn-link fullSpecLink" data-toggle="collapse" v-bind:data-target="'#demo'+ qandA._id"
                        aria-expanded="false" aria-controls="collapseOne">View answer</span>
                    </h5>
                    <div :id="'demo'+ qandA._id" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                      <div v-for="(qandA,index) in qandA.answers" :key="index" class="p-1 ml-3 mb-2 mt-2">
                        <p class="font-weight-light">{{qandA.answer}}</p>
                        <div class="card-footer text-muted">
                          <img src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png">
                          Answered by {{qandA.userName}}
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              No Question and answers! Be the first to Question
              </div>
          </div>

          <div class="col-sm-4">
            <hr style="margin-top: 22px!important;margin-bottom: 22px!important;">
            <div class="text-left">
              <p class="font-weight-bold">Answer a question</p>
              <button
                type="button"
                class="btn btn-outline-info btn-block"
                data-toggle="modal"
                data-target="#postQuestion"
              >
                Post
                question
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-light rounded text-center p-3 mb-5">
        <p class="font-weight-light text-capitalize text-center" style="font-size:1.5rem;">Reviews</p>
        <div class="row">
          <div class="col-sm-4">
            <p class="text-center">{{totalCustomerReviews}} Cutomer Reviews</p>
            <div class="row rounded" style="padding:3px;margin:3px;">
              <div class="side">
                <div>5 star</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-5" v-bind:style="{width: fiveStars}"></div>
                </div>
              </div>
              <div class="side right">
                <div>{{fiveStars}}</div>
              </div>
              <div class="side">
                <div>4 star</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-4" v-bind:style="{width: fourStars}"></div>
                </div>
              </div>
              <div class="side right">
                <div>{{fourStars}}</div>
              </div>
              <div class="side">
                <div>3 star</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-3" v-bind:style="{width: threeStars}"></div>
                </div>
              </div>
              <div class="side right">
                <div>{{threeStars}}</div>
              </div>
              <div class="side">
                <div>2 star</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-2" v-bind:style="{width: twoStars}"></div>
                </div>
              </div>
              <div class="side right">
                <div>{{twoStars}}</div>
              </div>
              <div class="side">
                <div>1 star</div>
              </div>
              <div class="middle">
                <div class="bar-container">
                  <div class="bar-1" v-bind:style="{width: oneStars}"></div>
                </div>
              </div>
              <div class="side right">
                <div>{{oneStars}}</div>
              </div>
            </div>
            <!-- <hr style="border:3px solid #f1f1f1"> -->
            <hr style="margin-top: 22px!important;margin-bottom: 22px!important;">
            <div class="text-left">
              <p class="font-weight-bold">Review this product</p>
              <p class="font-weight-normal">Share your thoughts with other customers</p>
              <button
                type="button"
                class="btn btn-outline-info btn-block"
                data-toggle="modal"
                data-target="#exampleModalCenter"
              >
                Write
                a customer review
              </button>
            </div>
          </div>

          <div class="col-sm-8">
            <div v-if="totalCustomerReviews > 0">
              <div
                v-for="review of userReviews"
                :key="review._id"
                class="shadow bg-light rounded text-left"
              >
                <div class="border p-3 mb-5 mt-4">
                  <div class="mt-1 mb-1 starRating">
                    <span v-for="number in [1,2,3,4,5]" :key="number">
                      <span v-if="number <= review.noOfStars" class="fa fa-star checked"></span>
                      <span v-else class="fa fa-star noStar"></span>
                    </span>
                  </div>
                  <p class="font-weight-bold">{{review.opinion}}</p>
                  <p class="font-weight-normal">{{review.opinion}}</p>
                  <div class="card-footer text-muted">
                    <img
                      src="https://images-eu.ssl-images-amazon.com/images/S/amazon-avatars/default._CR0,0,1024,1024_SX48_.png"
                    >
                    {{review.userName}}
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center">
              <p>No Reviews</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade bd-example-modal-lg"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalCenterTitle">Review</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container text-left">
                <div v-if="successState">
                  <div class="alert alert-success" role="alert">{{loggInMessage}}</div>
                </div>
                <span>Stars</span>
                <div>
                  <fieldset class="rating">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      v-on:click="setStars($event)"
                    >
                    <label class="full" for="star5"></label>
                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value="4"
                      v-on:click="setStars($event)"
                    >
                    <label class="full" for="star4"></label>
                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value="3"
                      v-on:click="setStars($event)"
                    >
                    <label class="full" for="star3"></label>
                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value="2"
                      v-on:click="setStars($event)"
                    >
                    <label class="full" for="star2"></label>
                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value="1"
                      v-on:click="setStars($event)"
                    >
                    <label class="full" for="star1"></label>
                  </fieldset>
                </div>
                <hr class="customTopLine customBottonLine">
                <span>Comment</span>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">With textarea</span>
                  </div>
                  <textarea
                    class="form-control"
                    v-model="userGivenOpinion"
                    aria-label="With textarea"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" id="closeButton" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success" v-on:click="sendReview()">Post Review</button>
            </div>
          </div>
        </div>
      </div>
        <div class="modal fade bd-example-modal-lg" id="writingAnAnswer" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Write answer</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container text-left">
          <div v-if="successState">
                  <div class="alert alert-success" role="alert">{{loggInMessage}}</div>
                </div>
          <div>
            {{question}}
          </div>
          <hr class="customTopLine customBottonLine">
          <span>Enter your answer</span>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">With textarea</span>
            </div>
            <textarea class="form-control" v-model="myAnswer" aria-label="With textarea"></textarea>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="AnswerModalcloseButton" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" v-on:click="sendAnswer()">Post Review</button>
      </div>
      
    </div>
  </div>
</div>
<!-- Post quesion modal -->
<div class="modal fade bd-example-modal-lg" id="postQuestion" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
  aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Ask your question</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container text-left">
          <div v-if="successState">
                  <div class="alert alert-success" role="alert">{{loggInMessage}}</div>
                </div>
          <hr class="customTopLine customBottonLine">
          <span>Enter your question</span>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Question</span>
            </div>
            <textarea class="form-control" v-model="myQuestion" aria-label="With textarea"></textarea>
          </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="loadQuestionIntoModalCloseButton" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-success" v-on:click="sendQuestion()">Post Review</button>
      </div>
    </div>
  </div>
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
      selectedColorVariant: "",
      successState: "",
      loggInMessage: "",
      tokenValidationBool: "",
      avgRating: 4,
      totalCustomerReviews: 0,
      oneStars: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
      userReviews: [],
      reviewSuccess: "",
      userGivenStar: "",
      userGivenOpinion: "",
      questionAndAnswers: [], 
      question : "",
      selectedQuestion : "", 
      myAnswer: "",
      myQuestion: "",
    };
  },
  mounted: function() {
    this.reloadQuestionAndAnswerComp();
  },
  methods: {
    checkTokenValidation: function() {
      fetch("http://localhost:3000/checkToken", {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          this.tokenValidationBool = myJson.Message;
          return this.tokenValidationBool;
        });
      return this.tokenValidationBool;
    },
    reloadQuestionAndAnswerComp: function(){
      this.questionAndAnswer = [];
          var mobileIdToSearch = this.$route.params.mobileId;
    fetch("http://localhost:3000/getPhone/" + mobileIdToSearch)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        return myJson.MobileData;
      })
      .then(details => {
        this.phone = details;
        this.selectedSizeVariant = details.sizeVariant["size1"];
        this.selectedColorVariant = details.colourVariant["colour1"];
      });
    fetch("http://localhost:3000/productReview/" + mobileIdToSearch)
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonVal) {
        return jsonVal;
      })
      .then(reviews => {
        console.log(reviews);
        if (reviews.reviews != "None") {
          this.totalCustomerReviews = reviews.totalReviews;
          this.userReviews = reviews.reviews;
          this.avgRating = reviews.ratings;
          this.oneStars = parseInt(
            (parseInt(reviews.oneStars) / parseInt(reviews.totalReviews)) *
              100 +
              "%"
          );
          this.twoStars = parseInt(
            (parseInt(reviews.twoStars) / parseInt(reviews.totalReviews)) *
              100 +
              "%"
          );
          this.threeStars = parseInt(
            (parseInt(reviews.threeStars) / parseInt(reviews.totalReviews)) *
              100 +
              "%"
          );
          this.fourStars = parseInt(
            (parseInt(reviews.fourStars) / parseInt(reviews.totalReviews)) *
              100 +
              "%"
          );
          this.fiveStars = parseInt(
            (parseInt(reviews.fiveStars) / parseInt(reviews.totalReviews)) *
              100 +
              "%"
          );
          this.oneStars += "%";
          this.twoStars += "%";
          this.threeStars += "%";
          this.fourStars += "%";
          this.fiveStars += "%";
        }
        if (reviews.reviews == "None") {
          this.totalReviewCount = 0;
          this.userReviews = [];
        }
      });
    fetch("http://localhost:3000/getQAndAs/" + mobileIdToSearch)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        return myJson.qAndAs;
      })
      .then(details => {
        this.questionAndAnswers = details;
      });
    },
    sendQuestion:function(){
      console.log(this.myQuestion) // Samsung S8 or Iphone camera ? 
            fetch("http://localhost:3000/postQuestion/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: new URLSearchParams(
          "userId=" +
          localStorage.getItem("userId") +
          "&userName=" +
          localStorage.getItem("name") +
          "&question=" +
          this.myQuestion +
          "&mobileId=" +
          this.phone.mobileId
        ) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          console.log(myJson);
          if (myJson.Message != "Success") {
            this.successState = true;
            this.loggInMessage =
              myJson.Message + "! Please login before continuing";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
                 var element = document.getElementById("loadQuestionIntoModalCloseButton");
                 element.click();
              }.bind(this),
              5000
            );
          } else {
            this.successState = true;
            this.loggInMessage = "Question posted";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
                 var element = document.getElementById("loadQuestionIntoModalCloseButton") ;
                  element.click();
                this.reloadQuestionAndAnswerComp();
              }.bind(this),
              3000
            );
          }
        });
    },
    loadQuestionIntoModal: function(qandA) {
      console.log(qandA);
      this.question= qandA.question;
      this.selectedQuestion=qandA;
    },
    sendAnswer:function(){
      console.log(this.myAnswer);
      fetch("http://localhost:3000/postAnswer/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: new URLSearchParams(
          "userId=" +
          localStorage.getItem("userId") +
          "&userName=" +
          localStorage.getItem("name") +
          "&answer=" +
          this.myAnswer +
          "&questionId=" +
          this.selectedQuestion._id
        ) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          console.log(myJson);
          if (myJson.Message != "Success") {
            this.successState = true;
            this.loggInMessage =
              myJson.Message + "! Please login before continuing";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              5000
            );
          } else {
            this.successState = true;
            this.loggInMessage = "Answer posted";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
                var element = document.getElementById("AnswerModalcloseButton");
                element.click();
                this.reloadQuestionAndAnswerComp();
              }.bind(this),
              3000
            );
          }
        });
    },
    addToBasket: function(phone) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      var mobileId = phone.mobileId;
      var mobileName = phone.mobileName;
      var mobilePrice = phone.mobilePrice;
      var mobileImageUrl = phone.imageUrl;
      fetch("http://localhost:3000/basket", {
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
          console.log(myJson.Message);
          if (myJson.Message != "success") {
            this.successState = true;
            this.loggInMessage =
              myJson.Message + "! Please login before continuing";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              5000
            );
          } else {
            this.successState = true;
            this.loggInMessage = "Successfully added to basket";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              3000
            );
          }
        });
    },
    setStars: function(event) {
      this.userGivenStar = event.target.value;
    },
    sendReview: function() {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      fetch("http://localhost:3000/writeMyReview/", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },
        body: new URLSearchParams(
          "userId=" +
          userId +
          "&userName=" +
          localStorage.getItem("name") +
          "&noOfStars=" +
          this.userGivenStar +
          "&opinionText=" +
          this.userGivenOpinion + // body data type must match "Content-Type" header
            "&mobileId=" +
            this.phone.mobileId
        ) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          console.log(myJson);
          if (myJson.Message != "success") {
            this.successState = true;
            this.loggInMessage =
              myJson.Message + "! Please login before continuing";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              5000
            );
          } else {
            this.successState = true;
            this.loggInMessage = "Review posted";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
                var element = document.getElementById("closeButton");
        element.click();
        this.reloadQuestionAndAnswerComp();
              }.bind(this),
              3000
            );
          }
        });
    },
    addToWishlist: function(phone) {
      var userId = localStorage.getItem("userId");
      var token = localStorage.getItem("token");
      var mobileId = phone.mobileId;

      fetch("http://localhost:3000/myWishedProduct", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + token
        },
        body: new URLSearchParams("userId=" + userId + "&mobileId=" + mobileId) // body data type must match "Content-Type" header
      })
        .then(function(response) {
          return response.json();
        })
        .then(myJson => {
          console.log(myJson.Message);
          if (myJson.Message != "success") {
            this.successState = true;
            this.loggInMessage =
              myJson.Message + "! Please login before continuing";
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              5000
            );
          } else {
            this.successState = true;
            this.loggInMessage = myJson.Content;
            setTimeout(
              function() {
                this.loggInMessage = "";
                this.successState = false;
              }.bind(this),
              3000
            );
          }
        });
    }
  }
};
</script>
<style>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

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
.noStar {
  color: tan;
}
.checked {
  color: orange;
}
.totalReviews {
  font-weight: 300;
}

/* Three column layout */
.side {
  float: left;
  width: 15%;
  margin-top: 10px;
}

.middle {
  margin-top: 19px;
  float: left;
  width: 70%;
}

/* Place text to the right */
.right {
  text-align: right;
}

/* The bar container */
.bar-container {
  width: 100%;
  background-color: #f1f1f1;
  text-align: center;
  color: white;
}

/* Individual bars */
.bar-5 {
  width: 60%;
  height: 18px;
  background-color: #4caf50;
}
.bar-4 {
  width: 30%;
  height: 18px;
  background-color: #2196f3;
}
.bar-3 {
  width: 10%;
  height: 18px;
  background-color: #00bcd4;
}
.bar-2 {
  width: 4%;
  height: 18px;
  background-color: #ff9800;
}
.bar-1 {
  width: 15%;
  height: 18px;
  background-color: #f44336;
}

/* Responsive layout - make the columns stack on top of each other instead of next to each other */
@media (max-width: 400px) {
  .side,
  .middle {
    width: 100%;
  }
  .right {
    display: none;
  }
}
.userIcon {
  height: 48px !important;
}

.customLine {
  margin-top: 22px !important;
  margin-bottom: 22px !important;
}

fieldset,
label {
  margin: 0;
  padding: 0;
}
h1 {
  font-size: 1.5em;
  margin: 10px;
}

/****** Style Star Rating Widget *****/

.rating {
  border: none;
  float: left;
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: "\f005";
}

.rating > .half:before {
  content: "\f089";
  position: absolute;
}

.rating > label {
  color: #ddd;
  float: right;
}
.customTopLine {
  margin-top: 50px !important;
}
.customBottomLine {
  margin-top: 26px !important;
}

/***** CSS Magic to Highlight Stars on Hover *****/

.rating > input:checked ~ label, /* show gold star when clicked */
.rating:not(:checked) > label:hover, /* hover current star */
.rating:not(:checked) > label:hover ~ label {
  color: #ffd700;
} /* hover previous stars in list */
</style>
