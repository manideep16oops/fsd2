const api = "/api/users";
const usersBody = document.getElementById("usersBody");
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const msg = document.getElementById("msg");
const cancelEdit = document.getElementById("cancelEdit");

let editId = null;

async function fetchUsers(){
    try {
        const res = await fetch(api);
        const data = await res.json();
        renderUsers(data);
    } catch (err) {
        showMsg("Error loading users",true);
    }
}

function renderUsers(users){
    usersBody.innerHTML = users.map(u => `
        <tr data-id="${u._id}">
          <td>${escapeHtml(u.name)}</td>
          <td>${escapeHtml(u.email)}</td>
          <td>
              <button onclick="onEdit('${u._id}','${escapeJs(u.name)}','${escapeJs(u.email)}')"> EDIT </button>
              <button onclick="onDelete('${u._id}')">Delete</button>
          </td>
        </tr>
                `).join("");
}

function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, function (s) {
        return "&#" + s.charCodeAt(0) + ";";
    });
}

function escapeJs(str) {
    return encodeURIComponent(str);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if(!name || !email){
        showMsg("Please fill Name and Email",true);
        return;
    }
    try{

        if(editId){
            const res = await fetch(`${api}/${editId}`,{
                method: "PUT",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ name , email})
            });
            if (!res.ok)
                throw await res.json();

                showMsg("USer Updated Successfully");
                editId = null;
                cancelEdit.style.display = "none";
            }
            else{
                const res = await fetch(api, {
                    method :"POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({name,email})
            });
                if(res.status !== 201)
                    throw await res.json();

               showMsg("User Added Successfully");
            }
            form.reset();
            fetchUsers();
        } catch (err) {
            showMsg(err.error || err.message || "Error", true);
        }
    
});

window.onEdit =(id,nameEnc, emailEnc) =>{

    nameInput.value =  decodeURIComponent(nameEnc);
    emailInput.value = decodeURIComponent(emailEnc);

    editId = id;
    cancelEdit.style.display = "inline";

    showMsg("Editing Mode");
};

window.onDelete = async (id) => {

     if (!confirm("Delete this user ?"))
        return;

     try{
        const res = await fetch(`${api}/${id}`,{
            method: "DELETE"
        });
        if (!res.ok)
            throw await res.json();

        showMsg("User Deleted Successfully");
        fetchUsers();
     } catch (err){
        showMsg(err.error || "Delete Failed", true);
     }
};

cancelEdit.addEventListener("click", () => {
    editId = null;
    form.reset();
    cancelEdit.style.display = "none";
    showMsg("");
});

function showMsg(text,  isError = false){
    msg.textContent = text;
    msg.style.color = isError ? "red" : "green" ;

    if(text === "") {
        msg.style.display = "none";
    }else {
        msg.style.display = "block";
    }

    setTimeout(()=> {
        if (!isError){
            msg.textContent = "";
        }
    },2500);
}

fetchUsers();