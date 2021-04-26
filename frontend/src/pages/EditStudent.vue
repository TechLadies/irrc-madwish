<template>
  <Page>
    <div class="container">
      <div class="Title">
        <b class="editstudent">Edit Student</b>
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
          <img src="../assets/student.png" />
        </div>
        <!-- Start of 2nd column (all input fields) -->
        <div class="column is-two-thirds">
          <form
            method="POST"
            action="/api/students"
            @submit.prevent="createStudent"
          >
            <!--.prevent prevents the default submit behaviour and executes createStudent instead -->
            <section>
              <b-field label="Name" class="half-width">
                <b-input v-model="studentData.FullName" name="Name"></b-input>
              </b-field>

              <b-field label="Phone Number" class="half-width">
                <b-input
                  v-model="studentData.PhoneNumber"
                  type="string"
                  value=""
                >
                </b-input>
              </b-field>

              <b-field label="Source" class="half-width">
                <b-input v-model="studentData.Source" placeholder="Optional">
                </b-input>
              </b-field>
              <b-field grouped>
                <b-field label="Native Language" class="half-width">
                  <NativeLanguageDropdown
                    :selected="selected"
                    @change="setSelectedLanguage"
                  />
                </b-field>

                <b-field label="English Proficiency" class="half-width">
                  <b-select
                    v-model="studentData.EnglishProficiency"
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
                  v-model="studentData.Notes"
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
              @click="saveStudent"
              >Save Student</b-button
            >
          </form>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from "../components/Page.vue";
import { mapGetters, mapActions, mapState } from "vuex";
import NativeLanguageDropdown from "../components/NativeLanguageDropdown.vue";

export default {
  name: "EditStudent",
  components: {
    Page,
    NativeLanguageDropdown,
  },

  data() {
    return {
      name: "",
      PhoneNumber: "",
      source: "",
      EnglishProficiency: "",
      file: null,
      Notes: "",
      selected: {
        NativeLanguage: "",
      },
      studentData: {},
      languages: [],
    };
  },
  computed: {
    ...mapGetters(["getStudentByStudentId"]),
    ...mapState(["updateStudentSuccess"]),
  },
  watch: {
    file(val) {
      this.uploadFile();
    },
    updateStudentSuccess(value) {
      if (value === true) {
        this.$buefy.notification.open({
          message: "Student saved. <u>View profile</u>!",
          duration: 3000,
          type: "is-success",
          position: "is-top",
        });
        // Refresh NativeLanguage
        this.getNativeLanguages();
        setTimeout(() => {
          this.$router.push({
            path: `/students/${this.studentData.StudentID}`,
          });
        }, 3000);
      } else if (value === false) {
        this.$buefy.notification.open({
          message: "Something went wrong. Please try again.",
          duration: 3000,
          type: "is-warning",
          position: "is-top",
        });
      }
      this.resetUpdateStudentSuccess(undefined);
    },
  },
  async mounted() {
    // Call API for Student data
    const id = this.$route.params.id;
    const result = this.getStudentByStudentId(id);
    this.studentData = {
      FullName: result.FullName,
      PhoneNumber: result.PhoneNumber,
      Source: result.Source,
      EnglishProficiency: result.EnglishProficiency,
      Notes: result.Notes,
      nativeLanguage: result.nativeLanguage.NativeLanguage,
      StudentID: result.StudentID,
    };
    this.selected.NativeLanguage = result.nativeLanguage.NativeLanguage;
  },

  methods: {
    ...mapActions([
      "getNativeLanguages",
      "patchStudent",
      "resetUpdateStudentSuccess",
    ]),
    setSelectedLanguage(value) {
      this.selected = value;
    },

    saveStudent() {
      const updateData = {
        ...this.studentData,
        NativeLanguageString: this.selected.NativeLanguage,
      };
      this.patchStudent(updateData);
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

b.editstudent {
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
