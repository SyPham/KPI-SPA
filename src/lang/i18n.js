import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCookies from 'vue-cookies'
Vue.use(VueI18n);
Vue.use(VueCookies)
const messages = {
    'en': {
        Code: 'Code',
        Skype: 'Skype',
        State: 'State',
        Permission: 'Permission',
        AddEditDelete: 'Add/Edit/Delete',
        FullName: 'FullName',
        Alias: 'Alias',
        Email: 'Email',
        Username: 'Username',
        Add_btn: 'Add',
        User_List: 'User List',
        listTaskBtn: 'List Tasks',
        WeekStart: 'Week Start',
        WeekEnd: 'Week End',
        btnClearSearch: 'Clear Search',
        Favorite_label: 'Add Favorite',
        Compare_label: 'Compare',
        Manager_label: 'Manager',
        Owner_label: 'Owner',
        Updater_label: 'Updater',
        Sponsor_label: 'Sponsor',
        Participant_label: 'Participant',
        WorkingPlan_label: ' Working Plan',
        Year: 'Year',
        Start: 'Start',
        End: 'End',
        Weekly: 'Weekly',
        Monthly: 'Monthly',
        Quarterly: 'Quarterly',
        Yearly: 'Yearly',
        Viewallbyweekly: 'View all by weekly',
        Viewallbymonthly: 'View all by monthly',
        Viewallbyquarterly: 'View all by quarterly',
        Viewallbyyearly: 'View all by yearly',
        Collapse: 'Collapse',
        Expand: 'Expand',
        home: 'Home',
        Name: 'Name',
        Units: 'Units',
        List_KPIs: 'List KPIs',
        Edit: 'Edit',
        Delete: 'Delete',
        levelnum: 'Level Number',
        OC: 'Organization Chart',
        Category: 'Category',
        KPI : 'KPI',
        OCCategories: 'OC Category',
        OC_KPI : 'OC KPI',
        OC_Category_KPI: 'OC Category KPI',
        User: 'User',
        AddUserToLevel: 'Add User Of List Each Levels',
        List_Categories : 'List Categories',
    },
    'vi': {
        List_Categories : 'Danh sách Danh Mục',
        OC: 'Sơ Đồ Tổ Chức',
        Category: 'Danh Mục',
        KPI : 'KPI',
        OCCategories: 'OC Category',
        OC_KPI : 'OC KPI',
        OC_Category_KPI: 'OC Category KPI',
        User: 'User',
        AddUserToLevel: 'Add User Of List Each Levels',
        levelnum: 'Cấp Độ',
        Edit: 'Sửa',
        Delete: 'Xóa',
        Name: 'Tên',
        Units: 'Đơn Vị Đo',
        List_KPIs: 'List KPIs',
        Code: 'Mã Code',
        Skype: 'Skype',
        State: 'Trạng Thái',
        Permission: 'Quyền Hạn',
        AddEditDelete: 'Thêm/Sửa/Xóa',
        FullName: 'Họ Và Tên',
        Alias: 'Bí Danh',
        Email: 'Email',
        Username: 'Tên Đăng Nhập',
        Add_btn: 'Thêm',
        User_List: 'Danh Sách Người Dùng',
        listTaskBtn: 'Danh Sách Nhiệm Vụ',
        WeekStart: 'Week Start',
        WeekEnd: 'Week End',
        btnClearSearch: 'Xóa Tìm Kiếm',
        Favorite_label: 'Yêu Thích',
        Compare_label: 'So Sánh',
        Manager_label: 'Quản Lý',
        Owner_label: 'Chủ Quản',
        Updater_label: 'Người Cập Nhật',
        Sponsor_label: 'Hỗ Trợ',
        Participant_label: 'Người Tham Gia',
        WorkingPlan_label: 'Kế Hoạch Làm Việc',
        Year: 'Năm',
        Start: 'Bắt Đầu',
        End: 'Kết Thúc',
        Weekly: 'Hàng Tuần',
        Monthly: 'Hàng Tháng',
        Quarterly: 'Hàng Quý',
        Yearly: 'Hàng Năm',
        Viewallbyweekly: 'Xem Theo Tuần',
        Viewallbymonthly: 'Xem Theo Tháng',
        Viewallbyquarterly: 'Xem Theo Quý',
        Viewallbyyearly: 'Xem Theo Năm',
        Collapse: 'Thu gọn',
        Expand: 'Mở rộng',
        home: 'Trang chủ',
       
    },
    'zh-TW': {
        List_Categories : '類別',
        OC: '組織結構圖',
        Category: '類別',
        KPI : 'KPI',
        OCCategories: 'OC Category',
        OC_KPI : 'OC KPI',
        OC_Category_KPI: 'OC Category KPI',
        User: 'User',
        AddUserToLevel: 'Add User Of List Each Levels',
        levelnum: '等級',
        Edit: '編輯',
        Delete: '刪除',
        Name: '名稱',
        Units: '單位',
        List_KPIs: 'List KPIs',
        Code: '號碼',
        Skype: 'Skype',
        State: '狀態',
        Permission: '允許',
        AddEditDelete: '加/編輯/刪除',
        FullName: '全名',
        Alias: '別名',
        Email: 'Email',
        Username: '登錄名',
        Add_btn: '創建',
        User_List: '用戶清單',
        listTaskBtn: '列出任務',
        WeekStart: 'Week Start',
        WeekEnd: 'Week End',
        btnClearSearch: '重新開始',
        Favorite_label: '喜愛',
        Compare_label: '比較',
        Manager_label: '經理',
        Owner_label: '所有者',
        Updater_label: '更新器',
        Sponsor_label: '贊助',
        Participant_label: '參加者',
        WorkingPlan_label: '工作計劃',
        Year: '年',
        Start: '開始',
        End: '結束',
        Weekly: '每週',
        Monthly: '每月（的)',
        Quarterly: '季刊',
        Yearly: '年度的',
        Viewallbyweekly: '按週查看',
        Viewallbymonthly: '按月查看',
        Viewallbyquarterly: '按季度查看',
        Viewallbyyearly: '按年份查看',
        Collapse: '坍方',
        Expand: '擴大',
        home: 'Home',
    }
};

const i18n = new VueI18n({
    locale: $cookies.get("Lang"), // set locale,
    // silentFallbackWarn: true,
    fallbackLocale: 'en', // set fallback locale
    formatFallbackMessages: true,
    silentFallbackWarn: true,
    messages // set locale messages
});
export default i18n;