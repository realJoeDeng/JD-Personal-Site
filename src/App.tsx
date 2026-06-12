import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Mail, ChevronDown, Plane } from 'lucide-react';

const ASSET_BASE = import.meta.env.BASE_URL;

const HERO_IMAGE_PORTRAIT = `${ASSET_BASE}images/site-assets/hero-main-portrait.webp`;
const SHANGHAI_IMAGE_SUIBE_PANORAMA = `${ASSET_BASE}images/site-assets/education-shanghai-bg.webp`;
const SHANGHAI_IMAGE_CITY = `${ASSET_BASE}images/site-assets/education-shanghai-small.webp`;
const GO_IMAGE_BG = `${ASSET_BASE}images/site-assets/life-go-bg.webp`;
const CAT_IMAGE_MCFLURRY = `${ASSET_BASE}images/site-assets/life-cats-mcflurry.webp`;
const CAT_IMAGE_AD = `${ASSET_BASE}images/site-assets/life-cats-ad.webp`;
const CAT_IMAGE_POP = `${ASSET_BASE}images/site-assets/life-cats-pop.webp`;
const DOG_IMAGE_HAMBURGER_BG = `${ASSET_BASE}images/site-assets/life-hamburger-bg.webp`;
const DOG_IMAGE_HAMBURGER_ARGENTINA = `${ASSET_BASE}images/site-assets/life-hamburger-small-1.webp`;
const DOG_IMAGE_HAMBURGER_WOODFRAME = `${ASSET_BASE}images/site-assets/life-hamburger-small-2.webp`;
const EXETER_IMAGE_CAMPUS = `${ASSET_BASE}images/site-assets/education-exeter-bg.webp`;
const EXETER_IMAGE_GRADUATION = `${ASSET_BASE}images/site-assets/education-exeter-graduation.webp`;
const EXETER_IMAGE_BUSINESS = `${ASSET_BASE}images/site-assets/education-exeter-small.webp`;

const ABOUT_IMAGE_INTRO = `${ASSET_BASE}images/site-assets/about-main-intro.webp`;
const ABOUT_IMAGE_BG = `${ASSET_BASE}images/site-assets/about-main-bg.webp`;
const ABOUT_CARD_IMAGE_1 = `${ASSET_BASE}images/site-assets/about-card-01.webp`;
const ABOUT_CARD_IMAGE_2 = `${ASSET_BASE}images/site-assets/about-card-02.webp`;
const ABOUT_CARD_IMAGE_3 = `${ASSET_BASE}images/site-assets/about-card-03.webp`;
const ABOUT_CARD_IMAGE_4 = `${ASSET_BASE}images/site-assets/about-card-04.webp`;
const ABOUT_CARD_IMAGE_5 = `${ASSET_BASE}images/site-assets/about-card-05.webp`;
const ABOUT_CARD_IMAGE_6 = `${ASSET_BASE}images/site-assets/about-card-06.webp`;
const PROJECT_IMAGE_QL = `${ASSET_BASE}images/site-assets/projects-ql-cover.webp`;
const PROJECT_IMAGE_MG = `${ASSET_BASE}images/site-assets/projects-mg-cover.webp`;
const PROJECT_IMAGE_NS = `${ASSET_BASE}images/site-assets/projects-ns-cover.webp`;
const PROJECT_IMAGE_INNO = `${ASSET_BASE}images/site-assets/projects-inno-cover.webp`;
const LIFE_BASKETBALL_SMALL = `${ASSET_BASE}images/site-assets/life-basketball-small.webp`;
const EDUCATION_CHENGDU_BG = `${ASSET_BASE}images/site-assets/education-chengdu-bg.webp`;
const LIFE_BASKETBALL_BG = `${ASSET_BASE}images/site-assets/life-basketball-bg.webp`;
const LIFE_MUSIC_TRAVEL_BG = `${ASSET_BASE}images/site-assets/life-music-travel-bg.webp`;
const LIFE_MUSIC_SMALL = `${ASSET_BASE}images/site-assets/life-music-small.webp`;

const ABOUT_CARD_IMAGES = [ABOUT_CARD_IMAGE_1, ABOUT_CARD_IMAGE_2, ABOUT_CARD_IMAGE_3, ABOUT_CARD_IMAGE_4, ABOUT_CARD_IMAGE_5, ABOUT_CARD_IMAGE_6];


function ImageWithFallback(props) {
  const [didError, setDidError] = useState(false);
  const { src, alt, style, className, ...rest } = props;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-xs tracking-[0.2em] uppercase text-[#2C2C2C]/40">Image</span>
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={() => setDidError(true)} />
  );
}


