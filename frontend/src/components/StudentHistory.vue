<template>
    <div class="card">
        <header> HISTORY </header>
        <div>
            <ul> 
                <li v-for="item in timeline" :key="item.id">
                    <div id="date">{{item.date}} </div> 
                    <div class="dot"></div>
                    <div id="description"> {{item.description}} </div>
                </li>
                <!--li {{date}} (circle) {{description}}-->
        <!-- div: date; circle; description 
        -->
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
                date: "Feb 20 2020",
                description: "@Juliette received call from teacher. No overflow."
            },
            {
                id: 1,
                date: "Feb 12 2020",
                description: "Screened by @Ruchi"
            },
            {
                id: 2,
                date: "Jan 20 2020",
                description: "Joined Madwish"
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
    padding-left: 32px;
    padding-right: 32px;
    padding-top: 32px;
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
    /*border: 1px solid blue;*/
    width: 384px;
    height: auto;
    left: 1000px;
    top: 410px;
    /* Trying to create vertical space between the <li> elements, but it doesn't show*/
    margin-bottom: 10px;
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
}
</style>