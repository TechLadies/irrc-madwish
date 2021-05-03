<template>
  <Page>
    <div class="container">
      <PageHeader slot="header">
        <a class="logo"
          >Matching<br />
          <span class="subtitle">All Students To Be Matched</span></a
        >
      </PageHeader>
      <!--start of table -->
      <section>
        <b-table
          :data="studentsData"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection"
          :selected.sync="selectedStudent"
          @click="toggleSuggestedTeachersModal()"
        >
          <!-- date column -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 0"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-tooltip label="Search: YYYY-MM-DD">
                  <b-input
                    v-model="props.filters[props.column.field]"
                    icon="magnify"
                    size="is-small"
                  />
                </b-tooltip>
              </template>
              <template v-slot="props">
                <span :class="['idStyle']">
                  {{
                    new Date(props.row.CreatedAt)
                      .toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      .replace(",", " ")
                  }}
                </span>
              </template>
            </b-table-column>
          </template>

          <!-- Student ID column -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 1"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                <span>
                  {{ props.row.StudentID }}
                </span>
              </template>
            </b-table-column>
          </template>

          <!-- Student Name column -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 2"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                <span :class="['nameStyle']">
                  {{ props.row.FullName }}
                </span>
                <br />
              </template>
            </b-table-column>
          </template>

          <!-- status column -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 3"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                <Status :status="props.row.Status"> </Status>
              </template>
            </b-table-column>
          </template>

          <!-- Native Language -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 5"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                {{ props.row.NativeLanguage }}
              </template>
            </b-table-column>
          </template>

          <!-- English Proficiency -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 4"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                {{ props.row.EnglishProficiency }}
              </template>
            </b-table-column>
          </template>

          <!-- Source -->

          <template
            v-for="(column, index) in studentsColumns"
            v-if="index == 6"
          >
            <b-table-column :key="column.id" v-bind="column" sortable>
              <template
                v-if="column.searchable"
                slot="searchable"
                slot-scope="props"
              >
                <b-input
                  v-model="props.filters[props.column.field]"
                  icon="magnify"
                  size="is-small"
                />
              </template>
              <template v-slot="props">
                {{ props.row.Source }}
              </template>
            </b-table-column>
          </template>
        </b-table>
      </section>
      <!--start of table 2 -->

      <PageHeader slot="header" class="mid-white">
        <div class="header-right">
          <div class="subheader-left">Matches in progress</div>
          <div class="subheader-right">
            <button
              class="button field is-white"
              @click="unmatchSelected()"
              :disabled="!selectedMatches.length"
            >
              <span>Unmatch Selected </span> ({{ selectedMatches.length }})
            </button>
            <div class="divider" />
            <button
              class="button field is-white"
              @click="confirmSelected()"
              :disabled="!selectedMatches.length"
            >
              <span>Confirm selected </span> ({{ selectedMatches.length }})
            </button>
            <div class="divider" />
            <b-button class="button field is-blue" @click="confirmAll()">
              <span>Confirm all</span>
            </b-button>
          </div>
        </div>
      </PageHeader>

      <section>
        <b-table
          :data="matchedPairs"
          :columns="matchedColumns"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection"
          :checked-rows.sync="selectedMatches"
          checkable
          :checkbox-position="checkboxPosition"
        >
        </b-table>
      </section>
    </div>
  </Page>
</template>

<script>
import Vue from "vue";
import PageHeader from "../components/PageHeader.vue";
import Page from "../components/Page.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import Status from "../components/Status.vue";
import SuggestedTeachersModal from "../components/modals/ModalSuggestedTeachers.vue";

