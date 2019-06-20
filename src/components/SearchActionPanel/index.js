import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Select, DatePicker, Button, Row, Col, Popover, Checkbox, Icon } from 'antd';
import styles from './style.less';

const { RangePicker } = DatePicker;

const FormItem = Form.Item;
const { Option } = Select;

const formItemLayout = {
  style: { width: '100%' },
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    style: { textAlign: 'left', lineHeight: '24px' },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

@connect(({ global }) => ({
  global,
}))
@Form.create()
class SearchActionPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showExtendFields: false,
    };
  }

  handleSearch = e => {
    e.preventDefault();

    const { form, handleSearch } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const values = {
        ...fieldsValue,
      };
      handleSearch(values);
    });
  };

  handleFormReset = () => {
    const { form, hanleReset } = this.props;
    form.resetFields();
    hanleReset();
  };

  handleConfigChange = (item, e) => {
    const {
      global: { searchConfig = [] },
      name = '',
    } = this.props;
    const tempSearchConfig = searchConfig[name];
    const targetOptions = [...tempSearchConfig];
    const optionIndex = tempSearchConfig.findIndex(option => option.key === item.key);
    if (optionIndex > -1) {
      targetOptions[optionIndex].checked = e.target.checked;
    }
    const { dispatch } = this.props;
    dispatch({
      type: 'global/updateSearchConfig',
      payload: { [name]: targetOptions },
    });
  };

  getPopoverContent = configOptions => (
    <div>
      {configOptions.map(item => (
        <div key={item.key}>
          <Checkbox checked={item.checked} onChange={e => this.handleConfigChange(item, e)}>
            {item.label}
          </Checkbox>
        </div>
      ))}
    </div>
  );

  renderSearchFields = searchEntity => {
    const fieldLen = searchEntity.length;
    if (fieldLen > 4) {
      return this.renderExtendSearchFields(searchEntity);
    }
    return this.renderBasicSearchFields(searchEntity);
  };

  handleShowExtendsField = () => {
    this.setState(preState => ({
      showExtendFields: !preState.showExtendFields,
    }));
  };

  renderBasicSearchFields = fieldEntity => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Row>
        <Col md={20} sm={24}>
          <Row gutter={32}>
            {fieldEntity.map(item => {
              const { type, key, show = true, value, ...otherProps } = item;
              let comp = null;
              switch (type) {
                case 'Input':
                  comp = <Input placeholder="请输入" allowClear {...otherProps} />;
                  break;
                case 'Select':
                  comp = (
                    <Select placeholder="请选择" allowClear {...otherProps}>
                      {item.dataList &&
                        item.dataList.map(data => (
                          <Option value={data.value} key={data.value}>
                            {data.label}
                          </Option>
                        ))}
                    </Select>
                  );
                  break;
                case 'DatePicker':
                  comp = <DatePicker placeholder="请输入日期" {...otherProps} />;
                  break;
                case 'RangePicker':
                  comp = <RangePicker {...otherProps} />;
                  break;
                default:
                  break;
              }

              return (
                (show && comp && (
                  <Col md={6} sm={24} key={key}>
                    <FormItem {...formItemLayout} label={item.label} colon={false}>
                      {getFieldDecorator(key, {
                        initialValue: value,
                      })(comp)}
                    </FormItem>
                  </Col>
                )) ||
                null
              );
            })}
          </Row>
        </Col>
        <Col md={4} sm={24} />
      </Row>
    );
  };

  renderExtendSearchFields = fieldEntity => {
    const {
      form: { getFieldDecorator },
    } = this.props;
    const { showExtendFields } = this.state;
    const tempEntity = [...fieldEntity];
    const targetEntity = showExtendFields ? tempEntity : tempEntity.splice(0, 4);
    return (
      <Row className={styles.flex}>
        <Col md={20} sm={24}>
          <Row gutter={32}>
            {targetEntity.map(item => {
              const { type, key, show = true, value, ...otherProps } = item;
              let comp = null;
              switch (type) {
                case 'Input':
                  comp = <Input placeholder="请输入" allowClear {...otherProps} />;
                  break;
                case 'Select':
                  comp = (
                    <Select placeholder="请选择" allowClear {...otherProps}>
                      {item.dataList &&
                        item.dataList.map(data => (
                          <Option value={data.value} key={data.value}>
                            {data.label}
                          </Option>
                        ))}
                    </Select>
                  );
                  break;
                case 'DatePicker':
                  comp = <DatePicker placeholder="请输入日期" {...otherProps} />;
                  break;
                case 'RangePicker':
                  comp = <RangePicker {...otherProps} />;
                  break;
                default:
                  break;
              }

              return (
                (show && comp && (
                  <Col md={6} sm={24} key={key}>
                    <FormItem {...formItemLayout} label={item.label} colon={false}>
                      {getFieldDecorator(key, {
                        initialValue: value,
                      })(comp)}
                    </FormItem>
                  </Col>
                )) ||
                null
              );
            })}
          </Row>
        </Col>
        <Col md={4} sm={24} className={styles.showMoreOrBasicCol}>
          {showExtendFields ? (
            <div onClick={this.handleShowExtendsField} className={styles.showOrHideFont}>
              收起
              <Icon type="up" />
            </div>
          ) : (
            <div onClick={this.handleShowExtendsField} className={styles.showOrHideFont}>
              更多
              <Icon type="down" />
            </div>
          )}
        </Col>
      </Row>
    );
  };

  render() {
    const {
      searchEntity,
      global: { searchConfig = {} },
      name = '',
      children,
    } = this.props;

    const configOptions = searchConfig[name];

    return (
      <div>
        <div style={{ textAlign: 'right' }}>
          {configOptions && configOptions.length > 0 && (
            <Popover
              content={this.getPopoverContent(configOptions)}
              title="查询条件配置"
              trigger="click"
            >
              <Button type="primary" className={styles.configSearchSelect}>
                配置查询条件
              </Button>
            </Popover>
          )}
        </div>
        {searchEntity && searchEntity.length > 0 && (
          <Form layout="inline" className={styles.searchForm}>
            {this.renderSearchFields(searchEntity)}
          </Form>
        )}
        <div className={styles.searchBtnContainer}>
          {children}
          <div>
            <Button type="primary" onClick={this.handleSearch}>
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchActionPanel;
