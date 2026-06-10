import {
  products,
  type MarketId,
  type ProductId,
  type Product,
} from "@insurance-websites/domain";
import { stories, type StoryImage, type StorySection } from "@/content/stories";
import { toZhPath } from "@/i18n/routing";

export const zhLocale = {
  code: "zh-Hans",
  prefix: "/zh",
  label: "中文",
  englishLabel: "English",
} as const;

export type LocalizedProduct = {
  id: ProductId;
  slug: Product["slug"];
  href: `/${string}`;
  zhHref: `/${string}`;
  title: string;
  shortTitle: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  reviewTitle: string;
  reviewBody: string;
  reviewItems: string[];
  quoteTitle: string;
  quoteItems: string[];
  noteTitle: string;
  noteBody: string;
  ctaTitle: string;
  ctaBody: string;
};

export type LocalizedStory = {
  slug: string;
  title: string;
  description: string;
  dateISO: string;
  readingMinutes: number;
  tags: string[];
  image?: StoryImage;
  sections: StorySection[];
};

export const zhCommon = {
  siteName: "Tracy Zhang Insurance",
  languageName: "简体中文",
  quoteLabel: "获取报价",
  callLabel: "致电",
  menuLabel: "菜单",
  closeMenuLabel: "关闭菜单",
  coverageLabel: "保险范围",
  productsLabel: "保险产品",
  guidanceLabel: "保险指南",
  businessLabel: "商业保险",
  officesLabel: "办公室",
  locationLabel: "本地办公室",
  contactLabel: "联系我们",
  readLabel: "阅读",
  readStoryLabel: "阅读文章",
  readNextLabel: "继续阅读",
  minutesRead: "分钟阅读",
  statewideDesk: "加州保险咨询",
  carrierMarkets: "保险市场",
  allstateRelationship: "Allstate",
  phoneText: "电话 / 短信",
  hours: "营业时间",
  languages: "服务语言",
  directions: "地图导航",
  textOffice: "发送短信",
  serviceArea: "服务区域",
  office: "办公室",
  noCoverageBound:
    "提交表格不会绑定、变更、续保或取消任何保险。任何保障都需要承保方批准并以书面确认为准。",
  carrierNotes:
    "我们可以协助查看 Allstate 选项，并在适合时讨论其他市场和加州特殊风险路径。承保公司、产品、资格、核保要求和地区都会影响实际可选方案。",
} as const;

export const zhMarketContent: Record<
  MarketId,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    metaTitle: string;
    metaDescription: string;
    proofPoints: string[];
    serviceAreaBody: string;
    localIntro: string;
  }
