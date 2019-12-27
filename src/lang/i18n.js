import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    'en': {
        title:  'Login KPI SYSTEM',
        username: 'username',
        password:   'password',
        login:  'login',
        remember: ' Remember Me',
        Settings: 'Settings',
        KPI : '(2) KPI',
        Favourites: 'Favourites',
        Workplaces: 'Workplaces',
        OC: '(1) OC',
        Categories: '(3) Categories',
        Users: 'Users',
        AddUserOfOC: 'Add User Of OC',
        OCKPI: '(5) OCKPI',
        OCCategoryKPI : '(6) OC Category KPI',
        UserKPI: 'KPI',
        OCCategory: '(4) OC Category',
        Menu:'Menu'

    },
    'vi': {
        title:  'Đăng nhập KPI SYSTEM',
        username: 'tài khoản',
        password:   'mật khẩu',
        login:  'Đăng nhập',
        remember: ' Nhớ mật khẩu',
        Settings: 'Cài đặt',
        KPI : '(2) KPI',
        Favourites: 'Yêu thích',
        Workplaces: 'Bàn làm việc',
        OC: '(1) OC',
        Categories: '(3) Danh mục',
        Users: 'Người dùng',
        AddUserOfOC: 'Add User Of OC',
        OCKPI: '(5) OCKPI',
        OCCategoryKPI: '(6) OC Category KPI',
        UserKPI: 'UserKPI',
        OCCategory: '(4) OC Category',
        Menu:'Menu'
    },
    'tw-zh': {
        title:  ' 登錄到KPI SYSTEM',
        username: ' 用戶名',
        password:   '密碼',
        login:  '登入',
        remember: ' 想念我',
        Settings: '設定值',
        KPI : '(2) KPI',
        Favourites: '收藏夾',
        Workplaces: '工作場所',
        OC: '(1) OC',
        Categories: '(3) 分類目錄',
        Users: '用戶數',
        AddUserOfOC: 'Add User Of OC',
        OCKPI: '(5) OC KPI',
        OCCategoryKPI:  '(6) OC Category KPI',
        UserKPI: 'KPI',
        OCCategory: '(4) OC Category',
        Menu:'菜單'
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale,
    // silentFallbackWarn: true,
    fallbackLocale: 'en', // set fallback locale
    formatFallbackMessages: true,
    silentFallbackWarn: true,
    messages // set locale messages
});
export default i18n;