<template >
  <div class="row mx-4 g-0 align-self-center">
    <div class="col-10">
      <v-combobox
        :items="todoItems"
        v-model="todo"
        @keyup="$emit('search', { event: $event, todo })"
      />
    </div>
    <div class="col-2">
      <button
        class="d-block btn btn-primary mx-auto"
        @click="$emit('createDialog')"
      >
        Add new Todo
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoSearchComponent",
  props: {
    task: String,
    items: Array,
  },
  data() {
    return {
      todo: "",
      todoItems: null,
    };
  },
  watch: {
    items: function (newVal) {
      this.todoItems = newVal;
    },
    task: function (newVal) {
      if (newVal) {
        if (this.todo != newVal) this.todo = newVal;
      }
    },
  },
};
</script>
