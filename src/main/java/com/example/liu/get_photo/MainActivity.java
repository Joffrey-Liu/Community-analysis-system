package com.example.liu.get_photo;


import android.Manifest;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.media.ExifInterface;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Base64;
import android.util.Log;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;

import static android.R.id.message;
import static android.provider.AlarmClock.EXTRA_MESSAGE;

public class MainActivity extends AppCompatActivity {

    public static final String FILE_NAME = "temp.jpg";


    private static final String TAG = MainActivity.class.getSimpleName();
    private static final int GALLERY_PERMISSIONS_REQUEST = 0;
    private static final int GALLERY_IMAGE_REQUEST = 1;
    public static final int CAMERA_PERMISSIONS_REQUEST = 2;
    public static final int CAMERA_IMAGE_REQUEST = 3;

    public static final String UPLOAD_URL = "http://140.138.77.124/test/upload.php";
    public static final String UPLOAD_KEY = "image";
    public static final String TAG1 = "MY MESSAGE";
    public static final String UPLOAD_member = "http://140.138.77.124/test/uploadmember.php";
    float[] result = new float[2]; // 存照片位置
    String time = "2017-06-02 07:29:30"; // 存照片時間
    String fb_image_url;
    String fb_name;
    String fb_id;
    boolean if_same;
    private SharedPreferences settiing;

