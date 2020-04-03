<template>
    <!-- 车牌组件 -->
    <view class="plate-content">
		<uni-popup :custom="true" type="bottom" ref="plateShow" @cursorIndexChange="cursorIndexChange">
        <view class="plate-popup">
            <!-- 关闭 -->
            <!-- <view class="plate-close" v-show="plateNumber.length===8 || plateNumber.length===7" @click="close">关闭</view> -->
            <!-- <view class="plate-close" @click="close">关闭</view> -->
            <view v-show="cursorIndex == 0">
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width8 " v-for="(item,itemIndex) in keyVehicle1" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width8 " v-for="(item,itemIndex) in keyVehicle2" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width10 " v-for="(item,itemIndex) in keyVehicle3" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width11 " v-for="(item,itemIndex) in keyVehicle4" :key="itemIndex" @click="plateHead(item)">{{item}}</view>
                    <!-- 删除 -->
                    <view class="plate-popup-item-list del width8 " @click="plateDel">
                        <image :src="src" mode="widthFix" lazy-load />
                    </view>
                </view>
            </view>

            <view v-show="cursorIndex > 0">
                <view class="plate-popup-item" v-if="cursorIndex > 1">
                    <!-- 数字选择 -->
                    <view class="plate-popup-item-list width8 " :class="(cursorIndex<1 || isInputZh)?'':''" v-for="(item,itemIndex) in keyNumber" :key="itemIndex" @click="plateNum(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width8 " :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput1" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width9 " :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput2" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                </view>
                <view class="plate-popup-item">
                    <view class="plate-popup-item-list width9 " :class="!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput3" :key="itemIndex" @click="plateInput(item)">{{item}}</view>
                    <!-- 删除 -->
                    <view class="plate-popup-item-list del width9 " @click="plateDel">
                        <image :src="src" />
                    </view>
                </view>
				<view class="plate-popup-item">
					<!-- 车牌最后一位-->
					<view class="plate-popup-item-list width9 " :class="(plateNumber.length===6 || plateNumber.length===7) &&!isInputZh?'':''" v-for="(item,itemIndex) in keyEnInput4" :key="itemIndex" @click="plateLast(item)">{{item}}</view>
				</view>
            </view>

        </view>
        <!-- <button class="btn" type="button" @click="show" data-position="bottom">底部弹出 popup</button> -->
		</uni-popup>
    </view>
</template>

