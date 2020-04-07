document.getElementById('myForm').addEventListener('submit',saveBookmark);

function saveBookmark(e){
  //Get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;


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


  e.preventDefault();
}