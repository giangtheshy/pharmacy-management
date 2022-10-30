import _ from "lodash";

export const moveOrderObject = (currentKey: string, afterKey: string, obj: any, newVal?: any) => {
  const result: any = {};
  let newObj = { ...obj };
  const val = newObj[currentKey] === undefined ? newVal : newObj[currentKey];
  delete newObj[currentKey];
  let next = -1;
  let i = 0;
  if (typeof afterKey == "undefined" || afterKey == null|| afterKey == '') afterKey = "";
  Object.entries(newObj).forEach(([k, v], i) => {
    if ((afterKey == "" && i == 0) || next == 1) {
      result[currentKey] = val;
      next = 0;
    }
    if (k == afterKey) {
      next = 1;
    }
    result[k] = v;
    ++i;
  });
  if (next == 1) {
    result[currentKey] = val;
  }
  if (next !== -1) return result;
  else return obj;
};

export const moveOrderFromObjectToAnotherObject = (
  currentKey: string,
  afterKey: string,
  currentObj: any,
  targetObj: any,
) => {
  const newCurrentObj = { ...currentObj };
  const currentValue = currentObj[currentKey];
  delete newCurrentObj[currentKey];
  const newTargetObj = moveOrderObject(currentKey, afterKey, targetObj, currentValue);
  return [newCurrentObj, newTargetObj];
};

export const moveOrderThroughNestedObject = (currentPath: string[], afterPath: string[], obj: any) => {
  let cloneObj = { ...obj },
    cloneCurrentPath = [...currentPath],
    cloneAfterPath = [...afterPath];
    let objCurrentPath, objAfterPath, keyCurrentPath, keyAfterPath;
  if (currentPath.length === 1 && afterPath.length === 1) {
    return moveOrderObject(currentPath[0], afterPath[0], obj);
  }else if(afterPath.length === 0){
    if(currentPath.length === 1 ){
      return moveOrderObject(currentPath[0], '', obj);
    }else{
      keyCurrentPath = cloneCurrentPath.pop() as string;
      objCurrentPath = _.get(cloneObj, cloneCurrentPath.join("."));
      const newObjCurrentPath = moveOrderObject(keyCurrentPath,'',objCurrentPath);
      _.set(cloneObj,cloneCurrentPath.join('.'),newObjCurrentPath);
      return cloneObj;
    }
  }
  if (currentPath.length === 1) {
    objCurrentPath = cloneObj;
    keyAfterPath = cloneAfterPath.pop() as string;
    keyCurrentPath = cloneCurrentPath[0];
    objAfterPath = _.get(cloneObj, cloneAfterPath.join("."));
  } else if (afterPath.length === 1) {
    objAfterPath = cloneObj;
    keyCurrentPath = cloneCurrentPath.pop() as string;
    keyAfterPath = cloneAfterPath[0];
    objCurrentPath = _.get(cloneObj, cloneCurrentPath.join("."));
  } else {
    keyCurrentPath = cloneCurrentPath.pop() as string;
    objCurrentPath = _.get(cloneObj, cloneCurrentPath.join("."));
    keyAfterPath = cloneAfterPath.pop() as string;
    objAfterPath = _.get(cloneObj, cloneAfterPath.join("."));
  }
  const [newCurObj, newTargetObj] = moveOrderFromObjectToAnotherObject(
    keyCurrentPath,
    keyAfterPath,
    objCurrentPath,
    objAfterPath,
  );

  if (currentPath.length === 1) {
    _.set(newCurObj, cloneAfterPath.join("."), newTargetObj);
    return newCurObj;
  } else if (afterPath.length === 1) {
    _.set(newTargetObj, cloneCurrentPath.join("."), newCurObj);
    return newTargetObj;
  } else {
    if (currentPath.length >= afterPath.length) {
      _.set(cloneObj, cloneCurrentPath.join("."), newCurObj);
      _.set(cloneObj, cloneAfterPath.join("."), newTargetObj);
    } else {
      _.set(cloneObj, cloneCurrentPath.join("."), newCurObj);
      _.set(cloneObj, cloneAfterPath.join("."), newTargetObj);
    }
    return cloneObj;
  }
};
