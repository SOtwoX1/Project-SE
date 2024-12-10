export const BASE_URL = "http://localhost:3000";

export const adminRoutesURL = {
    base: '/api/admin',
    getDataProfileAdminAPI: '/get-data-profile',
    getDataUserAPI: '/get-data-user',
    getDataRestaurantAPI: '/get-data-restaurant',
    postDataRestaurantAPI: '/post-data-restaurant',
    deleteRestaurantAPI: '/delete-restaurant'
}

export const matchRoutesURL = {
    base: '/api/match',
    getMatchProfileAPI: '/match-profile',
    sendMatchRequestAPI: '/like-profile',
    getAllMatchRequestAPI: '/matches-request',
    acceptMatchRequestAPI: '/accept-match',
    declineMatchRequestAPI: '/denied-match'
}

export const messageRoutesURL = {
    base: '/api/message',
    getAllChatRoomAPI: '/get-all-chat',
    getChatHistoryAPI: '/get-chat',
    endMessageRequestAPI: '/send-message'
}

export const profileRoutesURL = {
    base: '/api/profile',
    getUserProfileAPI: '/get-profile',
    updateSwipeAPI: '/update-swipe-profile',
    changeStatusAPI: '/change-status',
    setGenderInterestAPI: '/set-gender',
    registerProfileAPI: '/register/profile',
    setPhotoAPI: '/set-photo',
    getDataProfileAPI: '/get-data',
    updateDataProfileAPI: '/update-dataprofile',
    setUserPremiumStatusAPI: '/set-ispremium'
}

export const restaurantRoutesURL = {
    base: '/api/restaurant',
    getAllRestaurantAPI: '/get-all-restaurants',
    getRestaurantByIDAPI: '/get-restaurant',
    getAllChillingAtAPI: '/get-all-chilling',
    postChillingAtAPI: '/chilling-at',
    postChillingWithYouAPI: '/chilling-with-you'
}

export const userRoutesURL = {
    base: '/api/user',
    registerAPI: '/register',
    loginAPI: '/login',
    forgotPasswordAPI: '/forgot-password',
    setPasswordAPI: '/reset-password',
    resetPasswordAPI: '/setting/reset-password',
    createCardPaymentAPI: '/create-cardpayment',
    deleteAccountAPI: '/delete-account'
}