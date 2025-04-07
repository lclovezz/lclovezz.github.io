const getBackendUrl = () => {
    console.log('getBackendUrl',window.location)
    const { host } = window.location;
    if (host === 'jiaran.mes.isastro.com') {
        return 'http://jiaran.mes.isastro.com';
    }
    if (host === '192.168.110.98:8080') {
        return 'http://192.168.110.98:18000';
    }
    if (host === 'localhost:8080' || host === '192.168.3.88:8080') {
        return 'http://192.168.3.126:18000';
    }

    // 默認後端地址（可選）
    return 'http://default.backend.url';
};

const config = {
    url: getBackendUrl(),
    isManager: false
};

export default config