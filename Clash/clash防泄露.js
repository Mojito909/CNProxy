// =============================================================================
// DNS 配置
// =============================================================================

// 国内 DNS
const domesticNameservers = [
    "https://223.5.5.5/dns-query",  // 阿里 DoH
    "https://doh.pub/dns-query",    // 腾讯 DoH
];

// 国外 DNS
const foreignNameservers = [
    "https://cloudflare-dns.com/dns-query",                                // Cloudflare
    "https://77.88.8.8/dns-query",                                         // Yandex
    "https://8.8.4.4/dns-query#ecs=1.1.1.1/24&ecs-override=true",          // Google
    "https://208.67.222.222/dns-query#ecs=1.1.1.1/24&ecs-override=true",   // OpenDNS
    "https://9.9.9.9/dns-query",                                           // Quad9
];

const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    // "ipv6": true,
    "prefer-h3": false,
    "respect-rules": true,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
        // 本地主机/设备
        "+.lan", "+.local",
        // Windows 网络检测（防止出现小地球图标）
        "+.msftconnecttest.com", "+.msftncsi.com",
        // QQ / 微信快速登录检测
        "localhost.ptlogin2.qq.com", "localhost.sec.qq.com",
        "+.weixin.com", "+.wechat.com", "+.weixin.qq.com",
        "localhost.work.weixin.qq.com",
    ],
    "default-nameserver": ["223.5.5.5", "1.2.4.8"],
    "nameserver": [...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers],
    "direct-nameserver": [...domesticNameservers],
    "direct-nameserver-follow-policy": false,
    "nameserver-policy": {
        "geosite:cn": domesticNameservers,
    },
};

// =============================================================================
// 规则集配置
// =============================================================================

const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400,
};

// 辅助函数：生成 Loyalsoldier 规则集条目
const loyalsoldier = (name, behavior) => ({
    ...ruleProviderCommon,
    "behavior": behavior,
    "url": `https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/${name}.txt`,
    "path": `./ruleset/loyalsoldier/${name}.yaml`,
});

// 辅助函数：生成 MetaCubeX 规则集条目
const metaCubeX = (name) => ({
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `https://raw.githubusercontent.com/MetaCubeX/meta-rules-dat/refs/heads/meta/geo/geosite/classical/${name}.yaml`,
    "path": `./ruleset/MetaCubeX/${name}.yaml`,
});

const ruleProviders = {
    // Loyalsoldier — 域名类
    "reject": loyalsoldier("reject", "domain"),    // 广告/恶意域名
    "icloud": loyalsoldier("icloud", "domain"),    // iCloud 域名
    "apple": loyalsoldier("apple", "domain"),    // Apple 域名
    "google": loyalsoldier("google", "domain"),    // Google 域名
    "proxy": loyalsoldier("proxy", "domain"),    // 代理域名（需翻墙）
    "direct": loyalsoldier("direct", "domain"),    // 直连域名
    "private": loyalsoldier("private", "domain"),    // 私有域名（局域网）
    "gfw": loyalsoldier("gfw", "domain"),    // GFW 封锁域名
    "tld-not-cn": loyalsoldier("tld-not-cn", "domain"),    // 非 .cn 顶级域名
    // Loyalsoldier — IP 段
    "telegramcidr": loyalsoldier("telegramcidr", "ipcidr"),    // Telegram IP 段
    "cncidr": loyalsoldier("cncidr", "ipcidr"),    // 中国大陆 IP 段
    "lancidr": loyalsoldier("lancidr", "ipcidr"),    // 局域网 IP 段
    // Loyalsoldier — 应用程序
    "applications": loyalsoldier("applications", "classical"), // 需直连的应用程序
    // MetaCubeX — 应用服务
    "openai": metaCubeX("openai"),                       // OpenAI / ChatGPT
    "pikpak": metaCubeX("pikpak"),                       // PikPak 网盘
    "anthropic": metaCubeX("anthropic"),                    // Anthropic / Claude
    "google-gemini": metaCubeX("google-gemini"),                // Google Gemini
    "xai": metaCubeX("xai"),                          // xAI / Grok
    "perplexity": metaCubeX("perplexity"),                   // Perplexity AI
    "microsoft": metaCubeX("microsoft"),                    // 微软服务
    // 自定义规则集
    "AppleUpdate": {
        "type": "http",
        "format": "text",
        "behavior": "classical",
        "interval": 86400,
        "url": "https://testingcf.jsdelivr.net/gh/Mojito909/CNProxy@main/Clash/Rules/AppleUpdate.list",
        "path": "./ruleset/AppleUpdate.list",
    },                                                          // Apple 系统更新（拦截用）
    "adrules": {
        "type": "http",
        "format": "text",
        "behavior": "classical",
        "interval": 86400,
        "url": "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/BanAD.list",
        "path": "./ruleset/adrules.list",
    },                                                          // ACL4SSR 广告拦截
    "ChinaDomain": {
        "type": "http",
        "format": "text",
        "behavior": "classical",
        "interval": 86400,
        "url": "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaDomain.list",
        "path": "./ruleset/ChinaDomain.list",
    },                                                          // 国内直连域名

    "ChinaCompanyIp": {
        "type": "http",
        "format": "text",
        "behavior": "ipcidr",
        "interval": 86400,
        "url": "https://testingcf.jsdelivr.net/gh/ACL4SSR/ACL4SSR@master/Clash/ChinaCompanyIp.list",
        "path": "./ruleset/ChinaCompanyIp.list",
    },                                                          // 中国云服务商 IP 段
};


