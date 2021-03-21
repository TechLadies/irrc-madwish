<template>
  <div>
    <!-- Display dropdown if MatchStatus is Pending. -->
    <b-dropdown
      v-if="value == 'Pending'"
      :triggers="['hover']"
      aria-role="list"
    >
      <template #trigger>
        <b-button label="Pending" type="is-warning" icon-right="menu-down" />
      </template>
      <!-- Displays option to change status to Active -->
      <b-dropdown-item :value="Active" @click="changeMatchStatus('Active')">{{
        Active.label
      }}</b-dropdown-item>
    </b-dropdown>
    <!-- If MatchStatus is Active, show only the tag with no dropdown -->
    <span v-else :class="['tag', Active.style]">
      <li>{{ Active.label }}</li>
    </span>
  </div>
</template>

<script>
export default {
  name: "Status",
  data() {
    return {
      value: "",
      Pending: { label: "Pending", style: "is-warning" },
      Active: { label: "Active", style: "is-success" },
    };
  },
  watch: {
    status(value) {
      this.value = value;
    },
  },
  props: ["status"],
  methods: {
    changeMatchStatus(value) {
      // Emits value to the parent component and changes value
      this.$emit("change", value);
      this.value = "Active";
    },
  },
  mounted() {
    this.value = this.status;
  },
};
</script>
<style scoped lang="scss">
span.tag {
  font-size: 1em;
  justify-content: left;
  padding-top: 25px;
  padding-bottom: 25px;
  width: 100%;
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

.dropdown-content {
  // color:black !important
  a {
    color: black !important;
  }
  width: 100%;
}
.dropdown {
  width: 100% !important;
}
.dropdown-trigger {
  width: 100% !important;
}
button {
  width: 100% !important;
}
</style>
