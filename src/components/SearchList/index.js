import React, { PureComponent } from 'react';
import { Button, Divider, Popover } from 'antd';
import SearchActionPanel from '../SearchActionPanel';
import StandardTable from '../StandardTable';
import ImportComp from '../ImportComp';
import { unshiftIndexColumn } from '@/utils/help';
import styles from './style.less';

class SearchList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      formValues: {},
    };
  }

  componentWillReceiveProps(props) {
    const { searchListProps = {} } = props;
    const { tableData = {} } = searchListProps || {};
    const { loading } = this.state;
    if (tableData && tableData.list && loading) {
      this.setState({
        loading: false,
      });
    }
  }

  handleSearchBtnClick = values => {
    const { searchPanelProps = {}, getDataList } = this.props;
    const { formatAndSetSearchParams } = searchPanelProps || {};
    const searchVaues =
      formatAndSetSearchParams && typeof formatAndSetSearchParams === 'function'
        ? formatAndSetSearchParams(values)
        : { ...values };
    this.setState({
      formValues: searchVaues,
    });
    const { searchListProps = {} } = this.props;
    const { tableData = {} } = searchListProps || {};
    const { size } = tableData;
    const params = { ...searchVaues, page: 1, size, current: 1 };
    if (getDataList && typeof getDataList === 'function') {
      this.setState({
        loading: true,
      });
      getDataList(params);
    }
  };

  handleResetBtnClick = () => {
    const { searchPanelProps = {}, getDataList } = this.props;
    const { formatAndSetSearchParams } = searchPanelProps;
    this.setState({
      formValues: {},
    });
    if (formatAndSetSearchParams && typeof formatAndSetSearchParams === 'function') {
      formatAndSetSearchParams({});
    }
    const params = { page: 1, size: 10 };
    if (getDataList && typeof getDataList === 'function') {
      this.setState({
        loading: true,
      });
      getDataList(params);
    }
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const { getDataList } = this.props;
    const filters = Object.keys(filtersArg).reduce(obj => {
      const newObj = { ...obj };
      return newObj;
    }, {});

    const params = {
      ...formValues,
      ...filters,
      page: pagination.current,
      size: pagination.pageSize,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }
    if (getDataList && typeof getDataList === 'function') {
      this.setState({
        loading: true,
      });
      getDataList(params);
    }
  };

  downloadContent = exportPageData => (
    <div>
      <Button icon="cloud-download" onClick={() => exportPageData('selected')}>
        导出选中数据
      </Button>
      <Divider type="vertical" />
      <Button icon="cloud-download" onClick={() => exportPageData('current')}>
        导出当前页数据
      </Button>
      <Divider type="vertical" />
      <Button icon="cloud-download" onClick={() => exportPageData('all')}>
        导出所有数据
      </Button>
    </div>
  );

  renderActionPanel = () => {
    const { actionBtnGroup = [] } = this.props;
    return (
      <div>
        {actionBtnGroup &&
          actionBtnGroup.length > 0 &&
          actionBtnGroup.map(action => {
            const {
              show = true,
              type,
              key,
              handleBtnClick,
              text,
              headerConvertToJs = {},
              ...restProps
            } = action;
            switch (type) {
              case 'base':
                return (
                  show && (
                    <Button
                      key={key}
                      type="primary"
                      className={styles.actionBtnCls}
                      onClick={handleBtnClick}
                      {...restProps}
                    >
                      {text}
                    </Button>
                  )
                );
              case 'download':
                return (
                  show && (
                    <Button
                      key={key}
                      className={styles.downloadBtnCls}
                      onClick={handleBtnClick}
                      {...restProps}
                    >
                      {text}
                    </Button>
                  )
                );
              case 'import':
                return (
                  show && (
                    <ImportComp
                      key={key}
                      onSelectFile={handleBtnClick}
                      exportMap={headerConvertToJs}
                    />
                  )
                );
              case 'export':
                return (
                  show && (
                    <Popover
                      key={key}
                      content={this.downloadContent(handleBtnClick)}
                      trigger="click"
                    >
                      <Button type="goast" className={styles.actionBtnCls} {...restProps}>
                        {text}
                      </Button>
                    </Popover>
                  )
                );
              default:
                return null;
            }
          })}
      </div>
    );
  };

  render() {
    const { loading } = this.state;
    const { searchPanelProps = {}, searchListProps = {}, name = '' } = this.props;
    const { searchEntity = {}, ...restSeachProps } = searchPanelProps;
    const {
      tableData = {},
      tableColumns = {},
      selectedRows = [],
      handleSelectRows = {},
      ...restListProps
    } = searchListProps || {};
    const data = tableData || {};
    const columns = tableColumns || {};
    const targetColumns = unshiftIndexColumn(columns, {
      page: tableData.page,
      size: tableData.size,
    });
    return (
      <div>
        <SearchActionPanel
          {...restSeachProps}
          name={name}
          searchEntity={searchEntity}
          handleSearch={this.handleSearchBtnClick}
          hanleReset={this.handleResetBtnClick}
        >
          {this.renderActionPanel()}
        </SearchActionPanel>
        <StandardTable
          rowKey="id"
          name={name}
          selectedRows={selectedRows}
          loading={loading}
          data={data}
          columns={targetColumns}
          onSelectRow={handleSelectRows}
          onChange={this.handleStandardTableChange}
          {...restListProps}
        />
      </div>
    );
  }
}

export default SearchList;
