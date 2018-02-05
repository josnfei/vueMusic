
// dom是否有这个class
export function hasClass(el,className){
  let reg=new RegExp('(^|\\s)'+className+'(\\s|$)');
  return reg.test(el.className);
}

// dom添加class
export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  let newClass=el.className.split(' ');
  newClass.push(className);
  el.className=newClass.join(' ');
}