import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import styles from './style.less';

class AutoGrid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { rowWidth, colWidth, data } = this.props;

    function renderContent() {
      return (
        <div className={`${styles.flexRow}`} style={{ border: 0 }}>
          <div className={styles.flexLabel} style={{ borderLeft: 0 }}>
            title
          </div>
          <div className={styles.flexValue}>title</div>
        </div>
      );
    }

    function renderCol(col, content) {
      const cols = [];
      switch (col) {
        case 2:
          cols.push(
            <Col
              style={{ borderLeft: '1px solid  #e8e8e8', borderRight: '1px solid  #e8e8e8' }}
              className={styles.gridColumn}
              span={24}
              md={24}
              xs={24}
            >
              {content()}
            </Col>,
          );
          break;
        default:
          cols.push(
            <Col
              style={{ borderLeft: '1px solid  #e8e8e8' }}
              className={styles.gridColumn}
              span={12}
              md={12}
              xs={24}
            >
              {content()}
            </Col>,
          );
          cols.push(
            <Col
              style={{ borderLeft: '1px solid  #e8e8e8', borderRight: '1px solid  #e8e8e8' }}
              className={styles.gridColumn}
              span={12}
              md={12}
              xs={24}
            >
              {content()}
            </Col>,
          );
          break;
      }

      return cols;
    }

    return (
      <div>
        <Row style={{ borderBottom: '1px solid #e8e8e8' }}>{renderCol(2, renderContent)}</Row>
        <Row style={{ borderBottom: '1px solid #e8e8e8' }}>{renderCol(1, renderContent)}</Row>
        <Row style={{ borderBottom: '1px solid #e8e8e8' }}>{renderCol(2, renderContent)}</Row>
        <Row style={{ borderBottom: '1px solid #e8e8e8' }}>{renderCol(1, renderContent)}</Row>
      </div>
    );
  }
}

export default AutoGrid;
