<template>
  <Page>
    
    <div class="container">
      <div class="Title">
          <b class="editstudent">Edit Student</b>
        <!-- upload button --> 
          <b-field class="file is-primary is-right" :class="{'has-name': !!file}">
              <b-upload v-model="file" class="file-label">
                  <span class="file-cta">
                      <b-icon class="file-icon" icon="upload"></b-icon>
                      <span class="file-label">  Bulk upload CSV</span>
                  </span>
                  <span class="file-name" v-if="file">
                      {{ file.name }}
                  </span>
              </b-upload>
          </b-field>   
      </div>
      <div class="columns is-multiline is-mobile">
        <!--start of first column (image) --> 
        <div class="column is-one-third" align="center">
          <img src="../assets/student.png" />
        </div>
        <!-- Start of 2nd column (all input fields) --> 
        <div class="column is-two-thirds">
          <form method="POST" action ="/api/students" @submit.prevent="createStudent">
          <!--.prevent prevents the default submit behaviour and executes createStudent instead -->
            <section>
                <b-field label="Name" class="half-width">
                    <b-input v-model="studentData.FullName" name="Name"></b-input>
                </b-field>

                <b-field label="Phone Number" class="half-width">
                    <b-input v-model="studentData.PhoneNumber" type="string"
                        value="">
                    </b-input>
                </b-field>

                <b-field label="Source" class="half-width">
                    <b-input
                        v-model="studentData.Source"
                        placeholder="Optional">                 
                    </b-input>
                </b-field>
                <b-field grouped>

                  <b-field label="Native Language" class="half-width">
                     <b-autocomplete :value="nativeLanguage"
                        field= "NativeLanguage"
                        ref="languageComplete"
                        :data="languages"
                        placeholder="e.g. Bengali" 
                        @typing="filteredLanguageDataArray"
                        @select="option => selected = option">
                        <template slot="header">
                            <a @click="showAddLanguage">
                                <span> Add new... </span>
                            </a> 
                        </template>
                    </b-autocomplete>
                  </b-field>

          
                  <b-field label="English Proficiency" class="half-width">
                      <b-select v-model="studentData.EnglishProficiency" placeholder="Select one" expanded>
                        <option value = "No">No (Unable to understand at all)</option>
                        <option value = "Little">Little (Able to understand simple words)</option>
                        <option value = "Simple">Simple (Able to speak full sentences)</option>
                        <option value = "Intermediate">Intermediate (Able to understand simple words)</option>
                      </b-select>
                  </b-field>  
                </b-field>
        
                <b-field label="Notes" class="half-width">
                    <b-input v-model="studentData.Notes" maxlength="200" type="textarea" placeholder="Optional"></b-input>
                </b-field>

            </section>
            <b-button class="dark-blue" input type="submit" expanded @click="saveStudent">Save Student</b-button>
          </form>
        </div>
      </div>
    </div>  

  </Page>    
</template>


<script>

