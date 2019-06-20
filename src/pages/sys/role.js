import React from 'react';
import SearchLi from '@/components/SearchLi';

class SysRole extends React.PureComponent {
  columns = [
    { title: '角色名称', dataIndex: 'a' },
    { title: '描述', dataIndex: 'b' },
    { title: '保存时间', dataIndex: 'c' },
  ];

  constructor(props) {
    super(props);
    this.state = {};
  }

  getRoleList = () => {
    const tableDatas = {
      list: [{ a: '1', b: '2', c: '3' }, { a: '1', b: '2', c: '3' }, { a: '1', b: '2', c: '3' }],
      page: 1,
      pagination: { current: 1, pageSize: 10, total: 3480 },
      size: 10,
    };

    return tableDatas;
  };

  onAddBtnClick = data => {
    console.log(this);
    debugger;
  };
  getActionBtnGroup = () => {
    return [
      {
        key: 'add',
        text: ' 新增',
        authkey: 'add',
        icon: 'plus',
        handleBtnClick: this.onAddBtnClick,
      },
    ];
  };

  getSearchEntity = () => {
    return [
      {
        label: '1',
        key: 'a',
        type: 'Input',
      },
    ];
  };

  formatAndSetSearchParams = values => {
    const params = { ...values };
    return params;
  };

  render() {
    const searchPanelProps = {
      searchEntity: this.getSearchEntity(),
      formatAndSetSearchParams: this.formatAndSetSearchParams,
    };
    const tableDatas = {
      list: [
        { a: '00', b: '01', c: '02', d: '4' },
        { a: '10', b: '11', c: '12', d: '4' },
        { a: '20', b: '21', c: '22', d: '4' },
      ],
      page: 1,
      pagination: { current: 1, pageSize: 10, total: 3480 },
      size: 10,
    };

    const searchListProps = {
      tableData: tableDatas,
      tableColumns: this.columns,
      disShowSelections: true,
    };

    return (
      <div>
        <SearchLi searchListProps={searchListProps} actionBtnGroup={this.getActionBtnGroup()} />
      </div>
    );

    // return (
    //   <SearchList
    //     name="baseOrder"
    //     searchPanelProps={searchPanelProps}
    //     actionBtnGroup={this.getActionBtnGroup()}
    //     searchListProps={searchListProps}
    //     getDataList={this.getRoleList}
    //   />
    // );
  }
}
export default SysRole;
