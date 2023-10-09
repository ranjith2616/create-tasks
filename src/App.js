import {Component} from 'react'
import './App.css'

import {v4 as uuid} from 'uuid'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const TagButton = props => {
  const {tagDetails, onTagButton, isActive} = props
  const {optionId, displayText} = tagDetails

  const onTagBtn = () => {
    onTagButton(optionId)
  }

  const activeTag = isActive ? 'tag-active-btn tag-button' : 'tag-button'

  return (
    <li>
      <button type="button" className={activeTag} onClick={onTagBtn}>
        {' '}
        {displayText}
      </button>
    </li>
  )
}

const TaskData = props => {
  const {taskDetails} = props
  const {task, tag} = taskDetails

  const findTag = tagsList.find(each => each.optionId === tag)

  return (
    <li className="task-item-card">
      <p> {task}</p>
      <p className="tag-item"> {findTag.displayText}</p>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagsList[0].optionId,
    taskData: [],
    selectTag: '',
  }

  onSubmitForm = event => {
    event.preventDefault()

    const {task, tag} = this.state

    const newTask = {
      id: uuid(),
      task,
      tag,
    }

    this.setState(prev => ({
      taskData: [...prev.taskData, newTask],
      task: '',
      tag: tagsList[0].optionId,
    }))
  }

  onTaskEntry = event => {
    this.setState({task: event.target.value})
  }

  onTagSelect = event => {
    this.setState({tag: event.target.value})
  }

  onTagButton = id => {
    const {selectTag} = this.state

    const findId = tagsList.find(each => each.optionId === id)

    if (findId.optionId !== selectTag) {
      this.setState({selectTag: findId.optionId})
    } else if (findId.optionId === selectTag) {
      this.setState({selectTag: ''})
    }
  }

  render() {
    const {task, tag, selectTag, taskData} = this.state
    const filterTaskData = taskData.filter(each => each.tag.includes(selectTag))

    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <h1 className="form-heading"> Create a Task!</h1>

          <div className="input-card">
            <label htmlFor="task" className="label">
              {' '}
              Task
            </label>
            <input
              type="text"
              id="task"
              value={task}
              placeholder="Enter the task here"
              className="input-entry"
              onChange={this.onTaskEntry}
            />
          </div>

          <div className="input-card">
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              className="input-entry"
              value={tag}
              onChange={this.onTagSelect}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {' '}
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>

          <button className="add-button" type="submit">
            {' '}
            Add Task
          </button>
        </form>

        <div className="tags-container">
          <h1 className="tag-heading"> Tags</h1>

          <ul className="tags-list-container">
            {tagsList.map(each => (
              <TagButton
                key={each.optionId}
                tagDetails={each}
                onTagButton={this.onTagButton}
                isActive={each.optionId === selectTag}
              />
            ))}
          </ul>

          <div>
            <h1 className="tag-heading"> Tasks</h1>

            {filterTaskData.length === 0 ? (
              <div className="no-task-card">
                {' '}
                <p className="no-task-text"> No Tasks Added Yet</p>
              </div>
            ) : (
              <ul className="tasks-list-container">
                {filterTaskData.map(each => (
                  <TaskData key={each.id} taskDetails={each} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
