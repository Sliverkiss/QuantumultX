const $originalDone=$.done;
$done=(obj={})=>{
    console.log(JSON.stringify(obj));
    $originalDone(obj);
}
