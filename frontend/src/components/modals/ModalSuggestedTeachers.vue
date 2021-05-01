<template>
  <div class="card">
    <h2>Select a teacher for student:</h2>
    <h4>
      Student Name: <strong>{{ studentName }}</strong>
    </h4>
    <h4>
      Teacher Name: <strong>{{ selectedTeacher.FullName }}</strong>
    </h4>
    <h4 v-if="!isSearchingTeacher && teachersData.length === 0">
      <br />Showing all teachers because there's no perfect match for this
      student<br />
    </h4>
    <div class="card-image">
      <b-table
        v-bind:data="tableData"
        :selected.sync="selectedTeacher"
        :backendFiltering="true"
        @filters-change="onFilter"
        :sticky-header="true"
      >
        <b-table-column field="FullName" label="Teacher Name" searchable>
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            <div>{{ props.row.FullName }}</div>
          </template>
        </b-table-column>
        <b-table-column field="Status" label="Teacher Status">
          <template v-slot="props">
            <Status :status="props.row.Status"></Status>
          </template>
        </b-table-column>
        <b-table-column field="NativeLanguage" label="Language 1">
          <template v-slot="props">
            <div class="languageTable">
              {{ props.row.NativeLanguage.toLowerCase() }}
            </div>
          </template>
        </b-table-column>
        <b-table-column field="SecondLanguage" label="Language 2">
          <template v-slot="props">
            <div class="languageTable">
              {{ props.row.SecondLanguage.toLowerCase() }}
            </div>
          </template>
        </b-table-column>
        <b-table-column field="TeachingExperience" label="Teaching Experience">
          <template v-slot="props">
            <div>{{ props.row.TeachingExperience }}</div>
          </template>
        </b-table-column>
        <b-table-column field="Source" label="Source" searchable>
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            <div>{{ props.row.Source }}</div>
          </template>
        </b-table-column>
      </b-table>
      <b-button class="button field is-blue" @click="handleClose">
        <span>{{ matchButtonText }}</span>
      </b-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Status from "../Status.vue";

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
  components: {
    Status: Status,
  },
  computed: {
    ...mapGetters(["suggestedTeachers"]),
    tableData() {
      if (this.isSearchingTeacher) {
        return this.searchedTeachers;
      } else {
        if (this.teachersData.length > 0) {
          return this.teachersData;
        } else {
          this.displayText = true;
          return this.allTeachers();
        }
      }
    },
  },
  data() {
    return {
      isSearchingTeacher: false,
      displayText: false,
      searchedTeachers: [],
      selectedTeacher: {},
      myTeachers: [],
    };
  },
  methods: {
    ...mapGetters(["teachers"]),

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
    allTeachers() {
      this.myTeachers = this.teachers();

      return this.myTeachers.map((teacher) => {
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
      });
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

.languageTable {
  text-transform: capitalize;
}
</style>
