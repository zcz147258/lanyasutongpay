<template>
	<view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow() {
			uni.vibrateLong({
				success: (res) => {
					console.log(res)
				}
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
