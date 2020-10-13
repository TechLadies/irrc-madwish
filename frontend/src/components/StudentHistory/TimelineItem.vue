<template>
    <ul>
        <li v-for="item in timeline" :key="item.index">
            <div id="date">{{item.date}} </div>
            <!-- Length of vertical line changes based on position in array-->
            <div class="firstline" v-if="item.index==0"></div>
            <div class="lastline" v-else-if="item == timeline[timeline.length -1]"></div>
            <div class ="line" v-else></div>
            <!-- If a student has dropped out, white dot is rendered -->
            <div class="whitedot" v-if="item.status == 3"></div>
            <div class ="dot" v-else></div>
            <div id="description"> {{item.description}} </div>
        </li>
    </ul>
</template>

<script>
export default {
    name: "TimelineItem",
    props: {
        index: Number,
        date: Date,
        description: String,
        status: Number
    },
    data() { 
        return {

            timeline: [
            {
                index: 0,
                date: "Mar 20 2020",
                description: "Dropped out of Madwish",
                status: 3, // Dropped out
                // Status numbers should be lined up with the backend model later on. 
                
            },
            
            {
                index: 1,
                date: "Feb 20 2020",
                description: "Matched to @Praveen Kumar",
                status: 2, // Matched
                
            },
            {
                index: 2,
                date: "Feb 12 2020",
                description: "Screened by @Ruchi",
                status: 1 // Unmatched
            },
            {
                index: 3,
                date: "Jan 20 2020",
                description: "Joined Madwish",
                status: 0 // Screening 
            },
            
            ]
        }},
       
}
</script>

<style>
li {
/* Blue Rectangle Background */
    border: 3px solid white;
    width: 384px;
    height: 56px;
    left: 1000px;
    top: 410px;
    

    
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
    /*border: 1px solid green;*/
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