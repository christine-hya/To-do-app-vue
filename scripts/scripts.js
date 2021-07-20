
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
        submitting: false,
        error: false,
        success: false,
        availablePriorities: ['low', 'medium', 'high'],
        availableCategories: ['work', 'private', 'exercise', 'category']
    },
    
    methods: {
            saveItem : function() {
              this.submitting = true;
              this.clearStatus();
                if(this.newItem.length === 0) 
                {this.error = true;              
                return;}   
                
                if (this.todoList.length > 7)
                {return;}           
                
                this.todoList.push ({
                    label: this.newItem,
                    date: '',
                    hasDate: false,
                    isComplete: false,  
                    status: 'priority',
                    category: 'category', 
                    isDisabled: true,
                    state: 'showDateButton'                                             
                    })

                    this.availableCategories=['work', 'private', 'exercise', 'category'];
                    this.error = false;
                    this.success = true;
                    this.submitting = false;    

                    this.newItem = '';               
            },

            clearStatus: function() {
              this.success = false;
              this.error = false;
            },

            toggleComplete : function(item) {
                item.isComplete = !item.isComplete;
             },

             deleteTask : function(item) {
                 let index = this.todoList.indexOf(item);
                 this.todoList.splice(index, 1);
             },

            changeState : function(newState, item) {
                item.state = newState;
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
            },
            
            finishEditing : function(event) {
                if (!this.editedTask) { return; }
                    const textbox = event.target;                    
                    this.editedTask.label = textbox.value;
                    this.editedTask.label = textbox.value.trim();

                    this.editedTask = null;
                    textbox.blur();                                    
            },    

            cancelEditing : function() {
                this.editedTask = null;
            },

            clearCompleted : function() {
                this.todoList = this.activeTodos;
            },
            
            changePriority : function (index) {
                let newIndex = this.availablePriorities.indexOf(this.filtered[index].status);
                if(++newIndex > 2) newIndex = 0;
                this.filtered[index].status = this.availablePriorities[newIndex];
            },
            
            changeCategory : function (index) {
              let newCIndex = this.availableCategories.indexOf(this.filtered[index].category);
              if(++newCIndex > 2) newCIndex = 0;
              this.filtered[index].category = this.availableCategories[newCIndex];
            },

            firstCharUpper : function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            sortAbc : function () {
              this.todoList.sort((a, b) => a.label.localeCompare(b.label));
              console.log(this.todoList);
            },
           
            orderByPriority: function () {
              let priorities = 
              {'high' : 0, 
              'medium' : 1,
              'low' : 2,
              'priority' : 3}

              this.todoList.sort((a, b) =>
              priorities[a.status] - priorities[b.status]);             
            },   
            
            clearTasks: function () {
              localStorage.clear();
              location.reload();
          }
    },
    
    computed: {
        activeTodos() {
          return this.todoList.filter(task => !task.isComplete);
        },

        completedTodos() {
            return this.todoList.filter(task => task.isComplete);
        },

        filtered: function () {
           let availableCategories = this.availableCategories;
           return this.todoList.filter(function(item) {
           return availableCategories.indexOf(item.category) >= 0;
           });                     
        },    

        invalidTask() {
          return this.newItem === '';
          },                  
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
