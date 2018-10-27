const TOP = 1
const RIGHT = 2
const BOTTOM = 3
const LEFT = 4
const __NOT = 0
const MIN_TOUCH_DIS = 5

function GetSlideAngle(dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI;
}

//  根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动 
function GetSlideDirection(startX, startY, endX, endY) {
  let dy = endY - startY;
  let dx = endX - startX;
  let result = MIN_TOUCH_DIS;
  //如果滑动距离太短 
  if (Math.abs(dx) < MIN_TOUCH_DIS && Math.abs(dy) < MIN_TOUCH_DIS) {
    return result;
  }
  let angle = GetSlideAngle(dx, dy);
  if (angle >= -45 && angle < 45) {
    result = RIGHT;
  } else if (angle >= 45 && angle < 135) {
    result = BOTTOM;
  } else if (angle >= -135 && angle < -45) {
    result = TOP;
  }
  else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = LEFT;
  }
  return result;
}

//  滑动处理 
let startX, startY, currentTranslateX = 0, currentTranslateY = 0;
app.addEventListener('touchstart', function (ev) {
  startX = ev.touches[0].pageX - currentTranslateX;
  startY = ev.touches[0].pageY - currentTranslateY;
}, false);
app.addEventListener('touchmove', function (ev) {
  let endX, endY;
  endX = ev.changedTouches[0].pageX;
  endY = ev.changedTouches[0].pageY;
  let direction = GetSlideDirection(startX, startY, endX, endY);
  let dom = ev.target
  let x = currentTranslateX = (endX - startX)
  let y = currentTranslateY = (endY - startY)
  switch (direction) {
    case MIN_TOUCH_DIS:
      console.log("没滑动");
      break;
    case TOP:
      console.log("向上");
      dom.style.transform = `translateY(${y}px)`
      break;
    case RIGHT:
      console.log("向右");
      dom.style.transform = `translateX(${x}px)`
      break;
    case BOTTOM:
      console.log("向下");
      dom.style.transform = `translateY(${y}px)`
      break;
    case LEFT:
      console.log("向左");
      dom.style.transform = `translateX(${x}px)`
      break;
    default:
  }

})
app.addEventListener('touchend', function (ev) {
  let endX, endY;
  endX = ev.changedTouches[0].pageX;
  endY = ev.changedTouches[0].pageY;
  let direction = GetSlideDirection(startX, startY, endX, endY);
  switch (direction) {
    case MIN_TOUCH_DIS:
      console.log('touch end', "没滑动");
      break;
    case TOP:
      console.log('touch end', "向上");
      break;
    case RIGHT:
      console.log('touch end', "向右");
      break;
    case BOTTOM:
      console.log('touch end', "向下");
      break;
    case LEFT:
      console.log('touch end', "向左");
      break;
    default:
  }
}, false);