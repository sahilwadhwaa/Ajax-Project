
//document.getElementById('button').addEventListener('click', loadUsers);
document.addEventListener('DOMContentLoaded', loadTable);

        function loadTable(){
            var xhr= new XMLHttpRequest();
            xhr.open("GET", 'https://www.mecallapi.com/api/users', true);

            xhr.onload= function(){
                if(this.status== 200){
                    var users = JSON.parse(this.responseText);

                    //console.log(users);

                    var output= '';
                    for(var i in users){
                        output+= 
                        '<tr>'+
                        '<td> '+ users[i].id+ '</td>'+
                        '<td><img src="'+users[i].avatar+'" width="70" height="70"></td> '+
                        '<td> '+ users[i].fname+ '</td>'+
                        '<td> '+ users[i].lname+ '</td>'+
                        '<td> '+ users[i].username+ '</td>'+
                        '<td>'+ '<button>Edit</button>'+ 
                        '<button>Del</button>' + '</td>'+ '</tr>';   
                    }

                    document.getElementById('mytable').innerHTML= output;
                }
            }

            xhr.send();
        }
        
        document.getElementById('button').addEventListener('click', showUserCreateBox);
        function showUserCreateBox(){
            Swal.fire({
              title: 'Create user',
              html:
                '<input id="id" type="hidden">' +
                '<input id="fname" class="swal2-input" placeholder="First">' +
                '<input id="lname" class="swal2-input" placeholder="Last">' +
                '<input id="username" class="swal2-input" placeholder="Username">' +
                '<input id="email" class="swal2-input" placeholder="Email">',
              focusConfirm: false,
              preConfirm: () => {
                userCreate();
              }
            })
          }
          
          function userCreate() {
            const fname = document.getElementById("fname").value;
            const lname = document.getElementById("lname").value;
            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
              
            const xhttp = new XMLHttpRequest();
            xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.send(JSON.stringify({ 
              "fname": fname, "lname": lname, "username": username, "email": email, 
              "avatar": "https://www.mecallapi.com/users/cat.png"
            }));
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                const objects = JSON.parse(this.responseText);
                Swal.fire(objects['message']);
                loadTable();
              }
            };
          }
        

