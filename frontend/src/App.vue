<template>
  <div id="app">
    <new-student></new-student>
  </div>      
</template>


<script>
import newStudent from "./components/new-student.vue"

export default {
  components: {
    newStudent: newStudent,
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

b {
  font-size: 30px;
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

</style>
