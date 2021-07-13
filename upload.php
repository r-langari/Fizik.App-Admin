<?php
if(!empty($_FILES['filepond']))
{
  if($_GET['model'] === 'products' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/productImage/";

  if($_GET['model'] === 'products' && ($_GET['type'] === 'file' || $_GET['type'] === 'streamDictionary'))
    $path = "/home/ubuntu/fizikapp/api/assets/files/productStream/";

  if($_GET['model'] === 'beyondthebooks' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/beyondthebooksImage/";

  if($_GET['model'] === 'beyondthebooks' && ($_GET['type'] === 'file' || $_GET['type'] === 'streamDictionary'))
    $path = "/home/ubuntu/fizikapp/api/assets/files/beyondthebooksStream/";

  if($_GET['model'] === 'exercises' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/exerciseImage/";

  if($_GET['model'] === 'exercises' && ($_GET['type'] === 'file' || $_GET['type'] === 'streamDictionary'))
    $path = "/home/ubuntu/fizikapp/api/assets/files/exerciseStream/";

  if($_GET['model'] === 'sciencechallenge' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/sciencechallengeImage/";

  if($_GET['model'] === 'sciencechallenge' && ($_GET['type'] === 'file' || $_GET['type'] === 'streamDictionary'))
    $path = "/home/ubuntu/fizikapp/api/assets/files/sciencechallengeStream/";

  if($_GET['model'] === 'definitions' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/definitionImage/";

  if($_GET['model'] === 'shoppingplans' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/shoppingplansImage/";

  if($_GET['model'] === 'users' && $_GET['type'] === 'thumbnail')
    $path = "/home/ubuntu/fizikapp/api/assets/files/usersImage/";

  if ($_GET['model'] === 'users') {
    $path_parts = pathinfo($_FILES["filepond"]["name"]);
    $path = $path . str_replace(' ', '_', $_GET['name'].'.'.$path_parts['extension']);
  } else {
    $path = $path . str_replace(' ', '_', $_FILES['filepond']['name']);
  }
  
  if(move_uploaded_file($_FILES['filepond']['tmp_name'], $path)) {
    $nameArr = explode('.', $_FILES['filepond']['name']);
  
    // if (  file_exists('/home/ubuntu/fizikapp/api/assets/files/productStream/'.$nameArr[0].'.m3u8') 
    //         && 
    //       file_exists('/home/ubuntu/fizikapp/api/assets/files/productStream/'.$nameArr[0].'.ts')
    //     ) {
    //         $command = " ffmpeg -i /home/ubuntu/fizikapp/api/assets/files/productStream/" . $nameArr[0] . '.m3u8'." -bsf:v h264_mp4toannexb -codec copy -hls_list_size 0 /home/ubuntu/fizikapp/api/assets/files/productFiles/" . $nameArr[0] . '.mp4';
    //         shell_exec($command);
    //       } else {
            
    //       }
        } else{
            echo "There was an error uploading the file, please try again!";
          }
}
?>