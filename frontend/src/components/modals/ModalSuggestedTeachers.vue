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
        v-bind:data="tableData"
        :columns="teachersColumns"
        :selected.sync="selectedTeacher"
        :backendFiltering="true"
        @filters-change="onFilter"
      >
      </b-table>
      <b-button class="button field is-blue" @click="handleClose">
        <span>{{ matchButtonText }}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["suggestedTeachers"]),
    tableData() {
      if (this.isSearchingTeacher) {
        return this.searchedTeachers;
      } else {
        return this.teachersData;
      }
    },
  },
  data() {
    return {
      isSearchingTeacher: false,
      searchedTeachers: [],
      teachersColumns: [
        {
          field: "FullName",
          label: "Teacher Name",
          searchable: true,
        },
        {
          field: "Status",
          label: "Teacher Status",
        },
        {
          field: "NativeLanguage",
          label: "Language 1",
        },
        {
          field: "SecondLanguage",
          label: "Language 2",
        },
        {
          field: "TeachingExperience",
          label: "Teaching Experience",
        },
        {
          field: "Source",
          label: "Source",
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
    onFilter(fields) {
      if (fields.FullName || fields.Source) {
        this.isSearchingTeacher = true;
        this.searchedTeachers = this.suggestedTeachers(-1, fields).map(
          (teacher) => {
            if (teacher.secondLanguage === null) {
              teacher.secondLanguage = {};
              teacher.secondLanguage.SecondLanguage = "";
            }
            return {
              ...teacher,
              NativeLanguage: `${teacher.nativeLanguage.NativeLanguage}`,
              SecondLanguage: `${teacher.secondLanguage.NativeLanguage}`,
              Status: `${teacher.status.Description}`,
            };
          }
        );
      } else {
        this.isSearchingTeacher = false;
        this.searchedTeachers = [];
      }
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
