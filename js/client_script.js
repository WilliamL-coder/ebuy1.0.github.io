document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("auth").style.display = "none";
    document.getElementById("userHome").style.display = "block";
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("注册成功！");
    document.getElementById("register").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

document.getElementById("resetPasswordForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("密码重置链接已发送！");
    document.getElementById("forgotPassword").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

document.getElementById("forgotPasswordLink").addEventListener("click", function() {
    document.getElementById("auth").style.display = "none";
    document.getElementById("forgotPassword").style.display = "block";
});

document.getElementById("registerLink").addEventListener("click", function() {
    document.getElementById("auth").style.display = "none";
    document.getElementById("register").style.display = "block";
});

document.getElementById("loginLink").addEventListener("click", function() {
    document.getElementById("register").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

document.getElementById("backToLoginLink").addEventListener("click", function() {
    document.getElementById("forgotPassword").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

document.getElementById("viewProfileBtn").addEventListener("click", function() {
    document.getElementById("userHome").style.display = "none";
    document.getElementById("profile").style.display = "block";
});

document.getElementById("orderHistoryBtn").addEventListener("click", function() {
    document.getElementById("userHome").style.display = "none";
    document.getElementById("orderHistory").style.display = "block";
});

document.getElementById("wishlistBtn").addEventListener("click", function() {
    document.getElementById("userHome").style.display = "none";
    document.getElementById("wishlist").style.display = "block";
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    alert("已退出登录！");
    document.getElementById("userHome").style.display = "none";
    document.getElementById("auth").style.display = "block";
});

document.getElementById("backToUserHomeLink").addEventListener("click", function() {
    document.getElementById("profile").style.display = "none";
    document.getElementById("userHome").style.display = "block";
});

document.getElementById("backToUserHomeFromOrders").addEventListener("click", function() {
    document.getElementById("orderHistory").style.display = "none";
    document.getElementById("userHome").style.display = "block";
});
    document.getElementById("backToUserHomeFromWishlist").addEventListener("click", function() {
        document.getElementById("wishlist").style.display = "none";
        document.getElementById("userHome").style.display = "block";
    });
    
    // 个人资料修改
    document.getElementById("profileForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const nickname = document.getElementById("nickname").value;
        const avatar = document.getElementById("avatar").files[0];
        const address = document.getElementById("address").value;
    
        if (nickname && address) {
            alert("个人资料已更新！");
        } else {
            alert("请填写完整信息！");
        }
    });
    
    // 假设你会将头像预览功能加到头像文件上传控件上
    document.getElementById("avatar").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // 这里可以显示头像预览
                const img = new Image();
                img.src = e.target.result;
                img.width = 100;
                document.body.appendChild(img); // 这只是一个简单的预览，你可以将它加到页面指定位置
            };
            reader.readAsDataURL(file);
        }
    });
    
    // 订单历史页面的返回按钮
    document.getElementById("backToUserHomeFromOrders").addEventListener("click", function() {
        document.getElementById("orderHistory").style.display = "none";
        document.getElementById("userHome").style.display = "block";
    });
    
    // 查看收藏夹页面的返回按钮
    document.getElementById("backToUserHomeFromWishlist").addEventListener("click", function() {
        document.getElementById("wishlist").style.display = "none";
        document.getElementById("userHome").style.display = "block";
    });
    
    // 模拟用户数据
    const user = {
        nickname: "张三",
        avatar: "default-avatar.jpg",  // 可以替换成动态图片
        address: "北京市朝阳区",
        email: "user@example.com",
        phone: "1234567890"
    };
    
    // 初始化用户数据到个人资料页面
    document.getElementById("nickname").value = user.nickname;
    document.getElementById("address").value = user.address;
