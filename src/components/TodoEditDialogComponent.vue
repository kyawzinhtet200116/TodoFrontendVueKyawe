<template>
  <v-dialog v-model="open">
    <v-card>
      <v-card-title> Edit Todo </v-card-title>
      <v-card-text>
        <v-container>
          <div class="mb-2">
            <label class="form-label" /> Task
            <input type="text" class="form-control" v-model="task" />
          </div>
          <div class="mb-2">
            <input type="checkbox" class="form-check" v-model="completed" />
            <label class="form-label" />Complete
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="d-block mx-auto">
          <button class="btn btn-light mx-2" @click="onClose">Clear</button>
          <button
            class="btn btn-primary mx-2"
            @click="$emit('edit', { id: id, task: task, completed: completed })"
          >
            Submit
          </button>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TodoEditDialogComponent",
  props: {
    todo: Object,
    isOpen: Boolean,
  },
  data() {
    return { open: this.isOpen, id: 0, task: "", completed: false };
  },
  methods: {
    SubmitTodo: function () {
      this.$emit("edit");
    },
    onClose: function () {
      this.open = false;
      this.task = "";
      this.completed = false;
    },
  },
  watch: {
    open: function (newVal) {
      if (!newVal) {
        this.$emit("close");
      }
    },
    isOpen: function (newVal) {
      if (newVal) {
        this.open = this.isOpen;
      } else {
        this.open = newVal;
      }
    },
    todo: function (newVal) {
      if (newVal) {
        console.log(newVal);
        this.task = newVal.task;
        this.completed = newVal.completed;
        this.id = newVal.id;
      }
    },
  },
};
</script>