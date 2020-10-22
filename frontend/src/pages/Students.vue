<template>
  <div class="container">
    <div class="Title">
        <b class="newstudent">All Students</b>
    </div>
    <!--start of table -->
    <section>
        <b-table 
          :data="data"
          :sort-icon="sortIcon"
          :sort-icon-size="sortIconSize"
          :sortDirection="sortDirection">



            <!-- date column --> 

            <template v-for="(column, index) in columns" v-if="index == 0">
              <b-table-column :key="column.id" v-bind="column" sortable>
                <template
                  v-if="column.searchable && !column.numeric"
                  slot="searchable"
                  slot-scope="props">
                    <b-input
                        v-model="props.filters[props.column.field]"
                        icon="magnify"
                        size="is-small" />
                 </template>
                 <template v-slot="props">
                    <span :class="['idStyle']">
                      {{ props.row[column.field] }}
                    </span>
                 </template>
                </b-table-column>
            </template>

            <!-- student_id column --> 

            <template v-for="(column, index) in columns" v-if="index == 1">
              <b-table-column :key="column.id" v-bind="column" sortable>
                <template
                  v-if="column.searchable && !column.numeric"
                  slot="searchable"
                  slot-scope="props">
                    <b-input
                        v-model="props.filters[props.column.field]"
                        icon="magnify"
                        size="is-small" />
                 </template>
                 <template v-slot="props">
                    <span :class="['nameStyle']">
                        {{ props.row.name }}
                    </span> 
                    <br>
                    <span :class="['idStyle']">
                        {{ props.row.id }}
                    </span>    
                 </template>
                </b-table-column>
            </template>


            <!-- status column --> 

            <template v-for="(column, index) in columns" v-if="index == 2">
              <b-table-column :key="column.id" v-bind="column" sortable>
                <template
                  v-if="column.searchable && !column.numeric"
                  slot="searchable"
                  slot-scope="props">
                    <b-input
                        v-model="props.filters[props.column.field]"
                        icon="magnify"
                        size="is-small" />
                 </template>
                 <template v-slot="props">
                    <span :class="
                            [
                                'tag',
                                {'is-info': props.row.status === 'Screening'},
                                {'is-success':  props.row.status === 'Matched'},
                                {'is-danger':  props.row.status === 'Dropped Out'},
                                {'is-warning':  props.row.status === 'Unmatched'},
                            ]">
                        <li>{{ props.row.status }}</li>
                    </span> 
                 </template>
                </b-table-column>
            </template>

      

           <!-- phone column --> 

            <template v-for="(column, index) in columns" v-if="index == 3">
              <b-table-column :key="column.id" v-bind="column" sortable>
                <template
                  v-if="column.searchable && !column.numeric"
                  slot="searchable"
                  slot-scope="props">
                    <b-input
                        v-model="props.filters[props.column.field]"
                        icon="magnify"
                        size="is-small" />
                 </template>
                 <template v-slot="props">
                    {{ props.row.phone_number }}
                 </template>
                </b-table-column>
            </template>
            
        </b-table>
    </section>
  </div>      
</template>


<script>

// Placeholder for API //
// const API_URL = "https://jsonplaceholder.typicode.com/users";

export default {
        data() {
            return {
                data: [
                    { 'id': 12345, 'name': 'Jesse Simmons', 'date': 'Sept 9 2020', 'status': 'Screening','phone_number': '91233217' },
                    { 'id': 23456, 'name': 'John Jacobs', 'date': 'Sept 10 2020', 'status': 'Matched', 'phone_number': '91312231' },
                    { 'id': 31232, 'name': 'Tina Gilbert', 'date': 'Sept 11 2020', 'status': 'Dropped Out', 'phone_number': '81234102'},
                    { 'id': 41231, 'name': 'Clarence Flores', 'date': 'Sept 12 2020', 'status': 'Unmatched',  'phone_number': '93141234' },
                    { 'id': 53212, 'name': 'Anne Lee', 'date': 'Sept 13 2020', 'status': 'Screening',  'phone_number': '81230532' }
                ],
                sortIcon: 'arrow-up',
                sortIconSize: 'is-small',
                sortDirection: 'asc',
                columns: [
                    {
                        field: 'date',
                        label: 'Date Joined',
                        searchable: true,
                    },
                    {
                        field: 'name',
                        label: 'Student Name / ID',
                        searchable: true,
                    },          
                    {
                        field: 'status',
                        label: 'Status',
                        searchable: true,
                    },
                    {
                        field: 'phone_number',
                        label: 'Phone Number',
                        searchable: true,
                    }
                ]
            }
        },
        // Placeholder for API
        // mounted() {
        //   fetch(API_URL)
        //     .then(response => response.json())
        //     .then(result => {
        //       this.data = result;
        //     });
        // }        
    }   
</script>

<style>




b.newstudent {
  font-size: 30px;
  padding-left: 20px;
}

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
