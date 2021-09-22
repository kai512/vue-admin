<template>
  <div class="app-container">
      <div class="g-x" id="fullScreenArea">
        <!-- split-x的容器必须有高度 -->
        <div class="g-split">
            <!-- 左侧容器默认设置占位0.16 -->
            <!-- 最小设置200px宽度 -->
            <Split  v-model="split1" min="200">
                <div slot="left" class="split-pane">
                    <div class="g-left-bar">
                        <!-- <Input search placeholder="楼栋/单元/房间" /> -->
                        <div class="left-baer-tit">
                            <span>选择楼栋</span>
                            <Button type="text" icon="md-add">新增</Button>
                        </div>
                        <!-- z-tree样式 -->
                        <div id="memberTree" class="ztree"><li id="memberTree_1" tabindex="0" hidefocus="true" treenode="" class="level0"><span id="memberTree_1_switch" title="" treenode_switch="" class="button level0 switch roots_open"></span><span id="memberTree_1_check" treenode_check="" class="button chk checkbox_false_part"></span><a id="memberTree_1_a" treenode_a="" onclick="" target="_blank" title="办公室" class="level0"><span id="memberTree_1_span" class="node_name">办公室</span></a><ul id="memberTree_1_ul" class="level0 line"><li id="memberTree_2" tabindex="0" hidefocus="true" treenode="" class="level1"><span id="memberTree_2_switch" title="" treenode_switch="" class="button level1 switch center_docu"></span><span id="memberTree_2_check" treenode_check="" class="button chk checkbox_true_full"></span><a id="memberTree_2_a" treenode_a="" onclick="" target="_blank" title="人员1" class="level1"><span id="memberTree_2_span" class="node_name">人员1</span></a></li><li id="memberTree_3" tabindex="0" hidefocus="true" treenode="" class="level1"><span id="memberTree_3_switch" title="" treenode_switch="" class="button level1 switch center_docu"></span><span id="memberTree_3_check" treenode_check="" class="button chk checkbox_true_full"></span><a id="memberTree_3_a" treenode_a="" onclick="" target="_blank" title="人员2" class="level1"><span id="memberTree_3_span" class="node_name">人员2</span></a></li><li id="memberTree_4" tabindex="0" hidefocus="true" treenode="" class="level1"><span id="memberTree_4_switch" title="" treenode_switch="" class="button level1 switch bottom_docu"></span><span id="memberTree_4_check" treenode_check="" class="button chk checkbox_true_full"></span><a id="memberTree_4_a" treenode_a="" onclick="" target="_blank" title="李四" class="level1 curSelectedNode"><span id="memberTree_4_span" class="node_name">李四</span></a></li></ul></li><li id="memberTree_5" tabindex="0" hidefocus="true" treenode="" class="level0"><span id="memberTree_5_switch" title="" treenode_switch="" class="button level0 switch bottom_close"></span><span id="memberTree_5_check" treenode_check="" class="button chk checkbox_false_full"></span><a id="memberTree_5_a" treenode_a="" onclick="" target="_blank" title="财务部" class="level0"><span id="memberTree_5_span" class="node_name">财务部</span></a></li></div>
                        <!--可操作侧栏 z-tree-->
                            <div class="opera-ztree moveable">
                                <ul id="treeLeft" class="ztree left-nav-box">
                                    <li id="treeLeft_1" class="level0" tabindex="0" hidefocus="true" treenode="">
                                        <a id="treeLeft_1_a" class="level0" treenode_a="" onclick="" target="_blank" style="" title="文件夹">
                                            <span id="treeLeft_1_switch" title="" class="button level0 switch noline_open" treenode_switch=""></span>
                                            <span id="treeLeft_1_ico" title="" treenode_ico="" class="button ico_open" style="width:0px;height:0px;"></span>
                                            <span id="treeLeft_1_span" class="node_name">文件夹</span></a>
                                        <ul id="treeLeft_1_ul" class="level0 " style="display:block">
                                        <li id="treeLeft_2" class="level1" tabindex="0" hidefocus="true" treenode="">
                                            <a id="treeLeft_2_a" class="level1 curSelectedNode" treenode_a="" onclick="" target="_blank" style="" title="收件箱">
                                                <span style="display: inline-block;width:10px"></span>
                                                <span id="treeLeft_2_switch" title="" class="button level1 switch noline_open" treenode_switch=""></span>
                                                <span id="treeLeft_2_ico" title="" treenode_ico="" class="button ico_open" style="width:0px;height:0px;"></span>
                                                <!--<span id="treeLeft_2_ico" title="" treenode_ico="" class="button ico_loading" style=""></span>-->
                                                <span id="treeLeft_2_span" class="node_name">收件箱</span>

                                                <div class="opera-btn">
                                                    <span class="del-btn" tit="删除"></span>
                                                </div>
                                            </a>
                                            <ul id="treeLeft_2_ul" class="level1 ">
                                                <li id="treeLeft_3" class="level2" tabindex="0" hidefocus="true" treenode="">
                                                    <a id="treeLeft_3_a" class="level2" treenode_a="" onclick="" target="_blank" style="" title="收件箱1">
                                                        <span style="display: inline-block;width:20px"></span>
                                                        <span id="treeLeft_3_switch" title="" class="button level2 switch noline_docu" treenode_switch=""></span>
                                                        <span id="treeLeft_3_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span><span id="treeLeft_3_span" class="node_name">收件箱1</span>
                                                        <div class="opera-btn">
                                                            <span class="edit" tit="编辑"></span>
                                                            <span class="add" tit="添加"></span>
                                                        </div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li id="treeLeft_4" class="level1" tabindex="0" hidefocus="true" treenode="">
                                            <a id="treeLeft_4_a" class="level1" treenode_a="" onclick="" target="_blank" style="" title="垃圾邮件">
                                                <span id="treeLeft_4_switch" title="" class="button level1 switch noline_docu" treenode_switch=""></span>
                                                <span id="treeLeft_4_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span>
                                                <span id="treeLeft_4_span" class="node_name">垃圾邮件</span></a>
                                        </li>
                                        <li id="treeLeft_5" class="level1" tabindex="0" hidefocus="true" treenode="">
                                            <a id="treeLeft_5_a" class="level1" treenode_a="" onclick="" target="_blank" style="" title="草稿">
                                                <span id="treeLeft_5_switch" title="" class="button level1 switch noline_docu" treenode_switch=""></span>
                                                <span id="treeLeft_5_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span>
                                                <span id="treeLeft_5_span" class="node_name">草稿</span></a>
                                        </li>
                                        <li id="treeLeft_6" class="level1" tabindex="0" hidefocus="true" treenode="">
                                            <a id="treeLeft_6_a" class="level1" treenode_a="" onclick="" target="_blank" style="" title="已发送邮件">
                                                <span id="treeLeft_6_switch" title="" class="button level1 switch noline_docu" treenode_switch=""></span>
                                                <span id="treeLeft_6_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span>
                                                <span id="treeLeft_6_span" class="node_name">已发送邮件</span></a>
                                        </li>
                                        <li id="treeLeft_7" class="level1" tabindex="0" hidefocus="true" treenode="">
                                            <a id="treeLeft_7_a" class="level1" treenode_a="" onclick="" target="_blank" style="" title="已删除邮件">
                                                <span id="treeLeft_7_switch" title="" class="button level1 switch noline_docu" treenode_switch=""></span>
                                                <span id="treeLeft_7_ico" title="" treenode_ico="" class="button ico_docu" style="width:0px;height:0px;"></span>
                                                <span id="treeLeft_7_span" class="node_name">已删除邮件</span></a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!--可操作侧栏end-->

                        <div class="empty-box-s">
                            <span>暂无数据</span>
                        </div>
                    </div>

                </div>
                <div slot="right" class="split-pane">
                    <div class="g-card">
                       <!-- 筛选 容器   固定用 g-filter -->
                       <div class="g-filter">
                            <!-- label-width 用class 来设置宽度 6em表示6个汉字的宽度 -->
                            <!-- 默认3列 -->
                            <Form class="label-width-6em">
                              <FormItem label="房间号">
                                <Input placeholder="请输入"></Input>
                              </FormItem>
                              <FormItem label="楼栋">
                                <Select placeholder="全部"></Select>
                              </FormItem>
                              <FormItem label="单元">
                                <Select placeholder="全部"></Select>
                              </FormItem>
                              <FormItem label="产权人姓名">
                                <Input placeholder="请输入"></Input>
                              </FormItem>
                              <FormItem label="产权人证件号">
                                <Input placeholder="请输入"></Input>
                              </FormItem>
                              <FormItem label="产权人证件号">
                                <Input placeholder="请输入"></Input>
                              </FormItem>
                              <FormItem label="添加时间" class="date-picker-x">
                                  <date-picker defaultType="daterange"></date-picker>
                              </FormItem>
                                <div class="filter-btn">
                                    <Button type="primary" icon="md-search" @click="query" >查询</Button>
                                    <Button class="ml-s" icon="md-sync" @click="reset" >重置</Button>
                                </div>
                            </Form>

                       </div>
                    </div>

                    <div class="g-card mt-m">

                       <div class="g-opera">
                           <Button type="primary" icon="md-add">新增认证</Button>
                           <Button class="ml-s">导入EXCEL</Button>
                           <div class="right">
                            <fullscreen v-model="isFullscreen"  />
                           </div>
                       </div>
                       <div class="g-tips mb-n">表格提示语</div>
                       <div class="g-table">
                            <Table
                              border
                              :columns="columns"
                              :data="tableData"
                            >
                              <template slot-scope="{ row, index }" slot="action">
                                <a href="" class="btn">查看</a>
                                <a href="" class="btn">编辑</a>
                                <a href="" class="btn">删除</a>
                              </template>
                            </Table>
                            <div class="g-page">
                                <Page :total="100" />
                            </div>
                        </div>
                    </div>
                </div>
            </Split>
        </div>
       </div>
  </div>
