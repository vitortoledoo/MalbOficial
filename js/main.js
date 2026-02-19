const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const navLang = document.querySelector('.nav-lang');
const langToggle = document.querySelector('.lang-toggle');
const langMenu = document.querySelector('.lang-menu');
const langButtons = document.querySelectorAll('.lang-menu [data-lang]');
const safeStorage = {
    get(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // no-op
        }
    }
};

const translations = {
    pt: {
        nav: { about: 'Quem somos', solutions: 'Soluções', contact: 'Contato', language: 'Idioma' },
        about: {
            title: 'Quebramos o padrão...<br><span class="highlight">...Para elevar o nível.</span>',
            p1: 'Nossa jornada começou com uma pergunta simples: por que o mercado entrega apenas o que é pedido, e não o que é necessário? Percebemos que para nos destacar, precisávamos de mais do que logística. Precisávamos de <strong>inteligência</strong>.',
            highlight: "Entender o negócio. Sentir a marca. Saber o 'como' e o 'porquê'.",
            p2: 'Decidimos que não trabalharíamos para o portfólio, mas para o parceiro. Tomamos o poder desse conhecimento estratégico e o colocamos à prova. O resultado? Experiências que não apenas acontecem, mas marcam.',
            p3: 'Seja local ou globalmente, a MALB* assume o peso da execução para que você foque no sucesso. <span class="signature">Conhecimento é impacto.</span>',
            caption: 'Larissa Coelho Founder & Head de Produção MALB'
        },
        solutions: {
            title: '<span class="highlight">Soluções</span>',
            card1: { title: 'Estratégia e Gestão Operacional', desc: 'Do conceito à execução para eventos de todos os tipos.' },
            card2: { title: 'Customer Experience', desc: 'Criando jornadas de serviço que fortalecem a satisfação e a fidelidade.' },
            card3: { title: 'Otimização de Processos e Fluxos de Trabalho', desc: 'Criação de sistemas operacionais que melhoram eficiência e responsabilidade.' },
            card4: { title: 'Gestão de Projetos e Controle Financeiro', desc: 'Planejamento de recursos, orçamentos e relatórios cruzados entre departamentos.' },
            card5: { title: 'Liderança Interfuncional', desc: 'Coordenação de stakeholders integrando marketing, logística, finanças e produção.' }
        },
        achievements: {
            title: '<span class="highlight">Conquistas</span>',
            card1: { title: 'Festival Mr Moo – Edição 10 Anos', desc: 'Como Produtor Executivo, edição que garantiu ao evento o título do Guinness World Records como Maior Festival de Churrasco do Mundo, com grandes shows, público de milhares de pessoas e mais de 700 profissionais envolvidos.' },
            card2: { title: 'Liderança em Grande Escala', desc: 'Gestão de mais de 30 eventos nacionais de automobilismo, reunindo mais de 80.000 participantes, com excelência na logística e hospitalidade em 3 países e mais de 20 cidades.' },
            card3: { title: 'Inovação em Operações', desc: 'Implantação pioneira de autenticação digital por reconhecimento facial, eliminando o uso de plásticos, reduzindo custos operacionais e estabelecendo um novo padrão de sustentabilidade no credenciamento.' },
            card4: { title: 'Transformação de Sistemas', desc: 'Implementação de sistemas integrados de bilhetagem e financeiro, ampliando a visibilidade de dados, reduzindo erros manuais e agilizando a tomada de decisões estratégicas.' },
            card5: { title: 'Eficiência Organizacional', desc: 'Aumento de 30% na eficiência do fluxo de trabalho por meio da reformulação de processos e da implementação de ferramentas de coordenação em tempo real.' },
            card6: { title: 'Isso é MALB' }
        },
        portfolio: {
            title: 'Cases de <span class="highlight">sucesso</span>',
            subtitle: 'Explore a trajetória',
            stock: {
                role: 'Sr Producer & Coord. Operações',
                desc: 'Ao longo de quatro anos, evolução da área de suporte administrativo/financeiro para a liderança de operações nacionais na Stock Car, com atuação na coordenação de logística, hospitalidade e customer experience em projetos de grande escala no Brasil. Participação no planejamento e na entrega de mais de 30 eventos de motorsport, assegurando excelência operacional, integração entre áreas e consistência na experiência do público.',
                hl1: 'Planejamento e execução de logística em grande escala',
                hl2: 'Desenvolvimento de processos de ticketing',
                hl3: 'Gestão de crise e service recovery',
                hl4: 'Padronização de atendimento ao público'
            },
            mrmoo: {
                role: 'Executive Producer (Guinness Project)',
                desc: 'Atuação como Executive Producer em projeto de alta complexidade que resultou no reconhecimento internacional do Guinness World Records como Maior Festival de Churrasco do Mundo, com foco na operação e governança do evento.',
                hl1: 'Gestão de credenciamento e controle de acessos',
                hl2: 'Organização e fluxo de acesso do público',
                hl3: 'Suporte direto à diretoria'
            },
            wec: {
                role: 'Coordenação Geral & Estratégica',
                desc: 'Atuação em PMO na coordenação estratégica do FIA WEC – Rolex 6 Horas de São Paulo, promovendo o alinhamento entre equipes locais e internacionais, a governança do projeto e a organização do planejamento de médio e longo prazo. A edição 2025 recebeu mais de 80.000 pessoas, com continuidade na liderança do planejamento da edição 2026.',
                hl1: 'Gestão integrada de projetos de produção internacional (80k+ participantes)',
                hl2: 'Governança e gestão de stakeholders institucionais e patrocinadores',
                hl3: 'Apoio direto à diretoria, com estruturação de fluxos estratégicos de informação',
                hl4: 'Elaboração e consolidação de relatórios gerenciais, garantindo visibilidade executiva e alinhamento entre áreas'
            },
            bh: {
                role: 'Project Manager Operações',
                desc: 'Evento realizado no Mineirão que integrou motorsport, música e entretenimento em uma produção multi-experiência. Atuação como PM garantindo o alinhamento entre a Stock Car e a equipe do festival, com coordenação de operações, gestão de cronogramas e infraestrutura, assegurando fluxo do público, segurança e consistência de entrega em grande escala.',
                hl1: 'Integração de equipes e estruturação de governança',
                hl2: 'Gestão de logística complexa em ambiente de estádio',
                hl3: 'Garantia de consistência da experiência do público em larga escala',
                hl4: 'Gestão de credenciamento e infraestrutura'
            },
            juntos: {
                role: 'Project Manager Engajamento',
                desc: 'Experiência corporativa interna realizada no autódromo, desenvolvida em parceria com a área de RH com o objetivo de fortalecer cultura e engajamento organizacional. Atuação em planejamento e coordenação do projeto, conectando colaboradores aos bastidores da produção e das operações do motorsport, com entrega de uma jornada de alto impacto, alinhada e fluida.',
                hl1: 'Co-criação de conceito em parceria com RH',
                hl2: 'Planejamento logístico e gestão de convidados',
                hl3: 'Coordenação da execução on-site',
                hl4: 'Fortalecimento do propósito e da cultura organizacional'
            },
            ctio: {
                role: 'Project Manager Coordenação VIP',
                desc: 'Evento premium voltado à divisão de tecnologia, reunindo CTIOs e lideranças em uma experiência exclusiva no autódromo, com foco em networking, prospecção e relacionamento estratégico. Atuação no planejamento do projeto, na logística VIP e na coordenação de parceiros, assegurando uma entrega alinhada ao branding e aos objetivos de relacionamento da iniciativa.',
                hl1: 'Hospitalidade premium e guest relations',
                hl2: 'Desenvolvimento de formato integrado entre tecnologia e motorsport',
                hl3: 'Produção de experiência de alto padrão',
                hl4: 'Foco estratégico em relacionamento e aquisição'
            },
            f4: {
                role: 'Project Manager - F1 Ecosystem',
                desc: 'Coordenação da Fórmula 4 Brasil por dois anos consecutivos dentro do ecossistema do GP de Fórmula 1 em São Paulo, atuando como interface estratégica entre as equipes envolvidas. Responsabilidade pelo alinhamento de cronogramas, segurança, acessos, transporte e operação de pista, em um ambiente de alta complexidade, pressão e precisão.',
                hl1: 'Gestão de logística da delegação F4',
                hl2: 'Interface e alinhamento operacional entre os ecossistemas F1 e F4',
                hl3: 'Coordenação de transporte, travel e operação de pista',
                hl4: 'Execução reconhecida pela alta sincronização entre frentes'
            },
            siasp: {
                role: 'Project Manager.',
                desc: 'Atuação como Gerente de Projeto no estande FIA WEC Rolex 6 horas de São Paulo, com responsabilidade integral pelo planejamento e execução de um dos estandes mais visitados do evento. Escopo abrangendo desde a concepção do estande, cenografia e operação diária até a coordenação de equipes, parceiros e fluxos de atendimento ao público ao longo de 10 dias de evento de grande sucesso.',
                hl1: 'Planejamento estratégico e execução do projeto do estande',
                hl2: 'Gestão da operação diária, logística e fluxos de público',
                hl3: 'Coordenação de cenografia, fornecedores e parceiros',
                hl4: 'Comunicação contínua com a equipe do projeto e stakeholders',
                hl5: 'Elaboração de briefing, escalação e liderança de equipes on-site'
            },
            tags: {
                operations: 'Operações',
                cx: 'CX',
                leadership: 'Liderança',
                logistics: 'Logística',
                scale: 'Logística Escala',
                suppliers: 'Fornecedores',
                guinness: 'Guinness Planning',
                experience: 'Experiência do visitante e alto volume de engajamento',
                strategy: 'Estratégia',
                intOps: 'Operações Int.',
                stakeholders: 'Stakeholders',
                hospitality: 'Hospitalidade',
                pmo: 'PMO',
                infrastructure: 'Infraestrutura',
                integration: 'Integração',
                planning: 'Planejamento',
                corporate: 'Eventos Corporativos',
                internal: 'Comunicação Interna',
                engagement: 'Engajamento',
                vip: 'VIP/Corporate',
                relationship: 'Relacionamento',
                activation: 'Ativação',
                intCoord: 'Coordenação Int.',
                motorsport: 'Motorsport',
                pressure: 'Pressão',
                garantia: 'Garantia de consistência de marca',
                cenografia: 'Cenografia para a marca'
            }
        },
        cta: {
            title: 'Pronto para elevar o nível?',
            subtitle: 'Vamos transformar sua próxima ideia em uma experiência inesquecível.',
            button: 'Começar Projeto'
        },
        footer: {
            desc: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucareste – Romênia',
            descLong: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucareste – Romênia',
            explore: 'Explorar',
            about: 'Quem Somos',
            solutions: 'Soluções',
            achievements: 'Conquistas',
            cases: 'Cases',
            contact: 'Contato',
            location: 'Bucharest – Romania',
            rights: '© 2026 MALB Events & Consulting. Todos os direitos reservados.',
            rightsShort: '© 2026 MALB Events & Consulting.',
            credits: 'Designed by DestinoConectado'
        },
        aboutPage: {
            kicker: 'Institucional',
            title: 'Quem somos.',
            p1: 'Somos uma consultoria de eventos especializada em operações, logística, gestão de projetos e experiência do público, com atuação ponta a ponta — do planejamento estratégico à entrega em campo.',
            p2: 'Reunimos liderança experiente e visão prática, construídas a partir de uma vivência sólida em projetos de grande escala no Brasil, Argentina e Uruguai, com forte presença no motorsport, em hospitalidade premium e em eventos corporativos estratégicos. Atuamos como o ponto de convergência entre equipes internas, fornecedores, patrocinadores e a organização do evento, garantindo alinhamento de cronograma, clareza de fluxos, segurança e experiências consistentes do início ao fim.',
            p3: 'Nossa atuação vai além da execução: desenhamos jornadas de experiência, estruturamos processos e apoiamos decisões estratégicas, assegurando que cada interação — do acesso do público à hospitalidade VIP — seja fluida, coerente e alinhada aos objetivos do projeto e das marcas envolvidas.',
            p4: 'O nosso diferencial está na liderança em ambientes complexos. Transformamos desafios operacionais em entregas bem orquestradas por meio de planejamento estruturado, comunicação precisa, visão de risco e ritmo de pista. Isso nos permite entregar com excelência tanto eventos nacionais e internacionais com dezenas de milhares de pessoas, quanto experiências exclusivas para C-levels, ativações de marca e projetos multistakeholder de alta visibilidade.',
            p5: 'Complexidade organizada. Experiências bem entregues. Liderança em campo.',
            leader: {
                kicker: 'Liderança',
                title: 'Quem é Larissa Coelho<br>',
                role: 'Head da MALB*',
                p1: 'Larissa é uma profissional especialista em Operações de Eventos de grande, médio e pequeno porte, Experiência do Cliente e Gestão de Projetos, com mais de 5 anos de experiência liderando projetos de grande escala que combinam criatividade, estrutura e precisão.',
                p2: 'Ao longo de sua trajetória, coordenou produções nacionais e internacionais de alta complexidade, incluindo o FIA WEC – Rolex 6 Horas de São Paulo, o Stock Car Championship, o BH Stock Festival e o premiado Festival Mr Moo – Edição Especial de 10 Anos, que conquistou um recorde mundial do Guinness em 2025.',
                p3: 'Seu trabalho integra planejamento estratégico, gestão financeira e design de serviços, com foco na construção de jornadas consistentes, eficientes e centradas no público, garantindo que cada projeto entregue não apenas resultados operacionais, mas também experiências memoráveis e alinhadas ao propósito das marcas.',
                quote: '"Sou apaixonada por transformar operações complexas em experiências fluidas e centradas nas pessoas, que conectam marcas, equipes e públicos."',
                cta: 'Saiba mais'
            }
        },
        contact: {
            title: 'Tem um projeto em mente?<br><span class="highlight">Conte para a gente!</span>',
            desc: 'Grandes experiências começam com uma boa estratégia. O seu desafio é o nosso trabalho.',
            emailLabel: 'Fale com a gente',
            locationLabel: 'Base',
            formTitle: 'Envie uma mensagem',
            nameLabel: 'Seu Nome',
            emailField: 'E-mail',
            messageLabel: 'Sobre o projeto...',
            submit: 'Enviar sua ideia',
            namePlaceholder: ' ',
            emailPlaceholder: ' ',
            messagePlaceholder: ' '
        }
    },
    en: {
        nav: { about: 'About', solutions: 'Solutions', contact: 'Contact', language: 'Language' },
        about: {
            title: 'We break the pattern...<br><span class="highlight">...to raise the bar.</span>',
            p1: 'Our journey started with a simple question: why does the market deliver only what is asked for, and not what is needed? We realized that to stand out, we needed more than logistics. We needed <strong>intelligence</strong>.',
            highlight: "Understand the business. Feel the brand. Know the 'how' and the 'why'.",
            p2: 'We decided we would not work for the portfolio, but for the partner. We took the power of this strategic knowledge and put it to the test. The result? Experiences that don’t just happen, they leave a mark.',
            p3: 'Locally or globally, MALB* carries the execution so you can focus on success. <span class="signature">Knowledge is impact.</span>',
            caption: 'Larissa Coelho Founder & Head of Production MALB'
        },
        solutions: {
            title: '<span class="highlight">Solutions</span>',
            card1: { title: 'Strategy & Operational Management', desc: 'From concept to execution for events of all kinds.' },
            card2: { title: 'Customer Experience', desc: 'Creating service journeys that strengthen satisfaction and loyalty.' },
            card3: { title: 'Process & Workflow Optimization', desc: 'Building operating systems that improve efficiency and accountability.' },
            card4: { title: 'Project Management & Financial Control', desc: 'Resource planning, budgets, and cross-department reporting.' },
            card5: { title: 'Cross-functional Leadership', desc: 'Coordinating stakeholders across marketing, logistics, finance, and production.' }
        },
        achievements: {
            title: '<span class="highlight">Achievements</span>',
            card1: { title: 'Mr Moo Festival – 10-Year Edition', desc: 'As Executive Producer, an edition that earned the event the Guinness World Records title as the Largest BBQ Festival in the World, with major shows, thousands of attendees, and more than 700 professionals involved.' },
            card2: { title: 'Large-Scale Leadership', desc: 'Managed more than 30 national motorsport events, gathering 80,000+ participants, with excellence in logistics and hospitality across 3 countries and over 20 cities.' },
            card3: { title: 'Operational Innovation', desc: 'Pioneering implementation of digital facial-recognition authentication, eliminating plastic use, reducing operating costs, and setting a new sustainability standard in accreditation.' },
            card4: { title: 'Systems Transformation', desc: 'Implementation of integrated ticketing and finance systems, expanding data visibility, reducing manual errors, and speeding up strategic decision-making.' },
            card5: { title: 'Organizational Efficiency', desc: '30% increase in workflow efficiency through process redesign and real-time coordination tools.' },
            card6: { title: 'This is MALB' }
        },
        portfolio: {
            title: 'Success <span class="highlight">cases</span>',
            subtitle: 'Explore the journey',
            stock: {
                role: 'Sr Producer & Operations Coordinator',
                desc: 'Over four years, evolved from administrative/financial support to leading national operations at Stock Car, coordinating logistics, hospitality, and customer experience in large-scale projects in Brazil. Participated in planning and delivering more than 30 motorsport events, ensuring operational excellence, cross-area integration, and consistent audience experience.',
                hl1: 'Large-scale logistics planning and execution',
                hl2: 'Ticketing process development',
                hl3: 'Crisis management and service recovery',
                hl4: 'Standardized public service'
            },
            mrmoo: {
                role: 'Executive Producer (Guinness Project)',
                desc: 'Executive Producer in a high-complexity project that resulted in international recognition by Guinness World Records as the Largest BBQ Festival in the World, with focus on event operations and governance.',
                hl1: 'Credentialing management and access control',
                hl2: 'Audience access organization and flow',
                hl3: 'Direct support to leadership'
            },
            wec: {
                role: 'General & Strategic Coordination',
                desc: 'PMO coordination for FIA WEC – Rolex 6 Hours of São Paulo, aligning local and international teams, ensuring project governance, and organizing mid/long-term planning. The 2025 edition welcomed more than 80,000 people, with continued leadership for the 2026 planning.',
                hl1: 'Integrated management of international production projects (80k+ participants)',
                hl2: 'Governance and management of institutional stakeholders and sponsors',
                hl3: 'Direct support to leadership with strategic information flows',
                hl4: 'Creation and consolidation of management reports, ensuring executive visibility and cross-area alignment'
            },
            bh: {
                role: 'Operations Project Manager',
                desc: 'Event held at Mineirão integrating motorsport, music, and entertainment in a multi-experience production. As PM, aligned Stock Car and festival teams, coordinating operations, schedule management, and infrastructure to ensure crowd flow, safety, and consistent delivery at scale.',
                hl1: 'Team integration and governance structuring',
                hl2: 'Complex logistics management in a stadium environment',
                hl3: 'Consistent audience experience at scale',
                hl4: 'Credentialing and infrastructure management'
            },
            juntos: {
                role: 'Engagement Project Manager',
                desc: 'Internal corporate experience at the racetrack, developed with HR to strengthen culture and organizational engagement. Planned and coordinated the project, connecting employees to behind-the-scenes motorsport production and operations with a high-impact, aligned journey.',
                hl1: 'Co-creation of concept with HR',
                hl2: 'Logistics planning and guest management',
                hl3: 'On-site execution coordination',
                hl4: 'Strengthening of purpose and organizational culture'
            },
            ctio: {
                role: 'VIP Coordination Project Manager',
                desc: 'Premium event for the technology division, bringing CTIOs and leaders together for an exclusive racetrack experience focused on networking, prospecting, and strategic relationship-building. Led project planning, VIP logistics, and partner coordination to ensure delivery aligned with branding and relationship goals.',
                hl1: 'Premium hospitality and guest relations',
                hl2: 'Integrated format between technology and motorsport',
                hl3: 'High-end experience production',
                hl4: 'Strategic focus on relationships and acquisition'
            },
            f4: {
                role: 'Project Manager - F1 Ecosystem',
                desc: 'Coordinated Formula 4 Brazil for two consecutive years within the São Paulo Formula 1 GP ecosystem, acting as the strategic interface between teams. Responsible for aligning schedules, safety, access, transport, and track operations in a high-complexity, high-pressure environment.',
                hl1: 'F4 delegation logistics management',
                hl2: 'Operational interface between F1 and F4 ecosystems',
                hl3: 'Transport, travel, and track operations coordination',
                hl4: 'Execution recognized for high synchronization across fronts'
            },
            siasp: {
                role: 'Project Manager.',
                desc: 'Project Manager for the FIA WEC Rolex 6 Hours of São Paulo booth, responsible for full planning and execution of one of the most visited stands. Scope included concept, scenography, daily operations, and the coordination of teams, partners, and public service flows across 10 successful event days.',
                hl1: 'Strategic planning and execution of the stand project',
                hl2: 'Daily operations management, logistics, and public flow',
                hl3: 'Scenography, vendors, and partner coordination',
                hl4: 'Continuous communication with the project team and stakeholders',
                hl5: 'Briefing development, staffing, and on-site leadership'
            },
            tags: {
                operations: 'Operations',
                cx: 'CX',
                leadership: 'Leadership',
                logistics: 'Logistics',
                scale: 'Scaled Logistics',
                suppliers: 'Suppliers',
                guinness: 'Guinness Planning',
                experience: 'Visitor experience and high engagement volume',
                strategy: 'Strategy',
                intOps: 'Int. Ops',
                stakeholders: 'Stakeholders',
                hospitality: 'Hospitality',
                pmo: 'PMO',
                infrastructure: 'Infrastructure',
                integration: 'Integration',
                planning: 'Planning',
                corporate: 'Corporate Events',
                internal: 'Internal Comms',
                engagement: 'Engagement',
                vip: 'VIP/Corporate',
                relationship: 'Relationship',
                activation: 'Activation',
                intCoord: 'Int. Coordination',
                motorsport: 'Motorsport',
                pressure: 'Pressure',
                garantia: 'Brand consistency assurance',
                cenografia: 'Brand scenography'
            }
        },
        cta: {
            title: 'Ready to raise the bar?',
            subtitle: 'Let’s turn your next idea into an unforgettable experience.',
            button: 'Start a Project'
        },
        footer: {
            desc: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucharest – Romania',
            descLong: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucharest – Romania',
            explore: 'Explore',
            about: 'About',
            solutions: 'Solutions',
            achievements: 'Achievements',
            cases: 'Cases',
            contact: 'Contact',
            location: 'Bucharest – Romania',
            rights: '© 2026 MALB Events & Consulting. All rights reserved.',
            rightsShort: '© 2026 MALB Events & Consulting.',
            credits: 'Designed by DestinoConectado'
        },
        aboutPage: {
            kicker: 'Institutional',
            title: 'About us.',
            p1: 'We are an event consulting firm specialized in operations, logistics, project management, and audience experience, with end-to-end delivery — from strategic planning to on-site execution.',
            p2: 'We bring experienced leadership and a practical vision built on strong experience in large-scale projects in Brazil, Argentina, and Uruguay, with a strong presence in motorsport, premium hospitality, and strategic corporate events. We act as the point of convergence between internal teams, suppliers, sponsors, and event organizers, ensuring schedule alignment, clear flows, safety, and consistent experiences from start to finish.',
            p3: 'Our work goes beyond execution: we design experience journeys, structure processes, and support strategic decisions, ensuring each interaction — from public access to VIP hospitality — is fluid, coherent, and aligned with the objectives of the project and the brands involved.',
            p4: 'Our differentiator is leadership in complex environments. We turn operational challenges into well-orchestrated deliveries through structured planning, precise communication, risk awareness, and track rhythm. This allows us to deliver excellence in both national and international events with tens of thousands of people and exclusive experiences for C-levels, brand activations, and high-visibility multi-stakeholder projects.',
            p5: 'Organized complexity. Well-delivered experiences. Leadership in the field.',
            leader: {
                kicker: 'Leadership',
                title: 'Who is Larissa Coelho<br>',
                role: 'Head of MALB*',
                p1: 'Larissa is a professional specialist in Event Operations for large, medium, and small events, Customer Experience, and Project Management, with over 5 years of experience leading large-scale projects that combine creativity, structure, and precision.',
                p2: 'Throughout her career, she coordinated high-complexity national and international productions, including FIA WEC – Rolex 6 Hours of São Paulo, Stock Car Championship, BH Stock Festival, and the award-winning Mr Moo Festival – 10-Year Special Edition, which achieved a Guinness World Record in 2025.',
                p3: 'Her work integrates strategic planning, financial management, and service design, focusing on building consistent, efficient, and audience-centered journeys, ensuring each project delivers not only operational results but also memorable experiences aligned with brand purpose.',
                quote: '"I am passionate about turning complex operations into smooth, people-centered experiences that connect brands, teams, and audiences."',
                cta: 'Learn more'
            }
        },
        contact: {
            title: 'Have a project in mind?<br><span class="highlight">Tell us about it!</span>',
            desc: 'Great experiences start with a good strategy. Your challenge is our work.',
            emailLabel: 'Talk to us',
            locationLabel: 'Based in',
            formTitle: 'Send a message',
            nameLabel: 'Your name',
            emailField: 'Email',
            messageLabel: 'About the project...',
            submit: 'Send your idea',
            namePlaceholder: ' ',
            emailPlaceholder: ' ',
            messagePlaceholder: ' '
        }
    },
    fr: {
        nav: { about: 'Qui sommes-nous', solutions: 'Solutions', contact: 'Contact', language: 'Langue' },
        about: {
            title: 'Nous brisons les codes...<br><span class="highlight">...pour élever le niveau.</span>',
            p1: 'Notre parcours a commencé par une question simple : pourquoi le marché ne livre-t-il que ce qui est demandé, et non ce qui est nécessaire ? Nous avons compris que pour nous démarquer, il nous fallait plus que la logistique. Nous avions besoin d’<strong>intelligence</strong>.',
            highlight: "Comprendre l’entreprise. Ressentir la marque. Connaître le 'comment' et le 'pourquoi'.",
            p2: 'Nous avons décidé de ne pas travailler pour le portfolio, mais pour le partenaire. Nous avons mis à l’épreuve ce savoir stratégique. Le résultat ? Des expériences qui ne font pas que se produire, elles marquent.',
            p3: 'Localement ou globalement, MALB* porte l’exécution pour que vous puissiez vous concentrer sur le succès. <span class="signature">Le savoir est un impact.</span>',
            caption: 'Larissa Coelho Fondatrice & Head de Production MALB'
        },
        solutions: {
            title: '<span class="highlight">Solutions</span>',
            card1: { title: 'Stratégie & Gestion Opérationnelle', desc: 'Du concept à l’exécution pour des événements de tous types.' },
            card2: { title: 'Customer Experience', desc: 'Création de parcours de service qui renforcent la satisfaction et la fidélité.' },
            card3: { title: 'Optimisation des Processus', desc: 'Création de systèmes opérationnels qui améliorent l’efficacité et la responsabilité.' },
            card4: { title: 'Gestion de Projet & Finance', desc: 'Planification des ressources, budgets et rapports inter-départements.' },
            card5: { title: 'Leadership Interfonctionnel', desc: 'Coordination des parties prenantes en intégrant marketing, logistique, finance et production.' }
        },
        achievements: {
            title: '<span class="highlight">Réalisations</span>',
            card1: { title: 'Festival Mr Moo – Édition 10 ans', desc: 'En tant que Productrice Exécutive, édition qui a garanti au festival le titre du Guinness World Records comme le plus grand festival de barbecue au monde, avec de grands concerts, un public de milliers de personnes et plus de 700 professionnels impliqués.' },
            card2: { title: 'Leadership à grande échelle', desc: 'Gestion de plus de 30 événements nationaux de sport automobile, réunissant plus de 80 000 participants, avec excellence en logistique et hospitalité dans 3 pays et plus de 20 villes.' },
            card3: { title: 'Innovation opérationnelle', desc: 'Implantation pionnière d’authentification digitale par reconnaissance faciale, éliminant l’usage de plastiques, réduisant les coûts opérationnels et établissant un nouveau standard de durabilité pour l’accréditation.' },
            card4: { title: 'Transformation des systèmes', desc: 'Mise en place de systèmes intégrés de billetterie et de finance, augmentant la visibilité des données, réduisant les erreurs manuelles et accélérant la prise de décision stratégique.' },
            card5: { title: 'Efficacité organisationnelle', desc: 'Augmentation de 30 % de l’efficacité du flux de travail grâce à la refonte des processus et à la mise en place d’outils de coordination en temps réel.' },
            card6: { title: 'C’est MALB' }
        },
        portfolio: {
            title: 'Cas de <span class="highlight">succès</span>',
            subtitle: 'Explorez le parcours',
            stock: {
                role: 'Sr Producer & Coord. Opérations',
                desc: 'Au cours de quatre ans, évolution du support administratif/financier vers la direction des opérations nationales de Stock Car, avec coordination de la logistique, de l’hospitalité et de l’expérience client sur des projets de grande échelle au Brésil. Participation à la planification et à la livraison de plus de 30 événements de motorsport, garantissant l’excellence opérationnelle, l’intégration entre équipes et la cohérence de l’expérience du public.',
                hl1: 'Planification et exécution logistique à grande échelle',
                hl2: 'Développement des processus de billetterie',
                hl3: 'Gestion de crise et service recovery',
                hl4: 'Standardisation du service au public'
            },
            mrmoo: {
                role: 'Executive Producer (Projet Guinness)',
                desc: 'Executive Producer sur un projet de haute complexité ayant abouti à la reconnaissance internationale du Guinness World Records comme le plus grand festival de barbecue au monde, avec focus sur l’opération et la gouvernance de l’événement.',
                hl1: 'Gestion de l’accréditation et contrôle des accès',
                hl2: 'Organisation et flux d’accès du public',
                hl3: 'Support direct à la direction'
            },
            wec: {
                role: 'Coordination Générale & Stratégique',
                desc: 'Coordination PMO du FIA WEC – Rolex 6 Hours of São Paulo, alignant équipes locales et internationales, assurant la gouvernance du projet et l’organisation de la planification à moyen et long terme. L’édition 2025 a accueilli plus de 80 000 personnes, avec continuité de la direction du planning 2026.',
                hl1: 'Gestion intégrée de projets de production internationale (80k+ participants)',
                hl2: 'Gouvernance et gestion des stakeholders institutionnels et sponsors',
                hl3: 'Support direct à la direction avec structuration des flux d’information stratégiques',
                hl4: 'Élaboration et consolidation de rapports de gestion, garantissant visibilité exécutive et alignement inter-équipes'
            },
            bh: {
                role: 'Chef de Projet Opérations',
                desc: 'Événement organisé au Mineirão intégrant motorsport, musique et divertissement en production multi-expériences. En tant que PM, alignment entre Stock Car et l’équipe du festival, coordination des opérations, gestion des plannings et infrastructure, garantissant flux public, sécurité et cohérence de livraison à grande échelle.',
                hl1: 'Intégration des équipes et structuration de la gouvernance',
                hl2: 'Gestion logistique complexe en environnement de stade',
                hl3: 'Garantie de cohérence de l’expérience du public à grande échelle',
                hl4: 'Gestion des accréditations et de l’infrastructure'
            },
            juntos: {
                role: 'Chef de Projet Engagement',
                desc: 'Expérience d’entreprise interne sur le circuit, développée avec le département RH pour renforcer la culture et l’engagement organisationnel. Planification et coordination du projet, connectant les collaborateurs aux coulisses de la production et des opérations du motorsport, avec une livraison à fort impact, alignée et fluide.',
                hl1: 'Co-création du concept avec le RH',
                hl2: 'Planification logistique et gestion des invités',
                hl3: 'Coordination de l’exécution on-site',
                hl4: 'Renforcement du purpose et de la culture organisationnelle'
            },
            ctio: {
                role: 'Chef de Projet Coordination VIP',
                desc: 'Événement premium pour la division technologique, réunissant CTIOs et leaders pour une expérience exclusive sur circuit, axée sur networking, prospection et relation stratégique. Planification du projet, logistique VIP et coordination des partenaires, garantissant une livraison alignée au branding et aux objectifs relationnels.',
                hl1: 'Hospitalité premium et guest relations',
                hl2: 'Développement d’un format intégré entre technologie et motorsport',
                hl3: 'Production d’expérience haut de gamme',
                hl4: 'Focus stratégique sur relation et acquisition'
            },
            f4: {
                role: 'Chef de Projet - Écosystème F1',
                desc: 'Coordination de la Formule 4 Brésil pendant deux années consécutives au sein de l’écosystème du GP de Formule 1 à São Paulo, en tant qu’interface stratégique entre les équipes. Responsabilité de l’alignement des plannings, sécurité, accès, transport et opérations de piste, dans un environnement de haute complexité et pression.',
                hl1: 'Gestion logistique de la délégation F4',
                hl2: 'Interface opérationnelle entre les écosystèmes F1 et F4',
                hl3: 'Coordination transport, travel et opérations de piste',
                hl4: 'Exécution reconnue pour la haute synchronisation entre les fronts'
            },
            siasp: {
                role: 'Chef de Projet.',
                desc: 'Gestion de projet pour le stand FIA WEC Rolex 6 Heures de São Paulo, avec responsabilité complète du planning et de l’exécution d’un des stands les plus visités. Scope couvrant le concept, la scénographie, l’opération quotidienne et la coordination des équipes, partenaires et flux publics sur 10 jours de succès.',
                hl1: 'Planification stratégique et exécution du stand',
                hl2: 'Gestion opérationnelle quotidienne, logistique et flux public',
                hl3: 'Coordination de la scénographie, fournisseurs et partenaires',
                hl4: 'Communication continue avec l’équipe projet et les parties prenantes',
                hl5: 'Briefing, staffing et leadership on-site'
            },
            tags: {
                operations: 'Opérations',
                cx: 'CX',
                leadership: 'Leadership',
                logistics: 'Logistique',
                scale: 'Logistique à grande échelle',
                suppliers: 'Fournisseurs',
                guinness: 'Planification Guinness',
                experience: 'Expérience visiteur et fort volume d’engagement',
                strategy: 'Stratégie',
                intOps: 'Ops. Int.',
                stakeholders: 'Parties prenantes',
                hospitality: 'Hospitalité',
                pmo: 'PMO',
                infrastructure: 'Infrastructure',
                integration: 'Intégration',
                planning: 'Planification',
                corporate: 'Événements d’entreprise',
                internal: 'Communication interne',
                engagement: 'Engagement',
                vip: 'VIP/Corporate',
                relationship: 'Relation',
                activation: 'Activation',
                intCoord: 'Coord. Int.',
                motorsport: 'Motorsport',
                pressure: 'Pression',
                garantia: 'Garantie de cohérence de marque',
                cenografia: 'Scénographie pour la marque'
            }
        },
        cta: {
            title: 'Prêt à élever le niveau ?',
            subtitle: 'Transformons votre prochaine idée en une expérience inoubliable.',
            button: 'Démarrer un projet'
        },
        footer: {
            desc: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucarest – Roumanie',
            descLong: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucarest – Roumanie',
            explore: 'Explorer',
            about: 'Qui sommes-nous',
            solutions: 'Solutions',
            achievements: 'Réalisations',
            cases: 'Cas',
            contact: 'Contact',
            location: 'Bucharest – Romania',
            rights: '© 2026 MALB Events & Consulting. Tous droits réservés.',
            rightsShort: '© 2026 MALB Events & Consulting.',
            credits: 'Designed by DestinoConectado'
        },
        aboutPage: {
            kicker: 'Institutionnel',
            title: 'Qui sommes-nous.',
            p1: 'Nous sommes un cabinet de conseil en événements spécialisé en opérations, logistique, gestion de projet et expérience du public, avec une approche de bout en bout — de la planification stratégique à l’exécution terrain.',
            p2: 'Nous réunissons un leadership expérimenté et une vision pratique, construits à partir d’une solide expérience de projets de grande échelle au Brésil, en Argentine et en Uruguay, avec une forte présence en motorsport, hospitalité premium et événements d’entreprise stratégiques. Nous agissons comme point de convergence entre équipes internes, fournisseurs, sponsors et organisation de l’événement, garantissant alignement du calendrier, clarté des flux, sécurité et expériences cohérentes du début à la fin.',
            p3: 'Notre action va au-delà de l’exécution : nous dessinons des parcours d’expérience, structurons les processus et soutenons les décisions stratégiques, en veillant à ce que chaque interaction — de l’accès du public à l’hospitalité VIP — soit fluide, cohérente et alignée aux objectifs du projet et des marques impliquées.',
            p4: 'Notre différence réside dans le leadership en environnements complexes. Nous transformons les défis opérationnels en livraisons bien orchestrées grâce à une planification structurée, une communication précise, une vision du risque et un rythme de piste. Cela nous permet de livrer avec excellence des événements nationaux et internationaux réunissant des dizaines de milliers de personnes, ainsi que des expériences exclusives pour C-levels, activations de marque et projets multi-stakeholders à forte visibilité.',
            p5: 'Complexité organisée. Expériences bien livrées. Leadership sur le terrain.',
            leader: {
                kicker: 'Leadership',
                title: 'Qui est Larissa Coelho<br>',
                role: 'Head de MALB*',
                p1: 'Larissa est une professionnelle spécialisée en opérations d’événements de grande, moyenne et petite taille, expérience client et gestion de projet, avec plus de 5 ans d’expérience à diriger des projets de grande échelle alliant créativité, structure et précision.',
                p2: 'Au cours de sa carrière, elle a coordonné des productions nationales et internationales de haute complexité, notamment FIA WEC – Rolex 6 Hours of São Paulo, Stock Car Championship, BH Stock Festival et le primé Mr Moo Festival – Édition spéciale 10 ans, qui a obtenu un record Guinness en 2025.',
                p3: 'Son travail intègre planification stratégique, gestion financière et design de services, avec un focus sur des parcours cohérents, efficaces et centrés sur le public, garantissant que chaque projet délivre non seulement des résultats opérationnels mais aussi des expériences mémorables alignées au purpose des marques.',
                quote: '"Je suis passionnée par la transformation d’opérations complexes en expériences fluides et centrées sur les personnes."',
                cta: 'En savoir plus'
            }
        },
        contact: {
            title: 'Un projet en tête?<br><span class="highlight">Parlez-nous-en !</span>',
            desc: 'Les grandes expériences commencent par une bonne stratégie. Votre défi est notre travail.',
            emailLabel: 'Parlez avec nous',
            locationLabel: 'Base',
            formTitle: 'Envoyer un message',
            nameLabel: 'Votre nom',
            emailField: 'E-mail',
            messageLabel: 'À propos du projet...',
            submit: 'Envoyez votre idée',
            namePlaceholder: ' ',
            emailPlaceholder: ' ',
            messagePlaceholder: ' '
        }
    },
    es: {
        nav: { about: 'Quiénes somos', solutions: 'Soluciones', contact: 'Contacto', language: 'Idioma' },
        about: {
            title: 'Rompemos el patrón...<br><span class="highlight">...para elevar el nivel.</span>',
            p1: 'Nuestro recorrido comenzó con una pregunta simple: ¿por qué el mercado entrega solo lo que se pide y no lo que se necesita? Nos dimos cuenta de que, para destacar, necesitábamos más que logística. Necesitábamos <strong>inteligencia</strong>.',
            highlight: "Entender el negocio. Sentir la marca. Saber el 'cómo' y el 'por qué'.",
            p2: 'Decidimos que no trabajaríamos para el portafolio, sino para el socio. Tomamos el poder de ese conocimiento estratégico y lo pusimos a prueba. ¿El resultado? Experiencias que no solo suceden, sino que marcan.',
            p3: 'Sea a nivel local o global, MALB* asume el peso de la ejecución para que tú te enfoques en el éxito. <span class="signature">El conocimiento es impacto.</span>',
            caption: 'Larissa Coelho Founder & Head de Producción MALB'
        },
        solutions: {
            title: '<span class="highlight">Soluciones</span>',
            card1: { title: 'Estrategia y Gestión Operativa', desc: 'Del concepto a la ejecución para eventos de todos los tipos.' },
            card2: { title: 'Customer Experience', desc: 'Creamos recorridos de servicio que fortalecen la satisfacción y la fidelidad.' },
            card3: { title: 'Optimización de Procesos y Flujos', desc: 'Creación de sistemas operativos que mejoran la eficiencia y la responsabilidad.' },
            card4: { title: 'Gestión de Proyectos y Control Financiero', desc: 'Planificación de recursos, presupuestos e informes entre áreas.' },
            card5: { title: 'Liderazgo Interfuncional', desc: 'Coordinación de stakeholders integrando marketing, logística, finanzas y producción.' }
        },
        achievements: {
            title: '<span class="highlight">Logros</span>',
            card1: { title: 'Festival Mr Moo – Edición 10 Años', desc: 'Como Productora Ejecutiva, edición que garantizó al evento el título de Guinness World Records como el Mayor Festival de Barbacoa del Mundo, con grandes shows, público de miles de personas y más de 700 profesionales involucrados.' },
            card2: { title: 'Liderazgo a Gran Escala', desc: 'Gestión de más de 30 eventos nacionales de automovilismo, reuniendo a más de 80.000 participantes, con excelencia en logística y hospitalidad en 3 países y más de 20 ciudades.' },
            card3: { title: 'Innovación Operativa', desc: 'Implementación pionera de autenticación digital por reconocimiento facial, eliminando el uso de plásticos, reduciendo costos operativos y estableciendo un nuevo estándar de sostenibilidad en la acreditación.' },
            card4: { title: 'Transformación de Sistemas', desc: 'Implementación de sistemas integrados de ticketing y finanzas, ampliando la visibilidad de datos, reduciendo errores manuales y acelerando la toma de decisiones estratégicas.' },
            card5: { title: 'Eficiencia Organizacional', desc: 'Aumento del 30% en la eficiencia del flujo de trabajo mediante la reformulación de procesos y la implementación de herramientas de coordinación en tiempo real.' },
            card6: { title: 'Esto es MALB' }
        },
        portfolio: {
            title: 'Casos de <span class="highlight">éxito</span>',
            subtitle: 'Explora la trayectoria',
            stock: {
                role: 'Sr Producer & Coord. Operaciones',
                desc: 'A lo largo de cuatro años, evolución del soporte administrativo/financiero al liderazgo de operaciones nacionales en Stock Car, con actuación en la coordinación de logística, hospitalidad y customer experience en proyectos de gran escala en Brasil. Participación en la planificación y entrega de más de 30 eventos de motorsport, garantizando excelencia operativa, integración entre áreas y consistencia en la experiencia del público.',
                hl1: 'Planificación y ejecución de logística a gran escala',
                hl2: 'Desarrollo de procesos de ticketing',
                hl3: 'Gestión de crisis y service recovery',
                hl4: 'Estandarización de atención al público'
            },
            mrmoo: {
                role: 'Executive Producer (Guinness Project)',
                desc: 'Actuación como Executive Producer en un proyecto de alta complejidad que resultó en el reconocimiento internacional de Guinness World Records como el Mayor Festival de Barbacoa del Mundo, con foco en la operación y gobernanza del evento.',
                hl1: 'Gestión de acreditaciones y control de accesos',
                hl2: 'Organización y flujo de acceso del público',
                hl3: 'Soporte directo a la dirección'
            },
            wec: {
                role: 'Coordinación General y Estratégica',
                desc: 'Actuación en PMO en la coordinación estratégica del FIA WEC – Rolex 6 Horas de São Paulo, promoviendo el alineamiento entre equipos locales e internacionales, la gobernanza del proyecto y la organización de la planificación de medio y largo plazo. La edición 2025 recibió más de 80.000 personas, con continuidad en el liderazgo de la planificación de la edición 2026.',
                hl1: 'Gestión integrada de proyectos de producción internacional (80k+ participantes)',
                hl2: 'Gobernanza y gestión de stakeholders institucionales y patrocinadores',
                hl3: 'Soporte directo a la dirección, estructurando flujos estratégicos de información',
                hl4: 'Elaboración y consolidación de informes gerenciales, garantizando visibilidad ejecutiva y alineamiento entre áreas'
            },
            bh: {
                role: 'Project Manager Operaciones',
                desc: 'Evento realizado en el Mineirão que integró motorsport, música y entretenimiento en una producción multi-experiencia. Actuación como PM garantizando el alineamiento entre Stock Car y el equipo del festival, con coordinación de operaciones, gestión de cronogramas e infraestructura, asegurando flujo del público, seguridad y consistencia de entrega a gran escala.',
                hl1: 'Integración de equipos y estructuración de gobernanza',
                hl2: 'Gestión de logística compleja en entorno de estadio',
                hl3: 'Garantía de consistencia de la experiencia del público a gran escala',
                hl4: 'Gestión de acreditación e infraestructura'
            },
            juntos: {
                role: 'Project Manager Engagement',
                desc: 'Experiencia corporativa interna realizada en el autódromo, desarrollada en asociación con el área de RH para fortalecer cultura y compromiso organizacional. Actuación en planificación y coordinación del proyecto, conectando colaboradores con los bastidores de la producción y operaciones del motorsport, con entrega de una jornada de alto impacto, alineada y fluida.',
                hl1: 'Co-creación de concepto en asociación con RH',
                hl2: 'Planificación logística y gestión de invitados',
                hl3: 'Coordinación de la ejecución on-site',
                hl4: 'Fortalecimiento del propósito y cultura organizacional'
            },
            ctio: {
                role: 'Project Manager Coordinación VIP',
                desc: 'Evento premium para la división de tecnología, reuniendo CTIOs y líderes en una experiencia exclusiva en el autódromo, con foco en networking, prospección y relación estratégica. Actuación en la planificación del proyecto, logística VIP y coordinación de socios, asegurando una entrega alineada al branding y a los objetivos de relación.',
                hl1: 'Hospitalidad premium y guest relations',
                hl2: 'Desarrollo de formato integrado entre tecnología y motorsport',
                hl3: 'Producción de experiencia de alto nivel',
                hl4: 'Foco estratégico en relacionamiento y adquisición'
            },
            f4: {
                role: 'Project Manager - Ecosistema F1',
                desc: 'Coordinación de la Fórmula 4 Brasil por dos años consecutivos dentro del ecosistema del GP de Fórmula 1 en São Paulo, actuando como interfaz estratégica entre los equipos involucrados. Responsabilidad por el alineamiento de cronogramas, seguridad, accesos, transporte y operación de pista, en un ambiente de alta complejidad, presión y precisión.',
                hl1: 'Gestión de logística de la delegación F4',
                hl2: 'Interfaz y alineamiento operacional entre ecosistemas F1 y F4',
                hl3: 'Coordinación de transporte, travel y operación de pista',
                hl4: 'Ejecución reconocida por alta sincronización entre frentes'
            },
            siasp: {
                role: 'Project Manager.',
                desc: 'Gestión del proyecto del stand FIA WEC Rolex 6 Horas de São Paulo, con responsabilidad total por la planificación y ejecución de uno de los stands más visitados. El alcance incluyó concepto, escenografía, operación diaria y coordinación de equipos, socios y flujos de público durante 10 días.',
                hl1: 'Planificación estratégica y ejecución del proyecto del stand',
                hl2: 'Gestión de operación diaria, logística y flujos de público',
                hl3: 'Coordinación de escenografía, proveedores y socios',
                hl4: 'Comunicación continua con el equipo del proyecto y stakeholders',
                hl5: 'Briefing, staffing y liderazgo on-site'
            },
            tags: {
                operations: 'Operaciones',
                cx: 'CX',
                leadership: 'Liderazgo',
                logistics: 'Logística',
                scale: 'Logística Escala',
                suppliers: 'Proveedores',
                guinness: 'Guinness Planning',
                experience: 'Experiencia del visitante y alto volumen de engagement',
                strategy: 'Estrategia',
                intOps: 'Operaciones Int.',
                stakeholders: 'Stakeholders',
                hospitality: 'Hospitalidad',
                pmo: 'PMO',
                infrastructure: 'Infraestructura',
                integration: 'Integración',
                planning: 'Planificación',
                corporate: 'Eventos Corporativos',
                internal: 'Comunicación Interna',
                engagement: 'Engagement',
                vip: 'VIP/Corporate',
                relationship: 'Relacionamiento',
                activation: 'Activación',
                intCoord: 'Coordinación Int.',
                motorsport: 'Motorsport',
                pressure: 'Presión',
                garantia: 'Garantía de consistencia de marca',
                cenografia: 'Escenografía para la marca'
            }
        },
        cta: {
            title: '¿Listos para elevar el nivel?',
            subtitle: 'Transformemos tu próxima idea en una experiencia inolvidable.',
            button: 'Iniciar proyecto'
        },
        footer: {
            desc: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucarest – Rumanía',
            descLong: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, Bucarest – Rumanía',
            explore: 'Explorar',
            about: 'Quiénes somos',
            solutions: 'Soluciones',
            achievements: 'Logros',
            cases: 'Casos',
            contact: 'Contacto',
            location: 'Bucharest – Romania',
            rights: '© 2026 MALB Events & Consulting. Todos los derechos reservados.',
            rightsShort: '© 2026 MALB Events & Consulting.',
            credits: 'Designed by DestinoConectado'
        },
        aboutPage: {
            kicker: 'Institucional',
            title: 'Quiénes somos.',
            p1: 'Somos una consultoría de eventos especializada en operaciones, logística, gestión de proyectos y experiencia del público, con actuación de punta a punta — del planeamiento estratégico a la entrega en campo.',
            p2: 'Reunimos liderazgo experimentado y visión práctica, construidos a partir de una vivencia sólida en proyectos de gran escala en Brasil, Argentina y Uruguay, con fuerte presencia en motorsport, hospitalidad premium y eventos corporativos estratégicos. Actuamos como punto de convergencia entre equipos internos, proveedores, patrocinadores y la organización del evento, garantizando alineamiento de cronograma, claridad de flujos, seguridad y experiencias consistentes del inicio al fin.',
            p3: 'Nuestra actuación va más allá de la ejecución: diseñamos jornadas de experiencia, estructuramos procesos y apoyamos decisiones estratégicas, asegurando que cada interacción — del acceso del público a la hospitalidad VIP — sea fluida, coherente y alineada a los objetivos del proyecto y de las marcas involucradas.',
            p4: 'Nuestro diferencial está en el liderazgo en ambientes complejos. Transformamos desafíos operativos en entregas bien orquestadas por medio de planeamiento estructurado, comunicación precisa, visión de riesgo y ritmo de pista. Esto nos permite entregar con excelencia tanto eventos nacionales e internacionales con decenas de miles de personas, como experiencias exclusivas para C-levels, activaciones de marca y proyectos multistakeholder de alta visibilidad.',
            p5: 'Complejidad organizada. Experiencias bien entregadas. Liderazgo en campo.',
            leader: {
                kicker: 'Liderazgo',
                title: 'Quién es Larissa Coelho<br>',
                role: 'Head de MALB*',
                p1: 'Larissa es una profesional especialista en Operaciones de Eventos de gran, mediano y pequeño porte, Experiencia del Cliente y Gestión de Proyectos, con más de 5 años de experiencia liderando proyectos de gran escala que combinan creatividad, estructura y precisión.',
                p2: 'A lo largo de su trayectoria, coordinó producciones nacionales e internacionales de alta complejidad, incluyendo el FIA WEC – Rolex 6 Horas de São Paulo, el Stock Car Championship, el BH Stock Festival y el premiado Festival Mr Moo – Edición Especial de 10 Años, que conquistó un récord mundial del Guinness en 2025.',
                p3: 'Su trabajo integra planeamiento estratégico, gestión financiera y diseño de servicios, con foco en construir jornadas consistentes, eficientes y centradas en el público, garantizando que cada proyecto entregue no solo resultados operativos, sino también experiencias memorables y alineadas al propósito de las marcas.',
                quote: '"Me apasiona transformar operaciones complejas en experiencias fluidas y centradas en las personas, que conectan marcas, equipos y públicos."',
                cta: 'Saber más'
            }
        },
        contact: {
            title: '¿Tienes un proyecto en mente?<br><span class="highlight">¡Cuéntanos!</span>',
            desc: 'Las grandes experiencias comienzan con una buena estrategia. Tu desafío es nuestro trabajo.',
            emailLabel: 'Habla con nosotros',
            locationLabel: 'Base',
            formTitle: 'Envía un mensaje',
            nameLabel: 'Tu nombre',
            emailField: 'E-mail',
            messageLabel: 'Sobre el proyecto...',
            submit: 'Envía tu idea',
            namePlaceholder: ' ',
            emailPlaceholder: ' ',
            messagePlaceholder: ' '
        }
    },
    ro: {
        nav: { about: 'Despre noi', solutions: 'Soluții', contact: 'Contact', language: 'Limbă' },
        about: {
            title: 'Spargem tiparul...<br><span class="highlight">...pentru a ridica nivelul.</span>',
            p1: 'Călătoria noastră a început cu o întrebare simplă: de ce piața livrează doar ceea ce se cere și nu ceea ce este necesar? Am realizat că, pentru a ne evidenția, aveam nevoie de mai mult decât logistică. Aveam nevoie de <strong>inteligență</strong>.',
            highlight: "Înțelege afacerea. Simte brandul. Cunoaște 'cum' și 'de ce'.",
            p2: 'Am decis să nu lucrăm pentru portofoliu, ci pentru partener. Am pus la încercare această cunoaștere strategică. Rezultatul? Experiențe care nu doar se întâmplă, ci lasă urme.',
            p3: 'Local sau global, MALB* preia execuția ca tu să te concentrezi pe succes. <span class="signature">Cunoașterea înseamnă impact.</span>',
            caption: 'Larissa Coelho Fondatoare & Head de Producție MALB'
        },
        solutions: {
            title: '<span class="highlight">Soluții</span>',
            card1: { title: 'Strategie & Management Operațional', desc: 'De la concept la execuție pentru evenimente de toate tipurile.' },
            card2: { title: 'Customer Experience', desc: 'Crearea de parcursuri de servicii care cresc satisfacția și loialitatea.' },
            card3: { title: 'Optimizarea proceselor', desc: 'Crearea de sisteme operaționale care îmbunătățesc eficiența și responsabilitatea.' },
            card4: { title: 'Management de Proiect & Control Financiar', desc: 'Planificarea resurselor, bugete și rapoarte între departamente.' },
            card5: { title: 'Leadership interfuncțional', desc: 'Coordonarea stakeholderilor integrând marketing, logistică, finanțe și producție.' }
        },
        achievements: {
            title: '<span class="highlight">Realizări</span>',
            card1: { title: 'Festivalul Mr Moo – Ediția 10 ani', desc: 'Ca Executive Producer, ediție care a adus evenimentului titlul Guinness World Records pentru cel mai mare festival de grătar din lume, cu show-uri mari, mii de participanți și peste 700 de profesioniști implicați.' },
            card2: { title: 'Leadership la scară mare', desc: 'Gestionarea a peste 30 de evenimente naționale de motorsport, reunind peste 80.000 de participanți, cu excelență în logistică și ospitalitate în 3 țări și peste 20 de orașe.' },
            card3: { title: 'Inovație operațională', desc: 'Implementare pionieră a autentificării digitale prin recunoaștere facială, eliminând utilizarea plasticului, reducând costurile operaționale și stabilind un nou standard de sustenabilitate în acreditare.' },
            card4: { title: 'Transformarea sistemelor', desc: 'Implementarea de sisteme integrate de ticketing și financiar, extinzând vizibilitatea datelor, reducând erorile manuale și accelerând deciziile strategice.' },
            card5: { title: 'Eficiență organizațională', desc: 'Creștere de 30% a eficienței fluxului de lucru prin reproiectarea proceselor și implementarea de instrumente de coordonare în timp real.' },
            card6: { title: 'Asta este MALB' }
        },
        portfolio: {
            title: 'Studii de <span class="highlight">succes</span>',
            subtitle: 'Explorați parcursul',
            stock: {
                role: 'Sr Producer & Coordonator Operațiuni',
                desc: 'În patru ani, evoluție de la suport administrativ/financiar la conducerea operațiunilor naționale în Stock Car, coordonând logistică, ospitalitate și experiența clientului în proiecte de mare amploare în Brazilia. Participare la planificarea și livrarea a peste 30 de evenimente de motorsport, asigurând excelență operațională, integrare între echipe și consistență în experiența publicului.',
                hl1: 'Planificare și execuție logistică la scară mare',
                hl2: 'Dezvoltarea proceselor de ticketing',
                hl3: 'Gestionarea crizelor și service recovery',
                hl4: 'Standardizarea serviciului către public'
            },
            mrmoo: {
                role: 'Executive Producer (Guinness Project)',
                desc: 'Executive Producer într-un proiect de mare complexitate care a adus recunoașterea internațională Guinness World Records pentru cel mai mare festival de grătar din lume, cu focus pe operațiunile și guvernanța evenimentului.',
                hl1: 'Managementul acreditărilor și controlul accesului',
                hl2: 'Organizarea fluxului de acces al publicului',
                hl3: 'Suport direct pentru leadership'
            },
            wec: {
                role: 'Coordonare Generală & Strategică',
                desc: 'Coordonare PMO pentru FIA WEC – Rolex 6 Hours of São Paulo, aliniind echipe locale și internaționale, asigurând guvernanța proiectului și organizarea planificării pe termen mediu și lung. Ediția 2025 a avut peste 80.000 de persoane, cu continuitate în leadershipul planificării pentru 2026.',
                hl1: 'Management integrat al proiectelor de producție internațională (80k+ participanți)',
                hl2: 'Guvernanță și management al stakeholderilor instituționali și sponsorilor',
                hl3: 'Suport direct pentru leadership, cu structurarea fluxurilor strategice de informații',
                hl4: 'Elaborare și consolidare de rapoarte manageriale, asigurând vizibilitate executivă și aliniere între echipe'
            },
            bh: {
                role: 'Project Manager Operațiuni',
                desc: 'Eveniment organizat la Mineirão care a integrat motorsport, muzică și divertisment într-o producție multi-experiență. Ca PM, am asigurat alinierea între Stock Car și echipa festivalului, coordonând operațiunile, managementul cronogramelor și infrastructura, garantând fluxul publicului, siguranța și consistența livrării la scară mare.',
                hl1: 'Integrarea echipelor și structurarea guvernanței',
                hl2: 'Management logistic complex într-un mediu de stadion',
                hl3: 'Garanția consistenței experienței publicului la scară mare',
                hl4: 'Managementul acreditărilor și infrastructurii'
            },
            juntos: {
                role: 'Project Manager Engajare',
                desc: 'Experiență corporativă internă pe circuit, dezvoltată împreună cu HR pentru a consolida cultura și engagementul organizațional. Planificare și coordonare a proiectului, conectând colaboratorii la culisele producției și operațiunilor motorsport, cu o livrare de impact, aliniată și fluidă.',
                hl1: 'Co-crearea conceptului împreună cu HR',
                hl2: 'Planificare logistică și managementul invitaților',
                hl3: 'Coordonarea execuției on-site',
                hl4: 'Consolidarea scopului și culturii organizaționale'
            },
            ctio: {
                role: 'Project Manager Coordonare VIP',
                desc: 'Eveniment premium pentru divizia de tehnologie, reunind CTIOs și lideri într-o experiență exclusivă pe circuit, cu focus pe networking, prospectare și relaționare strategică. Coordonare a planificării proiectului, logisticii VIP și partenerilor, asigurând o livrare aliniată cu brandingul și obiectivele de relaționare.',
                hl1: 'Ospitalitate premium și guest relations',
                hl2: 'Dezvoltarea unui format integrat între tehnologie și motorsport',
                hl3: 'Producție de experiență la standard înalt',
                hl4: 'Focus strategic pe relaționare și achiziție'
            },
            f4: {
                role: 'Project Manager - Ecosistem F1',
                desc: 'Coordonarea Formulei 4 Brazilia timp de doi ani consecutivi în cadrul ecosistemului GP de Formula 1 din São Paulo, ca interfață strategică între echipele implicate. Responsabilitate pentru alinierea cronogramelor, siguranță, acces, transport și operațiuni de pistă, într-un mediu de mare complexitate și presiune.',
                hl1: 'Gestionarea logisticii delegației F4',
                hl2: 'Interfață și aliniere operațională între ecosistemele F1 și F4',
                hl3: 'Coordonare transport, travel și operațiuni de pistă',
                hl4: 'Execuție recunoscută pentru sincronizare ridicată între fronturi'
            },
            siasp: {
                role: 'Project Manager.',
                desc: 'Manager de proiect pentru standul FIA WEC Rolex 6 Ore de São Paulo, cu responsabilitate completă pentru planificare și execuție. Scope-ul a inclus conceptul, scenografia, operațiunile zilnice și coordonarea echipelor, partenerilor și fluxurilor publice pe parcursul a 10 zile de eveniment.',
                hl1: 'Planificare strategică și execuție a proiectului standului',
                hl2: 'Managementul operațiunilor zilnice, logistică și flux public',
                hl3: 'Coordonarea scenografiei, furnizorilor și partenerilor',
                hl4: 'Comunicare continuă cu echipa de proiect și stakeholderi',
                hl5: 'Briefing, staffing și leadership on-site'
            },
            tags: {
                operations: 'Operațiuni',
                cx: 'CX',
                leadership: 'Leadership',
                logistics: 'Logistică',
                scale: 'Logistică la scară',
                suppliers: 'Furnizori',
                guinness: 'Planificare Guinness',
                experience: 'Experiența vizitatorilor și volum mare de engagement',
                strategy: 'Strategie',
                intOps: 'Op. Int.',
                stakeholders: 'Stakeholderi',
                hospitality: 'Ospitalitate',
                pmo: 'PMO',
                infrastructure: 'Infrastructură',
                integration: 'Integrare',
                planning: 'Planificare',
                corporate: 'Evenimente Corporate',
                internal: 'Comunicare internă',
                engagement: 'Engajare',
                vip: 'VIP/Corporate',
                relationship: 'Relaționare',
                activation: 'Activare',
                intCoord: 'Coord. Int.',
                motorsport: 'Motorsport',
                pressure: 'Presiune',
                garantia: 'Garanție de consistență a brandului',
                cenografia: 'Scenografie pentru brand'
            }
        },
        cta: {
            title: 'Gata să ridicăm nivelul?',
            subtitle: 'Hai să transformăm următoarea ta idee într-o experiență de neuitat.',
            button: 'Începe proiectul'
        },
        footer: {
            desc: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, București – România',
            descLong: 'MALB. Events & Consulting\nMALB Consulting & Events S.R.L. · CUI 52796517 · Reg. Comercial J2025082905007\nStr. Radu Captariu 15, Sector 2, București – România',
            explore: 'Explorează',
            about: 'Despre noi',
            solutions: 'Soluții',
            achievements: 'Realizări',
            cases: 'Studii',
            contact: 'Contact',
            location: 'Bucharest – Romania',
            rights: '© 2026 MALB Events & Consulting. Toate drepturile rezervate.',
            rightsShort: '© 2026 MALB Events & Consulting.',
            credits: 'Designed by DestinoConectado'
        },
        aboutPage: {
            kicker: 'Instituțional',
            title: 'Despre noi.',
            p1: 'Suntem o consultanță de evenimente specializată în operațiuni, logistică, management de proiect și experiența publicului, cu livrare end-to-end — de la planificarea strategică la execuția pe teren.',
            p2: 'Reunim leadership experimentat și o viziune practică, construite dintr-o experiență solidă în proiecte de mare amploare din Brazilia, Argentina și Uruguay, cu prezență puternică în motorsport, ospitalitate premium și evenimente corporate strategice. Acționăm ca punct de convergență între echipe interne, furnizori, sponsori și organizarea evenimentului, asigurând alinierea cronogramelor, claritatea fluxurilor, siguranța și experiențe consistente de la început până la final.',
            p3: 'Activitatea noastră merge dincolo de execuție: proiectăm parcursuri de experiență, structurăm procese și susținem decizii strategice, asigurând că fiecare interacțiune — de la accesul publicului la ospitalitatea VIP — este fluidă, coerentă și aliniată obiectivelor proiectului și brandurilor implicate.',
            p4: 'Diferențiatorul nostru este leadershipul în medii complexe. Transformăm provocările operaționale în livrări bine orchestrate prin planificare structurată, comunicare precisă, viziune asupra riscurilor și ritm de pistă. Asta ne permite să livrăm cu excelență atât evenimente naționale și internaționale cu zeci de mii de persoane, cât și experiențe exclusive pentru C-levels, activări de brand și proiecte multi-stakeholder de mare vizibilitate.',
            p5: 'Complexitate organizată. Experiențe livrate bine. Leadership pe teren.',
            leader: {
                kicker: 'Leadership',
                title: 'Cine este Larissa Coelho<br>',
                role: 'Head MALB*',
                p1: 'Larissa este specialistă în operațiuni de evenimente de mare, mediu și mică amploare, experiența clientului și management de proiect, cu peste 5 ani de experiență în conducerea proiectelor de mare amploare care combină creativitatea, structura și precizia.',
                p2: 'De-a lungul carierei sale, a coordonat producții naționale și internaționale de mare complexitate, inclusiv FIA WEC – Rolex 6 Hours of São Paulo, Stock Car Championship, BH Stock Festival și premiatul Mr Moo Festival – Ediția Specială de 10 ani, care a obținut un record Guinness în 2025.',
                p3: 'Activitatea ei integrează planificarea strategică, managementul financiar și designul de servicii, cu focus pe construirea unor parcursuri consistente, eficiente și centrate pe public, asigurând că fiecare proiect livrează nu doar rezultate operaționale, ci și experiențe memorabile aliniate scopului brandurilor.',
                quote: '"Sunt pasionată de transformarea operațiunilor complexe în experiențe fluide și centrate pe oameni."',
                cta: 'Află mai multe'
            }
        },
        contact: {
            title: 'Ai un proiect în minte?<br><span class="highlight">Spune-ne!</span>',
            desc: 'Experiențele mari încep cu o strategie bună. Provocarea ta este munca noastră.',
            emailLabel: 'Vorbește cu noi',
            locationLabel: 'Sediu',
            formTitle: 'Trimite un mesaj',
            nameLabel: 'Numele tău',
            emailField: 'Email',
            messageLabel: 'Despre proiect...',
            submit: 'Trimite ideea ta',
            namePlaceholder: ' ',
            emailPlaceholder: ' ',
            messagePlaceholder: ' '
        }
    }
};

