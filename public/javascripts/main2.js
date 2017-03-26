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

// function sendReq(){
//   var regex = /\d+\w+/;
//   var id = location.pathname.match(regex);
//   if(id){
//     $.ajax({
//       url:'/portal/itemnew/'+id[0],
//       type: 'GET',
//     }).done(res=>{

//       alert("Your request is submitted and pending for approval.");
//       console.log(res);
//     });
//   }

// }

// $('#itemnew').click((e)=>{
//   e.preventDefault();
//   sendReq();
// })

function getSearch() {
  localStorage.setItem("search", document.getElementById('search').value);
}
  
if (window.location.pathname === '/portal') {
  if (localStorage.getItem("search") === 'null'||localStorage.getItem("search") === null||localStorage.getItem("search").indexOf(' ') >=0) {
    fetch('api/v1/subject?sort=year').then(function(res) {
      res.json().then(function(subject) {
        console.log('subject',subject);
        var tbody = document.getElementById('table-body');
        subject.forEach(function(subject) {
          // tbody.insertAdjacentHTML('beforeend','<a class="list-group-item list-group-item-action" href="/portal/' + subject._id + '">'+ subject.year +' | '+subject.sem+' | '+subject.name+'</a>');
          // tbody.insertAdjacentHTML('beforeend','<div class="p-2 col-md-4"><div class="card"><div class="text-center"><div class="card-block"><h5 class="teal-text"><i class="fa fa-pie-chart"></i> '+subject.code+'</h5><h4>'+subject.name+'</h4><p>'+subject.year+'<br/>'+subject.sem+'</p><a class="btn btn-primary" href="/portal/'+subject._id+'"><i class="fa fa-clone left"></i> View Subject</a></div></div></div></div>');
          tbody.insertAdjacentHTML('beforeend','<a href="/portal/'+subject._id+'" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+subject.name+'</h5><small class="text-muted">'+subject.code+'</small></div><p class="mb-1">'+subject.year+'</p><small>'+subject.sem+'</small></a>');
          
        });
      })
    });

   
  }
  else{
    fetch('api/v1/subject?query={"name":"~(' + localStorage.getItem("search") + ')"}').then(function(res) {
      res.json().then(function(subject){
        console.log(subject)
        // if (subject.length === 0) {
        //   document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>No results found.</h1>');
        // }
        // else if (subject.length === 1) {
        //   document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>Found ' + subject.length + ' subject.</h5>');
        // }
        // else {
        //   document.getElementById('count').insertAdjacentHTML('beforeend', '<h5>Found '+subject.length+' subjects.</h5>');
        // }
        var tbody = document.getElementById('table-body');
        subject.forEach(function(subject) {
          // tbody.insertAdjacentHTML('beforeend','<a class="list-group-item list-group-item-action" href="/portal/' + subject._id + '">'+ subject.name +'</a>');
           tbody.insertAdjacentHTML('beforeend','<a href="/portal/'+subject._id+'" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+subject.name+'</h5><small class="text-muted">'+subject.code+'</small></div><p class="mb-1">'+subject.year+'</p><small>'+subject.sem+'</small></a>');
          
        });
        
      });
    });
    localStorage.setItem("search", null);
  }

}

