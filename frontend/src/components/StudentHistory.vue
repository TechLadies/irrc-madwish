
<template>
<!-- Version 1: Messy code, StudentHistory not broken down into more components. Not great or very readable.-->
    <div class="card">
        <header> HISTORY </header>
        <TimelineItem></TimelineItem>
    </div>
</template>

<script>
import TimelineItem from "./StudentHistory/TimelineItem.vue"
export default {
    name: 'StudentHistory',
    components: {
        TimelineItem
    },
    data() {
       
    },

}
// TODO: Method to sort status changes by date. Will need to take in date, sort entries, then convert dates tp strings
</script>

<style>
.card {
    position:absolute;
    width: 448px;
    height: 600px;
    /* From Figma. Commented for now, or else the card goes really far to the bottom-right.
    left: 968px;
    top: 276px;*/
    padding: 32px;
}

header {
    padding-right: 350px;
    margin-bottom: 12px;

    /* Roboto 12PX REGULAR */

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    

    /* Dark Grey */
    color: #59666E;
    }
</style>