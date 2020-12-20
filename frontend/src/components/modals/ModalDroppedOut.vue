<template>
    <form action="">
        <div class="modal-card" style="height: 90%">
            <section class="modal-card-body">
                <b-field label="Are you sure you want to drop out?">
                    Confirming will change the student's status to dropped out.
                </b-field>
                <b-autocomplete
                    v-model="reason"
                    placeholder="Select reason"
                    :open-on-focus="true"
                    :data="filteredDataObj"
                    field="reason"
                    @select="option => (selected = option)"
                >
                </b-autocomplete>
                <br>
                <br>
                <br>               
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$emit('close')">Cancel</button>
                <button class="button is-blue" @click="toDroppedOut()">Confirm</button>
            </footer>
        </div>
    </form>
</template>

<script>

// TODO: get list of reasons from database
const data = 
    [
        {"reason": "Not available"},
        {"reason": "Not interested"},
        {"reason": "Others"},
    ]

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
    data() {
        return {
            data,
            reason: '',
            selected: null,
            clearable: false
        }
    },
    computed: {
        filteredDataObj() {
            return this.data.filter(option => {
                return (
                    option.reason
                        .toString()
                        .toLowerCase()
                        .indexOf(this.reason.toLowerCase()) >= 0
                )
            })
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

        showAddLanguage() {
            this.$buefy.dialog.prompt({
                message: `Add new language`,
                inputAttrs: {
                placeholder: 'e.g. Italian',
                maxlength: 255,
                },
                confirmText: 'Add',
                onConfirm: async (value) => {
                    console.log('onConfirm')
                }
            })
        }, 
    }
}
</script>
