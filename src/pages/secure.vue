<template>
    <div>
        <f7-list :inline-labels="$device.desktop" no-hairlines-md>
            <f7-list-item>
                <f7-label>保种员: 剩余空间
                    <f7-badge color="green">1.0TB</f7-badge>
                </f7-label>
                <f7-input type="text" placeholder="Your name" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>过滤种子:</f7-label>
                <f7-input type="select" v-model="display_sr_selected">
                    <option v-for="(sr, index) in display_info" :value="index">{{sr}}</option>
                </f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>
                    已选中: <f7-badge color="blue">{{ vuetable.selectedTo.length==0?'-':vuetable.selectedTo.length }}</f7-badge>
                    总大小 <f7-badge color="blue">{{ vuetable.selectedTotalSize.toFixed(1)+' GB' }}</f7-badge>
                </f7-label>
                <f7-input type="text" placeholder="已选择的种子ID列表" v-model="vuetable.selectedTo" disabled />
            </f7-list-item>
        </f7-list>
        <div class="data-table data-table-init card">
            <div class="card-header">
                <div class="data-table-header">
                    <span class="text-color-gray">选择种子认领/分配/报错，点击种子打开详情</span>
                    <div<!-- class="data-table-links">
                        <a class="link">认 领</a><a class="link">分 配</a>
                </div> -->
                <div class="data-table-actions">
                    <f7-link icon="fas fa-filter fa-lg text-color-red"></f7-link>
                    <f7-link icon="fas fa-sync fa-lg"></f7-link>
                </div>
            </div>
            <div class="data-table-header-selected">
                <div class="data-table-title-selected">
                    <f7-row>
                        <f7-col>
                            <f7-button fill>撤 销</f7-button>
                        </f7-col>
                        <f7-col>
                            <f7-button fill>认 领</f7-button>
                        </f7-col>
                        <f7-col>
                            <f7-button fill color="orange">分 配</f7-button>
                        </f7-col>
                    </f7-row>
                    </f7-segmented>
                </div>
                <div class="data-table-actions">
                    <f7-link icon="fas fa-exclamation-triangle fa-lg" color="orange" title="汇报错误"></f7-link>
                    <f7-link icon="fas fa-ellipsis-v fa-lg"></f7-link>
                </div>
            </div>
        </div>
        <div class="card-content">
            <table>
                <thead>
                    <tr>
                        <th class="checkbox-cell" title="反选">
                            <label class="checkbox">
                                <input type="checkbox"><i class="fas fa-adjust fa-lg" color=""></i>
                            </label>
                            <!-- <f7-checkbox /> -->
                        </th>
                        <th class="label-cell" v-for="item in fields" :key="item.name" :class="(item.name=='id') ? 'sortable-cell sortable-cell-active' : (item.sortField!=undefined) ? 'sortable-cell' : ''" @click="set_sortkey(item.name)">
                            {{item.title}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in querydata.data" :key="item.id">
                        <td class="checkbox-cell">
                            <f7-checkbox @change="check_click(index, item.id, item.size_f)" :id="'check_'+index" :checked="vuetable.selectedIndex.indexOf(index)>-1" />
                        </td>
                        <td class="numeric-cell" :class="(item.is_faulty) ? 'bg-color-orange' : '' " :title="item.faults">
                            <f7-link :href="'https://ourbits.club/details.php?id='+item.id+'&hit=1'" external target="_blank">{{ item.id }}</f7-link>
                        </td>
                        <td class="numeric-cell">{{ item.size_f }}</td>
                        <td class="numeric-cell">{{ item.seeds }}</td>
                        <td class="numeric-cell">
                            <div @click="quick_action(item.id, item.securer_assigned, 'undo')" v-html="srsToIcon(item.securer_assigned)"></div>
                        </td>
                        <td class="numeric-cell">
                            <div @click="quick_action(item.id, item.securer_accepted, 'active-assign')" v-html="srsToIcon(item.securer_accepted)"></div>
                        </td>
                        <td class="numeric-cell">
                            <div @click="quick_action(item.id, item.self_downloaded, 'active-assign')" v-html="srsToIcon(item.self_downloaded)"></div>
                        </td>
                        <td class="numeric-cell" v-html="strToInput(item.desc)"></td>
                        <td class="numeric-cell" v-html="strToInput(item.title)"></td>
                        <td class="numeric-cell">{{ item.seed_since | datefilter }}</td>
                        <td class="numeric-cell">{{ item.download_size }}</td>
                        <td class="numeric-cell">{{ item.download_duration }}</td>
                        <td class="numeric-cell">{{ item.seeding_duration }}</td>
                        <td class="numeric-cell">{{ item.upload_size }}</td>
                        <td class="numeric-cell">{{ item.finishes }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <f7-popover class="popover-menu" id="pop-undo">
        <f7-list>
            undo assign
            <!-- <f7-list-item :title="sr" v-for="(sr, index) in action_data.ourbits_as" :key="index">
                      <f7-label >
                      <a href="#" @click="action_go(action_data.id, sr, 'activate-undo', index, -1)">
                          <i class="fa fa-undo fa-border color-red pull-right"> 撤销</i></a>
                      </f7-label>
                  </f7-list-item> -->
        </f7-list>
    </f7-popover>
    <f7-popover class="popover-menu" id="pop-assign">
        <f7-list>
            assign task
            <!-- <f7-list-item :title="sr" v-for="(sr, index) in action_data.ourbits_se" :key="index">
                      <f7-label >
                      <a href="#" @click="action_go(action_data.id, sr, 'activate', -1, index)">
                          <i class="fa fa-paper-plane-o fa-border color-orange pull-right"> 分配</i></a>
                      </f7-label>
                  </f7-list-item> -->
        </f7-list>
    </f7-popover>
    <f7-popover class="popover-menu" id="pop-ob-id">
        <f7-list>
            <f7-list-item link="/form/" popover-close title="Forms"></f7-list-item>
            <f7-list-item link="#" popover-close :title="'ID: '+seed_selected" @click.native="pop_menu"></f7-list-item>
            <f7-list-item link="#" popover-close>
                <f7-link href="http://www.baidu.com" external target="_blank">External</f7-link>
            </f7-list-item>
            <f7-list-item link="#" popover-close class="panel-open" open-panel="left" title="Side Panels"></f7-list-item>
        </f7-list>
    </f7-popover>
    </div>
</template>
<script>
import { toSmartDate, short_str } from '../assets/js/util';
export default {
    data() {
        return {
            id_select: {},
            seed_selected: -1,
            check_val: false,
            vuetable: {
                selectedTo: [], // selected OB id
                selectedTotalSize: 0, // OB size
                selectedIndex: [], // index of checkboxs
            },
            check_all_checked: false, // 全选按键
            display_info: ['所有未分配的', '保种员认领但没分配的', '组长已分配但没认领的', '所有已分配的', '所有已认领的', '断种的官种', '报错的官种', '已有做种信息的', '有做种但未认领分配的', '已认领但无需下载的', '做种数少且仅分配1人的'],
            display_sr_selected: 0,
            fields: [{
                    name: 'id',
                    title: '种子ID',
                    titleClass: 'label-cell',
                    dataClass: 'numeric-cell',
                    sortField: 'Ob.id',
                    // callback: this.obidCallback,
                },
                {
                    name: 'size_f',
                    title: '大小(GB)',
                    titleClass: 'numeric-cell',
                    dataClass: 'numeric-cell',
                    sortField: 'Ob.size_f',
                },
                {
                    name: 'seeds',
                    title: '做种',
                    titleClass: 'numeric-cell',
                    dataClass: 'numeric-cell',
                    sortField: 'Ob.seeds',
                },
                {
                    name: 'securer_assigned',
                    title: '已分配',
                    titleClass: 'label-cell',
                },
                {
                    name: 'securer_accepted',
                    title: '已认领',
                    titleClass: 'label-cell',
                },
                {
                    name: 'self_downloaded',
                    title: '自行下载',
                    titleClass: 'self_downloaded',
                },
                {
                    name: 'desc',
                    title: 'Description',
                    titleClass: 'label-cell',
                    // callback: this.strToInput,
                    sortField: 'Ob.desc',
                },
                {
                    name: 'title',
                    title: 'Title',
                    titleClass: 'label-cell',
                    // callback: this.strToInput,
                    sortField: 'Ob.title',
                },
                {
                    name: 'seed_since',
                    title: '发布时间',
                    titleClass: 'label-cell',
                    // callback: toSmartDate,
                    sortField: 'Ob.seed_since',
                },
                {
                    name: 'download_size',
                    title: '下载(GB)',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortField: 'ourbits_users.download_size',
                },
                {
                    name: 'download_duration',
                    title: '下载时长',
                    titleClass: 'label-cell tablet-only',
                    sortField: 'ourbits_users.download_duration',
                },
                {
                    name: 'seeding_duration',
                    title: '做种时长',
                    titleClass: 'label-cell tablet-only',
                    sortField: 'ourbits_users.seeding_duration',
                },
                {
                    name: 'upload_size',
                    title: '上传(GB)',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortField: 'ourbits_users.download_size',
                },
                {
                    name: 'finishes',
                    title: '完成次数',
                    titleClass: 'label-cell tablet-only',
                    dataClass: 'numeric-cell',
                    sortField: 'Ob.finishes',
                },
            ],
            sortOrders: {
                'id': { direction: 'desc' }, //  asc or 'desc'
                '__activeField': 'id',
            },
            querydata: {
                "current_page": 1,
                "data": [{
                        "desc": " \u00a0\u5269\u4f59\u65f6\u95f4\uff1a8\u65f610\u5206\u5b98\u65b9\u56fd\u8bed\u4e2d\u5b57\u4f60\u8bf4\u7684\u90fd\u5bf9 \u7b2c\u4e00\u5b63 20171226-20180116 \u7b2c1-4\u671f 2017 | \u8521\u5eb7\u6c38 \u718a\u6893\u6dc7 \u6c88\u68a6\u8fb0 \u9773\u68a6\u4f73 \u8881\u7855 \u5218\u4e5f\u884c",
                        "download_duration": "",
                        "download_size": 0.89,
                        "faults": [],
                        "finishes": 0,
                        "id": 67528,
                        "is_faulty": false,
                        "securer_accepted": ["kevinqq", "samel"],
                        "securer_assigned": ["kevinqq", "samel"],
                        "seed_since": 1516169573,
                        "seeding_duration": "",
                        "seeds": 1,
                        "self_downloaded": [{
                            "download_duration": "",
                            "download_size": 0.89,
                            "finished_since": "",
                            "leechers": 22,
                            "ob_username": "possible964",
                            "seeders": 1,
                            "seeding_duration": "",
                            "status": 3,
                            "upload_size": 0.83
                        }],
                        "size_f": 3.17,
                        "title": "Tell Me Why S01 2017 S01E01-S01E04 1080p WEB-DL AAC H264-OurTV",
                        "upload_size": 0.83
                    },
                    {
                        "desc": " \u00a0\u5269\u4f59\u65f6\u95f4\uff1a6\u65f616\u5206\u5b98\u65b9\u56fd\u8bed\u4e2d\u5b57\u7981\u8f6c\u6211\u662f\u6c5f\u5c0f\u767d \u7b2c11\u96c6 2017 | \u9648\u5f20\u592a\u5eb7 \u4f5f\u5fc3\u7af9 \u674e\u5170\u9675 \u6c88\u5ff5\u5982 \u77b3\u97f3 \u56fe\u7279\u54c8\u8499 \u5c0f\u8fde\u6740 \u53f6\u77e5\u79cb",
                        "download_duration": "42:35",
                        "download_size": 0.3,
                        "faults": [],
                        "finishes": 18,
                        "id": 67523,
                        "is_faulty": false,
                        "securer_accepted": ["kevin", ],
                        "securer_assigned": [],
                        "seed_since": 1516162734,
                        "seeding_duration": "2:20:00",
                        "seeds": 16,
                        "self_downloaded": [{
                            "download_duration": "42:35",
                            "download_size": 0.3,
                            "finished_since": "2\u65f638\u5206",
                            "leechers": 1,
                            "ob_username": "possible964",
                            "seeders": 16,
                            "seeding_duration": "2:20:00",
                            "status": 1,
                            "upload_size": 0.16
                        }],
                        "size_f": 0.3,
                        "title": "I'm Joybo 2017 E11 1080p WEB-DL AAC H264-OurTV",
                        "upload_size": 0.16
                    },
                    {
                        "desc": " \u00a0\u5269\u4f59\u65f6\u95f4\uff1a6\u65f610\u5206\u5b98\u65b9\u56fd\u8bed\u4e2d\u5b57\u54b1\u4eec\u88f8\u718a \u7b2c\u4e00\u5b63 \u516826\u96c6 2015 | \u57c3\u91cc\u514b\u00b7\u57c3\u5fb7\u5c14\u65af\u5766 \u9c8d\u6bd4\u00b7\u83ab\u5c3c\u6c49 \u8fea\u7c73\u7279\u5229\u00b7\u9a6c\u4e01",
                        "download_duration": "2:43:17",
                        "download_size": 2.49,
                        "faults": [],
                        "finishes": 28,
                        "id": 67522,
                        "is_faulty": false,
                        "securer_accepted": ["phil", "lizi"],
                        "securer_assigned": [],
                        "seed_since": 1516162426,
                        "seeding_duration": "40:00",
                        "seeds": 29,
                        "self_downloaded": [{
                            "download_duration": "2:43:17",
                            "download_size": 2.49,
                            "finished_since": "42\u5206",
                            "leechers": 2,
                            "ob_username": "possible964",
                            "seeders": 30,
                            "seeding_duration": "40:00",
                            "status": 2,
                            "upload_size": 3.03
                        }],
                        "size_f": 2.49,
                        "title": "We Bare Bears S01 2015 Complete 1080p WEB-DL AAC H264-OurTV",
                        "upload_size": 3.03
                    },
                    {
                        "desc": " \u00a0\u5269\u4f59\u65f6\u95f4\uff1a5\u65f66\u5206\u5b98\u65b9\u56fd\u8bed\u4e2d\u5b57\u7981\u8f6c\u8d85\u7ea7\u7248\u00b7\u5927\u4e8b\u53d1\u58f0 2017 \u51685\u671f\u5408\u96c6 | \u674e\u5b97\u76db \u674e\u5251\u9752 \u8c2d\u7ef4\u7ef4 Kawa\u4e50\u961f \u5468\u534e\u5065 \u6734\u6811*\u9ad8\u5206\u97f3\u4e50\u8282\u76ee\uff0c\u8c46\u74e3\u8bc4\u52069.7*",
                        "download_duration": "",
                        "download_size": 5.54,
                        "faults": ['no downloading speed for 3 days'],
                        "finishes": 0,
                        "id": 67515,
                        "is_faulty": true,
                        "securer_accepted": [],
                        "securer_assigned": [],
                        "seed_since": 1516158557,
                        "seeding_duration": "",
                        "seeds": 1,
                        "self_downloaded": [{
                            "download_duration": "",
                            "download_size": 5.54,
                            "finished_since": "",
                            "leechers": 82,
                            "ob_username": "possible964",
                            "seeders": 1,
                            "seeding_duration": "",
                            "status": 3,
                            "upload_size": 9.49
                        }],
                        "size_f": 10.03,
                        "title": "The Next Big Thing 2017 Complete 1080p WEB-DL AAC H264-OurTV",
                        "upload_size": 9.49
                    },
                    {
                        "desc": " \u00a0\u5269\u4f59\u65f6\u95f4\uff1a2\u65f615\u5206\u5b98\u65b9\u4e2d\u5b57\u5e7f\u544a\u98ce\u4e91/ \u83dc\u9e1f\u8bc4\u5ba1\u5458(\u53f0)/ \u5e7f\u544a\u796d\uff01\u5514\u5236\uff01(\u6e2f)/ \u5ba1\u5224 \u300c\u6253\u7834\u5e7f\u544a\u5708\u94b1\u89c4\u5219 \u8e22\u7206\u4e1a\u754c\u60ca\u4eba\u5185\u5e55\u300d\u3010\u65e5\u8bed+\u7b80\u7e41\u5b57\u5e55+\u7ae0\u8282\u3011",
                        "download_duration": "5:26:50",
                        "download_size": 7.43,
                        "faults": [],
                        "finishes": 34,
                        "id": 67502,
                        "is_faulty": false,
                        "securer_accepted": [],
                        "securer_assigned": [],
                        "seed_since": 1516148311,
                        "seeding_duration": "1:40:00",
                        "seeds": 33,
                        "self_downloaded": [{
                            "download_duration": "5:26:50",
                            "download_size": 7.43,
                            "finished_since": "1\u65f654\u5206",
                            "leechers": 3,
                            "ob_username": "possible964",
                            "seeders": 32,
                            "seeding_duration": "1:40:00",
                            "status": 2,
                            "upload_size": 7.43
                        }],
                        "size_f": 7.43,
                        "title": "Judge 2014 1080p BluRay DD5.1 x264-PbK",
                        "upload_size": 7.43
                    }
                ],
                "from": 1,
                "last_page": 45,
                "per_page": "5",
                "to": 5,
                "total": 221
            },

        }
    },
    filters: {
        datefilter(para) {
            return toSmartDate(para);
        }
    },
    mounted() {
        this.$axios.get('/user?ID=12345')
            .then(function(response) {
                console.log(response);
            })
            .catch(function(response) {
                console.log(response);
            });
    },
    methods: {
        check_click(index, id, size) {
            if (this.vuetable.selectedTo.indexOf(id) > -1) {
                // de-select row
                this.vuetable.selectedTo.splice(this.vuetable.selectedTo.indexOf(id), 1)
                this.vuetable.selectedIndex.splice(this.vuetable.selectedIndex.indexOf(index), 1)
                this.vuetable.selectedTotalSize -= size
                // this.check_all_checked = false
            } else {
                // if (!(id in this.vuetable.selectedTo)) {
                this.vuetable.selectedTo.push(id)
                this.vuetable.selectedIndex.push(index)
                this.vuetable.selectedTotalSize += size
                // }
            }
            // console.log(JSON.stringify(this.vuetable))
        },
        check_all_click() {
            this.check_all_checked = !this.check_all_checked
            // if (this.check_all_checked) {
            //     this.vuetable.selectedIndex.length = 0
            //     this.vuetable.selectedTo.length = 0
            //     this.vuetable.selectedTotalSize = 0
            //   }
            //         this.vuetable.selectedIndex = [...Array(this. querydata.data.length)].map((v,k) => k)
        },
        pop_menu() {
            console.log('popover menu clicked')
        },
        seeds_menu(id) {
            console.log(`seed id clicked: ${id}`)
            this.seed_selected = id
        },
        srsToIcon(value) {
            let srs = '';
            let tag = ''
            value.forEach((sr, index, array) => {
                if (sr.ob_username) {
                    tag = (sr.status == 3) ? `<span title="${sr.ob_username} 下载中..." class="text-color-blue"><i class="fas fa-spinner fa-spin"></i>${sr.ob_username.substr(0,3)}</span>` : (sr.status == 1) ? `<span title="${sr.ob_username} 已下载，未作种" class="text-color-orange"><i class="fas fa-download"></i>${sr.ob_username.substr(0,3)}</span>` : `<span title="${sr.ob_username} 做种中..." class="text-color-green"><i class="fas fa-upload"></i>${sr.ob_username.substr(0,3)}</span>`
                    // srs +=`${tag}${sr.ob_username} `
                    srs += tag + '<br>'
                } else srs += `<span title="${sr} 无状态" class="text-color-gray"><i class="fas fa-check"></i>${sr.substr(0,3)}<span><br />`
            })
            return srs
        },
        strToInput(value) {
            let title = value
            value = value.replace('官方DIY', '').replace(' 剩余时间：', '').replace('禁转', '').replace(' [热门] ', '').replace('官方', '').replace('中字', '').replace('国语', '')
            return `<span title="${title}"><input type="input" value="${value}" /></span>`
        },
        quick_action(id, srs, type) {
            console.log(`id: ${id}, srs: ${srs}, type: ${type}`)
            let button_list = [],
                dialog_title = '<span class="text-color-orange">撤销任务</span>',
                dialog_icon = 'fa-undo'
            if (type == 'active-assign') {
                dialog_title = '分配任务'
                dialog_icon = 'fa-paper-plane'
            }
            srs.forEach((sr, index, array) => {
                let ob_username = sr
                if (ob_username.ob_username) ob_username = ob_username.ob_username
                button_list.push({
                    text: `<span>${ob_username} <i class="fas ${dialog_icon} color-red"></i></span>`,
                    onClick: () => this.assign_task(id, ob_username, type)
                })
            })
            this.$f7.dialog.create({
                title: dialog_title,
                // closeByBackdropClick not working in 2.0.6, temp fix:
                // node_modules/framework7/dist/framework7.esm.bundle.js
                // var Dialog = {
                // closeByBackdropClick: true,
                buttons: button_list,
                verticalButtons: true,
            }).open();
        },
        assign_task(id, sr, type) {
            console.log(`id: ${id}, sr: ${sr}, type: ${type}`)
        },
        set_sortkey(sort_key) {
            console.log(`sort_key: ${sort_key}`)
            // if sort-key was clicked before
            if (this.sortOrders[sort_key]) {
                // same key
                if (sort_key == this.sortOrders.__activeField)
                    this.sortOrders[sort_key].direction = (this.sortOrders[sort_key].direction == 'desc') ? 'asc' : 'desc'
            }
            // if key never clicked before
            else {
                this.sortOrders[sort_key] = { direction: 'desc' }
            }
            this.sortOrders.__activeField = sort_key
            console.log(JSON.stringify(this.sortOrders))
        },
    }
};
</script>
