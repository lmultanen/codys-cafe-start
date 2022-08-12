const intersection = (...args) => {
  const newArr = [];
  args[0].forEach(elem => {
    let includes = true;
    for (let i = 1; i < args.length; i++) {
      if (!args[i].includes(elem)) {
        includes = false;
      }
    }
    if(includes) {
      newArr.push(elem);
    }
  })
  return newArr;
}

const flattenDeep = (arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = newArr.concat(flattenDeep(arr[i]))
    }
    else {
      newArr.push(arr[i])
    }
  }
  return newArr
}

const flipArguments = (func) => {
  return function(...args) {
    args.reverse();
    return func(...args);
  }
}

const invert = (obj) => {
  const newObj = {};
  let keys = Object.keys(obj);
  keys.forEach(key => {
    newObj[obj[key]] = key;
  })
  return newObj
}

const camelCase = (str) => {
  let strArr = str.replaceAll('_',' ').trim().split(/[\s+]/);
  strArr[0] = strArr[0].charAt(0).toLowerCase() + strArr[0].slice(1);
  for (let i = 1; i < strArr.length; i++) {
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
  }
  return strArr.join('');
}

module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
