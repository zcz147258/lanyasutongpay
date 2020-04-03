<template>
	<view>
		 <!-- 车辆查询 -->
		<view class="search-car  u-f-ac u-f-jsb">
			<view class="search-car-input colorplate">
				<view class="cursorcolor">
				</view>
			</view>
			<view class="search-car-input search-car-input-list1 u-f-ajc" @tap="carInputClick(1)">
				{{plateNum.slice(0,1)}}
				<view class="cursor" v-show="cursorIndex === 0">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list2 u-f-ajc" @tap="carInputClick(2)">
				{{plateNum.slice(1,2)}}
				<view class="cursor" v-show="cursorIndex === 1">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<image :src="dian" mode="widthFix" lazy-load></image>
			<view class="search-car-input search-car-input-list3 u-f-ajc" @tap="carInputClick(3)">
				{{plateNum.slice(2,3)}}
				<view class="cursor" v-show="cursorIndex === 2">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list4 u-f-ajc" @tap="carInputClick(4)">
				{{plateNum.slice(3,4)}}
				<view class="cursor" v-show="cursorIndex === 3">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list5 u-f-ajc" @tap="carInputClick(5)">
				{{plateNum.slice(4,5)}}
				<view class="cursor" v-show="cursorIndex === 4">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list6 u-f-ajc" @tap="carInputClick(6)">
				{{plateNum.slice(5,6)}}
				<view class="cursor" v-show="cursorIndex === 5">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list7 u-f-ajc" @tap="carInputClick(7)">
				{{plateNum.slice(6,7)}}
				<view class="cursor" v-show="cursorIndex === 6">
					<image :src="cursor" lazy-load />
				</view>
			</view>
			<view class="search-car-input search-car-input-list8 u-f-ajc" @tap="carInputClick(8)">
				{{ !activeShow ? plateNum.slice(7,8) : ''}}
				<view class="cursor" v-show="cursorIndex === 7 && !activeShow">
					<image :src="cursor" lazy-load />
				</view>
				<view class="active" v-show="activeShow">
					<image :src="jia" mode="widthFix" lazy-load></image>
					<view>新能源</view>
				</view>
			</view>
		</view>
		
		<!-- 引用车牌组件 -->
		<plate-number ref="plate" :plateNumber="plateNum" @plateNumberChange="plateNumberChange" :activeShow="activeShow" @activeShowChange="activeShowChange" :cursorIndex="cursorIndex" @cursorIndexChange="cursorIndexChange"></plate-number>
	</view>
</template>


<script>
	import cursor from './cursor.gif'
	import jia from './jia.png'
	import dian from './dian.png'
	import plateNumber from '@/components/plate-number/inputPlateNumber/plateNumber.vue'
    export default {
		components:{plateNumber},
		props:{
			plateNum: String,
			activeShow: Boolean
		},
		mounted() {
		    this.jia = jia;
			this.dian = dian;
			this.cursor = cursor;
		},
        data() {
            return {
				jia: '',//输入加图片gif地址
				dian: '',//输入点图片gif地址
				cursor: '', //输入焦点gif地址
				cursorIndex: -1//点击时光标显示的下标位置，-1是不显示
            };
        },
        onHide() {
            //恢复初始化
			this.$emit('plateNumChange', "        ");
			this.$emit('isActiveShowChange', true);
			this.cursorIndex = -1;
        },
        methods: {
            /**
             * @desc 显示车牌选择器
             */
            carInputClick(index) {
				switch (index){
					case 8:
					this.$emit('isActiveShowChange', false);
						break;
				}
				this.cursorIndex= index-1;
                this.$refs.plate.show();
            },
			//删除只剩6位数时打开新能源框提示
			activeShowChange(flag){
				this.$emit('isActiveShowChange', flag);
			},
			//改变光标下标
			cursorIndexChange(index){
				this.cursorIndex = index;
			},
			//改变车牌
			plateNumberChange(plateNum){
				this.$emit('plateNumChange', plateNum);
				let flag = true;
				for (var i = 0; i < 7; i++) {
					if(plateNum.slice(i,i+1) == " "){
						flag = false;
						break;
					}
				}
				let str = plateNum.replace(/\s+/g,"");
				if (flag && str.length > 6) {
				    this.$refs.plate.close();
				}
			}
        }
    }
</script>

<style lang="scss" scoped>
	.search-car-input{
		margin-right: 10upx;
	}
	.search-car{
		padding: 15rpx 20rpx;
	}
	.search-car>.search-car-input{
		border: 1rpx solid #dbd6e8;
		background: #f0e9ff;
		border-radius: 5px;
		font-size: 38rpx;
		width: 60rpx;
		height: 90rpx;
	}
	.search-car>.search-car-input-list8{
		position: relative;
	}
	.search-car>.search-car-input-list8>.active>image{
		position: absolute;
		width: 50rpx;
		top: 0;
		left: 10rpx;
	}
	.search-car>.search-car-input-list8>.active>view{
		position: absolute;
		top: 50rpx;
		left: 7rpx;
		font-size: 20rpx;
		color: #1195db;
	}
	.search-car>image{
		width: 30rpx;
	}
	
	// 输入焦点图片
	.cursor {
	    float: left;
	    width: 2px;
	    height: 42rpx;
	    vertical-align: middle;
	    align-self: center;
	
	    image {
	        width: 2px;
	        display: block;
	        height: 42rpx;
	    }
	}
	//加颜色
	.cursorcolor{
		background-color: green;
	}
	.colorplate{
		background-color: blue;
	}
</style>