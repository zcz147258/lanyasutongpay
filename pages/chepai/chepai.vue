<template>
	<view class="content">
		 <!-- 上面引入车牌-->
		<!-- <view class="inputplate">
			 <view class="colorplate" disabled :style="{background: defcolor}"></view>
			 <view v-for="(item,index) in arr"  :key="index"> -->
			 <!-- {{ arr[index] }} -->
				<!-- <input type="text" maxlength=1 v-model="arr[index]" value="">
			 </view>
		 </view> -->
		 <inputPlateNumber 
		 :plateNum="scp.plateNum" 
		 class="inputplatenumber"
		 @plateNumChange="plateNumChange" @isActiveShowChange="isActiveShowChange"
		  :activeShow="scp.activeShow"></inputPlateNumber>
		 <!-- 选车牌-->
		 <view class="choose">
			 <view v-for="(item,index) in type" @tap="choosep(index)"
			  :style="chooseplate == index ? {borderColor: checked,background:checked,color: '#2D4E2E'} 
			  : {borderColor: def}">{{ type[index] }}</view>
		 </view>
		 <!-- 图片地区-->
		<view class="picture">
			<view @tap="selfInit">
				<image v-if = "!img2Url" src="../../static/plate.png" mode=""></image>
				<image v-else  :src="img2Url"
				 mode=""></image>
			</view>
			<view @tap="choose(1)">
				<image v-if = "!img3Url" src="../../static/photo.png" mode=""></image>
				<image v-else :src="img3Url"
				 mode=""></image>
			</view>
			<view @tap="choose(2)">
				<image v-if = "!img4Url" src="../../static/photo.png" mode=""></image>
				<image v-else :src="img4Url"
				 mode=""></image>
			</view>
		</view>
		<button type="primary">确认</button>
	</view>
</template>

<script>
	import inputPlateNumber from '@/components/plate-number/inputPlateNumber/inputPlateNumber.vue';
	export default {
		data() {
			return {
				scp: {
					plateNum: null, // 车牌号
					plateNumList: [],// 历史车牌
					plateNumActiveIndex: -1, // 历史车牌选中的下标,-1表示未选中
					activeShow: true, // 是否开启新能源提示
				},
				// 车牌号选择对象
				defcolor: 'blue',
				title: "plate",
				text: "京A58E68",
				imgUrl: "",
				time: "",
				img2Url: '',
				chooseplate: 1,
				arr: ['','','','',''],
				type: ['无牌车','普通车牌','出租车','军车','警车','特殊车辆'],
				checked: '#5BB85F',
				def: '#797979',
				img3Url: '',
				img4Url: ''
			}
		},
		components:{
			inputPlateNumber
		},
		onLoad() {
			this.scp.plateNum = "        "
		},
		methods: {
			plateNumChange(plateNum){
				//判断是否是历史车牌，是历史车牌则要选中，不是则改变值
				let plateNumActiveIndex = -1;
				let plateNumList = this.scp.plateNumList;
				for (var i = 0; i < plateNumList.length; i++) {
					if(plateNumList[i] == plateNum.replace(/\s+/g,"")){
						plateNumActiveIndex = i;
						break;
					}
				}
				if(plateNumActiveIndex != -1){
					this.clikehistoryPlateNum(plateNumActiveIndex);
				}else{
					this.scp.plateNumActiveIndex = plateNumActiveIndex;
					this.scp.plateNum = plateNum;
				}
			},
			//新能源提示框状态改变时
			isActiveShowChange(flag){
				this.scp.activeShow = flag;
			},
			//选中图片
			choose(id){
				uni.chooseImage({
					count:1,
					success: (res) => {
						console.log(res.tempFilePaths[0]);
						if(id == 1){
							this.img3Url = res.tempFilePaths[0];
						}else{
							this.img4Url = res.tempFilePaths[0];
						}
					}
				})
			},
			//选中变色
			choosep(index){
				this.chooseplate = index;
				//改变输入框前面的颜色
				switch(index){
					case 0: this.defcolor = 'green';break;
					case 1: this.defcolor = 'blue';break;
					case 2: this.defcolor = 'pink';break;
					case 3: this.defcolor = 'orange';break;
					case 4: this.defcolor = 'red';break;
					case 5: this.defcolor = 'cyan';break;
				}
			},
			//打开视频流扫描
			selfInit() {
				//let time1 = new Date().getTime();
				if (plus.os.name == "Android") {
					const plateModule = uni.requireNativePlugin('PlatePluginModule');
					plateModule.showAndroidCamera({
						authCode: "",
					}, result => {
						console.log(result);
						//let time2 = new Date().getTime();
						//this.time = (time2 - time1)/1000;
						const msg = result.recogResult
						this.img2Url = "file://" + result.AreaPath
						let app = JSON.parse(msg);
						this.text = app.plateNumber; //给SPAN 赋值
						console.log(this.text)
						this.scp.plateNum = this.text
						//var arr= this.text.match(/./g);
						//this.arr = arr;
					});
				} else if (plus.os.name == "iOS") {} else {
					console.log("非移动端平台");
				}
			},
		}
	}
</script>

<style scoped>
	.inputplatenumber{
		margin-top: -150upx;
	}
	button{
		width: 80%;
		margin: auto;
	}
	.picture{
		display: flex;
		justify-content: space-around;
		width: 100%;
		margin-bottom: 50upx;
	}
	.picture>view{
		width: 30%;
	}
	.picture image{
		width: 100%;
		height: 180upx;
		border-radius: 10upx;
		margin-right: 15upx;
	}
	.choose{
		margin-top: -150upx;
		margin-bottom: 50upx;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		width: 100%;
	}
	.choose view{
		width: 30%;
		margin-right: 10upx;
		height: 130upx;
		border: 2upx solid #3A3A3A;
		text-align: center;
		font-size: 40upx;
		line-height: 130upx;
		color: #797979;
		font-weight: bolder;
		margin-bottom: 20upx;
		border-radius: 10upx;
	}
	.choose view:nth-child(3n){
		margin-right: 5upx;
	}
	.inputplate{
		margin-top: 40upx;
		display: flex;
		flex-wrap: nowrap;
		justify-content: center;
		margin-bottom: 40upx;
	}
	.inputplate view input{
		width: 100%;
		font-size: 40upx;
	}
	.inputplate view{
		display: flex;
		align-items: center;
		width: 70upx;
		height: 100upx;
		color: #111111;
		border: 2upx solid #AAAAAA;
		border-radius: 5upx;
		font-size: 40upx;
		text-align: center;
		line-height: 100upx;
		margin-right: 20upx;
		font-weight: bolder;
	}
	.inputplate view:last-child{
		margin-right: 0upx;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
