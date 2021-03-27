<template>
  <form @submit.prevent action="">
    <div class="modal-card" style="height: 90%">
      <section class="modal-card-body">
        <b-field label="Are you sure you want to drop out?">
          Confirming will change the {{ isTeacher ? "teacher" : "student" }}'s
          status to dropped out.
        </b-field>
        <b-autocomplete
          v-model="selected.Reason"
          :value="selected.Reason"
          field="Reason"
          ref="reasonComplete"
          :data="filteredReasonDataArray"
          placeholder="Select reason"
          @select="(option) => (selected = option)"
          :open-on-focus="true"
        >
          <template slot="header">
            <a @click="showAddReason">
              <span> Add new... </span>
            </a>
          </template>
        </b-autocomplete>
        <br />
        Select "Others" if you do not wish to specify a reason.
        <br />
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-blue" @click="toDroppedOut()">Confirm</button>
      </footer>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "ModalDroppedOut",
  props: {
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
  async mounted() {
    this.getDroppedReasons();
  },
  methods: {
    ...mapActions([
      "updateStudentStatus",
      "updateTeacherStatus",
      "getDroppedReasons",
      "addDroppedReason",
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
        },
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
