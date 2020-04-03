<template>
	<view>
		 <button type="primary" @click="onStartBtn">点击识别身份证</button>
	</view>
</template>

<script>
	 const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert')
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
		},
		methods: {
			  onStartBtn(){
				  dcRichAlert.show({
				       position: 'bottom',
				       title: "提示信息",
				       titleColor: '#FF0000',
				       content: "<a href='https://uniapp.dcloud.io/' value='Hello uni-app'>uni-app</a> 是一个使用 Vue.js 开发跨平台应用的前端框架!\n免费的\n免费的\n免费的\n重要的事情说三遍",
				       contentAlign: 'leftdsadadas',
				       checkBox: {
				           title: '不再提示',
				           isSelected: true
				       },
				       buttons: [{
				           title: '取消'
				       }, {
				           title: '否'
				       }, {
				           title: '确认',
				           titleColor: '#3F51B5'
				       }]
				  }, result => {
				       console.log(result)
				  });
			  }
		}
	}
</script>

<style>

</style>
