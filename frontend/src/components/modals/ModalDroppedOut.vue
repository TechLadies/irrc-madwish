<template>
    <form action="">
        <div class="modal-card" style="width: auto">
            <section class="modal-card-body">
                <b-field label="Are you sure you want to drop out?">
                    Confirming will change the student's status to dropped out.
                </b-field>
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$emit('close')">Cancel</button>
                <button class="button is-blue" @click="toDroppedOut()">Confirm</button>
            </footer>
        </div>
    </form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: "ModalDroppedOut",
    props: {
        studentID: {
            type: String,
        },
        previousStatusString: {
            type: String,
        }
    },
    methods: {
        ...mapActions(['updateStudentStatus']),
        toDroppedOut() {
            const studentID = parseInt(this.studentID)
            const previousStatusString = this.previousStatusString
            const nextStatusString = "DROPPED OUT"
            const updatedBy = "IRRCAdmin"

            this.updateStudentStatus({
                studentID: studentID,
                previousStatusString: previousStatusString,
                nextStatusString: nextStatusString,
                updatedBy: updatedBy
            })
        },
    }
}
</script>
