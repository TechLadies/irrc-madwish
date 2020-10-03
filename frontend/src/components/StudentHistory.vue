<template>

<TimelineTemplate :items="timeline"/>
</template>

<script>
import TimelineTemplate from "./TimelineTemplate.vue"
export default {
    name: 'StudentHistory',
    components: {
        TimelineTemplate
    },
    data() {
        return { 
            timeline: [
            {
                id: 5,
                icon_class: 'glyphicon glyphicon-comment',
                icon_status: '',
                title: 'Admin added a comment.',
                controls: [
                    { 
                        method: 'edit', 
                        icon_class: 'glyphicon glyphicon-pencil' 
                    },
                    { 
                        method: 'delete', 
                        icon_class: 'glyphicon glyphicon-trash' 
                    }
                ],
                created: '24. Sep 17:03',
                body: '<p><i>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, maxime alias nam dignissimos natus voluptate iure deleniti. Doloremque, perspiciatis voluptas dignissimos ex, ullam et, reprehenderit similique possimus iste commodi minima fugiat non culpa, veniam temporibus laborum. Distinctio ipsam cupiditate debitis aliquid deleniti consectetur voluptates corporis officiis tempora minus veniam, accusamus cum optio nesciunt illo nulla odio? Quidem nesciunt, omnis at quo aliquam porro amet fugit mollitia minus explicabo, possimus deserunt rem ut commodi laboriosam quia. Numquam, est facilis rem iste voluptatum. Cupiditate porro fuga saepe quis nulla mollitia, magni dicta soluta distinctio tempore voluptate quo perferendis. Maiores eveniet deleniti, nemo.</i></p>'
            },
            {
                id: 4,
                icon_class: 'glyphicon glyphicon-edit',
                icon_status: 'success',
                title: 'Started editing',
                controls: [],
                created: '24. Sep 14:48',
                body: '<p>Someone has started editing.</p>'
            },
            {
                id: 3,
                icon_class: 'glyphicon glyphicon-hand-right',
                icon_status: 'warning',
                title: 'Message delegated',
                controls: [],
                created: '23. Sep 11:12',
                body: '<p>This message has been delegated.</p>'
            },
            {
                id: 2,
                icon_class: 'glyphicon glyphicon-map-marker',
                icon_status: 'danger',
                title: 'Message approved and forwarded',
                controls: [],
                created: '20. Sep 15:56',
                body: '<p>Message has been approved and forwarded to responsible.</p>'
            },
            {
                id: 1,
                icon_class: 'glyphicon glyphicon-map-marker',
                icon_status: '',
                title: 'Message forwarded for approval',
                controls: [],
                created: '19. Sep 19:49',
                body: '<p>Message has been forwarded for approval.</p>'
            },
            ]
        }
    },
}
</script>

<style>

</style>