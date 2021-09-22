<template>
    <div class='g-form'>
       <i-form class="label-width-8em"  label-colon="：">
            <Form-Item label="日期快捷方式">
                <date-picker @show-date="getFilterTime"></date-picker>
            </Form-Item>
            <Form-Item label="日期">
                <date-picker @show-date="getFilterTime" :show-quick-way="false" ></date-picker>
            </Form-Item>
        </i-form>
    </div>
</template>

<script>
import datePicker from '_c/picker/date-picker'
export default {
  components: {
    datePicker
  },
  data () {
    return {

    }
  },
  methods: {
    getFilterTime (value) {
      console.log(value)
    }

  }

}
</script>
