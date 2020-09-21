<template>
  <home></home>
  <h1>
    {{ count }}
  </h1>
  <div style="text-align: center">
    <button @click="add" style="background-color:yellow;width: 100px;height:50px;">click</button>
  </div>
</template>
<script>
import home from "./components/home.vue";

export default {
  components: {
    home
  },
  data() {
    return {
      count: 1
    }
  },
  methods: {
    add() {
      this.count++
    }
  }
}
</script>