export default function Component() {
  const [language, setLanguage] = useState<'EN' | 'CN'>('EN');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const content = {
    EN: {
      nav: ['About Me', 'Experience', 'Projects', 'Education', 'Life', 'Contact'],
      hero: {
        name: 'Joe Deng',
        tagline: ['I uncover value, articulate its drivers,', 'and move complex transactions forward.'],
        descriptor: 'Finance Professional · Capital Market · Investment Analysis',
        cta1: 'Explore the work',
        cta2: 'Contact Joe'
      },
      about: {
        title: 'About Me',
        intro: `I work at the intersection of research, valuation, disclosure, and execution. What matters to me is not only understanding a company on paper, but understanding what really drives it — how the business works, where the value comes from, what the market will question, and how that judgment should be translated into materials that people can review, discuss, and use.`,
        subtitle: 'The way I usually work.',
        cards: [
          {
            title: 'Following the thread of a deal',
            body: 'In a live transaction, I pay attention to what keeps the whole process connected: diligence findings, disclosure logic, valuation questions, filing timelines, review comments, and the rhythm of delivery.'
          },
          {
            title: 'Reading an industry, then reading a business',
            body: `I usually start by defining the market and value chain, then move inward: where the company sits, what its real edge is, and whether its growth story is supported by how the industry actually works.`
          },
          {
            title: 'Turning numbers into judgment',
            body: 'Financial statements, comparables, precedent deals, and model outputs matter — but only when they help answer a more important question: what kind of business this is, and what that should mean for value.'
          },
          {
            title: 'Turning analysis into narrative',
            body: 'I am used to turning scattered facts into materials that can be read and used — prospectus sections, investor-facing decks, diligence notes, and responses that need to be clear, coherent, and defensible.'
          },
          {
            title: 'Keeping different parties on the same page',
            body: 'Many transactions move slowly not because people are unwilling, but because everyone is working from a different version of the story. A large part of the job is alignment.'
          },
          {
            title: 'Making the process usable',
            body: 'Good work is not only about conclusions. It is also about version control, source traceability, consistency, timing, and whether the next person can pick up the work and keep moving.'
          }
        ]
      },
      experience: {
        title: `What I’ve Worked On`,
        subtitle: 'Not responsibilities on paper, but live situations where business judgment, valuation logic, materials, and execution discipline had to be tested.',
        cards: [
          {
            title: 'U.S. IPO Execution',
            tagline: 'Turning business facts into disclosure, valuation logic, and SEC-facing responses.',
            tags: 'Disclosure · Valuation · SEC Comments',
            detail: `I worked across multiple U.S. IPO projects, covering business due diligence, industry positioning, prospectus drafting, valuation support, SEC comment responses, and coordination among issuers, counsel, auditors, underwriters, and internal teams.\n\nWhat this trained was not only execution. It was the ability to connect operational business facts with disclosure language, investor-facing logic, and the pace of a live filing process.`,
            connection: 'I am open to exchanging views on U.S. IPO preparation, issuer readiness, disclosure positioning, and SEC-facing materials.'
          },
          {
            title: 'PE Investment & Fund Operations',
            tagline: 'Seeing investment work beyond entry judgment.',
            tags: 'Investment Thesis · Fund Operations · Post-Investment',
            detail: `I was involved in more than 10 private equity investment projects, including completed investments. My work covered sector research, diligence, valuation analysis, investment materials, fund formation and filing, fund operations, post-investment management, and exit-related work.\n\nThis gave me a fuller view of investment work: not only how to form an investment thesis, but also how capital is structured, monitored, managed, and eventually realized.`,
            connection: 'I am also interested in discussing private equity opportunities, sector theses, fund-related workstreams, and post-investment value creation.'
          },
          {
            title: 'Sector Coverage',
            tagline: 'Entering unfamiliar industries and building a working map.',
            tags: 'Semiconductors · AI Infrastructure · Healthcare',
            detail: `My coverage has spanned semiconductors, advanced materials, AI infrastructure, new energy, consumer, and healthcare services. Rather than collecting sector facts, I try to map value chains, identify bottlenecks, understand customer adoption, and locate the drivers of margin, growth, and market recognition.\n\nThis is where I built the habit of learning quickly, asking better questions, and turning sector complexity into investment judgment.`,
            connection: 'I am particularly open to exchanging views on semiconductors, AI infrastructure, advanced materials, healthcare services, and other sectors where industry complexity creates valuation gaps.'
          },
          {
            title: 'M&A & Strategic Transaction Advisory',
            tagline: 'Reading structure, timing, counterparties, and public-market constraints together.',
            tags: 'M&A · Reverse Merger · Strategic Transactions',
            detail: `I supported FA mandates involving public-company strategic acquisitions, reverse mergers, and related transaction opportunities, with work spanning target screening, structure discussion, materials preparation, diligence support, and multi-party coordination.\n\nThese projects trained me to see transactions as alignment problems: business logic, regulatory constraints, market windows, negotiation dynamics, and different parties’ expectations all have to be brought into one workable path.`,
            connection: 'I am also currently supporting several M&A-related opportunities. If you are looking at strategic acquisitions, reverse mergers, or other transaction ideas with a workable path, I would be glad to exchange views.'
          }
        ]
      },
      framework: {
        title: 'From Value Judgment to Transaction Execution',
        intro: 'For me, the most valuable work is not stopping at analysis. It is carrying judgment forward until it becomes something that can be reviewed, discussed, and used.',
        steps: [
          {
            title: 'Read the Business',
            short: 'See how the company really works.',
            body: 'Before value can be discussed, the business has to be understood. I look at how revenue is generated, who the customers are, where costs come from, and whether the growth story is supported by operating reality.'
          },
          {
            title: 'Frame the Value',
            short: 'Test whether the assumptions hold.',
            body: 'Valuation is not just a number. Through DCF, comparable companies, precedent transactions, scenario analysis, and sensitivity testing, I examine whether the assumptions behind a valuation can be explained, defended, and connected back to the business.'
          },
          {
            title: 'Shape the Narrative',
            short: 'Make the logic readable and defensible.',
            body: 'A good transaction material does not simply contain information. It helps senior readers, investors, counsel, and internal teams understand what matters, where the logic sits, and what questions should come next.'
          },
          {
            title: 'Carry It into Execution',
            short: 'Keep judgment useful through the process.',
            body: 'Judgment only becomes useful when it survives the process. Comments, versions, sources, timelines, wording, and coordination often determine whether a piece of work can actually be used.'
          }
        ]
      },
      projects: {
        title: 'Selected Cases',
        subtitle: 'Four case studies where business facts, sector judgment, valuation logic, and execution discipline had to be organized into usable materials.',
        labels: {
          challenge: 'Challenge',
          myWork: 'My Work',
          whatShows: 'What It Shows'
        },
        items: [
          {
            title: 'Project QL',
            tag: 'U.S. IPO Execution · Healthcare Services',
            summary: 'Healthcare services is not an easy business to explain in a few lines.',
            challenge: 'Healthcare services is not an easy business to explain in a few lines. The real challenge was to organize operating details, patient sources, service models, compliance requirements, and growth logic into disclosure language that could be reviewed by the SEC, understood by investors, and used by transaction parties.',
            myWork: `On this project, I led the execution-side workstream for the U.S. IPO process, mainly covering business due diligence, industry benchmarking, drafting the commercial and market sections of the F-1 prospectus, comparable company and transaction analysis, and SEC-facing disclosure preparation.\n\nI also coordinated with external counsel, auditors, underwriters, and internal teams across different versions, comments, and filing timelines to keep the materials moving forward.`,
            whatShows: 'This project helped me understand the core of IPO execution more clearly: it is not about moving information into a prospectus, but about turning operating facts into business logic that can support disclosure, valuation, and investor understanding.'
          },
          {
            title: 'Project MG',
            tag: 'U.S. IPO Execution · Smart Energy / Utilities Tech',
            summary: 'A smart-energy company needs its commercial loop to be explained clearly.',
            challenge: 'For a smart-energy company, the surface story may be technology and use cases, but what really needs to be explained is the commercial loop: why customers buy, how revenue is generated, whether unit economics work, and whether growth can be understood by the market.',
            myWork: `I was responsible for commercial due diligence and industry benchmarking, mapping the company’s business model, unit economics, growth drivers, and comparable-company valuation, while helping build the business narrative and valuation framework for the F-1 prospectus.\n\nThroughout the process, I worked with counsel, auditors, and underwriters to align disclosure language and investor-facing messaging, so that the materials could meet filing requirements while explaining the company’s business logic more clearly.`,
            whatShows: 'This project made me realize more clearly that valuation and narrative are not separate. Whether a number can be accepted often depends on whether the business behind it has been properly explained.'
          },
          {
            title: 'Project NS',
            tag: 'Private Equity Investment · Semiconductor Materials',
            summary: 'SiC substrate required judgment beyond market size and sector heat.',
            challenge: 'SiC substrate is not a sector that can be judged by market size alone. The investment logic was that EVs, power electronics, and high-voltage fast charging would drive demand for SiC power devices, while substrate supply could be more constrained by slow crystal growth, yield ramp-up, and long customer qualification cycles. Compared with downstream MOSFET / IGBT device segments, substrate was more likely to become the bottleneck, and therefore better reflected the barrier and upstream positioning value of the SiC value chain.',
            myWork: `I participated in this RMB70+ million Pre-IPO investment project and conducted research across the third-generation semiconductor value chain, with a focus on EVs, power electronics, and high-voltage fast-charging applications.\n\nI did value-chain research, financial model, and peer benchmarking, turning the findings into materials that could be discussed by the investment committee and later used for post-investment tracking.`,
            whatShows: 'This project trained my ability to enter a complex industrial sector: first understand the value chain, then identify the variables that truly matter to investment judgment, rather than stopping at a broad story about a hot sector and large market potential.'
          },
          {
            title: 'Project Inno',
            tag: 'Private Equity Review · Storage Chips',
            summary: 'The key was to connect technology, customers, market timing, and valuation assumptions.',
            challenge: 'For a fabless chip design company, the investment question cannot stop at the product concept. At the time, AI was approaching an inflection point, and storage controllers and high-speed data interfaces were positioned to benefit from the growth of data-center workloads, higher data throughput, and next-generation storage demand.',
            myWork: `The project company was a chip design company focused on next-generation storage controllers and high-speed data interfaces.\n\nMy work included technical benchmarking, competitive mapping, customer due diligence, and scenario-based modeling, which were then turned into analytical materials for partner-level review.`,
            whatShows: 'This project reflects my ability to look at technology questions, customer feedback, market timing, and valuation assumptions together. To me, good investment research is not about stacking up industry materials, but about compressing complex information into a judgment that can be discussed, challenged, and carried forward.'
          }
        ]
      },
      education: {
        title: 'Education',
        coverTitle: 'From Chengdu to Exeter',
        coverSubtitle: 'Education',
        chengdu: {
          title: 'From early intuition to structured training.',
          body: 'My interest in finance and business did not begin only in a university classroom. My grandmother was an accountant, and some of my earliest impressions of numbers, records, order, and how businesses work came quietly from everyday life.\n\nLater, formal training in finance gave these early impressions a more structured framework: accounting, financial statement analysis, financial modeling, portfolio management, corporate finance, and investment analysis. It helped me understand companies in a more systematic way, and made me realize earlier that capital, business, and markets are not separate worlds.'
        },
        shanghai: {
          school: 'Shanghai University of International Business and Economics',
          degree: 'Bachelor of Finance & Bachelor of Business Administration',
          location: 'Shanghai, China',
          details: 'At Shanghai University of International Business and Economics, I completed a dual-degree education in Finance and Business Administration.\n\nThis period was the starting point of how I began to understand the business world: learning financial statements, corporate finance, investment analysis, and capital markets on one side; and learning how companies organize, operate, compete, and grow on the other.\n\nIt was also where I started to realize that finance is not only about numbers. The most interesting part is seeing how a business actually works through the numbers.'
        },
        exeter: {
          school: 'University of Exeter',
          degree: 'MSc Finance and Investment',
          location: 'Exeter, United Kingdom',
          grade: 'Merit',
          details: 'Studying Finance and Investment at the University of Exeter was an experience that pushed my perspective further outward.\n\nHere, finance was no longer only a set of classroom concepts, but something connected with real companies, real industries, and real markets. For my dissertation, I chose a practice-based valuation project: starting from the business, industry context, financial performance, and market pricing of a real company, and trying to form a complete value judgment.\n\nThis experience helped me understand more clearly that valuation is not an answer produced by a model, but a way of expressing judgment after thinking about industry, company, and capital markets together.'
        }
      },
      life: {
        title: 'Life',
        subtitle: 'Beyond the model.',
        cats: 'I have three cats, each weaving tales of distinct temperament and threads of senseless bliss.',
        catProfiles: [
          {
            name: 'McFlurry',
            body: 'McFlurry, also lovingly called Mike, is the fourth cat in the family. In the summer of 2023, we found him injured in our neighborhood. He spent a month in the hospital, slowly recovered, and was later brought to Shanghai.\n\nLater, due to osteolysis, Mike was hospitalized two more times and underwent a major surgery, during which two of his toes had to be removed. But there is no need to worry now — he has fully recovered.\n\nMike is a very special little cat. He did not come to us as a sheltered kitten who had always been carefully protected. Instead, he arrived with a bit of his own past, a bit of street wisdom, and a quiet understanding of the world. He knows how to observe, and he knows how to come close. Sometimes he feels like a tiny grown-up; other times, he suddenly reveals the innocence of a kitten again. Mike is a streetwise little cat with a story of his own.'
          },
          {
            name: 'AD',
            body: 'AD, whose English name is simply AD, is the second cat in the family — a very affectionate Ragdoll who loves being close to people. He is innocent, gentle, and kind, with a pair of clear eyes that make the world seem a little less complicated.\n\nHe likes to stay near people, and he trusts people easily. Most of the time, AD does not need to do anything special. By simply sitting quietly beside us, he seems to guard the softest part of the home.'
          },
          {
            name: 'Pop',
            body: 'Pop is a blue golden shaded British Shorthair, and also the eldest in the family. He carries himself like a true big brother: generous, wise, calm, and composed. He is like the “cat professor” at home, quietly observing everyone with a look that seems to understand everything.\n\nBut even the professor has his moments. The second he sees a cat teaser, or anything that moves like prey, he instantly switches into hunting mode. He may be a round little chubby cat, but he is far more agile than he looks.'
          }
        ],
        hoverHint: 'Hover over each portrait',
        dog: 'Meet Hamburger, my dependable Shiba. A sweet soul who never wanders far. She sews up the frayed edges of my world. Her stubbornness is only matched by her gentle wit and the warmth of her heart.',
        go: 'Go has been my passion since I was little. Between the black and white stones, in that silent dialogue of touch, I find an indescribable serenity. Within the confines of the board lies a universe of infinite complexity.',
        sports: 'Basketball and football bring me back to running, contact, and sweat. Sometimes clarity does not come only from stillness — it arrives when the body starts moving again.',
        music: 'My heart beats for melodies, verses, and all that lies beyond. As long as the flame of romance still burns, I will follow it to the far edge of the map.',
        closing: 'In the vastness of the cosmos, I am but a single speck of dust among countless others. Life is fleeting; yet, to walk a while with even a handful of true friends is a grace beyond measure. Should our paths diverge, I remain ever grateful for the miles we shared.'
      },
      contact: {
        title: 'Contact',
        heading: "Let's connect.",
        subtitle: 'If my way of working resonates with what you are building, researching, or trying to execute, feel free to reach out.',
        email: 'realjoedengigo@gmail.com',
        fields: {
          name: 'Name',
          email: 'Email',
          subject: 'Subject',
          message: 'Message',
          submit: 'Send Message'
        },
        note: 'Please do not include confidential or sensitive information in this form.'
      }
    },
    CN: {
      nav: ['关于我', '经历', '项目', '教育', '生活', '联系'],
      hero: {
        name: '邓京胤',
        tagline: ['我发现价值、理解价值、讲清价值驱动，', '也推动复杂交易继续向前。'],
        descriptor: '金融从业者 · 资本市场 · 投资分析',
        cta1: '探索工作内容',
        cta2: '联系 Joe'
      },
      about: {
        title: '关于我',
        intro: '我的工作主要是对行业和公司的研究、估值、披露及执行。对我来说，重要的不只是把一家公司看懂在纸面上，而是弄清楚它真正靠什么运转：业务逻辑在哪里，价值从哪里来，市场会质疑什么，以及这些判断最后该怎样被整理成可以被审阅、被讨论、被使用的材料。',
        subtitle: '实践之道 一贯如此',
        cards: [
          {
            title: '顺着一笔交易的主线往下看',
            body: '一笔真实的交易里，我会持续盯住那些把全流程串起来的东西：尽调发现、披露逻辑、估值问题、申报节奏、反馈轮次，以及每个交付节点之间的关系。'
          },
          {
            title: '先读行业，再读公司',
            body: '我习惯先把市场和产业链看清楚，再回到公司本身：它处在什么位置，真正的竞争力是什么，它的增长叙事是不是建立在行业现实之上。'
          },
          {
            title: '把数字变成判断',
            body: '财务报表、可比公司、可比交易和模型输出当然重要，但它们真正的意义，在于帮助回答更关键的问题：这到底是一家什么样的公司，它应该怎样被理解和定价。'
          },
          {
            title: '把分析整理成可用的叙事',
            body: '我习惯把分散的信息整理成可以被阅读、被讨论、也能直接拿去使用的材料——无论是招股书章节、投资人材料、尽调摘要，还是回复口径，都要清楚、连贯、站得住。'
          },
          {
            title: '让不同角色站在同一页上',
            body: '很多项目推进缓慢，并不是因为谁不愿意做，而是因为每个人理解的版本都不一样。很多时候，真正重要的是把各方拉回到同一个口径和同一套逻辑上。'
          },
          {
            title: '让流程本身也可靠',
            body: '好的工作不只是结论本身，还包括版本管理、来源追踪、一致性检查、时间节奏，以及这份工作能不能被下一个人顺利接住、继续往下做。'
          }
        ]
      },
      experience: {
        title: '不是纸上谈兵。',
        subtitle: '这些经历不是简历上的分类，而是真实交易、投资判断、行业研究和材料交付中，反复被审阅、追问、修改和使用的工作。',
        cards: [
          {
            title: '美股 IPO 执行',
            tagline: '把商业事实，转化为披露、估值逻辑和 SEC 问答。',
            tags: '披露 · 估值 · SEC 问询',
            detail: `在多个美股 IPO 项目中，我参与并承担了核心执行工作，内容包括商业尽调、行业定位、招股书撰写、估值支持、SEC 问询回复，以及发行人、律师、审计师、承销商和内部团队之间的协调。\n\n这段经历训练的不只是执行能力，而是如何在真实申报压力下，把分散的公司信息整理成可以被审阅的披露语言、可以被讨论的估值逻辑，以及投资人能够理解的商业叙事。`,
            connection: '也欢迎就美股上市准备、发行人 readiness、披露口径和 SEC-facing materials 交流。'
          },
          {
            title: '股权投资与基金运营',
            tagline: '从投资判断，看到资本运作的完整周期。',
            tags: '投资判断 · 基金运营 · 投后管理',
            detail: `我参与过 10 个以上股权投资项目，其中包括已完成投资，工作覆盖行业研究、尽调、估值分析、投资材料、基金设立与备案、基金运营、投后管理和退出相关工作。\n\n这让我看到，投资不只是形成一个进入判断，也包括资本如何被组织、被管理、被跟踪，以及最终如何实现退出。它训练的是从判断到管理、再到结果兑现的完整视角。`,
            connection: '也欢迎就股权投资机会、行业 thesis、基金相关工作和投后价值提升交流。'
          },
          {
            title: '行业覆盖',
            tagline: '在复杂行业中建立判断框架，并识别关键变量。',
            tags: '半导体 · AI 基础设施 · 医疗服务',
            detail: `我的研究覆盖过半导体、先进材料、AI 基础设施、新能源、消费和医疗服务等领域。相比于堆积行业信息，我更关注产业链位置、关键瓶颈、客户验证、利润来源、增长驱动和市场认知差。\n\n这部分经历训练的是快速学习能力，也是面对复杂行业时提出更好问题、识别关键变量，并把行业复杂性转化为投资判断的能力。`,
            connection: '也欢迎就半导体、AI 基础设施、先进材料、医疗服务，以及其他因行业复杂度而产生认知差和估值差的领域交流。'
          },
          {
            title: '并购与战略交易顾问',
            tagline: '把结构、时间、交易对手和市场约束放在一起看。',
            tags: '并购 · 反向并购 · 战略交易',
            detail: `我支持过涉及上市公司战略收购、反向并购及相关交易机会的 FA 项目，工作包括标的筛选、结构讨论、材料准备、尽调支持和多方协调。\n\n这些项目让我更清楚地看到，一笔交易本质上也是一个协调问题：商业逻辑、监管约束、市场窗口、谈判动态和各方预期，都需要被放到同一条可执行的路径里。`,
            connection: '我目前也在推进若干并购相关项目。如果你正在看战略收购、反向并购，或其他具备可执行路径的交易机会，也欢迎交流。'
          }
        ]
      },
      framework: {
        title: '从价值判断，到交易落地。',
        intro: '对我来说，真正有价值的工作，不是停在分析本身，而是把判断继续往前带，直到它变成可以被审阅、被讨论、也可以被使用的东西。',
        steps: [
          {
            title: '看懂生意',
            short: '看清公司真正如何运转。',
            body: '讨论价值之前，必须先看懂生意。我会关注收入如何产生、客户是谁、成本从哪里来，以及增长故事是否真的建立在运营现实之上。'
          },
          {
            title: '判断价值',
            short: '检验假设是否站得住。',
            body: '估值不只是给出一个数字。我会结合 DCF、可比公司、可比交易、情景分析和敏感性测试，判断估值背后的假设是否能够被解释、被质疑，也能重新回到公司的商业现实。'
          },
          {
            title: '组织叙事',
            short: '让逻辑可读，也站得住。',
            body: '好的交易材料不是信息堆砌，而是帮助资深读者、投资人、律师和内部团队更快看清重点、理解逻辑，并知道下一步应该继续追问什么。'
          },
          {
            title: '接到执行',
            short: '让判断在流程中继续有用。',
            body: '判断只有进入流程，才真正变得有用。comments、版本、来源、时间表、措辞和多方协调，往往决定一份工作最后能不能被继续使用。'
          }
        ]
      },
      projects: {
        title: '精选案例',
        subtitle: '四个真实案例，呈现我如何把商业事实、行业判断、估值逻辑和执行纪律整理成可以被审阅、被讨论、被继续推进的材料。',
        labels: {
          challenge: '项目难点',
          myWork: '我的工作',
          whatShows: '这说明什么'
        },
        items: [
          {
            title: 'QL项目',
            tag: '美股 IPO 执行 · 医疗服务',
            summary: '医疗服务不是一个靠几句话就能讲清楚的行业。',
            challenge: '医疗服务不是一个靠几句话就能讲清楚的行业。真正难的是把一家公司的运营细节、患者来源、服务模式、合规要求和增长逻辑，整理成 SEC 能审、投资人能读、各方中介也能继续推进的披露语言。',
            myWork: `这个项目里，我主导了美股 IPO 承做端的工作，主要负责商业尽调、行业对标、F-1 招股书商业及市场章节撰写、可比公司与可比交易分析，以及面向 SEC 的披露材料准备。\n\n同时，我也持续协调外部律师、审计师、承销商和内部团队，在不同版本、不同反馈和不同时间节点之间，确保材料能够继续往前走。`,
            whatShows: '做这个项目让我更清楚地理解了 IPO 执行工作的核心：不是把信息搬进招股书，而是把运营层面的事实，整理成能够支撑披露、估值和投资人理解的商业逻辑。'
          },
          {
            title: 'MG项目',
            tag: '美股 IPO 执行 · 智慧能源 / 公用事业科技',
            summary: '智慧能源公司真正要讲清楚的是商业闭环。',
            challenge: '智慧能源这类公司，表面上看是技术和场景，真正要讲清楚的是它的商业闭环：客户为什么买、收入怎么形成、单位经济性是否成立、增长能不能被市场理解。',
            myWork: `我负责商业尽调和行业对标，梳理公司的业务模式、unit economics、增长驱动和可比公司估值，并参与搭建 F-1 招股书里的商业叙事和估值框架。\n\n在这个过程中，我也和律师、审计师、承销商一起反复对齐披露口径和投资人表达，让材料既符合申报要求，也能更清楚地解释公司的商业逻辑。`,
            whatShows: '这个项目让我更清楚地意识到，估值和叙事不是分开的。一个数字能不能被接受，往往取决于它背后的生意是否被讲清楚。'
          },
          {
            title: 'NS项目',
            tag: '股权投资 · 半导体材料',
            summary: 'SiC 衬底不是一个只看市场空间就能判断的赛道。',
            challenge: 'SiC 衬底不是一个只看市场空间就能判断的赛道。当时的投资逻辑在于：EV、功率电子和高压快充带动 SiC 功率器件需求增长，但衬底端长晶慢、良率爬坡难、客户验证周期长，供给释放更容易受限。相比下游 MOSFET / IGBT 等器件环节，衬底更容易成为产业链瓶颈，也更能体现上游材料端的壁垒和卡位价值。',
            myWork: `我参与了这个7,000 万人民币的 Pre-IPO 投资项目，围绕第三代半导体产业链做研究，重点关注 EV、功率电子和高压快充等应用场景。\n\n我负责产业链研究、财务模型和同业对标，并把这些信息整理成投资委员会可以讨论的材料，也用于后续投后跟踪。`,
            whatShows: '这个项目训练的是我进入复杂工业领域的能力：先把产业链看清楚，再找出真正影响投资判断的变量，而不是停留在赛道很热、空间很大的表层判断。'
          },
          {
            title: 'Inno项目',
            tag: '股权投资研究 · 存储芯片',
            summary: 'Fabless 芯片公司的判断，不能只看产品概念。',
            challenge: 'Fabless 芯片公司的判断，不能只看产品概念。当时 AI 正处在爆发边缘，数据中心工作负载、数据吞吐量和下一代存储需求都有望快速提升，存储控制器和高速数据接口也因此具备受益逻辑。',
            myWork: `该项目公司是一家专注于下一代存储控制器和高速数据接口的芯片设计公司。\n\n我的工作包括技术对标、竞争格局梳理、客户尽调和情景模型分析，形成给 partner-level review 使用的分析材料。`,
            whatShows: '这个项目体现的是我把技术问题、客户反馈、产业时点和估值假设放在一起看的能力。对我来说，好的投资研究不是把行业资料堆起来，而是能把复杂信息压缩成一个可以被讨论、被质疑、也能继续推进的判断。'
          }
        ]
      },
      education: {
        title: '教育经历',
        coverTitle: '从成都到埃克塞特',
        coverSubtitle: 'Education',
        chengdu: {
          title: '从耳濡目染，到系统训练。',
          body: '我对财务和商业的兴趣，并不是从大学课堂才开始的。小时候，外婆是一名会计，很多关于数字、账目、秩序和经营的概念，都是在日常生活里慢慢进入我视野的。\n\n后来，金融学习给了这些早期感受更系统的框架：会计、财务报表分析、金融建模、投资组合管理、公司金融与投资分析。它让我开始用更结构化的方式理解公司，也让我更早意识到资本、企业和市场之间并不是彼此割裂的。'
        },
        shanghai: {
          school: '上海对外经贸大学',
          degree: '金融学学士 & 工商管理学士',
          location: '中国上海',
          details: '在上海对外经贸大学，我完成了金融学与工商管理的双学位。\n\n这段时间更像是我理解商业世界的起点：一边学习报表、公司金融、投资分析和资本市场；另一边也去理解企业如何组织、经营、竞争和成长。\n\n也正是在这里，我开始意识到，金融并不是只看数字。真正有意思的地方，是透过数字，去看见一家企业真实运转的方式。'
        },
        exeter: {
          school: '埃克塞特大学',
          degree: '金融与投资硕士',
          location: '英国埃克塞特',
          grade: 'Merit',
          details: '去埃克塞特读金融与投资，是一次把视野推远的经历。\n\n在这里，金融不再只是课堂里的概念，而开始和真实公司、真实行业、真实市场连接起来。我的毕业项目选择了实践型估值研究：从一家真实公司的业务、行业环境、财务表现和市场定价出发，尝试形成一套完整的价值判断。\n\n这段经历让我更清楚地理解，估值不是模型里算出来的一个答案，而是把产业、公司和资本市场放在一起思考之后，形成的一种表达。'
        }
      },
      life: {
        title: '生活',
        subtitle: '模型和材料之外。',
        cats: '我有三只猫，是三种性格，也是三种不讲道理的快乐。',
        catProfiles: [
          {
            name: '麦旋风',
            body: '麦旋风，也可以叫小麦，是家里的老四。2023年夏天，我们在小区里发现了受伤的它。那之后，它住了一个月院，慢慢好转，又被接到了上海。\n\n后来，因为骨溶解，小麦又住过两次院，还做了一次大手术，截掉了两根趾头。不过不用担心，它现在已经完全康复了。\n\n小麦很特别。它不是那种一眼就被保护得很好的小猫，而是带着一点自己的江湖经历来到家里的。它懂得观察，也懂得靠近；有时候像个小大人，有时候又突然露出小猫的天真。小麦是一只懂人情世故的江湖小猫。'
          },
          {
            name: 'AD钙',
            body: 'AD钙，是家里的老二，一只很粘人的布偶猫。它单纯、善良，眼神里总是带着一种清澈，好像世界在它眼里永远没有那么复杂。\n\n它喜欢靠近人，也很相信人。很多时候，AD不需要做什么，只是安静地待在旁边，像是把家里最柔软的部分守住了。'
          },
          {
            name: '耙耙菜',
            body: '耙耙菜，是一只英短蓝金渐层，也是家里的老大。它很有大哥风范：大度、智慧、淡定从容，像家里的“猫教授”，总是用一种看透世事的眼神观察大家。\n\n但教授也有破功的时候——一看到逗猫棒，或者任何会动的“猎物”，它就会立刻进入狩猎模式。明明是个圆润的小胖子，却灵活得让人意外。'
          }
        ],
        hoverHint: '鼠标移到照片上',
        dog: '我也有一只可爱甜美、性格稳定、绝对不会撒手没的柴犬，她叫汉堡。她总是给我的生活缝缝补补，虽然很犟，但是真的很暖很聪明。',
        go: '我喜欢围棋。在黑白之间、手谈之中，我能找到一种很难言说的平静。方寸纹枰蕴含的却是经纬万端的世界。',
        sports: '篮球和足球让我重新回到奔跑、对抗和汗水里。很多时候，清醒不只来自安静，也来自身体重新动起来的瞬间。',
        music: '我喜欢音乐、喜欢诗和远方。既然浪漫不死，那就寻到世界尽头。',
        closing: '宇宙之大，我只是万千尘埃中的一粒；吾生须臾，若能得三五好友同行，已是幸甚。人生很长，哪怕只能同行一段路，也已是不胜感激。'
      },
      contact: {
        title: '联系',
        heading: '保持联系。',
        subtitle: '如果我的经历、工作方式或判断方式，与你正在推进、研究或尝试完成的事情有关，欢迎与我联系。',
        email: 'realjoedengigo@gmail.com',
        fields: {
          name: '姓名',
          email: '邮箱',
          subject: '主题',
          message: '留言',
          submit: '发送'
        },
        note: '请勿在留言中填写机密或敏感信息。'
      }
    }
  };

  const t = content[language];

  // Scroll to section handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const container = scrollContainerRef.current;
    if (element && container) {
      const offsetTop = element.offsetTop;
      container.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <div ref={scrollContainerRef} data-scroll-container className="h-screen overflow-y-auto bg-[#F8F6F3] text-[#2C2C2C]" style={{ scrollBehavior: 'smooth' }}>
      {/* Navigation */}
      <nav className="sticky top-0 left-0 right-0 z-50 bg-[#F8F6F3]/80 backdrop-blur-md border-b border-[#2C2C2C]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="hover:opacity-70 transition-opacity">
              <span className="text-sm tracking-wider">JOE DENG</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {t.nav.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(['about', 'experience', 'projects', 'education', 'life', 'contact'][index])}
                className="text-sm hover:text-[#5B7C99] transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLanguage('CN')}
              className={`px-3 py-1 text-sm transition-all ${language === 'CN' ? 'text-[#2C2C2C]' : 'text-[#2C2C2C]/40'}`}
            >
              中
            </button>
            <span className="text-[#2C2C2C]/40">/</span>
            <button
              onClick={() => setLanguage('EN')}
              className={`px-3 py-1 text-sm transition-all ${language === 'EN' ? 'text-[#2C2C2C]' : 'text-[#2C2C2C]/40'}`}
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection content={t.hero} scrollContainer={scrollContainerRef} />

      {/* About Section */}
      <AboutSection content={t.about} />

      {/* Experience Section */}
      <ExperienceSection content={t.experience} />

      {/* Framework Section */}
      <FrameworkSection content={t.framework} />

      {/* Projects Section */}
      <ProjectsSection content={t.projects} />

      {/* Education Section */}
      <EducationSection content={t.education} scrollContainer={scrollContainerRef} />

      {/* Life Section */}
      <LifeSection content={t.life} scrollContainer={scrollContainerRef} />

      {/* Contact Section */}
      <ContactSection content={t.contact} />
    </div>
  );
}

