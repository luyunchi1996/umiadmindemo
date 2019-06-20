import React, { PureComponent } from 'react';
import { Button } from 'antd';
import XLSX from 'xlsx';
import styles from './index.less';

class ImportComp extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      uploadInputId: props.uploadInputId ? props.uploadInputId : new Date().getUTCMilliseconds(),
      rABS: false,
    };
  }

  handleUploadBtnClick = () => {
    const { uploadInputId } = this.state;
    this.clearAllData();
    document.getElementById(uploadInputId).click();
  };

  clearAllData = () => {
    const { uploadInputId } = this.state;
    document.getElementById(uploadInputId).value = null;
  };

  handkeFileChange = e => {
    const targetRawFile = e.target.files[0];
    this.fileConvertToWorkbook(targetRawFile)
      .then(wb => {
        const workbook = this.formatExcelData(wb);
        const xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        // 移除总计行
        const len = xlsxArr.length;
        if (len > 0) {
          if (Object.keys(xlsxArr[xlsxArr.length - 1]).length < 2) {
            xlsxArr.pop();
          }
          this.initTable(this.xlsxArrToTableArr(xlsxArr));
        } else {
          this.$Message.warning('此文件数据为空！');
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  fileConvertToWorkbook = file => {
    const { rABS } = this.state;
    const reader = new FileReader();
    const fixdata = data => {
      let o = '';
      let l = 0;
      const w = 10240;
      for (; l < data.byteLength / w; l += 1) {
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      }
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
    };
    return new Promise((resolve, reject) => {
      try {
        reader.onload = renderEvent => {
          const data = renderEvent.target.result;
          if (rABS) {
            /* if binary string, read with type 'binary' */
            resolve(XLSX.read(data, { type: 'binary' }));
          } else {
            /* if array buffer, convert to base64 */
            const arr = fixdata(data);
            resolve(XLSX.read(btoa(arr), { type: 'base64' }));
          }
        };
        reader.onerror = error => {
          reject(error);
        };
        if (rABS) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  formatExcelData = workbook => {
    const { exportMap = {} } = this.props;
    const sheets = workbook.Sheets[workbook.SheetNames[0]];
    let currCol = 'A1'; // 设置表头格式化起始ceil
    let currSheet = sheets[currCol];
    while (currSheet) {
      // 将当前单元格的v和w对应的值改为传入map对应的值
      currSheet.v = exportMap[currSheet.v] || currSheet.v;
      currSheet.w = exportMap[currSheet.w] || currSheet.w;
      // 获取表头格式化下一个ceil
      currCol = this.getNextColName(currCol);
      currSheet = sheets[currCol];
    }
    return workbook;
  };

  getNextColName = currName => {
    const strArr = currName.split('').reverse();
    const posArr = [];
    while (strArr[0].charCodeAt() > 47 && strArr[0].charCodeAt() < 58) {
      posArr.push(strArr.shift());
    }
    const newArr = [...strArr];
    newArr[0] = String.fromCharCode(newArr[0].charCodeAt() + 1);
    strArr.forEach((str, index) => {
      const asciiCode = newArr[index].charCodeAt();
      if (asciiCode > 90) {
        newArr[index] = 'A';
        if (index === strArr.length - 1) {
          newArr.push('A');
        } else {
          newArr[index + 1] = String.fromCharCode(newArr[index + 1].charCodeAt() + 1);
        }
      }
    });
    newArr.unshift(...posArr);
    return newArr.reverse().join('');
  };

  initTable = ({ data, header }) => {
    const { onSelectFile = {} } = this.props;
    const tableData = {
      header,
      body: data,
    };
    onSelectFile(tableData);
  };

  xlsxArrToTableArr = xlsxArr => {
    const { dataProcessFuncMap = {} } = this.props;
    const tableArr = [];
    let len = 0;
    let maxLength = 0;
    let maxLengthIndex = 0;
    xlsxArr.forEach((item, index) => {
      len = Object.keys(item).length;
      if (maxLength < len) {
        maxLength = len;
        maxLengthIndex = index;
      }
    });
    const tableHeader = Object.keys(xlsxArr[maxLengthIndex]);
    let rowItem = {};
    xlsxArr.forEach(item => {
      rowItem = {};
      for (let i = 0; i < maxLength; i += 1) {
        if (item[tableHeader[i]]) {
          if (typeof item[tableHeader[i]] === 'string') {
            rowItem[tableHeader[i]] = item[tableHeader[i]].trim();
          } else if (typeof item[tableHeader[i]] === 'number') {
            rowItem[tableHeader[i]] = item[tableHeader[i]].toString();
          }
        } else {
          rowItem[tableHeader[i]] = '';
        }
      }
      // 自定义处理字段
      const willDealKeyArr = Object.keys(dataProcessFuncMap);
      willDealKeyArr.forEach(dealKey => {
        let args = dataProcessFuncMap[dealKey];
        args = [...args];
        // 获取待处理字段的处理方法
        const dealFunc = args.pop();
        // 获取待处理字段的参数
        const dealFuncArgs = args.map(arg => item[arg]);
        rowItem[dealKey] = dealFunc(...dealFuncArgs);
      });
      tableArr.push(rowItem);
    });

    return {
      header: tableHeader,
      data: tableArr,
    };
  };

  render() {
    const { accept = '.xlsx, .xls' } = this.props;
    const { uploadInputId } = this.state;
    return (
      <div className={styles.xlsxImportContainer}>
        <Button
          type="primary"
          htmlType="submit"
          onClick={this.handleUploadBtnClick}
          style={{ marginRight: 8 }}
        >
          批量导入
        </Button>
        <input
          id={uploadInputId}
          type="file"
          accept={accept}
          className={styles.cHide}
          onChange={this.handkeFileChange}
        />
      </div>
    );
  }
}

export default ImportComp;
