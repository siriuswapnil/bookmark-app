document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  //Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName,siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }
//test existing bookmarks
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks = [];
    bookmarks.push(bookmark);
    //set to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
    //get array from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //add bookmarks to array
    bookmarks.push(bookmark);
    //re set it to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    
  }
  //clear form
  document.getElementById('myForm').reset();


  fetchBookmarks();

  e.preventDefault();
}

//delete bookmark
function deleteBookmark(url){
  //get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through
  for(var i= 0;i<bookmarks.length;i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);

    } 
   }
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  //refetch
  fetchBookmarks();

}



//fetch bookmarks

function fetchBookmarks(){
  //get array from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  
  var bookmarksResults = document.getElementById('bookmarksResults');
  bookmarksResults.innerHTML='';

  for(var i=0;i<bookmarks.length;i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url; 
    bookmarksResults.innerHTML += '<div class = "well">' +
                                     '<h3>' + name + 
                                     ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>' + 
                                     ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>' + 
                                     '</h3>' + 
                                     '</div>';


  }
}

function validateForm(siteName,siteUrl){
  
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use Valid URL!');
    return false;
  }

  return true;
}