<template>
    <div class="card">
        <header> HISTORY </header>
        <div>
        
            <ul> 
                <div class = "whiteline"></div>
                <li v-for="item in timeline" :key="item.id">
        
                    <div id="date">{{item.date}} </div>
                    <div class="firstline" v-if="item.id==0"></div>
                    <div class="lastline" v-else-if="item == timeline[timeline.length -1]"></div>
                    <div class ="line" v-else></div>
                    <div class="whitedot" v-if="item.status == 3"></div>
                    <div class ="dot" v-else></div>

                    <div id="description"> {{item.description}} </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'StudentHistory',
    components: {
    },
    data() {
        return {

            timeline: [
            {
                id: 0,
                date: "Mar 20 2020",
                description: "Dropped out of Madwish",
                status: 3, // Dropped out
                // Status numbers should be lined up with the backend model later on. 
                
            },
            
            {
                id: 1,
                date: "Feb 20 2020",
                description: "Matched to @Praveen Kumar",
                status: 2, // Matched
                
            },
            {
                id: 2,
                date: "Feb 12 2020",
                description: "Screened by @Ruchi",
                status: 1 // Unmatched
            },
            {
                id: 3,
                date: "Jan 20 2020",
                description: "Joined Madwish",
                status: 0 // Screening 
            }
            ]
        }
    },

}
// TODO: Method to sort status changes by date. Will need to take in date, sort entries, then convert dates tp strings
</script>

<style>
.card {
    position:absolute;
    width: 448px;
    height: 600px;
    /*left: 968px;
    top: 276px;*/
    padding: 32px;
    /*border: 1px solid red*/
}

header {
    /*border: 1px solid red;*/
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


li {
/* Blue Rectangle Background */
    border: 3px solid white;
    width: 384px;
    height: 56px;
    left: 1000px;
    top: 410px;
    /* Trying to create vertical space between the <li> elements, but it doesn't show*/
    margin-bottom: 50px;

    
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
   /*border: 1px solid red;*/
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