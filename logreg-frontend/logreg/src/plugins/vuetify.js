import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
//import VueTooltip from 'v-tooltip';

Vue.use(Vuetify);
//Vue.use(VueTooltip);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        dark: false,
        themes: {
            light:{
              primary: '#003459',
              secondary: '#007ea7'
            }
        }
    }
});