> = {
  statewide: {
    eyebrow: "Tracy Zhang Insurance",
    title: "为在加州生活、买房、开车和经营生意的人提供中文保险咨询。",
    subtitle:
      "我们用中文帮助客户理清车险、房屋保险、商业保险、人寿保险、伞险、加州 FAIR Plan 和财产保险问题，并把下一步变得清楚。",
    metaTitle: "Tracy Zhang Insurance | 加州中文保险咨询",
    metaDescription:
      "面向加州华人家庭、房主、车主和企业主的中文保险咨询。办公室位于 San Marino 和 La Palma。",
    proofPoints: ["中文服务", "两个加州本地办公室", "个人和商业保险咨询"],
    serviceAreaBody:
      "我们服务加州客户，并以 San Marino 和 La Palma 办公室为本地联系点。",
    localIntro:
      "如果你更习惯用中文讨论保险，我们可以先帮你把问题说清楚，再决定是报价、保单审查、证明文件还是电话沟通。",
  },
  "san-marino": {
    eyebrow: "San Marino 中文保险服务",
    title: "San Marino 华语家庭和企业的本地保险咨询。",
    subtitle:
      "从 Huntington Drive 办公室出发，协助 San Marino、Pasadena、South Pasadena、San Gabriel、Arcadia 和附近社区处理房屋、车险、伞险、人寿和商业保险问题。",
    metaTitle: "San Marino 中文保险 | Tracy Zhang Insurance",
    metaDescription:
      "San Marino 中文保险咨询，服务家庭、房主、车主和小企业，办公室位于 Huntington Drive。",
    proofPoints: ["Huntington Drive 办公室", "房屋和家庭保险咨询", "商业证书和责任险协助"],
    serviceAreaBody:
      "San Marino 办公室服务附近社区，同时可协助处理全加州保险问题。",
    localIntro:
      "你可以用中文说明房屋、车、家庭或商业上的变化，我们会把需要准备的信息和下一步讲清楚。",
  },
  "la-palma": {
    eyebrow: "La Palma 中文保险服务",
    title: "La Palma 和 Cerritos 附近华语家庭的保险咨询。",
    subtitle:
      "从 Moody Street 办公室协助处理车险、房屋保险、人寿保险、伞险、商业保险和加州财产保险问题。",
    metaTitle: "La Palma 中文保险 | Tracy Zhang Insurance",
    metaDescription:
      "La Palma、Cerritos 和 Orange County 附近中文保险咨询，服务家庭、小企业和房产相关保险问题。",
    proofPoints: ["Moody Street 办公室", "家庭和小企业保险咨询", "中文服务"],
    serviceAreaBody:
      "La Palma 办公室服务 La Palma、Cerritos、Cypress、Buena Park、Artesia 和附近社区。",
    localIntro:
      "如果你在 La Palma 或 Cerritos 附近，需要用中文讨论保险，我们可以帮你把报价、文件和承保问题分清楚。",
  },
  cerritos: {
    eyebrow: "Cerritos 中文保险咨询",
    title: "服务 Cerritos 家庭和小企业的中文保险咨询。",
    subtitle:
      "由附近 La Palma 办公室协助 Cerritos 客户处理车险、房屋保险、租客保险、伞险、商业保险和证书需求。",
    metaTitle: "Cerritos 中文保险咨询 | Tracy Zhang Insurance",
    metaDescription:
      "Cerritos 中文保险咨询，协助家庭、房主、车主和小企业处理保险选择和文件需求。",
    proofPoints: ["附近 La Palma 办公室", "家庭保险审查", "小企业证书协助"],
    serviceAreaBody:
      "Cerritos 客户可从附近 La Palma 办公室开始，获得中文沟通和加州保险协助。",
    localIntro:
      "我们先了解你遇到的实际情况，再决定应该报价、审查保单、处理证明文件，还是安排电话跟进。",
  },
};

