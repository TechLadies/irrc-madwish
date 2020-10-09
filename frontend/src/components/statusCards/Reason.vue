<template>
  <p>{{ reasons }}</p>
</template>

<script>
export default {
  name: "Reason",
  props: ["Reason"],
  data() {
    return {
      reasons: "",
    };
  },
  created() {
    fetch("https://baconipsum.com/api/?type=all-meat&sentences=1")
      .then((response) => response.text())
      .then((data) => {
        this.reasons = data.slice(2, -2);
      });
  },
};
</script>


