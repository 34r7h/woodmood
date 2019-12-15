<template>
    <v-card>
        <v-card-text>
            <vue-simple-markdown :source="$store.state.site.contact"></vue-simple-markdown>
        </v-card-text>
    </v-card>
</template>