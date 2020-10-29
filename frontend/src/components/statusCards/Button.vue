<template>
  <b-button v-bind:type="isSolid">{{ label }}</b-button>
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
    },
    solid: {
      type: Boolean,
    },
  },
  computed: {
    isSolid() {
      if (this.solid === true) {
        return "is-info";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
button {
  height: 40px;
  color: hsl(220, 33%, 35%, 1);
  border-color: hsl(220, 33%, 35%, 1);
  flex: 1;
}
</style>
