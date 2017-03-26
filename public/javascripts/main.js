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

 // fetch('api/v1/subject/count').then(function(res) {
    //   res.json().then(function(subject) { 
    //     console.log('subjects', subject);
    //     var count = document.getElementById('count');
    //       count.insertAdjacentHTML('beforeend', '<h5>'+subject.count+'</h5>');
      
    //   })
    // });

$('#searchbutton').on('click', function(e){
  e.preventDefault();
  var search = document.getElementById("search").value;
  search = $.trim(search);
  console.log(search);
  if(search != ""){
    fetch('api/v1/subject?query={"name":"~(' + search + ')"}').then(function(res) {
      res.json().then(function(subject){
        console.log(subject);
        if(subject.length !== 0){
        $('#table-body').html('');
          var tbody = document.getElementById('table-body');
          subject.forEach(function(subject) {
            tbody.insertAdjacentHTML('beforeend','<a href="/portal/'+subject._id+'" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+subject.name+'</h5><small class="text-muted">'+subject.code+'</small></div><p class="mb-1">'+subject.year+'</p><small>'+subject.sem+'</small></a>');
          });
        }else{
          var tbody = document.getElementById('table-body');
          alert('No results found.');
        }
      });
    });
  } else {
    fetch('api/v1/subject?sort=year').then(function(res) {
      res.json().then(function(subject) {
        console.log('subject',subject);
        var tbody = document.getElementById('table-body');
        $('#table-body').html('');
        subject.forEach(function(subject) {
          tbody.insertAdjacentHTML('beforeend','<a href="/portal/'+subject._id+'" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+subject.name+'</h5><small class="text-muted">'+subject.code+'</small></div><p class="mb-1">'+subject.year+'</p><small>'+subject.sem+'</small></a>');
          
        });
      })
    });
  }
});

$(document).ready(function() {
if (window.location.pathname === '/portal') {
  fetch('api/v1/subject?sort=year').then(function(res) {
      res.json().then(function(subject) {
        console.log('subject',subject);
        var tbody = document.getElementById('table-body');
        subject.forEach(function(subject) {
          tbody.insertAdjacentHTML('beforeend','<a href="/portal/'+subject._id+'" class="list-group-item list-group-item-action flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><h5 class="mb-1">'+subject.name+'</h5><small class="text-muted">'+subject.code+'</small></div><p class="mb-1">'+subject.year+'</p><small>'+subject.sem+'</small></a>');
          
        });
      })
    });
}
});
