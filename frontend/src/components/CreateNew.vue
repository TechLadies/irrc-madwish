
<template>
    <div class="modal-card" style="width:auto">
      <header class="modal-card-head modal-head">
        <p class="modal-card-title"></p>
        <button type="button" class="delete" @click="$emit('close')"/>
      </header>
      <section class="modal-card-body">
        <div class="column column-border">
            <div class="column-content-img">
                <img src="../assets/student.png" class="img"/> 
            </div>
            <div class="column-content-button">
                <b-button type="button" class="button-modal" tag="router-link" to="/new-student" @click.native="$emit('close')">New Student</b-button>
            </div>
        </div>
        <div class="column">
            <div class="column-content-img">
                <img src="../assets/teacher.png" class="img"/> 
            </div>
            <div class="column-content-button">
                <b-button type="button" tag="router-link" to="/new-teacher" class="button-modal" @click.native="$emit('close')">New Teacher</b-button>
            </div>
        </div>
      </section>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.modal-card {
    border-radius: 16px
}

.modal-head {
    border-bottom: 0px !important;
    background-color: white !important;
}

.modal-card-body {
    width: 616px
}
.column {
    float: left; 
    width: 50%;
    height: 100%;
}

.column-border {
    border-right: 1px solid #92A3AD;
}
.column-content-img{
    height: 80%;
    text-align: center

}

.column-content-button {
    align-content: center;
    text-align: center
}

.img {
    height: 180px;
    width: 180px
}


.button-modal {
    background-color: #3C4F76 !important;
    color: white !important;
    height: 40px !important;
    width: 160px !important
}




</style>
