<template>
    <div>
        <city-cascader
            placeholder="请添加区域"
            trigger="click"
            :change-on-select="true"
            :city-value="cityValue"
            @get-value="getCity">
        </city-cascader>
    </div>
</template>

<script>
import cityCascader from '_c/cascader/city-cascader'
export default {
  components: {
    cityCascader
  },
  data () {
    return {
      cityValue: ['130000', '130300', '130304']
    }
  },
  methods: {
    getCity (value, selectedData) {
      console.log(value, selectedData)
    }

  }

}
</script>
