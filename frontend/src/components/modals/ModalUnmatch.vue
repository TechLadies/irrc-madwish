<template>
  <form @submit.prevent action="">
    <div class="modal-card" style="height: 90%">
      <section class="modal-card-body">
        <b-field label="Are you sure you want to unmatch?">
          Unmatching a pair would put students and teachers back to the matching
          process or dropped out section depending on the change in status
        </b-field>
        <b-field> Student Name: {{ this.studentName }} </b-field>
        <b-field label="Status">
          <b-select
            placeholder="Select a status"
            v-model="selected.Status"
            :value="selected.Status"
            expanded
            @select="(option) => (selected = option)"
            :open-on-focus="true"
          >
            <option value="UNMATCHED">Unmatched</option>
            <option value="DROPPED OUT">Dropped out</option>
          </b-select>
        </b-field>
        <b-field label="Reason:">
          <b-autocomplete
            v-model="selected.Reason"
            :value="selected.Reason"
            field="Reason"
            ref="reasonComplete"
            :data="filteredReasonDataArray"
            placeholder="Select reason"
            :open-on-focus="true"
          >
            <template slot="header">
              <a @click="showAddReason">
                <span> Add new... </span>
              </a>
            </template>
          </b-autocomplete>
        </b-field>
        <b-field> Teacher Name: {{ this.teacherName }} </b-field>
        <br />
        Select "Others" if you do not wish to specify a reason.
        <br />
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-blue" @click="unmatch">Confirm</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ModalDroppedOut",
  props: {
    teacherName: {
      type: String,
    },
    studentName: {
      type: String,
    },
    studentID: {
      type: Number,
    },
    teacherID: {
      type: Number,
    },
    previousStatusString: {
      type: String,
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reasons: [],
      selected: {
        Reason: "",
        Status: "",
      },
    };
  },
  computed: {
    ...mapGetters(["API_droppedReason"]),
    reason() {
      return this.selected ? this.selected.Reason : "";
    },
    filteredReasonDataArray() {
      return this.API_droppedReason.filter((option) => {
        return option.Reason.toLowerCase().includes(
          this.selected.Reason.toString().toLowerCase()
        );
      });
    },
  },
  mounted() {
    this.getAllStudents();
    this.getAllMatches();
    this.getDroppedReasons();
  },
  methods: {
    ...mapActions([
      "updateStudentStatus",
      "updateTeacherStatus",
      "getDroppedReasons",
      "addDroppedReason",
      "getAllStudents",
      "getAllMatches",
    ]),
    toDroppedOut() {
      const previousStatusString = this.previousStatusString;
      const nextStatusString = "DROPPED OUT";
      const updatedBy = "IRRCAdmin";

      if (this.isTeacher) {
        this.updateTeacherStatus({
          teacherID: this.teacherID,
          previousStatusString: previousStatusString,
          nextStatusString: nextStatusString,
          updatedBy: updatedBy,
          reason: "DROPPED_" + this.reason,
        });
        this.$emit("close");
      } else {
        this.updateStudentStatus({
          studentID: this.studentID,
          previousStatusString: previousStatusString,
          nextStatusString: nextStatusString,
          updatedBy: updatedBy,
          reason: "DROPPED_" + this.reason,
        }).then(() => {
          +this.$emit("close");
        });
      }
    },
    showAddReason() {
      this.$buefy.dialog.prompt({
        message: `Add new reason`,
        inputAttrs: {
          placeholder: "e.g. Course was too challenging",
          value: this.selected.Reason,
          maxlength: 255,
        },
        confirmText: "Add",
        onConfirm: async (value) => {
          this.selected.Reason = value;
          this.addDroppedReason(this.selected.Reason);
          if (this.selected.Status === "UNMATCHED") {
            this.addUnmatchedReason(this.selected.Reason);
          } else if (this.selected.Status === "DROPPED OUT") {
            this.addDroppedReason(this.selected.Reason);
          }
        },
      });
    },
    unmatch() {
      this.updateStudentStatus({
        studentID: this.studentID.toString(),
        previousStatusString: "MATCHED",
        nextStatusString: this.selected.Status,
        updatedBy: "IRRCAdmin",
        reason: this.selected.Status + "_" + this.selected.Reason,
      }).then(() => {
        this.getAllStudents();
        +this.$emit("close");
      });
    },
  },
};
</script>

<style>
.modal-card-body {
  width: auto;
}

.modal-card-foot {
  width: auto;
}
</style>
