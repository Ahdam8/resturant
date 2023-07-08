<template>
  <div class="home">
    <NavBar />
  </div>
</template>

<script>
import NavBar from "../components/Navbar.vue";
export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  // mounted() {
  //   let user = localStorage.getItem("user-info")
  //   if(!user){
  //     this.$router.push("SignUp")
  //   }
  // },
}
</script>
