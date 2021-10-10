# Schedule

(Yes, it's a Todo List, but an awesome one !)

## Functionalities

### The user can:

- Register a new task with a title and a description
- See and edit the details of a task
- Delete a task when it is done or no more to do (no ckeckbox, the aim is to get rid of the tasks, not to keep track of what you have done)
- Drag and drop a task to a day or the tasks list
- See all tasks and seven days from the current day
- See if and how many times a task hasn't been done

### The application:

- Displays seven days from the current date
- Populates the days with registered tasks
- Automatically reassigns a task to the tasks list when it is assigned to a date before today

## Screen shots

_The task due to the day before has been relocated to the tasklist with a count of 1_
![img1](/img/img1.jpg)

_A click on the add button opens the modal_
![img2](/img/Img2.jpg)

_The task has been added to the task list and can be dragged to a day_
![img3](/img/Img3.jpg)

_A click on the eye icon opens the modal with the task infos to be read or updated_
![img4](/img/Img4.jpg)

## Technologies

### Frontend:

- React  
  -> react-dnd  
  -> axios  
  -> uuid  
  -> material design icons

### Backend:

- Node js  
  -> Express  
  -> Mongoose  
  -> Cors

### Database:

- MongoDb

## To run the app

- Backend:  
  -> npm install -> node server.js
- Frontend:  
  -> cd client -> npm install -> npm start
- Browser:  
  -> Access the app on localhost:3000
