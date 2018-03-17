var inputBox = document.querySelector('body section div.inputComponent div.input'),
    inputTips = inputBox.previousElementSibling
    selectAllButton = document.querySelector('div.inputComponent i.fa')
    ul = document.querySelector('section ul.items'),
    itemCounter = 0,
    itemComplte = 0,
    clearComplete = document.querySelector('section div.controlBar span.clearComplete')
    allItems = ul.getElementsByTagName('li')
    switchComponent = document.querySelector('section div.controlBar div.buttons')
// 输入框全选按钮
selectAllButton.addEventListener('click', function (e) {
  if (itemCounter > 0) {
    if (this.dataset.checkall === 'nocheck') {
      this.dataset.checkall = 'checked'
      ;[].forEach.call(allItems, function (it) {
        it.querySelector('input[id^="item"]').checked = true
      })
      itemComplte = itemCounter
    } else {
      this.style.color = '#f5f5f5'
      this.dataset.checkall = 'nocheck'
      ;[].forEach.call(allItems, function (it) {
        it.querySelector('input[id^="item"]').checked = false
      })
      itemComplte = 0
    }
    refresh()
  }
})

// 底部切换按钮
switchComponent.addEventListener('click', function (e) {
  if (e.target.tagName === "SPAN") {
    isShow(e.target.dataset.which)
  }
})

// 清除已完成项
clearComplete.addEventListener('click', function (e) {
  for (let i = allItems.length - 1; i >= 0; i--) {
    if (allItems[i].querySelector('input[id^="item"]').checked) {
      itemCounter--
      itemComplte--
      allItems[i].parentNode.removeChild(allItems[i])
    }
  }
  refresh()
})
inputBox.onkeyup = function (e) {
  console.log(e.keyCode)
}

inputBox.addEventListener('keydown', function (e) {
  // 粘贴
  if (e.ctrlKey && e.key === 'v') {
    inputTips.style.display = 'none'
  }
  if (e.keyCode >= 20 && e.keyCode < 127 || e.keyCode === 229) {
    inputTips.style.display = 'none'
  }
  // Enter键
  if (e.keyCode === 13) {
    if (this.innerText.length > 0) {
      addItem(this.innerText)
    }
    this.removeChild(this.firstChild)
    inputTips.style.display = 'inline'
    e.preventDefault()
  }
})
// 始终滚动至末尾
inputBox.addEventListener('keypress', function (e) {
  //inputTips.style.display = 'none'
  this.scrollLeft = 2147483647;
})
inputBox.addEventListener('keyup', function (e) {
  if (this.innerText.length === 0) {
    inputTips.style.display = 'inline'
  } else {
    inputTips.style.display = 'none'
  }
}, true)
// blur事件
inputBox.addEventListener('blur', function (e) {
  if (this.innerText.length > 0) {
    addItem(this.innerText)
    this.removeChild(this.firstChild)
    inputTips.style.display = 'inline'
    e.preventDefault()
  }
})

ul.addEventListener('click', function (e) {
  var target = e.target
  // 删除li
  if (target.tagName === "I" && target.classList.contains('fa-times')) {
    removeItem(target.parentNode)
    refresh()
  }
  // item Done!
  if (target.tagName==="LABEL") {
    target.previousElementSibling.checked ? itemComplte-- : itemComplte++
    setTimeout(refresh, 1)
  }
})

// 条目编辑
ul.addEventListener('dblclick', function (e) {
  if (e.target.tagName === "P") {
    e.target.contentEditable = 'true'
    e.target.focus()
  }
  e.preventDefault()
}, true)
ul.addEventListener('focus', function (e) {
  if (e.target.tagName === "P") {
    var p = e.target
    var wrapper = e.target.parentNode
    wrapper.style.height = '60px'
    wrapper.style.boxShadow = 'inset 0 0 6px 0 #999'
    wrapper.nextElementSibling.style.display = 'none'
    p.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        p.blur()
        e.preventDefault()
      }
    })
  }
}, true)
ul.addEventListener('blur', function (e) {
  if (e.target.tagName = "P") {
    var wrapper = e.target.parentNode
    e.target.contentEditable = 'false'
    wrapper.style.height = 'auto'
    wrapper.style.boxShadow = '0 0 0 0';
    wrapper.nextElementSibling.removeAttribute('style')
  }
  if (e.target.innerText.length === 0) {
    removeItem(e.target.parentNode.parentNode)
  }
}, true)
// 添加条目
function addItem(str) {
  itemCounter++
  var li = document.createElement('li'),
      input = document.createElement('input'),
      label = document.createElement('label'),
      pWapper = document.createElement('div')
      p = document.createElement('p'),
      i = document.createElement('i')
  input.type = 'checkbox'
  input.id = 'item' + itemCounter
  li.appendChild(input)
  label.classList.add('button')
  label.setAttribute('for', 'item' + itemCounter)
  li.appendChild(label)
  p.appendChild(document.createTextNode(str))
  pWapper.classList.add('wrapper')
  pWapper.appendChild(p)
  li.appendChild(pWapper)
  i.classList.add('fa', 'fa-times', 'close')
  li.appendChild(i)
  li.dataset.show = 'show'
  ul.appendChild(li)
  refresh()
}
// 移除条目
/**
 * [removeItem description]
 * @param  { <li> } item [description]
 * @return {[type]}      [description]
 */
function removeItem(item) {
  itemCounter--
  if (item.querySelector('li input[id^="item"]').checked) {
    itemComplte--
  }
  item.parentNode.removeChild(item)
  refresh()
}

// 状态刷新
function refresh() {
  var inputBoxButton = document.querySelector('section div.inputComponent i.fa'),
      itemLeft = document.querySelector('section div.controlBar span.massage'),
      controlBar = document.querySelector('section div.controlBar'),
      clearComplete = controlBar.lastElementChild,
      buttons = controlBar.querySelectorAll('div.buttons label span')
  if (itemCounter > 0) {
    if (itemCounter === itemComplte) {
      inputBoxButton.dataset.checkall = 'checked'
      inputBoxButton.style.color = '#737373'
    } else {
      inputBoxButton.dataset.checkall = 'nocheck'
      inputBoxButton.style.color = '#f5f5f5'
    }
    controlBar.style.display = 'block'
    itemLeft.innerText = itemCounter - itemComplte + " item left"
  } else {
    inputBoxButton.style.color = 'white'
    controlBar.style.display = 'none'
  }
  if (itemComplte > 0) {
    clearComplete.style.display = 'inline'
  } else {
    clearComplete.style.display = 'none'
  }
  buttons.forEach(span => {
    if (span.previousElementSibling.checked) {
      span.click()
    }
  })
}

function isShow(which) {
  showAll()
  if (which === 'Active') {
    [].forEach.call(allItems, function (it) {
      if (it.querySelector('li input[id^="item"]').checked) {
        it.dataset.show = 'hide'
      }
    })
  }
  if (which === 'Completed') {
    [].forEach.call(allItems, function (it) {
      if (!it.querySelector('li input[id^="item"]').checked) {
        it.dataset.show = 'hide'
      }
    })
  }
}

function showAll() {
  [].forEach.call(allItems, li => li.dataset.show = 'show')
}