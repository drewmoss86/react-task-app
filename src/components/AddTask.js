import { useState } from 'react'

const AddTask = ({ addTask, setShowAddTask }) => {
    const [text, setText] = useState('')
    let [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault();

        if(!text){
            alert('Please enter task')
            return
        }

        addTask({ text, date, reminder })

        //reset
        setText('')
        setDate('')
        setReminder(false)
         
    }

    const datePattern = (initDateVal) => {
        var initDate = new Date(initDateVal);
        //Date pattern -- MM/DD/YYYY
        var dateRegex = /\d{2}\/\d{2}\/\d{4}$/

        if(!dateRegex.test(initDateVal)){
            var month = '';
            var day = '';
            var year = initDate.getFullYear();

            if(initDate.getMonth() < 9){
                month = '0' + String(Number(initDate.getMonth()) + 1);
            }else{
                month = String(Number(initDate.getMonth()) + 1);
            }
            if(initDate.getDate() < 10){
                day = '0' + initDate.getDate();
            }else{
                day = initDate.getDate();
            }
            
            date = month + '/' + day + '/' + year
        }
        return date;
    }
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label>Task</label>
            <input type='text' placeholder='Task Name' value={text} onChange={(e) => setText(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Date</label>
            <input type='date' placeholder='Date' value={date} onChange={(e) => setDate(datePattern(e.target.value))} />
        </div>
        <div className='form-control form-control-check'>
            <label>Reminder</label>
            <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
        </div>

        <input className='btn btn-block' type='submit' value='Add Task' />
    </form>
  )
}

export default AddTask
