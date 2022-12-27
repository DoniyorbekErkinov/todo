<template>
  <div class="main">
    <ul >
      <li v-for="(todo, i) in todos" :key="i">
        <!-- Checked qilingan todo ni styleini o'zgartiradi -->
        <h2 :class="todo.checked ? 'checked' : ''">{{ todo.title }}</h2>
        <div class="buttons">
          <input @click="checkTodo(todo.id)" v-model="todo.checked" type="checkbox"/>
          <button @click="updateTodo(todo.id)" style="color: rgb(100 115 231);">
            <svg-icon class="icon" type="mdi" :path="edit"></svg-icon>
          </button>
          <button @click="deleteTodo(todo.id)" style="color: red;">
            <svg-icon class="icon" type="mdi" :path="deleteIcon"></svg-icon>
          </button>
        </div>
      </li>
    </ul>
    <!-- Create update modal -->
  <CreateForm @save="save" :formDataProps="formDataProps" @closeModal="closeModal" v-if="showModal"/>
  </div>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiDeleteEmpty } from '@mdi/js';
import { mdiClipboardEdit } from '@mdi/js';
import CreateForm from './CreateForm.vue'
export default {
  name: 'TODOMAIN',
  components: {
    SvgIcon,
    CreateForm
  },
  data() {
    return {
      todos: [],
      showDesc: false,
      showModal: false,
      formDataProps: {},
      //ICONS
      deleteIcon: mdiDeleteEmpty,
      edit: mdiClipboardEdit
    }
  },
  methods: {
    getItems() {
      this.todos = JSON.parse(localStorage.getItem('todos'))
    },
    closeModal() {
      this.formDataProps = {}
      this.showModal = false
    },
    openModal() {
      this.showModal = true
    },
    //Check todo
    checkTodo(id) {        
      this.todos.forEach(el => {
        if(el.id === id) {
          el.checked = !el.checked
        }
      })
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    // delete todo
    deleteTodo(id) {
      let array = this.todos.filter(el => el.id !== id)
      localStorage.setItem('todos', JSON.stringify(array))
      this.getItems()
    },
    // update todo
    updateTodo(id) {      
      this.todos.forEach(el => {
        if(el.id === id) {
          this.formDataProps = el
        }
      })      
      this.openModal()
    },
    // save todo
    save(data) {
      // tizim ishga tushganda agar ma'lumot bo'lmasa yangi todo ni id 1 qilib boshlaydi      
      if(!this.todos){
        localStorage.setItem('todos', JSON.stringify([{id: 1, title: data.title, checked: false}]))
        this.closeModal()
        this.$notify({
          title: "Successfully saved",
          type: "success",
          duration: 1000
        });
         this.getItems();
      } else {
        /*
        * agar avval yaratilgan todo bo'lsa 
        * id larning ichidan eng yuqorisini olib yangi todo ga id yaratadi
        */
          let maxId = Math.max(...this.todos.map(e => e.id))
          /**
           * agar id bo'lsa yangi id yaratmasdan update qiladi
           */
          if(!!data.id) {
            this.todos.forEach(el => {
              if(el.id === data.id) {
                el = data
              }
            })
            localStorage.setItem('todos', JSON.stringify(this.todos))
          } else {            
            this.todos.push({
              id: maxId + 1,
              title: data.title,
              checked: false
            })
            localStorage.setItem('todos', JSON.stringify(this.todos))
          }
          /**
           * modalni berkitib, notifikatsiyani chiqaradi va ma'lumotlarni qayta oladi
           */
          this.closeModal()
          this.$notify({
            title: "Successfully saved",
            type: "success",
            duration: 1000
          });
           this.getItems();
      }
    }
  },
  created() {
    this.getItems()
  }
}
</script>

<style lang="scss" scoped>
.main {
  min-width: 350px;
  max-width: 1000px;
  height: auto;
  margin: 0 auto;
}

ul {
  width: 80%;
  margin: 0 auto;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
    border-radius: 15px 5px;
    box-shadow: 1px 1px 3px gray;
    background: transparent;
    color: #1c35f1;
    padding: 0 10px;
    margin: 10px 0;
    .buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        width: 40px;
        height: 25px;
      }
      button {
        margin: 0px 10px;
        background: transparent;
        border: 1px solid #ebe6e8;
        box-shadow: 1px 1px 2px gray;
        padding: 5px;
      }
    }  
  }
}
@media only screen and (max-width: 600px) {
  ul {
    margin: 0;
    max-width: 400px;
    li {
      flex-direction: column;
      align-items: center;
      padding: 5px;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 25px;
      height: 20px;
    }
    button {
      margin: 0px 2px;
      height: 30px;
      display: flex;
      align-items: center;
      background: transparent;
      border: 1px solid #ebe6e8;
      box-shadow: 1px 1px 2px gray;
      color: #ed4b87;  
      .icon{
        width: 20px;
      }
    }
  }
}
.checked {
  text-decoration: line-through;
}
</style>
