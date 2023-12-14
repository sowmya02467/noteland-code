

let notesRootElement = document.querySelector(".notelist")
let notesWriteElement = document.querySelector(".mainContent")


document.querySelector(".createNote").style.display="none";
document.querySelector(".noteDisplay").style.display="none";
document.querySelector(".addNewTask").style.display="none"
document.querySelector(".note").style.display="none"

let tasklist = []

let notes = []

function renderElementsToScreen(){
    if (localStorage.getItem("notes")){
        notes = JSON.parse(localStorage.getItem("notes"))
        notes.forEach(note =>{
        renderNoteToList(note, note.uniqueID) 
        })
    }
}



function display(){
    
    if(localStorage.getItem("tasklist")){
        tasklist = JSON.parse(localStorage.getItem("tasklist"))
        tasklist = tasklist
      
        console.log(tasklist)
    }
}
display()


//       write elements            //




document.querySelector(".newNoteButton").addEventListener("click", ()=>{

    document.querySelector(".createNote").style.display="block";
    document.querySelector(".checkNotes").style.display="none"
    document.querySelector(".noteDisplay").style.display="none"

    let write = {
        WriteTitle: document.querySelector(".createNoteTitle"),
        writeContent: document.querySelector("#createNoteContent"),
        writePress:document.querySelector("createNoteButton")
    } 

    document.querySelector(".createNote").remove()
    renderWriteNote(write)    

})



function renderWriteNote(write){

    let writeDiv = document.createElement("div")
    writeDiv.className = "createNote"   

   let writeDiv1 = document.createElement("div")
    writeDiv1.className = "writeNote"

    let writeInput = document.createElement("input")
    let writeImg = document.createElement("img")
    writeImg.src = "./x-removebg-preview.png"
    let writeTextArea = document.createElement("textarea")
    let writeButton = document.createElement("button")
    writeButton.className = "createNoteButton"


    writeInput =write.WriteTitle;
    writeTextArea =write.writeContent;
    writeButton.innerText = "Create Note" 

    writeButton.addEventListener("click", ()=>{
        
    let uniqueID = "note" + Math.floor(Math.random() * 1000)
        
        let note = {        
            title:document.querySelector(".createNoteTitle").value,
            content: document.querySelector("#createNoteContent").value,
            tasks: tasklist
           
        }
        if( note.title.trim().length > 0 && note.content.trim().length > 0 ){
            renderNoteToList(note, uniqueID)
            addNoteToLocalStorage(note, uniqueID) 
        }
        else{
            alert("Note is empty! write something")
        }

    })

    writeImg.addEventListener("click", ()=>{
        document.querySelector(".createNote").style.display="none";   
    })

    writeDiv1.appendChild(writeImg)   
    writeDiv1.appendChild(writeInput)
    writeDiv1.appendChild(writeTextArea)
    writeDiv.appendChild(writeDiv1)
    writeDiv.appendChild(writeButton)
 

    notesWriteElement.appendChild(writeDiv)
   
}






//       create note        //






function renderNoteToList(note, uniqueID){  

   

   let noteDiv = document.createElement("div")
   noteDiv.classList.add("note", uniqueID)
   let noteTitle = document.createElement("h2")
   let noteData = document.createElement("h5")


   noteTitle.innerText = note.title;
   noteData.innerText = note.content;





   noteDiv.addEventListener("click", ()=>{

    document.querySelector(".checkNotes").style.display="none"
   document.querySelector(".createNote").style.display="none"

    let item = {
        title: note.title,
        heading: note.content
    }
         
    document.querySelector(".noteDisplay").remove()
         renderListItemToBody(item)

         if(localStorage.getItem("tasklist")){
            tasklist = JSON.parse(localStorage.getItem("tasklist"))
            tasklist = tasklist
            renderCreateTask(tasklist)
           tasklist.forEach(taskitems => {
            renderTaskItem(taskitems)
           })

    }

  })


   noteDiv.appendChild(noteTitle)
   noteDiv.appendChild(noteData)

   notesRootElement.appendChild(noteDiv)

   document.querySelector(".createNoteTitle").value = ""
   document.querySelector("#createNoteContent").value = ""
  
}


function addNoteToLocalStorage(note, uniqueID){
    note = {...note, uniqueID}
    notes.push(note)
    localStorage.setItem("notes", JSON.stringify(notes))
}



