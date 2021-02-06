<template>
  <Page>
    <div class="container">
      <div class="Title">
        <b class="newteacher">New Teacher</b>
        <!-- upload button -->
        <b-field
          class="file is-primary is-right"
          :class="{ 'has-name': !!file }"
        >
          <b-upload v-model="file" class="file-label">
            <span class="file-cta">
              <b-icon class="file-icon" icon="upload"></b-icon>
              <span class="file-label"> Bulk upload CSV</span>
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
          <img src="../assets/teacher.png" />
        </div>
        <!-- Start of 2nd column (all input fields) -->
        <div class="column is-two-thirds">
          <form
            method="POST"
            action="/api/teachers"
            @submit.prevent="createTeacher"
          >
            <!--.prevent prevents the default submit behaviour and executes createTeacher instead -->
            <section>
              <b-field label="Name" class="half-width">
                <b-input v-model="name" name="Name"></b-input>
              </b-field>

              <b-field label="Phone Number" class="half-width">
                <b-input v-model="PhoneNumber" type="string" value="">
                </b-input>
              </b-field>

              <b-field label="Email Address" class="half-width">
                <b-input v-model="Email" type="string" value=""> </b-input>
              </b-field>

              <b-field label="Source" class="half-width">
                <b-input v-model="source" placeholder="Optional"> </b-input>
              </b-field>
              <b-field grouped>
                <b-field label="Native Language" class="half-width">
                  <b-autocomplete
                    v-model="nativeLanguage"
                    field="NativeLanguage"
                    ref="languageComplete"
                    :data="languages"
                    placeholder="e.g. Bengali"
                    @typing="filteredLanguageDataArray"
                    @select="
                      (option) =>
                        (selected.NativeLanguage = option.NativeLanguage)
                    "
                  >
                    <template slot="header">
                      <a @click="showAddLanguage">
                        <span> Add new... </span>
                      </a>
                    </template>
                  </b-autocomplete>
                </b-field>

                <b-field label="English Proficiency" class="half-width">
                  <b-select
                    v-model="EnglishProficiency"
                    placeholder="Select one"
                    expanded
                  >
                    <option value="No">No (Unable to understand at all)</option>
                    <option value="Little">
                      Little (Able to understand simple words)
                    </option>
                    <option value="Simple">
                      Simple (Able to speak full sentences)
                    </option>
                    <option value="Intermediate">
                      Intermediate (Able to understand simple words)
                    </option>
                  </b-select>
                </b-field>
              </b-field>

              <b-field grouped>
                <b-field label="Second Language" class="half-width">
                  <b-autocomplete
                    v-model="SecondLanguage"
                    @blur="checkSecondLanguage"
                    field="NativeLanguage"
                    ref="secondlanguagevalue"
                    :data="languages"
                    placeholder="e.g. Tamil"
                    @typing="filteredLanguageDataArray"
                    @select="
                      (option) =>
                        (selected.SecondLanguage = option.NativeLanguage)
                    "
                  >
                    <template slot="header">
                      <a @click="showAddSecondLanguage">
                        <span> Add new... </span>
                      </a>
                    </template>
                  </b-autocomplete>
                </b-field>

                <b-field label="Language Proficiency" class="half-width">
                  <b-select
                    v-model="SecondLanguageProficiency"
                    placeholder="Select one"
                    expanded
                  >
                    <option value="No">No (Unable to understand at all)</option>
                    <option value="Little">
                      Little (Able to understand simple words)
                    </option>
                    <option value="Simple">
                      Simple (Able to speak full sentences)
                    </option>
                    <option value="Intermediate">
                      Intermediate (Able to understand simple words)
                    </option>
                  </b-select>
                </b-field>
              </b-field>

              <b-field label="Notes" class="half-width">
                <b-input
                  v-model="Notes"
                  maxlength="200"
                  type="textarea"
                  placeholder="Optional"
                ></b-input>
              </b-field>
            </section>
            <b-button
              class="dark-blue"
              input
              type="submit"
              expanded
              @click="createNewTeacher"
              :disabled="formIsInvalid"
              >Create Teacher</b-button
            >
          </form>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NewTeacher",
  components: {
    Page,
  },

  data() {
    return {
      name: "",
      PhoneNumber: "",
      Email: "",
      source: "",
      EnglishProficiency: "",
      SecondLanguageProficiency: "",
      SecondLanguage: "",
      file: null,
      Notes: "",
      selected: {
        NativeLanguage: "",
        SecondLanguage: "",
      },
      languages: [],
      nativeLanguage: "",
    };
  },
  computed: {
    ...mapGetters(["API_nativeLanguage"]),

    // Checks if required fields are empty. If required fields are empty, the Create Teacher Button is disabled.
    formIsInvalid() {
      const formFields = ["name", "PhoneNumber"].map((item) => this[item]);
      if (
        this.selected === null ||
        formFields.includes("") ||
        this.selected?.NativeLanguage === ""
      ) {
        return true;
      }
      return false;
    },
  },
  watch: {
    file(val) {
      this.uploadFile();
    },
  },

  async mounted() {
    this.getNativeLanguages();
  },

  methods: {
    // Copies actions from store, allows you to use it as a native method in the component.
    ...mapActions(["getNativeLanguages", "createTeacher"]),

    createNewTeacher() {
      const teacherData = {
        PhoneNumber: this.PhoneNumber,
        FullName: this.name,
        Source: this.source,
        Email: this.Email,
        NativeLanguageString: this.selected.NativeLanguage,
        SecondLanguageString: this.selected.SecondLanguage,
        EnglishProficiency: this.EnglishProficiency,
        LanguageProficiency: this.SecondLanguageProficiency,
        Notes: this.Notes,
        StatusString: "SCREENING",
      };

      this.createTeacher(teacherData).then((response) => {
        if (response.status < 400) {
          this.$buefy.notification.open({
            message: "New teacher added. <u>View profile</u>!",
            duration: 3000,
            type: "is-success",
            position: "is-top",
          });
          // refreshes state
          this.getNativeLanguages();
          setTimeout(() => {
            this.$router.push({ path: `/teachers` });
          }, 5000);
        } else {
          this.$buefy.notification.open({
            message: "Something went wrong. Please try again.",
            duration: 3000,
            type: "is-warning",
            position: "is-top",
          });
        }
      });
    },


    checkSecondLanguage(){
        this.languageExists = this.API_nativeLanguage.filter((option)=> {
          return option.NativeLanguage.toLowerCase().includes(
            this.SecondLanguage.toLowerCase()
          );
        });
        this.checkLanguageExists = this.languageExists.length;
        if(this.SecondLanguage !="" && this.checkLanguageExists !== 1){ 
            this.$buefy.notification.open({
            message: "Did you mean to add a new second language? Please use the 'Add New' function",
            duration: 3000,
            type: "is-warning",
            position: "is-top",
          });
        }

    },



    filteredLanguageDataArray(language = "") {
      this.languages = this.API_nativeLanguage.filter((option) => {
        return option.NativeLanguage.toLowerCase().includes(
          (language || "").toLowerCase()
        );
      });
    },

    uploadFile() {
      this.$buefy.notification.open({
        message: "The file was uploaded successfully!",
        duration: 5000,
        type: "is-success",
        position: "is-top",
      });
    },

    errorUpload() {
      this.$buefy.notification.open({
        message:
          "<b>There was an error in uploading.</b> <br> Please check formatting of the file and try again.",
        duration: 5000,
        type: "is-danger",
        position: "is-top",
      });
    },

    showAddLanguage() {
      this.$buefy.dialog.prompt({
        message: `Add new language`,
        inputAttrs: {
          placeholder: "e.g. Italian",
          maxlength: 255,
          value: this.nativeLanguage,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.$refs.languageComplete.setSelected({
            NativeLanguage: value,
          });
        },
      });
    },

    showAddSecondLanguage() {
      this.$buefy.dialog.prompt({
        message: `Add new language`,
        inputAttrs: {
          placeholder: "e.g. Italian",
          maxlength: 255,
          value: this.SecondLanguage,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.$refs.secondlanguagevalue.setSelected({
            NativeLanguage: value,
          });
        },
      });
    },

    showAddSource() {
      this.$buefy.dialog.prompt({
        message: `Add new source`,
        inputAttrs: {
          placeholder: "e.g. Rotary Club",
          maxlength: 500,
        },
        confirmText: "Add",
        onConfirm: (value) => {
          this.sourceData.push(value);
          this.$refs.sourceComplete.setSelected(value);
        },
      });
    },
  },
};
</script>

