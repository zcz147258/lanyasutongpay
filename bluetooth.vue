<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue">
			<block slot="content">蓝牙</block>
		</cu-custom>
		<view class="saoma">
			<!-- <button class="cu-btn bg-olive lg shadow" @click="scan">扫码</button> -->
			<input type="text" value="请输入发送的值" 
			v-model="valuetest"
			style="width: 100%;border: solid 1upx #1CBBB4;border-radius: 3upx;
			height: 75upx;"/>
			<button class="cu-btn bg-olive lg shadow" @tap="sendmess">发送</button>
			<view>{{ result }}</view>
		</view>
		<mescroll-uni ref="mescrollRef" 
		:top="10"
		:height="1000"
		@init="mescrollInit" :down="downOption" 
		@down="downCallback" :up="upOption" @up="upCallback" 
		>
			<view class="listinfo" v-if="toothList.length > 0">
				<block v-for="(item,index) in toothList" :key="index">
					<uni-list-item :title="item.name"
					:rightText="item.title"
					 @tap="connect(item.deviceId)" />
					<view class="testa" >搜索{{ time3 }}</view>
					<view class="testa" >连接{{ time4 }}</view>
					<view class="testa" >信号强度{{ item.RSSI }} </view>
				</block>
				
			</view>
			<view class="loading" v-else>
				{{ loadcontext }}{{ seconds }}
			</view>
			
		</mescroll-uni>
		
	</view>
</template>

