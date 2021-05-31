const app = Vue.createApp({
  data() {
    return {
      tasks: [
      {
        id: 1,
        description: "Finish the course",
        done: false },

      {
        id: 2,
        description: "Walk the dog",
        done: true },

      {
        id: 3,
        description: "Exercise",
        done: false },

      {
        id: 4,
        description: "Read a book",
        done: true },

      {
        id: 5,
        description: "Write an article",
        done: false }],



      tasksFiltered: [],
      nextId: 6,
      activeTab: "all" };

  },
  template: `
  <div class="todo-main">
    <Header @filterTodos="filterTodos" :activeTab="activeTab" :tasks="tasksFiltered" />
    <Form @addTodo="addTodo" />
    <TodoList :tasks="tasksFiltered" @toggleTaskStatus="toggleTaskStatus" @deleteTask="deleteTask" />
  </div>`,
  methods: {
    addTodo(todo) {
      const newTodoObj = {
        description: todo,
        done: false };


      this.tasks.push(newTodoObj);
      this.filterTodos(this.activeTab);
      this.nextId++;
    },

    deleteTask(task) {
      this.tasks = this.tasks.filter(todoObj => todoObj.id !== task.id);
      this.filterTodos(this.activeTab);
    },

    toggleTaskStatus() {
      this.filterTodos(this.activeTab);
    },

    filterTodos(filterOption) {
      switch (filterOption) {
        case 'done':
          this.tasksFiltered = this.tasks.filter(task => task.done);
          this.activeTab = 'done';
          break;
        case 'undone':
          this.tasksFiltered = this.tasks.filter(task => !task.done);
          this.activeTab = 'undone';
          break;
        default:
          this.activeTab = 'all';
          this.tasksFiltered = [...this.tasks];}

    } },

  mounted() {
    this.filterTodos();
  } });


app.component('Header', {
  props: ['tasks', 'activeTab'],
  template: `
    <header class="header">
      <div class="header__date">
        <h1 class="header__date-date">{{ UTCDate }}</h1>
        <h3 class="header__date-active">{{ activeTasks() }}</h3>
      </div>

      <nav class="header__nav">
        <ul class="header__nav-list">
          <li @click="filter" class="header__nav-item" :class="{ 'header__nav-item--active': activeTab === 'all' }">
            All Tasks
          </li>
          <li @click="filter($event, 'undone')" class="header__nav-item" :class="{ 'header__nav-item--active': activeTab === 'undone' }">
            Incomplete Tasks
          </li>
          <li @click="filter($event, 'done')" class="header__nav-item" :class="{ 'header__nav-item--active': activeTab === 'done' }">
            Complete Tasks
          </li>
        </ul>
      </nav>
    </header>`,
  methods: {
    activeTasks() {
      const activeTasks = this.tasks.filter(task => !task.done);
      const activeLength = activeTasks.length;
      const taskPluralSingular = activeLength > 1 || activeLength < 1 ? "tasks" : "task";
      return `${activeLength} active ${taskPluralSingular}`;
    },
    filter(e, status) {
      console.log(e.target);
      this.$emit('filterTodos', status);
    } },

  computed: {
    UTCDate() {
      const d = new Date();
      return (
        `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`);

    } } });



app.component("Form", {
  data() {
    return {
      todo: "" };

  },
  template: `
  <div class="form">
    <form v-on:submit.prevent="submitTodo">
      <input type="text" placeholder="Enter a task..." class="form__input" v-model="todo" />
      
       <button class="form__button" type="submit">Add task</button>
    
    </form>
  </div>`,
  methods: {
    submitTodo() {
      this.$emit('addTodo', this.todo);
      this.todo = "";
    } } });



app.component("TodoList", {
  props: ['tasks'],
  methods: {
    activeClass(done) {
      return {
        'todos__item--finished': done };

    } },

  template: `
    <div class="todos">
      <ul class="todos__list">

        <li v-for="(task, index) of tasks" :key="index" :class="{'todos__item--finished': task.done}" class="todos__item">
          <div class="todos__title-and-btn">
            <button @click="toggleTaskStatus(task)" class="far fa-check-circle todos__check-btn"></button>
            <p class="todos__text">{{ task.description }}</p>
          </div>
          <button @click="deleteTask(task)" class="far fa-trash-alt todos__delete-btn"></button>
        </li>
      </ul>
    </div>
  `,
  methods: {
    toggleTaskStatus(task) {
      task.done = !task.done;
      this.$emit('toggleTaskStatus');
    },

    deleteTask(task) {
      this.$emit('deleteTask', task);
    } } });



app.mount("#app");