<div align="center">

# CnProxy

**稳定、安全、智能的代理配置规则集**

[![Clash-Meta](https://img.shields.io/badge/Clash--Meta-支持-success?logo=clash&style=flat-square)](https://github.com/MetaCubeX/mihomo)
[![Mihomo](https://img.shields.io/badge/Mihomo-Party-blue?style=flat-square)](https://github.com/mihomo-party-org/mihomo-party)
[![Loon](https://img.shields.io/badge/Loon-iOS-orange?style=flat-square)](https://nsloon.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

专为 **Loon** 与 **Clash (Meta / Mihomo)** 打造的代理配置规则集

精细化分流 · DNS 防泄漏 · 银行直连优化 · 去广告增强

</div>

---

## ✨ 核心特性

- 🛡️ **DNS 防泄漏**  
  专为国内网络环境优化，内置多层 DNS 防泄漏策略，保护隐私安全

- 🚀 **智能分流**  
  根据域名和 IP 自动选择最佳路径，内置流媒体、AI、游戏等专属策略组

- 🏦 **银行直连**  
  针对国内主流银行 App/网页特殊优化，确保金融安全与访问速度

- 🎯 **精准去广告**  
  集成 ACL4SSR 等优质规则，过滤广告、追踪与恶意域名

- ⚡ **多种策略**  
  支持自动选择、故障转移、负载均衡等多种代理策略

---

## 📂 目录结构

```
CnProxy/
├── Clash/                        # Clash/Mihomo 配置
│   ├── Party_Override.yaml       # 标准覆写模板
│   ├── Party_dns.yaml            # 增强版 DNS 防泄漏模板
│   ├── clash防泄露.js             # JavaScript 覆写脚本
│   ├── Rules/
│   │   └── AppleUpdate.list      # Apple 更新规则
│   └── Icon/                     # 策略组图标
│       ├── DeepSeek.png
│       ├── Google.png
│       ├── YouTube.png
│       └── ...
│
├── Loon/                         # Loon 配置
│   ├── Loon.conf                 # 主配置文件
│   └── Rules/
│       └── Bank.list             # 银行直连规则
│
└── README.md                     # 项目文档
```

---

## 🚀 快速开始

### 📱 Loon (iOS)

#### 方法 1：从 URL 导入
1. 打开 Loon → 配置 → 订阅配置
2. 点击右上角 `+` → 从 URL 下载
3. 输入配置 URL（GitHub Raw 链接）
4. 等待下载完成并应用

#### 方法 2：手动导入
1. 复制 [`Loon.conf`](./Loon/Loon.conf) 内容
2. 打开 Loon → 配置 → 文本模式
3. 粘贴配置并保存

---

### 💻 Clash Verge / Clash Verge Rev

#### JavaScript 覆写（推荐）

1. 打开 **Clash Verge** → 订阅
2. 找到你的订阅配置 → 点击 ⚙️ → 脚本
3. 新建脚本，将 [`clash防泄露.js`](./Clash/clash防泄露.js) 内容粘贴
4. 保存并启用脚本

#### YAML 覆写

1. 打开 **Clash Verge** → 订阅
2. 找到你的订阅配置 → 点击 ⚙️ → 覆写
3. 将 [`Party_dns.yaml`](./Clash/Party_dns.yaml) 内容粘贴
4. 保存并重启客户端

---

### 🎨 Mihomo Party

1. 打开 **Mihomo Party** → 覆写
2. 点击 `+` 新建覆写
3. 根据需求选择：
   - **标准版**：[`Party_Override.yaml`](./Clash/Party_Override.yaml)
   - **增强版**：[`Party_dns.yaml`](./Clash/Party_dns.yaml)（推荐）
4. 粘贴内容并保存
5. 重启客户端使配置生效

---

## 📋 配置说明

### Loon 配置文件

| 文件 | 说明 |
|------|------|
| [`Loon.conf`](./Loon/Loon.conf) | 主配置文件，包含代理策略组、分流规则、DNS 设置等 |
| [`Bank.list`](./Loon/Rules/Bank.list) | 银行直连规则，覆盖国内主流银行域名 |

**核心配置项**：
- `disable-udp-ports=443`：禁用 UDP 443 端口（解决 QUIC 冲突）
- `dns-server`：国内 DNS（阿里/腾讯/DNSPod）
- `doh-server`：DoH 服务器（仅保留稳定源）
- `skip-proxy`：跳过代理的域名（如微信、QQ）
- `real-ip`：强制使用 UDP DNS 的域名（如 CDN）

---

### Clash/Mihomo 配置文件

| 文件 | 适用客户端 | 特点 |
|------|-----------|------|
| [`Party_Override.yaml`](./Clash/Party_Override.yaml) | Mihomo Party | 标准覆写模板，平衡性能与功能 |
| [`Party_dns.yaml`](./Clash/Party_dns.yaml) | Mihomo Party / Verge Rev | 增强 DNS 防泄漏，集成 `.mrs` 规则 |
| [`clash防泄露.js`](./Clash/clash防泄露.js) | Clash Verge (Rev) | JavaScript 动态注入，灵活性最高 |

**关键策略组**：
- 🚀 **节点选择**：手动/自动切换全局代理节点
- 🎬 **流媒体**：Netflix、Disney+、YouTube 等专属节点
- 🤖 **AI 服务**：OpenAI、Claude、Google Gemini 等
- 🏦 **银行直连**：国内银行域名强制直连
- 🛑 **广告拦截**：基于 ACL4SSR 规则集

---

## 🔧 常见问题

### Q1: DoH 解析失败频繁出现？

**原因**：某些域名（如 P2P CDN、Firebase）在蜂窝网络下 DoH 不稳定。

**解决方案**：在 `Loon.conf` 的 `[General]` 区块添加：

```ini
# 跳过代理，使用系统 DNS（适合国内服务）
skip-proxy = *.weixin.qq.com, *.qq.com

# 跳过 DoH，使用 UDP DNS（适合 CDN/P2P）
real-ip = *.yunjnet.com, settings.crashlytics.com
```

---

### Q2: DNS 查询超时 (timeout)？

**原因**：网络波动或 DNS 服务器不可达。

**建议**：
1. 检查是否开启了 VPN/代理
2. 尝试切换到其他网络环境（WiFi ↔ 蜂窝）
3. 在 Loon 中重新拉取配置并重启

---

### Q3: 节点异常/连接失败？

**原因**：节点过期、被墙或线路拥堵。

**解决**：
1. 在策略组中切换到其他节点
2. 使用 `自动选择` 或 `故障转移` 策略
3. 联系机场更新节点

---

## 🙏 致谢

感谢以下开源项目和作者的贡献：

| 项目 | 贡献 |
|------|------|
| [whatshub.top](https://whatshub.top/) | 银行域名规则列表 |
| [Moli-X](https://github.com/Moli-X) | Loon/Clash 高质量分流规则 |
| [ACL4SSR](https://github.com/ACL4SSR) | 去广告、流媒体分流规则 |
| [Koolson](https://github.com/Koolson) | Qure 图标资源 |
| [Orz-3](https://github.com/Orz-3) | mini 图标资源 |
| [Peng-YM](https://github.com/Peng-YM) | Sub-Store 订阅工具 |
| [Arcticn](https://github.com/Arcticn) | Clash 防泄露脚本参考 |

---

## 📄 许可与免责

本项目采用 MIT 许可证开源，仅供个人学习和研究使用。

⚠️ **免责声明**：
- 请遵守当地法律法规及网络服务条款
- 使用本配置产生的任何后果由使用者自行承担
- 本项目不提供任何代理节点服务

---

<div align="center">

**如果觉得有帮助，欢迎 ⭐ Star 支持！**

</div>
