
//send data to server
const submitUser = (user) => {
  $.ajax({
    url: 'mongodb+srv://admin:admin@cluster0.shxjl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    contentType: 'application/json',
    data: JSON.stringify(user),
    type: 'POST',
    success: function(result) {
      alert('Form successfuly submitted')
    }
  });
}

/*const submitProject = () => {
  let project = {};
  project.first_name = $('#first_name').val();
  project.last_name = $('#last_name').val();
  project.mobile = $('#password').val();
  project.email = $('#email').val();

  console.log("Project Data Submitted: ", project);
}*/

const newUser = () => {
  let userData = {};
  let first_name = $(first_name).val()
  let last_name = $(last_name).val()
  let mobile = $(mobile).val()
  let email = $(email).val()

  let user = { first_name, last_name, mobile, email }
  
  console.log(user)
  console.log("Form Data Submitted: ", userData);
  submitUser(user)
}


const requestUsers = () => {
  $.get('/', (users) => {
    if (users.length > 0) {
      console.log(users)
      listUsers(users)
    }
  })
}

listUsers = (users) => {
  users.forEach(user => {
    console.log(user)
    let item = '<div class="column">' +
      '<p>' + user.first_name + '</p>' +
      '<p>' + user.last_name + '</p>' +
      '<p>' + user.mobile + '</p>' +
      '<p>' + user.email + '</p>' +
      '</div>'

      $('#listUsers').append(item)
  });
}

const submitForm = () => {
  let formData = {};
  formData.first_name = $(first_name).val();
  formData.last_name = $(last_name).val();
  formData.mobile = $(mobile).val();
  formData.email = $(email).val();

  console.log("Form Data Submitted: ", formData);
}


const hireButtonFunction = () => {
  //alert('Thank you for choosing to hire me')

}


// connect to the socket

let socket = io();


socket.on('number', (msg) => {
  console.log('Random number: ' + msg);
})

$(document).ready(function () {
  console.log('Ready')

  //bind the button
  $('#hireButton').click(hireButtonFunction)

  //test get call
  $.get('/test?user_name="User007"', (result) => {
    console.log(result)
  })

  requestUsers();
  $('.modal').modal();
})

