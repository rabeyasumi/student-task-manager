import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('studyflow-tasks')

    if (savedTasks) {
      try {
        return JSON.parse(savedTasks)
      } catch {
        // Saved data invalid হলে default tasks ব্যবহার হবে
      }
    }

    return [
      {
        id: 1,
        title: 'Complete React assignment',
        completed: false,
      },
      {
        id: 2,
        title: 'Practice JavaScript',
        completed: true,
      },
      {
        id: 3,
        title: 'Read programming notes',
        completed: false,
      },
    ]
  })

  const [newTask, setNewTask] = useState('')
  const [filter, setFilter] = useState('all')

  const [priority, setPriority] = useState('Medium')

  const addTask = (event) => {
    event.preventDefault()

    const title = newTask.trim()

    if (title === '') {
      return
    }

    const task = {
      id: Date.now(),
      title: title,
      completed: false,
      priority: priority,
    }

    setPriority('Medium')
    setTasks((previousTasks) => [...previousTasks, task])
    setNewTask('')
  }

 
const deleteTask = (id) => {
  const taskToDelete = tasks.find((task) => task.id === id)

  if (!taskToDelete) {
    return
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${taskToDelete.title}"?`
  )

  if (!confirmed) {
    return
  }

  setTasks((previousTasks) =>
    previousTasks.filter((task) => task.id !== id)
  )
}



  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const remainingTasks = totalTasks - completedTasks

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed
    }

    if (filter === 'pending') {
      return !task.completed
    }

    return true
  })


  useEffect(() => {
    localStorage.setItem(
      'studyflow-tasks',
      JSON.stringify(tasks)
    )
  }, [tasks])


  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <div className="brand-icon">S</div>

          <div>
            <h1>StudyFlow</h1>
            <p>Student Task Manager</p>
          </div>
        </div>

        <div className="header-badge">
          <span className="status-dot"></span>
          Stay productive
        </div>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
          <h2>Make today count.</h2>
          <p className="welcome-text">
            Organize your studies, track your progress, and get things done.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p>Total Tasks</p>
            <h3>{totalTasks}</h3>
          </div>

          <div className="stat-card">
            <p>Completed</p>
            <h3>{completedTasks}</h3>
          </div>

          <div className="stat-card">
            <p>Remaining</p>
            <h3>{remainingTasks}</h3>
          </div>
        </section>

        <section className="task-section">
          
        <div className="task-heading">
          
          <div>
            <div className="task-title-row">
              <h2>My Tasks</h2>
              <span className="task-count">{totalTasks}</span>
            </div>

            <p>Your daily study checklist</p>
          </div>


          <div className="filter-buttons">
            <button
              type="button"
              className={filter === 'all' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('all')}
            >
              All
            </button>

            <button
              type="button"
              className={filter === 'pending' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>

            <button
              type="button"
              className={filter === 'completed' ? 'filter-button active' : 'filter-button'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
        </div>


        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            placeholder="What do you need to study?"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            aria-label="New task title"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>


          <button type="submit" className="add-task-button">
            + Add Task
          </button>
        </form>

          
        
        {tasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>No tasks yet</h3>
            <p>Your tasks will appear here when you add them.</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">✓</div>
            <h3>No matching tasks</h3>
            <p>Try another filter to see your tasks.</p>
          </div>
        ) : (
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div
                className={`task-card ${task.completed ? 'completed' : ''}`}
                key={task.id}
              >
                <button
                  type="button"
                  className={`task-check ${task.completed ? 'checked' : ''}`}
                  onClick={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.title} as ${
                    task.completed ? 'pending' : 'completed'
                  }`}
                  aria-pressed={task.completed}
                >
                  {task.completed ? '✓' : ''}
                </button>

                <div className="task-info">
                  <h3>{task.title}</h3>
                  <p>{task.completed ? 'Completed' : 'Pending'}</p>
                </div>
                ```jsx
                <span
                  className={`priority-badge ${(task.priority || 'Medium').toLowerCase()}`}
                >
                  {task.priority || 'Medium'}
                </span>
                ```

                <span
                  className={`task-status ${
                    task.completed ? 'done' : 'pending'
                  }`}
                >
                  {task.completed ? 'Done' : 'In progress'}
                </span>

                <button
                  type="button"
                  className="delete-task-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}


        </section>
      </main>
    </div>
  )
}

export default App
