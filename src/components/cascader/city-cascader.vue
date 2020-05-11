<template>
    <Cascader v-model="value" :data="data" :disabled="disabled" :size="size" :placeholder="placeholder" :trigger="trigger" :clearable="clearable" :change-on-select="changeOnSelect" @on-change="changeValue"></Cascader>
</template>
<script>	
	import cityData3 from '@/libs/city.data-3.js';
	
    export default {
    	components: {
    	},
        data () {
            return {
                value: this.cityValue || []
            }
        },
        props: {
        	"cityValue": Array,
		   	"size": String,
		   	"placeholder": {
		   		type: String,
		   		default: "请选择城市"
		   	},
		   	"trigger": String,
		   	"changeOnSelect" : Boolean,
			"disabled" : {
		   		type: Boolean,
		   		default: false
		   	},		
		   	"clearable" : true,
		   	data : {
		   		type : Array,
		   		default : function(){
		   			
		   			return cityData3;
		   		}
		   		
		   	},
        },
        watch: {
//      	value(curVal, oldVal) {
//      		this.$emit('get-value', curVal);
//      	},
        	cityValue(curVal) {
        		this.value = curVal;
        	}
       	},
       	methods: {
       		changeValue(value, selectedData) {
       			this.$emit('get-value', value, selectedData);
       		}
       	}
       
    }
</script>
