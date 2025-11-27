import styled from "@emotion/styled";
import { useEffect, useState} from "react";
import { TaskList } from "../components/tasks-list";
import { makeTask, type Task } from "../entities/task";
import { loadTasks, saveToLocalstorage } from "../entities/storage";
import TaskModal from "../components/task-modal";
import { LineCompleted } from "../components/task-line";
import { TaskButtonCompleted } from "../components/task-buttonCompletedAllActive";
import { TaskCheck } from "../components/task-check";
import { ButtonClearCompleted } from "../components/task-clearCompleted";
import { Thoughts } from "../components/task-thoughtsQuantity";
import { TaskStateCompleted } from "../components/task-thoughts";
import { ChoiceDateSort } from "../components/tasks-choiceSort";
import { StyledInput } from "../Input";

const Wrapper = styled.div`
  background-color: ${p => p.theme.colors.surface};
  margin: ${p => p.theme.spacing(20)} auto;
  padding: ${p => p.theme.spacing(5)};
  padding-left: ${p => p.theme.spacing(7)};
  border-left: 
  ${p => p.theme.spacing(1.5)} dashed 
  ${p => p.theme.colors.border.wrapper};
  border-top-left-radius: 0;
  border-top-right-radius: ${p => p.theme.radius.wrapper};
  border-bottom-left-radius: 0;
  border-bottom-right-radius: ${p => p.theme.radius.wrapper};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${p => p.theme.spacing(0.5)};
  font-family: ${p => p.theme.font.family.fontList};
  max-width: ${p => p.theme.spacing(120)};
  min-height: ${p => p.theme.spacing(70)};
  position: relative;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const InputAndChoiceDateSortContainer = styled.div`
  gap: 8px;
  padding: ${p => p.theme.spacing(3.7)} ${p => p.theme.spacing(1)};
  background: linear-gradient(135deg, rgba(155, 121, 207, 0.4) 0%, rgba(207, 121, 161, 0.4) 100%);
  border-radius: ${p => p.theme.spacing(1)};
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  margin-bottom: ${p => p.theme.spacing(7)};
`;

const ChoiceDateSortContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export function TasksPage() {
  let [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [value, setValue] = useState(() => {
    return localStorage.getItem('meow') || '';
  });

  useEffect(() => {
    saveToLocalstorage(tasks);
  }, [tasks]);

  function handleRemoveItem(idTarget: string) {
    setTasks(tasks.filter((t) => t.id !== idTarget));
  }

  function handleEditItem(
    id: string, 
    newTitle: string, 
    newDesc: string, 
    newDeadline: Date | null){
    setTasks(
      tasks.map((task: Task) =>
        id === task.id
          ? { ...task, 
            title: newTitle, 
            description: newDesc, 
            deadline: newDeadline
            }
          : task
      )
    );
  }

  function handleAddItem(title: string) {
    const newTitle = makeTask(title);
    setTasks([newTitle, ...tasks]);
    setTask("");
  }

  function handleToggleItem(id: string){
    setTasks(
      tasks.map((task: Task) =>
        id === task.id
          ? { ...task, complete: !task.complete}
            : task
      )
    );
  }

  function DateStrCorrection(correction: string) {
    return correction.replace(/\|/g, ',').replace(/created\s*/i, '').trim();
  }

  function DateSortNewOnesFirst(tasks: Task[]) {
    return [...tasks].sort((a, b) => {
      const A = new Date(DateStrCorrection(a.created)).getTime();
      const B = new Date(DateStrCorrection(b.created)).getTime();
      return B - A;
    });
  }

  function DateSortOlderFirst(tasks: Task[]) {
    return [...tasks].sort((a, b) => {
      const A = new Date(DateStrCorrection(a.created)).getTime();
      const B = new Date(DateStrCorrection(b.created)).getTime();
      return A - B;
    });
  }

  const sortedTasks = 
  value === 'new' ? DateSortNewOnesFirst(tasks) : DateSortOlderFirst(tasks);

  let symbols = task.trim().replace(/\s+ /g, " ").length;

  const filteredTasks = sortedTasks.filter(task => {
    if(filter === 'active') return task.complete;
    if(filter === 'completed') return !task.complete;
    return task
  })

  const searchedTasks = filteredTasks.filter(task => {
    return task.title.includes(query)
  })

  const total = tasks.length;
  const completed = tasks.filter(task => task.complete).length;
  let percent = Math.round((completed / total) * 100)
    
  if(total === 0){
    percent = 0
  }
  
  return ( 
    <Wrapper>
      <div>
        <InputAndChoiceDateSortContainer>
        <StyledInput
          value={task}
          onChange={e => setTask(e.target.value)}
          type="text"
          placeholder="fill the void..."
        />
        <TaskCheck
          symbols={symbols}
          task={task}
          tasks={tasks}
          handleAddItem={handleAddItem}
        />
        <div>
          <StyledInput
          value={query}
          onChange={e => setQuery(e.target.value)} 
          type="text"
          placeholder="search for thoughts..."
          />
          </div>
        <ChoiceDateSortContainer>
          <ChoiceDateSort
          value={value}
          setValue={setValue}
          />
        </ChoiceDateSortContainer>
        </InputAndChoiceDateSortContainer>
        <TaskButtonCompleted 
          filter={filter}
          setFilter={setFilter}
        />
        <LineCompleted
          active={percent}
        />
        <ButtonClearCompleted 
          setTasks={setTasks} 
          percent={percent}
        />
        <Thoughts 
          tasks={tasks}
        />
        <TaskStateCompleted
          filter={filter}
          quantity={filteredTasks.length}
          tasksLength={tasks.length}
        />
        <TaskList
          tasks={searchedTasks} 
          onRemove={handleRemoveItem}
          onEdit={task => setEditingTask(task)}
          onToggle={handleToggleItem}
        />
      </div>
      {editingTask && (
        <TaskModal 
        task={editingTask} 
        onSave={handleEditItem}
        onClose= {() => setEditingTask(null)}
        />
      )}
    </Wrapper>
  );
};
