# CnProxy

<div align="center">

![Clash-Meta](https://img.shields.io/badge/Clash--Meta-success?logo=clash&style=flat-square)
![Mihomo](https://img.shields.io/badge/Mihomo-Party-blue?style=flat-square)
![Loon](https://img.shields.io/badge/Loon-iOS-orange?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

这是一个包含 **Loon** 与 **Clash (Meta / Mihomo)** 代理工具配置规则集及对应覆写配置文件的仓库。通过精细化的分流规则和 DNS 泄漏防护，提供更为稳定和安全的代理使用体验。

</div>

---

## 功能特点

1. **隐私保护与防泄漏**：内置严密的 DNS 泄露防护配置，专为国内网络环境优化，防止 DNS 查询泄漏。
2. **智能分流**：根据域名和 IP 地址自动选择最佳网络路径，内置丰富的流媒体、AI 及软件通讯等策略组。
3. **节点策略**：支持多种代理策略组，涵盖自动选择（延迟选优）、故障转移、负载均衡等。
4. **银行直连优化**：针对国内各大银行网页/ App 端进行特殊分流，确保相关流量直接连接，大幅提高访问速度与账号安全性。
5. **去广告与防劫持**：引入 ACL4SSR 等优秀的去广告规则，过滤常见广告、统计追踪和恶意劫持域名。

## 目录结构

### Loon 专属配置

- [`Loon/Loon.conf`](./Loon/Loon.conf)：Loon 的主配置文件，包含了主分流、代理策略组等网络设置。
- [`Loon/Rules/Bank.list`](./Loon/Rules/Bank.list)：针对银行等金融机构直连的 Loon 格式域名后缀分流文件。

### Clash (Meta / Mihomo / Party) 专属配置

- [`Clash/Party_Override.yaml`](./Clash/Party_Override.yaml)
  专用于 Clash Party、Mihomo Party 等 Meta 内核客户端的 **YAML 覆写模板**。集成了精心整理的分组逻辑、各类流媒体规则和防 DNS 泄露策略。
- [`Clash/Party_dns.yaml`](./Clash/Party_dns.yaml)
  专为 Mihomo Party / Clash Verge Rev 打造的 **强化版防泄露覆写模板**。通过精简界面组别、引入高效的 `.mrs` 规则以及专属 IP 分流集，从底层优先解决 DNS 泄漏问题，同时保留对 AI 等重要服务的稳定分流。
- [`Clash/clash防泄露.js`](./Clash/clash防泄露.js)
  适用于 Clash Verge (Rev) 等支持 JavaScript 覆写的客户端文件。动态注入 DNS 防泄露配置、自定义内置及第三方规则集，提供多项网络代理组；该脚本衍生自 [Arcticn](https://github.com/Arcticn) 并经过优化适配。

## 使用说明

### Clash Verge / Clash Verge Rev (JavaScript 覆写)
1. 在订阅或配置界面，找到“扩展脚本”或类似脚本功能。
2. 新建一个脚本，将 [`Clash/clash防泄露.js`](./Clash/clash防泄露.js) 的内容复制进去并启用。
3. 使其对所需的订阅配置生效。

### Mihomo Party (YAML 覆写)
1. 打开 Mihomo Party 的覆写配置选项。
2. 将 [`Clash/Party_Override.yaml`](./Clash/Party_Override.yaml) 或 [`Clash/Party_dns.yaml`](./Clash/Party_dns.yaml) 的内容粘贴或引入到覆写规则内（根据需要选择基础版或加强版）。
3. 保存并重新配置/重启客户端，即可享受最新的分组和防泄漏策略。

### Loon (iOS)
1. 在 Loon 的配置中选择“从 URL 下载（Download from URL）”或者直接复制本地配置内容涵盖你的文件。
2. 按需导入 `Loon/Loon.conf` 及 `Bank.list` 使其生效和更新。

## 感谢与致敬

特别感谢以下规则作者的贡献，没有他们的无私付出就没有本仓库的基础：

- [whatshub.top](https://whatshub.top/) - 提供了完整的银行域名规则列表
- [Moli-X](https://github.com/Moli-X) - 提供了 Loon 和 Clash 配置相关的规则及高品质分流源
- [ACL4SSR](https://github.com/ACL4SSR) - 提供了详尽的局域网与去广告、大媒体分流规则
- [Koolson](https://github.com/Koolson) - 提供了精美的 Qure 高质量图标资源
- [Orz-3](https://github.com/Orz-3) - 提供了实用的 mini 图标资源
- [Peng-YM](https://github.com/Peng-YM) - 提供了强大的 Sub-Store 订阅解析器
- [Arcticn](https://github.com/Arcticn) - 提供了 Clash 防泄露覆写脚本的重要参考版本

## 许可证与免责声明

本项目仅供个人学习和研究使用，请遵守相关法律法规。
