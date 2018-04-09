# activity

## 透明主题

```xml
    <style name="TransparentTheme" parent="@android:style/Theme.Translucent.NoTitleBar">
        <item name="android:windowBackground">@color/color_transparent</item>
        <item name="android:windowAnimationStyle">@null</item>
        <item name="android:windowIsTranslucent">true</item>
        <item name="android:windowNoTitle">true</item> <!-- 无标题 -->
        <item name="android:windowContentOverlay">@null</item>
    </style>
    <!-- useage -->
 <activity
            android:name=".wxapi.WXPayEntryActivity"
            android:exported="true"
            android:screenOrientation="portrait" />
```
