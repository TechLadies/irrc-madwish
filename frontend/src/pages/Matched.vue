<template>
  <Page>
    <div class="container">
      <PageHeader slot="header">
        <a class="logo">Matched</a>
      </PageHeader>

      <!--start of table -->
      <section>
        <b-table
          :data="tableData"
          :sort-icon="sortIcon"
          @dblclick="goToTeacher"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection"
          :selected.sync="selected"
          selectable
          :checked-rows.sync="checkedRows"
          checkable
          :checkbox-position="checkboxPosition"
        >
          <b-button class="button field is-blue" v-on:click="download">
            <b-icon icon="download"></b-icon>
            <span>Download Selected</span>
          </b-button>
          <template v-for="column in columns">
            <b-table-column :key="column.field" v-bind="column" sortable>
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
              <template v-slot="props" v-if="column.select">
                <MatchStatus
                  :status="props.row.MatchStatus"
                  @change="changeStatus(props.row)"
                />
              </template>
              <template v-slot="props" v-else>
                <span>
                  {{ props.row[props.column.field] }}
                </span>
                <br />
                <span v-if="column.subtitle">
                  {{ props.row[column.subtitle] }}
                </span>
              </template>
            </b-table-column>
          </template>
          <b-table-column label=" ">
            <b-button @click="clickUnmatch()">
              <b-icon icon="account-multiple-check"></b-icon>
              <span>Unmatch</span>
            </b-button>
          </b-table-column>
        </b-table>

        <!-- Unmatching modal  -->

        <b-modal v-model="isComponentModalActive" :width="640" scroll="keep">
          <div class="card">
            <h2>Are you sure you want to unmatch?</h2>
            <h4>
              Unmatching a pair would put students and teachers back to the
              matching process or dropped out section depending on the change in
              status
            </h4>
            <h4>Student Name: {{ selected.StudentName }}</h4>
            <b-field label="Status">
              <b-select
                placeholder="Select a status"
                v-model="selectedStudent.Status"
                :value="selectedStudent.Status"
                expanded
                :open-on-focus="true"
              >
                <option value="UNMATCHED">Unmatched</option>
                <option value="DROPPED OUT">Dropped out</option>
              </b-select>
            </b-field>
            <!-- Dropped out reason -->
            <b-field label="Reason">
              <b-autocomplete
                v-model="selectedStudent.Reason"
                :value="selectedStudent.Reason"
                field="Reason"
                ref="reasonComplete"
                :data="filteredReasonDataArray"
                placeholder="Select reason"
                :open-on-focus="true"
              >
                <template slot="header">
                  <a @click="showAddReason">
                    <span> Add new... </span>
                  </a>
                </template>
              </b-autocomplete>
            </b-field>
            <h4>Teacher Name: {{ selected.TeacherName }}</h4>
            <span class="buttons">
              <b-button class="button field is-white" @click="close()">
                <span>Cancel</span>
              </b-button>

              <b-button class="button field is-blue" @click="unmatch">
                <span>Confirm</span>
              </b-button>
            </span>
          </div>
        </b-modal>
      </section>
    </div>
  </Page>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Page from "../components/Page.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import MatchStatus from "../components/MatchStatus.vue";
import XLSX from "xlsx";

