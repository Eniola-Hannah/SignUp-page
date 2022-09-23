allStudents = []
if (localStorage.studentDetails){
    allStudents = JSON.parse(localStorage.getItem("studentDetails"))
}

function addStudent(){
    let regexForName = /^[\w]{1,}$/
    let regexForEmail = /^(([\w]+)([@])([\w]+)([.])([a-zA-Z]{1,5})([.][\w]{1,5})?)$/
    let regexForPhonenumber = /^[\d]{11}$/
    let regexForPassword = /^([\w]{4,})([\d]{3,})$/
    
    let signUp = {
        firstname:firstName.value,
        lastname:lastName.value,
        email:useremail.value,
        phonenumber:phoneNumber.value,
        password:userPassword.value,
        date:new Date(),
        matricNumber:"SQI"+ Math.round(Math.random()*10000)

    }
    
    if(signUp.firstname==""||signUp.lastname==""||signUp.phonenumber==""||signUp.email==""||signUp.password==""){
        display.innerText = "Fill out all unfilled fields"
    }
    else if(regexForName.test(firstName.value) == false){
        display.innerText = "type in a correct name!"
    }
    else if(regexForName.test(lastName.value)==false){
        display.innerText = "type in a correct name!"
    }
    else if(regexForEmail.test(useremail.value)== false){
        display.innerText = "input a valid email!"
    }
    else if(regexForPhonenumber.test(phoneNumber.value)==false){
        display.innerText = "phonenumber must be 11 digits"
    }
    else if(regexForPassword.test(userPassword.value)==false){
        display.innerText = "password must contain at least 4 letter and 3 digits"
    }else{
        allStudents.push(signUp)
        // save to localstorage but change it to a string format first since L.S saves only string
        localStorage.setItem("studentDetails", JSON.stringify(allStudents))
        display.innerHTML = "Dear "+ signUp.firstname + "<br> sign up to the school's portal was successful <br> at " + signUp.date


        firstName.value = ""
        lastName.value = ""
        useremail.value = ""
        phoneNumber.value = ""
        userPassword.value = ""
        
    }
}

function signIn(){
    let logInName = userName.value
    let logInPassword = signinPassword.value
    let logIn = false

    for (let index = 0; index < allStudents.length; index++) {
        if ((logInName == allStudents[index].firstname||logInName==allStudents[index].email) && logInPassword == allStudents[index].password){
            logIn = true
            currentStudent = allStudents[index]
            currentStudentIndex = index
        }
    }
    if(logIn){
        localStorage.setItem('currentUser', JSON.stringify(currentStudent))
        localStorage.setItem('currentUserIndex', JSON.stringify(currentStudentIndex))
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
            <td>Phone Number</td>
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
            <td>${student.phonenumber}</td>
            <td>${student.matricNumber}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteStudent(${index})"> Delete</button>
                <button class="btn btn-primary" onclick="editStudent(${index})"> Edit</button>
            </td> 
        </tr>`
    })
}


currentUserI = JSON.parse(localStorage.getItem("currentUserIndex"))
const deleteStudent =(index)=>{
    if (currentUserI == index) {
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
    }else{
        alert("Whoops!!! \nYou can only Delete your Info")
    }
}

const editStudent=(index)=>{
    if (currentUserI == index) {
        window.location.href = "editStudent.html"
    }else{
        alert("Whoops!!! \nYou can only Edit your Info")
    }
}



getIndex = JSON.parse(localStorage.getItem("currentUser"))

let a = getIndex.firstname;
let b = getIndex.lastname;
let c = getIndex.email;
let d = getIndex.phonenumber;

stdFirstName.value = a
stdLastName.value = b
stdEmail.value = c
stdPhone.value = d 


const editDone=()=>{ 
    getIndex.firstname = stdFirstName.value;
    getIndex.lastname = stdLastName.value;
    getIndex.email = stdEmail.value;
    getIndex.phonenumber = stdPhone.value ; 
    localStorage.setItem('currentUser', JSON.stringify(getIndex))
    
    
    let bigArray = JSON.parse(localStorage.studentDetails)

    let index;
    for(i in bigArray){
        if(bigArray[i].email == getIndex.email){
            index =i 
        }
    }
    bigArray[index]=getIndex
    localStorage.studentDetails = JSON.stringify(bigArray)
    console.log(bigArray)
}