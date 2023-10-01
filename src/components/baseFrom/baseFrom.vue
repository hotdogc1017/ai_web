<template>
	<div>
		<el-card>
			<div  >
				<el-form  :inline="true"   :model="searchValue" size="medium" label-position="left">
					<el-form-item
						v-for="(item, index) in searchForm"
						v-if="!item.hidden"
						:label="item.type !== 'submit' && item.type !== 'reset' ? item.label : ''"
						:prop="item.prop"
            label-width="80px"
						:key="index"
					>
						<el-input
							v-if="item.type === 'input'"
							v-model="searchValue[item.prop]"
              :style="{width: '90%'}"
							clearable
							:placeholder="item.placeholder || item.label"
						/>
						<el-select
							v-else-if="item.type === 'select'"
							clearable
							v-model="searchValue[item.prop]"
							:placeholder="item.placeholder || item.label"
              :style="{width: '100%'}"
							@change="onSelectChange"
							filterable
						>
							<el-option v-for="(optItem, index) in item.list" :key="index" :label="optItem.name" :value="optItem.id"></el-option>
						</el-select>
						<el-date-picker
							:style="'width: ' + item.width + 'px'"
							v-else-if="item.type === 'daterange'"
							v-model="dateRang"
							type="daterange"
							unlink-panels
							value-format="yyyy-MM-dd"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="onRangChange"
							:picker-options="pickerOptions"
						></el-date-picker>
						<el-date-picker
							:style="'width: ' + item.width + 'px'"
							v-else-if="item.type === 'date'"
							v-model="searchValue[item.prop]"
							:placeholder="item.placeholder || item.label"
							:type="item.dateType"
							align="center"
							unlink-panels
							@change="onDateChange"
							value-format="yyyy-MM-dd"
						></el-date-picker>
						<el-radio-group @change="radioChange" v-else-if="item.type === 'radio'" v-model="searchValue[item.prop]">
							<el-radio-button v-for="(radio, index) in item.list" :key="index" :label="radio.id">{{ radio.name }}</el-radio-button>
						</el-radio-group>
					</el-form-item>
					<el-form-item v-if="searchForm.length === 3" style="visibility: hidden"><el-input></el-input></el-form-item>
          <img src="../../assets/images/send.png" alt="" class="send_img" @click="customGetData()">
				</el-form>
<!--        <el-button type="primary" @click="customGetData()" class="submit_label">提交</el-button>-->
<!--        <el-button  type="primary" @click="reset" class="submit_label">重置</el-button>-->

			</div>
		</el-card>
	</div>
</template>

<script>


export default {
	name: 'baseTable',
	props: {
		hideBr: {
			type: Boolean,
			default: false
		},
		searchForm: Array,
		searchValue: Object,
		tableConfig: {
      multipleSelection: Array,
			totalCount: String,
			headerButton: Array,
			needSelect: Boolean,
			needIndex: Boolean,
			needSelection: Boolean,
			selectable: Function,
			reserveSelection: {
				type: Boolean,
				default: false
			},
			needSum: Boolean,
			cellStyle: Function,
			actionWidth: Number,
			data: Array,
			column: Array,
			action: Array,
			pageConfig: {
				pageSize: Number,
				pageNum: Number,
				total: Number
			},
			getMultipleSelection: Function
		},
		getData: Function
	},
	data() {
		return {
			imgList: [],
			buttonType: ['primary', 'warning', 'danger', 'info', 'success'],
			dateRang: [],
			multipleSelection: [],
			pickerOptions: {
				shortcuts: [
					{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					},
					{
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}
				]
			}
		};
	},
	methods: {
    updateItem(row) {
     console.log(row)
    },
		addList(img) {
			this.imgList.push(img);
			return this.imgList;
		},
		initHidden(hidden, row) {
			if (hidden) {
				if (hidden instanceof Boolean) {
					return !hidden;
				} else if (hidden instanceof Function) {
					return !hidden(row);
				}
			} else {
				return true;
			}
		},
		reset() {
			this.dateRang = [];
			for (let key in this.searchValue) {
				if (this.searchValue.hasOwnProperty(key)) {
					delete this.searchValue[key];
				}
			}
			this.customGetData();
		},
		inputChange(e) {
			this.customGetData();
		},
		onSelectChange(e) {
			this.customGetData();
		},
		handleSizeChange(pageSize) {
			this.$router.replace({
				path: this.$route.path,
				query: { ...this.$route.query, pageSize }
			});
			this.tableConfig.pageConfig.pageSize = pageSize;
			this.customGetData();
		},
		handleCurrentChange(pageNum) {
			this.$router.replace({
				path: this.$route.path,
				query: { ...this.$route.query, pageNum }
			});
			this.tableConfig.pageConfig.pageNum = pageNum;
			this.customGetData();
		},
		onRangChange(value) {
			this.searchValue.startDate = value ? value[0] + ' 00:00:00' : '';
			this.searchValue.endDate = value ? value[1] + ' 23:59:59' : '';
			this.customGetData();
		},
		onDateChange(value) {
			this.searchValue.startDate = value;
			this.searchValue.endDate = this.moment(value, 'YYYY-MM-DD')
				.endOf('month')
				.format('YYYY-MM-DD');
			this.customGetData();
		},
		radioChange() {
			this.customGetData();
		},
		exportExcel() {
			let wb = XLSX.utils.table_to_book(document.querySelector('#table'));
			let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
			try {
				FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), this.tableConfig.header + '.xlsx');
			} catch (e) {
				if (typeof console !== 'undefined') console.log(e, wbout);
			}
			return wbout;
		},
		summaries(param) {
			if (this.tableConfig.needSum) {
				let list = this.tableConfig.column.map(item => {
					if (item.needSum) {
						return item.prop;
					}
				});
				const { columns, data } = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '总计';
						return;
					} else if (list.indexOf(column.property) === -1) {
						return;
					}
					const values = data.map(item => Number(item[column.property]));
					if (!values.every(value => isNaN(value))) {
						sums[index] = values.reduce((prev, curr) => {
							const value = Number(curr);
							if (!isNaN(value)) {
								return prev + curr;
							} else {
								return prev;
							}
						}, 0);
					} else {
						sums[index] = '';
					}
				});
				return sums;
			}
		},
		customGetData() {

			this.getData ? this.getData() : this.$parent.getData();
		},
		handleSelect(selection, row) {},

		rowClick(row, column, event) {
			this.tableConfig.rowClick && this.tableConfig.rowClick(row, column, event);
			if (this.tableConfig.needSelect && column.property !== 'num') {
				this.$refs.table.toggleRowSelection(row);
			}
		},
    handleSelectionChange(val) {
      this.$emit('closeDialog', val);
      // this.tableConfig.getMultipleSelection(val)
      this.tableConfig.multipleSelection= val
    },
	}
};


</script>

<style scoped>

.send_img {
  width: 35px;
  height: 35px;
  margin-right: 20px;
  cursor: pointer;
}

</style>
