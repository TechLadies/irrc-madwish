<template>
        <ul class="timeline">
            <TimelineItem>
                v-for="(item, index) in items"
                :item="item" :key="index">
            </TimelineItem>
        </ul>
</template>

<script>
import TimelineItem from "./TimelineItem.vue"
export default {
    name: 'TimelineTemplate',
    components: {
        TimelineItem
    },
    props: ['items'],
    events: {
        'delete-item': function() {
            return true; // forward to parent
        }
    }
}
</script>

<style scoped>

</style>