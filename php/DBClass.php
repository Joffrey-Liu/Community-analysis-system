<?php
class DBClass {

    var $db  = "bigdata";
    var $server="35.187.154.90";
    var $stduser="root";
    var $stdpass= "Bigdata";

function Recordset($SQL) {
    if (($this->stdpass != "") && ($this->stduser != "") && ($this->server != "")) {
    $link = @mysql_connect($this->server, $this->stduser, $this->stdpass) or  $this->DBDie( "無法連接資料庫,請檢查連線資訊1!<BR>");
    }

    mysql_query("set character set 'utf8'");
    mysql_select_db($this->db);

    //mysql_db_query -> 送出MySQL查詢:成功則傳回一正數的MySQL查詢結果identifier，失敗則傳回false。
    $rs = @mysql_query($SQL) or $this->DBDie("無法連接資料庫,請檢查資料庫名稱是否設定正確!<BR>");

    return $rs;

    if (($this->stdpass != "") && ($this->stduser != "") && ($this->server != "")) {
    $this->DBClose($link);
    }
}

function Execute($SQL) {
    if (($this->stdpass != "") && ($this->stduser != "") && ($this->server != "")) {
    $link = @mysql_connect($this->server, $this->stduser, $this->stdpass)  or  $this->DBDie("無法連接資料庫,請檢查連線資訊2!<BR>");
    }
      //mysql_query("SET NAMES 'utf8'");
      mysql_select_db($this->db);

       $rs = @mysql_db_query($this->db, $SQL) or $this->DBDie("<BR>資料庫名稱或指令敘述錯誤!<BR>");

    return mysql_insert_id();
    if (($this->stdpass != "") && ($this->stduser != "") && ($this->server != "")) {
        $this->DBClose($link);
    }
}

function RecordCount($rs) {

    if (!$rs) {return $this->DBDie("沒有連結指標!無法計數!<BR>");exit;}
    return mysql_num_rows($rs); //mysql_num_rows()算出有幾筆資料
    }

function GetRows($rs) {
    if (!$rs) {return $this->DBDie("沒有連結指標!無法傳回資料!<BR>");exit;}
    $arr = array();
    $counter = 0;
    while ($row = mysql_fetch_array($rs)) {
    $arr[$counter] = $row;
    $counter++;
    }
    return $arr;
}
function GetRows_Index($rs) {
    if (!$rs) {return $this->DBDie("沒有連結指標!無法傳回資料!<BR>");exit;}
    $arr = array();

    while ($row = mysql_fetch_array($rs)) {
          $arr[$row[0]] = $row[1];
    }
    return $arr;
}


function GetString($rs, $col, $row) {
    $return_str = "";
    while($thisRow = mysql_fetch_row($rs)) {
    $return_str .= join($col, $thisRow).$row;
    }
    return $return_str;
}

function GetFieldCount($rs) {
if (!$rs) {return $this->DBDie("沒有連結指標!無法計數!<BR>");exit;}
    return mysql_num_fields($rs);
}

function DBClose($link) {
    mysql_close($link);
}

function DBDie($error) {
    echo $error;
    exit;
    }

function GetExist($myTB,$LimCol,$GID)
{
    $rs = $this->Recordset("SELECT * FROM ".$myTB." Where ".$LimCol." = '$GID'");
    $AllNum = $this->RecordCount($rs);
    if($AllNum > 0){
        return 1;
    }else{
        return 0;
    }
}

function GetColName($myCol,$myTB,$LimCol,$UID)
{
    $rs = $this->Recordset("SELECT ".$myCol." FROM ".$myTB." Where ".$LimCol." = '".$UID."'");
    $ary = $this->GetRows($rs);
    $Name = $ary[0]["$myCol"];
    return $Name;
}


function GetCount($myTB,$LimCol,$GID)
{
    $rs = $this->Recordset("SELECT * FROM ".$myTB." Where ".$LimCol." = '$GID'");
    $AllNum = $this->RecordCount($rs);
    return $AllNum;
}

function GetMaxID($myCol,$myTB,$N)
{

    $day = date("Ymd");
    $rs = $this->Recordset("SELECT max(".$myCol.") as ID FROM ".$myTB." Where SUBSTRING(".$myCol.",1,8) = '".$day."'");
    $ary = $this->GetRows($rs);
    
    if($ary[0]["ID"]!=NULL){
        $num = substr($ary[0]["ID"],8,$N);
        $num = (int)$num +1;
        $num = str_pad($num,$N,0,STR_PAD_LEFT);
        $ID=$day.$num;
    }else{
        $ID=$day;
        for($i=1;$i<$N;$i++)
        {
            $ID.="0";           
        }
        $ID.="1";
    
    }
    return $ID;
}

function GetMaxOrderID($myCol,$myTB,$N)
{

    $day = date("Ymd");
    $day2 = date("Ym");
    $rs = $this->Recordset("SELECT max(".$myCol.") as ID FROM ".$myTB." Where SUBSTRING(".$myCol.",1,6) = '".$day2."'");
    $ary = $this->GetRows($rs);
    
    if($ary[0]["ID"]!=NULL){
        $num = substr($ary[0]["ID"],8,$N);
        $num = (int)$num +1;
        $num = str_pad($num,$N,0,STR_PAD_LEFT);
        $ID=$day.$num;
    }else{
        $ID=$day;
        for($i=1;$i<$N;$i++)
        {
            $ID.="0";           
        }
        $ID.="1";
    
    }
    return $ID;
}

function GetMaxSE($myCol,$myTB,$N)
{

    $rs = $this->Recordset("SELECT max(".$myCol.") as ID FROM ".$myTB."");
    $ary = $this->GetRows($rs);
    
    if($ary[0]["ID"]!=NULL){
        $num =  $ary[0]["ID"];
        $num = (int)$num +1;
        $ID = str_pad($num,$N,0,STR_PAD_LEFT);
        
    }else{
        
        for($i=1;$i<$N;$i++)
        {
            $ID.="0";           
        }
        $ID.="1";
    
    }
    return $ID;
}


function GetMaxDayID($myCol,$myTB,$day,$N)
{

    //$day = date("Ymd");
    $rs = $this->Recordset("SELECT max(".$myCol.") as ID FROM ".$myTB." Where SUBSTRING(".$myCol.",1,8) = '".$day."'");
    $ary = $this->GetRows($rs);
    
    if($ary[0]["ID"]!=NULL){
        $num = substr($ary[0]["ID"],8,$N);
        $num = (int)$num +1;
        $num = str_pad($num,$N,0,STR_PAD_LEFT);
        $ID=$day.$num;
    }else{
        $ID=$day;
        for($i=1;$i<$N;$i++)
        {
            $ID.="0";           
        }
        $ID.="1";
    
    }
    return $ID;
}
}

?>
