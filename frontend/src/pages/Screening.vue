<template>
  <Page>
    <div class="container">

    <PageHeader slot="header">
      <a class="logo">Screening</a>
      <div class="header-left">

        <button class="button field is-white" @click="checkedRows = []"
            :disabled="!checkedRows.length">
            <span>Clear selection</span>
        </button>

        <button class="button field is-blue" @click="cardModal()"
            :disabled="!checkedRows.length">
            <span>Matched selected</span>: {{ checkedRows.length }}
        </button>    
        <b-button class="button field is-blue">
          <b-icon icon="download"></b-icon>
          <span>Export</span>
        </b-button>    
      </div>
    </PageHeader>  

      <!--start of table -->
<<<<<<< HEAD
      <section>      
            <b-table 
              :data="data"
              :sort-icon="sortIcon"
              :sort-icon-size="sortIconSize"
              :sortDirection="sortDirection" 
              :checked-rows.sync="checkedRows" 
              checkable
              :checkbox-position="checkboxPosition"
              :is-row-checkable="(row) => row.EnglishProficiency !== null"
              >

                <!-- Student ID column --> 

                <template v-for="(column, index) in columns" v-if="index == 1">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        <span>
                            {{ props.row.StudentID }}
                        </span>    
                    </template>
                    </b-table-column>
                </template>


                <!-- Student Name column --> 

                <template v-for="(column, index) in columns" v-if="index == 2">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        <span :class="['nameStyle']">
                            {{ props.row.FirstName }} {{ props.row.LastName }}
                        </span> 
                        <br> 
                    </template>
                    </b-table-column>
                </template>


                <!-- Native Language column --> 

                <template v-for="(column, index) in columns" v-if="index == 3">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        {{ props.row.nativeLanguage.NativeLanguage }}
                    </template>
                    </b-table-column>
                </template>


              <!-- English Proficiency --> 

                <template v-for="(column, index) in columns" v-if="index == 6">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                      <b-field>
                          <b-select placeholder="Select Proficiency" v-model="props.row.EnglishProficiency">
                            <option
                              v-for="option in uniqueEnglishVals" :key="option" :value="option">
                              {{option}}
                            </option>
                          </b-select>
                      </b-field>
                    </template>
                    </b-table-column>
                </template>



              <!-- phone column --> 

                <template v-for="(column, index) in columns" v-if="index == 5">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                        <b-input
                            v-model="props.filters[props.column.field]"
                            icon="magnify"
                            size="is-small" />
                    </template>
                    <template v-slot="props">
                        {{ props.row.PhoneNumber }}
                    </template>
                    </b-table-column>
                </template>

              <!-- blank ready to match column --> 

                <template v-for="(column, index) in columns" v-if="index == 7">
                  <b-table-column :key="column.id" v-bind="column" sortable>
                    <template
                      v-if="column.searchable"
                      slot="searchable"
                      slot-scope="props">
                    </template>
                    <template v-slot="props">                       
                    </template>
                    </b-table-column>
                </template>
            </b-table>

        <!-- notification --> 
        <b-notification v-model="isActive" aria-close-label="Close notification">
            <b>Students ready to be matched?</b><br>
            Confirming will add these students to the page for them to be matched with teachers.<br>
            <button class="button field is-white">Cancel</button><button class="button field is-blue">Confirm</button>
=======
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
        >
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
>>>>>>> made further updates to screening table as v-if and v-for not recommended to be used together
        </b-notification>

      </section>
    </div>
  </Page>      
</template>


<script>

// Placeholder for API //
const API_URL = "api/students/?status=Screening";


import PageHeader from '../components/PageHeader.vue'
import Page from '../components/Page.vue'



const ModalForm = {
    template: `
        <form action="">
            <div class="modal-card" style="width: auto">
                <section class="modal-card-body">
                    <b-field label="Students ready to be matched?">
                        Confirming will add these students to the page for them to be matched with teachers.
                    </b-field>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$emit('close')">Cancel</button>
                    <button class="button is-blue">Confirm</button>
                </footer>
            </div>
        </form>
    `
}



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
  // retrieves students with Screening status, and manipulates table data for rendering in screening table
  computed: {
    ...mapGetters(["screeningStudents"]),
    tableData() {
      return this.screeningStudents.map((student) => {
        return {
          StudentID: `${student.StudentID}`,
          NativeLanguage: `${student.nativeLanguage.NativeLanguage}`,
          EnglishProficiency: `${student.EnglishProficiency}`,
          PhoneNumber: `${student.PhoneNumber}`,
          FullName: `${student.FullName}`,
        };
      });
    },
  },
  methods: {
    cardModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalForm,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
      });
    },
  },
};
</script>

<style>



body {
  background-color: #F3F7FA !important;
}

.container {
  padding: 20px;
  background-color: transparent;
}


.Title{
  padding-bottom:20px;
  vertical-align: bottom !important;
}



span.tag {
  font-size: 1em;
  justify-content: left;
  padding-top: 25px;
  padding-bottom:25px;
  width: 185px;
}


span.tag.is-info {
  background-color: rgba(159, 207, 255, 0.15);
  color: #00488F;
  font-size: 1em;
  justify-content: left;
  padding-top: 25px;
  padding-bottom:25px;
}

span.tag.is-success {
  background-color: rgba(84, 140, 47, 0.15);
  color: #255307;
}

span.tag.is-danger {
  background-color: rgba(255, 166, 165, 0.15);
  color: #BE0E00;
}

span.tag.is-warning {
  background-color: rgba(246, 174, 45, 0.08);
  color: #F6AE2D;
}

span.idStyle {
  font-size: 0.8em;
}

.table td, .table th {
  color: #59666E;
}


span.nameStyle {
  color: #3C4F76 !important;
}


table td:not([align]), table th:not([align]) {
  vertical-align: middle;
}

.b-table .table th.is-current-sort
.b-table .table th.is-sortable:hover {
  border-color: white !important;
}

button.button.field.is-blue{
  background:#3C4F76;
  color:white;
}


button.is-blue{
  background:#3C4F76;
  color:white;
}

/* table tr:FIRST-CHILD
{
    display:none;
} */

.header {
  background:none !important;
}


button.button.field.is-white {
  background: none !important;
}



</style>