<style>
button.button.dark-blue {
  background-color: #3c4f76;
  color: white;
  border: 1px solid #3c4f76;
  box-sizing: border-box;
  border-radius: 4px;
}

.label {
  color: #59666e !important;
}

b.newteacher {
  font-size: 30px;
  padding-left: 20px;
}

body {
  background-color: #f3f7fa !important;
}

.container {
  padding: 20px;
  background-color: transparent;
}

.columns {
  background-color: white;
  margin-top: 100px;
}

.Title {
  padding-bottom: 20px;
  vertical-align: bottom !important;
}

.columns.is-multiline.is-mobile {
  padding: 20px 0px 20px 0px;
  margin: auto;
  margin-left: 20px;
  margin-right: 20px;
}

.file.is-primary.is-right {
  float: right;
}

.file.is-primary .file-cta {
  background-color: transparent !important;
  float: right;
  color: #3c4f76 !important;
  padding-left: 10px;
}

.half-width {
  width: 50%;
}

html {
  background-color: #f3f7fa;
}

.notification.is-success {
  background-color: #57a773 !important;
  font: #fff;
  margin-left: 100px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}

.notification.is-danger {
  background-color: #c33715 !important;
  font: #fff;
  margin-left: 100px;
  padding: 15px;
  border-radius: 32px;
  text-align: center;
}
</style>
