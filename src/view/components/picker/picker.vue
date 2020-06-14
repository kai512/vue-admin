<template>
    <div class="filter-box">
        <i-form :label-width="120">
            <Row>
                <i-col span="24">
                    <Form-Item label="日期快捷方式：">
                        <date-picker @show-date="getFilterTime" style="display: inline-block;vertical-align: top;"></date-picker>
                    </Form-Item>
                </i-col>
            </Row>
             <Row>
                <i-col span="24">
                    <Form-Item label="日期：">
                        <date-picker @show-date="getFilterTime" :show-quick-way="false" style="display: inline-block;vertical-align: top;"></date-picker>
                    </Form-Item>

                </i-col>
            </Row>
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
