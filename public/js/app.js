'use strict';

//---state---------------------------------------------------

var state = {
  users: [],
  posts: [],
  // week: event.currentTarget.value
  // week: function(event){$(event.currentTarget).value;}
};

//---state mods-----------------------------------------------

function getPosts() {
  $.getJSON('/api/posts/', (json) => {
    renderPosts(json, $('.tbody'));
  });
}

// Create Post
const createPost = function(state) {
  let
    header = $('#header').val(),
    url = $('#url').val(),
    week = $('#week').val(),
    description = $('#description').val();
  const addObj = {header, url, week, description};
  
  $.ajax({
    url: '/api/posts/',
    dataType: 'json',
    type: 'post',
    contentType: 'application/json',
    data: JSON.stringify(addObj),
    success: function(data){
      state.posts.unshift(data);
      $('#dialog-modal').dialog('close');
      renderPosts(data, $('.tbody'));
    }
  });
};

// Edit Post
let editPost = function(state, id) {
  let
    header = $('input#edit-header').val(),
    url = $('input#edit-url').val(),
    week = state.week,
    description = $('input#edit-description').val();
  const addObj = {id, header, url, week, description};
  // console.log('selected id:', id);
  console.log(addObj);
  $.ajax({
    url: '/api/posts/' + id,
    dataType: 'json',
    type: 'put',
    contentType: 'application/json',
    data: JSON.stringify(addObj),
    success: function(data){
      // console.log('data: ', data);
      getPosts();
      $('#edit-dialog').dialog('close');
    }
  });
};


// Delete Post
let deletePost = function(state, mongoId) {
  $.ajax({
    url: '/api/posts/' + mongoId,
    dataType: 'json',
    type: 'delete',
    contentType: 'application/json',
    data: JSON.stringify(),
    success: function(json){
      getPosts();
    }
  });
};

//---template----------------------------------------------------

function postTemplate(data){
  return `
      <tr class="table-row" data-post-id="${data.id}">
        <td id="edit-header">${data.header}</td>
        <td id="edit-url"><a href="${data.url}" target="_blank">Link</a></td>
        <td id="edit-week">${data.week} </td>
        <td id="edit-description">${data.description}</td>
        <td><button class="edit-button">Edit</button></td>
        <td><button class="remove-button">Remove</button></td>
      </tr>
      `;
}

//---render----------------------------------------------------

function renderPosts(posts, element) {
  // console.log(posts);
  let postsHTML = posts.map(function(data) {
    return postTemplate(data);
  });
  element.html(postsHTML);
}

//---jQuery ui forms----------------------------------------------------

// "Create new post" dialog
$('#dialog-modal').dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  dialogClass: 'no-close',
});

// $('#dialog-modal').modal({

// });


$('#edit-dialog').dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  dialogClass: 'no-close',
  // optional for jquery ui button usage
  // buttons: {
    // OK: function() {
    //   $( '#response' ).html( 'The value entered was ' + $( '#myInput' ).val());
    //   grabThisGuy.find( '#edit-header' ).html();

    // Close: function() {
    //   $( '#response' ).html( 'The Cancel button was clicked' );
    //   $( this ).dialog( 'close' );
    // }
  // }
});

//---event listeners----------------------------------------------------

// Open "create new post" dialog
$('#create-post').on('click', function() {
  $('#dialog-modal').dialog('open');
});


const populateEditDialog = function(state, postId) {
  const editElemIdentifier = '[id^=edit-]';
  const formElem = $('#edit-form');
  const inputElems = formElem.find(editElemIdentifier);
  const rowElem = $('tr[data-post-id=' + postId+']');
  const cellElems = rowElem.find(editElemIdentifier);

  cellElems.each(function(i, cell){
    if (cell.id==='edit-url') {
      inputElems[i].value = cell.querySelector('a').href;
    } else {
      inputElems[i].value = cell.innerText;
    }
  });

  const headerInput = document.getElementById('header-edit');
  // renderPosts(state, $('.tbody'));
};

// Edit
$('.tbody').on('click', '.edit-button', function() {
  const postId = $(event.target).closest('.table-row').data('post-id');
  // console.log('-------->',postId);
  populateEditDialog(state, postId);
  $('#edit-dialog').dialog('open');
  $('#edit-form').on('submit', function (event) {
    event.preventDefault();
    editPost(state, postId);
  });
});

// Delete
$('.tbody').on('click', '.remove-button' ,function(event){
  event.preventDefault();
  const postId = $(event.currentTarget).closest( 'tr' ).data('post-id');
  deletePost(state, postId);
});

//--Document Ready----------------------------------------------------

$(function() {
  $('#dialog-form').on('submit', function (event) {
    event.preventDefault();
    createPost(state);
  } );
  // dialog();
  // console.log(state);
  getPosts();
});