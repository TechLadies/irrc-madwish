<template>
  <p>{{ teachers }}</p>
</template>

<script>
export default {
  name: "Teacher",
  props: ["Teacher"],
  data() {
    return {
      teachers: "",
    };
  },
  created() {
    fetch("https://baconipsum.com/api/?type=all-meat&sentences=1")
      .then((response) => response.text())
      .then((data) => {
        this.teachers = data.slice(2, 20);
      });
  },
};
</script>

