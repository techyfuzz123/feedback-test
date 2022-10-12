import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TodoCard from './TodoCard'

export default function UserDashboard() {
  const {userInfo, currentUser} = useAuth()
  const [addTodo, setAddTodo] = useState(false)
  const [todo, setTodo] = useState('')
  const [edit, setEdit] = useState(null)
  const [edittedValue, setEdittedValue] = useState('')
  // const [todoList, setTodoList] = useState({})

  const {todos, loading,setTodos, error} = useFetchTodos()

  useEffect(() => {
    if(!userInfo || Object.keys(userInfo).length === 0){
      setAddTodo(true)
    }
  },[userInfo])

  async function handleAddTodo() {
    if(!todo){return}
    const newKey = Object.keys(todos).length === 0 ? 1 : (Math.max(...Object.keys(todos)) + 1)
    setTodos({...todos, [newKey]: todo})
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]: todo
      }
    }, {merge: true})
    setTodo('')
  }

  async function handleEditTodo() {
    if(!edittedValue){return}
    const newKey = edit
    setTodos({...todos, [newKey]: edittedValue})
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]: edittedValue
      }
    }, {merge: true})
    setEdit(null)
    setEdittedValue('')
  }

  function handleAddEdit(todoKey) {
    return ()=>{
      setEdit(todoKey)
      setEdittedValue(todos[todoKey])
    }
  }

  function handleDelete(todokey) {
    return async()=> {
      const tempObj = {...todos}
      delete tempObj[todokey]
      setTodos(tempObj)
      const userRef = doc(db, 'users', currentUser.uid)
      await setDoc(userRef, {
        'todos': {
          [todokey]: deleteField()
        }
      }, {merge: true})
    }
  }

  return (
    <div className='w-full max-w-[65ch] mx-auto flex flex-col flex-1 gap-3 sm:gap-5'>
      {addTodo && <div className='flex items-stretch'>
        <input type="text" placeholder="Enter Todo" value={todo}
        onChange={(e) => setTodo(e.target.value)} className="outline-none
        text-base sm:text-lg text-slate-900 p-3 flex-1"  /> 
        <button className='w-fit px-4 sm:px-6 py-2 sm:py-3 bg-amber-400 text-white
        font-medium text-base duration-300 hover:opacity-40'
        onClick={handleAddTodo} >ADD</button>
      </div>}
      {!addTodo && <button onClick={() => setAddTodo(true)} className='text-cyan-300 border border-solid 
      border-cyan-300 py-2 text-center uppercase
      text-lg duration-300 hover:opacity-30'>ADD TODO</button>}

      {loading && (<div className='flex-1 grid place-items-center'>
        <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
      </div>)}

{/* 
      {(!loading) && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return (
              <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} handleDelete={handleDelete}
               edittedValue={edittedValue} setEdittedValue={setEdittedValue} edit={edit} todoKey={todo} index={i}>
                {todos[todo]}
              </TodoCard>
            )
          })}
        </>
      )} */}
    </div>
  )
}
