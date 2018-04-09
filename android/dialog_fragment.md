# dialog_fragment

## 设置进出场动画---在onCreateView里面执行

1. 在xml里面定义
```xml
<style name="TopToBottomAnim" parent="android:Animation">
    <!-- 进场动画 -->
    <item name="android:windowEnterAnimation">@anim/top_to_bottom</item>
    <!-- 出场动画 -->
    <item name="android:windowExitAnimation">@anim/bottom_to_top</item>
</style>
```
2. 在java代码里面设置
```java
//  设置动画
getDialog().getWindow().setWindowAnimations(R.style.TopToBottomAnim);
```

## 设置位置和大小--在onStart里面

```java
//  位置
        Window window = t.getDialog().getWindow();
        WindowManager.LayoutParams params = window.getAttributes();
        switch (position) {
            case 1:
                params.gravity = Gravity.LEFT;
                break;
            case 2:
                params.gravity = Gravity.TOP;
                break;
            case 3:
                params.gravity = Gravity.RIGHT;
                break;
            case 4:
                params.gravity = Gravity.BOTTOM;
                break;
        }
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        window.setAttributes(params);
        window.setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

//  大小
 int w = (int) (WindowUtil.getWindowWidth(getActivity()) * wRatio);
 getDialog().getWindow().setLayout(w, WindowManager.LayoutParams.WRAP_CONTENT);
```

