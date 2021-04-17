<template>
  <Page>
    <PageHeader slot="header">
      <a class="logo">Teachers</a>
    </PageHeader>

    <section>
      <b-table
        :data="teachersData"
        :selected.sync="selected"
        @dblclick="goToTeacher"
        :paginated="isPaginated"
        :per-page="perPage"
      >
        <!-- Download button  -->
        <b-button class="button field is-blue" v-on:click="download">
          <b-icon icon="download"></b-icon>
          <span>Download</span>
        </b-button>

        <b-table-column
          field="created_at"
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
                new Date(props.row.created_at)
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

        <b-table-column
          field="FullNameID"
          label="Teacher Name/ID"
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
              {{ props.row.TeacherID }}
            </span>
          </template>
        </b-table-column>

        <b-table-column
          field="status.Description"
          label="Status"
          searchable
          :custom-search="
            (object, input) =>
              object.status.Description.toLowerCase().startsWith(
                input.toLowerCase()
              )
          "
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
            <Status :status="props.row.status.Description"></Status>
          </template>
        </b-table-column>

        <b-table-column field="Email" label="Email" searchable sortable>
          <template slot="searchable" slot-scope="props">
            <b-input
              v-model="props.filters[props.column.field]"
              icon="magnify"
              size="is-small"
            />
          </template>
          <template v-slot="props">
            {{ props.row.Email }}
          </template>
        </b-table-column>

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
import Page from "../components/Page.vue";
import PageHeader from "../components/PageHeader.vue";
import Status from "../components/Status.vue";
import { mapGetters, mapActions } from "vuex";
import XLSX from "xlsx";

export default {
  name: "AllTeachers",
  components: {
    Page,
    PageHeader,
    Status,
  },
  computed: {
    teachersData() {
      return this.teachers.map((item) => {
        return {
          ...item,
          FullNameID: `${item.FullName} <br> ${item.TeacherID}`,
        };
      });
    },

    exportTeachersData() {
      return this.teachers.map((teacher) => {
        var language2 = teacher.secondLanguage
          ? teacher.secondLanguage.NativeLanguage
          : "";
        return {
          TeacherID: teacher.TeacherID,
          FullName: teacher.FullName,
          CreatedAt: teacher.created_at,
          Status: teacher.status.Description,
          PhoneNumber: teacher.PhoneNumber,
          Email: teacher.Email,
          Language1: teacher.nativeLanguage.NativeLanguage,
          Language2: language2,
        };
      });
    },
    ...mapGetters(["teachers"]),
  },
  data() {
    return {
      selected: {},
      isPaginated: true,
      perPage: 20,
    };
  },
  methods: {
    ...mapActions(["getAllTeachers"]),
    goToTeacher() {
      this.$router.push({ path: `/teachers/${this.selected.TeacherID}` });
    },
    // Download function
    download: function () {
      const data = XLSX.utils.json_to_sheet(this.exportTeachersData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "teachers.csv");
    },
  },
  mounted() {
    this.getAllTeachers();
  },
};
</script>

<style lang="scss">
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
ul.pagination-list {
  margin: 0 auto;
}
.content ul {
  list-style: none;
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
span.ID {
  font-size: 14px;
}
span.ID :not(.is-selected) {
  color: #59666e;
}
.table td,
.table th {
  color: #59666e;
}

span.name {
  font-size: 16px;
}

span.name :not(.is-selected) {
  color: #3c4f76;
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
</style>
