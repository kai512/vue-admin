<template>
  <div>
    <editor :model="content" @get-val="handleChange"/>
    <Button @click="changeContent">修改编辑器内容</Button>
  </div>
</template>

<script>
import Editor from '_c/editor'
export default {
  name: 'editor_page',
  components: {
    Editor
  },
  data () {
    return {
      content: '12312323'
    }
  },
  methods: {
    handleChange (html, text) {
      console.log(html)
    },
    changeContent () {
      this.content = '8888888'
    }
  }
}
</script>

<style>

</style>