export default {
  data() {
    return {
      selectedStudent: {},
      matchedPairs: [],
      selectedMatches: [],
      studentsColumns: [
        {
          field: "CreatedAt",
          label: "Date Joined",
          searchable: true,
        },
        {
          field: "StudentID",
          label: "Student ID",
          searchable: true,
        },
        {
          field: "FullName",
          label: "Student Name",
          searchable: true,
        },
        {
          field: "Status",
          label: "Status",
          searchable: true,
        },
        {
          field: "EnglishProficiency",
          label: "English Proficiency",
          searchable: true,
        },

        {
          field: "NativeLanguage",
          label: "Native Language",
          searchable: true,
        },

        {
          field: "Source",
          label: "Source",
          searchable: true,
        },
      ],
      teachersColumns: [
        {
          field: "FullName",
          label: "Teacher Name",
          searchable: true,
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
          field: "Source",
          label: "Company",
          searchable: true,
        },
      ],
      matchedColumns: [
        {
          field: "StudentFullName",
          label: "Student Name",
        },
        {
          field: "TeacherFullName",
          label: "Teacher Name",
        },
      ],
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      sortDirection: "asc",
      checkboxPosition: "right",
    };
  },

  computed: {
    ...mapGetters(["unmatchedStudents", "teachers", "suggestedTeachers"]),
    ...mapState(["matchingSuccess"]),
    studentsData() {
      return this.unmatchedStudents
        .map((student) => {
          return {
            StudentID: `${student.StudentID}`,
            FullName: `${student.FullName}`,
            CreatedAt: `${student.created_at}`,
            Status: `${student.status.Description}`,
            PhoneNumber: `${student.PhoneNumber}`,
            NativeLanguage: `${student.nativeLanguage.NativeLanguage}`,
            EnglishProficiency: `${student.EnglishProficiency}`,
            Source: `${student.Source}`,
          };
        })
        .filter(
          ({ StudentID: id1 }) =>
            !this.matchedPairs.some(({ StudentID: id2 }) => id2 === id1)
        );
    },
    teachersData() {
      return this.suggestedTeachers(this.selectedStudent.StudentID).map(
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
    },
    isDisabled() {
      return this.selectedStudent === null;
    },
  },
  components: {
    Page,
    PageHeader,
    Status,
  },
  methods: {
    ...mapActions([
      "getUnmatchedStudents",
      "getAllTeachers",
      "matchStudentTeacherPairs",
    ]),
    toggleSuggestedTeachersModal() {
      Vue.nextTick().then(() => {
        this.$buefy.modal.open({
          parent: this,
          component: SuggestedTeachersModal,
          props: {
            teachersData: this.teachersData,
            matchButtonText: "Match Temporarily",
            studentName: this.selectedStudent.FullName,
          },
          events: {
            selectTeacher: (teacher) => this.addMatchedPair(teacher),
          },
          trapFocus: true,
          hasModalCard: true,
        });
      });
    },
    addMatchedPair(teacher) {
      this.matchedPairs.push({
        TeacherID: teacher.TeacherID,
        TeacherFullName: teacher.FullName,
        StudentID: this.selectedStudent.StudentID,
        StudentFullName: this.selectedStudent.FullName,
      });
      this.selectedStudent = {};
    },
    unmatchSelected() {
      this.matchedPairs = this.matchedPairs.filter(
        ({ StudentID: id1 }) =>
          !this.selectedMatches.some(({ StudentID: id2 }) => id2 === id1)
      );
      this.selectedMatches = [];
    },
    confirmSelected() {
      this.$buefy.dialog.confirm({
        type: "is-blue",
        message: "Clicking OK will confirm all Matches-in-progress.",
        onConfirm: () => {
          const patchMatchesData = this.selectedMatches.map((item) => {
            return {
              TeacherID: parseInt(item.TeacherID),
              TeacherFullName: item.TeacherFullName,
              StudentID: parseInt(item.StudentID),
              StudentFullName: item.StudentFullName,
              UpdatedBy: "IRRCAdmin",
              LastEmailDate: null,
              MatchStatus: "Pending",
              ConfirmedDate: null,
            };
          });
          this.matchStudentTeacherPairs(patchMatchesData);
        },
      });
    },
    confirmAll() {
      this.$buefy.dialog.confirm({
        type: "is-blue",
        message:
          "All matches will be confirmed. All teachers matched will receive an email in their inbox",
        onConfirm: () => {
          const patchMatchesData = this.matchedPairs.map((item) => {
            return {
              TeacherID: parseInt(item.TeacherID),
              TeacherFullName: item.TeacherFullName,
              StudentID: parseInt(item.StudentID),
              StudentFullName: item.StudentFullName,
              UpdatedBy: "IRRCAdmin",
              LastEmailDate: null,
              MatchStatus: "Pending",
              ConfirmedDate: null,
            };
          });
          this.matchStudentTeacherPairs(patchMatchesData);
        },
      });
    },
  },
};
</script>

<style>
body {
  background-color: #f3f7fa !important;
}
.container {
  padding: 20px;
  background-color: transparent;
}
.Title {
  padding-bottom: 20px;
  vertical-align: bottom !important;
}
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
  font-size: 1em;
  justify-content: left;
  padding-top: 25px;
  padding-bottom: 25px;
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
span.idStyle {
  font-size: 0.8em;
}
.table td,
.table th {
  color: #59666e;
}
span.nameStyle {
  color: #3c4f76 !important;
}
table td:not([align]),
table th:not([align]) {
  vertical-align: middle;
}
.b-table .table th.is-current-sort .b-table .table th.is-sortable:hover {
  border-color: white !important;
}

.header a.logo {
  text-align: left;
}

.header.mid-white {
  background-color: #fff;
  padding-bottom: 0px;
}
.subheader-left {
  padding-left: 12px;
  font-size: 1.25rem;
  float: left;
}

.subheader-right {
  float: right;
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

.divider {
  width: 5px;
  height: auto;
  display: inline-block;
}

.card {
  padding: 30px;
}
</style>
s
