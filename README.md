# 自述

这是一个包含 Loon 与 Clash (Meta) 代理工具配置规则集及对应覆写配置文件的仓库。

## 配置文件说明

- **Loon 专属配置**：
  - `Loon/Loon.conf` - Loon 的主配置文件，包含了完整分流、策略组等。
  - `Loon/Rules/Bank.list` - 银行直连的 Loon 格式域后缀分流文件。
- **Clash (Meta / Party) 专属配置**：
  - `Clash/Party_Override.yaml` - 专用于 Clash Party、Clash Verge 等 Meta 内核客户端的 YAML 覆写模板，集成了自动节点分组、防 DNS 泄露策略、及各路流媒体规则（目前已弃用，后续再优化，请使用 `clash防泄露.js`）。
  - `Clash/clash防泄露.js` - Clash Verge 脚本覆写文件，用于注入 DNS 防泄露配置、自定义规则和代理组；脚本来源于 [Arcticn](https://github.com/Arcticn)，已在此基础上进行修改。

## 功能特点

1. 智能分流：根据域名和IP地址自动选择最佳网络路径
2. 节点策略：支持多种代理策略组，包括自动选择和手动选择
3. 地域优化：针对不同地区提供专门的节点组
4. 银行直连：确保银行相关流量直接连接，提高访问速度和安全性（仅用于手机端）

## 感谢

特别感谢以下规则作者的贡献：
- [whatshub.top](https://whatshub.top/) - 提供了完整的银行域名规则列表
- [Moli-X](https://github.com/Moli-X) - 提供了Loon和clash配置相关的规则和工具
- [ACL4SSR](https://github.com/ACL4SSR) - 提供了局域网分流规则
- [Koolson](https://github.com/Koolson) - 提供了Qure图标资源
- [Orz-3](https://github.com/Orz-3) - 提供了mini图标资源
- [Peng-YM](https://github.com/Peng-YM) - 提供了Sub-Store解析器
- [Arcticn](https://github.com/Arcticn) - 提供了 Clash 防泄露覆写脚本的原始版本


## 许可证

本项目仅供个人学习和研究使用，请遵守相关法律法规。