// Hero Section Component
function HeroSection({ content, scrollContainer }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollContainer, target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const container = document.querySelector('[data-scroll-container]');
      if (container) {
        const offsetTop = element.offsetTop;
        container.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="hero" ref={ref} className="relative h-screen overflow-hidden bg-[#121a25]">
      {/* Magazine-style portrait background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111824] via-[#1a2332] to-[#2b3542]" />

      {/* Desktop portrait: integrated into the background, not a separate card. */}
      <div className="hidden md:block absolute inset-y-0 right-0 w-[60%] overflow-hidden">
        <ImageWithFallback
          src={HERO_IMAGE_PORTRAIT}
          alt="Joe Deng"
          className="w-full h-full object-cover"
          style={{ objectPosition: '68% 42%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121a25] via-[#121a25]/72 to-[#121a25]/8" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121a25]/22 via-transparent to-[#121a25]/92" />
        <div className="absolute inset-0 bg-[#121a25]/10" />
      </div>

      {/* Mobile portrait atmosphere */}
      <div className="md:hidden absolute inset-0 overflow-hidden">
        <ImageWithFallback
          src={HERO_IMAGE_PORTRAIT}
          alt="Joe Deng"
          className="w-full h-full object-cover"
          style={{ objectPosition: '58% 25%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#121a25]/34 via-[#121a25]/72 to-[#121a25]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121a25]/76 via-[#121a25]/44 to-transparent" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 72% 34%, rgba(132,153,174,0.18) 0%, rgba(18,26,37,0) 38%), radial-gradient(circle at 16% 78%, rgba(91,124,153,0.18) 0%, rgba(18,26,37,0) 34%)'
        }}
      />

      {/* Desktop Layout */}
      <div className="hidden md:flex absolute inset-0 items-center">
        <motion.div 
          style={{ y, opacity }} 
          className="relative z-10 w-full max-w-7xl mx-auto px-12"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 text-xs tracking-[0.32em] uppercase text-white/38">Joe Deng</div>
              <h1 className="text-6xl lg:text-7xl mb-10 text-white tracking-tight leading-[1.04]">
                {content.name}
              </h1>

              <div className="space-y-2 mb-8">
                {content.tagline.map((line, i) => (
                  <p key={i} className="text-xl lg:text-2xl text-white/84 leading-relaxed">
                    {line}
                  </p>
                ))}
              </div>

              <p className="text-sm text-white/48 tracking-widest uppercase mb-10">
                {content.descriptor}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-4 bg-white text-[#1a2332] hover:bg-white/90 transition-all duration-300 tracking-wide"
                >
                  {content.cta1}
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 transition-all duration-300 tracking-wide"
                >
                  {content.cta2}
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden absolute inset-0 flex items-end px-6 pb-24">
        <motion.div style={{ opacity, y }} className="relative z-10 text-left w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="mb-4 text-[10px] tracking-[0.28em] uppercase text-white/42">Joe Deng</div>
            <h1 className="text-4xl mb-6 text-white tracking-tight leading-tight">
              {content.name}
            </h1>
            <div className="space-y-2 mb-6">
              {content.tagline.map((line, i) => (
                <p key={i} className="text-lg text-white/85 leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
            <p className="text-xs text-white/50 tracking-widest uppercase mb-8">
              {content.descriptor}
            </p>
            <div className="flex flex-col gap-3 max-w-xs">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 bg-white text-[#1a2332] hover:bg-white/90 transition-all duration-300 text-sm tracking-wide"
              >
                {content.cta1}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 border border-white/30 text-white hover:bg-white/10 transition-all duration-300 text-sm tracking-wide"
              >
                {content.cta2}
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
      >
        <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
      </motion.div>
    </section>
  );
}

// About Section Component
function AboutSection({ content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-15%' });

  return (
    <section id="about" ref={ref} className="relative bg-[#F8F6F3] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <ImageWithFallback src={ABOUT_IMAGE_BG} alt="About section background" className="w-full h-full object-cover opacity-[0.14]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.55),transparent_45%),linear-gradient(to_bottom,rgba(248,246,243,0.88),rgba(248,246,243,0.96)_35%,rgba(248,246,243,1))]" />
      </div>

      {/* Page 1: About Me */}
      <div className="relative min-h-screen py-32 px-6 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl mb-10 text-[#1a2332] tracking-tight">{content.title}</h2>
            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-12 md:gap-14 items-center">
              <div>
                <p className="text-lg leading-[1.95] text-[#2C2C2C]/88 max-w-2xl whitespace-pre-line">
                  {content.intro}
                </p>
              </div>

              <div className="relative rounded-[28px] overflow-hidden border border-white/60 shadow-[0_24px_80px_rgba(26,35,50,0.12)] bg-white/55 backdrop-blur-sm min-h-[300px]">
                <ImageWithFallback src={ABOUT_IMAGE_INTRO} alt="Financial analysis workspace" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#101820]/55 via-[#1a2332]/25 to-white/10" />
                <div className="absolute inset-0 border border-white/30 rounded-[28px]" />
                <div className="absolute left-7 bottom-7 right-7">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-white/70 mb-3">Research · Valuation · Execution</div>
                  <div className="max-w-sm text-white text-base md:text-lg leading-relaxed font-light">
                    {content.subtitle}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Page 2: The way I usually work */}
      <div className="relative min-h-screen py-28 px-6 flex items-center border-t border-[#2C2C2C]/10">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.18 }}
          >
            <h3 className="text-3xl md:text-4xl mb-12 text-[#1a2332] tracking-tight">{content.subtitle}</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.cards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.55, delay: 0.24 + index * 0.08 }}
                  className="group relative min-h-[190px] hover:min-h-[320px] rounded-[26px] overflow-hidden border border-[#2C2C2C]/8 bg-white/85 shadow-[0_18px_50px_rgba(26,35,50,0.08)] transition-all duration-500"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <ImageWithFallback
                      src={ABOUT_CARD_IMAGES[index]}
                      alt={card.title}
                      className="w-full h-full object-cover scale-[1.03] transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-[#F8F6F3]/90 to-[#F8F6F3]/96 group-hover:from-[#0F1722]/80 group-hover:via-[#172231]/74 group-hover:to-[#1a2332]/90 transition-all duration-500" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(91,124,153,0.22),transparent_36%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                    <div className="w-11 h-11 mb-6 rounded-xl bg-[#5B7C99]/10 group-hover:bg-white/14 border border-[#5B7C99]/10 group-hover:border-white/10 flex items-center justify-center transition-all duration-500">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#5B7C99] group-hover:bg-white transition-colors duration-500" />
                    </div>

                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#5B7C99]/75 group-hover:text-white/65 transition-colors duration-500 mb-3">
                      0{index + 1}
                    </div>

                    <h4 className="text-[1.34rem] leading-tight text-[#1a2332] group-hover:text-white transition-colors duration-500 max-w-[15ch]">
                      {card.title}
                    </h4>

                    <div className="mt-6 max-h-0 opacity-0 overflow-hidden group-hover:max-h-[260px] group-hover:opacity-100 transition-all duration-500">
                      <p className="text-[0.95rem] leading-7 text-white/88 whitespace-pre-line">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Experience Section Component
function ExperienceSection({ content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="experience" ref={ref} className="min-h-screen py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl mb-6 text-[#1a2332] tracking-tight"
        >
          {content.title}
        </motion.h2>

        {content.subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg leading-relaxed text-[#2C2C2C]/75 mb-16 max-w-4xl"
          >
            {content.subtitle}
          </motion.p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {content.cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => setExpandedIndex(index)}
              onMouseLeave={() => setExpandedIndex(null)}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`group p-8 rounded-xl border border-[#2C2C2C]/10 cursor-pointer transition-all duration-500 ${
                expandedIndex === index
                  ? 'bg-[#1a2332] text-white shadow-2xl'
                  : 'bg-[#F8F6F3] text-[#2C2C2C] shadow-sm hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-1 h-12 bg-gradient-to-b from-[#5B7C99] to-[#8B7355] rounded-full" />
                <div>
                  <h3 className={`text-xl pt-1 transition-colors ${expandedIndex === index ? 'text-white' : 'text-[#1a2332]'}`}>{card.title}</h3>
                  <p className={`text-sm leading-relaxed mt-3 transition-colors ${expandedIndex === index ? 'text-white/78' : 'text-[#2C2C2C]/70'}`}>{card.tagline}</p>
                </div>
              </div>

              <div className="pl-8 flex flex-wrap gap-2 mb-4">
                {card.tags.split(' · ').map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`text-[11px] tracking-[0.16em] px-3 py-1 rounded-full border transition-colors ${
                      expandedIndex === index
                        ? 'border-white/18 bg-white/8 text-white/74'
                        : 'border-[#2C2C2C]/10 bg-white/70 text-[#5B7C99]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <motion.div
                initial={false}
                animate={{
                  height: expandedIndex === index ? 'auto' : 0,
                  opacity: expandedIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden"
              >
                <div className="pl-8 pt-4 border-t border-white/12 space-y-4">
                  <div className="text-sm leading-[1.85] text-white/82 whitespace-pre-line">
                    {card.detail}
                  </div>
                  <div className="pt-4 border-t border-white/12 text-sm leading-[1.8] text-[#D8B878]">
                    {card.connection}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Framework Section Component
function FrameworkSection({ content }) {
  const introRef = useRef(null);
  const pathRef = useRef(null);
  const introInView = useInView(introRef, { once: false, margin: '-18%' });
  const pathInView = useInView(pathRef, { once: false, margin: '-18%' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const positions = [
    { left: '15%', top: '70%' },
    { left: '36%', top: '42%' },
    { left: '62%', top: '56%' },
    { left: '84%', top: '28%' }
  ];

  const pathD = 'M15 70 C 25 60, 27 47, 36 42 S 52 57, 62 56 S 76 38, 84 28';
  const activePathD = activeIndex === null
    ? pathD
    : activeIndex === 0
      ? 'M15 70'
      : activeIndex === 1
        ? 'M15 70 C 25 60, 27 47, 36 42'
        : activeIndex === 2
          ? 'M15 70 C 25 60, 27 47, 36 42 S 52 57, 62 56'
          : pathD;

  return (
    <>
      {/* Page 1: editorial title page. It sets the tone before the actual path appears. */}
      <section id="framework" ref={introRef} className="relative min-h-screen px-6 overflow-hidden bg-[#0F1722] text-white flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <ImageWithFallback
            src={GO_IMAGE_BG}
            alt="Go board background"
            className="w-full h-full object-cover opacity-[0.22] scale-105"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F1722]/94 via-[#101820]/88 to-[#0F1722]/96" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_26%,rgba(216,184,120,0.24),transparent_34%),radial-gradient(circle_at_78%_68%,rgba(91,124,153,0.18),transparent_36%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full py-28">
          <motion.div
            initial={{ opacity: 0, y: 38 }}
            animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
            transition={{ duration: 0.85 }}
            className="max-w-4xl"
          >
            <div className="text-[11px] uppercase tracking-[0.34em] text-[#D8B878]/78 mb-8">Judgment Path</div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight mb-10 max-w-5xl">
              {content.title}
            </h2>
            <p className="text-xl md:text-2xl leading-[1.75] text-white/72 max-w-3xl">
              {content.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Page 2: Go-stone path. The previous title becomes a darker background layer. */}
      <section ref={pathRef} className="relative min-h-screen py-24 px-6 overflow-hidden bg-[#0A111A] text-white">
        <div className="absolute inset-0 pointer-events-none">
          <ImageWithFallback
            src={GO_IMAGE_BG}
            alt="Go board background"
            className="w-full h-full object-cover opacity-[0.14] scale-105"
            style={{ objectPosition: 'center center' }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A111A]/98 via-[#0F1722]/94 to-[#0A111A]/98" />
          <div className="absolute left-[-2vw] top-[10vh] max-w-[52vw] opacity-[0.055] select-none">
            <div className="text-[7vw] leading-[0.95] tracking-tight font-light text-white">
              {content.title}
            </div>
          </div>
          <div className="absolute left-[5vw] bottom-[10vh] max-w-[34rem] opacity-[0.08] select-none text-white text-xl leading-[1.7]">
            {content.intro}
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_42%,rgba(216,184,120,0.18),transparent_30%),radial-gradient(circle_at_32%_72%,rgba(91,124,153,0.14),transparent_34%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full min-h-[calc(100vh-14rem)] flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={pathInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.75 }}
            className="mb-8 md:mb-10"
          >
            <div className="text-sm md:text-base uppercase tracking-[0.42em] text-[#D8B878]/82">
              From noise to usable judgment
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={pathInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            onMouseLeave={() => setActiveIndex(null)}
            className="hidden md:block relative h-[620px] rounded-[36px] border border-white/10 bg-[#151C22]/72 backdrop-blur-sm overflow-hidden shadow-[0_34px_110px_rgba(0,0,0,0.48)]"
          >
            <div className="absolute inset-0 opacity-[0.08]" style={{
              backgroundImage: 'linear-gradient(rgba(216,184,120,0.42) 1px, transparent 1px), linear-gradient(90deg, rgba(216,184,120,0.42) 1px, transparent 1px)',
              backgroundSize: '58px 58px'
            }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_55%_38%,rgba(216,184,120,0.16),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.04),transparent_42%,rgba(0,0,0,0.28))]" />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d={pathD}
                fill="none"
                stroke={activeIndex === null ? 'rgba(216,184,120,0.62)' : 'rgba(216,184,120,0.16)'}
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeDasharray="1.2 2.2"
                className="transition-all duration-500"
              />
              <path
                d={activePathD}
                fill="none"
                stroke={activeIndex === null ? 'rgba(216,184,120,0.72)' : 'rgba(216,184,120,0.92)'}
                strokeWidth={activeIndex === null ? '0.95' : '1.2'}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>

            {content.steps.map((step, index) => {
              const isActive = activeIndex === index;
              const isDimmed = activeIndex !== null && !isActive;
              const isWhiteStone = index % 2 === 0;
              return (
                <button
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group text-left transition-all duration-500 ${isDimmed ? 'opacity-20 blur-[0.2px] scale-[0.96]' : 'opacity-100 blur-0 scale-100'}`}
                  style={positions[index]}
                >
                  <div className={`relative flex items-center justify-center transition-all duration-500 ${isActive ? 'w-28 h-24' : 'w-20 h-16'}`}>
                    <div className={`absolute left-1/2 top-[62%] -translate-x-1/2 rounded-full bg-black/45 blur-md transition-all duration-500 ${isActive ? 'w-28 h-8 opacity-80' : 'w-20 h-6 opacity-55'}`} />
                    <div
                      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-500 ${isActive ? 'w-24 h-20 shadow-[0_0_64px_rgba(216,184,120,0.38)]' : 'w-16 h-14 shadow-[0_18px_42px_rgba(0,0,0,0.36)]'} ${isActive ? 'border-[#D8B878]/75' : 'border-white/14'}`}
                      style={{
                        transform: 'translate(-50%, -50%) rotateX(58deg)',
                        background: isWhiteStone
                          ? 'radial-gradient(circle at 34% 22%, #fff8e8 0%, #f1dfbd 38%, #c9b78d 100%)'
                          : 'radial-gradient(circle at 34% 24%, #4d4d4d 0%, #151515 42%, #050505 100%)'
                      }}
                    />
                    <div className={`relative z-10 text-sm tracking-[0.15em] ${isWhiteStone ? 'text-[#101820]' : 'text-white'} transition-all duration-500 ${isActive ? 'translate-y-[-2px]' : ''}`}>0{index + 1}</div>
                  </div>
                  <div className={`mt-4 min-w-[190px] transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : activeIndex === null ? 'opacity-74 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                    <div className="text-base text-white mb-1">{step.title}</div>
                    <div className="text-xs leading-relaxed text-white/55 max-w-[190px]">{step.short}</div>
                  </div>
                </button>
              );
            })}

            {activeIndex !== null && (
              <div className="absolute left-8 right-8 bottom-8 pointer-events-none">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.28 }}
                  className="rounded-[28px] border border-white/12 bg-[#0F1722]/82 backdrop-blur-md p-7 md:p-8 shadow-[0_18px_70px_rgba(0,0,0,0.34)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 text-[#D8B878] text-sm tracking-[0.22em]">0{activeIndex + 1}</div>
                    <div>
                      <h3 className="text-2xl mb-3 text-white">{content.steps[activeIndex].title}</h3>
                      <p className="text-sm md:text-base leading-[1.8] text-white/72 max-w-2xl">{content.steps[activeIndex].body}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>

          <div className="md:hidden space-y-5">
            {content.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={pathInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.055] p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${index % 2 === 0 ? 'bg-[#F4E9D4] text-[#101820]' : 'bg-[#121212] text-white border border-white/18'}`}>0{index + 1}</div>
                  <div>
                    <h3 className="text-xl text-white">{step.title}</h3>
                    <p className="text-sm text-white/52">{step.short}</p>
                  </div>
                </div>
                <p className="text-sm leading-[1.8] text-white/70">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


// Projects Section Component
function ProjectsSection({ content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = content.items[activeIndex] || content.items[0];

  const projectImages = [PROJECT_IMAGE_QL, PROJECT_IMAGE_MG, PROJECT_IMAGE_NS, PROJECT_IMAGE_INNO];

  return (
    <section id="projects" ref={ref} className="min-h-screen py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[#1a2332] tracking-tight">{content.title}</h2>
          <p className="text-lg text-[#2C2C2C]/70 max-w-4xl leading-relaxed">{content.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {content.items.map((project, index) => {
            const active = activeIndex === index;
            return (
              <motion.button
                key={index}
                type="button"
                initial={{ opacity: 0, y: 26 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={`group relative h-[260px] overflow-hidden rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                  active
                    ? 'border-[#5B7C99]/45 shadow-[0_24px_70px_rgba(26,35,50,0.16)]'
                    : 'border-[#2C2C2C]/10 shadow-sm hover:shadow-xl'
                }`}
              >
                <motion.div
                  animate={{ scale: active ? 1.06 : 1 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={projectImages[index]}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-62"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/88 via-[#1a2332]/28 to-transparent" />
                <div className={`absolute inset-x-0 top-0 h-1 transition-colors duration-300 ${active ? 'bg-[#D8B878]' : 'bg-transparent'}`} />

                <div className="absolute left-5 right-5 bottom-5">
                  <span className="inline-block px-3 py-1 bg-white/90 text-[#1a2332] text-[11px] rounded-full mb-3 leading-none">
                    {project.tag}
                  </span>
                  <h3 className="text-2xl text-white tracking-tight mb-3">{project.title}</h3>
                  <p className="text-sm text-white/74 leading-relaxed line-clamp-2">{project.summary}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="rounded-2xl bg-[#F8F6F3] border border-[#2C2C2C]/10 shadow-[0_26px_90px_rgba(26,35,50,0.10)] overflow-hidden"
        >
          <div className="grid lg:grid-cols-[0.36fr_0.64fr]">
            <div className="relative min-h-[360px] lg:min-h-full overflow-hidden">
              <ImageWithFallback
                src={projectImages[activeIndex]}
                alt={activeProject.title}
                className="absolute inset-0 w-full h-full object-cover opacity-64"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2332]/92 via-[#1a2332]/34 to-transparent" />
              <div className="absolute left-7 right-7 bottom-7">
                <span className="inline-block px-3 py-1 bg-white/90 text-[#1a2332] text-xs rounded-full mb-4">
                  {activeProject.tag}
                </span>
                <h3 className="text-3xl text-white tracking-tight mb-4">{activeProject.title}</h3>
                <p className="text-sm text-white/76 leading-relaxed">{activeProject.summary}</p>
              </div>
            </div>

            <div className="p-7 md:p-9 lg:p-10">
              <div className="grid md:grid-cols-3 gap-7">
                <div>
                  <span className="text-xs text-[#5B7C99] uppercase tracking-wider">{content.labels.challenge}</span>
                  <p className="text-sm leading-[1.8] text-[#2C2C2C]/86 mt-3">{activeProject.challenge}</p>
                </div>

                <div>
                  <span className="text-xs text-[#5B7C99] uppercase tracking-wider">{content.labels.myWork}</span>
                  <p className="text-sm leading-[1.8] text-[#2C2C2C]/88 mt-3 whitespace-pre-line">{activeProject.myWork}</p>
                </div>

                <div>
                  <span className="text-xs text-[#5B7C99] uppercase tracking-wider">{content.labels.whatShows}</span>
                  <p className="text-sm leading-[1.8] text-[#2C2C2C]/88 mt-3">{activeProject.whatShows}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Education Section Component - Cinematic Six-Scene Journey
function EducationSection({ content, scrollContainer }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer,
    offset: ['start start', 'end end']
  });

  // Scene visibility control
  const coverOpacity = useTransform(scrollYProgress, [0, 0.11, 0.17], [1, 1, 0]);
  const coverY = useTransform(scrollYProgress, [0, 0.17], [0, -80]);
  const scene1Opacity = useTransform(scrollYProgress, [0.15, 0.18, 0.31, 0.34], [0, 1, 1, 0]);
  const scene2Opacity = useTransform(scrollYProgress, [0.31, 0.34, 0.47, 0.50], [0, 1, 1, 0]);
  const scene3Opacity = useTransform(scrollYProgress, [0.47, 0.50, 0.64, 0.67], [0, 1, 1, 0]);
  const scene4Opacity = useTransform(scrollYProgress, [0.64, 0.67, 0.81, 0.84], [0, 1, 1, 0]);
  const scene5Opacity = useTransform(scrollYProgress, [0.81, 0.84, 1], [0, 1, 1]);

  // Flight path animations
  const flight1Progress = useTransform(scrollYProgress, [0.34, 0.50], [0, 1]);
  const flight2Progress = useTransform(scrollYProgress, [0.67, 0.84], [0, 1]);

  const flight1Left = useTransform(flight1Progress, [0, 1], ['33%', '75%']);
  const flight1Top = useTransform(flight1Progress, [0, 1], ['56%', '44%']);
  const flight2Left = useTransform(flight2Progress, [0, 1], ['72%', '28%']);
  const flight2Top = useTransform(flight2Progress, [0, 1], ['52%', '47%']);

  return (
    <section id="education" ref={sectionRef} className="relative bg-[#F8F6F3]" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Scene 0: Education cover */}
        <motion.div
          style={{ opacity: coverOpacity }}
          className="absolute inset-0 bg-[#F8F6F3] flex items-center justify-center px-6"
        >
          <motion.div style={{ y: coverY }} className="text-center max-w-5xl mx-auto">
            <div className="text-xs tracking-[0.34em] uppercase text-[#8B7355] mb-8">{content.coverSubtitle}</div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-[#1a2332]">
              {content.coverTitle}
            </h2>
          </motion.div>
        </motion.div>

        {/* Scene 1: Chengdu / Early Intuition */}
        <motion.div 
          style={{ opacity: scene1Opacity }}
          className="absolute inset-0 bg-[#F8F6F3]"
        >
          <div className="h-full flex items-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center">
              <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={EDUCATION_CHENGDU_BG}
                  alt="Learning abacus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#8B7355]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-[#F8F6F3]/60 text-xs tracking-widest">
                  CHENGDU
                </div>
              </div>
              <div>
                <h3 className="text-3xl md:text-4xl mb-8 text-[#1a2332] tracking-tight leading-tight">
                  {content.chengdu.title}
                </h3>
                <div className="space-y-5 text-[#2C2C2C]/80 leading-relaxed">
                  {content.chengdu.body.split('\n\n').map((para, i) => (
                    <p key={i} className="text-base md:text-lg">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene 2: Chengdu → Shanghai Flight Transition */}
        <motion.div 
          style={{ opacity: scene2Opacity }}
          className="absolute inset-0 bg-[#E8E6E3] pointer-events-none"
        >
          <div className="h-full flex items-center justify-center relative overflow-hidden">
            {/* Minimal map background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D4CFC7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#B8B3AA" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {/* Simplified China outline */}
              <rect fill="url(#mapGradient)" width="1200" height="800" />
              
              {/* Base route line */}
              <line
                x1="400" y1="450"
                x2="900" y2="350"
                stroke="#5B7C99"
                strokeWidth="2"
                strokeOpacity="0.22"
                strokeDasharray="8 8"
              />

              {/* Animated route reveal */}
              <motion.line
                x1="400" y1="450"
                x2="900" y2="350"
                stroke="#5B7C99"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: flight1Progress }}
              />

              {/* Cities: placed inside the same SVG coordinate system as the route, so dots stay locked to endpoints. */}
              <g transform="translate(400 450)">
                <circle r="7" fill="#8B7355" />
                <text x="0" y="32" textAnchor="middle" fill="#2C2C2C" fontSize="15" letterSpacing="2.2">CHENGDU</text>
              </g>
              <g transform="translate(900 350)">
                <circle r="7" fill="#1a2332" />
                <text x="0" y="32" textAnchor="middle" fill="#2C2C2C" fontSize="15" letterSpacing="2.2">SHANGHAI</text>
              </g>
            </svg>

            {/* Moving plane */}
            <motion.div
              className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                left: flight1Left,
                top: flight1Top
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl border border-[#5B7C99]/20 flex items-center justify-center">
                <Plane className="w-6 h-6 text-[#5B7C99] rotate-[35deg]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 3: Shanghai / Academic Foundation */}
        <motion.div 
          style={{ opacity: scene3Opacity }}
          className="absolute inset-0 bg-[#F8F6F3] pointer-events-none overflow-hidden"
        >
          {/* SUIBE panorama as the atmosphere of the page: visible at the top, then fading into the light background. */}
          <div className="absolute inset-x-0 top-0 h-[42%] md:h-[46%] lg:h-[48%] overflow-hidden">
            <ImageWithFallback
              src={SHANGHAI_IMAGE_SUIBE_PANORAMA}
              alt="SUIBE campus panorama"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/4 via-transparent to-[#F8F6F3]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F3]/18 via-transparent to-[#F8F6F3]/18" />
            <div className="absolute bottom-14 right-10 md:right-16 text-white/88 text-[10px] md:text-xs tracking-[0.28em] drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
              SUIBE / SHANGHAI
            </div>
          </div>

          <div className="relative z-10 h-full px-4 md:px-10 lg:px-12 py-6 md:py-8">
            <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-[0.86fr_1.14fr] gap-6 md:gap-8 lg:gap-10 items-start">
              {/* Supporting city memory image */}
              <div className="md:pt-[380px] lg:pt-[410px]">
                <div className="relative h-[210px] sm:h-[250px] md:h-[310px] lg:h-[340px] rounded-[28px] overflow-hidden shadow-[0_18px_60px_rgba(28,35,50,0.10)] bg-[#DCD8CF] border border-[#2C2C2C]/10">
                  <ImageWithFallback
                    src={SHANGHAI_IMAGE_CITY}
                    alt="Shanghai city"
                    className="w-full h-full object-cover grayscale-[0.08]"
                    style={{ objectPosition: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/36 via-black/8 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white/90">
                    <div className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase">The city where it began</div>
                    <div className="mt-2 text-xl md:text-2xl tracking-[0.08em]">Shanghai</div>
                  </div>
                </div>
              </div>

              {/* Text floats over the fading panorama, like a lighter version of the Go page. */}
              <div className="md:pt-[94px] lg:pt-[112px] flex md:justify-end">
                <div className="w-full md:max-w-[560px] lg:max-w-[610px] bg-white/82 backdrop-blur-md p-7 md:p-8 lg:p-10 rounded-[28px] shadow-[0_24px_70px_rgba(28,35,50,0.12)] border border-white/70">
                  <h3 className="text-2xl md:text-[32px] lg:text-[34px] md:leading-[1.16] mb-4 text-[#1a2332]">{content.shanghai.school}</h3>
                  <div className="text-lg md:text-[20px] text-[#5B7C99] mb-3 leading-relaxed">
                    {content.shanghai.degree.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-[#2C2C2C]/60 mb-5">{content.shanghai.location}</p>
                  <div className="text-sm md:text-[15px] text-[#2C2C2C]/84 leading-[1.72] space-y-4">
                    {content.shanghai.details.split('\n\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scene 4: Shanghai → Exeter Flight Transition */}
        <motion.div 
          style={{ opacity: scene4Opacity }}
          className="absolute inset-0 bg-[#E0DED9] pointer-events-none"
        >
          <div className="h-full flex items-center justify-center relative overflow-hidden">
            {/* World map background */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="worldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8C4BC" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#D8D4CC" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              <rect fill="url(#worldGradient)" width="1400" height="800" />
              
              {/* Base route line */}
              <path
                d="M 1000 420 Q 700 300, 400 380"
                fill="none"
                stroke="#5B7C99"
                strokeWidth="2"
                strokeOpacity="0.22"
                strokeDasharray="10 10"
              />

              {/* Animated route reveal */}
              <motion.path
                d="M 1000 420 Q 700 300, 400 380"
                fill="none"
                stroke="#5B7C99"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ pathLength: flight2Progress }}
              />

              {/* Cities: placed inside the same SVG coordinate system as the route, so dots stay locked to endpoints. */}
              <g transform="translate(1000 420)">
                <circle r="7" fill="#1a2332" />
                <text x="0" y="34" textAnchor="middle" fill="#2C2C2C" fontSize="16" letterSpacing="2.3">SHANGHAI</text>
              </g>
              <g transform="translate(400 380)">
                <circle r="7" fill="#5B7C99" />
                <text x="0" y="34" textAnchor="middle" fill="#2C2C2C" fontSize="16" letterSpacing="2.3">EXETER, UK</text>
              </g>
            </svg>

            {/* Moving plane */}
            <motion.div
              className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-1/2"
              style={{
                left: flight2Left,
                top: flight2Top
              }}
            >
              <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl border border-[#5B7C99]/20 flex items-center justify-center">
                <Plane className="w-6 h-6 text-[#5B7C99] -rotate-[120deg]" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scene 5: Exeter / Structured International Training */}
        <motion.div 
          style={{ opacity: scene5Opacity }}
          className="absolute inset-0 bg-[#F8F6F3] pointer-events-none"
        >
          <div className="h-full flex items-center px-6 md:px-12 py-20">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-5 gap-8 md:gap-10 items-center">
              <div className="md:col-span-3 relative h-[560px]">
                <div className="absolute top-0 left-0 right-8 h-[420px] rounded-3xl overflow-hidden shadow-2xl bg-[#E8E6E3]">
                  <ImageWithFallback
                    src={EXETER_IMAGE_CAMPUS}
                    alt="University of Exeter campus"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/28 via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-6 text-white/75 text-xs tracking-widest">
                    EXETER
                  </div>
                </div>

                <div className="absolute bottom-0 left-8 w-[42%] h-[210px] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-[#F8F6F3] bg-white">
                  <ImageWithFallback
                    src={EXETER_IMAGE_GRADUATION}
                    alt="Graduation memory at Exeter"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white/80 text-[10px] tracking-[0.2em]">
                    GRADUATION
                  </div>
                </div>

                <div className="absolute bottom-8 right-0 w-[48%] h-[220px] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-[#F8F6F3] bg-white">
                  <ImageWithFallback
                    src={EXETER_IMAGE_BUSINESS}
                    alt="University of Exeter Business School"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white/85 text-[10px] tracking-[0.2em]">
                    BUSINESS SCHOOL
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-white/95 backdrop-blur-sm p-7 md:p-9 rounded-2xl shadow-xl border border-[#2C2C2C]/10">
                <h3 className="text-xl md:text-2xl mb-2 text-[#1a2332]">{content.exeter.school}</h3>
                <p className="text-lg text-[#5B7C99] mb-1">{content.exeter.degree}</p>
                <p className="text-sm text-[#2C2C2C]/60 mb-2">{content.exeter.location}</p>
                <p className="text-sm text-[#8B7355] mb-5">{content.exeter.grade}</p>
                <div className="text-sm md:text-[15px] text-[#2C2C2C]/80 leading-relaxed space-y-3">
                  {content.exeter.details.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Cat profile card with hover overlay for the Life / Cats panel
function CatProfileCard({ image, name, body, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onWheelCapture={(e) => {
        const scroller = e.currentTarget.querySelector('[data-cat-scroll]') as HTMLElement | null;
        if (scroller) {
          scroller.scrollTop += e.deltaY;
        }
        e.preventDefault();
        e.stopPropagation();
      }}
      className="group relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-[#1a2332] cursor-default"
    >
      <ImageWithFallback
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Default subtle lower gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

      {/* Expanding hover mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101820]/95 via-[#1a2332]/88 to-[#1a2332]/45 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out" />

      {/* Name shown in default state */}
      <div className="absolute left-6 bottom-5 right-6 transition-all duration-500 group-hover:translate-y-4 group-hover:opacity-0">
        <h4 className="text-2xl text-white tracking-tight">{name}</h4>
      </div>

      {/* Hover biography */}
      <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
        <div className="mb-4">
          <p className="text-xs tracking-[0.25em] uppercase text-white/45 mb-2">Cat Profile</p>
          <h4 className="text-3xl text-white tracking-tight">{name}</h4>
        </div>

        <div
          data-cat-scroll
          className="max-h-48 md:max-h-56 overflow-y-auto overscroll-contain pr-2 space-y-3 text-sm md:text-[15px] leading-relaxed text-white/86"
        >
          {body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Life Section Component - Cinematic Photo-Story
function LifeSection({ content, scrollContainer }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer,
    offset: ['start start', 'end end']
  });

  // Panel visibility control
  const panel1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.10], [1, 1, 0]);
  const panel2Opacity = useTransform(scrollYProgress, [0.08, 0.10, 0.23, 0.25], [0, 1, 1, 0]);
  const panel3Opacity = useTransform(scrollYProgress, [0.23, 0.25, 0.48, 0.50], [0, 1, 1, 0]);
  const panel4Opacity = useTransform(scrollYProgress, [0.48, 0.50, 0.60, 0.62], [0, 1, 1, 0]);
  const panel5Opacity = useTransform(scrollYProgress, [0.60, 0.62, 0.72, 0.74], [0, 1, 1, 0]);
  const panel6Opacity = useTransform(scrollYProgress, [0.72, 0.74, 0.84, 0.86], [0, 1, 1, 0]);
  const panel7Opacity = useTransform(scrollYProgress, [0.84, 0.86, 1], [0, 1, 1]);

  // Hamburger panel staged reveal:
  // Extended scroll window so the user can first appreciate Hamburger,
  // then read the text and view the content photos before the next panel takes over.
  const dogBackgroundScale = useTransform(scrollYProgress, [0.23, 0.25, 0.46, 0.50], [1.06, 1.02, 1.00, 1.03]);
  const dogBackgroundDim = useTransform(scrollYProgress, [0.23, 0.30, 0.335, 0.47], [0.04, 0.06, 0.34, 0.34]);
  const dogGradientOpacity = useTransform(scrollYProgress, [0.25, 0.30, 0.335, 0.47], [0, 0.12, 1, 1]);
  const dogTextOpacity = useTransform(scrollYProgress, [0.335, 0.365, 0.455, 0.495], [0, 1, 1, 0]);
  const dogTextY = useTransform(scrollYProgress, [0.335, 0.365], [36, 0]);
  const dogPhotosOpacity = useTransform(scrollYProgress, [0.36, 0.39, 0.455, 0.495], [0, 1, 1, 0]);
  const dogPhotosY = useTransform(scrollYProgress, [0.36, 0.39], [56, 0]);

  return (
    <section id="life" ref={sectionRef} className="relative bg-white" style={{ height: '760vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Panel 1: Opening */}
        <motion.div 
          style={{ opacity: panel1Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-[#F8F6F3] to-[#E8E6E3] pointer-events-none"
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-6xl md:text-7xl mb-6 text-[#1a2332] tracking-tight">{content.title}</h2>
              <p className="text-3xl md:text-4xl text-[#2C2C2C]/60">{content.subtitle}</p>
            </div>
          </div>
        </motion.div>
        {/* Panel 2: Cats - Triptych with hover profiles */}
        <motion.div 
          style={{ opacity: panel2Opacity }}
          className="absolute inset-0 bg-white pointer-events-auto"
        >
          <div className="h-full flex items-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                {[
                  { image: CAT_IMAGE_POP, profile: content.catProfiles[2] },
                  { image: CAT_IMAGE_AD, profile: content.catProfiles[1] },
                  { image: CAT_IMAGE_MCFLURRY, profile: content.catProfiles[0] }
                ].map((cat, index) => (
                  <CatProfileCard
                    key={cat.profile.name}
                    image={cat.image}
                    name={cat.profile.name}
                    body={cat.profile.body}
                    index={index}
                  />
                ))}
              </div>

              <div className="max-w-3xl mx-auto text-center bg-white/85 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-[#2C2C2C]/10 shadow-sm">
                <p className="text-xl md:text-2xl leading-relaxed text-[#2C2C2C]">{content.cats}</p>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 3: Hamburger the Shiba */}

        <motion.div 
          style={{ opacity: panel3Opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              style={{ scale: dogBackgroundScale }}
              className="absolute inset-0"
            >
              <ImageWithFallback
                src={DOG_IMAGE_HAMBURGER_BG}
                alt="Hamburger the Shiba"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center center' }}
              />
            </motion.div>

            {/* Background appears first almost undimmed; masks strengthen only when text/photos arrive. */}
            <motion.div
              style={{ opacity: dogBackgroundDim }}
              className="absolute inset-0 bg-black"
            />
            <motion.div
              style={{ opacity: dogGradientOpacity }}
              className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/46 to-black/16"
            />
            <motion.div
              style={{ opacity: dogGradientOpacity }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"
            />
          </div>

          <div className="relative h-full flex items-center px-6 md:px-12 py-24">
            <div className="max-w-7xl mx-auto w-full">
              <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
                <motion.div
                  style={{ opacity: dogTextOpacity, y: dogTextY }}
                  className="bg-white/94 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/40"
                >
                  <p className="text-xl md:text-2xl leading-relaxed text-[#2C2C2C]">{content.dog}</p>
                </motion.div>

                <motion.div
                  style={{ opacity: dogPhotosOpacity, y: dogPhotosY }}
                  className="grid grid-cols-2 gap-4 md:gap-5 items-end"
                >
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 border border-white/20"
                    style={{ aspectRatio: '1122 / 1402' }}
                  >
                    <ImageWithFallback
                      src={DOG_IMAGE_HAMBURGER_ARGENTINA}
                      alt="Hamburger in Argentina jersey"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 border border-white/20 md:translate-y-8"
                    style={{ aspectRatio: '1279 / 1706' }}
                  >
                    <ImageWithFallback
                      src={DOG_IMAGE_HAMBURGER_WOODFRAME}
                      alt="Hamburger smiling outdoors"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 4: Go */}
        <motion.div 
          style={{ opacity: panel4Opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src={GO_IMAGE_BG}
              alt="Go board"
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
            />
            {/* Keep the Go board visible; only add light cinematic shading instead of a heavy dark mask. */}
            <div className="absolute inset-0 bg-black/24" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/54 via-black/18 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/16" />
          </div>
          <div className="relative h-full flex items-end md:items-center justify-start px-6 md:px-16 pb-24 md:pb-0">
            <div className="max-w-xl bg-[#16120c]/62 backdrop-blur-[6px] p-7 md:p-9 rounded-3xl shadow-2xl border border-[#d8b878]/24">
              <p className="text-lg md:text-xl leading-relaxed text-[#F4E9D4]">{content.go}</p>
            </div>
          </div>
        </motion.div>

        {/* Panel 5: Basketball & Football */}
        <motion.div 
          style={{ opacity: panel5Opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src={LIFE_BASKETBALL_BG}
              alt="Basketball"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
          </div>
          <div className="relative h-full flex items-center px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-10 items-center">
              <div className="bg-white/95 backdrop-blur-md p-10 md:p-12 rounded-3xl shadow-2xl">
                <p className="text-xl md:text-2xl leading-relaxed text-[#2C2C2C]">{content.sports}</p>
              </div>
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src={LIFE_BASKETBALL_SMALL}
                  alt="Playing basketball"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 6: Music & Travel */}
        <motion.div 
          style={{ opacity: panel6Opacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute inset-0">
            <ImageWithFallback
              src={LIFE_MUSIC_TRAVEL_BG}
              alt="Journey"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
          </div>
          <div className="relative h-full flex items-center justify-center px-6">
            <div className="max-w-4xl">
              <div className="mb-8 grid grid-cols-3 gap-4 opacity-60">
                <div className="h-32 rounded-xl overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src={LIFE_MUSIC_SMALL}
                    alt="Music"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#1a2332]/90 backdrop-blur-md p-12 md:p-16 rounded-3xl shadow-2xl">
                <p className="text-xl md:text-2xl leading-relaxed text-white">{content.music}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Panel 7: Closing Line */}
        <motion.div 
          style={{ opacity: panel7Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-[#F8F6F3] to-[#E8E6E3] pointer-events-none"
        >
          <div className="h-full flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <p className="text-2xl md:text-3xl leading-relaxed text-[#2C2C2C]/90">
                {content.closing}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// Contact Section Component
function ContactSection({ content }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-20%' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-[#F8F6F3] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl mb-4 text-[#1a2332] tracking-tight">{content.title}</h2>
          <h3 className="text-2xl mb-4 text-[#5B7C99]">{content.heading}</h3>
          <p className="text-lg text-[#2C2C2C]/70 mb-16 max-w-2xl">{content.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-[#5B7C99]" />
                  <a href={`mailto:${content.email}`} className="text-lg text-[#2C2C2C] hover:text-[#5B7C99] transition-colors">
                    {content.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#5B7C99]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-lg text-[#2C2C2C]">LinkedIn</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-[#2C2C2C]/70 mb-2">{content.fields.name}</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#2C2C2C]/10 rounded-lg focus:outline-none focus:border-[#5B7C99] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2C2C2C]/70 mb-2">{content.fields.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#2C2C2C]/10 rounded-lg focus:outline-none focus:border-[#5B7C99] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2C2C2C]/70 mb-2">{content.fields.subject}</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#2C2C2C]/10 rounded-lg focus:outline-none focus:border-[#5B7C99] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2C2C2C]/70 mb-2">{content.fields.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white border border-[#2C2C2C]/10 rounded-lg focus:outline-none focus:border-[#5B7C99] transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#5B7C99] text-white rounded-lg hover:bg-[#4a6680] transition-colors"
                >
                  {content.fields.submit}
                </button>
                <p className="text-xs text-[#2C2C2C]/50">{content.note}</p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