const applyTranslations = (lang) => {
    const dictionary = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.dataset.i18n;
        const value = key.split('.').reduce((acc, part) => acc && acc[part], dictionary);
        if (value) {
            el.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.dataset.i18nHtml;
        const value = key.split('.').reduce((acc, part) => acc && acc[part], dictionary);
        if (value) {
            el.innerHTML = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.dataset.i18nPlaceholder;
        const value = key.split('.').reduce((acc, part) => acc && acc[part], dictionary);
        if (value !== undefined) {
            el.setAttribute('placeholder', value);
        }
    });
};

const updateLangToggle = (lang) => {
    if (!langToggle || !langMenu) {
        return;
    }

    const activeButton = langMenu.querySelector(`[data-lang="${lang}"]`);
    const code = langToggle.querySelector('.lang-code');
    const flag = langToggle.querySelector('.lang-flag');

    langButtons.forEach((button) => {
        button.setAttribute('aria-selected', button === activeButton ? 'true' : 'false');
    });

    if (activeButton && code && flag) {
        code.textContent = activeButton.dataset.label || lang.toUpperCase();
        flag.src = activeButton.dataset.flag || flag.src;
        const activeFlag = activeButton.querySelector('img');
        if (activeFlag) {
            flag.alt = activeFlag.alt;
        }
    }
};

