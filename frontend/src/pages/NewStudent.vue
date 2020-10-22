<template>
  <div class="container">
    <div class="Title">
        <b class="newstudent">New Student</b>
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
                    v-model="source"
                    ref="sourceComplete"
                    :data="filteredSourceDataArray"
                    placeholder="Optional"
                    @select="option => selected = sourceOption">
                    <template slot="header">
                        <a @click="showAddSource">
                            <span> Add new... </span>
                        </a> 
                    </template>                    
                </b-autocomplete>
            </b-field>
            <b-field grouped>

              <b-field label="Native Language" class="half-width">
                  <b-autocomplete
                      v-model="nativeLanguage"
                      ref="languageComplete"
                      :languageData="filteredLanguageDataArray"
                      placeholder="e.g. Bengali"
                      @select="option => selected = option">
                      <template slot="header">
                          <a @click="showAddLanguage">
                              <span> Add new... </span>
                          </a> 
                      </template>
                  </b-autocomplete>
              </b-field>

      
              <b-field label="English Proficiency" class="half-width">
                  <b-select placeholder="Select one" expanded>
                    <option value = "1">No (Unable to understand at all)</option>
                    <option value = "2">Little (Able to understand simple words)</option>
                    <option value = "3">Simple (Able to speak full sentences)</option>
                    <option value = "4">Intermediate (Able to understand simple words)</option>
                  </b-select>
              </b-field>  

            </b-field>
            
    
            <b-field label="Notes" class="half-width">
                <b-input maxlength="200" type="textarea" placeholder="Optional"></b-input>
            </b-field>

        </section>
        <b-button class="dark-blue" expanded @click="createStudent">Create Student</b-button>
      </div>
    </div>
  </div>      
</template>


<script>
export default {
  name: 'NewStudent',
  data() {
      return {
          languageData: [
              'Bengali',
              'English',
              'Mandarin',
              'Russian',
              'Indonesian',
              'Urdu',
              'Tamil'
          ],
          sourceData: [
              'Rotary Club',
              'Source 1',
              'Source 2',
          ],
          name: '',
          nativeLanguage: '',
          source:'',
          selected: null,
          file: null,
      }
  },
  watch: {
    file: function(val){
      this.uploadFile();
    }
  },
  computed: {
    filteredLanguageDataArray() {
        return this.languageData.filter((option) => {
            return option
              .toString()
              .toLowerCase()
              .indexOf(this.nativeLanguage.toLowerCase()) >= 0
            })
    },
      filteredSourceDataArray() {
        return this.sourceData.filter((sourceOption) => {
            return sourceOption
              .toString()
              .toLowerCase()
              .indexOf(this.source.toLowerCase()) >= 0
            })
    }  
  },
  methods: {
    createStudent(){
      this.$buefy.notification.open({
        message: 'New student added. <u>View profile</u>!',
        duration: 5000,
        type: 'is-success',
        position: 'is-top',
        // color: '#57A773',
      })
    },
    uploadFile(){
      this.$buefy.notification.open({
        message: 'The file was uploaded successfully!',
        duration: 5000,
        type: 'is-success',
        position: 'is-top',
        // color: '#57A773',
      })
    },
    errorUpload(){
      this.$buefy.notification.open({
        message: '<b>There was an error in uploading.</b> <br> Please check formatting of the file and try again.',
        duration: 5000,
        type: 'is-danger',
        position: 'is-top',
        // color: '#57A773',
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
          onConfirm: (value) => {
            this.languageData.push(value)
            this.$refs.languageComplete.setSelected(value)
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
  margin-left: 300px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}
.notification.is-danger {
  background-color: #C33715 !important;
  font: #fff;
  margin-left: 300px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}
</style>
