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
  
if (window.location.pathname === '/subjects') {
  if (localStorage.getItem("search") === 'null'||localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0) {
    fetch('api/v1/subject?sort=createdate').then(function(res) {
      res.json().then(function(subject) {
        console.log('subject',subject);
        var tbody = document.getElementById('table-body');
        subject.forEach(function(subject) {
          tbody.insertAdjacentHTML('beforeend','<a class="list-group-item list-group-item-action" href="/subjects/' + subject._id + '">'+ subject.name +'</a>');
        });
      })
    });

    fetch('api/v1/subject/count').then(function(res) {
      res.json().then(function(subject) { 
        console.log('subjects', subject);
        var count = document.getElementById('count');
          count.insertAdjacentHTML('beforeend', '<h5>'+subject.count+'</h5>');
      
      })
    });
  }
  else{
    fetch('api/v1/subject?query={"name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(subject){
        if (subject.length === 0) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>No results found.</h1>');
        }
        else if (subject.length === 1) {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>Found ' + subject.length + ' subject.</h5>');
        }
        else {
          document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>Found '+subject.length+' subjects.</h5>');
        }
        var tbody = document.getElementById('table-body');
        subject.forEach(function(subject) {
          tbody.insertAdjacentHTML('beforeend', '<li><a class="list-group-item list-group-item-action" href="/subjects/' + subject._id + '">'+ subject.name +'</a></li>');
        });
        
      });
    });
    localStorage.setItem("search", null);
  }

}