    private TextView mImageDetails;
    private ImageView mMainImage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        settiing = getSharedPreferences("FBDATA", 0);
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);  //開啟照相或是相簿
        result[0] = -1;
        result[1] = -1;
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
                builder
                        .setMessage(R.string.dialog_select_prompt)
                        .setPositiveButton(R.string.dialog_select_gallery, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                startGalleryChooser();
                            }
                        })
                        .setNegativeButton(R.string.dialog_select_camera, new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int which) {
                                startCamera();
                            }
                        });
                builder.create().show();
            }
        });

        mImageDetails = (TextView) findViewById(R.id.image_details);
        mMainImage = (ImageView) findViewById(R.id.main_image);
        Bundle bundle = getIntent().getExtras();
        if(settiing!=null) {
            fb_name = settiing.getString("fb_name","1");
            fb_id = settiing.getString("fb_id","2");
            fb_image_url = settiing.getString("fb_image_url","3");
            if_same = settiing.getBoolean("if_same",false);
            /*try{
                fb_name = URLEncoder.encode(fb_name, "utf-8");
            }
            catch (Exception e){
                System.out.println("utf8 fail!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
            }*/

            if(!if_same && fb_id!="2"){
                Uploadmember um = new Uploadmember(); // 很重要~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                um.execute(UPLOAD_member);  // 上傳member 連結 PHP
            }

            //System.out.println(fb_name + " , " + fb_id + " , " + fb_image_url);
        }
    }

    public void startGalleryChooser() {//選照片
        if (PermissionUtils.requestPermission(this, GALLERY_PERMISSIONS_REQUEST, Manifest.permission.READ_EXTERNAL_STORAGE)) {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);
            startActivityForResult(Intent.createChooser(intent, "Select a photo"),
                    GALLERY_IMAGE_REQUEST);
        }
    }

    public void startCamera() {//拍照
        if (PermissionUtils.requestPermission(
                this,
                CAMERA_PERMISSIONS_REQUEST,
                Manifest.permission.READ_EXTERNAL_STORAGE,
                Manifest.permission.CAMERA)) {
            Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
            Uri photoUri = FileProvider.getUriForFile(this, getApplicationContext().getPackageName() + ".provider", getCameraFile());
            intent.putExtra(MediaStore.EXTRA_OUTPUT, photoUri);
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
            startActivityForResult(intent, CAMERA_IMAGE_REQUEST);
        }
    }

    public File getCameraFile() {
        File dir = getExternalFilesDir(Environment.DIRECTORY_PICTURES);
        return new File(dir, FILE_NAME);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {//選完照片後的動作
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == GALLERY_IMAGE_REQUEST && resultCode == RESULT_OK && data != null) {
            setImage(data.getData());
        } else if (requestCode == CAMERA_IMAGE_REQUEST && resultCode == RESULT_OK) {
            Uri photoUri = FileProvider.getUriForFile(this, getApplicationContext().getPackageName() + ".provider", getCameraFile());
            setImage(photoUri);
        }
    }

    @Override
    public void onRequestPermissionsResult(
            int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case CAMERA_PERMISSIONS_REQUEST:
                if (PermissionUtils.permissionGranted(requestCode, CAMERA_PERMISSIONS_REQUEST, grantResults)) {
                    startCamera();
                }
                break;
            case GALLERY_PERMISSIONS_REQUEST:
                if (PermissionUtils.permissionGranted(requestCode, GALLERY_PERMISSIONS_REQUEST, grantResults)) {
                    startGalleryChooser();
                }
                break;
        }
    }

    public void setImage(Uri uri) {//把圖片放在螢幕上 並進行圖片資訊搜尋
        if (uri != null) {
            try {
                // scale the image to save on bandwidth
                Bitmap bitmap = scaleBitmapDown(MediaStore.Images.Media.getBitmap(getContentResolver(), uri), 1200);
                mMainImage.setImageBitmap(bitmap);

                String path;
                if (Build.VERSION.SDK_INT < 11)
                    path = RealPathUtil.getRealPathFromURI_BelowAPI11(this, uri);
                    // SDK >= 11 && SDK < 19
                else if (Build.VERSION.SDK_INT < 19)
                    path = RealPathUtil.getRealPathFromURI_API11to18(this, uri);
                    // SDK > 19 (Android 4.4)
                else
                    path = RealPathUtil.getRealPathFromURI_API19(this, uri);

                System.out.println(path);
                ReadExif(path);

                UploadImage ui = new UploadImage(); // 很重要~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                ui.execute(bitmap);  // 上傳照片 連結 PHP

            } catch (IOException e) {
                Log.d(TAG, "Image picking failed because " + e.getMessage());
                Toast.makeText(this, R.string.image_picker_error, Toast.LENGTH_LONG).show();
            }
        } else {
            Log.d(TAG, "Image picker gave us a null image.");
            Toast.makeText(this, R.string.image_picker_error, Toast.LENGTH_LONG).show();
        }
    }


    class Uploadmember extends AsyncTask<String,Void,String>{//做上傳動作

        ProgressDialog loading;
        RequestHandler rh = new RequestHandler();

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            loading = ProgressDialog.show(MainActivity.this, "Uploading member", "Please wait...",true,true);
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            loading.dismiss();
            Toast.makeText(getApplicationContext(),s,Toast.LENGTH_LONG).show();
        }

        @Override
        protected String doInBackground(String... params) {


            HashMap<String,String> data = new HashMap<>();
            data.put("fb_name", fb_name);
            data.put("fb_id", fb_id);
            data.put("fb_image_url", fb_image_url);

            //String result = rh.sendPostRequest(UPLOAD_URL,data);
            //String result = rh.sendGetRequest(UPLOAD_URL);
            String result = rh.send_id(UPLOAD_member, data);
            return result;
        }
    }

    public void ReadExif(String file){//拿出圖片資訊
        try{
            //file = "/storage/emulated/0/DCIM/Camera/IMG_20170512_103607.jpg";
            result[0] = -1;
            result[1] = -1;
            ExifInterface exifInterface = new ExifInterface(file);


            time = exifInterface.getAttribute(ExifInterface.TAG_DATETIME);
            //System.out.println("Time   "+exifInterface.getAttribute(ExifInterface.TAG_DATETIME));

            //System.out.println("lat   "+exifInterface.getAttribute(ExifInterface.TAG_GPS_LATITUDE));
            //System.out.println("lat_ref   "+exifInterface.getAttribute(ExifInterface.TAG_GPS_LATITUDE_REF));
            //System.out.println("lon   "+exifInterface.getAttribute(ExifInterface.TAG_GPS_LONGITUDE));
            //System.out.println("lon_ref   "+exifInterface.getAttribute(ExifInterface.TAG_GPS_LONGITUDE_REF));

            exifInterface.getLatLong(result);

            //System.out.println(result[0]+", "+result[1]);
        }
        catch(Exception e){
            result[0] = -1;
            result[1] = -1;
        }

    }


    class UploadImage extends AsyncTask<Bitmap,Void,String>{//做上傳動作

        ProgressDialog loading;
        RequestHandler rh = new RequestHandler();

        @Override
        protected void onPreExecute() {
            super.onPreExecute();
            loading = ProgressDialog.show(MainActivity.this, "Uploading Image", "Please wait...",true,true);
        }

        @Override
        protected void onPostExecute(String s) {
            super.onPostExecute(s);
            loading.dismiss();
            Toast.makeText(getApplicationContext(),s,Toast.LENGTH_LONG).show();
        }

        @Override
        protected String doInBackground(Bitmap... params) {
            Bitmap bitmap = params[0];
            String uploadImage = getStringImage(bitmap);
            HashMap<String,String> data = new HashMap<>();
            //data.put(UPLOAD_KEY, uploadImage);
            data.put("pic_id", "456");
            data.put("image", uploadImage);
            data.put("lat", Float.toString(result[0]));
            data.put("lon", Float.toString(result[1]));
            data.put("time", time);
            data.put("fb_name", fb_name);
            data.put("fb_id", fb_id);
            data.put("fb_image_url", fb_image_url);

            //String result = rh.sendPostRequest(UPLOAD_URL,data);
            //String result = rh.sendGetRequest(UPLOAD_URL);
            String result = rh.send_id(UPLOAD_URL, data);
            //System.out.println(result+"!!!!!!!!!!!!");
            return result;
        }
    }






    public String getStringImage(Bitmap bmp){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        byte[] imageBytes = baos.toByteArray();
        String encodedImage = Base64.encodeToString(imageBytes, Base64.DEFAULT);
        return encodedImage;
    }

    public Bitmap scaleBitmapDown(Bitmap bitmap, int maxDimension) {

        int originalWidth = bitmap.getWidth();
        int originalHeight = bitmap.getHeight();
        int resizedWidth = maxDimension;
        int resizedHeight = maxDimension;

        if (originalHeight > originalWidth) {
            resizedHeight = maxDimension;
            resizedWidth = (int) (resizedHeight * (float) originalWidth / (float) originalHeight);
        } else if (originalWidth > originalHeight) {
            resizedWidth = maxDimension;
            resizedHeight = (int) (resizedWidth * (float) originalHeight / (float) originalWidth);
        } else if (originalHeight == originalWidth) {
            resizedHeight = maxDimension;
            resizedWidth = maxDimension;
        }
        return Bitmap.createScaledBitmap(bitmap, resizedWidth, resizedHeight, false);
    }
    public void ClickSign(View view)
    {
        Intent intent = new Intent(this, sign_in.class);
        intent.putExtra(EXTRA_MESSAGE, message);
        startActivity(intent);
    }
}
