import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  ///criando um estado para se tornar o contador do id
  let [counter,setCounter] = useState(0);

  
      
  
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;

    //crio tipo igual a interface para receber os dados iniciais
    setCounter(counter+1)

    const createTask = {
      id: counter,
      title: newTaskTitle,
      isComplete: false
    }

    //uso o spreed para atribuir valor ao setTask, porque ele add o valor anterior com o novo que estamos passando
    setTasks(oldState => [...oldState , createTask])

    //limpa o input
    setNewTaskTitle('');


  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    //vamos tornar o checkbox enable
    //atribuimos a variavel os resultados filtrados 
    const enebleTask = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete
    }: task);

    setTasks(enebleTask);
    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    ///filtramos todos os resultados que não foram selecionados
    const tasksFilter = tasks.filter(task => task.id !== id)

    //retorno as tasks que não foram selecionadas
    setTasks(tasksFilter)    

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
  

}