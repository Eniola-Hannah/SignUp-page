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
        console.log(allStudents)
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




for (var index = 0; index < allStudents.length; index++) {
    myTable.innerHTML += `
    <tr>
        <td> ${index+1}</td>
        <td>${allStudents[index].firstname}</td>
        <td>${allStudents[index].lastname}</td>
        <td>
            <button class="btn btn-danger"> Delete</button>
            <button class="btn btn-success"> Edit</button>
        </td> 
    </tr>`
    // console.log(allStudents[index].firstname)
}   


function search(){
    window.location.href = "search.html"
}
function searchStudent(){
    allStudents = JSON.parse(localStorage.getItem("studentDetails"))
    display.innerHTML = "First name;  "+ allStudents[index.value].firstname + ", <br>Last name;  " +allStudents[index.value].lastname + ", <br>Email;  " + allStudents[index.value].email + ", <br>Matric No.;  " + allStudents[index.value].matricNumber + ", <br>Signed up at " + allStudents[index.value].date
}