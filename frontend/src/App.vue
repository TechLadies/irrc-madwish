<template>
  <div class="container">
    <div class="Title">
      <span>
        <h0><b>New Student</b></h0>
      </span>
      <!-- upload button --> 
      <b-field class="file is-primary is-right" :class="{'has-name': !!file}">
          <b-upload v-model="file" class="file-label">
              <span class="file-cta">
                  <b-icon class="file-icon" icon="upload"></b-icon>
                  <span class="file-label">  Bulk upload CSV</span>
              </span>
          </b-upload>
      </b-field>   
    </div>
    <div class="columns is-multiline is-mobile">

      <!--start of first column  --> 
      <div class="column is-one-third" align="center">
        <img src="../src/assets/student.png" />
      </div>
      
      <!-- Start of 2nd column --> 
      <div class="column is-two-thirds">
        <section>
            <b-field label="Name" class="half-width">
                <b-input v-model="name"></b-input>
            </b-field>

            <b-field label="Phone Number" class="half-width">
                <b-input type="PhoneNumber"
                    value="">
                </b-input>
            </b-field>

            <b-field label="Source" class="half-width">
                <b-autocomplete
                    v-model="Source"
                    ref="autocomplete"
                    :sourcedata="filteredsourceDataArray"
                    placeholder="e.g. Rotary Club"
                    @select="option1 => selected = option1">                  
                </b-autocomplete>
            </b-field>
            <b-field grouped>

              <b-field label="Native Language" class="half-width">
                  <b-autocomplete
                      v-model="NativeLanguage"
                      ref="autocomplete"
                      :data="filteredDataArray"
                      placeholder="e.g. Bengali"
                      @select="option => selected = option">
                      <template slot="header">
                          <a @click="showAddLanguage">
                              <span> Add new... </span>
                          </a> 
                      </template>
                      <template slot="empty">No results for {{name}}</template>
                  </b-autocomplete>
              </b-field>

      

              <b-field label="English Proficiency" class="half-width">
                  <b-select placeholder="Select one" expanded>
                    <option value = "1">None</option>
                    <option value = "2">Little</option>
                    <option value = "3">Simple </option>
                    <option value = "4">Intermediate</option>
                  </b-select>
              </b-field>  

            </b-field>
            
    
            <b-field label="Notes" class="half-width">
                <b-input maxlength="200" type="textarea" placeholder="Optional"></b-input>
            </b-field>

        </section>
        <b-button class="dark-blue" expanded @click="clickMe">Create Student</b-button>
      </div>
      <!-- Start of third column --> 
      <!-- <div class="column is-one-third">
        <section>
            <b-field class="hide" label="hide">
                <b-input></b-input>
            </b-field>

            <b-field class="hide" label="hide">
                <b-input></b-input>
            </b-field>

            <b-field class="hide" label="hide">
                <b-input></b-input>
            </b-field>


        </section>
      </div>         
      <div class="column is-one-third">
      </div>-->
    </div>
  </div>      
</template>


<script>

export default {
  name: 'works',

  data() {
      return {
          data: [
              'Bengali',
              'English',
              'Mandarin',
              'Russian',
              'Indonesian',
              'Urdu',
              'Tamil'
          ],
          sourcedata: [
              'Rotary Club',
              'Source 1',
              'Source 2'
          ],
          NativeLanguage: '',
          Source:'',
          selected: null
      }
  },

  computed: {
    filteredDataArray() {
        return this.data.filter((option) => {
            return option
              .toString()
              .toLowerCase()
              .indexOf(this.NativeLanguage.toLowerCase()) >= 0
            })
    },
      filteredsourceDataArray() {
        return this.sourcedata.filter((option1) => {
            return option1
              .toString()
              .toLowerCase()
              .indexOf(this.Source.toLowerCase()) >= 0
            })
    }  
  },



  methods: {
    clickMe(){
      this.$buefy.notification.open('Student created!')
    },
    showAddLanguage() {
        this.$buefy.dialog.prompt({
          message: `Add new language`,
          inputAttrs: {
            placeholder: 'e.g. Italian',
            maxlength: 20,
            value: this.name
          },
          confirmText: 'Add',
          onConfirm: (value) => {
            this.data.push(value)
            this.$refs.autocomplete.setSelected(value)
          }
        })
    },
    showAddSource() {
        this.$buefy.dialog.prompt({
          message: `Add new source`,
          inputAttrs: {
            placeholder: 'e.g. Rotary Club',
            maxlength: 20,
            value: this.name
          },
          confirmText: 'Add',
          onConfirm: (value) => {
            this.sourcedata.push(value)
            this.$refs.autocomplete.setSelected(value)
          }
        })
    },    
  }
}
</script>

<style>


select {
  width: 264px;
}


button.button.dark-blue{
  background-color: #3C4F76;
  color: white; 
}


.label {
  color: #59666E !important;
}

b {
  font-size: 30px;
}


html {
  background-color: #F3F7FA !important;
}

.container {
  padding: 20px;
  background-color: transparent;
}


.column.is-half {
  flex: auto;
}

.columns{
  background-color:white;
  margin-top: 100px;
}

.Title{
  padding-bottom:20px;
  vertical-align: center !important;
}

/* select {
  width: 418.66px;
} */


.columns.is-multiline.is-mobile{
  padding:20px 0px 20px 0px;
  /* width:968px; */
  height:608px;
}

.field.hide{
  visibility: hidden;
}


.file.is-primary.is-right{
  float:right;
  background-color: transparent !important;
}

.file.is-primary .file-cta {
  background-color: transparent !important;
  color: #3C4F76 !important;
  padding-left:10px;
}

span.file-label{
  padding-left:10px;
}

.column.is-one-third{
  padding-bottom:0px;
}

.column.auto {
  padding-top:0px;
}

.half-width{
  width:50%;
}


</style>
