# MicroToken

ERC20 极简代币 + 每人一次免费领取少量 BMT

## 项目信息

- **名称**: MicroToken
- **代币符号**: BMT (BaseMicro)
- **合约地址**: `0xa7e1dbbe043a5a97d2594042a478b4b06dedaf7b`
- **网络**: Base (链ID 8453)
- **app_id**: `69c2035b824ea2cd64ac6736`

## 功能

- 任何用户可免费领取一次少量 BMT 代币（仅需支付 gas）
- 简化 ERC20 实现
- 合约所有者可补充/回收代币

## 线上地址

- **生产地址**: https://microtoken-ten.vercel.app
- **GitHub 仓库**: https://github.com/FredericaWarren/microtoken

## 技术栈

- React + TypeScript
- Vite
- wagmi + viem
- Base 链
- Vercel 部署

## 交易归因

所有成功交易自动发送归因埋点到 https://base-dashboard-zeta.vercel.app/api/track

- app_id: `app-002`
- app_name: `MicroToken`

## Builder Code

- **Builder Code**: `bc_yx4d4e7f`
- **Encoded**: `0x62635f79783464346537660b0080218021802180218021802180218021`

## 开发

```bash
npm install
npm run dev
```

## 部署

推送到 main 分支自动触发 Vercel 部署。
