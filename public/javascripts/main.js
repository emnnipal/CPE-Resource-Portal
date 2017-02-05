$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/departments/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/departments/'+val,
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

$('#sort').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/departments/'+val,
      type:'GET'
    }).done(function(){
      $thisInput.parents('tr').remove();
    });

  });
});

  
if (window.location.pathname === '/departments') {

  fetch('api/v1/department?sort=createdate').then(function(res) {
    res.json().then(function(departments) {
      console.log('departments', departments);
      var tbody = document.getElementById('table-body');
      departments.forEach(function(department) {
        // tbody.insertAdjacentHTML('beforeend', '<tr><td>  <a class="panel-block is-active" href="/departments/' + department._id + '">' + department.dep_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></td> </tr>');
        tbody.insertAdjacentHTML('beforeend', '<li><a class="panel-block is-active" href="/departments/' + department._id + '">' + department.dep_name + '<span class="panel-icon"><i class="fa fa-book"</span></a></li>');
      });
    })
  });

  fetch('api/v1/department/count').then(function(res) {
    res.json().then(function(departments) { 
      console.log('departments', departments);
      var count = document.getElementById('count');
        count.insertAdjacentHTML('beforeend', '<h1>Total departments: '+departments.count+'</h1>');
    
    })
  });
  const request = require('request')

  request.get({
    url: '/api/v1/department',
    qs: {
      query: JSON.stringify({[{
          dep_name: '~Department of Health'
        }],
      })
    }
  })
}

