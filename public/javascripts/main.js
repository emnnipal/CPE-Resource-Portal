// $('#delete').on('click', function(e){
//   e.preventDefault();

//   $('input:checked').each(function(index, value){
//     var val = $(this).attr('id');
//     console.log($(this));
//     var $thisInput = $(this);

//     $.ajax({
//       url:'/departments/'+val,
//       type:'DELETE'
//     }).done(function(){
//       $thisInput.parents('tr').remove();
//     });

//   });
// });

function getSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
}
  
if (window.location.pathname === '/departments') {
  if (localStorage.getItem("search") === 'null'||localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0) {
    fetch('api/v1/department?sort=createdate').then(function(res) {
      res.json().then(function(departments) {
        console.log('departments', departments);
        var tbody = document.getElementById('table-body');
        departments.forEach(function(department) {
          tbody.insertAdjacentHTML('beforeend', '<li><a class="panel-block is-active" href="/departments/' + department._id + '">' + department.dep_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></li>');
        });
      })
    });

    fetch('api/v1/department/count').then(function(res) {
      res.json().then(function(departments) { 
        console.log('departments', departments);
        var count = document.getElementById('count');
          count.insertAdjacentHTML('beforeend', '<h1>No. of Departments: '+departments.count+'</h1>');
      
      })
    });
  }
  else{
    fetch('api/v1/department?query={"dep_name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(departments){
        if (departments.length === 0) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>No results found.</h1>');
        }
        else if (departments.length === 1) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found ' + departments.length + ' department.</h1>');
        }
        else {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h1>Found '+departments.length+' departments.</h1>');
        }
        var tbody = document.getElementById('table-body');
        departments.forEach(function(department) {
          tbody.insertAdjacentHTML('beforeend', '<li><a class="panel-block is-active" href="/departments/' + department._id + '">' + department.dep_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></li>');
        });
        
      });
    });
    localStorage.setItem("search", null);
  }

}