if (langToggle && langMenu) {
    const storedLang = 'en';
    safeStorage.set('lang', storedLang);
    applyTranslations(storedLang);
    updateLangToggle(storedLang);

    langToggle.addEventListener('click', () => {
        if (!navLang) {
            return;
        }
        const isOpen = navLang.classList.toggle('open');
        langToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    langButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang || 'en';
            safeStorage.set('lang', lang);
            applyTranslations(lang);
            updateLangToggle(lang);
            if (navLang) {
                navLang.classList.remove('open');
                langToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });

    document.addEventListener('click', (event) => {
        if (!navLang || navLang.contains(event.target)) {
            return;
        }
        navLang.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLang) {
            navLang.classList.remove('open');
            langToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });
}

if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 0.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
    });
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

const panels = document.querySelectorAll('.panel');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });
panels.forEach(p => observer.observe(p));

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.opacity = '0';
        loader.style.pointerEvents = 'none';
        setTimeout(() => loader.remove(), 800);
    }
});

const slider = document.querySelector('.portfolio-container');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active'); 
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault(); 
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; 
        slider.scrollLeft = scrollLeft - walk;
    });
}

const navbar = document.querySelector('.navbar');
const hero = document.querySelector('.hero');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navbar) {
    if (!hero) {
        navbar.classList.add('visible');
    } else {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('visible');
            } else {
                navbar.classList.remove('visible');
            }
        });
    }
}

if (navToggle && navbar && navLinks) {
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('menu-open')) {
                navbar.classList.remove('menu-open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

const prevBtn = document.querySelector('.nav-arrow.prev');
const nextBtn = document.querySelector('.nav-arrow.next');

if (prevBtn && nextBtn && slider) {
    const getCards = () => Array.from(slider.querySelectorAll('.portfolio-card'));
    const getClosestIndex = () => {
        const cards = getCards();
        const currentLeft = slider.scrollLeft;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        cards.forEach((card, index) => {
            const distance = Math.abs(card.offsetLeft - currentLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    };

    const scrollToIndex = (index) => {
        const cards = getCards();
        if (!cards.length) {
            return;
        }
        const clampedIndex = Math.max(0, Math.min(index, cards.length - 1));
        slider.scrollTo({ left: cards[clampedIndex].offsetLeft, behavior: 'smooth' });
    };

    nextBtn.addEventListener('click', () => {
        const currentIndex = getClosestIndex();
        scrollToIndex(currentIndex + 1);
    });
    prevBtn.addEventListener('click', () => {
        const currentIndex = getClosestIndex();
        scrollToIndex(currentIndex - 1);
    });
}