<script>
	import uniPopup from "@/components/plate-number/inputPlateNumber/uni-popup.vue"
	import plateDel from './plate-del.png'
    export default {
		components: {
			uniPopup
		},
		props:{
			activeShow: Boolean,
			cursorIndex: Number,
			plateNumber: String
		},
        data() {
            return {
                keyVehicle1: ['沪', '浙', '苏', '赣', '皖', '闽', '京', '琼', '津', '冀'],
                keyVehicle2: ['鲁', '晋', '蒙', '辽', '吉', '豫', '鄂', '湘', '粤', '桂'],
                keyVehicle3: ['渝', '川', '贵', '云', '藏', '陕', '甘', '青'],
                keyVehicle4: ['宁', '黑', '新', '港', '澳', '台'],
                keyNumber: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                keyEnInput1: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                keyEnInput2: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
                keyEnInput3: ["Z", "X", "C", "V", "B", "N", "M"],
                keyEnInput4: ["警", "学", "港", "澳", "台", "应", "急", "领", "电"],
                isInputZh: false, //是否输入了特殊字符
                src: ''
            };
        },
        mounted() {
            this.src = plateDel;
        },
        onShow() {
		},
        methods: {
            /**
             * @desc 打开下拉栏
             */
            show() {
				this.$refs.plateShow.open();
            },
            /**
             * @desc 关闭弹出的车牌
             */
            close() {
				//传值到父组件
				this.cursorIndexChange(-1);
				this.$refs.plateShow.close();
            },
			//改变光标下标
			cursorIndexChange(index){
				if(index >= -1 && index<8){
					this.$emit('cursorIndexChange', index);
				}
			},
            /**
             * @desc 首字母选择
             */
            plateHead(plate) {
                if (this.cursorIndex == 0) {
                    let str =  plate;
					if(this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) != " "){
						for (let i = 0; i <  (this.activeShow ? 7 : 8) - this.cursorIndex; i++) {
							str += " ";
						}
					}else{
						for (let i = 0; i <  (this.activeShow ? 8 : 9) - this.cursorIndex; i++) {
							str += " ";
						}
					}
                    //与父组件双向绑定，传值到父组件
                    this.$emit('plateNumberChange', str);
					this.cursorIndexChange(this.cursorIndex+1);
					this.$emit("activeShowChange", true);
                }
            },
            /**
             * @desc 字母选择
             */
            plateInput(plate) {
                //判断是否输入了字母
                if (this.isInputZh) {
                    return;
                }
                if (this.cursorIndex > 0 && this.cursorIndex < (this.activeShow ? 7 : 8)) {
					let str = this.plateNumber.substring(0, this.cursorIndex) + plate;
					if(this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) != " "){
						for (let i = 0; i < (this.activeShow ? 7 : 8) - this.cursorIndex; i++) {
							str += " ";
						}
					}else{
						for (let i = 0; i < (this.activeShow ? 8 : 9) - this.cursorIndex; i++) {
							str += " ";
						}
					}
					if(this.cursorIndex === (this.activeShow ? 6 : 7)){
						this.close();
					}
					if(this.cursorIndex != 7){
						this.$emit("activeShowChange", true);
					}
                    //与父组件双向绑定，传值到父组件
                    this.$emit('plateNumberChange', str);
					this.cursorIndexChange(this.cursorIndex+1);
                }
            },
            /**
             * @desc 数字选择
             */
            plateNum(plate) {
                //判断是否输入了字母
                if (this.isInputZh) {
                    return;
                }
                if (this.cursorIndex >= 2 && this.cursorIndex < (this.activeShow ? 7 : 8)) {
					let str = this.plateNumber.substring(0, this.cursorIndex) + plate;
					if(this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) != " "){
						for (let i = 0; i <  (this.activeShow ? 7 : 8) - this.cursorIndex; i++) {
							str += " ";
						}
					}else{
						for (let i = 0; i <  (this.activeShow ? 8 : 9) - this.cursorIndex; i++) {
							str += " ";
						}
					}
					if(this.cursorIndex === (this.activeShow ? 6 : 7)){
						this.close();
					}
					if(this.cursorIndex != 7){
						this.$emit("activeShowChange", true);
					}
                    //与父组件双向绑定，传值到父组件
                    this.$emit('plateNumberChange', str);
					if(this.cursorIndex != -1){
						this.cursorIndexChange(this.cursorIndex+1);
					}
                }
            },
            /**
             * @desc 最后一位选择
             */
            plateLast(plate) {
                //判断是否输入了字母
                if (this.isInputZh) {
                    return;
                }
                if (this.cursorIndex === 6 || this.cursorIndex === 7) {
					let str = this.plateNumber.substring(0, this.cursorIndex) + plate;
					if(this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) != " "){
						for (let i = 0; i <  (this.activeShow ? 7 : 8) - this.cursorIndex; i++) {
							str += " ";
						}
					}else{
						for (let i = 0; i <  (this.activeShow ? 8 : 9) - this.cursorIndex; i++) {
							str += " ";
						}
					}
					if(this.cursorIndex === (this.activeShow ? 6 : 7)){
						this.close();
					}
                    this.isInputZh = true;
                    //与父组件双向绑定，传值到父组件
                    this.$emit('plateNumberChange', str);
					if(this.cursorIndex != 7){
						this.$emit("activeShowChange", true);
					}
                }
            },
            /**
             * @desc 删除
             */
            plateDel() {
				let flag = false;
                if (this.cursorIndex != -1) {
					//改变下标
					if(this.cursorIndex != 0 && this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) == " "){
						flag = true;
					}
					// 光标不是最后一格，且里面不是" ",开启新能源框提示
					if (this.plateNumber.substring(this.plateNumber.length-1, this.plateNumber.length) == " ") {
						this.$emit("activeShowChange", true);
					}
					if(this.plateNumber.substring(this.cursorIndex, this.cursorIndex+1) != " "){
						let str = this.plateNumber.substring(0, this.cursorIndex);
						for (let i = 0; i <  (this.activeShow ? 7 : 8) - this.cursorIndex; i++) {
							str += " ";
						}
						//与父组件双向绑定，传值到父组件
						this.$emit('plateNumberChange', str);
					}else{
						let str = this.plateNumber.substring(0, this.cursorIndex-1);
						for (let i = 0; i <  (this.activeShow ? 8 : 9) - this.cursorIndex; i++) {
							str += " ";
						}
						//与父组件双向绑定，传值到父组件
						this.$emit('plateNumberChange', str);
					}
                }

                if (this.cursorIndex === 6 || this.cursorIndex === 7) {
                    this.isInputZh = false;
                }
				if(flag){
					this.cursorIndexChange(this.cursorIndex-1);
				}
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "./plateNumber.scss";
</style>
