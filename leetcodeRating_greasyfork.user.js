// ==UserScript==
// @name         LeetCodeRating｜显示力扣周赛难度分
// @namespace    https://github.com/zhang-wangz
// @version      2.1.3
// @license      MIT
// @description  LeetCodeRating 力扣周赛分数显现，支持所有页面评分显示
// @author       小东是个阳光蛋(力扣名)
// @leetcodehomepage   https://leetcode.cn/u/runonline/
// @homepageURL  https://github.com/zhang-wangz/LeetCodeRating
// @contributionURL https://www.showdoc.com.cn/2069209189620830
// @run-at       document-end
// @match        *://*leetcode.cn/*
// @grant        GM_xmlhttpRequest
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM_openInTab
// @grant        GM_notification
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @connect      zerotrac.github.io
// @connect      raw.gitmirror.com
// @connect      raw.githubusercontents.com
// @connect      raw.githubusercontent.com
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/layer.min.js
// @grant        unsafeWindow
// @note         2022-09-07 1.1.0 支持tag页面和题库页面显示匹配的周赛分难度
// @note         2022-09-07 1.1.0 分数数据出自零神项目
// @note         2022-09-07 1.1.1 修改一些小bug
// @note         2022-09-07 1.1.2 合并难度和周赛分，有周赛分的地方显示分数，没有则显示难度
// @note         2022-09-07 1.1.3 处理报错信息，净化浏览器console面板
// @note         2022-09-08 1.1.4 problems页面增加难度分显示
// @note         2022-09-08 1.1.5 修复tag页面跳转problems页面bug
// @note         2022-09-08 1.1.6 增加描述，更新插件范围为全体界面，在其他界面时删除功能优化性能
// @note         2022-09-08 1.1.7 增强数据管理，每天只获取一遍分数数据，优化效率
// @note         2022-09-09 1.1.8 修复pb页面点击下一页难度分没有变化的bug
// @note         2022-09-09 1.1.9 修复pb页面当出现会员题，点击上下页出现的bug
// @note         2022-09-09 1.1.10 修复pb页面点击评论/题解再点回题目描述，难度分消失的bug
// @note         2022-09-09 1.2.0 修改pb UI，和题库页面保持一致，有难度分直接替换原本的难度标识
// @note         2022-09-09 1.2.1 增加对应周赛链接
// @note         2022-09-09 1.2.2 在具体问题页面，翻译成英文后，数据消失，是因为只保存了中文，增加英文对应数据
// @note         2022-09-10 1.2.3 修复在具体问题页面，快速切换导致的数据缺失问题
// @note         2022-09-11 1.2.4 重构所有实现，取消所有依赖包优化性能，同步优化未知周赛时pb页面隐藏周赛链接
// @note         2022-09-11 1.2.5 fix 缓存
// @note         2022-09-11 1.2.6 fix当 hover题目后面的反馈按钮的时候,会不断的添加周赛link的bug
// @note         2022-09-11 1.2.7 更新具体问题页面， 题目侧边弹出页难度分显示
// @note         2022-09-12 1.2.8 重构数据标识为题目id，因为lc不计算剑指offer，lcp这种题号，id作为标识更加准确些
// @note         2022-09-12 1.2.9 修改数据唯一标识，使得用户数据缓存更新
// @note         2022-09-12 1.2.10 修复刷新机制导致的bug
// @note         2022-09-14 1.3.0 支持company页面
// @note         2022-09-14 1.3.1 支持力扣复制时去除署名
// @note         2022-09-14 1.3.2 修复力扣新增的题库和tag页面 设置按钮里点击显示企业之后出现的bug
// @note         2022-09-22 1.3.3 增加具体问题页面竞赛题属于Q几
// @note         2022-10-08 1.3.4 题库页面增加灵茶の试炼按钮
// @note         2022-10-08 1.3.5 更换灵茶按钮颜色使得更加美观
// @note         2022-10-08 1.3.6 增加problem_list页面的分数展示
// @note         2022-10-09 1.3.7 使用document-end功能，去除加载上的1s延迟并且增加脚本更新机制
// @note         2022-10-09 1.3.8 更新connect list
// @note         2022-10-09 1.3.9 增加时间戳使GM_xmlhttpRequest缓存机制失效
// @note         2022-10-09 1.3.10 修正时间戳标识
// @note         2022-10-10 1.4.0 增加首页近日灵茶
// @note         2022-10-10 1.4.1 修复更新频率
// @note         2022-10-10 1.4.2 修改layer名称
// @note         2022-10-11 1.4.3 修复难度数据过长和page页面名称，考虑到github文件加载缓存机制，更换检查频率到首页
// @note         2022-10-11 1.4.4 修复灵茶里面特殊字符<造成的显示问题
// @note         2022-10-12 1.4.5 修复company页面
// @note         2022-10-13 1.4.6 修复因为缓存导致可能一天出现两次不同灵茶的问题
// @note         2022-10-13 1.4.7 修复脚本版本bug
// @note         2022-10-19 1.4.8 兼容新版pb内测页面
// @note         2022-10-19 1.4.9 版本获取github CDN网站维护，更新使用原生网站
// @note         2022-10-31 1.4.10 修复之前就有的缺陷，当周赛在中文站最早的第83周赛之前时，跳转到英文站
// @note         2022-10-31 1.5.0 cdn网站维护结束，还原为cdn使用，同时修复灵茶抓取格式，如果不存在该url，就不读取
// @note         2022-11-11 1.5.1 增加首页搜索页面的题目难度分并且修复新版题目页面难度分，同时整理代码结构
// @note         2022-11-12 1.5.2 整理目录结构
// @note         2022-11-14 1.5.3 修复版本目录结构
// @note         2022-11-14 1.5.4 修复layer弹出窗关闭功能
// @note         2022-11-22 1.5.5 修复当获取茶数据为空时改为默认值处理
// @note         2022-11-22 1.5.6 修复当获取茶数据为空时改为默认值处理
// @note         2022-12-07 1.5.7 修改获取rating分数也使用cdn方式
// @note         2022-12-21 1.5.8 跟随新版ui页面设计进行修改
// @note         2022-12-29 1.5.9 修复已知问题
// @note         2022-12-29 1.6.0 修复力扣开启darkmode时候，提示语显示异常
// @note         2022-12-31 1.6.1 使新版ui中题目提交记录界面趋向于旧版设计
// @note         2022-12-31 1.6.2 修复版本异常
// @note         2023-01-05 1.6.3 修改cdn访问方式和频率
// @note         2023-01-05 1.6.4 修改cdn地址避免检测访问频率
// @note         2023-01-05 1.6.5 修改更新时候打开的js地址，避免不能访问github的人无法更新插件
// @note         2023-01-24 1.6.6 1.题单页面与refine-leetcode插件兼容性修复 2. 增加题目页面refine-leetcode的计时器功能拦截开关
// @note         2023-01-24 1.6.7 删除无效打印
// @note         2023-01-24 1.6.9 增加各页面功能开关，同时修复部分页面评分不显示的bug
// @note         2023-01-25 1.6.10 修复若干bug，优化代码逻辑结构
// @note         2023-01-25 1.7.0 修复页面url改变时，循环添加事件监听导致的页面宕机问题
// @note         2023-02-01 1.7.3 拦截功能修改
// @note         2023-02-01 1.7.4 增加题目页面新旧版ui切换，让没参加内测的伙伴一起测试
// @note         2023-02-01 1.7.5 修复:插件的新旧版ui切换不影响力扣官方的按钮切换
// @note         2023-02-10 1.7.6 更新:插件拦截计时器功能默认不开启
// @note         2023-02-10 1.7.7 更新:增加题库页面去除vip题目显示功能，解决各部分插件冲突并优化
// @note         2023-02-11 1.7.8 更新:修复新功能去除vip题目显示缺陷，优化部分代码
// @note         2023-02-12 1.7.10 更新:去除拦截力扣api安全检测机制的功能，修复更新操作
// @note         2023-02-12 1.8.0 题库页面去除用户vip校验检查，不影响评分显示
// @note         2023-02-13 1.8.1 增加新功能模拟真实oj环境,去除拦截计时器功能
// @note         2023-02-17 1.8.2 修复力扣ui变更失效的功能
// @note         2023-02-20 1.8.3 增加力扣纸片人功能
// @note         2023-02-20 1.8.4 油猴官方不允许引入github js文件, 集成纸片人js到脚本当中
// @note         2023-02-20 1.8.5 修复引入js导致的bug
// @note         2023-02-21 1.8.6 使旧版题目页面NEW按钮可以移动避免遮挡其余页面元素，同时优化代码设计
// @note         2023-03-06 1.8.7 完善了一下灵茶页面和纸片人设计
// @note         2023-03-06 1.8.8 (版本号忘记改了)
// @note         2023-03-06 1.8.9 修复灵茶页面设计导致的竞赛页面异常
// @note         2023-03-07 1.8.10 修复因cdn.jsdelivr.net被dns污染而导致部分地区无法加载灵茶页面的问题
// @note         2023-03-13 1.9.0 修复因为评分数据对应的cdn域名变化导致edge等部分类chrome浏览器无法加载数据的问题
// @note         2023-03-14 1.9.1 不再屏蔽user报错信息展示，方便提issue时提供截图快速排查问题
// @note         2023-04-04 1.9.2 增加早8晚8自动切换lc dark模式功能
// @note         2023-04-06 1.9.3 增加新版学习计划的评分显示
// @note         2023-04-06 1.9.4 修复新版学习计划的评分显示，增加学习计划侧边栏评分显示
// @note         2023-04-11 1.9.5 修复因灵茶试炼文档变更导致的错误
// @note         2023-04-21 1.9.6 1.增加javascript分类之后将灵茶表格链接移动至灵茶题目中状态那一框 2.学习计划页面增加storm的算术评级字段
// @note         2023-05-04 1.9.7 修复新版学习计划因为黑暗模式切换导致的错误
// @note         2023-05-07 1.9.8 去除官方新版题目提交新增的备注按钮(太丑了),恢复插件原样
// @note         2023-05-12 1.9.9 增加新版在题目提交页面的时候自动切换tab title与题目描述页一致
// @note         2023-05-12 1.9.10 1.鉴于经常有dns被污染导致cdn访问不了的情况，开放vpn开关，如果开了vpn使用原生地址更好 2.题目提交页面去除插件使用的备注，保留官方的，遵守策略
// @note         2023-05-16 1.10.0 修复因官方ui变化新版ui不显示分数的问题
// @note         2023-05-19 1.10.1 修复因官方ui变化新版ui不显示分数的问题
// @note         2023-05-24 1.10.2 修复界面不一致导致的一些问题
// @note         2023-05-24 1.10.3 修复界面不一致导致的一些问题
// @note         2023-05-29 1.10.4 解决新版ui提交备注页面ui覆盖问题
// @note         2023-05-31 1.10.5 解决新版ui学习计划获取rating分数未击中题目难度显示undefined问题
// @note         2023-06-07 1.10.6 阻止新版题目页面输入代码时候的自动联想，因为有些实在不符合规则但还是会跳联想
// @note         2023-06-07 1.10.7 修复新bug
// @note         2023-06-19 1.10.8 修复新旧版切换ui更新导致的问题，更新纸片人一言api
// @note         2023-07-06 1.10.9 修复新旧版切换ui更新导致的问题
// @note         2023-07-06 1.10.10 不再强行控制新旧ui切换,导入leetcode自身切换机制
// @note         2023-07-11 2.0.0 题目提交页面ui修正
// @note         2023-07-11 2.0.1 题目页面ui修正
// @note         2023-07-16 2.0.2 题目页提交页面按钮独立, 修复流动布局造成的问题
// @note         2023-08-14 2.0.3 去除版本更新后已经无用的功能
// @note         2023-08-22 2.0.4 题目页面流动布局难度分修正
// @note         2023-08-23 2.0.5 题目页面流动布局存在不会自动排版的问题,导致点开相关流动布局之后元素位置紊乱,防止相应问题产生,挪移最后插入的周赛链接位置
// @note         2023-08-31 2.0.6 修复流动ui导致的一些问题, 增加流动ui下,题目页侧边栏分数显示
// @note         2023-08-31 2.0.7 修复流动ui导致的一些问题, 增加流动ui下,题目页侧边栏分数显示,更新机制问题修复
// @note         2023-09-01 2.0.8 修复ui变化导致的侧边栏相关问题
// @note         2023-09-01 2.0.9 修复ui变化导致的首页界面变化问题
// @note         2023-09-27 2.0.10 增加插件群聊信息, 有问题的可以加群询问问题, 企鹅群号, 654726006
// @note         2023-10-06 2.1.0 win平台题目页面部分信息显示不全的bug修复
// @note         2023-11-06 2.1.1 根据力扣ui变化, 修改部分功能的实现, 主要影响学习计划页面,pblist页面,题目边栏页面
// @note         2023-12-11 2.1.2 根据力扣ui变化, 修改部分功能的实现, 并优化题库页灵茶数据每日不统一的问题
// @note         2023-12-11 2.1.3 修复题目页左侧栏目刷新的bug问题
// ==/UserScript==

