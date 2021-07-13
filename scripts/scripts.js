let myVue = new Vue({
    el: '#todo-list',
    data: {
        newItem: '',
        newDate: '',
        todoList: JSON.parse(localStorage.getItem('TODOS')) 
        || [],
        state: 'showDateButton',
        editedTask: null,
        isDisabled: true,
        date: null,
        availablePriorities: ['low', 'medium', 'high'],
        availableCategories: ['work', 'private', 'exercise']
    },
    methods: {
            saveItem : function(){
                if(this.newItem.length === 0) 
                return ;
                
                this.todoList.push ({
                    label: this.newItem,
                    date: '',
                    hasDate: false,
                    isComplete: false,  
                    status: 'priority',
                    category: 'select',                             
                    })
                this.newItem = '';
                this.changeState('showDateButton');                
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
              this.isDisabled = !this.isDisabled;
                this.editedTask = item;               
              
                 },
            
            finishEditing : function(event) {
                    if (!this.editedTask) { return; }
                    const textbox = event.target;
                    this.editedTask.label = textbox.value;
                    this.editedTask.label = textbox.value.trim();
                    this.editedTask = null;
                    // this.isDisabled = !this.isDisabled;
                    
                  },    

            cancelEditing : function() {
                this.editedTask = null;
                  },

            clearCompleted : function() {
                    this.todoList = this.activeTodos;
                  },
            
            changeStatus : function (index) {
                let newIndex = this.availablePriorities.indexOf(this.todoList[index].status);
                if(++newIndex > 2) newIndex = 0;
                this.todoList[index].status = this.availablePriorities[newIndex];
            },
            
            changeCategory : function (index) {
              let newCIndex = this.availableCategories.indexOf(this.todoList[index].category);
              if(++newCIndex > 2) newCIndex = 0;
              this.todoList[index].category = this.availableCategories[newCIndex];
            },

            firstCharUpper : function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            convertDate : function (duedate) {
              const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(duedate);
              const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(duedate);
              duedate = `${da} ${mo}`;
            },

            displayWorkTodos : function () {
              
              return this.todoList.filter(task => task.category === 'work');
            },

            displayAll : function () {
              this.todoList = this.todoList;
            }
          
    },
    
    computed: {
        activeTodos() {
          return this.todoList.filter(task => !task.isComplete);
        },
        completedTodos() {
            return this.todoList.filter(task => task.isComplete);
          },

        workTodos() {
        return this.todoList.filter(task => task.category === 'work');
         }, 

        privateTodos() {
          return this.todoList.filter(task => task.category === 'private');
        },

        exerciseTodos() {
          return this.todoList.filter(task => task.category === 'exercise');
        },

        warningClasses() {
            return{
            'border' : this.newItem.length===0,
            'border-danger' : this.newItem.length===0,
            'border-4' : this.newItem.length===0,
          }
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
