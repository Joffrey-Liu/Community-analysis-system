<h1>Community-analysis-system</h1>
<h3>系統介紹</h3>
<hr>
<h4>
<p>
隨著手機相片普及，大家愈來愈喜歡利用相片來紀錄自己的日常生活．我們利用相片來分析人們生活喜好，並用此喜好來與他人進行興趣分析配對，來讓人們得知自己得興趣是否與自己意中之人相同．
</p>
</h4>
<h3>系統架構</h3>
<hr>
<h4>
<p>
首先，手機上傳照片是利用Android連結網頁PHP程式碼進行照片儲存．再來，將圖片進行Google cloud Vision影像辨識將相片
內容分析，並將分析結果物件存回至資料庫中．
</p> 
<p>
再得到每個人的照片內容之後，便能夠進行興趣配對演算法．來得知兩人之間的興趣相符百分比．
</p>
<p>
最後，再利用資料視覺化方式來將資料分析結果呈現至網頁上．
</p>
<p align="center">
<img style="width: 100%; margin:auto;" src="https://user-images.githubusercontent.com/32201219/30769912-69c59c50-a055-11e7-8126-494af8699f4d.png">
  </p>
</h4>


<h3>主要技術</h3>
<hr>
<ul>
  <li><b>Google Cloud Vision:</b> <br>透過<a href="https://cloud.google.com/vision/?hl=zh-tw">Google Cloud Vision api</a> 我們能夠將使用者所上傳的照片進行物件分析，來得知使用者所拍照的內容為何．<br> 下列為執行影像辨識方式：<pre><code>export PATH={PATH};</code></pre>
    <pre><code>export GOOGLE_APPLICATION_CREDENTIALS={googlecloudvision.json};</code></pre>
    <pre><code>mvn exec:java -Dexec.mainClass={Detect} \-DpropertyName=propertyValue \-Dexec.args='$para'</code></pre>
    
  </li>
  <li><b>資料搜集與分析方法:</b><br>透過使用者所上傳的照片資訊，我們能夠取得照片所拍攝的GPS資訊。我們經由將GPS轉換成台灣縣市區域，以分析個人活動範圍與生活足跡。我們透過人們的照片GPS資訊來計算出兩人的生活圈相近分數。<br>在興趣比對上，我們將使用者的照片資訊分成美食、運動、活動、寵物以及風景五種類別。而在各類別中我們有依照圖片將資訊分成各個細項，我們將及稱為父類別及子類別來進行興趣比對運算。<br>運算公式如下: <br><br>
計算各子類別總數:<br>
 <img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large%20Child\left%20[%20key%20\right%20]=\sum%20Category\left%20[%20key%20\right%20]">
 <br><br>
 計算各父類別總數:<br>
 <img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large%20Parents\left[key\right]=\sum%20Category\left[element\right]">
<br><br>
計算父類別興趣配對分數:<br>
<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large%20http://chart.googleapis.com/chart?cht=tx&chl=\Large%20Cal.P\left%20[%20key%20\right%20]=(L.Parent[key]+R.Parent[key])-|L.Parent[key]-R.Parent[key]|">
<br><br>
計算子類別興趣配對分數:<br>
<img src="http://chart.googleapis.com/chart?cht=tx&chl=\Large%20Cal.C[key]%20=%20\frac{L.Child[key]\bigcap%20R.Child[key]}{L.Child[key]\bigcup%20R.Child[key]%20}">
  </li>
</ul>
<h3>成果與結論</h3>
<hr>
使用者能夠在網頁上選取兩個人來進行興趣配對分析，分析結果會以圖形化結果呈現。兩人的興趣傾向會以雷達圖顯示。而兩人的所有類別項目
會以長條圖顯示。最後以地圖表示兩人的生活圈符合區域。
