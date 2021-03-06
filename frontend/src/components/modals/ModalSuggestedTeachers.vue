<template>
  <div class="card">
    <h2>Select a teacher for student:</h2>
    <h4>
      Student Name: <strong>{{ studentName }}</strong>
    </h4>
    <h4>
      Teacher Name: <strong>{{ selectedTeacher.FullName }}</strong>
    </h4>
    <div class="card-image">
      <b-table
        v-bind:data="teachersData"
        :columns="teachersColumns"
        :selected.sync="selectedTeacher"
      >
      </b-table>
      <b-button class="button field is-blue" @click="handleClose">
        <span>{{ matchButtonText }}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SuggestedTeachersModal",
  props: {
    studentName: {
      type: String,
      default: "",
    },
    isModalVisible: {
      type: Boolean,
      default: false,
    },
    teachersData: {
      type: Array,
      default: [],
    },
    matchButtonText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      teachersColumns: [
        {
          field: "FullName",
          label: "Teacher Name",
          searchable: true,
        },
        {
          field: "NativeLanguage",
          label: "Native Language",
        },
        {
          field: "SecondLanguage",
          label: "Second Language",
        },
        {
          field: "Source",
          label: "Company",
          searchable: true,
        },
      ],
      selectedTeacher: {},
    };
  },
  methods: {
    handleClose() {
      this.$emit("selectTeacher", this.selectedTeacher);
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.b-table .table th.is-current-sort .b-table .table th.is-sortable:hover {
  border-color: white !important;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  padding: 12px 0px;
}

h4 {
  font-size: 14px;
}

button.button.field.is-blue {
  background: #3c4f76;
  color: white;
}

button.is-blue {
  background: #3c4f76;
  color: white !important;
}

button.button.field.is-white {
  border-color: rgb(60, 79, 118);
}

.card {
  padding: 30px;
}
</style>
