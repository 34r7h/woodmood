<template>
    <v-card class="ma-2">
        <v-card-text>
            <vue-simple-markdown :source="$store.state.site.contact"></vue-simple-markdown>
        </v-card-text>
    </v-card>
</template>