</template>

<script>
    import Fullscreen from '../../components/main/components/fullscreen/fullscreen.vue'
    import datePicker from '@/components/picker/date-picker'
    export default {
        components: {
            Fullscreen,
            'date-picker': datePicker
        },
        data(){
          const validator = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('Please enter your password again'));
            } else if (value !== this.formCustom.passwd) {
              callback(new Error('The two input passwords do not match!'));
            } else {
              callback();
            }
          }
          return {
            isFullscreen: false,
           // 左侧容器默认设置占位0.16
            split1: 0.16,
            data1: [
              {
                title: 'parent 1',
                expand: true,
                children: [
                  {
                    title: 'parent 1-1',
                    expand: true,
                    children: [
                      {
                        title: 'leaf 1-1-1'
                      },
                      {
                        title: 'leaf 1-1-2'
                      }
                    ]
                  }
                ]
              }
            ],
            listQuery: {
              page: 1,
              limit: 10,
              name: null,
              select: []
            },
            floorList: [],
            // 状态用颜色区分 green orange red gray
            tableData: [
                {
                    c1: 'C1',
                    c2: 'A单元',
                    c3: '301',
                    c4: '<span class="green">成功</span>',
                    c5: '张三',
                    c6: '15148789457',
                    c7: '35848784789877',
                    c8: '-',
                },
                {
                    c1: 'C1',
                    c2: 'A单元',
                    c3: '301',
                    c4: '<span class="orange">警告</span>',
                    c5: '张三',
                    c6: '15148789457',
                    c7: '35848784789877',
                    c8: '-',
                },
                {
                    c1: 'C1',
                    c2: 'A单元',
                    c3: '301',
                    c4: '<span class="red">错误</span>',
                    c5: '张三',
                    c6: '15148789457',
                    c7: '35848784789877',
                    c8: '-',
                },
                {
                    c1: 'C1',
                    c2: 'A单元',
                    c3: '301',
                    c4: '<span class="gray">置灰</span>',
                    c5: '张三',
                    c6: '15148789457',
                    c7: '35848784789877',
                    c8: '-',
                },
                {
                    c1: 'C1',
                    c2: 'A单元',
                    c3: '301',
                    c4: '-',
                    c5: '张三',
                    c6: '15148789457',
                    c7: '35848784789877',
                    c8: '-',
                },
            ],
            columns: [
            {
              title: '楼栋',
              key: 'c1'
            },
            {
              title: '单元',
              key: 'c2'
            },
            {
              title: '房间号',
              key: 'c3'
            },
            {
              type:'html',
              title: '房源认领状态',
              key: 'c4'
            },
            {
              title: '产权人姓名',
              key: 'c5'
            },
            {
              title: '产权人手机号',
              key: 'c6'
            },
            {
              title: '产权人证件号',
              key: 'c7'
            },
            {
              title: '备注',
              key: 'c8'
            },
            {
              title: '操作',
              slot: 'action',
              width: 200,
              align: 'center'
            }],
            total: 1,
            dialogVisible: false,
            titleMap: {
              'addBuilding': '新增楼栋',
              'addUnit': '新增单元',
              'addRoom': '新增房间',
              'detail': '查看房产信息',
              'edit': '更新编辑房产信息'
            },
            dialogState: null,
            addButtonText: '新增楼栋',
            form: {
              name: null,
              check: 1
            },
            formRules: {
              name2: [
                { validator: validator, trigger: 'blur' }
              ],
              name: [
                { required: true, message: '请输入', trigger: 'blur' }
              ]
            },
            buildingList: []
          }

    }
};
</script>
<style lang="less" scoped>

</style>
