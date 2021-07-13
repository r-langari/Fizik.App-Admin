<?php
$ffmpeg = ".\\ffmpeg-20200604-7f81785-win64-static\\ffmpeg-20200604-7f81785-win64-static\\bin\\ffmpeg";
$command = "ffmpeg -i video1.mp4 -codec: copy -hls_time 3600 -f hls filename.m3u8";
shell_exec($command);