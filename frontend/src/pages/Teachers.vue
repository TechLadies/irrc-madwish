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
      >
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

        <b-table-column field="status" label="Status" searchable sortable>
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

export default {
  name: "AllTeachers",
  components: {
    Page,
    PageHeader,
    Status,
  },
  computed: {
    ...mapGetters(["teachers", "suggestedTeachers"]),
    teachersData() {
      return this.teachers.map((item) => {
        return {
          ...item,
          FullNameID: `${item.FullName} <br> ${item.TeacherID}`,
        };
      });
    },
  },
  data() {
    return {
      selected: {},
    };
  },
  methods: {
    ...mapActions(["getAllTeachers"]),
    goToTeacher() {
      this.$router.push({ path: `/teachers/${this.selected.TeacherID}` });
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
  color: #59666e;
}
.table td,
.table th {
  color: #59666e;
}
span.name {
  color: #3c4f76 !important;
  font-size: 16px;
}

table td:not([align]),
table th:not([align]) {
  vertical-align: middle;
}
.b-table .table th.is-current-sort .b-table .table th.is-sortable:hover {
  border-color: white !important;
}
</style>
