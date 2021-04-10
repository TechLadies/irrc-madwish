<template>
  <div class="header">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PageHeader",
};
</script>

<style>
.header {
  overflow: hidden;
  background-color: none;
  padding: 20px 10px;
  width: 100%;
  max-height: 10%;
  border-bottom: 1px solid lightgray;
}

.header a {
  float: left;
  color: black;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  line-height: 25px;
  border-radius: 4px;
}

.header a.logo {
  font-size: 25px;
  font-weight: bold;
  cursor: default;
}

/* .header a:hover {
  background-color: #ddd;
  color: black;
} */

.header a.active {
  background-color: dodgerblue;
  color: white;
}

@media screen and (max-width: 500px) {
  .header a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
