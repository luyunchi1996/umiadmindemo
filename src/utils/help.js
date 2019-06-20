import _ from 'lodash';

function formatListData(payload) {
  const { filter, data, ...page } = payload;
  return {
    ...filter,
    list: data,
    pagination: {
      current: filter.page,
      pageSize: filter.size,
      total: page.total,
    },
  };
}

function unshiftIndexColumn(old, page) {
  return [
    {
      key: 'index',
      title: '序号',
      width: 60,
      fixed: 'left',
      render: (text, record, index) =>
        page ? page.size * page.page + (index + 1) - page.size : index + 1,
    },
  ].concat(old);
}

function SectionToChinese(section) {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十'];
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  let tempSection = section;
  while (tempSection > 0) {
    const v = tempSection % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos += 1;
    tempSection = Math.floor(tempSection / 10);
  }
  return chnStr;
}

function groupListByFieldKey(list, fieldKey) {
  const tempList = [];
  if (list && list.length > 0 && fieldKey) {
    const groupObj = _.groupBy(list, fieldKey);
    const fieldValueList = Object.keys(groupObj);
    fieldValueList.forEach((item, index) => {
      tempList.push({
        category: `${SectionToChinese(index + 1)}、${item}`,
        children: groupObj[item],
      });
    });
  }

  return tempList;
}

function hasAccess(findKey, keyList) {
  const findItem = _.find(keyList, item => item.rightKey === findKey);
  if (findItem) return true;
  return false;
}

export { formatListData, unshiftIndexColumn, groupListByFieldKey, hasAccess };
