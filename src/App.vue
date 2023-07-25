<template>
  <div>
    <Header />
    <router-view></router-view>
    <Footer v-show="$route.meta.footerShow" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  mounted(){
    this.$store.dispatch("home/categoryList");
  }
};
</script>

<style>
body {
  margin: 0;
}

li {
  list-style: none;
}

a{
  text-decoration: none;
}
</style>
