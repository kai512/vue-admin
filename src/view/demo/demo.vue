<template>
  <div class="app-container">
      <!-- 间距 -->
      <!-- ml-s margin left 小
          mt-m margin top 中
          mt-s
          ml-m -->

      <!-- .g-x 大容器 每个页面都需要 -->
      <div class="g-x">
          <div class="g-card ">
               <!-- 全局标题h2.g-tit -->
               <h2 class="g-tit">
                   层级结构
                    <span class="g-tips">1级标题</span>
               </h2>
                <div class="g-card-s">
                    <h2 class="g-tit-s">
                        标题2
                         <span class="g-tips">2级标题(带表格边框)</span>
                    </h2>
                    <div class="g-card-ss">
                        <h2 class="g-tit-ss">
                            标题3
                             <span class="g-tips">3级标题</span>
                        </h2>
                    </div>
                </div>

                <!-- 2级标题(不带边框)no-border -->
                <div class="g-card-s no-border mt-s">
                    <h2 class="g-tit-s">
                        标题2
                         <span class="g-tips">2级标题(不带表格边框)</span>
                    </h2>
                    <div class="g-card-ss">
                        <h2 class="g-tit-ss">
                            标题3
                             <span class="g-tips">3级标题</span>
                        </h2>
                    </div>

                    <!-- TabPane本身无法自适应高度 建议 把内容放在pane-content显隐切换 -->
                    <div class="tabs-card-x mt-m">
                        <Tabs type="card">
                            <TabPane label="标签一"></TabPane>
                            <TabPane label="标签二"></TabPane>
                        </Tabs>
                        <div class="pane-content">
                            页签内容A
                        </div>
                        <div class="pane-content hide">
                            页签内容B
                        </div>
                    </div>
                </div>
          </div>
          <div class="g-card mt-m">
               <!-- 全局标题h2.g-tit -->
               <h2 class="g-tit">
                   步骤条
                    <span class="g-tips">1级标题</span>
               </h2>
               <div class="g-card-s">
                   <h2 class="g-tit-s">
                       水平
                        <span class="g-tips">2级标题</span>
                   </h2>
                   <div class="steps-x">
                       <Steps :current="1">
                           <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                           <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                           <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                           <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                       </Steps>
                   </div>
               </div>
               <div class="g-card-s  mt-s">
                   <h2 class="g-tit-s">
                       竖直
                        <span class="g-tips">2级标题</span>
                   </h2>
                   <div class="flex">
                       <!-- v-middle竖直居中 -->
                       <div class="steps-x v-middle">
                           <Steps :current="1" direction="vertical">
                               <Step title="已完成" content="这里是该步骤的描述信息"></Step>
                               <Step title="进行中" content="这里是该步骤的描述信息"></Step>
                               <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                               <Step title="待进行" content="这里是该步骤的描述信息"></Step>
                           </Steps>
                       </div>

                        <div class="g-form col-1 f1">
                            <!-- label-width 用class 来设置宽度 6em表示6个汉字的宽度 -->
                            <!-- label-colon="："字段冒号 -->
                            <Form class="label-width-7em" label-colon="：">
                                  <FormItem label="房间号">
                                    <Input placeholder="请输入"></Input>
                                  </FormItem>

                                  <FormItem label="房间号">
                                       <!-- class="flex" 单行放多个元素 -->
                                    <div class="flex">
                                        <Input placeholder="请输入"></Input>
                                        <span class="text ml-s">单位</span>
                                    </div>
                                  </FormItem>
                                  <FormItem label="楼栋">
                                    <Select placeholder="请选择">
                                    </Select>
                                  </FormItem>
                                  <FormItem label="单元">
                                       <!-- class="flex" 单行放多个元素 -->
                                    <div class="flex">
                                        <Select placeholder="请选择">
                                        </Select>
                                        <Select class="ml-s" placeholder="请选择">
                                        </Select>
                                    </div>
                                  </FormItem>
                                  <FormItem class="full" label="备注">
                                     <Input :rows="6" type="textarea" placeholder="请输入"/>
                                   </FormItem>
                            </Form>
                        </div>
                   </div>
               </div>
          </div>

          <div class="g-card mt-m">
               <!-- 全局标题h2.g-tit -->
               <h2 class="g-tit">
                   <div class="text">
                       可编辑表单
                        <span class="g-tips">1级标题</span>
                   </div>
                   <div class="right">
                        <Button size="small" type="text" icon="md-create" >编辑</Button>
                        <Button class="ml-s" type="text" size="small" icon="md-trash">删除</Button>
                        <Button type="text" size="small" icon="md-add">新增</Button>
                   </div>
               </h2>
               <div class="g-form col-2">
                   <Form class="label-width-7em" label-colon="：">
                         <FormItem label="房间号">
                           <Input placeholder="请输入">
                               <span slot="append">单位</span>
                           </Input>
                         </FormItem>
                         <FormItem label="楼栋">
                           <Select placeholder="请选择">
                           </Select>
                         </FormItem>
                         <FormItem label="单元">
                              <!-- class="flex" 单行放多个元素 -->
                           <div class="flex">
                               <Select placeholder="请选择">
                               </Select>
                               <Select class="ml-s" placeholder="请选择">
                               </Select>
                           </div>
                           <div class="text-info">注：flex容器包裹单行放多个元素</div>
                         </FormItem>
                         <FormItem label="产权人姓名">
                           <Input placeholder="请输入"></Input>
                         </FormItem>
                         <FormItem label="产权人手机">
                           <Input placeholder="请输入"></Input>
                         </FormItem>
                         <FormItem label="产权人证件号">
                           <Input placeholder="请输入"></Input>
                         </FormItem>
                         <FormItem class="full" label="备注">
                            <Input :rows="6" type="textarea" placeholder="请输入"/>
                            <div class="text-info">注：表单占满一行用FormItem.full</div>
                          </FormItem>
                   </Form>
                   <!-- 表单通用按钮  -->
                   <div class="g-button-x">
                       <Button @click="reset" >返回</Button>
                       <Button class="ml-s" type="primary" @click="query" >确定</Button>
                   </div>
               </div>
          </div>
          <div class="g-card mt-m">
               <!-- 全局标题h2.g-tit -->
               <Tabs value="name1">
                   <TabPane label="楼栋信息" name="name1"></TabPane>
                   <TabPane label="房屋信息" name="name2"></TabPane>
               </Tabs>
               <div class="g-card-s">
                   <h2 class="g-tit-s">
                       <div class="text">
                           只读表单1
                           <span class="g-tips">2级标题</span>
                       </div>
                       <div class="right">
                            <Button size="small" type="text" icon="md-create" >编辑</Button>
                            <Button class="ml-s" type="text" size="small" icon="md-trash">删除</Button>
                            <Button type="text" size="small" icon="md-add">新增</Button>
                       </div>
                   </h2>
                   <div class="g-form col-2">
                       <!-- label-width 用class 来设置宽度 6em表示6个汉字的宽度 -->
                       <!-- label-colon="："字段冒号 -->
                       <Form class="label-width-7em" label-colon="：">
                             <FormItem label="房间号">
                               <Input placeholder="请输入" disabled value="我是只读"></Input>
                             </FormItem>

                             <FormItem label="房间号">
                                  <!-- class="flex" 单行放多个元素 -->
                               <div class="flex">
                                   <Input placeholder="请输入" disabled value="我是只读"></Input>
                                   <span class="text ml-s">并排内容</span>
                               </div>
                               <div class="text-info">
                                   注：flex容器包裹单行放多个元素
                               </div>
                             </FormItem>
                             <FormItem label="房间号">
                               <Input placeholder="请输入" disabled value="我是只读">
                                   <span slot="append">单位</span>
                               </Input>
                             </FormItem>
                             <FormItem label="楼栋">
                               <Select placeholder="请选择" disabled>
                               </Select>
                               <div class="text-info">
                                   注:独栋指产权人有独栋产权。
                               </div>
                             </FormItem>
                             <FormItem label="是否关联">
                               <template>
                                   <i-switch v-model="switch1" @on-change="change" ></i-switch>
                               </template>
                             </FormItem>
                             <FormItem class="full" label="备注">
                                <Input :rows="6" type="textarea" placeholder="请输入" disabled/>
                              </FormItem>
                              <FormItem class="full" label="图片1:1">
                                 <div class="img-list">
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                 </div>
                              </FormItem>
                              <FormItem class="full" label="图片4:3">
                                 <div class="img-list ratio-4-3">
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                 </div>
                              </FormItem>
                              <FormItem class="full" label="图片16:9">
                                 <div class="img-list ratio-16-9">
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                 </div>
                              </FormItem>
                       </Form>
                   </div>
               </div>
               <div class="g-card-s mt-m">
                   <h2 class="g-tit-s">
                       只读表单2
                       <span class="g-tips">2级标题</span>
                   </h2>
                   <!-- readonly 只读表单 -->
                   <div class="g-form col-2 read-only">
                       <Form class="label-width-7em" label-colon="：">
                             <FormItem label="房间号">
                               <div class="right-text">C1</div>
                             </FormItem>
                             <FormItem label="楼栋">
                               <div class="right-text">C1</div>
                             </FormItem>
                             <FormItem label="单元">
                               <div class="right-text">C1</div>
                             </FormItem>
                             <FormItem class="full" label="备注">
                                <div class="right-text">很长的文本输出很长的文本输出很长的文本输出</div>
                              </FormItem>
                              <FormItem class="full" label="图片">
                                 <div class="img-list">
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                     <div class="cell">
                                         <img src="../../assets/images/no-access.png" />
                                     </div>
                                 </div>
                              </FormItem>
                       </Form>
                   </div>
               </div>
               <div class="g-card-s mt-m">
                   <h2 class="g-tit-s">
                       通用空白提示
                       <span class="g-tips">2级标题</span>
                   </h2>
                   <div class="empty-box">
                       <span>暂无数据</span>
                   </div>
               </div>
          </div>

          <div class="g-card mt-m">
               <!-- 全局标题h2.g-tit -->
               <h2 class="g-tit">
                   单列表单
                   <div class="g-tips">1级标题</div>
               </h2>
                <div class="g-form col-1">
                    <!-- label-width 用class 来设置宽度 6em表示6个汉字的宽度 -->
                    <!-- label-colon="："字段冒号 -->
                    <Form class="label-width-7em" label-colon="：">
                          <FormItem label="房间号">
                            <Input placeholder="请输入"></Input>
                          </FormItem>

                          <FormItem label="房间号">
                               <!-- class="flex" 单行放多个元素 -->
                            <div class="flex">
                                <Input placeholder="请输入"></Input>
                                <span class="text ml-s">单位</span>
                            </div>
                          </FormItem>
                          <FormItem label="楼栋">
                            <Select placeholder="请选择">
                            </Select>
                          </FormItem>
                          <FormItem label="单元">
                               <!-- class="flex" 单行放多个元素 -->
                            <div class="flex">
                                <Select placeholder="请选择">
                                </Select>
                                <Select class="ml-s" placeholder="请选择">
                                </Select>
                            </div>
                          </FormItem>
                          <FormItem class="full" label="备注">
                             <Input :rows="6" type="textarea" placeholder="请输入"/>
                           </FormItem>
                    </Form>
                </div>
          </div>
            <!-- mt-m对上间距 -->

      </div>
  </div>
</template>

<script>

export default {
    data () {
        return {
            switch1: false
        }
    },
    methods: {
        change (status) {
            this.$Message.info('开关状态：' + status);
        }
        }

};
</script>
<style lang="less" scoped>
</style>
