<template>
    <div class="msg-x">
        <!-- 默认宽度520 -->
        <Modal :value="true" title="标题" :width="520">
            <div class="g-form">
                <Form class="label-width-7em" label-colon="：">
                      <FormItem label="房间号">
                        <Input placeholder="请输入"></Input>
                      </FormItem>
                      <FormItem label="楼栋">
                        <Select placeholder="请选择">
                        </Select>
                      </FormItem>
                      <FormItem label="单元">
                        <Select placeholder="请选择">
                        </Select>
                      </FormItem>
                      <FormItem label="产权人姓名">
                        <Input placeholder="请输入"></Input>
                      </FormItem>
                </Form>
            </div>
            <!-- 自定义底部按钮 -->
            <div slot="footer">
                <Button>取消并返回</Button>
                <Button type="primary">确认提交</Button>
            </div>
        </Modal>
        <Modal :value="true" title="新增认证" :width="520">
            <div class="g-card-s">
                <h2 class="g-tit-s">
                    认证人信息<span class="g-tips">弹框表单默认使用1列,默认不设置宽度 520px </span>
                </h2>
                <div class="g-form">
                    <Form class="label-width-7em" label-colon="：">
                          <FormItem label="房间号">
                            <Input placeholder="请输入"></Input>
                          </FormItem>
                          <FormItem label="楼栋">
                            <Select placeholder="请选择">
                            </Select>
                          </FormItem>
                          <FormItem label="单元">
                            <Select placeholder="请选择">
                            </Select>
                          </FormItem>
                          <FormItem label="产权人姓名">
                            <Input placeholder="请输入"></Input>
                          </FormItem>
                    </Form>
                </div>
            </div>
            <div class="g-card-s mt-s">
                <h2 class="g-tit-s">
                    认证人信息
                </h2>
                <div class="g-form">
                    <Form class="label-width-7em" label-colon="：">
                          <FormItem label="房间号">
                            <Input placeholder="请输入"></Input>
                          </FormItem>
                          <FormItem label="楼栋">
                            <Select placeholder="请选择">
                            </Select>
                          </FormItem>
                          <FormItem label="单元">
                            <Select placeholder="请选择">
                            </Select>
                          </FormItem>
                          <FormItem label="产权人姓名">
                            <Input placeholder="请输入"></Input>
                          </FormItem>
                    </Form>
                </div>
            </div>
            <!-- 自定义底部按钮 -->
            <div slot="footer">
                <Button>取消并返回</Button>
                <Button type="primary">确认提交</Button>
            </div>
        </Modal>
        <!-- 无需复制 -->
        <div v-html = '"<style>#app{display: none;}body{background: rgba(0,0,0,.3);overflow-y:auto}</style>"'></div>
        <!-- 无需复制 end-->
    </div>
</template>

<script>
</script>

<!-- 页面预览专用 无需复制以下样式 -->
<style lang="less">
    .v-transfer-dom{
        display: inline-block;
        vertical-align: top;
    }
    .v-transfer-dom .ivu-modal-mask{
        background: none !important;
        display: inline-block;
        vertical-align: top;
        right: auto;
        bottom: auto;
        width: auto;
        height: auto;
    }
    .v-transfer-dom .ivu-modal-wrap{
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin: 8px;
        border-radius: 5px;
    }
</style>
<!-- 页面预览专用 无需复制以上样式 -->



<style lang="less">

</style>
