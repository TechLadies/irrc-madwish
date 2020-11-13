<template>
  <Page>
    <div class="container">

    <PageHeader slot="header">
      <a class="logo">Screening</a>
      <div class="header-left">

        <button class="button field is-white" @click="checkedRows = []"
            :disabled="!checkedRows.length">
            <span>Clear checked</span>
        </button>

        <button class="button field is-blue" @click="isActive = !isActive"
            :disabled="!checkedRows.length">
            <b-icon icon="close"></b-icon>
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


              <!-- English Proficiency --> 

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
                      <b-field>
                          <b-select placeholder="Select Proficiency" v-on:input="updateCourse">
                            <option value = "1">No (Unable to understand at all)</option>
                            <option value = "2">Little (Able to understand simple words)</option>
                            <option value = "3">Simple (Able to speak full sentences)</option>
                            <option value = "4">Intermediate (Able to understand simple words)</option>
                          </b-select>
                      </b-field>
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

              <!-- blank ready to match column --> 

                <template v-for="(column, index) in columns" v-if="index == 6">
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
const API_URL = "http://localhost:3001/api/students";

import PageHeader from '../components/PageHeader.vue'
import Page from '../components/Page.vue'


export default {
        data() {
            return {
                data: [
                 ],
                selected: null,
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                sortDirection: 'asc',
                checkedRows:[],
                checkboxPosition: 'right',
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
                        field: 'EnglishProficiency',
                        label: 'Ready to Match:',
                        searchable: true,
                    },


                ]
            }
        },
        components:{
          Page,
          PageHeader
        },
                

        // Placeholder for API
        mounted() {
          fetch(API_URL)
            .then(response => response.json())
            .then(result => {
              this.data = result;
            });
        },

        methods: {
          updateCourse(){
            console.log("hello")
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
