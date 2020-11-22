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
                            {{ props.row.FullName }}
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
                      <span v-if="props.row.NativeLanguageID == 1">
                          Bangla
                      </span> 

                      <span v-if="props.row.NativeLanguageID == 2">
                          Tamil
                      </span> 

                      <span v-if="props.row.NativeLanguageID == 3">
                          Hindu
                      </span> 

                      <span v-if="props.row.NativeLanguageID == 4">
                          Tegulu
                      </span> 
                        <br> 
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
                          <b-select placeholder="Select Proficiency" v-model="props.row.EnglishProficiency" v-on:input="updateCourse">
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
                data: [
                    // { 'StudentID': 12345, 'FullName': 'Jesse', 'created_at': '2020-10-24T06:18:24.738Z', 'StatusID': 1,'PhoneNumber': '91233217', 'EnglishProficiency':null, 'NativeLanguageID':1 },
                    // { 'StudentID': 23456, 'FullName': 'John', 'created_at': '2020-10-25T06:18:24.738Z', 'StatusID': 2, 'PhoneNumber': '91312231', 'EnglishProficiency':null, 'NativeLanguageID':2},
                    // { 'StudentID': 31232, 'FullName': 'Tina', 'created_at': '2020-10-26T06:18:24.738Z', 'StatusID':  3, 'PhoneNumber': '81234102', 'EnglishProficiency':'No', 'NativeLanguageID':3},
                    // { 'StudentID': 31232, 'FullName': 'Tina2', 'created_at': '2020-10-26T06:18:24.738Z', 'StatusID':  3, 'PhoneNumber': '81234102', 'EnglishProficiency':null, 'NativeLanguageID':4},                    
                    // { 'StudentID': 41231, 'FullName': 'Clarence', 'created_at': '2020-10-26T06:18:24.738Z', 'StatusID': 4,  'PhoneNumber': '93141234','EnglishProficiency':'Little', 'NativeLanguageID':1 },
                    // { 'StudentID': 53212, 'FullName': 'Anne', 'created_at': '2020-10-27T06:18:24.738Z', 'StatusID': 1,  'PhoneNumber': '81230532','EnglishProficiency':'Intermediate', 'NativeLanguageID':2 },

                 ],

                selected: null,
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                sortDirection: 'asc',
                checkedRows:[],
                checkboxPosition: 'right',
                uniqueEnglishVals: ['No', 'Little', 'Limited', 'Intermediate'],
                isActive: false,
                columns: [
                    {
                        field: 'created_at',
                        label: 'Date Joined',
                        searchable: true,
                    },
                    {
                        field: 'StudentID',
                        label: 'Student ID',
                        searchable: true,
                    },
                    {
                        field: 'FullName',
                        label: 'Student Name',
                        searchable: true,
                    },    
                    {
                        field: 'NativeLanguageID',
                        label: 'Native Language',
                        searchable: true,
                    },      
                    {
                        field: 'StatusID',
                        label: 'Status',
                        searchable: true,
                    },
                    {
                        field: 'PhoneNumber',
                        label: 'Phone Number',
                        searchable: true,
                    },
                    {
                        field: 'EnglishProficiency',
                        label: 'English Proficiency',
                        searchable: true,
                    },
                    {
                        field: 'Dummy',
                        label: 'Ready to Match:',
                        searchable: true,
                    },


                ]
            }
        },


        computed: {
          tableData(){
            return this.data.map(student=>{

              let NativeLanguageDesc = "";
              let SetNullEnglish ="";

              if (student.NativeLanguageID === 1){
                NativeLanguageDesc = "Bangla"
              }

              if (student.NativeLanguageID === 2){
                NativeLanguageDesc = "Hindi"
              }

              if (student.NativeLanguageID === 3){
                NativeLanguageDesc = "Tamil"
              }

              if (student.NativeLanguageID === 4){
                NativeLanguageDesc = "Telugu"
              }

              return{
                StudentID: `${student.StudentID}`,
                FullName: `${student.FullName}`,
                StatusID: `${student.StatusID}`,
                PhoneNumber: `${student.PhoneNumber}`,
                EnglishProficiency: `${student.EnglishProficiency}`,
                NativeLanguageID: NativeLanguageDesc
              }
            })
          }
        },



        components:{
          Page,
          PageHeader
        },
                

        // FETCH API
        mounted() {
          fetch(API_URL)
            .then(response => response.json())
            .then(result => {
              this.data = result;
            });
        },

        methods: {
          cardModal() {
              this.$buefy.modal.open({
                  parent: this,
                  component: ModalForm,
                  hasModalCard: true,
                  customClass: 'custom-class custom-class-2',
                  trapFocus: true
              })
          }
        },
  


    }   
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
