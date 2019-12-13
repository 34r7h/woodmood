<template>
    <div>
        <offer :id="$route.params.id" type="tours"/>
    </div>
</template>
<script>
import Offer from '../../../components/Offer'
export default {
    components: {Offer}
}
</script>