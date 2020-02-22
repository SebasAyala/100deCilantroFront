<template>
    <v-container>

        <v-card
            :loading="loading"
            class="mb-5"
            max-width="260"
        >
            <v-img
            height="350"
            src="https://i.pinimg.com/originals/92/c8/e0/92c8e00b34fcfdeaf605a0647c21adb3.jpg"
            ></v-img>

            <v-card-title class="py-2">Avengers End-Game</v-card-title>

            <v-card-text class="pb-0">
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">4.5 (413)</div>
            </v-row>
            <v-chip-group
                class="pt-3"
                v-model="selection"
                active-class="deep-purple accent-4 white--text"
                column
            >
                <v-chip small>5:30PM</v-chip>

                <v-chip small>7:30PM</v-chip>

                <v-chip small>8:00PM</v-chip>
            </v-chip-group>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="green accent-3"
            >
                Reservar
            </v-btn>
            </v-card-actions>
        </v-card>

    </v-container>
</template>