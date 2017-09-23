/**
 * Copyright 2017, Google, Inc.
 *
 * <p>Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License. You may obtain a copy of the License at
 *
 * <p>http://www.apache.org/licenses/LICENSE-2.0
 *
 * <p>Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.example.vision;

import com.google.cloud.vision.spi.v1.ImageAnnotatorClient;
import com.google.cloud.vision.spi.v1.ImageAnnotatorSettings;
import com.google.cloud.vision.v1.AnnotateImageRequest;
import com.google.cloud.vision.v1.AnnotateImageResponse;
import com.google.cloud.vision.v1.BatchAnnotateImagesResponse;
import com.google.cloud.vision.v1.Block;
import com.google.cloud.vision.v1.ColorInfo;
import com.google.cloud.vision.v1.CropHint;
import com.google.cloud.vision.v1.CropHintsAnnotation;
import com.google.cloud.vision.v1.DominantColorsAnnotation;
import com.google.cloud.vision.v1.EntityAnnotation;
import com.google.cloud.vision.v1.FaceAnnotation;
import com.google.cloud.vision.v1.Feature;
import com.google.cloud.vision.v1.Feature.Type;
import com.google.cloud.vision.v1.Image;
import com.google.cloud.vision.v1.ImageSource;
import com.google.cloud.vision.v1.LocationInfo;
import com.google.cloud.vision.v1.Page;
import com.google.cloud.vision.v1.Paragraph;
import com.google.cloud.vision.v1.SafeSearchAnnotation;
import com.google.cloud.vision.v1.Symbol;
import com.google.cloud.vision.v1.TextAnnotation;
import com.google.cloud.vision.v1.WebDetection;
import com.google.cloud.vision.v1.WebDetection.WebEntity;
import com.google.cloud.vision.v1.WebDetection.WebImage;
import com.google.cloud.vision.v1.WebDetection.WebPage;
import com.google.cloud.vision.v1.Word;
import com.google.protobuf.ByteString;
import org.threeten.bp.Duration;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.List;

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;

import java.util.HashMap;
import java.util.Map;

import java.sql.*;

import java.nio.charset.Charset;

import java.util.Calendar;
import java.text.SimpleDateFormat;

public class Detect {

  /**
   * Detects entities,sentiment and syntax in a document using the Natural Language API.
   *
   * @throws IOException on Input/Output errors.
   */
   static final String DB_URL = "jdbc:mysql://35.187.154.90/bigdata?useUnicode=true&characterEncoding=UTF-8";
   static final String USER = "root";
   static final String PASS = "Bigdata";
   
   static  Connection conn = null;
   static  Statement stmt = null;
   static String table_name = null;
   static String fb_id = null;
   
  public static void main(String[] args) throws IOException {
	  
	 
	System.out.println(args[0] + "~~~~~");
	System.out.println(args[1]);
	//fb_id = "1375999745824690"; 
	fb_id = args[1];
    //detectLabels("./resources/logos.png", System.out);
	detectLabels(args[0], System.out);
	detectWebDetections(args[0], System.out);

	//argsHelper(args, System.out);
  }
 

  /**
   * Helper that handles the input passed to the program.
   *
   * @throws IOException on Input/Output errors.
   */
  

  
  public Detect() {
  }

  public static void detectLabels(String filePath, PrintStream out) throws IOException {
	  
	
    List<AnnotateImageRequest> requests = new ArrayList<>();

    ByteString imgBytes = ByteString.readFrom(new FileInputStream(filePath));

    Image img = Image.newBuilder().setContent(imgBytes).build();
    Feature feat = Feature.newBuilder().setType(Type.LABEL_DETECTION).build();
    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
    requests.add(request);

    BatchAnnotateImagesResponse response =
        ImageAnnotatorClient.create().batchAnnotateImages(requests);
    List<AnnotateImageResponse> responses = response.getResponsesList();
	List<String> myList = new ArrayList<>();
	List<String> myTrueList = new ArrayList<>();
    for (AnnotateImageResponse res : responses) {
      if (res.hasError()) {
        out.printf("Error: %s\n", res.getError().getMessage());
        return;
      }
		//res.getLabelAnnotationsList().indexOf(1).getAllFields().forEach((k, v) -> out.printf("%s : %s\n", k, v.toString()));
      
	  // List<String> myList = new ArrayList<>();
	  
	  // For full list of available annotations, see http://g.co/cloud/vision/docs
      /*for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
        annotation.getAllFields().forEach((k, v) -> out.printf("%s : %s\n", k, v.toString()));
		annotation.getAllFields().forEach((k, v) -> myList.add(v.toString()));
      }*/
	  EntityAnnotation annotation;
	  out.println(res.getLabelAnnotationsList().size());
	  for(int i=0; i<res.getLabelAnnotationsList().size();i++){
		  annotation = res.getLabelAnnotationsList().get(i);
		  annotation.getAllFields().forEach((k, v) -> myList.add(v.toString()));
		  //annotation.getAllFields().forEach.get(1).out.printf("%s : %s\n", k, v.toString());
		 
	  }
    }
	
	for(int i=0; i< myList.size(); i++){
		if(i%3==1)
			myTrueList.add(myList.get(i));
		//out.println(myList.get(i));
	}
	try{
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(DB_URL,USER,PASS);
		stmt = conn.createStatement();
		System.out.println("Mysql successful");
		String sql = "ALTER TABLE food ADD test varchar(1000)";
		//stmt.executeUpdate(sql);
		try {
			Thread.sleep(1000);                 // 1000 milliseconds is one second.
		} catch(InterruptedException ex) {
			System.out.print("計時器出錯");
			Thread.currentThread().interrupt();
		}
		
		sql = "insert into food values(\'" + "123" + "\', \'" + "456" + "\', \'" + myTrueList.get(2) + "\')";
		//stmt.executeUpdate(sql);
	}catch(SQLException se){
        System.out.println("Mysql fail -1");
        se.printStackTrace();
	}catch(Exception e){
                System.out.println("Mysql fail-2");
                e.printStackTrace();
    }finally{
           try{
                    if(stmt!=null)
                        stmt.close();
                }catch(SQLException se2){
                    System.out.println("Mysql連線錯誤-3");
                }// nothing we can do
                try{
                    if(conn!=null)
                    conn.close();
                }catch(SQLException se){
                    System.out.println("Mysql連線錯誤-4");
                    se.printStackTrace();
                }//end finally try
            }//end try
	
	/*for(int i=0; i< myTrueList.size(); i++){	
		out.println(myTrueList.get(i));
	}*/
	for(int i=0; i< myTrueList.size(); i++){	
		if(myTrueList.get(i).equals("food") || myTrueList.get(i).equals("Food") || myTrueList.get(i).equals("Dish") || myTrueList.get(i).equals("dish") || myTrueList.get(i).equals("Cuisine") || myTrueList.get(i).equals("cuisine")){
			out.println(myTrueList.get(i) + "food~~~");
			table_name = "food";
			break;
		}
		else if(myTrueList.get(i).equals("sport") || myTrueList.get(i).equals("Sport")||myTrueList.get(i).equals("sports") || myTrueList.get(i).equals("Sports") || myTrueList.get(i).equals("Stadium")){
			out.println(myTrueList.get(i) + "sport~~~");
			table_name = "sport";
			break;
		}		
	}
	if(table_name == null)
		table_name = "activity";
			
	out.println("table_name: " + table_name);
  }

  /**
   * Detects labels in the specified remote image.
   *
   * @param gcsPath The path to the remote file to perform label detection on.
   * @param out A {@link PrintStream} to write detected features to.
   * @throws IOException on Input/Output errors.
   */
  public static void detectLabelsGcs(String gcsPath, PrintStream out) throws IOException {
    List<AnnotateImageRequest> requests = new ArrayList<>();

    ImageSource imgSource = ImageSource.newBuilder().setGcsImageUri(gcsPath).build();
    Image img = Image.newBuilder().setSource(imgSource).build();
    Feature feat = Feature.newBuilder().setType(Type.LABEL_DETECTION).build();
    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
    requests.add(request);

    BatchAnnotateImagesResponse response =
        ImageAnnotatorClient.create().batchAnnotateImages(requests);
    List<AnnotateImageResponse> responses = response.getResponsesList();

    for (AnnotateImageResponse res : responses) {
      if (res.hasError()) {
        out.printf("Error: %s\n", res.getError().getMessage());
        return;
      }

      // For full list of available annotations, see http://g.co/cloud/vision/docs
      for (EntityAnnotation annotation : res.getLabelAnnotationsList()) {
        annotation.getAllFields().forEach((k, v) ->
            out.printf("%s : %s\n", k, v.toString()));
      }
    }
  }

  /**
   * Finds references to the specified image on the web.
   *
   * @param filePath The path to the local file used for web annotation detection.
   * @param out A {@link PrintStream} to write the results to.
   * @throws IOException on Input/Output errors.
   */
  public static void detectWebDetections(String filePath, PrintStream out) throws IOException {
    List<AnnotateImageRequest> requests = new ArrayList<>();

    ByteString imgBytes = ByteString.readFrom(new FileInputStream(filePath));

    Image img = Image.newBuilder().setContent(imgBytes).build();
    Feature feat = Feature.newBuilder().setType(Type.WEB_DETECTION).build();
    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
    requests.add(request);

    BatchAnnotateImagesResponse response =
        ImageAnnotatorClient.create().batchAnnotateImages(requests);
    List<AnnotateImageResponse> responses = response.getResponsesList();

    for (AnnotateImageResponse res : responses) {
      if (res.hasError()) {
        out.printf("Error: %s\n", res.getError().getMessage());
        return;
      }

      // Search the web for usages of the image. You could use these signals later
      // for user input moderation or linking external references.
      // For a full list of available annotations, see http://g.co/cloud/vision/docs
      WebDetection annotation = res.getWebDetection();
      out.println("Entity:Id:Score");
      out.println("===============");
	  String my_hobby = null;
	  //table_name = "food";
	  
      for (WebEntity entity : annotation.getWebEntitiesList()) {
        out.println(entity.getDescription() + " : " + entity.getEntityId() + " : " + entity.getScore());
		//out.println(entity.getDescription().getClass().getName() + "\n");
		
		if(table_name.equals("food")){
			if(entity.getDescription().equals("Food") || entity.getDescription().equals("Dish") || entity.getDescription().equals("Meal") ||entity.getDescription().equals("Breakfast")|| entity.getDescription().equals("Lunch")||entity.getDescription().equals("Dinner"))
				continue;
			else{
				my_hobby = entity.getDescription();
				out.println(my_hobby);
				break;
			}
		}
		else if(table_name.equals("sport")){
			if(entity.getDescription().equals("Sport") || entity.getDescription().equals("Exercise"))
				continue;
			else{
				my_hobby = entity.getDescription();
				out.println(my_hobby);
				break;
			}					
		} 
		else{
			my_hobby = entity.getDescription();
			out.println(my_hobby);
			break;
		}
		
      }
	  if(my_hobby == null){
		  my_hobby = annotation.getWebEntitiesList().get(0).getDescription();
		  out.println(my_hobby);
	  }
	  String re_hobby = my_hobby.replaceAll("\\s+", "_");
	  
	  
	  
	  
	  try{
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(DB_URL,USER,PASS);
		stmt = conn.createStatement();
		ResultSet rs = null;
		ResultSetMetaData metaData = null;
		try{
			String sql = "select * from "+table_name;
			rs = stmt.executeQuery(sql);
			metaData = rs.getMetaData();
			int rowCount = metaData.getColumnCount();
			boolean isMyColumnPresent = false;
			String myColumnName = re_hobby;
			for (int i = 1; i <= rowCount; i++) {
				if (myColumnName.equals(metaData.getColumnName(i))) {
					isMyColumnPresent = true;
				}
			}
			//String re_hobby = my_hobby.replaceAll("\\s+", "_");
			out.println(re_hobby + "~~~");
			if (!isMyColumnPresent) {
				String myColumnType = "int";
				out.println("success "+ table_name + " " + re_hobby);
				stmt.executeUpdate("ALTER TABLE " + table_name + " ADD `" + re_hobby + "` " + myColumnType + " DEFAULT 0");
				out.println("ok");
			}
			try {
				Thread.sleep(1000);     				// 1000 milliseconds is one second.
				
			} catch(InterruptedException ex) {
				System.out.print("計時器出錯");
				Thread.currentThread().interrupt();
			}
			try{
				stmt.executeUpdate("UPDATE " + table_name + " SET `" + re_hobby + "` = `" + re_hobby +"` + 1 WHERE fb_id = " +  fb_id);
			}catch(Exception e){
				out.print("table colum ++ fail~~~~\n");
			}
			
			//sql = "insert into" + table_name+ "values(\'" + "123" + "\', \'" + "456" + "\', \'" + myTrueList.get(2) + "\')";
			/*else{
				sql = "insert into" + table_name+ "values(\'" + "123" + "\', \'" + "456" + "\', \'" + myTrueList.get(2) + "\')";
				stmt.executeUpdate(sql);
			}*/
		
		}catch(Exception e){
			out.println(e + " fail in find column!!!");
		}
		
		System.out.println("Mysql successful");
		
		
		try {
			Thread.sleep(1000);                 // 1000 milliseconds is one second.
		} catch(InterruptedException ex) {
			System.out.print("計時器出錯");
			Thread.currentThread().interrupt();
		}
		
		//sql = "insert into food values(\'" + "123" + "\', \'" + "456" + "\', \'" + myTrueList.get(2) + "\')";
		//stmt.executeUpdate(sql);
		}catch(SQLException se){
			System.out.println("Mysql fail -1");
			se.printStackTrace();
		}catch(Exception e){
					System.out.println("Mysql fail-2");
					e.printStackTrace();
		}finally{
			   try{
						if(stmt!=null)
							stmt.close();
				}catch(SQLException se2){
						System.out.println("Mysql連線錯誤-3");
				}// nothing we can do
				try{
						if(conn!=null)
						conn.close();
				}catch(SQLException se){
						System.out.println("Mysql連線錯誤-4");
						se.printStackTrace();
				}//end finally try
		}//end try
	  
	  
      /*out.println("\nPages with matching images: Score\n==");
      for (WebPage page : annotation.getPagesWithMatchingImagesList()) {
        out.println(page.getUrl() + " : " + page.getScore());
      }
      out.println("\nPages with partially matching images: Score\n==");
      for (WebImage image : annotation.getPartialMatchingImagesList()) {
        out.println(image.getUrl() + " : " + image.getScore());
      }
      out.println("\nPages with fully matching images: Score\n==");
      for (WebImage image : annotation.getFullMatchingImagesList()) {
        out.println(image.getUrl() + " : " + image.getScore());
      }*/
    }
  }

  /**
   * Detects whether the specified remote image has features you would want to moderate.
   *
   * @param gcsPath The path to the remote file to detect safe-search on.
   * @param out A {@link PrintStream} to write the results to.
   * @throws IOException on Input/Output errors.
   */
  public static void detectWebDetectionsGcs(String gcsPath, PrintStream out) throws IOException {
    List<AnnotateImageRequest> requests = new ArrayList<>();

    ImageSource imgSource = ImageSource.newBuilder().setGcsImageUri(gcsPath).build();
    Image img = Image.newBuilder().setSource(imgSource).build();
    Feature feat = Feature.newBuilder().setType(Type.WEB_DETECTION).build();
    AnnotateImageRequest request =
        AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
    requests.add(request);

    BatchAnnotateImagesResponse response =
        ImageAnnotatorClient.create().batchAnnotateImages(requests);
    List<AnnotateImageResponse> responses = response.getResponsesList();

    for (AnnotateImageResponse res : responses) {
      if (res.hasError()) {
        out.printf("Error: %s\n", res.getError().getMessage());
        return;
      }

      // Search the web for usages of the image. You could use these signals later
      // for user input moderation or linking external references.
      // For a full list of available annotations, see http://g.co/cloud/vision/docs
      WebDetection annotation = res.getWebDetection();
      out.println("Entity:Id:Score");
      out.println("===============");
      for (WebEntity entity : annotation.getWebEntitiesList()) {
        out.println(entity.getDescription() + " : " + entity.getEntityId() + " : "
            + entity.getScore());
      }
      out.println("\nPages with matching images: Score\n==");
      for (WebPage page : annotation.getPagesWithMatchingImagesList()) {
        out.println(page.getUrl() + " : " + page.getScore());
      }
      out.println("\nPages with partially matching images: Score\n==");
      for (WebImage image : annotation.getPartialMatchingImagesList()) {
        out.println(image.getUrl() + " : " + image.getScore());
      }
      out.println("\nPages with fully matching images: Score\n==");
      for (WebImage image : annotation.getFullMatchingImagesList()) {
        out.println(image.getUrl() + " : " + image.getScore());
      }
    }
  }
  
  /*public static void argsHelper(String[] args, PrintStream out) throws IOException {
	  try{
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection(DB_URL,USER,PASS);
			stmt = conn.createStatement();
			System.out.println("Mysql連線成功");
	  }catch(SQLException se){
            System.out.println("Mysql連線錯誤-1");
            se.printStackTrace();
	  }
    if (args.length < 1) {
      out.println("Usage:");
      out.printf(
          "\tjava %s \"<command>\" \"<path-to-image>\"\n"
              + "Commands:\n"
              + "\tfaces | labels | landmarks | logos | text | safe-search | properties"
              + "| web | crop \n"
              + "Path:\n\tA file path (ex: ./resources/wakeupcat.jpg) or a URI for a Cloud Storage "
              + "resource (gs://...)\n",
          Detect.class.getCanonicalName());
      return;
    }
    String command = args[0];
    String path = args.length > 1 ? args[1] : "";

    Detect app = new Detect();
    if (command.equals("faces")) {
      if (path.startsWith("gs://")) {
        detectFacesGcs(path, out);
      } else {
        detectFaces(path, out);
      }
    } else if (command.equals("labels")) {
      if (path.startsWith("gs://")) {
        detectLabelsGcs(path, out);
      } else {
        detectLabels(path, out);
      }
    } else if (command.equals("landmarks")) {
      if (path.startsWith("http")) {
        detectLandmarksUrl(path, out);
      } else if (path.startsWith("gs://")) {
        detectLandmarksGcs(path, out);
      } else {
        detectLandmarks(path, out);
      }
    } else if (command.equals("logos")) {
      if (path.startsWith("gs://")) {
        detectLogosGcs(path, out);
      } else {
        detectLogos(path, out);
      }
    } else if (command.equals("text")) {
      if (path.startsWith("gs://")) {
        detectTextGcs(path, out);
      } else {
        detectText(path, out);
      }
    } else if (command.equals("properties")) {
      if (path.startsWith("gs://")) {
        detectPropertiesGcs(path, out);
      } else {
        detectProperties(path, out);
      }
    } else if (command.equals("safe-search")) {
      if (path.startsWith("gs://")) {
        detectSafeSearchGcs(path, out);
      } else {
        detectSafeSearch(path, out);
      }
    } else if (command.equals("web")) {
      if (path.startsWith("gs://")) {
        detectWebDetectionsGcs(path, out);
      } else {
        detectWebDetections(path, out);
      }
    } else if (command.equals("crop")) {
      if (path.startsWith("gs://")) {
        detectCropHintsGcs(path, out);
      } else {
        detectCropHints(path, out);
      }
    } else if (command.equals("fulltext")) {
      if (path.startsWith("gs://")) {
        detectDocumentTextGcs(path, out);
      } else {
        detectDocumentText(path, out);
      }
    }
  }*/
}

