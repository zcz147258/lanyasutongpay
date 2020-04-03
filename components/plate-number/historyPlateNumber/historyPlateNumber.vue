<template>
	<view>
		<view class="cu-list grid" :class="['col-' + gridCol]">
			<block v-for="(item,index) in plateNumList" :key="index">
				<view class="historyPlateNumber">
					<view class="u-f-ajc" @tap="clikehistoryPlateNum(index)" :class="[{'u-active-border' : gridBorder && activeIndex == index},{'u-default-border' : gridBorder && activeIndex != index}]">{{item}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			plateNumList: Array,
			activeIndex: Number,
			gridCol: Number,
			gridBorder: Boolean
		},
		data() {
			return {
				
			}
		},
		methods: {
			clikehistoryPlateNum(index){
				this.$emit("clikehistoryPlateNum",index);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.historyPlateNumber{
		padding: 10rpx 15rpx;
	}
</style>
