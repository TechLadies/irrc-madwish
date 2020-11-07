
<template>
  <Page>
    <div class="container">
      <div class="Title">
          <b class="newStudent">All Students</b>
      </div>
      <!--start of table -->
      <section>
          <b-table 
            :data="tableData"
            :sort-icon="sortIcon"
            :sort-icon-size="sortIconSize"
            :sortDirection="sortDirection">

              <!-- date column --> 

              <template v-for="(column, index) in columns" v-if="index == 0">
                <b-table-column :key="column.id" v-bind="column" sortable>
                  <template
                    v-if="column.searchable"
                    slot="searchable"
                    slot-scope="props">
<<<<<<< HEAD
                    <b-tooltip label="Search: YYYY-MM-DD">
=======
>>>>>>> 8ed84ca20742ef1aada06a1f88bed75013ab0ead
                      <b-input
                          v-model="props.filters[props.column.field]"
                          icon="magnify"
                          size="is-small" />
<<<<<<< HEAD
                    </b-tooltip>
=======
>>>>>>> 8ed84ca20742ef1aada06a1f88bed75013ab0ead
                  </template>
                  <template v-slot="props">
                      <span :class="['idStyle']">

                        {{ new Date(props.row.created_at).toLocaleDateString('en-US', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).replace(',', ' ') }}
                      </span>
                  </template>
                  </b-table-column>
              </template>

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
<<<<<<< HEAD
=======
                          <!-- {{ props.row.FirstName }} {{ props.row.LastName }} -->
>>>>>>> 8ed84ca20742ef1aada06a1f88bed75013ab0ead
                          {{ props.row.FullName }}
                      </span> 
                      <br> 
                  </template>
                  </b-table-column>
              </template>



              <!-- status column --> 

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
                      <span v-if="props.row.StatusID == 1" :class="
                              [
                                  'tag is-info',
                              ]">
                          <li>Screened</li>
                      </span> 

                      <span v-if="props.row.StatusID == 2" :class="
                              [
                                  'tag is-success',
                              ]">
                          <li>Matched</li>
                      </span> 

                      <span v-if="props.row.StatusID == 3" :class="
                              [
                                  'tag is-danger',
                              ]">
                          <li>Dropped Out</li>
                      </span> 

                      <span v-if="props.row.StatusID == 4" :class="
                              [
                                  'tag is-warning',
                              ]">
                          <li>Unmatched</li>
                      </span> 
                  </template>



                  </b-table-column>
              </template>

        

            <!-- phone column --> 

              <template v-for="(column, index) in columns" v-if="index == 4">
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
              
          </b-table>
      </section>
    </div>
  </Page>      
</template>


<script>

// Placeholder for API //
// const API_URL = "http://localhost:3001/students";

import PageHeader from '../components/PageHeader.vue'
import Page from '../components/Page.vue'


export default {
        data() {
            return {
                data: [
                    //Placeholder data if you don't want to run the backend
                    { 'StudentID': 12345, 'FullName': 'Jesse Simmons', 'created_at': '2020-10-24T06:18:24.738Z', 'StatusID': 1,'PhoneNumber': '91233217' },
                    { 'StudentID': 23456, 'FullName': 'John Jacobs', 'created_at': '2020-10-25T06:18:24.738Z', 'StatusID': 2, 'PhoneNumber': '91312231' },
                    { 'StudentID': 31232, 'FullName': 'Tina Gilbert', 'created_at': '2020-10-26T06:18:24.738Z', 'StatusID':  3, 'PhoneNumber': '81234102'},
                    { 'StudentID': 41231, 'FullName': 'Clarence Flores', 'created_at': '2020-10-26T06:18:24.738Z', 'StatusID': 4,  'PhoneNumber': '93141234' },
                    { 'StudentID': 53212, 'FullName': 'Anne Lee', 'created_at': '2020-10-27T06:18:24.738Z', 'StatusID': 1,  'PhoneNumber': '81230532' },
                ],
                selected: null,
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                sortDirection: 'asc',
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
                        field: 'StatusID',
                        label: 'Status',
                        searchable: true,
                    },
                    {
                        field: 'PhoneNumber',
                        label: 'Phone Number',
                        searchable: true,
                    }
                ]
            }
        },
        computed:{
          tableData(){
            return this.data.map(student => {
              return {
                StudentID: `${student.StudentID}`,
                FullName: `${student.FullName}`,
                created_at: `${student.created_at}`,
                StatusID: `${student.StatusID}`,
                PhoneNumber: `${student.PhoneNumber}`  
              }                
            })
          }
        },
        components:{
          Page,
          PageHeader
        },        

        // Placeholder for API
        // mounted() {
        //   fetch(API_URL)
        //     .then(response => response.json())
        //     .then(result => {
        //       console.log(result)
        //       this.data = result;
        //     });
        // }
      
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


</style>
