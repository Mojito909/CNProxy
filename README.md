# 自述

这是一个Loon代理工具的配置项目，包含了网络代理的各种设置和规则。

## 配置文件说明

- `loon.conf` - 主配置文件，包含代理策略、分流规则等设置
- `Bank.list` - 银行直连规则文件，确保银行网站和应用的访问速度和稳定性

## 功能特点

1. 智能分流：根据域名和IP地址自动选择最佳网络路径
2. 节点策略：支持多种代理策略组，包括自动选择和手动选择
3. 地域优化：针对不同地区提供专门的节点组
4. 银行直连：确保银行相关流量直接连接，提高访问速度和安全性

## 感谢

特别感谢以下规则作者的贡献：
- [whatshub.top](https://whatshub.top/) - 提供了完整的银行域名规则列表
- [Moli-X](https://github.com/Moli-X) - 提供了Loon配置相关的规则和工具
- [ACL4SSR](https://github.com/ACL4SSR) - 提供了局域网分流规则
- [Koolson](https://github.com/Koolson) - 提供了Qure图标资源
- [Orz-3](https://github.com/Orz-3) - 提供了mini图标资源
- [Peng-YM](https://github.com/Peng-YM) - 提供了Sub-Store解析器

## 使用说明

1. 下载或克隆本项目
2. 在Loon代理工具中导入`loon.conf`配置文件
3. 根据个人需求调整节点订阅和策略组设置

## 许可证

本项目仅供个人学习和研究使用，请遵守相关法律法规。