// =============================================================================
// 规则
// =============================================================================

const rules = [

    // 自定义规则
    "DOMAIN-SUFFIX,googleapis.cn,模式选择",          // Google 服务
    "DOMAIN-SUFFIX,gstatic.com,模式选择",            // Google 静态资源
    "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,模式选择",   // Google Play 下载
    "DOMAIN-SUFFIX,github.io,模式选择",              // GitHub Pages
    "DOMAIN,v2rayse.com,模式选择",                   // V2rayse 节点工具

    // MetaCubeX 规则集
    "RULE-SET,openai,ChatGPT",
    "RULE-SET,google-gemini,ChatGPT",
    "RULE-SET,xai,ChatGPT",
    "RULE-SET,perplexity,ChatGPT",
    "RULE-SET,anthropic,Claude",
    "RULE-SET,pikpak,PikPak",

    // Loyalsoldier & 广告 规则集
    "RULE-SET,applications,全局直连",
    "RULE-SET,private,全局直连",
    "RULE-SET,reject,广告过滤",
    "RULE-SET,adrules,广告过滤",
    "RULE-SET,ChinaDomain,全局直连", // 国内直连域名，避免走代理
    "RULE-SET,ChinaCompanyIp,全局直连", // 国内云服务商 IP，避免走代理

    "RULE-SET,microsoft,微软服务",
    "RULE-SET,AppleUpdate,全局拦截",  // 拦截 Apple 系统更新
    "RULE-SET,icloud,苹果服务",
    "RULE-SET,apple,苹果服务",
    "RULE-SET,google,谷歌服务",
    "RULE-SET,proxy,模式选择",
    "RULE-SET,gfw,模式选择",
    "RULE-SET,tld-not-cn,模式选择",
    "RULE-SET,direct,全局直连",
    "RULE-SET,lancidr,全局直连,no-resolve",
    "RULE-SET,cncidr,全局直连,no-resolve",
    "RULE-SET,telegramcidr,电报消息,no-resolve",

    // 兜底
    "GEOIP,LAN,全局直连,no-resolve",
    "GEOIP,CN,全局直连,no-resolve",
    "MATCH,漏网之鱼",
];

// =============================================================================
// 代理组配置
// =============================================================================

const groupBaseOption = {
    "interval": 0,
    "timeout": 3000,
    "url": "https://www.google.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false,
};