(function () {
    'use strict';

    let version = "2.1.3-lite"

    let allPage = {
        switchName: 'switchpbRepo',
        name: 'all',
        urlList: ['https://leetcode.cn/problemset/.*'],
        handler: getData
    }
    let tagPage = {
        switchName: 'switchtag',
        name: 'tag',
        urlList: ['https://leetcode.cn/tag/.*'],
        handler: getTagData
    }
    let pbPage = {
        switchName: 'switchpb',
        name: 'pb',
        urlList: ['https://leetcode.cn/problems/[^/]*/$', 'https://leetcode.cn/problems/[^/]*/description/$'],
        handler: getpb
    }
    let searchPage = {
        switchName: 'switchsearch',
        name: 'search',
        urlList: ['https://leetcode.cn/search/.*'],
        handler: getSearch
    }

    const pageList = [allPage, tagPage, pbPage, searchPage]

    // req相关url
    const chContestUrl = "https://leetcode.cn/contest/"
    const zhContestUrl = "https://leetcode.com/contest/"

    // rank 相关数据
    let t2rate = JSON.parse(GM_getValue("t2ratedb", "{}").toString())
    // 题目名称-id ContestID_zh-ID
    let pbName2Id = JSON.parse(GM_getValue("pbName2Id", "{}").toString())
    let preDate = GM_getValue("preDate", "")
    // level数据
    let levelData = JSON.parse(GM_getValue("levelData", "{}").toString())
    // 是否使用动态布局
    let localVal = localStorage.getItem("used-dynamic-layout")
    let isDynamic = localVal !== undefined ? localVal.includes("true") : false

    // 刷新菜单
    Script_setting()
    // 注册urlchange事件
    initUrlChange()



    // css 渲染
    $(document.body).append(`<link href="https://cdn.bootcdn.net/ajax/libs/layer/3.1.1/theme/default/layer.min.css" rel="stylesheet">`)

    // 监听urlchange事件定义
    function initUrlChange() {
        const oldPushState = history.pushState
        const oldReplaceState = history.replaceState

        history.pushState = (...args) => {
            oldPushState.apply(history, args)
            window.dispatchEvent(new Event('urlchange'))
        }

        history.replaceState = (...args) => {
            oldReplaceState.apply(history, args)
            window.dispatchEvent(new Event('urlchange'))
        }

        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('urlchange'))
        })
    }


    let rakingUrl = "https://raw.gitmirror.com/zerotrac/leetcode_problem_rating/main/data.json"
    let levelUrl = "https://raw.gitmirror.com/zhang-wangz/LeetCodeRating/main/stormlevel/data.json"

    // 获取必须获取的数据
    getNeedData()

    // 菜单方法定义
    function Script_setting(){
        let menu_ALL = [
            ['switchpbRepo', 'pbRepo function', '题库页周赛难度评分(不包括灵茶)', true, false],
            ['switchpb', 'pb function', '题目页周赛难度评分', true, true],
            ['switchsearch', 'search function', '题目搜索页周赛难度评分', true, false],
            ['switchtag', 'tag function', 'tag题单页周赛难度评分(动态规划等分类题库)', true, false],
            ['switchpblist', 'pbList function', 'pbList题单页评分', true, false],
        ], menu_ID = [], menu_ID_Content = [];
        for (const element of menu_ALL){ // 如果读取到的值为 null 就写入默认值
            if (GM_getValue(element[0]) == null){GM_setValue(element[0], element[3])};
        }
        registerMenuCommand();

        // 注册脚本菜单
        function registerMenuCommand() {
            if (menu_ID.length > menu_ALL.length){ // 如果菜单ID数组多于菜单数组，说明不是首次添加菜单，需要卸载所有脚本菜单
                for (const element of menu_ID){
                    GM_unregisterMenuCommand(element);
                }
            }
            for (let i=0;i < menu_ALL.length;i++){ // 循环注册脚本菜单
                menu_ALL[i][3] = GM_getValue(menu_ALL[i][0]);
                let content = `${menu_ALL[i][3]?'✅':'❎'} ${ menu_ALL[i][2]}`
                menu_ID[i] = GM_registerMenuCommand(content, function(){ menu_switch(`${menu_ALL[i][0]}`,`${menu_ALL[i][1]}`,`${menu_ALL[i][2]}`,`${menu_ALL[i][3]}`)});
                menu_ID_Content[i] = content
            }
            menu_ID[menu_ID.length] = GM_registerMenuCommand(`🏁 当前版本 ${version}`, function () {window.GM_openInTab('https://greasyfork.org/zh-CN/scripts/450890-leetcoderating-%E6%98%BE%E7%A4%BA%E5%8A%9B%E6%89%A3%E5%91%A8%E8%B5%9B%E9%9A%BE%E5%BA%A6%E5%88%86', {active: true,insert: true,setParent: true});});
            menu_ID_Content[menu_ID_Content.length] = `🏁 当前版本 ${version}`
            menu_ID[menu_ID.length+1] = GM_registerMenuCommand(`🏁 企业群号 654726006`, function () {});
            menu_ID_Content[menu_ID_Content.length+1] = `🏁 654726006`
        }

        //切换选项
        function menu_switch(name, ename, cname, value){
            if(value == 'false'){
                GM_setValue(`${name}`, true);
                registerMenuCommand(); // 重新注册脚本菜单
                location.reload(); // 刷新网页
                GM_notification({text: `「${cname}」已开启\n`, timeout: 3500}); // 提示消息
            } else {
                GM_setValue(`${name}`, false);
                registerMenuCommand(); // 重新注册脚本菜单
                location.reload(); // 刷新网页
                GM_notification({text: `「${cname}」已关闭\n`, timeout: 3500}); // 提示消息
            }
            registerMenuCommand(); // 重新注册脚本菜单
        }
    }


    // 获取数字
    function getcontestNumber(url) {
        return parseInt(url.substr(15));
    }

    // 获取时间
    function getCurrentDate(format) {
        let now = new Date();
        let year = now.getFullYear(); //得到年份
        let month = now.getMonth(); //得到月份
        let date = now.getDate(); //得到日期
        let hour = now.getHours(); //得到小时
        let minu = now.getMinutes(); //得到分钟
        let sec = now.getSeconds(); //得到秒
        month = month + 1;
        if (month < 10) month = "0" + month;
        if (date < 10) date = "0" + date;
        if (hour < 10) hour = "0" + hour;
        if (minu < 10) minu = "0" + minu;
        if (sec < 10) sec = "0" + sec;
        let time = "";
        // 精确到天
        if (format == 1) {
            time = year + "年" + month + "月" + date + "日";
        }
        // 精确到分
        else if (format == 2) {
            time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
        }
        return time;
    }

    GM_addStyle(`
        .containerlingtea {
            background: rgba(233, 183, 33, 0.2);
            white-space: pre-wrap;
            word-wrap: break-word;
            display: block;
        }
    `)


    // 因为力扣未捕获错误信息，所以重写一下removechild方法
    const removeChildFn = Node.prototype.removeChild;
    Node.prototype.removeChild = function (n) {
        let err = null;
        try {
            err = removeChildFn.call(this, n); // 正常删除
        } catch(error) {
            if(!error.toString().includes("NotFoundError")) console.log("力扣api发生错误: ", error.toString().substr(0, 150))
        }
        return err
    }

    let tFirst, tLast  // all
    function getData(intervalId) {
        console.log("invoke getData")
        let switchpbRepo = GM_getValue(allPage.switchName)
        let arrList = document.querySelectorAll("div[role='rowgroup']")
        let arr = arrList[0]
        for (let ele of arrList) {
            if (ele.childNodes.length !== 0) {
                arr = ele
                break
            }
        }
        // pb页面加载时直接返回
        if (arr === undefined) {
            return
        }
        // 判断已失效，暂时注释，等待后续调整
        // let head = document.querySelector("#__next > div.flex.min-h-screen.min-w-\\[360px\\].flex-col.text-label-1.dark\\:text-dark-label-1 > div.mx-auto.w-full.grow.p-4.md\\:mt-0.md\\:max-w-\\[888px\\].md\\:p-6.lg\\:max-w-screen-xl.mt-\\[50px\\].dark\\:bg-dark-layer-bg.bg-white > div.grid.grid-cols-4.gap-4.md\\:grid-cols-3.lg\\:grid-cols-4.lg\\:gap-6 > div.z-base.col-span-4.md\\:col-span-2.lg\\:col-span-3 > div:nth-child(4) > div.-mx-4.transition-opacity.md\\:mx-0 > div > div > div.border-divider-border-2.dark\\:border-dark-divider-border-2.border-b")
        // if (head == undefined) return
        // let lasthead = head.lastChild
        let lastchild = arr.lastChild
        // 防止过多的无效操作
        // (lasthead && lasthead.textContent.includes("灵茶の试炼")) || head.childNodes.length > 6
        let switchTea = false, switchrealoj = false
        let first = switchTea ? 1 : 0
        if ((!switchpbRepo || (tFirst && tFirst == arr.childNodes[first].textContent && tLast && tLast == lastchild.textContent))
            && (!switchTea || arr.childNodes[0].childNodes[2].textContent == "题解")
            && (!switchrealoj) || lastchild.textContent.includes("隐藏")) {
            return
        }

        t2rate = JSON.parse(GM_getValue("t2ratedb", "{}").toString())
        // console.log(tFirst)
        // console.log(tLast)
        if (switchpbRepo) {
            let allpbHead = document.querySelector("div[role='row']")
            let rateRefresh = false
            let headndidx, acrateidx
            let i = 0
            allpbHead.childNodes.forEach(e => {
                if (e.textContent.includes("难度")) {
                    headndidx = i
                }
                if (e.textContent.includes("通过率")) {
                    acrateidx = i
                }
                if (e.textContent.includes("题目评分")){
                    rateRefresh = true
                }
                i += 1
            })
            // console.log(pbtitleidx)
            let childs = arr.childNodes
            let idx = switchTea ? 1 : 0
            let childLength = childs.length
            for (;idx < childLength;idx++) {
                let v = childs[idx]
                if (!v.childNodes[1]) return
                let t = v.childNodes[1].textContent
                // console.log(t)
                let data = t.split(".")
                let id = data[0].trim()
                let nd = v.childNodes[headndidx].childNodes[0].innerHTML
                if (switchrealoj) {
                    v.childNodes[acrateidx].textContent = "隐藏"
                    v.childNodes[headndidx].textContent = "隐藏"
                    continue
                }
                if (t2rate[id] != undefined && !rateRefresh){
                    nd = t2rate[id]["Rating"]
                    // console.log(nd)
                    v.childNodes[headndidx].childNodes[0].innerHTML = nd
                } else {
                    let nd2ch = { "text-olive dark:text-dark-olive": "简单", "text-yellow dark:text-dark-yellow": "中等", "text-pink dark:text-dark-pink": "困难" }
                    let cls = v.childNodes[headndidx].childNodes[0].getAttribute("class")
                    v.childNodes[headndidx].childNodes[0].innerHTML = nd2ch[cls]
                }
            }
            tFirst = arr.childNodes[first].textContent
            tLast = lastchild.textContent
            console.log("has refreshed problemlist...")
        }

        if(intervalId) {
            clearInterval(intervalId)
        }
    }

    let tagt, tagf;
    function getTagData(intervalId) {
        console.log('invoke getTagData')
        // 筛选更新
        let arr = document.querySelector(".ant-table-tbody")
        let head = document.querySelector(".ant-table-cell")
        if(head === null) return
        head = head.parentNode
        if (tagt && arr.lastChild && tagt === arr.lastChild.textContent
            && tagf && arr.firstChild && tagf === arr.firstChild.textContent) {
            return
        }
        let rateRefresh = false
        // 确认难度序列
        let headndidx
        for (let i = 0; i < head.childNodes.length; i++) {
            let headEle = head.childNodes[i]
            // console.log(headEle.textContent)
            if (headEle.textContent.includes("难度")) {
                headndidx = i
            }
            if (headEle.textContent.includes("题目评分")){
                rateRefresh = true
            }
        }
        let childs = arr.childNodes
        for (const element of childs) {
            let v = element
            if (!v.childNodes[1]) return
            let t = v.childNodes[1].textContent
            let data = t.split(".")
            let id = data[0].trim()
            let nd = v.childNodes[headndidx].childNodes[0].innerHTML
            if (t2rate[id] != undefined && !rateRefresh) {
                nd = t2rate[id]["Rating"]
                v.childNodes[headndidx].childNodes[0].innerHTML = nd
            } else {
                let nd2ch = { "rgba(var(--dsw-difficulty-easy-rgb), 1)": "简单", "rgba(var(--dsw-difficulty-medium-rgb), 1)": "中等", "rgba(var(--dsw-difficulty-hard-rgb), 1)": "困难" }
                let clr = v.childNodes[headndidx].childNodes[0].getAttribute("color")
                v.childNodes[headndidx].childNodes[0].innerHTML = nd2ch[clr]
            }
        }
        if(arr.lastChild) tagt = arr.lastChild.textContent
        if(arr.firstChild) tagf = arr.firstChild.textContent
        console.log("has refreshed...")

        if(intervalId) {
            clearInterval(intervalId)
        }
    }

    function getSearch(intervalId) {
        console.log('invoke getSearch')
        let arr = $("div[role='table']")
        if (arr.length == 0) return
        arr = arr[0].childNodes[1]

        let head = document.querySelector("div[role='row']")
        if (!head) rerurn
        // 确认难度序列
        let rateRefresh = false
        let headndidx
        for (let i = 0; i < head.childNodes.length; i++) {
            let headEle = head.childNodes[i]
            if (headEle.textContent.includes("难度")) {
                headndidx = i
            }
            if (headEle.textContent.includes("题目评分")){
                rateRefresh = true
            }
        }
        if (!arr) return
        let childs = arr.childNodes
        for (const element of childs) {
            let v = element
            if (!v.childNodes[1]) return
            let t = v.childNodes[1].textContent
            let data = t.split(".")
            let id = data[0].trim()
            let nd = v.childNodes[headndidx].childNodes[0].innerHTML
            if (t2rate[id] != undefined && !rateRefresh) {
                nd = t2rate[id]["Rating"]
                v.childNodes[headndidx].childNodes[0].innerHTML = nd
            } else {
                let nd2ch = { "text-green-s": "简单", "text-yellow": "中等", "text-red-s": "困难" }
                let clr = v.childNodes[headndidx].childNodes[0].getAttribute("class")
                v.childNodes[headndidx].childNodes[0].innerHTML = nd2ch[clr]
            }
        }

        if(intervalId) {
            clearInterval(intervalId)
        }
    }

    function getpb(intervalId) {
        console.log("invoke getpb")
        let switchrealoj = GM_getValue("switchrealoj")
        if (isDynamic) {
            // 流动布局逻辑
            let t = document.querySelector(".text-title-large")
            if (t === null) {
                return
            }

            let data = t.textContent.split(".")
            let id = data[0].trim()
            let colorA = ['.text-difficulty-hard', '.text-difficulty-easy', '.text-difficulty-medium']
            let colorSpan;
            for (const color of colorA) {
                colorSpan = document.querySelector(color)
                if (colorSpan) break
            }
            if (!colorSpan) {
                console.log("color ele not found")
                return
            }

            // 统计难度分数并且修改
            let nd = colorSpan.getAttribute("class")
            let nd2ch = {
                "text-difficulty-easy": "简单",
                "text-difficulty-medium": "中等",
                "text-difficulty-hard": "困难"
            }
            if (switchrealoj || (t2rate[id] != undefined)) {
                if (switchrealoj) colorSpan.remove()
                else if (t2rate[id] != undefined) colorSpan.innerHTML = t2rate[id]["Rating"]
            } else {
                for (let item in nd2ch) {
                    if (nd.toString().includes(item)) {
                        colorSpan.innerHTML = nd2ch[item]
                        break
                    }
                }
            }

            // 逻辑，准备做周赛链接,如果已经不存在组件就执行操作
            let url = chContestUrl
            let zhUrl = zhContestUrl
            let tips = colorSpan.parentNode
            let tipsPa = tips.parentNode
            // tips 一栏的父亲节点第一子元素的位置, 插入后变成竞赛信息位置
            let tipsChildone = tipsPa.childNodes[1]
            // 题目内容, 插入后变成原tips栏目
            let pbDescription = tipsPa.childNodes[2]

            if (pbDescription.getAttribute("data-track-load") != undefined) {
                let divTips = document.createElement("div")
                divTips.setAttribute("class", "flex gap-1")
                let abody = document.createElement("a")
                abody.setAttribute("data-small-spacing", "true")
                abody.setAttribute("class", "css-nabodd-Button e167268t1")

                let abody2 = document.createElement("a")
                abody2.setAttribute("data-small-spacing", "true")
                abody2.setAttribute("class", "css-nabodd-Button e167268t1")

                let span = document.createElement("span")
                let span2 = document.createElement("span")
                // ContestID_zh  ContestSlug
                if (t2rate[id] != undefined) {
                    let contestUrl;
                    let num = getcontestNumber(t2rate[id]["ContestSlug"])
                    if (num < 83) {
                        contestUrl = zhUrl
                    } else {
                        contestUrl = url
                    }
                    span.innerText = t2rate[id]["ContestID_zh"]
                    span2.innerText = t2rate[id]["ProblemIndex"]

                    abody.setAttribute("href", contestUrl + t2rate[id]["ContestSlug"])
                    abody.setAttribute("target", "_blank")
                    abody.removeAttribute("hidden")

                    abody2.setAttribute("href", contestUrl + t2rate[id]["ContestSlug"] + "/problems/" + t2rate[id]["TitleSlug"])
                    abody2.setAttribute("target", "_blank")
                    if (switchrealoj) abody2.setAttribute("hidden", true)
                    else abody2.removeAttribute("hidden")
                } else {
                    span.innerText = "对应周赛未知"
                    abody.setAttribute("href", "")
                    abody.setAttribute("target", "_self")
                    abody.setAttribute("hidden", "true")

                    span2.innerText = "未知"
                    abody2.setAttribute("href", "")
                    abody2.setAttribute("target", "_self")
                    abody2.setAttribute("hidden", "true")
                }
                abody.appendChild(span)
                abody2.appendChild(span2)
                divTips.appendChild(abody)
                divTips.appendChild(abody2)
                tipsPa.insertBefore(divTips, tips)
            } else if (tipsChildone.childNodes != undefined
                && tipsChildone.childNodes.length >= 2
                && (tipsChildone.childNodes[1].textContent.includes("Q")
                    || tipsChildone.childNodes[1].textContent.includes("未知"))) {
                let pa = tipsChildone
                let le = pa.childNodes.length
                // 存在就直接替换
                if (t2rate[id] != undefined) {
                    let contestUrl;
                    let num = getcontestNumber(t2rate[id]["ContestSlug"])
                    if (num < 83) {
                        contestUrl = zhUrl
                    } else {
                        contestUrl = url
                    }
                    pa.childNodes[le - 2].childNodes[0].innerText = t2rate[id]["ContestID_zh"]
                    pa.childNodes[le - 2].setAttribute("href", contestUrl + t2rate[id]["ContestSlug"])
                    pa.childNodes[le - 2].setAttribute("target", "_blank")
                    pa.childNodes[le - 2].removeAttribute("hidden")

                    pa.childNodes[le - 1].childNodes[0].innerText = t2rate[id]["ProblemIndex"]
                    pa.childNodes[le - 1].setAttribute("href", contestUrl + t2rate[id]["ContestSlug"] + "/problems/" + t2rate[id]["TitleSlug"])
                    pa.childNodes[le - 1].setAttribute("target", "_blank")
                    if (switchrealoj) pa.childNodes[le - 1].setAttribute("hidden", "true")
                    else pa.childNodes[le - 1].removeAttribute("hidden")
                } else {
                    pa.childNodes[le - 2].childNodes[0].innerText = "对应周赛未知"
                    pa.childNodes[le - 2].setAttribute("href", "")
                    pa.childNodes[le - 2].setAttribute("target", "_self")
                    pa.childNodes[le - 2].setAttribute("hidden", "true")

                    pa.childNodes[le - 1].childNodes[0].innerText = "未知"
                    pa.childNodes[le - 1].setAttribute("href", "")
                    pa.childNodes[le - 1].setAttribute("target", "_self")
                    pa.childNodes[le - 1].setAttribute("hidden", "true")
                }
            }
        } else {
            // 新版逻辑
            let t = document.querySelector(".text-lg")
            if (t === null) {
                return
            }
            // let pb = location.href
            // let titleTag = pb.substring(pb.indexOf("problems")+9, pb.indexOf("description")-1)
            let data = t.textContent.split(".")
            let id = data[0].trim()
            let colorA = ['.text-pink', '.text-olive', '.text-yellow']
            let colorSpan;
            for (const color of colorA) {
                colorSpan = document.querySelector(color)
                if (colorSpan) break
            }
            if (!colorSpan) {
                console.log("color ele not found")
                return
            }
            let pa = colorSpan.parentNode

            // 新版统计难度分数并且修改
            let nd = colorSpan.getAttribute("class")
            let nd2ch = {
                "text-olive dark:text-dark-olive": "简单",
                "text-yellow dark:text-dark-yellow": "中等",
                "text-pink dark:text-dark-pink": "困难"
            }
            if (switchrealoj || (t2rate[id] != undefined)) {
                if (switchrealoj) colorSpan.remove()
                else if (t2rate[id] != undefined) colorSpan.innerHTML = t2rate[id]["Rating"]
            } else {
                for (let item in nd2ch) {
                    if (nd.toString().includes(item)) {
                        colorSpan.innerHTML = nd2ch[item]
                        break
                    }
                }
            }
            // 新版逻辑，准备做周赛链接,如果已经不存在组件就执行操作
            let url = chContestUrl
            let zhUrl = zhContestUrl
            let q = pa.lastChild
            let le = pa.childNodes.length
            if (q.textContent == "") {
                let abody = document.createElement("a")
                abody.setAttribute("data-small-spacing", "true")
                abody.setAttribute("class", "css-nabodd-Button e167268t1")

                let abody2 = document.createElement("a")
                abody2.setAttribute("data-small-spacing", "true")
                abody2.setAttribute("class", "css-nabodd-Button e167268t1")

                let span = document.createElement("span")
                let span2 = document.createElement("span")
                // ContestID_zh  ContestSlug
                if (t2rate[id] != undefined) {
                    let contestUrl;
                    let num = getcontestNumber(t2rate[id]["ContestSlug"])
                    if (num < 83) {
                        contestUrl = zhUrl
                    } else {
                        contestUrl = url
                    }
                    span.innerText = t2rate[id]["ContestID_zh"]
                    span2.innerText = t2rate[id]["ProblemIndex"]

                    abody.setAttribute("href", contestUrl + t2rate[id]["ContestSlug"])
                    abody.setAttribute("target", "_blank")
                    abody.removeAttribute("hidden")

                    abody2.setAttribute("href", contestUrl + t2rate[id]["ContestSlug"] + "/problems/" + t2rate[id]["TitleSlug"])
                    abody2.setAttribute("target", "_blank")
                    if (switchrealoj) abody2.setAttribute("hidden", true)
                    else abody2.removeAttribute("hidden")
                } else {
                    span.innerText = "对应周赛未知"
                    abody.setAttribute("href", "")
                    abody.setAttribute("target", "_self")
                    abody.setAttribute("hidden", "true")

                    span2.innerText = "未知"
                    abody2.setAttribute("href", "")
                    abody2.setAttribute("target", "_self")
                    abody2.setAttribute("hidden", "true")
                }
                abody.appendChild(span)
                abody2.appendChild(span2)
                pa.appendChild(abody)
                pa.appendChild(abody2)
            } else if (q.textContent.charAt(0) == "Q" || q.textContent == "未知") {  // 存在就直接替换
                if (t2rate[id] != undefined) {
                    let contestUrl;
                    let num = getcontestNumber(t2rate[id]["ContestSlug"])
                    if (num < 83) {
                        contestUrl = zhUrl
                    } else {
                        contestUrl = url
                    }
                    pa.childNodes[le - 2].childNodes[0].innerText = t2rate[id]["ContestID_zh"]
                    pa.childNodes[le - 2].setAttribute("href", contestUrl + t2rate[id]["ContestSlug"])
                    pa.childNodes[le - 2].setAttribute("target", "_blank")
                    pa.childNodes[le - 2].removeAttribute("hidden")

                    pa.childNodes[le - 1].childNodes[0].innerText = t2rate[id]["ProblemIndex"]
                    pa.childNodes[le - 1].setAttribute("href", contestUrl + t2rate[id]["ContestSlug"] + "/problems/" + t2rate[id]["TitleSlug"])
                    pa.childNodes[le - 1].setAttribute("target", "_blank")
                    if (switchrealoj) pa.childNodes[le - 1].setAttribute("hidden", "true")
                    else pa.childNodes[le - 1].removeAttribute("hidden")
                } else {
                    pa.childNodes[le - 2].childNodes[0].innerText = "对应周赛未知"
                    pa.childNodes[le - 2].setAttribute("href", "")
                    pa.childNodes[le - 2].setAttribute("target", "_self")
                    pa.childNodes[le - 2].setAttribute("hidden", "true")

                    pa.childNodes[le - 1].childNodes[0].innerText = "未知"
                    pa.childNodes[le - 1].setAttribute("href", "")
                    pa.childNodes[le - 1].setAttribute("target", "_self")
                    pa.childNodes[le - 1].setAttribute("hidden", "true")
                }
            }
        }

        if(intervalId) {
            clearInterval(intervalId)
        }

    }

    function clearAndStart(timeout, isAddEvent) {

        pageList.forEach(page => {
            // 如果存在旧的interval, 需要删除
            let oldIntervalId = GM_getValue(page.name)
            if (oldIntervalId) {
                clearInterval(oldIntervalId)
                GM_deleteValue(page.name)
            }
            let urlNoParam = location.origin + location.pathname
            for (let reg of page.urlList) {
                if (urlNoParam.match(reg) && GM_getValue(page.switchName)) {
                    let intervalId = setInterval(() => {
                        page.handler(intervalId)
                    }, timeout)
                    GM_setValue(page.name, intervalId)
                    break
                }
            }

        })

        if (isAddEvent) {
            window.addEventListener("urlchange", () => {
                clearAndStart(1000, false)
            })
        }
    }

    // 获取界面所需数据, 需要在菜单页面刷新前进行更新
    function getNeedData() {
        console.log("starting get need data")
        // 更新分数数据
        async function getScore() {
            let now = getCurrentDate(1)
            preDate = GM_getValue("preDate", "")
            if (t2rate["tagVersion6"] == undefined || (preDate == "" || preDate != now)) {
                // 每天重置为空
                GM_setValue("pbSubmissionInfo", "{}")
                let res = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "get",
                        url: rakingUrl + "?timeStamp=" + new Date().getTime(),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        onload: function (res) {
                            resolve(res)
                        },
                        onerror: function (err) {
                            console.error(err)
                        }
                    });
                });
                if (res.status === 200) {
                    // 保留唯一标识
                    t2rate = {}
                    pbName2Id = {}
                    let dataStr = res.response
                    let json = eval(dataStr)
                    for (const element of json) {
                        t2rate[element.ID] = element
                        t2rate[element.ID]["Rating"] = Number.parseInt(Number.parseFloat(element["Rating"]) + 0.5)
                        pbName2Id[element.TitleZH] = element.ID
                    }
                    t2rate["tagVersion6"] = {}
                    console.log("everyday getdate once...")
                    preDate = now
                    GM_setValue("preDate", preDate)
                    GM_setValue("t2ratedb", JSON.stringify(t2rate))
                    GM_setValue("pbName2Id", JSON.stringify(pbName2Id))
                }
            }
        }
        getScore()

        // 更新level数据
        async function getPromiseLevel() {
            let week = new Date().getDay()
            if (levelData["tagVersion20"] == undefined || week == 1) {
                let res = await new Promise((resolve, reject) => {
                    GM_xmlhttpRequest({
                        method: "get",
                        url: levelUrl + "?timeStamp=" + new Date().getTime(),
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        onload: function (res) {
                            resolve(res)
                        },
                        onerror: function (err) {
                            console.log('error')
                            console.log(err)
                        }
                    });
                });
                if (res.status === 200) {
                    levelData = {}
                    let dataStr = res.response
                    let json = eval(dataStr)
                    for (const element of json) {
                        if (typeof element.TitleZH == 'string') {
                            let title = element.TitleZH.split(" ").join("")
                            levelData[title] = element
                        }
                    }
                    levelData["tagVersion20"] = {}
                    console.log("every Monday get level once...")
                    GM_setValue("levelData", JSON.stringify(levelData))
                }
            }
        }
        getPromiseLevel()
    }

    // 定时启动函数程序
    clearAndStart(1000, true)
    GM_addStyle(`
        .versioncontent {
            white-space: pre-wrap;
            word-wrap: break-word;
            display: block;
        }
    `)


})();