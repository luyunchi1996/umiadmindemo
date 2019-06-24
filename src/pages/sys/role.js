import React from 'react';
import SearchLi from '@/components/searchli';

class SysRole extends React.PureComponent {
  columns = [
    { title: '角色名称', dataIndex: 'a' },
    {
      title: '描述',
      dataIndex: 'b',
      otherFileds: ['href', 'id'],
      render: data => {
        const { value, otherFileds } = data;
        return <a href={`${otherFileds.href}?id=${otherFileds.id}`}>{value}</a>;
      },
    },
    { title: '保存时间', dataIndex: 'c' },
  ];
  constructor(props) {
    super(props);
    this.state = {};
  }
  getRoleList = () => {
    const tableDatas = {
      list: [
        { id: '1', a: '00', b: '百度', c: '02', d: '4', href: 'http://www.baidu.com' },
        { id: '2', a: '10', b: '新浪', c: '12', d: '4', href: 'http://www.sina.com' },
        { id: '3', a: '20', b: '搜狐', c: '22', d: '4', href: 'http://www.sohu.com' },
      ],
      page: 1,
      pagination: { current: 1, pageSize: 10, total: 3480 },
      size: 10,
    };

    return tableDatas;
  };

  onAddBtnClick = data => {
    console.log(data);
  };

  getActionBtnGroup = () => {
    return [
      {
        key: 'edit',
        text: ' 修改',
        authkey: 'edit',
        icon: 'plus',
        handleBtnClick: this.onAddBtnClick,
      },
      {
        key: 'del',
        text: '删除',
        authkey: 'del',
        icon: 'plus',
        handleBtnClick: this.onAddBtnClick,
      },
    ];
  };

  getSearchEntity = () => {
    return [
      {
        label: 'name',
        key: 'a',
        type: 'input',
      },
      {
        label: 'name',
        key: 'b',
        type: 'select',
        initialValue: 1,
        selectData: [{ id: 1, name: 'name1' }, { id: 2, name: 'name2' }, { id: 3, name: 'name3' }],
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
        { id: '1', a: '00', b: '百度', c: '02', d: '4', href: 'http://www.baidu.com' },
        { id: '2', a: '10', b: '新浪', c: '12', d: '4', href: 'http://www.sina.com' },
        { id: '3', a: '20', b: '搜狐', c: '22', d: '4', href: 'http://www.sohu.com' },
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
        <SearchLi
          searchPanelProps={searchPanelProps}
          searchListProps={searchListProps}
          actionBtnGroup={this.getActionBtnGroup()}
        />
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
