<template lang="fr">
    <div>
        {{ message| capitalize }}
    </div>
</template>
<script>
export default {
    name : "StablesList",
    data() {
        return {
            selectedStables : undefined,
            showMore : false,
            message : "nothing to show",
            stables : []
        }
    },
    filters: {
        capitalize: function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
        }
    }
}
</script>
<style lang="">
    
</style>