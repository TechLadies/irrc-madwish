<template>
    <div class ="Timeline">
        <div class="TimelineItem" v-for="(item, index) in items" :key="index">
                <div id="date"> {{item.date}} </div>
                <!-- Length of vertical line changes based on position in array-->
                <div class="firstline" v-if="index == 0"></div>
                <div class="lastline" v-else-if="index == items.length - 1"></div>
                <div class ="line" v-else></div>
                <!-- If a student has dropped out, white dot is rendered -->
                <div class="whitedot" v-if="item.status == 3"></div>
                <div class ="dot" v-else></div>
                <div id="description"> {{item.description}} </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "Timeline",
    props: {
        items: {
            type: Array,
            default: () => []
            /*
            * item: { date: Date, description: String, status: Number }
            */ 
        }
    }
    
    
}
</script>

<style>
.TimelineItem {
/* Blue Rectangle Background */
    border: 3px solid white;
    width: 384px;
    height: 56px;
    overflow: auto;
    
/* Primary Light */

    background: #F0FCFF;
    border-radius: 4px;
    
/*Font styling*/
    font-size: 14px;
    line-height: 20px;

/* identical to box height, or 143% */
    display: flex;
    align-items: center;

/* Font colour: Primary Dark */
    color: #2F4858; 

    }


#date {
    margin: auto;
    margin-right: 9px;
    width: 85px; /* deviated from Figma*/
    height: 20px;
    
}
#description {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 24px;
    margin-left: 9px;
    width: 225px;
    height: 40px;
}
.dot {
    height: 16px;
    width: 16px;
    background: #2F4858;
    border-radius: 50%;
    text-align: centre;
    z-index: 2;
}

.whitedot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    text-align: centre;
    z-index: 2;


    /* White */

    background: #FFFFFF;
    /* Primary Dark */

    border: 3px solid #2F4858;
    box-sizing: border-box;
}

.line {
    background: #2F4858;
    width:1px;
    height:56px;
    position:absolute;
    left: 146px;
    z-index: 0;
    }

.firstline {
    background:  #2F4858;
    width:1px;
    height:35px;
    margin-top: 20px;
    position:absolute;
    left: 146px;
    z-index:1;
    }

.lastline {
    background:  #2F4858;
    width:1px;
    height:35px;
    margin-bottom: 24px;
    position:absolute;
    left: 146px;
    z-index:1;
    }
</style>