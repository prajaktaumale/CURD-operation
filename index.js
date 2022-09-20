//write a logic to get the data 
async function getUsers(){
    let users;

    try {
        //Fetch the data from an mock api 
        const data=await fetch("https://632948a84c626ff832be0d1d.mockapi.io/user",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            }
        })
        //hold the data response in users variable 
        users=await data.json();
        // console.log(users);
    } catch (error) {
       console.log(error); 
    }

    return users;
}

// getUsers(); //call a function to get the users data 


//Write a functionality to display the entire data in DOM 
async function displayUsers(){
    let users=await getUsers()
    console.log(users);

    const userList=document.querySelector(".user-list");
    userList.innerHTML="";//make div as empty at inital level 
    users.forEach((user)=>{
        // console.log(user.name)
        // console.log(user.avatar);

        userList.innerHTML+=`
        <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt="${user.name}">
        <h4> Name:${user.name}</h4>
        <h4> Address:${user.address}</h4>
        <h4> Education:${user.education}</h4>
        <button onClick="deleteUser(${user.id})">Delete</button>
        <button onClick="editUser(${user.id})">Edit</button>  
        </div>
        `
    })
}
displayUsers();


async function addUser(){
    const userName=document.querySelector(".add-user-name").value;
    const userAvatar=document.querySelector(".add-user-avatar").value;
    const userEducation=document.querySelector(".add-user-education").value;
    const userAddress=document.querySelector(".add-user-address").value;
    

    // console.log(userName,+" "+userAvatar);
    const data=await fetch(`https://632948a84c626ff832be0d1d.mockapi.io/user`,{
        method:"POST",
        body:JSON.stringify({
            name:userName,
            avatar:userAvatar,
            education:userEducation,
            address:userAddress
        }),
        headers:{
            "Content-Type": "application/json",
        }
    })
    displayUsers();
}

//write a logic to delete the user data when click on delete button 
async function deleteUser(id){
    try {
        const data=await fetch(`https://632948a84c626ff832be0d1d.mockapi.io/user/${id}`,
        {
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
            }
        })
        const users=await data.json();
        console.log(users);
        displayUsers()
        
    } catch (error) {
        console.log(error);
    }
}
