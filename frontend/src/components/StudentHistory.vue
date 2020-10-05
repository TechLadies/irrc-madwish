<template>
    <div class="card">
        <header> HISTORY </header>
        <div>
            <ul> 
                <li v-for="item in timeline" :key="item.id">
                    {{item.date}} • {{item.description}}
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
                date: "Jan 20 2020",
                description: "Joined Madwish"
            },
            {
                id: 1,
                date: "Feb 02 2020",
                description: "Screened by @Ruchi"
            },
            {
                id: 2,
                date: "Feb 12 2020",
                description: "@Juliette received call from teacher."
            }
            ]
        }
    },
}
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


li {
/* Blue Rectangle Background */
    border: 1px solid blue;
    width: 384px;
    height: 56px;
    left: 1000px;
    top: 410px;
    margin-bottom:10px;
    
/* Primary Light */

    background: #F0FCFF;
    border-radius: 4px;
    
/*Font styling*/
    font-size: 14px;
    line-height: 20px;

/* identical to box height, or 143% */
    display: flex;
    align-items: center;
    text-align: right;

/* Font colour: Primary Dark */
    color: #2F4858; 
    }
</style>