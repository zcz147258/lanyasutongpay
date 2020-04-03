<template>
	<view class="content">
		<view v-for="(item,index) in cando" 
		class="chanp" 
		@tap="trunto(index)"
		:key="index">{{ item }}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cando: [
					"小票打印",
					"发票打印",
					"小米推送",
					"百度语音",
					"震动",
					"车牌识别",
					"拍照",
					"java包调用",
				]
			}
		},
		onLoad() {

		},
		methods: {
			trunto(index){
				switch(index){
					case 0:
						uni.navigateTo({
							url:'../xiaopiao/xiaopiao'
						});break;
					case 1:
						uni.navigateTo({
							url:'../fapiao/fapiao'
						});break;
					case 2:
						uni.navigateTo({
							url:'../xiaomi/xiaomi'
						});break;
					case 3:
						uni.navigateTo({
							url:'../yuyin/yuyin'
						});break;
					case 4:
						uni.navigateTo({
							url:'../zhendong/zhendong'
						});break;
					case 5:
						uni.navigateTo({
							url:'../chepai/chepai'
						});break;
					case 6:
						uni.navigateTo({
							url:'../photo/photo'
						});break;
					case 7:
						uni.navigateTo({
							url:'../java/java'
						});break;
				}
			}
		}
	}
</script>

<style scoped>
	.content{
		margin-top: 50upx;
	}
.chanp{
	text-align: center;
	line-height: 100upx;
	height: 100upx;
	font-size: 50upx;
	border-bottom: 1px solid rgba(0,0,0,0.2);
}
</style>