// 常用代理组列表（用于各组的 proxies 引用）
const baseProxies = ["模式选择", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"];
const aiProxies = ["模式选择", "节点选择", "全局直连", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"];
const selectProxies = ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"];  // 注意：不含"模式选择"，避免与全局直连循环引用

// Qure 图标源
const qure = (name) => `https://fastly.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/${name}.png`;
// clash-verge-rev 图标源
const cvr = (name) => `https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/${name}.svg`;

const proxyGroupsConfig = [
    // ── 顶层选择 ──────────────────────────────────────────────────────────────
    {
        ...groupBaseOption,
        "name": "模式选择",
        "type": "select",
        "proxies": ["节点选择", "全局直连"],
        "icon": "https://testingcf.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
    },
    // ── 节点策略 ──────────────────────────────────────────────────────────────
    {
        ...groupBaseOption,
        "name": "节点选择",
        "type": "select",
        "proxies": ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
        "include-all": true,
        "icon": qure("Auto"),
    },
    {
        ...groupBaseOption,
        "name": "延迟选优",
        "type": "url-test",
        "tolerance": 50,
        "include-all": true,
        "icon": cvr("speed"),
    },
    {
        ...groupBaseOption,
        "name": "故障转移",
        "type": "fallback",
        "include-all": true,
        "icon": cvr("ambulance"),
    },
    {
        ...groupBaseOption,
        "name": "负载均衡(散列)",
        "type": "load-balance",
        "strategy": "consistent-hashing",
        "include-all": true,
        "icon": cvr("merry_go"),
    },
    {
        ...groupBaseOption,
        "name": "负载均衡(轮询)",
        "type": "load-balance",
        "strategy": "round-robin",
        "include-all": true,
        "icon": cvr("balance"),
    },
    // ── 应用分流 ──────────────────────────────────────────────────────────────
    {
        ...groupBaseOption,
        "name": "ChatGPT",
        "type": "select",
        "proxies": aiProxies,
        "include-all": true,
        "exclude-filter": "(?i)港|hk|hongkong|hong kong|俄|ru|russia|澳|macao",
        "icon": cvr("chatgpt"),
    },
    {
        ...groupBaseOption,
        "name": "Claude",
        "type": "select",
        "proxies": aiProxies,
        "include-all": true,
        "icon": cvr("claude"),
    },
    {
        ...groupBaseOption,
        "name": "PikPak",
        "type": "select",
        "proxies": aiProxies,
        "include-all": true,
        "icon": "https://raw.githubusercontent.com/Mojito909/CNProxy/main/Clash/Icon/PikPak.png",
    },
    {
        ...groupBaseOption,
        "name": "国外媒体",
        "type": "select",
        "proxies": baseProxies,
        "include-all": true,
        "icon": cvr("youtube"),
    },
    {
        ...groupBaseOption,
        "name": "电报消息",
        "type": "select",
        "proxies": baseProxies,
        "include-all": true,
        "icon": cvr("telegram"),
    },
    {
        ...groupBaseOption,
        "name": "谷歌服务",
        "type": "select",
        "proxies": baseProxies,
        "include-all": true,
        "icon": cvr("google"),
    },
    {
        ...groupBaseOption,
        "name": "苹果服务",
        "type": "select",
        "proxies": baseProxies,
        "include-all": true,
        "icon": cvr("apple"),
    },
    {
        ...groupBaseOption,
        "name": "微软服务",
        "type": "select",
        "proxies": aiProxies,
        "include-all": true,
        "icon": cvr("microsoft"),
    },
    // ── 基础策略 ──────────────────────────────────────────────────────────────
    {
        ...groupBaseOption,
        "name": "全局直连",
        "type": "select",
        "proxies": ["DIRECT", ...selectProxies],
        "include-all": true,
        "icon": "https://github.com/Moli-X/Tool/raw/X/Icon/App/Pixel144/Direct.png",
    },
    {
        ...groupBaseOption,
        "name": "广告过滤",
        "type": "select",
        "proxies": ["REJECT", "DIRECT"],
        "icon": qure("AdWhite"),
    },
    {
        ...groupBaseOption,
        "name": "全局拦截",
        "type": "select",
        "proxies": ["REJECT", "DIRECT"],
        "icon": "https://github.com/Moli-X/Tool/raw/X/Icon/App/Pixel144/Reject.png",
    },
    {
        ...groupBaseOption,
        "name": "漏网之鱼",
        "type": "select",
        "proxies": baseProxies,
        "include-all": true,
        "icon": qure("Final"),
    },
];

// =============================================================================
// 程序入口
// =============================================================================

function main(config) {
    const originalProxies = config?.proxies ? [...config.proxies] : [];

    if (originalProxies.length === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 为所有节点开启 UDP
    config["proxies"] = originalProxies.map(proxy => {
        if (proxy && typeof proxy === "object" && proxy.name) {
            proxy.udp = true;
            // 如需绑定出口网卡，取消下方注释（二选一）
            // proxy["interface-name"] = "WLAN";
            // proxy["interface-name"] = "以太网";
        } else {
            console.warn("警告：发现无效的代理配置:", proxy);
            return null;
        }
        return proxy;
    }).filter(Boolean);

    config["dns"] = dnsConfig;
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;
    config["proxy-groups"] = [
        ...proxyGroupsConfig,
        { "name": "GLOBAL", "type": "select", "proxies": ["节点选择"], "hidden": true }, // 隐藏内置 GLOBAL 组
    ];

    return config;
}
