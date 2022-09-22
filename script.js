allStudents = []
if (localStorage.studentDetails){
    allStudents = JSON.parse(localStorage.getItem("studentDetails"))
}

function addStudent(){
    var signUp = {
        firstname:firstName.value,
        lastname:lastName.value,
        email:useremail.value,
        password:userPassword.value,
        date:new Date(),
        matricNumber:"SQI"+ Math.round(Math.random()*10000)

    }

    if(signUp.firstname==""||signUp.lastname==""||signUp.email==""||signUp.password==""){
        display.innerText = "Fill out all unfilled fields"
    }else{
        allStudents.push(signUp)
        // save to localstorage but change it to a string format first since L.S saves only string
        localStorage.setItem("studentDetails", JSON.stringify(allStudents))
        display.innerHTML = "Dear "+ signUp.firstname + "<br> sign up to the school's portal was successful <br> at " + signUp.date


        firstName.value = ""
        lastName.value = ""
        useremail.value = ""
        firstName.value = ""
        userPassword.value = ""
        
    }
}

function signIn(){
    var logInName = userName.value
    var logInPassword = signinPassword.value
    var logIn = false
    // get studentDetails 4rm localstorage but 'parse(change)' it back to its normal format(object)
    var allStudents = JSON.parse(localStorage.getItem("studentDetails"))

    for (let index = 0; index < allStudents.length; index++) {
        if ((logInName == allStudents[index].firstname||logInName==allStudents[index].email) && logInPassword == allStudents[index].password){
            logIn = true
        }
    }
    if(logIn){
        window.location.href = "studentTable.html"
    }else{
        display.innerText = "Incorrect Name or Password"

    }

    userName.value = ""
    signinPassword.value = ""
}

const loadStudent=()=>{
    // onclick of function delete, let it assigned the table empty first before loading the new element
    myTable.innerHTML = ""
    // had to brought the header here coz, the header keeps disappearing if left in the html
    myTable.innerHTML = `
        <tr>
            <td>S/N</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Matric Number</td>
            <td>Actions</td>
        </tr>
    `
    allStudents.map((student,index)=>{
        myTable.innerHTML += `
        <tr>
            <td> ${index+1}</td>
            <td>${student.firstname}</td>
            <td>${student.lastname}</td>
            <td>${student.email}</td>
            <td>${student.matricNumber}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent(${index})"> Delete</button>
                <button class="btn btn-primary" onclick="editStudent(${index})"> Edit</button>
            </td> 
        </tr>`
    })
}



function search(){
    window.location.href = "search.html"
}
function searchStudent(){
    allStudents = JSON.parse(localStorage.getItem("studentDetails"))
    display.innerHTML = "First name;  "+ allStudents[index.value].firstname + ", <br>Last name;  " +allStudents[index.value].lastname + ", <br>Email;  " + allStudents[index.value].email + ", <br>Matric No.;  " + allStudents[index.value].matricNumber + ", <br>Signed up at " + allStudents[index.value].date
}

const deleteStudent =(index)=>{
    confirmDeleteStudent = confirm("DANGEROUS OPERATION!!! \nDO YOU REALLY WANTS TO DELETE THIS STUDENT???")
    if (confirmDeleteStudent==true){
        let filteredStudent = allStudents.filter((_, ind) => (index != ind))
        allStudents = filteredStudent
        // After onclick of delete, let it then call the Table of the student again
        loadStudent()
        localStorage.setItem("studentDetails", JSON.stringify(allStudents))

        return true
    }else{
        return false
    }
}

const editStudent=(index)=>{
    localStorage.setItem("activeIndex", JSON.stringify(index))
    window.location.href = "editStudent.html"
    
}

const editDone=()=>{
    var editIndex = JSON.parse(localStorage.getItem("activeIndex"))
    var editActive = JSON.parse(localStorage.getItem("studentDetails"))
    firstName.value = editActive[editIndex].firstname
    lastName.value = editActive[editIndex].lastname
    stdEmail.value = editActive[editIndex].email

}