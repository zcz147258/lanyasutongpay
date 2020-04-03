<template>
	<view>
		{{name}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '111'
			}
		},
		onShow() {
			//监听系统通知栏消息点击事件
			plus.push.addEventListener('click', function(msg){  
			    //处理点击消息的业务逻辑代码  
			}, false);  
			//监听接收透传消息事件 
			var _this = this
			plus.push.addEventListener('receive', function(msg){
			    //处理透传消息的业务逻辑代码  
				_this.name = JSON.parse((JSON.stringify(msg.content)))
				_this.playon(_this.name["name"]);
				console.log(_this.name["name"]);
				
			}, false);
		},
		methods: {
			playon(py){
				let url = 'https://tsn.baidu.com/text2audio?tok=24.767ed59c92288bb9eab53e94a64f2321.2592000.1587369069.282335-18943426&cuid=sutong&ctp=1&lan=zh&tex='+ py;
				let p = plus.audio.createPlayer(url);
				console.log(p)
				p.play()
				// const innerAudioContext = uni.createInnerAudioContext();
				// innerAudioContext.autoplay = true;
				// innerAudioContext.src = py;
			},
		}
	}
</script>

<style>

</style>
