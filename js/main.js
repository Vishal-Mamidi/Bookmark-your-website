document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
  var siteName=document.getElementById('siteName').value;
  var siteUrl=document.getElementById('siteUrl').value;
  console.log(siteName+" "+siteUrl);
  
  if(!validateForm(siteName, siteUrl)){
    return false;
  }
  
  var bookmark = {
    name:siteName,
    url:siteUrl
  }
  
  if(localStorage.getItem('bookmarks') === null){
    var bookmarks=[];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  else{
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  document.getElementById('myForm').reset();
  console.log(bookmarks);
}

function fetchBookmarks(){
   var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   console.log(bookmarks);
   var bookmarksResult=document.getElementById('bookmarksResult');
  
  for(var i =0;i<bookmarks.length;i++){
    var name = bookmarks[i].name;
    var url=bookmarks[i].url;
    
    bookmarksResult.innerHTML += '<div class="well">'+'<h3>'+name+'<a class="visit" target="_blank" href="'+url+'">Visit</a>'+'<a onclick="deleteBookmark(\''+url+'\')"class="delete"  href="#">Delete</a>'+'</h3>'+'</div>';
  }
}
function deleteBookmark(url){
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  for(var i =0;i<bookmarks.length;i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} 

var button = document.getElementById('show-more');
var content = document.getElementById('bookmarksResult')
button.onclick = function(){
  if(content.className == "open"){
    content.className ="";
    button.innerHTML="Show More";
  }
  else{
    content.className="open";
    button.innerHTML="Show Less";
  }
}

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
  if(!siteUrl.match(regex)){
    alert('Please use the valid URL');
    return false;
  }
  return true;
}