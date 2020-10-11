<template>
  <p v-bind:Contents="ContentType">{{ contents }}</p>
</template>

<script>
export default {
  name: "Content",
  props: {
    label: {
      type: String,
    },
    content: {
      type: String,
    },
  },
  data() {
    return {
      contents: "",
    };
  },
  computed: {
    ContentType() {
      if (this.label === "reason") {
        fetch("https://baconipsum.com/api/?type=all-meat&sentences=1")
          .then((response) => response.text())
          .then((data) => {
            this.contents = data.slice(2, -2);
          });
      } else if (this.label === "teacherName") {
        fetch("https://baconipsum.com/api/?type=all-meat&sentences=1")
          .then((response) => response.text())
          .then((data) => {
            this.contents = data.slice(2, 15);
          });
      } else {
        return "";
      }
    },
  },
};
</script>
