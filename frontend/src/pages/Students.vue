<template>
  <Page>
    <PageHeader slot="header">
      <a class="logo">All Students</a>
    </PageHeader>
    <!--start of table -->
    <section>
      <b-table
        :data="studentData"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
        :sortDirection="sortDirection"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :selected.sync="selected"
        @dblclick="goToStudent"
      >
        <!-- date column -->

        <b-table-column
          field="CreatedAt"
          label="Date Joined"
          width="120"
          searchable
          sortable
        >
          <template slot="searchable" slot-scope="props">
            <b-tooltip label="Search: YYYY-MM-DD">
              <b-input
                v-model="props.filters[props.column.field]"
                icon="magnify"
                size="is-small"
              />
            </b-tooltip>
          </template>
          <template v-slot="props">
            <span style="font-size: 14px">
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

        <!-- Student Name/ID column -->

        <b-table-column
          field="FullNameID"
          label="Student Name/ID"
          searchable
          sortable
        >
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            <span class="name">
              {{ props.row.FullName }}
            </span>
            <br />
            <span class="ID">
              {{ props.row.StudentID }}
            </span>
          </template>
        </b-table-column>

        <!-- status column -->

        <b-table-column field="Status" label="Status" searchable sortable>
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            <Status :status="props.row.Status"></Status>
          </template>
        </b-table-column>

        <!-- phone column -->

        <b-table-column
          field="PhoneNumber"
          label="Phone Number"
          searchable
          sortable
        >
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            {{ props.row.PhoneNumber }}
          </template>
        </b-table-column>
      </b-table>
    </section>
  </Page>
</template>

<script>
import PageHeader from "../components/PageHeader.vue";
import Page from "../components/Page.vue";
import Status from "../components/Status.vue";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      selected: {},
      sortIcon: "arrow-up",
      sortIconSize: "is-small",
      sortDirection: "asc",
      isPaginated: true,
      paginationPosition: "bottom",
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    ...mapGetters(["students"]),
    studentData() {
      return this.students.map((student) => {
        return {
          ...student,
          StudentID: `${student.StudentID}`,
          FullName: `${student.FullName}`,
          CreatedAt: `${student.created_at}`,
          Status: `${student.status.Description}`,
          PhoneNumber: `${student.PhoneNumber}`,
          FullNameID: `${student.FullName} <br> ${student.StudentID}`,
        };
      });
    },
  },
  components: {
    Page,
    PageHeader,
    Status,
  },
  methods: {
    ...mapActions(["getAllStudents"]),
    goToStudent() {
      this.$router.push({ path: `/students/${this.selected.StudentID}` });
    },
  },
  mounted() {
    this.getAllStudents();
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
.table td,
.table th {
  color: #59666e;
}
span.name :not(.is-selected) {
  color: #3c4f76;
}
span.id :not(.is-selected) {
  color: #59666e;
}

table td:not([align]),
table th:not([align]) {
  vertical-align: middle;
}
.b-table .table th.is-current-sort .b-table .table th.is-sortable:hover {
  border-color: white !important;
}

.content ul {
  list-style: none;
}

ul.pagination-list {
  margin: 0 auto;
}
</style>
