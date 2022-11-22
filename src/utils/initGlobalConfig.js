if(process.env.NODE_ENV == 'local') {
    window.$globalConfig = window.$config.local
}else{
    window.$globalConfig = window.$config.production
}