package com.zxzx119;
import android.os.Bundle;
import android.content.Intent;
import android.content.res.Configuration; 
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

import cn.jpush.android.api.JPushInterface;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    protected String getMainComponentName() {
        return "rnRedux";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this,true);
        super.onCreate(savedInstanceState);
        JPushInterface.init(this);
    }

     @Override
     public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        Intent intent = new Intent("onConfigurationChanged");
        intent.putExtra("newConfig", newConfig);
        this.sendBroadcast(intent);
    }

    @Override
    protected void onPause() {
        super.onPause();
        JPushInterface.onPause(this);
    }

    @Override
    protected void onResume() {
        super.onResume();
        JPushInterface.onResume(this);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

}
