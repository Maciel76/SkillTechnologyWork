<template>
  <div>
    <h1>{{ msg }}</h1>
    <button @click="increment">Count: {{ count }}</button>
  </div>
</template>

<script>
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>