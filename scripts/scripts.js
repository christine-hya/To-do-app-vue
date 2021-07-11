let myVue = new Vue({
    el: '#todo-list',
    data: {
        newItem: '',
        newDate: '',
        todoList: JSON.parse(localStorage.getItem('TODOS')) 
        || [{label: 'Learn to code', date: this.newDate, hasDate: false, isComplete: false, status: 'to do'},
        {label: 'Learn vue', date: this.newDate, hasDate: false, isComplete: false, status: 'in progress'}],
        state: 'default',
        editedTask: null,
        disabled: true,
        date: null,
        availableCategories: ['low', 'medium', 'high'],
    },
    methods: {
            saveItem : function(){
                if(this.newItem.length === 0) return;
                this.todoList.push ({
                    label: this.newItem,
                    date: '',
                    hasDate: false,
                    isComplete: false,  
                    status: 'set priority'             
                    })
                this.newItem = '';
            },

            toggleComplete : function(item){
                item.isComplete = !item.isComplete;
             },

             deleteTask : function(item) {
                 let index = this.todoList.indexOf(item);
                 this.todoList.splice(index, 1);
             },

            changeState : function(newState){
                this.state = newState;
            },

            addDate : function(item) {
                this.date = item;
                let dIndex = this.todoList.indexOf(item); 
                item.hasDate = !item.hasDate;               
                this.todoList[dIndex].date = this.newDate;
                this.newDate = '';
            },

            startEditingTask : function(item) {
                
                this.editedTask = item;
                this.disabled = !this.disabled;
              
                 },
            
            finishEditing(event) {
                    if (!this.editedTask) { return; }
                    const textbox = event.target;
                    this.editedTask.label = textbox.value;
                    this.editedTask.label = textbox.value.trim();
                    this.editedTask = null;
                    this.disabled = !this.disabled;
                    
                  },    

            cancelEditing() {
                this.editedTask = null;
                  },

            clearCompleted() {
                    this.todoList = this.activeTodos;
                  },
            
            changeStatus(index) {
                let newIndex = this.availableCategories.indexOf(this.todoList[index].status);
                if(++newIndex > 2) newIndex = 0;
                this.todoList[index].status = this.availableCategories[newIndex];
            },      

            firstCharUpper(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
          
    },
    
    computed: {
        activeTodos() {
          return this.todoList.filter(task => !task.isComplete);
        },
        completedTodos() {
            return this.todoList.filter(task => task.isComplete);
          }

      },

      watch: {
        todoList: {
          deep: true,
          handler(newValue) {
            localStorage.setItem('TODOS', JSON.stringify(newValue));
          }
        }
      },
})