const productContent: Record<ProductId, Omit<LocalizedProduct, "id" | "slug" | "href" | "zhHref">> = {
  auto: {
    title: "车险",
    shortTitle: "车险",
    description: "为司机、家庭、多辆车和日常通勤理清责任限额、免赔额和实际保障。",
    metaTitle: "加州车险中文咨询",
    metaDescription:
      "加州车险中文报价和咨询。协助司机、家庭和多车家庭比较责任险、碰撞险、综合险和未保险驾驶人保障。",
    heroTitle: "用中文把车险看懂，再比较价格。",
    heroSubtitle:
      "我们会帮你看清责任限额、免赔额、车辆和司机信息如何影响报价，并说明哪些保障会在事故发生时真正重要。",
    reviewTitle: "我们会重点查看",
    reviewBody:
      "车险不只是找最低价。责任限额、家庭司机、车辆使用方式和加州维修成本都会影响风险。",
    reviewItems: [
      "责任限额是否符合家庭资产和驾驶风险",
      "碰撞险和综合险的免赔额",
      "未保险或保险不足驾驶人保障",
      "租车报销、道路救援和多车折扣",
      "是否适合和房屋、租客或伞险一起审查",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: [
      "所有司机姓名和出生日期",
      "车辆 VIN，或年份、品牌、型号",
      "现有保单和限额（如有）",
      "车辆主要停放地址",
    ],
    noteTitle: "已有保单也可以审查",
    noteBody:
      "如果你有 declarations page，我们可以帮你看出保障强在哪里、哪里可能有缺口。",
    ctaTitle: "开始车险咨询",
    ctaBody: "电话、短信或在线提交信息。我们会用中文说明下一步需要什么。",
  },
  home: {
    title: "房屋保险",
    shortTitle: "房屋",
    description: "协助房主理解重建成本、个人财产、责任险、免赔额和加州市场变化。",
    metaTitle: "加州房屋保险中文咨询",
    metaDescription:
      "加州房屋保险中文报价和咨询。协助房主处理贷款要求、续保变化、重建成本和责任保障问题。",
    heroTitle: "房屋保险要看重建成本，不只是房价。",
    heroSubtitle:
      "我们会帮你把房屋地址、屋顶、居住情况、贷款要求和加州承保市场限制整理清楚。",
    reviewTitle: "房屋保险重点",
    reviewBody:
      "加州房屋保险常常受到地区、房屋状况、承保市场和贷款时间限制影响。",
    reviewItems: [
      "住宅重建成本和 dwelling limit",
      "个人财产、使用损失和个人责任保障",
      "屋顶、年份、居住用途和过去理赔记录",
      "贷款方或 escrow 对保险证明的要求",
      "是否需要 FAIR Plan 或其他特殊路径",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: [
      "房屋地址和居住用途",
      "现有保单或续保通知",
      "贷款方信息（如需要证明文件）",
      "屋顶、面积和房屋更新信息（如有）",
    ],
    noteTitle: "加州市场需要现实判断",
    noteBody:
      "有些房屋需要先确认哪些承保路径真实可行，再比较价格和保障。",
    ctaTitle: "开始房屋保险咨询",
    ctaBody: "把房屋情况和时间要求告诉我们，我们会帮你整理可行选项。",
  },
  condo: {
    title: "公寓保险",
    shortTitle: "公寓",
    description: "协助 condo 业主理解 HO-6、HOA master policy、室内装修和责任保障。",
    metaTitle: "加州公寓保险 HO-6 中文咨询",
    metaDescription:
      "加州 condo / HO-6 公寓保险中文咨询。协助业主把个人保单和 HOA master policy 对接清楚。",
    heroTitle: "把 HO-6 和 HOA master policy 分清楚。",
    heroSubtitle:
      "我们会帮你看 HOA 负责什么、你自己的公寓保险需要负责什么，避免室内装修、个人财产和责任保障出现缺口。",
    reviewTitle: "公寓保险重点",
    reviewBody: "公寓保险的关键是协调 HOA 主保单和业主自己的责任。",
    reviewItems: [
      "个人财产保障",
      "个人责任和医疗支付",
      "Loss assessment 保障",
      "室内升级、装修和 betterments",
      "免赔额和常见除外责任",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["公寓地址", "HOA insurance summary 或 master policy 信息", "贷款方要求", "室内升级或贵重物品情况"],
    noteTitle: "HOA 保单通常不包全部",
    noteBody:
      "很多缺口出现在室内装修、个人物品和 loss assessment。先看文件，再决定限额。",
    ctaTitle: "开始公寓保险咨询",
    ctaBody: "把 HOA 或贷款文件发来，我们会帮你看清楚下一步。",
  },
  renters: {
    title: "租客保险",
    shortTitle: "租客",
    description: "为公寓、租屋和合租情况提供个人财产和责任保障咨询。",
    metaTitle: "加州租客保险中文咨询",
    metaDescription:
      "加州 renters insurance 租客保险中文咨询。协助租客理解个人财产、责任险和房东要求。",
    heroTitle: "租客保险不只是保护东西。",
    heroSubtitle:
      "租客保险常常也保护责任风险。我们会帮你选择适合租屋生活的个人财产和责任限额。",
    reviewTitle: "租客保险可以处理",
    reviewBody:
      "房东的保险通常不保护你的个人物品，也不替你承担个人责任。",
    reviewItems: [
      "电子产品、家具、衣物等个人财产",
      "个人责任保障",
      "因承保事故临时搬离的额外生活费用",
      "贵重物品的额外保障（如适用）",
      "房东或租约要求",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["租屋地址", "大概个人财产金额", "宠物信息（如有）", "房东要求的责任限额"],
    noteTitle: "适合快速开始",
    noteBody: "租客保险通常信息较简单。你可以先发地址和租约要求，我们会说明下一步。",
    ctaTitle: "开始租客保险咨询",
    ctaBody: "电话、短信或在线提交信息，我们会帮你快速确认方向。",
  },
  life: {
    title: "人寿保险",
    shortTitle: "人寿",
    description: "围绕家庭收入、房贷、子女、企业责任和长期规划选择合适的人寿保障。",
    metaTitle: "加州人寿保险中文咨询",
    metaDescription:
      "加州人寿保险中文咨询。协助家庭和个人比较定期寿险、长期保障目标和保额规划。",
    heroTitle: "人寿保险先从要保护谁开始。",
    heroSubtitle:
      "我们会帮你把收入替代、房贷、子女教育、家庭责任和长期目标讲清楚，再讨论保额和年限。",
    reviewTitle: "先确认目的",
    reviewBody:
      "人寿保险不应该复杂化。先确认你想保护的结果，再选择产品类型和保额。",
    reviewItems: [
      "定期寿险用于高影响、较可负担的保障",
      "永久寿险是否适合长期规划",
      "保额如何估算",
      "受益人、保单所有人和后续更新",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["年龄和基本健康背景", "保障目标", "希望保障多久", "预算范围"],
    noteTitle: "保持简单",
    noteBody:
      "如果某个产品不适合，我们会直接说明。目标是清楚，不是增加复杂度。",
    ctaTitle: "讨论人寿保障",
    ctaBody: "用中文说明家庭情况和目标，我们会帮你整理可比较的方向。",
  },
  umbrella: {
    title: "伞险",
    shortTitle: "伞险",
    description: "在车险、房屋保险、船只、出租房或商业风险之上增加责任保障。",
    metaTitle: "加州伞险中文咨询",
    metaDescription:
      "加州 umbrella insurance 伞险中文咨询。协助家庭和企业主审查更高责任限额是否适合。",
    heroTitle: "为不希望发生的大额责任索赔做准备。",
    heroSubtitle:
      "伞险可以在基础车险、房屋保险、出租房、船只或部分商业风险之上提供额外责任保障。",
    reviewTitle: "什么时候值得讨论伞险",
    reviewBody:
      "伞险不只适合特殊情况。家庭司机、房产、储蓄和商业责任都可能让更高限额有意义。",
    reviewItems: [
      "青少年司机或多名家庭司机",
      "自住房、出租房或较高资产暴露",
      "船只、摩托车或休闲车辆",
      "合同或商业活动带来的责任问题",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["现有车险和房屋保险限额", "家庭司机和车辆信息", "房产、出租房或船只情况", "任何商业或合同责任问题"],
    noteTitle: "基础限额很重要",
    noteBody:
      "伞险通常要求基础保单达到一定责任限额，不能只单独看伞险价格。",
    ctaTitle: "审查责任保障",
    ctaBody: "我们会帮你判断现有限额和伞险是否搭配得上。",
  },
  business: {
    title: "商业保险",
    shortTitle: "商业",
    description: "为小企业处理责任险、财产险、商业车险、证书和合同保险要求。",
    metaTitle: "加州商业保险中文咨询",
    metaDescription:
      "加州商业保险中文咨询。协助小企业处理 general liability、财产、商业车险、COI 证书和合同要求。",
    heroTitle: "商业保险要围绕你的实际经营来设计。",
    heroSubtitle:
      "我们协助小企业理解责任、财产、商业车辆、证书和合同要求，尤其适合需要快速处理 COI 的企业。",
    reviewTitle: "常见商业保险需求",
    reviewBody:
      "行业、地点、收入、员工、车辆和合同都会影响商业保险结构。",
    reviewItems: [
      "General liability 一般责任险",
      "商业财产保险",
      "Workers’ compensation 工伤保险",
      "商业车险",
      "Umbrella / excess liability",
      "保险证书 COI",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["公司名称和实体类型", "业务内容说明", "收入和 payroll 估算", "地点、车辆和工作现场信息", "合同或证书要求"],
    noteTitle: "需要证书要先看合同",
    noteBody:
      "COI 本身不会改变保障。合同要求必须和保单实际支持的内容对上。",
    ctaTitle: "开始商业保险咨询",
    ctaBody: "把业务内容和合同要求告诉我们，我们会帮你确认下一步。",
  },
  motorcycle: {
    title: "摩托车保险",
    shortTitle: "摩托车",
    description: "为摩托车骑士审查责任险、车体保障、装备和道路救援选项。",
    metaTitle: "加州摩托车保险中文咨询",
    metaDescription:
      "加州 motorcycle insurance 摩托车保险中文咨询。协助骑士比较责任限额、车体保障和装备保障。",
    heroTitle: "摩托车保险要符合你的骑行方式。",
    heroSubtitle:
      "我们会帮你比较价格和保障，避免理赔时才发现免赔额、限额或配件保障不符合预期。",
    reviewTitle: "我们会查看",
    reviewBody: "摩托车保单细节差异很大，重点是事故发生时哪些保障会影响结果。",
    reviewItems: [
      "责任限额和伤害保障",
      "碰撞险和综合险",
      "未保险或保险不足驾驶人保障",
      "配件和骑行装备保障（如适用）",
      "拖车或道路救援",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["骑士姓名、出生日期和驾照状态", "摩托车 VIN 或年份、品牌、型号", "通勤或休闲用途", "停放地点", "现有保障（如有）"],
    noteTitle: "和车险、房屋保险一起看",
    noteBody:
      "如果你也有车险或房屋保险，我们可以一起审查整体成本和责任风险。",
    ctaTitle: "开始摩托车保险咨询",
    ctaBody: "电话、短信或在线提交信息，我们会尽快说明下一步。",
  },
  atv: {
    title: "ATV 保险",
    shortTitle: "ATV",
    description: "为越野车、拖车、休闲设备和存放地点相关风险提供咨询。",
    metaTitle: "加州 ATV 保险中文咨询",
    metaDescription:
      "加州 ATV / off-road vehicle 保险中文咨询。协助审查责任保障、车体保障、拖车和使用场景。",
    heroTitle: "越野休闲车辆也需要清楚的保障边界。",
    heroSubtitle:
      "我们会根据 ATV 的使用地点、存放方式和驾驶人，帮助你理解责任险和车体保障选项。",
    reviewTitle: "我们会查看",
    reviewBody:
      "越野车辆的风险和普通汽车不同，使用地点和存放方式会影响保障。",
    reviewItems: [
      "对他人受伤或财产损失的责任保障",
      "综合险和碰撞险选项（如适用）",
      "拖车和运输相关问题",
      "私人土地、公园或 trail 使用情况",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["ATV 信息，VIN 如有", "存放地点", "主要驾驶人", "需要协调的现有保单"],
    noteTitle: "不确定也可以先问",
    noteBody:
      "先告诉我们车辆和用途，我们会帮你判断应该走哪条保险路径。",
    ctaTitle: "开始 ATV 保险咨询",
    ctaBody: "电话、短信或在线提交信息，我们会保持流程简单。",
  },
  boat: {
    title: "船只保险",
    shortTitle: "船只",
    description: "为船只、personal watercraft、责任、设备和拖车保障提供咨询。",
    metaTitle: "加州船只保险中文咨询",
    metaDescription:
      "加州 boat and watercraft insurance 船只保险中文咨询。协助比较 hull coverage、责任险、装备和拖车保障。",
    heroTitle: "船只和水上设备保障，用简单方式讲清楚。",
    heroSubtitle:
      "我们会根据船只类型、使用水域、存放地点和驾驶人，帮助你比较责任险和车体保障。",
    reviewTitle: "我们会查看",
    reviewBody:
      "船只保险会因船型、长度、使用方式和存放地点有很大差异。",
    reviewItems: [
      "责任限额和谁会驾驶",
      "Hull coverage、免赔额和理赔方式",
      "个人物品或装备保障（如适用）",
      "拖船和救援选项",
      "存放和使用细节",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["年份、品牌、型号、长度、马力", "存放地点", "用途：休闲、钓鱼或其他", "主要驾驶人信息"],
    noteTitle: "也可能需要伞险",
    noteBody:
      "如果资产或责任暴露较高，我们可以一起审查伞险是否适合。",
    ctaTitle: "开始船只保险咨询",
    ctaBody: "电话、短信或在线提交信息，我们会尽快跟进。",
  },
  "fair-plan": {
    title: "加州 FAIR Plan 咨询",
    shortTitle: "FAIR Plan",
    description: "当标准房屋保险市场受限时，协助了解 FAIR Plan 和其他可行路径。",
    metaTitle: "加州 FAIR Plan 中文咨询",
    metaDescription:
      "加州 FAIR Plan 中文咨询。协助房主在标准房屋保险受限、nonrenewal 或贷款期限压力下理解下一步。",
    heroTitle: "FAIR Plan 不必恐慌，但需要讲清楚。",
    heroSubtitle:
      "当标准市场不可用时，仍然可能有路径。我们会帮你理解 FAIR Plan、specialty market 和 companion coverage 的关系。",
    reviewTitle: "什么时候会遇到",
    reviewBody:
      "加州房产承保会受地点、房屋特征、野火风险和市场变化影响。",
    reviewItems: [
      "新购房但标准市场选择有限",
      "Nonrenewal 或承保可得性问题",
      "较难承保的房屋或特殊房产特征",
      "需要把特殊财产保单和单独责任保障搭配起来",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["房屋地址", "现有或过去保险信息", "建造年份和面积", "屋顶类型和年份（如知道）", "过去理赔记录（如适用）"],
    noteTitle: "FAIR Plan 可能只是方案的一部分",
    noteBody:
      "FAIR Plan 可能不等于完整房屋保险，常常还需要讨论 companion coverage 或其他责任保障。",
    ctaTitle: "讨论 FAIR Plan 路径",
    ctaBody: "把房屋情况和时间要求告诉我们，我们会帮你理清可行步骤。",
  },
  "california-property": {
    title: "加州财产保险",
    shortTitle: "加州财产",
    description: "处理续保涨价、nonrenewal、贷款要求、FAIR Plan 和承保缺口问题。",
    metaTitle: "加州财产保险中文咨询",
    metaDescription:
      "加州 property insurance 中文咨询。协助房主处理续保变化、nonrenewal、FAIR Plan、贷款证明和保障缺口。",
    heroTitle: "当加州房产保险变难时，先找出限制条件。",
    heroSubtitle:
      "我们协助房主查看续保变化、贷款期限、难承保房屋、FAIR Plan 问题和 companion coverage 需求。",
    reviewTitle: "先确认限制",
    reviewBody:
      "加州财产保险经常不是简单比价，而是哪些方案真实可行、贷款要求是什么、缺口在哪里。",
    reviewItems: [
      "续保保费或免赔额变化",
      "承保公司 nonrenewal 或市场可得性有限",
      "Escrow 或贷款证明期限",
      "FAIR Plan 和 companion coverage 问题",
    ],
    quoteTitle: "通常需要准备",
    quoteItems: ["房屋地址和居住用途", "现有保单或续保通知", "Nonrenewal 或承保沟通文件（如有）", "贷款、escrow 或续保期限"],
    noteTitle: "时间很重要",
    noteBody:
      "如果有贷款或 escrow 截止日期，越早开始越容易保留选择。",
    ctaTitle: "开始加州财产保险咨询",
    ctaBody: "把文件和期限告诉我们，我们会帮你判断可行路径。",
  },
};

export const zhProducts: LocalizedProduct[] = products.map((product) => ({
  id: product.id,
  slug: product.slug,
  href: product.href,
  zhHref: toZhPath(product.href),
  ...productContent[product.id],
}));

const zhProductBySlug = new Map(zhProducts.map((product) => [product.slug, product]));

export function getZhProductBySlug(slug: string) {
  return zhProductBySlug.get(slug);
}

export const zhPublicRoutes = [
  "/",
  "/products",
  "/about",
  "/team",
  "/contact",
  "/location",
  "/locations",
  "/locations/san-marino",
  "/locations/la-palma",
  "/locations/cerritos",
  "/privacy",
  "/terms",
  "/sms-terms",
  "/contact-consent",
  "/stories",
  ...products.map((product) => product.href),
  ...stories.map((story) => `/stories/${story.slug}`),
] as `/${string}`[];

const zhStoryContent: Record<
  string,
  {
    title: string;
    description: string;
    readingMinutes: number;
    tags: string[];
    sections: StorySection[];
  }
> = {
  "cheapest-insurance-not-always-best-deal": {
    title: "最便宜的保险，不一定是最好的选择",
    description:
      "为什么最低保费可能隐藏保障取舍，以及如何同时比较价格、保障、承保公司实力和理赔时的价值。",
    readingMinutes: 6,
    tags: ["保障", "价值", "续保"],
    sections: [
      { type: "p", text: "很多客户问我们的第一句话是：我的续保涨价了，能不能找更便宜的？这是合理的问题。保险价格当然重要。" },
      { type: "p", text: "但在比较价格之前，更重要的是先问：生活里发生了什么变化？房屋重建成本、车辆维修成本、家庭司机、责任风险和加州承保市场都可能已经不同。" },
      { type: "h2", text: "保险不是一张便宜的纸" },
      { type: "p", text: "保费是在事故发生前支付的金额。保障是在事故发生后真正依靠的承诺。如果唯一目标是把账单降到最低，就容易忽略承诺是否足够。" },
      {
        type: "ul",
        items: [
          "责任限额是否现实？",
          "免赔额是否承担得起？",
          "理赔时由哪家公司负责？",
          "保障有没有重要除外或缺口？",
          "如果损失比预期大，会发生什么？",
        ],
      },
      { type: "h2", text: "最低价格可能隐藏最大的风险" },
      { type: "p", text: "两份保单表面相似，细节可能完全不同。一份可能责任限额更低，免赔额更高，或少了你以为包含的保障。" },
      { type: "p", text: "便宜不一定不好。折扣、组合、合适的免赔额都可能让价格更好。问题是：价格低的原因必须看清楚。" },
      { type: "h2", text: "真正的问题" },
      { type: "p", text: "下一次看保费时，不要忽略价格，但也不要停在那里。问清楚价格背后的保障、公司、理赔流程和责任限额。" },
      { type: "p", text: "好的保险建议不是让你多花钱，而是让你知道每一块钱正在买什么风险转移。" },
    ],
  },
  "a-calm-way-to-shop-insurance-in-california": {
    title: "在加州买保险，可以用更冷静的方式",
    description:
      "从实际变化开始，而不是只从价格开始：房屋、车辆、家庭、商业和时间要求都会影响保险选择。",
    readingMinutes: 4,
    tags: ["加州", "购买保险", "保障审查"],
    sections: [
      { type: "p", text: "在加州买保险，经常会感觉信息很多、变化很快。更冷静的方法是先说清楚触发事件：续保、新车、新房、贷款要求、证书需求，还是家庭变化。" },
      { type: "p", text: "明确事件之后，再看哪些文件、限额、免赔额、承保市场和时间要求真正影响下一步。" },
      { type: "h2", text: "先问三个问题" },
      { type: "ul", items: ["发生了什么变化？", "如果今天发生损失，最担心哪里？", "有没有贷款、合同或续保截止日期？"] },
      { type: "p", text: "这些问题可以把保险对话从“便宜多少”变成“什么选择适合这个情况”。" },
    ],
  },
  "fair-plan-basics-without-drama": {
    title: "加州 FAIR Plan：先理解，不必恐慌",
    description:
      "FAIR Plan 可能是加州房产保险路径的一部分，但通常需要和其他保障一起看。",
    readingMinutes: 4,
    tags: ["FAIR Plan", "房屋保险", "加州财产"],
    sections: [
      { type: "p", text: "当标准房屋保险市场选择有限时，FAIR Plan 可能成为一个可讨论的路径。它不是恐慌信号，而是需要把信息整理清楚的信号。" },
      { type: "p", text: "FAIR Plan 通常不等于完整的房屋保险方案。房主还需要理解责任保障、个人财产、使用损失和 companion coverage 的关系。" },
      { type: "h2", text: "准备越早，选择越清楚" },
      { type: "ul", items: ["房屋地址和用途", "现有保单或 nonrenewal 通知", "贷款或 escrow 截止日期", "屋顶、年份、面积和更新信息"] },
      { type: "p", text: "如果有贷款期限，尽早开始会更容易确认现实可行的方案。" },
    ],
  },
  "condo-insurance-and-the-master-policy-gap": {
    title: "公寓保险和 HOA master policy 的缺口",
    description:
      "Condo 业主需要知道 HOA 保单负责什么，自己的 HO-6 保单又负责什么。",
    readingMinutes: 4,
    tags: ["公寓保险", "HO-6", "HOA"],
    sections: [
      { type: "p", text: "很多 condo 业主以为 HOA master policy 会覆盖大部分问题。实际上，HOA 保单和个人 HO-6 保单之间常常有责任分界。" },
      { type: "p", text: "室内装修、个人物品、loss assessment 和个人责任，通常需要业主自己的保单来处理。" },
      { type: "h2", text: "先看文件，再定限额" },
      { type: "ul", items: ["HOA insurance summary", "贷款方要求", "室内升级或装修", "个人财产和贵重物品", "Loss assessment 限额"] },
      { type: "p", text: "把 HOA 文件和 HO-6 一起看，才能减少重复、误解和保障缺口。" },
    ],
  },
  "why-we-ask-for-vins": {
    title: "为什么报价时会问 VIN？",
    description:
      "VIN 可以减少猜测，让车辆信息、承保资格和报价路径更准确。",
    readingMinutes: 3,
    tags: ["车险", "VIN", "报价"],
    sections: [
      { type: "p", text: "VIN 不是多余的信息。它帮助确认车辆年份、品牌、型号、配置和一些会影响报价的细节。" },
      { type: "p", text: "只凭“年份、品牌、型号”有时会漏掉 trim、传感器、车身配置或贷款要求。VIN 可以减少来回确认。" },
      { type: "h2", text: "它能加快什么？" },
      { type: "ul", items: ["减少车辆信息错误", "更快确认承保路径", "更准确比较限额和免赔额", "帮助处理贷款方要求"] },
      { type: "p", text: "如果暂时没有 VIN，也可以先开始沟通；但正式报价通常会需要它。" },
    ],
  },
};

function requireZhStoryContent(story: { slug: string }) {
  const localized = zhStoryContent[story.slug];
  if (!localized) {
    throw new Error(
      `Missing Simplified Chinese story content for "${story.slug}". Add it to zhStoryContent before publishing /zh/stories/${story.slug}.`,
    );
  }
  return localized;
}

export const zhStories: LocalizedStory[] = stories.map((story) => {
  const localized = requireZhStoryContent(story);
  return {
    ...localized,
    slug: story.slug,
    dateISO: story.dateISO,
    image: story.image,
  };
});

const zhStoryBySlug = new Map(zhStories.map((story) => [story.slug, story]));

export function getZhStory(slug: string) {
  return zhStoryBySlug.get(slug);
}
