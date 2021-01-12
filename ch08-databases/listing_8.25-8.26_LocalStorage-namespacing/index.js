const post = { id: '1' };
const comment = { id: '1' };

//create your own “namespace” by using a prefix on each key to delineate namespaces
localStorage.setItem(`/posts/${post.id}`, post);
localStorage.setItem(`/comments/${comment.id}`, comment);

//get all keys
function getAllKeys() {
  return Object.keys(localStorage);
}

//get all values
const allValues = getAllKeys().map(key => localStorage.getItem(key));

//get all keys/values
function getAllKeysAndValues() {
  return getAllKeys()
    .reduce((obj, str) => { 
      obj[str] = localStorage.getItem(str); 
      return obj;
    }, {});
}

//get all items within a namespace
function getNamespaceItems(namespace) {
  return getAllKeys().filter(key => key.startsWith(namespace));
}

console.log(getNamespaceItems('/comments'));
