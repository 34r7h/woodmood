<template>
    <v-card flat>
      <v-card-text>
        <vue-simple-markdown :source="$store.state.site.partners"></vue-simple-markdown>
        </v-card-text>
    </v-card>
</template>