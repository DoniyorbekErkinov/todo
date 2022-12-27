<template>
  <div>
    <h1>VUE TODO APP</h1>
    <div class="button_div">
      <!-- Create modalni ochadi -->
      <button @click="openModal" class="button_create">Create Todo</button>
    </div>
    <!-- REF component ichidagi methodga murojat qilish uchun qo'yilgan -->
    <TODOMAIN ref="TODOMAINREFS"/>    
    <notifications />
  </div>
</template>

<script>
import TODOMAIN from './components/TodoMain.vue'
export default {
  name: 'App',
  components: {
    TODOMAIN,
  },
  methods: {
    // create modalni ochadi
    openModal() {
      // REF component ichidagi methodga murojat qilish uchun qo'yilgan
      this.$refs.TODOMAINREFS.openModal()
    }
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  color: #ed4b87;
}
.button_div {
  width: 100%;
  display: flex;
  justify-content: center;
}
.button_create {
  margin: 5px 0px 15px 0px;
  width: 150px;
  padding: 10px;
  border: 1px solid #ed4b87;
  background: transparent;
  border-radius: 15px 5px;
  color: #ed4b87;  
  font-size: 18px;
  font-weight: 600;
}
</style>
