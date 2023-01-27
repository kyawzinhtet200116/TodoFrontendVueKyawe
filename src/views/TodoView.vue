<template >
  <div class="container-fluid px-4">
    <div class="alert alert-success" v-if="successMessage">
      {{ successMessage }}
    </div>
    <div class="alert alert-danger" v-else-if="errorMessage">
      {{ errorMessage }}
    </div>
    <todo-search-component
      :items="autocompleteTodo"
      :task="task"
      @search="search"
      @createDialog="setOpenCreateCombox"
    />
    <ul class="p-0 mx-4">
      <li class="card text-start p-4 my-2" v-for="i in todos" v-bind:key="i.id">
        <div class="row">
          <div class="col-8">
            {{ i.task }}
          </div>
          <div class="col-4">
            <button
              class="text-primary mx-2 float-end"
              @click="editTodo($event, i)"
            >
              Edit
            </button>
            <button class="text-danger mx-2 float-end" @click="deleteTodo(i)">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="row align-items-center">
      <div class="col-2 mx-4 px-1">{{ pageItem }} of {{ total }} items</div>
      <v-pagination
        class="col"
        v-model="currentPage"
        :circle="true"
        :length="totalPage"
        :total-visible="7"
      />
    </div>
    <todo-create-dialog-component
      :open="isOpen"
      @close="closeCreateDialog"
      @submitTodo="createTodo"
    />
    <todo-edit-dialog-component
      :isOpen="isEditOpen"
      :todo="todo"
      @close="closeEditDialog"
      @edit="editCloseTodo"
    />
    <todo-delete-dialog-component
      :isOpen="isDeleteOpen"
      :id="deleteId"
      @close="closeDeleteDialog"
      @delete="DeleteDialogCloseTodo"
    />
  </div>
</template>

<script>
import TodoSearchComponent from "../components/TodoSearchComponent.vue";
import TodoServices from "../services/TodoServices.js";
import TodoCreateDialogComponent from "../components/TodoCreateDialogComponent.vue";
import TodoEditDialogComponent from "../components/TodoEditDialogComponent.vue";
import TodoDeleteDialogComponent from "../components/TodoDeleteDialogComponent.vue";
export default {
  name: "TodoView",
  components: {
    TodoSearchComponent,
    TodoCreateDialogComponent,
    TodoEditDialogComponent,
    TodoDeleteDialogComponent,
  },
  data() {
    return {
      currentPage: null,
      totalPage: null,
      total: null,
      successMessage: null,
      errorMessage: null,
      todo: null,
      isOpen: false,
      isEditOpen: false,
      isDeleteOpen: false,
      deleteId: 0,
      todos: null,
      autocompleteTodo: null,
      task: null,
    };
  },
  methods: {
    search: async function (value) {
      console.log(value.event);
      if (value.event.keyCode == 13) {
        const api = new TodoServices();
        const raw = await api.getTodos(1, { name: value.todo });
        if (raw.data.status == "OK") {
          this.todos = raw.data.data.data;
          this.currentPage = raw.data.data.current_page;
          this.totalPage = raw.data.data.last_page;
          this.total = raw.data.data.total;
        }
        this.task = value.todo;
        return;
      }
      const api = new TodoServices();
      const rawData = await api.autocomplete({ name: value.todo });
      if (rawData.data.status == "OK") {
        this.autocompleteTodo = rawData.data.data.map((value) => {
          return value.task;
        });
      }
      this.task = value.todo;
    },
    async getAllTodo(api) {
      const raw = await api.getTodos(
        this.currentPage,
        this.task ? { name: this.task } : null
      );
      this.todos = raw.data.data.data;
      this.currentPage = raw.data.data.current_page;
      this.totalPage = raw.data.data.last_page;
      this.total = raw.data.data.total;
    },
    setSuccessMessage: function (value) {
      this.successMessage = value;
      this.errorMessage = null;
    },
    setErrorMessage: function (value) {
      this.errorMessage = value;
      this.successMessage = null;
    },
    deleteTodo: async function (obj) {
      this.isDeleteOpen = true;
      this.deleteId = obj.id;
    },
    editTodo: async function (event, i) {
      const api = new TodoServices();
      const id = i.id;
      const raw = await api.getTodo(id);
      this.isEditOpen = true;
      this.todo = raw.data.data;
    },
    DeleteDialogCloseTodo: async function (id) {
      console.error(id);
      const api = new TodoServices();
      const raw = await api.deleteTodo(id);
      if (raw.data.status == "OK") {
        this.setSuccessMessage(raw.data.message);
      } else {
        this.setErrorMessage(raw.data.message);
      }
      this.isDeleteOpen = false;
      await this.getAllTodo(api);
    },
    editCloseTodo: async function (i) {
      console.log(i);
      const api = new TodoServices();
      const raw = await api.editTodo(i.id, {
        task: i.task,
        completed: i.completed,
      });
      if (raw.data.status == "OK") {
        this.setSuccessMessage(raw.data.message);
        await this.getAllTodo(api);
        window.scroll(0, 0);
        this.isEditOpen = false;
      } else {
        this.setErrorMessage(raw.data.message);
      }
    },
    setOpenCreateCombox: function () {
      this.isOpen = true;
    },
    createTodo: async function (value) {
      const api = new TodoServices();
      const data = await api.createTodo(value);
      if (data.data.status == "OK") {
        this.setSuccessMessage(data.data.message);
      } else {
        this.setSuccessMessage(data.data.message);
      }
      await this.getAllTodo(api);
      this.isOpen = false;
    },
    closeCreateDialog: function () {
      this.isOpen = false;
    },
    closeEditDialog: function () {
      this.isEditOpen = false;
    },
    closeDeleteDialog: function () {
      this.isDeleteOpen = false;
    },
  },
  created: async function () {
    const api = new TodoServices();
    await this.getAllTodo(api);
  },
  watch: {
    currentPage: function (newVal, oldVal) {
      if (newVal != oldVal) {
        const api = new TodoServices();
        this.getAllTodo(api);
        window.scroll(0, 0);
      }
    },
  },
  computed: {
    pageItem: function () {
      return this.currentPage * 10 > this.total
        ? this.total
        : this.currentPage * 10;
    },
  },
};
</script>
