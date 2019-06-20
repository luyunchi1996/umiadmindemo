-该组件是基于 react 和 antd design 的用于展示搜索查询结果的自定义组件 -组件结构： SearchActionPanel 和 standardTable -使用方式： import SearchList from '@/components/SearchList'; -传参 { name: '', ---定参，string 类型，模块名称，取自 constant 中相应模块对应的名称 searchPanelProps: { searchEntity: [ { label: '', ---定参，string 类型，搜索条件项 label 展示 key: 'departmentId', ---定参，string 类型，唯一标识该搜索条件项，以及用于作为搜索关键字传递给后台 type: 'Select', ---定参，Input/Select/DatePicker/RangePicker 中的任一项，用于表示该搜索项的类型 dataList: [ { value: null, ---select 下拉列表的标识值 label: ''， ---select 下拉列表的展示值 } ], ---非定参，array 类型，若 type 为 Select 类型，为必传字段 } ], ---定参，array 类型，包含搜索条件项包含的内容 formatAndSetSearchParams： function(values){}, ---定参，函数类型，用于 format 搜索条件的值,接收所有搜索条件的值 }, ----定参，object 类型，传递 SearchActionPanel 组件所需参数 actionBtnGroup： [ { key: '', ---定参，string 类型，按钮唯一标识符 type: 'base', ---定参，string 类型，按钮类型，从 base/export 中选择 text: ' 新增', ---定参，string 类型，按钮显示文字 show, ---定参，true/false，按钮显示与否 handleBtnClick: function(){}, ---定参，function 函数，用于处理按钮点击事件 } ], ---定参，object 类型，包含操作按钮所需的内容 searchListProps: { tableData：{ page：1, ---定参，number 类型，表示当前页数 size: 10, ---定参，number 类型，表示当前页所含数据条目 list: [], ---定参，array 类型类型，用于展示列表数据 }, ---定参，表格展示所需数据 tableColumns: [ { title: '', ---定参，string 类型，表示列表 dataIndex: '', ---定参，string 类型，表示列标识符 align: '', ---非定参，string 类型，left/center/right 中选择 render: function(text,record){}, ---非定参，function 函数类型，返回值为 text 该字段当前显示值，record 为该条数据 } ], ---定参，array 类型，表示列表中列内容 selectedRows: [], ---定参，array 类型，表示所选行， handleSelectRows: function(rows){}, ---定参,function 函数，返回值为所选行 showTitleConfig: true, ---定参，true/false，表示该表列是否可配置 }, ---定参，object 类型，传递搜索结果表展示所需参数 getDataList： function(params){}, ---定参，function 函数类型，返回值为搜索条件对象 }