<template>
  <Page>
    <div class="container">
      <PageHeader slot="header">
        <a class="logo">Matched</a>
        <div class="header-left">
          <b-button class="button field is-blue">
            <b-icon icon="download"></b-icon>
            <span>Export</span>
          </b-button>
        </div>
      </PageHeader>

      <!--start of table -->
      <section>
        <b-table
          :data="tableData"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection"
        >
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

export default {
  data() {
    return {
      selected: null,
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
          field: "StudentName",
          label: "Student Name/ID",
          subtitle: "StudentID",
          searchable: true,
        },
        {
          field: "MatchStatus",
          label: "Confirmation",
          searchable: true,
        },
        {
          field: "ConfirmedDate",
          label: "Confirmed On",
          searchable: true,
        },
        {
          field: "LastEmailDate",
          label: "Last Email Sent",
          searchable: true,
        },
      ],
    };
  },
  components: {
    Page,
    PageHeader,
  },
  computed: {
    ...mapGetters(["matches"]),
    tableData() {
      return this.matches.map((match) => {
        let DateMatched, ConfirmedDate, LastEmailDate = "";
        DateMatched = new Date(match.studentStatusUpdate.updated_at).toLocaleDateString("en-US",{day: "2-digit", month: "short", year: "numeric",}).replace(",", " ");
        ConfirmedDate = new Date(match.ConfirmedDate).toLocaleDateString("en-US",{day: "2-digit", month: "short", year: "numeric",}).replace(",", " ");
        LastEmailDate = new Date(match.LastEmailDate).toLocaleDateString("en-US",{day: "2-digit", month: "short", year: "numeric",}).replace(",", " ");

        return {
            DateMatched: DateMatched,
            TeacherName: `${match.teacher.FullName}`,
            TeacherID: `${match.teacher.TeacherID}`,
            StudentName: `${match.student.FullName}`,
            StudentID: `${match.student.StudentID}`,
            MatchStatus: `${match.MatchStatus}`,
            ConfirmedDate: ConfirmedDate,
            LastEmailDate: LastEmailDate,

        }
      });
    },
  },

  methods: {
    ...mapActions(['patchScreeningStudents', 'getAllStudents', 'getAllMatches']),
    cardModal() {
      this.$buefy.dialog.confirm({
        type: 'is-blue',
        message: '<b> Students ready to be matched?</b> <br> Confirming will add these students to the page for them to be matched with teachers.',
        onConfirm: () => {
          const patchStudentsData = this.checkedRows.map(item => {
            return {
              StudentID: item.StudentID,
              EnglishProficiency: item.EnglishProficiency,
              // TODO: Make dynamic with account management
              UpdatedBy: "IRRCAdmin"
            }
          })
          this.patchScreeningStudents(patchStudentsData)
        }
      }) 
    }
  },
  mounted() {
      this.getAllMatches();
  }
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