import Page from '../components/Page.vue'
import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  name: 'EditStudent',
    components: {
    Page,
  },

  data() {
      return {
          name: '',
          PhoneNumber: '',
          source:'',
          EnglishProficiency: '',
          file: null,
          Notes: '',
          selected: {
            NativeLanguage: ''
          },
          studentData: {},
          languages: [],
      }
  },
  computed: {    
    ...mapGetters(['API_nativeLanguage', 'getStudentByStudentId']),
    ...mapState(['updateStudentSuccess']),
    nativeLanguage(){
      return this.selected ? this.selected.NativeLanguage: ''
    },

  },
  watch: {
    file (val){
      this.uploadFile() 
    },
    updateStudentSuccess(value){
      if(value === true){
        this.$buefy.notification.open({
              message: 'Student saved. <u>View profile</u>!',
              duration: 3000,
              type: 'is-success',
              position: 'is-top',
            })
        // Refresh NativeLanguage
        this.getNativeLanguages()
        setTimeout(() => {
          this.$router.push(
            {path: `/students/${this.studentData.StudentID}`})}, 3000)
      } 
      else {
         this.$buefy.notification.open({ 
              message: 'Something went wrong. Please try again.',
              duration: 3000, 
              type: 'is-warning',
              position: 'is-top'
            })
      }
    }
  },
  async mounted(){
   
    // Call API for Native Languages
      this.getNativeLanguages()
    // Call API for Student data
      const id = this.$route.params.id
      const result = this.getStudentByStudentId(id)
      this.studentData = {
          FullName: result.FullName,
          PhoneNumber: result.PhoneNumber,
          Source: result.Source,
          EnglishProficiency: result.EnglishProficiency,
          Notes: result.Notes,
          nativeLanguage: result.nativeLanguage.NativeLanguage,
          StudentID: result.StudentID
        }
      this.selected.NativeLanguage = result.nativeLanguage.NativeLanguage
  },

  methods: {
    ...mapActions(['getNativeLanguages', 'patchStudent']),
    saveStudent(){
      // HTTP PATCH to update student, changing specific field on backend.
        const updateData = {...this.studentData, NativeLanguageString: this.selected.NativeLanguage}
        this.patchStudent(updateData)
      //   const studentSave = {
      //   method: "PATCH",
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(
      //     updateData 
      //   )
      // }
      // const id = this.$route.params.id
      // fetch(`/api/students/${id}`, studentSave)
      //   .then(response => {
      //     if (response.status < 400) {
      //       this.$buefy.notification.open({
      //         message: 'Student saved. <u>View profile</u>!',
      //         duration: 3000,
      //         type: 'is-success',
      //         position: 'is-top',
      //       })
      //       // Refresh NativeLanguage
      //       this.getNativeLanguages()
      //       setTimeout(() => {this.$router.push({path: `/students/${id}`})}, 5000)} 
      //     else {
           
      //     }
      //  })
    },

       
    filteredLanguageDataArray(language = "") {
      this.languages = this.API_nativeLanguage.filter((option) => {
          return option.NativeLanguage
            .toLowerCase()
            .includes((language || "").toLowerCase())
          
      })
    },
    uploadFile(){
      this.$buefy.notification.open({
        message: 'The file was uploaded successfully!',
        duration: 5000,
        type: 'is-success',
        position: 'is-top',
      })
    },


    errorUpload(){
      this.$buefy.notification.open({
        message: '<b>There was an error in uploading.</b> <br> Please check formatting of the file and try again.',
        duration: 5000,
        type: 'is-danger',
        position: 'is-top',
      })
    },



    showAddLanguage() {
      this.$buefy.dialog.prompt({
        message: `Add new language`,
        inputAttrs: {
          placeholder: 'e.g. Italian',
          maxlength: 255,
        },
        confirmText: 'Add',
        onConfirm: async (value) => {
          this.selected.NativeLanguage = value
        }
      })
    },         

    showAddSource() {
        this.$buefy.dialog.prompt({
          message: `Add new source`,
          inputAttrs: {
            placeholder: 'e.g. Rotary Club',
            maxlength: 500,
          },
          confirmText: 'Add',
          onConfirm: (value) => {
            this.sourceData.push(value)
            this.$refs.sourceComplete.setSelected(value)
          }
        })
    },    
  }
}
</script>

<style>

button.button.dark-blue{
  background-color: #3C4F76;
  color: white; 
  border: 1px solid #3C4F76;
  box-sizing: border-box;
  border-radius: 4px;
}


.label {
  color: #59666E !important;
}

b.editstudent {
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


.columns{
  background-color:white;
  margin-top: 100px;
}

.Title{
  padding-bottom:20px;
  vertical-align: bottom !important;
}


.columns.is-multiline.is-mobile{
  padding:20px 0px 20px 0px;
  margin: auto;
  margin-left:20px;
  margin-right:20px;
}


.file.is-primary.is-right{
  float:right;
}

.file.is-primary .file-cta {
  background-color: transparent !important;
  float: right;
  color: #3C4F76 !important;
  padding-left:10px;
}

.half-width{
  width:50%;
}


html {
    background-color: #F3F7FA;
}


.notification.is-success {
  background-color: #57A773 !important;
  font: #fff;
  margin-left: 100px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}



.notification.is-danger {
  background-color: #C33715 !important;
  font: #fff;
  margin-left: 100px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}



</style>
