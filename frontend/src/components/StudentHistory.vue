
<template>
    <div class="card">
        <header> HISTORY </header>
        <Timeline :items="items"></Timeline>
    </div>
</template>

<script>
import Timeline from "./StudentHistory/Timeline.vue"
export default {
    name: 'StudentHistory',
    components: {
        Timeline
    },
    data() {
        return {
            items: [
            {
                date: "Mar 20 2020",
                description: "Dropped out of Madwish",
                status: 3, // Dropped out
                // Status numbers should be lined up with the backend model later on. 
            },
            
            {
                date: "Feb 20 2020",
                description: "Matched to @Praveen Kumar",
                status: 2, // Matched
                
            },
            {

                date: "Feb 12 2020",
                description: "Screened by @Ruchi",
                status: 1 // Unmatched
            },
            {

                date: "Jan 20 2020",
                description: "Joined Madwish",
                status: 0 // Screening 
            }
            ]
        }
    }
}
// TODO: Method to sort status changes by date. Will need to take in date, sort entries, then convert dates to strings
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