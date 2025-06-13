import React, { useState, useEffect, createContext, useContext, useReducer } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ScrollView, 
  ActivityIndicator, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';

// --- 1. Context API for State Management ---
const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_TODOS':
      return { ...state, todos: action.payload, loading: false };
    case 'ADD_TODO':
      return { ...state, todos: [action.payload, ...state.todos] };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const initialState = {
    todos: [],
    loading: true,
    error: null,
  };

  const [state, dispatch] = useReducer(dataReducer, initialState);

  // API Endpoint Calls
  const fetchTodos = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await fetch('https://dummyjson.com/todos?limit=5');
      if (!response.ok) throw new Error('Failed to fetch todos.');
      const data = await response.json();
      dispatch({ type: 'SET_TODOS', payload: data.todos });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const addTodo = async (newTodoText) => {
    try {
      const response = await fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: newTodoText,
          completed: false,
          userId: 5,
        }),
      });
      if (!response.ok) throw new Error('Failed to add todo.');
      const data = await response.json();
      dispatch({ type: 'ADD_TODO', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };

  const updateTodoStatus = async (todoId, completed) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${todoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: completed }),
      });
      if (!response.ok) throw new Error('Failed to update todo.');
      const data = await response.json();
      dispatch({ type: 'UPDATE_TODO', payload: data });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err.message });
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <DataContext.Provider value={{ state, addTodo, updateTodoStatus, fetchTodos }}>
      {children}
    </DataContext.Provider>
  );
};

// --- 2. Todo List Component ---
const TodoApp = () => {
  const { state, addTodo, updateTodoStatus, fetchTodos } = useContext(DataContext);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  if (state.loading && state.todos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading todos...</Text>
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {state.error}</Text>
        <TouchableOpacity
          onPress={fetchTodos}
          style={styles.retryButton}
        >
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Todo List</Text>
        
        {/* Add Todo Form */}
        <View style={styles.formContainer}>
          <TextInput
            value={newTodo}
            onChangeText={setNewTodo}
            placeholder="Add a new task"
            style={styles.input}
            placeholderTextColor="#9CA3AF"
          />
          <TouchableOpacity
            onPress={handleAddTodo}
            style={styles.addButton}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Todo List */}
        <View style={styles.listContainer}>
          {state.todos.map(todo => (
            <View
              key={todo.id}
              style={[
                styles.todoItem,
                todo.completed && styles.completedTodo
              ]}
            >
              <Text
                style={[
                  styles.todoText,
                  todo.completed && styles.completedText
                ]}
              >
                {todo.todo}
              </Text>
              <TouchableOpacity
                onPress={() => updateTodoStatus(todo.id, !todo.completed)}
                style={[
                  styles.statusButton,
                  todo.completed ? styles.undoButton : styles.completeButton
                ]}
              >
                <Text style={styles.buttonText}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- 3. Main App Component ---
export default function App() {
  return (
    <DataProvider>
      <TodoApp />
    </DataProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    color: '#4B5563',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
    textAlign: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listContainer: {
    gap: 12,
  },
  todoItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  completedTodo: {
    backgroundColor: '#ECFDF5',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  completeButton: {
    backgroundColor: '#10B981',
  },
  undoButton: {
    backgroundColor: '#F59E0B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
});