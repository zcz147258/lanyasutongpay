<template>
	<view class="content">
		<view>
			<button @click="open" >蓝牙连接</button>
			
			<button @click="Serial" >串口连接</button>
			
			
			<button @click="Port" >打印小票</button>
			<button @click="Lable" >打印标签</button>
			<button @click="State" >打印机状态</button>
			
			<button @click="Dis" >断开打印机</button>
			<text>{{title}}</text>
		</view>
	</view>
</template>


<script>
	
	// require插件名称  
	const gp= uni.requireNativePlugin('Html5app-Gprinter'); 
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			open(){
				
				//蓝牙连接打印机
				const _this=this;
				gp.BluetoothPort({setBackgroundColor:"#2088d2"},result=>{
					_this.title=JSON.stringify(result);
				});
				
			},
			Port()
			{  
				//打印小票
				const _this=this;
				
				//制作小票格式， 
                var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				//空行
				line={};  //每添加一个一行字之前,清空一下
				line.text="";
				line.center="center";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				//第一行
				line={};  //每添加一个一行字之前,清空一下
				line.text="道路停车缴费告知单";
				line.center="center";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//省略号
				line={};  //每添加一个一行字之前,清空一下
				line.text=".................................";
				line.center="center";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//车牌号码
				line={};  //每添加一个一行字之前,清空一下
				line.text="车牌号码: " + "皖Q47057 ";
				line.center="left";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//泊位编号
				line={};
				line.text="泊位编号: " + "36941";
				line.center="left";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//停车路段
				line={};
				line.text="停车路段: " + "国顺路(韩谊路-环城东路)";
				line.center="left";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//服务工号
				line={};
				line.text="服务工号: " + 60;
				line.center="left";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//计费时间
				line={};
				line.text="计费时间: " + "2020-04-02 12:58:13";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				//缴费二维码
				line={};
				line.text="缴费二维码";
				line.center="center";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				 //加入二维码
				line={};
				var Path="https://www.sutongiot.com/wx/streamNativeBarcode?orderId=158589718315278810"; // Logo图片
				line.image=Path;
				line.width="350";
				line.center="center";
				line.bottom="1";
				data.push(line);
				//叙述
				line={};
				line.text="工作日白天按时计费，首半小时3元，超过半小时每30分钟4元，双休日，节假日白天及黑夜按次计费，每次5元。未尽事宜，请详见停车路段收费牌。";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				//公众号二维码
				line={};
				line.text="公众号二维码";
				line.center="center";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//二维码2
				//加入图片
				line={};
				var Path="/static/gzh1.jpg"; // Logo图片
				line.image=Path;
				line.width="350";
				line.center="center";
				line.bottom="1";
				data.push(line);
				//欢迎关注停车公众号
				line={};
				line.text="欢迎关注停车公众号";
				line.center="left";
				line.font="normal";
				line.bottom="0";
				data.push(line);
				//温馨提示
				line={};
				line.text="温馨提示:如果有欠费、逃费行为，可能被纳入不良记者档案，影响个人信用征信。";
				line.center="left";
				line.font="normal";
				line.bottom="1";
				data.push(line);
				// console.log("printdata:"+JSON.stringify(data));
				
				//打印小票
				gp.Print({"ESC":data},result=>{
					
					_this.title=JSON.stringify(result);
	
				});
				
				
			},
			Lable(){
				
				//制作标签格式， 
				var data=[];  //定义一个数组
				var line={};  //每添加一个，代表一行字
				
				//设置标签纸大小
				line={};
				line.width=40; //mm
				line.height=30; //mm
				line.gap=3; //标签纸之间，间隙长度 mm
				line.page=1; //打印几份
				data.push(line); //每添加一个，代表一行字
				
			
				
				//添加图片
				line={};
				line.image="http://www.html5-app.com/gprinter.png";
				line.x=30;
				line.y=20;
				line.width=70;
				data.push(line);
				
				
					//添加文字
				line={};
				line.text="HTML5+混合APP开发社区";
				line.rotation=0;
				line.x=30;
				line.y=100;
				line.xscal=1;
				line.yscal=1;
				data.push(line); //每添加一个，代表一行字
				
				//添加条型码
				line={};
				line.barcode="2019563352660";
				line.x=30;
				line.y=160;
				line.type="CODE128";
				line.height=50;
				line.readable=true;
				line.rotation=0;
				data.push(line);
				
				 //加入二维码
				line={};
				line.qrcode="www.html5-app.com";
				line.x=190;
				line.y=20;
				line.width=3
				line.rotation=0;
				data.push(line);

				const _this=this;
				
				console.log("data:"+JSON.stringify(data));
				
				gp.Print({"TSC":data},result=>{
					
					_this.title=JSON.stringify(result);
					
				});
				
				
			},
			State(){
				//查询找印机状态
				const _this=this;
				gp.PrinterState({},result=>{
					
					_this.title=JSON.stringify(result);
							
					
				});
				
			},
			Dis()
			{
				//断开打印机
				let _this=this;
				gp.Disconnect({},result=>{	
					_this.title=JSON.stringify(result);
				});
				
			},
			Serial()
			{
			   	//端口网络连接
				let _this=this;
				gp.connectIP({"ip":"","port":""},result=>{	
					
					_this.title=JSON.stringify(result);
				});
			}

		}
	}
</script>

<style>
	.content {
		margin: 10px;
		margin-top:30px;
	}
	button{ margin-bottom: 15px;}
</style>
