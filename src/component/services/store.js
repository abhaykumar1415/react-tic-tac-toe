const store = {
  valueArr: ['', '', '', '', '', '', '', '', '',]
}

const getValueArr = () => {
  console.log('store.valueArr :', store.valueArr);
  return store.valueArr;
}

const setVallueArr = (arr) => {
  store.valueArr = arr;
}

window.Store = store;
const Store = { getValueArr, setVallueArr, val: store };
export default Store;
