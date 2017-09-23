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
  <li><b>Google Cloud Vision:</b> <p>透過<a href="https://cloud.google.com/vision/?hl=zh-tw">Google Cloud Vision api</a> 我們能夠將使用者所上傳的照片進行物件分析，來得知使用者所拍照的內容為何．<br> 下列為執行影像辨識方式：<pre><code>export PATH={PATH};</code></pre>
    <pre><code>export GOOGLE_APPLICATION_CREDENTIALS={googlecloudvision.json};</code></pre>
    <pre><code>mvn exec:java -Dexec.mainClass={Detect} \-DpropertyName=propertyValue \-Dexec.args='$para'</code></pre>
    </p>
  </li>
  <li><b>資料搜集與分析方法:</b>
    <p>
    </p>
      
  </li>
</ul>
