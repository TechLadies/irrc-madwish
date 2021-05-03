<template>
  <Page>
    <div class="container">
      <PageHeader slot="header">
        <a class="logo">Screening</a>
        <div class="header-left">
          <button
            class="button field is-white"
            @click="checkedRows = []"
            :disabled="!checkedRows.length"
          >
            <span>Clear selection</span>
          </button>

          <button
            class="button field is-blue"
            @click="cardModal()"
            :disabled="!checkedRows.length"
          >
            <span>Ready to match</span>: {{ checkedRows.length }}
          </button>
        </div>
      </PageHeader>

      <!--start of table -->
      <section>
        <b-table
          :data="tableData"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection"
          :checked-rows.sync="checkedRows"
          checkable
          :checkbox-position="checkboxPosition"
          :is-row-checkable="(row) => row.EnglishProficiency !== null"
          :selected.sync="selected"
          @dblclick="goToStudent"
        >
          <b-button class="button field is-blue" v-on:click="download">
            <b-icon icon="download"></b-icon>
            <span>Download All</span>
          </b-button>
          <!-- Student ID column -->

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
                <b-field>
                  <b-select
                    :placeholder="column.select.placeholder"
                    v-model="props.row[props.column.field]"
                  >
                    <option
                      v-for="option in column.select.options"
                      :key="option"
                      :value="option"
                    >
                      {{ option }}
                    </option>
                  </b-select>
                </b-field>
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
        </b-table>

        <!-- notification -->
        <b-notification
          v-model="isActive"
          aria-close-label="Close notification"
        >
          <b>Students ready to be matched?</b><br />
          Confirming will add these students to the page for them to be matched
          with teachers.<br />
          <button class="button field is-white">Cancel</button
          ><button class="button field is-blue">Confirm</button>
        </b-notification>
      </section>
    </div>
  </Page>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Page from "../components/Page.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import XLSX from "xlsx";

export default {
  data() {
    return {
      selected: {},
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      sortDirection: "asc",
      checkedRows: [],
      checkboxPosition: "right",
      isActive: false,
      columns: [
        {
          field: "FullName",
          label: "Name / Student ID",
          subtitle: "StudentID",
          searchable: true,
        },
        {
          field: "NativeLanguage",
          label: "Native Language",
          searchable: true,
        },
        {
          field: "PhoneNumber",
          label: "Phone Number",
          searchable: true,
        },
        {
          field: "EnglishProficiency",
          label: "English Proficiency",
          searchable: true,
          select: {
            placeholder: "Select Proficiency",
            options: ["No", "Little", "Simple", "Intermediate"],
          },
        },
        {
          field: "Dummy",
          label: "Ready to Match:",
        },
      ],
    };
  },
  components: {
    Page,
    PageHeader,
  },
  computed: {
    ...mapGetters(["screeningStudents"]),
    ...mapState(["screeningSuccess"]),
    tableData() {
      return this.screeningStudents.map((student) => {
        return {
          ...student,
          NativeLanguage: `${student.nativeLanguage.NativeLanguage}`,
        };
      });
    },
    exportData() {
      return this.screeningStudents.map((student) => {
        return {
          StudentID: student.StudentID,
          FullName: student.FullName,
          CreatedAt: student.created_at,
          Status: student.status.Description,
          PhoneNumber: student.PhoneNumber,
          FullName: student.FullName,
          NativeLanguage: student.nativeLanguage.NativeLanguage,
        };
      });
    },
  },
  watch: {
    screeningSuccess() {
      if (this.screeningSuccess) {
        this.getAllStudents();
      }
    },
  },
  methods: {
    ...mapActions(["patchScreeningStudents", "getAllStudents"]),
    cardModal() {
      this.$buefy.dialog.confirm({
        type: "is-blue",
        message:
          "<b> Students ready to be matched?</b> <br> Clicking OK will add these Students to the page for Matching with Teachers.",
        onConfirm: () => {
          const patchStudentsData = this.checkedRows.map((item) => {
            return {
              StudentID: item.StudentID,
              EnglishProficiency: item.EnglishProficiency,
              // TODO: Make dynamic with account management
              UpdatedBy: "IRRCAdmin",
            };
          });
          this.patchScreeningStudents(patchStudentsData);
        },
      });
    },
    goToStudent() {
      this.$router.push({ path: `/students/${this.selected.StudentID}` });
    },
    // Excel download
    download: function () {
      const data = XLSX.utils.json_to_sheet(this.exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "screening.csv");
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

button.button.field.is-blue {
  background: #3c4f76;
  color: white;
}

button.is-blue {
  background: #3c4f76;
  color: white !important;
}

/* table tr:FIRST-CHILD
{
    display:none;
} */

.header {
  background: none !important;
}

button.button.field.is-white {
  background: none !important;
}
</style>
