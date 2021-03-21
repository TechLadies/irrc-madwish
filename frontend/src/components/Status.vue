<template>
  <div>
    <span :class="['tag', stat.style]">
      <li>{{ stat.label }}</li>
      <slot></slot>
    </span>
    <!-- slot -->
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      statuses: [
        { label: "Screening", value: "SCREENING", style: "is-info" },
        { label: "Unmatched", value: "UNMATCHED", style: "is-warning" },
        { label: "Matched", value: "MATCHED", style: "is-success" },
        { label: "Dropped Out", value: "DROPPED OUT", style: "is-danger" },
      ],
    };
  },
  props: ["status"],
  computed: {
    stat() {
      return (
        this.statuses.find((item) => item.value === this.status) || {
          label: "",
          value: "",
          style: "",
        }
      );
    },
  },
};
</script>

<style scoped>
span.tag {
  font-size: 1em;
  justify-content: left;
  padding-top: 25px;
  padding-bottom: 25px;
  width: 185px;
}
span.tag.is-info {
  background-color: rgba(159, 207, 255, 0.15);
  color: #00488f;
}
span.tag.is-success {
  background-color: rgba(84, 140, 47, 0.15);
  color: #255307;
}
span.tag.is-danger {
  background-color: rgba(255, 166, 165, 0.15);
  color: #be0e00;
}
span.tag.is-warning {
  background-color: rgba(246, 174, 45, 0.08);
  color: #f6ae2d;
}
</style>
