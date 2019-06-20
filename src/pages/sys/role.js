import React from 'react';
import SearchList from '@/components/SearchList';

class SysRole extends React.PureComponent {
  columns = [
    { title: '1', dataIndex: 'a' },
    { title: '2', dataIndex: 'b' },
    { title: '3', dataIndex: 'c' },
    { title: '4', dataIndex: 'd' },
  ];

  constructor(props) {
    super(props);
    this.state = {};
  }

  getRoleList = () => {
    const tableDatas = {
      list: [
        { a: '1', b: '2', c: '3', d: '4' },
        { a: '1', b: '2', c: '3', d: '4' },
        { a: '1', b: '2', c: '3', d: '4' },
      ],
      page: 1,
      pagination: { current: 1, pageSize: 10, total: 3480 },
      size: 10,
    };

    return tableDatas;
  };

  getActionBtnGroup = () => {
    return [];
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
        { a: '1', b: '2', c: '3', d: '4' },
        { a: '1', b: '2', c: '3', d: '4' },
        { a: '1', b: '2', c: '3', d: '4' },
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
      <SearchList
        name="baseOrder"
        searchPanelProps={searchPanelProps}
        actionBtnGroup={this.getActionBtnGroup()}
        searchListProps={searchListProps}
        getDataList={this.getRoleList}
      />
    );
  }
}
export default SysRole;
