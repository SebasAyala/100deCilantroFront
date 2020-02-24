import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg',
    },
	theme: {
		themes: {
			light: {
				primary: '#211e32',
				secondary: '#181524',
				accent: '#52bd95',
			},
		},
	},
});
