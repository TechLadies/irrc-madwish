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
          <p>
            Fields marked with <span class="red-asterisk">*</span> are required.
          </p>
          <form
            method="POST"
            action="/api/teachers"
            @submit.prevent="createTeacher"
          >
            <!--.prevent prevents the default submit behaviour and executes createTeacher instead -->
            <section>
              <b-field class="half-width">
                <template #label>
                  Name <span class="red-asterisk">*</span>
                </template>
                <b-input v-model="name" name="Name"></b-input>
              </b-field>

              <b-field class="half-width">
                <template #label>
                  Phone Number <span class="red-asterisk">*</span>
                </template>
                <b-input v-model="PhoneNumber" type="string" value="">
                </b-input>
              </b-field>

              <b-field label="Email Address" class="half-width">
                <b-input v-model="Email" type="string" value=""> </b-input>
              </b-field>

              <b-field label="Source" class="half-width">
                <b-input v-model="source" placeholder="Optional"> </b-input>
              </b-field>

              <b-field label="Teaching Experience *" class="half-width">
                <template #label>
                  Teaching Experience <span class="red-asterisk">*</span>
                </template>
                <b-select
                  v-model="TeachingExperience"
                  placeholder="Yes/No"
                  expanded
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </b-select>
              </b-field>

              <b-field grouped>
                <b-field label="Language 1" class="half-width">
                  <template #label> Language 1 </template>
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
              </b-field>

              <b-field grouped>
                <b-field label="Language 2" class="half-width">
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

                <!-- Second Language Proficiency is currently not in use. If users want to implement it in the future, just uncomment this section. -->
                <!-- <b-field label="Second Language Proficiency" class="half-width">
                  <b-select
                    v-model="SecondLanguageProficiency"
                    placeholder="Selet one"
                    :disabled="isDisabled"
                    expanded
                  >
                    <option value="Little">
                      Little (Able to understand simple words)
                    </option>
                    <option value="Simple">
                      Simple (Able to speak full sentences)
                    </option>
                    <option value="Intermediate">
                      Intermediate (Able to understand simple words)
                    </option>
                    <option value="Fluent">
                      Fluent (Able to engage in a conversation)
                    </option>
                  </b-select>
                </b-field> -->
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
import NativeLanguageDropdown from "../components/NativeLanguageDropdown.vue";
import { getAuthHeaders, handleResponse } from "../helpers/auth";

export default {
  name: "NewTeacher",
  components: {
    Page,
    NativeLanguageDropdown,
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
      TeachingExperience: "",
      file: null,
      Notes: "",
      isDisabled: true,
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
      const formFields = ["name", "PhoneNumber", "TeachingExperience"].map(
        (item) => this[item]
      );
      if (
        this.selected === null ||
        formFields.includes("")
        // Currently, the NativeLanguage / Language 1 is not required for input before submitting a new teacher.  If users want to implment this in the future, just uncomment this section. -->
        // this.selected?.NativeLanguage === ""
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

    SecondLanguage: function () {
      if (this.SecondLanguage != "") {
        this.isDisabled = false;
        this.SecondLanguageProficiency = "";
      } else {
        this.isDisabled = true;
        this.SecondLanguageProficiency = "";
      }
    },
  },

  async mounted() {
    this.getNativeLanguages();
  },

  methods: {
    // Copies actions from store, allows you to use it as a native method in the component.
    ...mapActions(["getNativeLanguages", "createTeacher"]),

    setSelectedLanguage(value) {
      this.selected.NativeLanguage = value.NativeLanguage;
    },

    createNewTeacher() {
      const teacherData = {
        PhoneNumber: this.PhoneNumber,
        FullName: this.name,
        Source: this.source,
        Email: this.Email,
        NativeLanguageString: this.selected.NativeLanguage, // Language 1
        ...(this.SecondLanguage && {
          SecondLanguageString: this.selected.SecondLanguage,
        }),
        ...(this.SecondLanguageProficiency && {
          LanguageProficiency: this.SecondLanguageProficiency,
        }),
        EnglishProficiency: "Intermediate",
        TeachingExperience: this.TeachingExperience,
        Notes: this.Notes,
        StatusString: "UNMATCHED",
      };

      this.createTeacher(teacherData)
        .then((response) => response.json())
        .then((data) => {
          this.$buefy.snackbar.open({
            message: "New Teacher Added",
            type: "is-success",
            position: "is-top",
            actionText: "View Profile",
            indefinite: true,
            onAction: () => {
              this.$router.push({ path: `/teachers/${data.TeacherID}` });
            },
          });
          this.getNativeLanguages();
        })
        .catch((error) => {
          this.$buefy.notification.open({
            message: "Something went wrong. Please try again.",
            duration: 3000,
            type: "is-warning",
            position: "is-top",
          });
        });
    },

    checkSecondLanguage() {
      this.languageExists = this.API_nativeLanguage.filter((option) => {
        return option.NativeLanguage.toLowerCase().includes(
          this.SecondLanguage.toLowerCase()
        );
      });
      this.checkLanguageExists = this.languageExists.length;
      if (this.SecondLanguage != "" && this.checkLanguageExists !== 1) {
        this.$buefy.notification.open({
          message:
            "Did you mean to add a new second language? Please use the 'Add New' function",
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
      // Parse the file client-side
      this.file.text().then((f) => {
        // Initialise array of Teacher Objects
        var teachers = [];

        // Split by newline, handling the Windows '\r' break as well
        f = f.replace("\r", "").split("\n");

        // Assume first row of .csv contains headers
        const headers = f.shift().split(",");
        // Use headers as object fields for cells in each row
        f.forEach(function (d) {
          // Loop through each row
          var tmp = {};
          const row = d.replace("\r", "").split(",");
          for (var i = 0; i < headers.length; i++) {
            tmp[headers[i]] = row[i];
          }
          // Add object to list
          teachers.push(tmp);
        });
        teachers.pop();
        const teacherBatchCreate = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify(teachers),
        };
        fetch("/api/teachers", teacherBatchCreate).then((response) => {
          handleResponse(response);

          if (response.status < 400) {
            this.$buefy.notification.open({
              message: "The file was uploaded successfully!",
              duration: 5000,
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
.red-asterisk {
  color: red;
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