//         Display item          //



  document.querySelector(".note").addEventListener("click", ()=>{

    document.querySelector(".noteDisplay").style.display="block";
   
  
    document.querySelector(".noteDisplay").remove()
    renderListItemToBody(item)    

  })



  function renderListItemToBody(item){

    let displayDiv = document.createElement("div")
    displayDiv.className ="noteDisplay"

    let displayDiv1 = document.createElement("div")
    displayDiv1.className ="titleDisplay"

    let displayTitle = document.createElement("h3")

    let btn1 = document.createElement("button")
    btn1.className ="newTask"

    let btn2 = document.createElement("button")
    btn2.className ="deleteNote"    

    let displayDiv2 = document.createElement("div")
    displayDiv2.setAttribute("id", "displaydiv2")
    displayDiv2.className ="noteBody"
    let displayheading = document.createElement("h4")
    displayheading.setAttribute("id", "headname")
 

    displayTitle.innerHTML = item.title;
    displayheading.innerHTML = item.heading;
    btn1.innerText = "New Task"
    btn2.innerText = "Delete Note"



    btn1.addEventListener("click", ()=>{    
        document.querySelector(".addNewTask").style.display="block" 
        let task ={
            inputWrite: document.querySelector(".writeTask")           
        }
        if(document.querySelector("#tasknames")){
            alert("creating new task")
        }     
        else{         
          renderCreateTask(task)   
        }
    })

    btn2.addEventListener("click", (id)=>{
        document.querySelector(".note").remove()
        document.querySelector(".noteDisplay").style.display="none" 
        localStorage.clear()       

        removeItem(id)

    })    

    displayDiv1.appendChild(displayTitle)
    displayDiv1.appendChild(btn1)
    displayDiv1.appendChild(btn2) 
    displayDiv2.appendChild(displayheading)   

    displayDiv.appendChild(displayDiv1)
    displayDiv.appendChild(displayDiv2)

    notesWriteElement.appendChild(displayDiv)

}

function removeItem(id){
    
    notes = JSON.parse(localStorage.getItem('notes'))

    let index = notes.findIndex(note => note.UniqueID == id)

    notes.splice(index, 1)

    localStorage.setItem('notes', JSON.stringify(notes));

}


function  renderCreateTask(task){

    let taskDiv = document.createElement("div")
    taskDiv.setAttribute("class", "addNewTask")
    taskDiv.className ="addNewTask"
    let taskDiv1 = document.createElement("div")
    taskDiv1.className ="inputdiv"    
    let taskImg = document.createElement("img")
    taskImg.setAttribute("class", "cancelimg")
    taskImg.src = "./icons/cancel.png"
    let taskInput = document.createElement("input")
    taskInput.setAttribute("class", "writeTask")
    let taskButton = document.createElement("button")
    taskButton.setAttribute("class", "taskButton")   
 
    taskInput = task.inputWrite;
    taskButton.innerText ="Create Task"

    taskDiv1.appendChild(taskImg)
    taskDiv1.appendChild(taskInput)
    taskDiv.appendChild(taskDiv1)
    taskDiv.appendChild(taskButton)

   notesWriteElement.appendChild(taskDiv)   
  
}



  
document.querySelector(".taskButton").addEventListener("click", () => {
    document.querySelector("#displaydiv2").style.display ="block"   
  
    let uniqueid =  Math.floor(Math.random() * 200)

    let taskitems ={
        taskname: document.querySelector(".writeTask").value        
    }
    if(document.querySelector(".writeTask").value.trim().length > 0){
        renderTaskItem(taskitems, uniqueid)
        storeTask(taskitems, uniqueid)
    }
    else{
        alert("note is empty")
    }

    document.querySelector(".addNewTask").style.display="none"
    document.querySelector(".writeTask").value=""
})



function renderCreateTask(){

    let taskTitle = document.createElement("h1")
    taskTitle.setAttribute("class", "tasktitle")
    taskTitle.setAttribute("id", "tasknames")
    taskTitle.innerText = "Task List"
    document.querySelector("#displaydiv2").appendChild(taskTitle)

    let hr = document.createElement("hr")
    document.querySelector("#displaydiv2").appendChild(hr)

    let taskDiv = document.createElement("ul")
    taskDiv.setAttribute("id", "taskdiv")
    document.querySelector("#displaydiv2").appendChild(taskDiv)       
   
}



function renderTaskItem(tasklist){


    let li = document.createElement("li")
    document.querySelector("#taskdiv").appendChild(li)

    let checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("id", "checkbox")
    li.appendChild(checkbox)

    let label = document.createElement("label")
    label.innerText = tasklist.taskname
    li.appendChild(label)

    let br = document.createElement("br")
    li.appendChild(br)
    
    document.querySelector("#taskdiv").appendChild(li)
}




function storeTask(taskitems){

    taskitems = {...taskitems}
    tasklist.push(taskitems)    
    localStorage.setItem("tasklist", JSON.stringify(tasklist))
}










renderElementsToScreen()

document.querySelector(".notes-found").innerText =  JSON.parse(localStorage.getItem("notes")).length + " Notes Found"
















