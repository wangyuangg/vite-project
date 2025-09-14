import { create } from 'zustand'

// 定义 TodoItem 类型
export interface TodoItem {
  id: Date
  content: string
  completed: boolean
}

// 定义 store 的类型
interface TodoStore {
  todos: TodoItem[]
  addTodo: (content: string) => void
  toggleTodo: (id: Date) => void
  deleteTodo: (id: Date) => void
  updateTodo: (id: Date, content: string) => void
}

// 创建 store
export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  
  // 添加新的 todo
  addTodo: (content: string) => set((state) => ({
    todos: [
      ...state.todos,
      {
        id: new Date(),
        content,
        completed: false
      }
    ]
  })),

  // 切换 todo 的完成状态
  toggleTodo: (id: Date) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  })),

  // 删除 todo
  deleteTodo: (id: Date) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id)
  })),

  // 更新 todo 内容
  updateTodo: (id: Date, content: string) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, content } : todo
    )
  }))
}))
