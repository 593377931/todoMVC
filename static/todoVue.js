
// 新添加的条目显示在展示区域顶端
// 记录条目的最后更改时间


  var todoData = [{
        content: '点击×删除此条目',
        done: true,
        timeStamp: Date.now()
      }, {
        content: '双击编辑此条目',
        done: false,
        timeStamp: Date.now()
      }]
  var localStorageTodoData = localStorage.getItem('todolistData')
  if (localStorageTodoData && localStorageTodoData.search('content') > -1) {
    todoData = JSON.parse(localStorageTodoData)
  }
  var todos = new Vue({
    el: '#todo',
    data: {
      editing: -1,
      whichPartsShow: 'all',
      todos: todoData
    },
    methods: {
      clearCompleted() {
        this.todos = this.todos.filter(it => !it.done)
      },
      blur(event) {
        event.target.blur()
      },
      toggleEditing(index, event) {
        this.editing = index
        var parentNode = event.target.parentNode
        setTimeout(function () {
          parentNode.querySelector('input[type=text]').focus()
        })
      },
      shouldShow(index) {
        if (this.whichPartsShow === 'active') {
          if (this.todos[index].done) {
            return false
          } else {
            return true
          }
        } else if (this.whichPartsShow === 'completed') {
          if (this.todos[index].done) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      },
      toggleSelectAll() {
        if (this.allDone) {
          this.todos.forEach(item => item.done = false)
        } else {
          this.todos.forEach(item => item.done = true)
        }
      },
      addItem(e) {
        var content = e.target.value.trim()
        if (content) {
          this.todos.unshift({
            content: content,
            done: false,
            timeStamp: Date.now()
          })
        }
        e.target.value = ''
      },
      removeCurrentItem(index) {
        return this.todos.splice(index, 1)
      },
      setTime(timeStamp) {
        var createTime = new Date(timeStamp)
        return createTime.toLocaleDateString() + '    ' + createTime.toLocaleTimeString()
      }
    },
    computed: {
      leftTodoCount() {
        return this.todos.filter(item => !item.done).length
      },
      allDone() {
        return this.todos.every(item => item.done) && this.todos.length
      }
    },
    watch: {
      todos: {
        deep: true,
        handler: function saveToLocalStorage(newVal, oldVal) {
          localStorage.setItem('todolistData', JSON.stringify(newVal))
        }
      }
      
    }
  })