<template>
  <v-row class="container">
    <v-dialog v-model="isOpen" max-width="300px">
      <v-card class="p-2">
        <v-card-text>
          <div>
            <label class="form-label">task</label>
            <input type="text" v-model="todo" class="form-control my-2" />
          </div>
          <input
            type="checkbox"
            v-model="completed"
            class="form-check-inline"
          />Completed
        </v-card-text>
        <v-card-actions>
            <button class='btn btn-light' @click="onClose">Clear</button>
            <button class='btn btn-primary' @click="$emit('submitTodo',{task:todo,completed : completed})">Submit</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "TodoCreateDialogComponent",
  props: {
    open: Boolean,
  },
  data() {
    return {
      isOpen: this.open,
      todo: "",
      completed: false,
    };
  },
  methods: {
    onClose: function () {
        this.$emit("close");
        this.todo="";
    },
  },
  watch: {
    open: function (newVal) {
      console.log(newVal);
      this.isOpen = newVal;
    },
    isOpen: function (newVal) {
      if (!newVal) {
        this.$emit("close");
        this.todo="";
      }
    },
  },
};
</script>