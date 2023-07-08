<template>
  <div class="home">
    <div class="container">
      <div
        class="signin-signup position-relative d-lg-flex justify-content-around align-items-center bg-light"
      >
        <form action="" class="signin-form" @click.prevent>
          <h2 class="title fs-bold">Sign in</h2>
          <div class="input-failed">
            <i class="fa fa-user"></i>
            <input type="text" placeholder="Username" v-model="name" />
          </div>
          <span class="error-feedback" v-if="v$.name.$error">{{
            v$.name.$errors[0].$message
          }}</span>
          <div class="input-failed">
            <i class="fa fa-lock"></i>
            <input type="password" placeholder="Password" v-model="pass" />
          </div>
          <span class="error-feedback d-block" v-if="v$.pass.$error">{{
            v$.pass.$errors[0].$message
          }}</span>
          <input
            type="submit"
            class="submitt"
            value="Sign In"
            id=""
            @click="signinNow()"
          />
          <p class="social-text">Or Sign In With Social Platform</p>
          <div class="social-media">
            <a href="" class="social-icon"><i class="fa fa-facebook"></i></a>
            <a href="" class="social-icon"><i class="fa fa-instagram"></i></a>
            <a href="" class="social-icon"><i class="fa fa-twitter"></i></a>
            <a href="" class="social-icon"><i class="fa fa-linkedin"></i></a>
          </div>
        </form>
        <form action="" class="signup-form" @click.prevent>
          <h2 class="title">Sign Up</h2>
          <div class="input-failed">
            <i class="fa fa-user"></i>
            <input type="text" placeholder="Username" v-model="nameup" />
          </div>
          <span class="error-feedback" v-if="v$.nameup.$error">{{
            v$.nameup.$errors[0].$message
          }}</span>
          <div class="input-failed">
            <i class="fa fa-envelope"></i>
            <input type="text" placeholder="Email" v-model="emailup" />
          </div>
          <span class="error-feedback" v-if="v$.emailup.$error">{{
            v$.emailup.$errors[0].$message
          }}</span>
          <div class="input-failed">
            <i class="fa fa-lock"></i>
            <input type="password" placeholder="Password" v-model="passup" />
          </div>
          <span class="error-feedback d-block" v-if="v$.passup.$error">{{
            v$.passup.$errors[0].$message
          }}</span>
          <input
            type="submit"
            class="submitt"
            value="Sign Up"
            id=""
            @click="signupNow()"
          />
          <p class="social-text">Or Sign In With Social Platform</p>
          <div class="social-media">
            <a href="" class="social-icon"><i class="fa fa-facebook"></i></a>
            <a href="" class="social-icon"><i class="fa fa-instagram"></i></a>
            <a href="" class="social-icon"><i class="fa fa-twitter"></i></a>
            <a href="" class="social-icon"><i class="fa fa-linkedin"></i></a>
          </div>
        </form>
        <div class="panels-container">
          <div class="panel left-panel">
            <div class="content">
              <h2>Member of Brand</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quibusdam? Esse dolorum perferendis similique
                voluptas?
              </p>
              <button class="submitt" @click="remov()">Signin</button>
              <img src="../img/signin.svg" class="image" alt="" />
            </div>
          </div>
          <div class="panel right-panel">
            <div class="content">
              <h2>New of Brand</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti, quibusdam? Esse dolorum perferendis similique
                voluptas?
              </p>
              <button class="submitt" @click="add()">Signup</button>
              <img src="../img/signup.svg" class="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';
import axios from "axios";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
export default {
  name: "SignpCom",
  data() {
    return {
      v$: useVuelidate(),
      name: "",
      pass: "",

      emailup: "",
      passup: "",
      nameup: "",
    };
  },
  validations() {
    return {
      name: { required, minLength: minLength(10) },
      pass: { required },

      emailup: { required, email },
      passup: { required },
      nameup: { required },
    };
  },
  // mounted() {
  //   let user = localStorage.getItem("user-info")
  //   if(user){
  //     this.$router.push("home")
  //   }
  // },
  methods: {
    async signinNow() {
      this.v$.$validate();
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.name}&pass=${this.pass}`
      );
      console.log(result)
      console.log(result.data.length )
      // console.log(this.name)
      // console.log(this.pass)
      // console.log(result.data )
      if (result.status == 200 && result.data.length > 0) {
        console.log("login sucssec");
      } else {
        console.log("login failed");
      }
    },
    async signupNow() {
      this.v$.$validate();
      if (!this.v$.$error) {
        let result = await axios.post("http://localhost:3000/users", {
          name: this.nameup,
          email: this.emailup,
          pass: this.passup,
        });
        if (result.status == 201) {
          console.log("add new user sucssec");
          localStorage.setItem("user-info", JSON.stringify(result.data));
          // this.add();
          console.log("add new user sucssec2");

          // this.$router.push("home")
        } else {
          console.log("add new user failed");
        }
      } else {
        console.log("yes error");
      }
    },
    add() {
      const container = document.querySelector(".signin-signup");
      container.classList.add("sign-up-mode");
    },
    remov() {
      const container = document.querySelector(".signin-signup");
      const signinfofrm = document.querySelector(".signin-form");

      container.classList.remove("sign-up-mode");
      signinfofrm.style.zIndex = "11";
    },
  },
};
// @click="redirectto{{ vlaue : 'home' }}"
// ...mapActions(['redirectto']);
</script>
<style>
.signup-form {
  transition: 0.5s ease-in-out;
  opacity: 0;
}
.signin-form {
  transition: 1.1s ease-in-out;
}
.signin-signup {
  z-index: 5;
  min-height: 80vh;
  overflow: hidden;
}
.signin-signup::before {
  content: "";
  position: absolute;
  top: 0;
  left: -50%;
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg, #83a1f9, #24293a);
  transform: translateX(100%);
  z-index: 6;
  transition: 1s ease-in-out;
}
.signin-signup.sign-up-mode::before {
  transform: translateX(0);
}
.title {
  font-weight: bold;
  color: #183792;
  font-size: 28px;
}
.input-failed {
  border: 2px solid #183792;
  padding: 19px;
  margin: 11px;
  border-radius: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: start;
}
.input-failed i {
  flex: 1;
  color: #183792;
}
.input-failed input {
  border: none;
  outline: none;
}
.submitt {
  font-size: 12px;
  padding: 5px 32px;
  border-radius: 17px;
  margin: 6px;
  border: 1px solid #183792;
  font-weight: bold;
  background-color: #183792;
  color: white;
}
.social-text {
  font-size: 15px;
  font-weight: bold;
  color: #777;
}
.social-media {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.social-media a {
  border: 1px solid;
  padding: 9px 19px;
  border-radius: 20px;
}
.panels-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 10;
}
.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  min-width: 235px;
  padding: 0 10px;
  z-index: 6;
}
.content {
  color: white;
  transition: 1.1s ease-in-out;
}

.image {
  max-width: 100%;
  transition: 1.1s ease-in-out;
  transition-delay: 0.4s;
}
/* ////////////////////////////// */

.signin-signup.sign-up-mode .left-panel .content {
  transform: translateX(0);
}
.signin-signup.sign-up-mode .right-panel {
  transform: translateX(200%);
}
.signin-signup.sign-up-mode .signup-form {
  z-index: 11;
  opacity: 10;
}
.left-panel .content {
  transform: translateX(-200%);
}
.right-panel .content {
  transform: translateX(0);
}
</style>
