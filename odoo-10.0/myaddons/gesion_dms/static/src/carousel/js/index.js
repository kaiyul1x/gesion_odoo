$.fn.extend({
    treed: function (o) {
      
      var openedClass = 'glyphicon-minus-sign';
      var closedClass = 'glyphicon-plus-sign';
      
      if (typeof o != 'undefined'){
        if (typeof o.openedClass != 'undefined'){
        openedClass = o.openedClass;
        }
        if (typeof o.closedClass != 'undefined'){
        closedClass = o.closedClass;
        }
      };
      
        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");
        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul
            branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.addClass('branch');
            branch.on('click', function (e) {
                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().toggle();
                }
            })
            branch.children().children().toggle();
        });
        //fire event from the dynamically added icon
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
        //fire event to open branch if the li contains an anchor instead of text
        tree.find('.branch>a').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});

Array.prototype.insertion_sort = function() {
  var i,j;
  for(i = 1;i < this.length; i++){
    for(j = 0;j<i;j++){
      if(this[j].sequence>this[i].sequence){
        this.splice(j,0,this[i]);
        this.splice(i+1,1);
        break;
      }
    }
  }
  return this;
};

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

$(function(){
	//TODO call api to get real data
	//Fake Data
	let fakeData = {
		"id": 1, //项目id
		"name": "测试项目", //项目名称
		"tasks": [
			{
				"id": 1,//任务id
				"sequence": "1",//任务序号
				"name": "印度古尔冈项目任务1",//任务名称
				"parent_id": null,//父任务id
				"hierarchy": 1,//层级 1 - 10
				"code": "HB17025",//任务编号
				"is_new": true, // 新添加项目
				"data": {
					"designer": "张三", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 75,//QAQC评级(0-100)
				}
			},
			{
				"id": 2,//任务id
				"sequence": "1.3",//任务序号
				"name": "印度古尔冈项目任务1,3",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 2, //层级 1 - 10
				"code": "HB17025",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": -1,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 85,//QAQC评级(0-100)
				}
			},
			{
				"id": 3,//任务id
				"sequence": "1.2",//任务序号
				"name": "印度古尔冈项目任务1.2",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 2, //层级 1 - 10
				"code": "HB17025",//任务编号
				"is_new": true, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.2,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 95,//QAQC评级(0-100)
				}
			},
			{
				"id": 4,//任务id
				"sequence": "1.1.2",//任务序号
				"name": "印度古尔冈项目任务1.1.2",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 3, //层级 1 - 10
				"code": "HB17024",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.32,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			},
			{
				"id": 4,//任务id
				"sequence": "1.1.3.2",//任务序号
				"name": "印度古尔冈项目任务1.1.3.2",//任务名称
				"parent_id": "3",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "HB17014",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 64,//QAQC评级(0-100)
				}
			},
			{
				"id": 5,//任务id
				"sequence": "1.1.1",//任务序号
				"name": "印度古尔冈项目任务1.1.1",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 3, //层级 1 - 10
				"code": "HB11014",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": -6,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 68,//QAQC评级(0-100)
				}
			},
			{
				"id": 6,//任务id
				"sequence": "1.1.3.1",//任务序号
				"name": "印度古尔冈项目1.1.3.1",//任务名称
				"parent_id": "3",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "HB11014",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.72,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			},
			{
				"id": 7,//任务id
				"sequence": "1.1",//任务序号
				"name": "印度古尔冈项目1.1",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 2, //层级 1 - 10
				"code": "HB11014",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 87,//QAQC评级(0-100)
				}
			},
			{
				"id": 8,//任务id
				"sequence": "1.1.1.2",//任务序号
				"name": "印度古尔冈项目1.1.1.2",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "HB11114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 96,//QAQC评级(0-100)
				}
			},
			{
				"id": 9,//任务id
				"sequence": "1.1.6",//任务序号
				"name": "印度古尔冈项目1.1.6",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 3, //层级 1 - 10
				"code": "HB31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 92,//QAQC评级(0-100)
				}
			},
			{
				"id": 19,//任务id
				"sequence": "1.1.2.1",//任务序号
				"name": "印度古尔冈项目1.1.2.1",//任务名称
				"parent_id": "2",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "HA31114",//任务编号
				"is_new": true, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 62,//QAQC评级(0-100)
				}
			},
			{
				"id": 29,//任务id
				"sequence": "1.1.3",//任务序号
				"name": "印度古尔冈项目1.1.3",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 3, //层级 1 - 10
				"code": "AA31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 78,//QAQC评级(0-100)
				}
			},
			{
				"id": 59,//任务id
				"sequence": "1.1.1.3",//任务序号
				"name": "印度古尔冈项目1.1.1.3",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "AA31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 0,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			},
			{
				"id": 51,//任务id
				"sequence": "1.1.5",//任务序号
				"name": "印度古尔冈项目1.1.5",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 3, //层级 1 - 10
				"code": "AA31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": -13,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			},
			{
				"id": 99,//任务id
				"sequence": "1.1.2.2",//任务序号
				"name": "印度古尔冈项目1.1.2.2",//任务名称
				"parent_id": "2",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "VA31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.12,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			},
			{
				"id": 199,//任务id
				"sequence": "1.1.1.1",//任务序号
				"name": "印度古尔冈项目1.1.1.1",//任务名称
				"parent_id": "1",//父任务id
				"hierarchy": 4, //层级 1 - 10
				"code": "QA31114",//任务编号
				"is_new": false, // 新添加项目
				"data": {
					"designer": "李四", //设计人
					"progress": 0.1123,//任务进度
					"man_hours": 72,//人工时
					"labor_cost": 230,//人工费用
					"labor_cost_unit": 22,//人工费用单价
					"doc_code": "HB1705-MT-TJ11-01",//文档图纸编号
					"doc_count": 5,//图纸数量
					"equivalent_a1": 1.25,//折合A1
					"plan_start_date": "2018-3-13",//计划开始时间
					"actual_start_date": "2018-3-13",//实际开始时间
					"plan_end_date": "2018-3-13",//计划完成时间
					"forcast_end_date": "2018-3-13",//预期完成时间
					"actual_end_date": "2018-3-13",//实际开始时间
					"days_ahead": 3,//提前天数
					"remark": "已完成",//备注
					"qaqc_level": 5,//QAQC评级(0-100)
				}
			}
		]
	};

	// let data = fakeData;
	var navDone = false; // check if nav tree is ok
	var minRows = 10; // the min of data row
	var $mq = null;

	var rowColors = ['#00b79a', '#ade6fe', '#c6ffff', '#ffffcf']

	function getStars(qa) {
		let star = '';
		let icon = {
			'icon': '',
			'style': ''
		};
		if (qa < 60) {
			star = '<div><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-red.png">',
				'style': 'color:red;font-weight:bold;'
			}
		}
		else if (qa>60 && qa<=65) {
			star = '<div><img src="./img/star-half.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-orange.png">',
				'style': 'color:#d39f2d;font-weight:bold;'
			}
		} else if (qa>65 && qa<=70) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-orange.png">',
				'style': 'color:#d39f2d;font-weight:bold;'
			}
		} else if (qa>70 && qa<=75) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-half.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-orange.png">',
				'style': 'color:#d39f2d;font-weight:bold;'
			}
		} else if (qa>75 && qa<=80) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-half.png"><img src="./img/star-empty.png"><img src="./img/star-empty.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-orange.png">',
				'style': 'color:#d39f2d;font-weight:bold;'
			}
		} else if (qa>80 && qa<=85) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-half.png"><img src="./img/star-empty.png"></div>'
		} else if (qa>85 && qa<=90) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-empty.png"></div>'
		} else if (qa>90 && qa<=95) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-half.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-green.png">',
				'style': 'color:#44bb5e;font-weight:bold;'
			}
		} else if (qa>95 && qa<=100) {
			star = '<div><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"><img src="./img/star-full.png"></div>'
			icon = {
				'icon': '<img class="icon-face" src="./img/face-flag.png">',
				'style': 'color:#44bb5e;font-weight:bold;'
			}
		}
		return {
			'star': star,
			'icon': icon
		};
	}
	
	function showTasks(tasks, id) {
		$('.scroll__content').html('');
		//!id show all tasks
		let result = {};
		let html = '';
		result = id ? tasks.filter(function(t) { return t.sequence.startsWith(id)}) : tasks;
		//order data by SEQ
		result = result.insertion_sort();

		// generate Nav items
		if (!navDone) 
			genNav(result, tasks);

		for ( let r of result) {
			let days_ahead_c = '';
			// set days_ahead style
			if (r.data.days_ahead > 0) {
				days_ahead_c = '-g';
			} else if (r.data.days_ahead < 0) {
				days_ahead_c = '-r';
			}

			// set stars
			let star = getStars(r.data.qaqc_level).star;
			let icon = getStars(r.data.qaqc_level).icon
			// set row color
			let rowColor = 'white';
			if (r.hierarchy < 5) {
				rowColor = rowColors[r.hierarchy - 1];
			}

			//set code style
			let codeStyle = 'text-align: left;'
			if (r.hierarchy > 3) {
				codeStyle = 'text-align: right;'
			}
			
			html += '<ul style="background: ' +rowColor+ '">' + '<li>' + r.sequence + '</li>' + '<li style="width: 50px">' + r.hierarchy + '</li>' + '<li style="width: 50px">' + r.id + '</li>' + '<li class="w-200" style="'+icon.style + codeStyle +'">'+ icon.icon + r.code + '</li>' + '<li class="w-200">' + r.name + '</li>' + '<li>' + r.data.man_hours + '</li>' + '<li>' + r.data.plan_end_date + '</li>' + '<li>' + r.data.actual_end_date + '</li>' + '<li> <div class="t-progress"><div style="width:'+r.data.progress * 100+'%" class="b'+days_ahead_c+'">' + r.data.progress * 100 + '%' + '</div></div></li>' + '<li>' + r.data.doc_count + '</li>' + '<li>' + r.data.equivalent_a1 + '</li>' + '<li class="c'+days_ahead_c+'">' + r.data.days_ahead + '</li>' + '<li>' + r.data.designer + '</li>' + '<li>' + r.data.remark + '</li>' + '<li>' + r.data.labor_cost + '</li>' + '<li>' + star + '</li>' + '</ul>'
		}

		$('.scroll__content').html(html);

		setMarquee(result);
	}

	function arrHasSubItems(item, arr) {
		let result = arr.find(function(e){
			return e.sequence.startsWith(item);
		})

		return result
	}

	function genNav(result, tasks) {
		let sectionsOne = result.filter(function(item) {
			return item.hierarchy == 1;
		})
		let sectionsTwo = result.filter(function(item) {
			return item.hierarchy == 2;
		})
		let sectionsThree = result.filter(function(item) {
			return item.hierarchy == 3;
		})
		let sectionsFour = result.filter(function(item) {
			return item.hierarchy == 4;
		})

		let html = '';

		for (var i=0; i< sectionsOne.length; i++) {
			html += '<li> <span style="background: '+rowColors[0]+'" class="seq-item" data-seq="'+sectionsOne[i].sequence+'">' + sectionsOne[i].sequence + '</span>';
				if (arrHasSubItems(sectionsOne[i].sequence, sectionsTwo)) {
					html += '<ul>';
					for (var j=0; j < sectionsTwo.length; j++) {
						//if (sectionsTwo[j].sequence.startsWith( sectionsOne[i].sequence + '.')) {
							html += '<li><span style="background: '+rowColors[1]+'" class="seq-item" data-seq="'+sectionsTwo[j].sequence+'">' + sectionsTwo[j].sequence + '</span>';
								if (arrHasSubItems(sectionsTwo[j].sequence, sectionsThree)) {
									html += '<ul>';
									for (var k=0; k< sectionsThree.length; k++) {
										//if (sectionsThree[k].sequence.startsWith( sectionsTwo[j].sequence + '.')) {
											html += '<li><span style="background: '+rowColors[2]+'" class="seq-item" data-seq="'+sectionsThree[k].sequence+'">' + sectionsThree[k].sequence + '</span>';
											if (arrHasSubItems(sectionsThree[k].sequence, sectionsFour)) {
												html += '<ul>';
												for (var l=0; l< sectionsFour.length; l++) {
													if (sectionsFour[l].sequence.startsWith( sectionsThree[k].sequence + '.')) {
														html += '<li><span style="background: '+rowColors[3]+'" class="seq-item" data-seq="'+sectionsFour[l].sequence+'">' + sectionsFour[l].sequence + '</span>';
														html += '</li>'
													}
												}
												html += '</ul>';
											}
											html += '</li>'
										//}
									}
									html += '</ul>';
								}
						//}
					}
					html += '</ul>';
				}
			html += '</li>';
		}
		
		$('#SEQ').html(html);
		$('#SEQ').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});
		navDone = true;
		$('.seq-item').click(function(){
			showTasks(tasks, $(this).data('seq'));
			console.log($(this).data('seq'))
		});
	}

	function init() {
		var project_id = Number(getUrlParam('project_id'));
		$.ajax({
				url: '/gesion_json_api/carousel_data',
				type: "POST",
				dataType: 'json',
				beforeSend: function(xhr){xhr.setRequestHeader('Content-Type', 'application/json');},
				data: JSON.stringify({
					jsonrpc: "2.0",
					method: "call",
					params: {
						context: {},
						project_id: project_id
					},
					id: null
				}),
				success: function (success_data) {
					console.log(success_data);
					let data = success_data.result;
					//set project title
					$('.project__title span').html(data.name);

					//toggle nav
					$('.project__nav li').click(function(){
						$('.project__nav li').removeClass('active');
						$(this).addClass('active');
					});

					//display all tasks
					showTasks(data.tasks, null);

					$('.backtoProjects').click(function(){
						//back to project list
					});
				},
				error: function (err) {
					console.log(err)
				}
			}).done(function(done){
				console.log(done)
			});
	}

	function setMarquee(tasks) {
		if ($mq) {
			$mq.marquee('destroy');
			$('.play, .pause').removeClass('active');
		}
			
		if (tasks.length <= minRows)
			return;
		//marquee
		$mq = $('.marquee').marquee();
		$mq.marquee('pause');

		$('.play').click(function(){
			$mq.marquee('resume');			
		});

		$('.pause').click(function(){
			$mq.marquee('pause');			
		});
	}

	init();

})
