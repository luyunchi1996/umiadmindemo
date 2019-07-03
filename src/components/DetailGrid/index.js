import React, { PureComponent } from 'react';
import { Card, Row, Col, Button } from 'antd';
import AutoGrid from './autoGrid';
import styles from './style.less';
// import { func } from 'prop-types';

class DetailGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rowWidth: 0,
      colWidth: 0,
      firstLoad: true,
    };
    this.myRef = '';
  }

  componentDidMount() {
    const row = document.getElementById('blankrow');
    const col = document.getElementById('blankcol');
    this.setState({ rowWidth: row.clientWidth, colWidth: col.clientWidth });
  }

  componentWillReceiveProps() {
    this.setState({ firstLoad: false });
  }

  render() {
    const {
      title = '',
      data = {},
      width = '',
      labelWidth = '',
      extraShow = false,
      extraTitle = '',
      handleBtnClick,
      size = 'small',
      type = 'primary',
      model = 'dev',
      ...restProps
    } = this.props;
    const { firstLoad, rowWidth, colWidth } = this.state;

    function renderBlank() {
      return (
        <Row id="blankrow" style={{ height: 1 }}>
          <Col id="blankcol" span={12} md={12} xs={24} />
          <Col span={12} md={12} xs={24} />
        </Row>
      );
    }

    function devRow() {
      return <AutoGrid rowWidth={rowWidth} colWidth={colWidth} data={data} />;
    }
    function renderRow() {
      if (firstLoad) {
        return '';
      }
      if (model === 'dev') {
        return devRow();
      }

      return (
        <Row>
          {data.map((item, index) => {
            const { show = true, col = 1, labelWidth: itemLabelItem = '' } = item;
            const key = index;
            const targetLabelWidth = itemLabelItem || labelWidth || '';
            return (
              show && (
                <Col
                  className={styles.gridColumn}
                  key={key}
                  span={(col * 24) / 2}
                  md={(col * 24) / 2}
                  xs={24}
                >
                  <div className={`${styles.flexRow} ${item.lastRow && styles.noBorderBottom}`}>
                    {item.label && (
                      <div className={styles.flexLabel} style={{ width: targetLabelWidth }}>
                        {item.label}
                      </div>
                    )}
                    <div className={styles.flexValue}>{item.value || '--'}</div>
                  </div>
                </Col>
              )
            );
          })}
        </Row>
      );
    }

    return (
      data &&
      data.length > 0 && (
        <div className={styles.detailGrid}>
          <Card
            type="inner"
            title={title}
            style={{ width, border: 0 }}
            extra={
              extraShow && (
                <Button onClick={handleBtnClick} size={size} type={type} {...restProps}>
                  {extraTitle}
                </Button>
              )
            }
          >
            {firstLoad ? renderBlank() : ''}
            {renderRow()}
          </Card>
        </div>
      )
    );
  }
}

export default DetailGrid;