<script>
	let time;
	var time1;
	var time2;
	let intTime;
	import permision from "../../common/permission.js"
	import mescrollUni from "@/components/mescroll-diy/mescroll-xinlang.vue";
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
		data() {
			return {
				valuetest: '',
				seconds: '',
				time3: 0,
				time4: 0,
				loadcontext: '正在加载中...',
				result: '',
				CustomBar: this.CustomBar, // 标题栏的高度
				status: '点击连接',
				status1: '已连接',
				constatus: '',
				toothList:[],
				connectid: '',
				characteristicId: '',
				serviceId: '',
				downOption: { 
					
				},
				upOption:{
					auto: false,
					use: false
				}
			}
		},
		components:{
			uniListItem,
			mescrollUni
		},
		onUnload() {
			this.closeAll();
			this.connectid = '';
		},
		onShow() {
			this.start();
		},
		computed:{
			calc(id){
				return 'aaaa';
			}
		},
		methods: {
			testvalue(){
				console.log(this.connectid);
				console.log(JSON.stringify(this.toothList));
			},
			scan() {
				uni.scanCode({
				    success: (res) =>{
				        this.result = res.result
						if(res.result.indexOf("DC") == 0){
							this.$api.msg("二维码校验正确")
							this.connect(this.toothList[0].deviceId);
						}else{
							this.$api.msg("二维码校验错误")
						}
				    }
				});
			},
			mescrollInit(mescroll){
			},
			downCallback(mescroll){
				setTimeout(()=>{
					clearInterval(time);
					this.connectid = '';
					clearInterval(intTime);
					this.close();
					this.closefond();
					this.closeAll();
					this.getinfo()
					mescroll.endSuccess()
				},2000)
			},
			//释放所有资源
			closeAll(){
				uni.closeBluetoothAdapter({
					success: (res) => {
						console.log(res);
					},
					fail: (res) => {
						console.log(res);
					}
				})
			},
			//关闭连接
			close(){
				uni.closeBLEConnection({
				  deviceId: this.connectid,
				  success:(res)=>{
					this.toothList.forEach((item,index)=>{
						item.title = "点击连接"
					})
					this.time4 = 0;
					this.status = '点击连接'
				  }
				})
			},
			closefond(){
				uni.stopBluetoothDevicesDiscovery({
					success: (res) => {
					}
				})
			},
			getinfo(mescroll){
				time2 = new Date().getTime();
				this.loadcontext = '正在加载中...'
				this.seconds = '30s';
				intTime = setInterval(()=>{
					var s = parseInt(this.seconds);
					if(s > 0 ){
						this.seconds = (--s) + 's';
					}
					if(s == 0 ){
						this.loadcontext= '加载完毕,如果需要刷新请下拉'
						this.seconds = '';
						clearInterval(intTime);
					}
				},1000)
				this.toothList = [];
				uni.openBluetoothAdapter({
					 success:(res)=>{
					 },
					 fail: (err) => {
						//没有打开蓝牙
						this.$api.msg("请打开蓝牙")
					 }
				})
				uni.startBluetoothDevicesDiscovery({
					 success:(res)=>{
					 }
				})
				
				wx.getBluetoothDevices({
				 success: (res)=>{
					}
				})
				wx.onBluetoothDeviceFound((res)=>{
				 if(res.devices[0].name.indexOf("DC") == 0 ){
					 res.devices[0].title = '点击连接',
					 time1 = new Date().getTime();
					 console.log((time1-time2)/1000);
					 this.time3 = (time1-time2)/1000;
					 this.toothList.push(res.devices[0]);
				 }
				})
				time = setTimeout(function(){
					uni.stopBluetoothDevicesDiscovery({
						success: (res) => {
						}
					})
				},30000);
			},
		
			connect(id){
				uni.showLoading({
					mask: true,
					title:'连接中'
				})
				let ltime = new Date().getTime();
				uni.createBLEConnection({
					deviceId: id,
					success: (res) => {
						this.toothList.forEach((item,index)=>{
							if(item.deviceId == id){
								item.title = "已连接"
							}
						})
						this.connectid = id;
						console.log(res)
						let ltime2 = new Date().getTime();
						setTimeout((res)=>{
							uni.hideLoading();
						},500)
						this.status = '已连接'
						this.time4 = (ltime2 - ltime)/1000;
						this.$api.msg("连接成功");
						this.service(id);
					}
				})
				//连接完毕之后获取数据
			},
			//获取连接蓝牙设备服务
			service(id){
				console.log(id)
				uni.getBLEDeviceServices({
					 deviceId: id,
					 success:(res)=>{
						console.log(res)//{errMsg: "getBLEDeviceServices:ok", services: Array(5), errCode: 0}
						let uuid = res.services[3].uuid;
						this.getchara(id,uuid);
					 },
					 fail:(res)=>{
						 console.log(res);
					 }
				})
			},
			//开启订阅特征值
			startchara(id,uuid,charaid){
				uni.notifyBLECharacteristicValueChange({
					state:true,
					deviceId: id,
					serviceId: uuid,
					characteristicId: charaid,
					success: (res) => {
						console.log(res);
						
					}
				})
			},
			getchara(id,uuid){
				uni.getBLEDeviceCharacteristics({
					deviceId:id,
					serviceId: uuid,
					success: (res) => {
						console.log(res)
						let charaid = res.characteristics[1].uuid;
						//开启订阅特征值
						this.characteristicId = charaid;
						this.serviceId = uuid;
						this.startchara(id,uuid,charaid);
						//this.startchara(id,uuid,charaid);
						
					}
				})
			},
			//转化16进制
			strToHexCharCode(str) {
			　　if(str === "")
			　　　　return "";
			　　var hexCharCode = [];
			　　hexCharCode.push("0x"); 
			　　for(var i = 0; i < str.length; i++) {
			　　　　hexCharCode.push((str.charCodeAt(i)).toString(16));
					let char = (str.charCodeAt(i)).toString(16);
					
			　　}
			　　return hexCharCode.join("");
			},
			sendmess(){
				let result = this.strToHexCharCode(this.valuetest)
				console.log(result);
				let len = (result.length -2) / 2;
				const buffer = new ArrayBuffer(len);
				
				let a = "0x";
				//数字算法
				for (let n = 1; n <= len; n++) {
					let str = a + result.substr(2 * n, 2);
					var dataView = new DataView(buffer,n - 1);//第一个视图，从0开始
					dataView.setUint8(0, str);
				}
				
				//dataView.setUint32(1, result);
				// dataView.setUint32(2, result);
				// dataView.setUint32(3, result);
				// for(let i = 0; i < (result.length-2) / 2; i++){
				// 	let a = c + result.substr(2 * i + 2,2);
				// 	dataView.setUint32(i, a);
				// 	console.log(a);
				// };
				uni.onBLECharacteristicValueChange(function (res) {
					console.log(res);
					let array = Array.prototype.slice.call(new Uint8Array(res.value));
					console.log(array);
					// uint8arr = new Uint8Array(res.value); //二进制转无符号整数
					// console.log(uint8arr); //打印接收数据即可
				})
				//写入值
				uni.writeBLECharacteristicValue({
					characteristicId:this.characteristicId,
					serviceId: this.serviceId,
					deviceId: this.connectid,
					value: buffer,
					success: (res) => {
						console.log(res);
						this.$api.msg(res.errMsg);
					},
					fail: (res) => {
						console.log(res);
						this.$api.msg(res.errMsg);
					}
				})
				//读取值
				uni.readBLECharacteristicValue({
					characteristicId:this.characteristicId,
					serviceId: this.serviceId,
					deviceId: this.connectid,
					success: (res) => {
						console.log(res);
					},
					fail: (res) => {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.testa{
		text-align: center;
		font-size: 40upx;
	}
	.loading{
		font-size: 35upx;
		text-align: center;
	}
	.saoma{
		position: absolute;
		bottom: 150upx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}
	/* .listinfo{
		margin-top: 50upx;
	} */
</style>
