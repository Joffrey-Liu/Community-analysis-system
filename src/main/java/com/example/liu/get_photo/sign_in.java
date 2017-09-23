package com.example.liu.get_photo;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.FacebookSdk;
import com.facebook.GraphRequest;
import com.facebook.GraphResponse;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * Created by leo on 19/5/2017.
 */

public class sign_in extends AppCompatActivity {
    private CallbackManager callbackManager;
    private TextView info;
    private LoginButton loginButton;
    String fb_image_url;
    String fb_name;
    String fb_id;
    ArrayList<String> Login_info = new ArrayList<String>();

    public static final String UPLOAD_URL = "http://140.138.77.124/test/uploadmember.php";
    public static final String UPLOAD_KEY = "member";
    public static final String TAG1 = "MY MESSAGE";

    boolean if_same = false;

    private SharedPreferences fb_settiing;
    private SharedPreferences login_settiing;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        FacebookSdk.sdkInitialize(getApplicationContext());
        callbackManager = CallbackManager.Factory.create();
        fb_settiing = this.getApplicationContext().getSharedPreferences("FBDATA",0);
        login_settiing = this.getApplicationContext().getSharedPreferences("LOGINDATA",0);
        readData();
        setContentView(R.layout.sign_in);
        info = (TextView)findViewById(R.id.info);
        loginButton = (LoginButton)findViewById(R.id.login_button);
        loginButton.registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                info.setText("User ID:  " +
                        loginResult.getAccessToken().getUserId() + "\n" +
                        "Auth Token: " + loginResult.getAccessToken().getToken());
                GraphRequest request = GraphRequest.newMeRequest(loginResult.getAccessToken(),new GraphRequest.GraphJSONObjectCallback() {
                            //當RESPONSE回來的時候
                            @Override
                            public void onCompleted(JSONObject object, GraphResponse response) {
                                //讀出姓名 ID FB個人頁面連結
                                System.out.println(object.optString("picture"));
                                Log.d("FB","complete");
                                Log.d("FB",object.optString("name"));
                                Log.d("FB",object.optString("link"));
                                Log.d("FB",object.optString("id"));
                                fb_name = object.optString("name");
                                fb_id = object.optString("id");
                                fb_image_url="https://graph.facebook.com/"+object.optString("id")+"/picture?type=large";
                                info.setText(object.toString());
                                if_same = sameornot(fb_id);

                                if(!if_same){
                                    //  upload to php
                                    Login_info.add(fb_id);
                                    saveData(fb_id);
                                    System.out.println("Not the same~~~~~~~~");
                                    //sign_in.UploadImage ui = new sign_in.UploadImage(); // 很重要~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                    //ui.execute(UPLOAD_URL);  // 上傳member 連結 PHP
                                }

                                System.out.println(object);
                                Intent intent = new Intent();
                                intent.setClass(sign_in.this, MainActivity.class);
                                fb_settiing.edit()
                                        .putString("fb_name",fb_name)
                                        .putString("fb_id",fb_id)
                                        .putString("fb_image_url",fb_image_url)
                                        .putBoolean("if_same", if_same)
                                        .commit();
                                startActivity(intent);
                                sign_in.this.finish();
                            }
                        });
                Bundle parameters = new Bundle();
                parameters.putString("fields", "id,name,link,picture");
                request.setParameters(parameters);
                request.executeAsync();
            }

            @Override
            public void onCancel() {
                info.setText("Login attempt cancelled.");
            }

            @Override
            public void onError(FacebookException e) {
                info.setText("Login attempt failed.");
            }
        });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);

    }

    public boolean sameornot(String in){
        System.out.println("in!!!!!!!!!!");
        for (int i = 0; i < Login_info.size(); i++) {
            if (in.equals(Login_info.get(i)))
                return true;
        }
        return false;
    }

    public void saveData(String in) {
        login_settiing = getSharedPreferences("LOGINDATA", 0);
        login_settiing.edit()
                .putString("Data" + Login_info.size(), in)
                .commit();
        login_settiing.edit()
                .putInt("Size", Login_info.size())
                .commit();

    }

    public void readData() {
        Login_info.clear();
        login_settiing = getSharedPreferences("LOGINDATA", 0);
        for (int i = 1; i < login_settiing.getInt("Size", 0) + 1; i++) {
            Login_info.add(login_settiing.getString("Data" + i, ""));
        }

    }

}