export default {
  data() {
    return {
      selected: {},
      reasons: [],
      selectedStudent: {
        Reason: "",
        Status: "",
      },
      isComponentModalActive: false,
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      sortDirection: "asc",
      checkedRows: [],
      checkboxPosition: "right",
      isActive: false,
      columns: [
        {
          field: "DateMatched",
          label: "Date Match",
          searchable: true,
        },
        {
          field: "TeacherName",
          label: "Teacher Name/ID",
          subtitle: "TeacherID",
          searchable: true,
        },
        {
          field: "TeacherPhoneNumber",
          label: "Teacher Phone Number",
          searchable: true,
        },
        {
          field: "TeacherEmail",
          label: "Teacher Email",
          searchable: true,
        },
        {
          field: "StudentName",
          label: "Student Name/ID",
          subtitle: "StudentID",
          searchable: true,
        },
        {
          field: "StudentPhoneNumber",
          label: "Student's Phone Number",
          searchable: true,
        },
        {
          field: "MatchStatus",
          label: "Confirmation",
          searchable: true,
          select: true,
        },
        {
          field: "ConfirmedDate",
          label: "Confirmed On",
          searchable: true,
        },
      ],
    };
  },
  components: {
    Page,
    PageHeader,
    MatchStatus,
  },
  computed: {
    ...mapGetters(["matches", "API_droppedReason"]),
    reason() {
      return this.selectedStudent ? this.selectedStudent.Reason : "";
    },
    filteredReasonDataArray() {
      return this.API_droppedReason.filter((option) => {
        return option.Reason.toLowerCase().includes(
          this.selectedStudent.Reason.toString().toLowerCase()
        );
      });
    },
    tableData() {
      return this.matches.map((match) => {
        let DateMatched,
          ConfirmedDate,
          LastEmailDate = "";
        DateMatched = new Date(match.studentStatusUpdate.updated_at)
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", " ");
        ConfirmedDate = new Date(match.ConfirmedDate)
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", " ");
        LastEmailDate = new Date(match.LastEmailDate)
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(",", " ");

        return {
          DateMatched: DateMatched,
          TeacherName: `${match.teacher.FullName}`,
          TeacherPhoneNumber: `${match.teacher.PhoneNumber}`,
          TeacherID: `${match.teacher.TeacherID}`,
          TeacherEmail: `${match.teacher.Email}`,
          StudentName: `${match.student.FullName}`,
          StudentID: `${match.student.StudentID}`,
          StudentPhoneNumber: `${match.student.PhoneNumber}`,
          MatchStatus: `${match.MatchStatus}`,
          ConfirmedDate: ConfirmedDate,
          LastEmailDate: LastEmailDate,
          MatchID: `${match.MatchID}`,
        };
      });
    },
  },
  methods: {
    ...mapActions([
      "patchScreeningStudents",
      "getAllStudents",
      "getAllMatches",
      "updateStudentStatus",
      "getDroppedReasons",
      "patchMatchStatus",
    ]),
    clickUnmatch() {
      this.isComponentModalActive = true;
    },
    close() {
      this.isComponentModalActive = false;
    },
    changeStatus(row) {
      const matchID = parseInt(row.MatchID);
      // this.tableData[index].MatchStatus = "Active";
      this.patchMatchStatus(matchID);
    },
    showAddReason() {
      this.$buefy.dialog.prompt({
        message: `Add new reason`,
        inputAttrs: {
          placeholder: "e.g. Course was too challenging",
          value: this.selectedStudent.Reason,
          maxlength: 255,
        },
        confirmText: "Add",
        onConfirm: async (value) => {
          this.selectedStudent.Reason = value;
          this.addDroppedReason(this.selectedStudent.Reason);
          if (this.selectedStudent.Status === "UNMATCHED") {
            this.addUnmatchedReason(this.selectedStudent.Reason);
          } else if (this.selectedStudent.Status === "DROPPED OUT") {
            this.addDroppedReason(this.selectedStudent.Reason);
          }
        },
      });
    },
    unmatch() {
      this.updateStudentStatus({
        studentID: this.selected.StudentID,
        previousStatusString: "MATCHED",
        nextStatusString: this.selectedStudent.Status,
        updatedBy: "IRRCAdmin",
        reason: "DROPPED_" + this.selectedStudent.Reason,
      }).then(() => {
        this.isComponentModalActive = false;
        this.getAllStudents();
      });
    },
    download: function () {
      const data = XLSX.utils.json_to_sheet(this.checkedRows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "matched.csv");
    },
    goToTeacher() {
      this.$router.push({ path: `/teachers/${this.selected.TeacherID}` });
    },
  },
  mounted() {
    this.getAllStudents();
    this.getAllMatches();
    this.getDroppedReasons();
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

button.button.field.is-blue {
  background: #3c4f76;
  color: white;
}

button.is-blue {
  background: #3c4f76;
  color: white !important;
}

.header {
  background: none !important;
}

.card {
  padding: 30px;
  padding-bottom: 40px;
}
</style>
