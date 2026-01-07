
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const TermsOfServicePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const ARTICLES = [
        // ... (content skipped for brevity, I will try to target specific blocks or I'll have to rewrite the file again if I can't target easily)

        {
            title: "ARTICLE 1 – OBJET, PORTÉE ET FONCTION DES CONDITIONS GÉNÉRALES D’UTILISATION",
            content: `Les présentes Conditions Générales d’Utilisation (ci-après les « CGU ») ont pour objet de définir, de manière exhaustive, juridiquement opposable et conforme au droit de l’Union européenne, les conditions dans lesquelles la société exploitant la plateforme VerifDoc met à disposition un service logiciel en mode SaaS reposant sur des technologies algorithmiques et d’intelligence artificielle dédiées à l’analyse technique de documents.
            Les CGU constituent un contrat-cadre numérique au sens de la jurisprudence constante de la Cour de justice de l’Union européenne, régissant l’ensemble des relations entre VerifDoc et tout utilisateur, indépendamment de tout autre document, communication commerciale ou usage antérieur.
            Elles ont vocation à prévenir tout risque de requalification juridique, toute extension implicite de responsabilité, et à encadrer strictement la nature, la finalité et les limites du service fourni.`
        },
        {
            title: "ARTICLE 2 – ACCEPTATION EXPRESSE, LIBRE ET ÉCLAIRÉE",
            content: `L’accès à la plateforme, la création d’un compte, l’utilisation du service ou la simple consultation des fonctionnalités de VerifDoc emportent acceptation expresse, libre, spécifique, éclairée et sans réserve des présentes CGU.
            Cette acceptation vaut consentement contractuel au sens du droit civil européen et reconnaissance préalable des limitations techniques, juridiques et fonctionnelles du service.
            Conformément à la jurisprudence communautaire (CJUE, aff. C-322/14), l’utilisateur reconnaît avoir disposé de la possibilité effective de prendre connaissance des CGU avant toute utilisation, excluant toute contestation ultérieure fondée sur un prétendu défaut d’information.`
        },
        {
            title: "ARTICLE 3 – CAPACITÉ JURIDIQUE, QUALITÉ ET POUVOIRS DE L’UTILISATEUR",
            content: `L’utilisateur déclare et garantit disposer de la pleine capacité juridique pour contracter, ou, lorsqu’il agit pour le compte d’une personne morale, disposer de l’ensemble des pouvoirs, délégations et autorisations nécessaires pour engager juridiquement ladite entité.
            Toute utilisation effectuée sans capacité ou sans pouvoir engage exclusivement la responsabilité de l’utilisateur, lequel garantit VerifDoc contre toute action, réclamation ou recours fondé sur un défaut de capacité ou de représentation.
            Cette clause est conforme aux principes de sécurité contractuelle reconnus par la jurisprudence communautaire en matière de services numériques transfrontaliers.`
        },
        {
            title: "ARTICLE 4 – DESTINATION EXCLUSIVEMENT PROFESSIONNELLE DU SERVICE",
            content: `La plateforme VerifDoc est conçue, développée et fournie exclusivement à destination de professionnels, entreprises, institutions, organisations, experts ou acteurs économiques agissant dans un cadre professionnel.
            Toute utilisation à des fins personnelles, domestiques, familiales ou assimilées est formellement exclue, sauf accord écrit exprès de VerifDoc.
            En conséquence, les dispositions relatives à la protection du consommateur au sens du droit européen ne sont pas applicables, conformément à la jurisprudence constante de la CJUE distinguant clairement consommateur et professionnel.`
        },
        {
            title: "ARTICLE 5 – DESCRIPTION TECHNIQUE ET FONCTIONNELLE DU SERVICE",
            content: `VerifDoc fournit un service d’analyse documentaire automatisée reposant sur des traitements algorithmiques, des modèles statistiques, des moteurs de corrélation et des technologies d’intelligence artificielle.
            Le service a pour finalité exclusive la production d’indicateurs techniques, probabilistes et analytiques relatifs aux documents soumis par l’utilisateur, sans interprétation humaine, sans validation juridique et sans certification.
            VerifDoc ne garantit ni l’exhaustivité, ni l’exactitude absolue, ni l’adéquation des résultats à un usage spécifique, conformément aux limites reconnues par l’état de l’art scientifique et technologique.`
        },
        {
            title: "ARTICLE 6 – NATURE ALGORITHMIQUE, PROBABILISTE ET NON DÉTERMINISTE DES RÉSULTATS",
            content: `L’utilisateur reconnaît expressément que les résultats fournis par VerifDoc :
            • reposent sur des modèles probabilistes,
            • peuvent varier selon les données d’entrée,
            • sont susceptibles de comporter des marges d’erreur,
            • peuvent produire des faux positifs ou faux négatifs.
            Cette reconnaissance vaut acceptation du caractère non déterministe du service, conformément aux positions doctrinales européennes relatives aux systèmes algorithmiques et à l’intelligence artificielle.`
        },
        {
            title: "ARTICLE 7 – ABSENCE TOTALE DE VALEUR PROBANTE, JURIDIQUE OU RÈGLEMENTAIRE",
            content: `Les résultats générés par VerifDoc ne constituent en aucun cas :
            • une preuve juridique,
            • une expertise judiciaire,
            • un avis d’expert,
            • un audit certifié,
            • une décision administrative ou réglementaire.
            Ils ne sauraient être produits comme tels devant une juridiction, une autorité administrative ou disciplinaire, sans analyse humaine indépendante.
            Cette clause est conforme aux principes dégagés par la jurisprudence européenne en matière de responsabilité des prestataires techniques.`
        },
        {
            title: "ARTICLE 8 – ABSENCE DE DÉCISION AUTOMATISÉE AU SENS DU RGPD",
            content: `VerifDoc ne met en œuvre aucune décision automatisée produisant des effets juridiques ou significatifs sur l’utilisateur au sens de l’article 22 du RGPD.
            Les traitements opérés ont une finalité exclusivement informative et d’assistance à la décision humaine, excluant toute automatisation décisionnelle.
            Cette clause vise à exclure l’application du régime renforcé de protection prévu par le RGPD.`
        },
        {
            title: "ARTICLE 9 – RESPONSABILITÉ EXCLUSIVE DE L’UTILISATEUR DANS LA PRISE DE DÉCISION",
            content: `L’utilisateur demeure seul responsable :
            • de l’interprétation des résultats,
            • de leur utilisation,
            • de leur communication à des tiers,
            • des décisions prises sur leur fondement.
            VerifDoc ne saurait être tenu responsable, directement ou indirectement, des conséquences juridiques, économiques, financières ou réputationnelles résultant des choix opérés par l’utilisateur.`
        },
        {
            title: "ARTICLE 10 – ABSENCE DE CONSEIL JURIDIQUE, FINANCIER OU RÈGLEMENTAIRE",
            content: `L’utilisateur reconnaît que VerifDoc ne fournit aucun conseil juridique, financier, fiscal, réglementaire ou stratégique, et qu’aucune information fournie via la plateforme ne saurait être interprétée comme telle.
            Il appartient à l’utilisateur de solliciter, le cas échéant, un professionnel qualifié et habilité avant toute prise de décision engageant sa responsabilité.`
        },
        {
            title: "ARTICLE 11 – CRÉATION, EXACTITUDE ET MISE À JOUR DU COMPTE UTILISATEUR",
            content: `La création d’un compte utilisateur constitue une condition préalable et indispensable à l’accès aux services de la plateforme VerifDoc.
            L’utilisateur s’engage à fournir des informations exactes, complètes, sincères et à jour lors de la création de son compte, et à les maintenir à jour pendant toute la durée de la relation contractuelle.
            Toute inexactitude, omission ou fausse déclaration est susceptible d’engager la responsabilité exclusive de l’utilisateur et de justifier, sans préavis ni indemnité, la suspension ou la résiliation de l’accès au service.
            Cette obligation s’inscrit dans les principes de loyauté contractuelle et de bonne foi consacrés par le droit européen des contrats et la jurisprudence communautaire.`
        },
        {
            title: "ARTICLE 12 – IDENTIFIANTS, AUTHENTIFICATION ET SÉCURITÉ DES ACCÈS",
            content: `Les identifiants de connexion (nom d’utilisateur, mot de passe, clés API, jetons d’accès ou tout autre moyen d’authentification) sont strictement personnels, confidentiels et non cessibles.
            L’utilisateur est seul responsable de leur conservation, de leur confidentialité et de leur utilisation.
            Toute action réalisée via le compte utilisateur est réputée avoir été effectuée par l’utilisateur lui-même, lequel en assume l’entière responsabilité juridique, civile et pénale.
            VerifDoc ne saurait être tenu responsable d’un accès frauduleux résultant d’une négligence, d’un défaut de vigilance ou d’un manquement de l’utilisateur à ses obligations de sécurité.`
        },
        {
            title: "ARTICLE 13 – UTILISATION CONFORME, LICITE ET LOYALE DU SERVICE",
            content: `L’utilisateur s’engage à utiliser la plateforme VerifDoc de manière conforme :
            • aux lois et règlements applicables,
            • au droit de l’Union européenne,
            • aux présentes CGU,
            • à l’ordre public et aux bonnes mœurs,
            • aux usages loyaux du commerce et du numérique.
            Toute utilisation abusive, détournée, frauduleuse ou contraire à la finalité du service est strictement interdite et pourra entraîner des mesures immédiates, sans préjudice de poursuites judiciaires.`
        },
        {
            title: "ARTICLE 14 – LICÉITÉ, PROPRIÉTÉ ET ORIGINE DES DOCUMENTS TRANSMIS",
            content: `L’utilisateur garantit expressément :
            • être le propriétaire légitime des documents transmis ou disposer des droits nécessaires à leur utilisation,
            • que les documents ont été obtenus de manière licite,
            • que leur transmission à VerifDoc ne porte atteinte à aucun droit de tiers.
            Cette garantie constitue une condition essentielle et déterminante du consentement de VerifDoc à fournir le service et engage la responsabilité exclusive de l’utilisateur en cas de violation.`
        },
        {
            title: "ARTICLE 15 – INTERDICTION DE TRANSMISSION DE CONTENUS ILLICITES OU PRÉJUDICIABLES",
            content: `Il est strictement interdit de transmettre via la plateforme VerifDoc des documents :
            • frauduleux, falsifiés ou contrefaits,
            • volés ou obtenus sans droit,
            • portant atteinte aux droits de propriété intellectuelle,
            • violant le secret professionnel, le secret des affaires ou des obligations de confidentialité,
            • contraires à la législation pénale ou réglementaire applicable.
            Toute violation expose l’utilisateur à une suspension immédiate et à une transmission aux autorités compétentes si la loi l’exige.`
        },
        {
            title: "ARTICLE 16 – DONNÉES PERSONNELLES ET CONFORMITÉ AU RGPD",
            content: `Les traitements de données personnelles réalisés dans le cadre de l’utilisation de VerifDoc sont effectués conformément au Règlement (UE) 2016/679 (RGPD), aux principes dégagés par la jurisprudence de la Cour de justice de l’Union européenne, et à la Politique de Confidentialité de VerifDoc.
            La Politique de Confidentialité constitue un document contractuellement opposable et fait partie intégrante des présentes CGU.`
        },
        {
            title: "ARTICLE 17 – QUALIFICATION DES PARTIES AU SENS DU RGPD",
            content: `Pour les données contenues dans les documents transmis, l’utilisateur agit en qualité de responsable de traitement au sens du RGPD, tandis que VerifDoc agit exclusivement en qualité de sous-traitant.
            En conséquence, VerifDoc ne détermine ni les finalités ni les moyens essentiels du traitement des données contenues dans les documents analysés, conformément à l’article 28 du RGPD et à la jurisprudence communautaire relative à la coresponsabilité.`
        },
        {
            title: "ARTICLE 18 – DONNÉES SENSIBLES ET DONNÉES PARTICULIÈRES",
            content: `L’utilisateur s’engage à ne transmettre des données sensibles au sens de l’article 9 du RGPD (données de santé, données biométriques, opinions politiques, convictions religieuses, etc.) que lorsque leur traitement est strictement nécessaire, proportionné et légalement autorisé.
            L’utilisateur assume seul la responsabilité de la licéité de tels traitements et garantit VerifDoc contre toute réclamation, sanction ou condamnation liée à la présence de données sensibles.`
        },
        {
            title: "ARTICLE 19 – MINIMISATION, LIMITATION ET FINALITÉ DU TRAITEMENT",
            content: `Les traitements effectués par VerifDoc sont strictement limités à ce qui est nécessaire à l’exécution du service demandé par l’utilisateur, conformément au principe de minimisation des données prévu par l’article 5 du RGPD.
            Toute utilisation à des fins secondaires, détournées ou non prévues est exclue, sauf obligation légale impérative ou accord écrit exprès de l’utilisateur.`
        },
        {
            title: "ARTICLE 20 – DURÉE DE CONSERVATION ET SUPPRESSION DES DOCUMENTS",
            content: `Les documents transmis à VerifDoc sont conservés uniquement pour la durée strictement nécessaire à la réalisation des analyses demandées, puis supprimés automatiquement dans un délai maximal de quarante-huit (48) heures, sauf obligation légale de conservation plus longue.
            Cette politique de suppression vise à limiter les risques juridiques, techniques et organisationnels, conformément aux exigences du RGPD et aux recommandations des autorités européennes de protection des données.`
        },
        {
            title: "ARTICLE 21 – ABSENCE DE RÉUTILISATION DES DONNÉES ET DES DOCUMENTS",
            content: `VerifDoc s’engage expressément à ne jamais réutiliser, exploiter, analyser à des fins secondaires, ni conserver à des fins d’apprentissage, d’amélioration ou d’entraînement de ses modèles d’intelligence artificielle, les documents transmis par l’utilisateur, sauf accord écrit, préalable, explicite et spécifique de celui-ci.
            Cette clause vise à garantir le respect du secret des affaires, de la confidentialité professionnelle et des principes dégagés par la jurisprudence européenne en matière de protection des données et de loyauté contractuelle.`
        },
        {
            title: "ARTICLE 22 – MESURES TECHNIQUES ET ORGANISATIONNELLES DE SÉCURITÉ",
            content: `VerifDoc met en œuvre des mesures techniques et organisationnelles appropriées afin d’assurer un niveau de sécurité adapté aux risques, notamment en matière de confidentialité, d’intégrité, de disponibilité et de résilience des systèmes.
            Ces mesures constituent une obligation de moyens, conformément à l’article 32 du RGPD et à la jurisprudence communautaire, VerifDoc ne pouvant garantir une sécurité absolue face à des risques imprévisibles ou externes.`
        },
        {
            title: "ARTICLE 23 – LIMITATION DE RESPONSABILITÉ GÉNÉRALE",
            content: `La responsabilité de VerifDoc est strictement limitée aux dommages directs, personnels et certains, résultant d’une faute prouvée et exclusivement imputable à VerifDoc, à l’exclusion de tout autre préjudice.
            Cette limitation est conforme aux principes de proportionnalité et de prévisibilité dégagés par le droit européen des contrats.`
        },
        {
            title: "ARTICLE 24 – EXCLUSION DES DOMMAGES INDIRECTS ET CONSÉCUTIFS",
            content: `Sont expressément exclus de toute indemnisation les dommages indirects, immatériels ou consécutifs, notamment perte de chiffre d’affaires, perte de chance, perte de données, atteinte à l’image ou préjudice commercial.
            L’utilisateur reconnaît que cette exclusion constitue une condition essentielle de l’équilibre contractuel.`
        },
        {
            title: "ARTICLE 25 – PLAFONNEMENT ÉVENTUEL DE RESPONSABILITÉ",
            content: `Lorsque la responsabilité de VerifDoc serait engagée malgré les exclusions prévues, l’indemnisation totale, toutes causes confondues, est expressément plafonnée au montant effectivement payé par l’utilisateur au titre du service au cours des douze (12) derniers mois.
            Cette clause est conforme à la jurisprudence européenne relative aux clauses limitatives de responsabilité entre professionnels.`
        },
        {
            title: "ARTICLE 26 – FORCE MAJEURE",
            content: `Aucune des parties ne pourra être tenue responsable en cas d’inexécution ou de retard résultant d’un événement de force majeure au sens de la jurisprudence de l’Union européenne, incluant notamment pannes réseaux, cyberattaques majeures, catastrophes naturelles, décisions administratives ou législatives.`
        },
        {
            title: "ARTICLE 27 – DISPONIBILITÉ ET CONTINUITÉ DU SERVICE",
            content: `VerifDoc s’efforce d’assurer un accès continu au service, sans toutefois garantir une disponibilité permanente ou une absence totale d’interruption, notamment en raison de contraintes techniques, de maintenance ou d’événements indépendants de sa volonté.`
        },
        {
            title: "ARTICLE 28 – MAINTENANCE, ÉVOLUTIONS ET MISES À JOUR",
            content: `VerifDoc se réserve le droit d’effectuer à tout moment des opérations de maintenance, de mise à jour, d’amélioration ou de modification fonctionnelle du service, sans que cela n’ouvre droit à indemnisation pour l’utilisateur.
            Ces évolutions s’inscrivent dans une logique d’amélioration continue et de conformité réglementaire.`
        },
        {
            title: "ARTICLE 29 – SUSPENSION TEMPORAIRE DE L’ACCÈS",
            content: `VerifDoc peut suspendre temporairement l’accès au service, sans préavis, en cas de suspicion de violation des CGU, de risque de sécurité, d’utilisation illicite ou d’obligation légale ou réglementaire.
            Cette suspension ne saurait engager la responsabilité de VerifDoc.`
        },
        {
            title: "ARTICLE 30 – RÉSILIATION DE L’ACCÈS AU SERVICE",
            content: `VerifDoc se réserve le droit de résilier, de plein droit et sans indemnité, l’accès au service en cas de manquement grave ou répété de l’utilisateur aux présentes CGU, sans préjudice de toute action judiciaire.`
        },
        {
            title: "ARTICLE 31 – PROPRIÉTÉ INTELLECTUELLE GÉNÉRALE",
            content: `La plateforme VerifDoc, incluant notamment ses logiciels, interfaces, algorithmes, bases de données, modèles d’intelligence artificielle, marques, logos et contenus, est protégée par le droit de la propriété intellectuelle européen et international.`
        },
        {
            title: "ARTICLE 32 – LICENCE D’UTILISATION ACCORDÉE À L’UTILISATEUR",
            content: `VerifDoc concède à l’utilisateur une licence d’utilisation non exclusive, non cessible, non transférable et strictement limitée à l’usage du service conformément aux présentes CGU.
            Toute utilisation non autorisée constitue une contrefaçon.`
        },
        {
            title: "ARTICLE 33 – INTERDICTION DE RÉTRO-INGÉNIERIE ET D’EXTRACTION",
            content: `Il est strictement interdit de procéder à toute tentative de rétro-ingénierie, décompilation, extraction de code source, d’algorithmes ou de modèles, conformément à la directive européenne sur la protection des logiciels.`
        },
        {
            title: "ARTICLE 34 – CONFIDENTIALITÉ DES INFORMATIONS",
            content: `Les parties s’engagent à préserver la confidentialité de toute information non publique échangée dans le cadre de l’exécution des présentes CGU, pendant toute la durée de la relation contractuelle et après sa cessation.`
        },
        {
            title: "ARTICLE 35 – PREUVE ÉLECTRONIQUE ET TRAÇABILITÉ",
            content: `Les enregistrements informatiques, journaux de connexion, horodatages et systèmes de traçabilité de VerifDoc font foi entre les parties, conformément aux règles de preuve électronique reconnues par le droit européen.`
        },
        {
            title: "ARTICLE 36 – ARCHIVAGE ET CONSERVATION À DES FINS PROBATOIRES",
            content: `VerifDoc peut procéder à l’archivage de certaines données et journaux à des fins probatoires, dans le respect des durées légales et des principes de proportionnalité.`
        },
        {
            title: "ARTICLE 37 – SOUS-TRAITANCE TECHNIQUE",
            content: `VerifDoc est autorisé à recourir à des sous-traitants techniques pour l’hébergement, la maintenance ou la sécurité du service, sous réserve du respect des exigences du RGPD et du droit européen.`
        },
        {
            title: "ARTICLE 38 – SERVICES ET CONTENUS TIERS",
            content: `VerifDoc ne saurait être tenu responsable des services, contenus, logiciels ou infrastructures fournis par des tiers accessibles via la plateforme, ceux-ci demeurant sous la responsabilité exclusive de leurs éditeurs.`
        },
        {
            title: "ARTICLE 39 – LIENS HYPERTEXTES",
            content: `Les liens hypertextes éventuellement présents sur la plateforme sont fournis à titre informatif et n’engagent en aucun cas la responsabilité de VerifDoc quant à leur contenu ou fonctionnement.`
        },
        {
            title: "ARTICLE 40 – ABSENCE DE PARTENARIAT, MANDAT OU REPRÉSENTATION",
            content: `Les présentes CGU n’ont ni pour objet ni pour effet de créer une relation de partenariat, de mandat, de représentation ou de société entre VerifDoc et l’utilisateur, chacun demeurant juridiquement indépendant.`
        },
        {
            title: "ARTICLE 41 – CESSION ET TRANSMISSION DES DROITS ET OBLIGATIONS",
            content: `L’utilisateur s’interdit expressément de céder, transférer, concéder ou mettre à disposition, à titre gratuit ou onéreux, tout ou partie de ses droits ou obligations issus des présentes CGU, sans l’accord écrit et préalable de VerifDoc.
            VerifDoc se réserve la faculté de céder ou transférer librement tout ou partie des présentes CGU, notamment dans le cadre d’une restructuration, fusion, cession d’actifs ou transfert d’activité, sous réserve du respect des dispositions impératives du droit de l’Union européenne.`
        },
        {
            title: "ARTICLE 42 – SOUS-TRAITANCE ET PRESTATAIRES TECHNIQUES",
            content: `VerifDoc est autorisé à recourir à des prestataires techniques et sous-traitants pour l’exécution de tout ou partie du service, notamment en matière d’hébergement, de sécurité, de maintenance ou d’infrastructure.
            Ces sous-traitants sont sélectionnés selon des critères de fiabilité, de conformité réglementaire et de sécurité, conformément aux exigences du RGPD et à la jurisprudence européenne relative à la responsabilité des sous-traitants.`
        },
        {
            title: "ARTICLE 43 – CONFORMITÉ RÉGLEMENTAIRE ET LÉGALE",
            content: `L’utilisateur reconnaît que VerifDoc agit dans un environnement réglementaire complexe et évolutif et s’engage à respecter l’ensemble des lois, règlements, normes et obligations applicables, notamment en matière de protection des données, de cybersécurité, de concurrence et de conformité sectorielle.
            Toute utilisation non conforme engage la responsabilité exclusive de l’utilisateur.`
        },
        {
            title: "ARTICLE 44 – SANCTIONS INTERNATIONALES ET CONTRÔLES À L’EXPORT",
            content: `L’utilisateur déclare et garantit ne pas être soumis à des régimes de sanctions internationales, embargos ou restrictions à l’exportation, et s’engage à respecter l’ensemble des réglementations européennes et internationales applicables en la matière.
            VerifDoc se réserve le droit de suspendre ou résilier l’accès au service en cas de risque de non-conformité.`
        },
        {
            title: "ARTICLE 45 – AUDIT, CONTRÔLE ET CONFORMITÉ",
            content: `Afin d’assurer la sécurité, la conformité légale et l’intégrité de la plateforme, VerifDoc se réserve le droit de mettre en œuvre des mécanismes de contrôle, d’audit interne ou de vérification automatisée des usages, dans le strict respect du RGPD et des principes de proportionnalité dégagés par la jurisprudence communautaire.`
        },
        {
            title: "ARTICLE 46 – NON-RENCIATION",
            content: `Le fait pour VerifDoc de ne pas se prévaloir, à un moment donné, de l’une quelconque des clauses des présentes CGU ne saurait être interprété comme une renonciation à s’en prévaloir ultérieurement.
            Cette clause garantit la pleine efficacité et la continuité des droits contractuels.`
        },
        {
            title: "ARTICLE 47 – NULLITÉ PARTIELLE",
            content: `Si l’une quelconque des stipulations des présentes CGU devait être déclarée nulle, invalide ou inapplicable par une juridiction compétente, cette nullité n’affecterait pas la validité des autres stipulations, lesquelles demeureront pleinement applicables.
            Cette disposition est conforme aux principes de sauvegarde contractuelle reconnus par le droit européen.`
        },
        {
            title: "ARTICLE 48 – INTÉGRALITÉ DE L’ACCORD CONTRACTUEL",
            content: `Les présentes CGU constituent l’intégralité de l’accord entre VerifDoc et l’utilisateur concernant l’objet des présentes et remplacent tout accord, négociation ou engagement antérieur, écrit ou oral, relatif au même objet.`
        },
        {
            title: "ARTICLE 49 – MODIFICATION DES CONDITIONS GÉNÉRALES D’UTILISATION",
            content: `VerifDoc se réserve le droit de modifier, à tout moment, les présentes CGU afin de tenir compte des évolutions légales, réglementaires, jurisprudentielles, techniques ou fonctionnelles.
            Les CGU modifiées entreront en vigueur dès leur mise en ligne et seront opposables à l’utilisateur à compter de leur acceptation.`
        },
        {
            title: "ARTICLE 50 – INFORMATION ET NOTIFICATIONS",
            content: `Toute information ou notification relative aux présentes CGU sera réputée valablement effectuée par voie électronique, notamment via la plateforme ou par courrier électronique, conformément aux règles européennes relatives à la preuve électronique.`
        },
        {
            title: "ARTICLE 51 – LANGUE DU CONTRAT",
            content: `Les présentes CGU sont rédigées en langue française, laquelle fait foi juridiquement.
            Une version en langue anglaise peut être fournie à titre de convenance, sans valeur contractuelle supérieure à la version française.`
        },
        {
            title: "ARTICLE 52 – ARCHIVAGE ET PREUVE",
            content: `Les CGU sont conservées sur un support durable et peuvent être archivées à des fins probatoires, conformément aux exigences du droit européen et à la jurisprudence relative à la preuve numérique.`
        },
        {
            title: "ARTICLE 53 – SÉCURITÉ JURIDIQUE ET ACCEPTATION DES RISQUES TECHNOLOGIQUES",
            content: `L’utilisateur reconnaît expressément avoir été informé des risques inhérents à l’utilisation de technologies algorithmiques et d’intelligence artificielle, et accepter ces risques en toute connaissance de cause.
            Cette reconnaissance participe à l’équilibre contractuel et à la limitation de responsabilité de VerifDoc.`
        },
        {
            title: "ARTICLE 54 – ABSENCE DE GARANTIE D’ADÉQUATION À UN BESOIN SPÉCIFIQUE",
            content: `VerifDoc ne garantit pas que le service répondra à des exigences spécifiques, réglementaires ou sectorielles propres à l’utilisateur, lequel demeure seul juge de l’adéquation du service à ses besoins.`
        },
        {
            title: "ARTICLE 55 – RESPONSABILITÉ VIS-À-VIS DES TIERS",
            content: `VerifDoc ne saurait être tenu responsable des réclamations, actions ou recours intentés par des tiers à l’encontre de l’utilisateur du fait de l’utilisation du service ou des documents transmis.`
        },
        {
            title: "ARTICLE 56 – ASSURANCE",
            content: `La responsabilité de VerifDoc est couverte dans les limites et conditions de ses polices d’assurance en vigueur, sans que cela ne constitue une garantie au bénéfice de l’utilisateur.`
        },
        {
            title: "ARTICLE 57 – DROIT APPLICABLE",
            content: `Les présentes CGU sont régies par le droit de l’Union européenne et, à titre supplétif, par le droit estonien, à l’exclusion de toute autre législation.`
        },
        {
            title: "ARTICLE 58 – JURIDICTION COMPÉTENTE",
            content: `Tout litige relatif à l’interprétation, l’exécution ou la validité des présentes CGU relève de la compétence exclusive des juridictions estoniennes, sauf disposition impérative contraire du droit de l’Union européenne.`
        },
        {
            title: "ARTICLE 59 – RÈGLEMENT AMIABLE DES DIFFÉRENDS",
            content: `Avant toute action judiciaire, les parties s’engagent à rechercher de bonne foi une solution amiable au différend, conformément aux principes européens de règlement alternatif des litiges.`
        },
        {
            title: "ARTICLE 60 – CLAUSE FINALE DE SÉCURISATION MAXIMALE",
            content: `L’utilisateur reconnaît expressément que l’utilisation de la plateforme VerifDoc s’effectue sous sa seule responsabilité, que les limitations techniques, juridiques et fonctionnelles du service lui ont été clairement exposées, et qu’aucune garantie, explicite ou implicite, autre que celles expressément prévues aux présentes CGU, n’est accordée.`
        },
        // --- DPA SECTION ---
        {
            title: "ACCORD DE SOUS-TRAITANCE DES DONNÉES PERSONNELLES (DPA)",
            content: `(Article 28 du Règlement (UE) 2016/679 – RGPD)`
        },
        {
            title: "PRÉAMBULE DU DPA",
            content: `Le présent accord de sous-traitance des données personnelles (ci-après le « DPA ») est conclu entre :
            • L’Utilisateur, agissant en qualité de Responsable de traitement au sens du Règlement (UE) 2016/679,
            et
            • VerifDoc, plateforme exploitée par Xolo Go OÜ – Chawki Fares, agissant exclusivement en qualité de Sous-traitant.
            Le présent DPA fait partie intégrante du cadre contractuel liant les parties et complète les Conditions Générales d’Utilisation (CGU) de VerifDoc.`
        },
        {
            title: "ARTICLE 1 (DPA) – OBJET",
            content: `Le présent DPA a pour objet de définir les conditions dans lesquelles VerifDoc traite, pour le compte exclusif de l’Utilisateur, des données personnelles contenues dans les documents transmis via la plateforme, conformément à l’article 28 du RGPD.
            Aucune disposition du présent DPA ne saurait être interprétée comme conférant à VerifDoc la qualité de responsable de traitement.`
        },
        {
            title: "ARTICLE 2 (DPA) – INSTRUCTIONS DOCUMENTÉES",
            content: `VerifDoc traite les données personnelles uniquement sur instructions documentées de l’Utilisateur, matérialisées par l’utilisation fonctionnelle de la plateforme et la soumission volontaire de documents à analyser.
            VerifDoc ne détermine ni les finalités ni les moyens essentiels du traitement.`
        },
        {
            title: "ARTICLE 3 (DPA) – NATURE ET FINALITÉ DU TRAITEMENT",
            content: `Les traitements réalisés par VerifDoc portent exclusivement sur :
            • l’analyse technique automatisée de documents,
            • la génération d’indicateurs algorithmiques et probabilistes,
            • la restitution des résultats à l’Utilisateur.
            Toute autre finalité est expressément exclue.`
        },
        {
            title: "ARTICLE 4 (DPA) – CATÉGORIES DE DONNÉES ET PERSONNES CONCERNÉES",
            content: `Les données personnelles susceptibles d’être traitées sont celles contenues dans les documents transmis par l’Utilisateur et peuvent inclure notamment :
            • données d’identification,
            • données professionnelles,
            • données administratives ou contractuelles.
            Les personnes concernées sont déterminées exclusivement par l’Utilisateur.`
        },
        {
            title: "ARTICLE 5 (DPA) – DONNÉES SENSIBLES",
            content: `L’Utilisateur s’engage à ne transmettre des données sensibles au sens de l’article 9 du RGPD que lorsque leur traitement est strictement nécessaire, licite et proportionné.
            L’Utilisateur assume seul la responsabilité de la licéité de ces traitements et garantit VerifDoc contre toute réclamation, sanction ou condamnation.`
        },
        {
            title: "ARTICLE 6 (DPA) – OBLIGATIONS DE VERIFDOC",
            content: `VerifDoc s’engage à :
            • traiter les données conformément au présent DPA,
            • garantir la confidentialité des données,
            • mettre en œuvre des mesures de sécurité appropriées,
            • ne pas utiliser les données à des fins propres,
            • ne pas conserver les données au-delà des durées prévues.`
        },
        {
            title: "ARTICLE 7 (DPA) – MESURES TECHNIQUES ET ORGANISATIONNELLES",
            content: `VerifDoc met en œuvre des mesures techniques et organisationnelles appropriées afin d’assurer un niveau de sécurité adapté aux risques, conformément à l’article 32 du RGPD.
            Ces mesures constituent une obligation de moyens.`
        },
        {
            title: "ARTICLE 8 (DPA) – SOUS-TRAITANCE ULTÉRIEURE",
            content: `VerifDoc peut recourir à des sous-traitants techniques (hébergement, infrastructure, sécurité), sous réserve :
            • de garanties RGPD équivalentes,
            • d’un encadrement contractuel conforme à l’article 28 du RGPD.`
        },
        {
            title: "ARTICLE 9 (DPA) – CONFIDENTIALITÉ",
            content: `VerifDoc garantit que les personnes autorisées à traiter les données s’engagent à respecter la confidentialité ou sont soumises à une obligation légale appropriée.`
        },
        {
            title: "ARTICLE 10 (DPA) – ASSISTANCE AU RESPONSABLE DE TRAITEMENT",
            content: `Dans la mesure du possible, VerifDoc assiste l’Utilisateur afin de :
            • répondre aux demandes d’exercice des droits,
            • notifier les violations de données,
            • assurer la conformité RGPD.`
        },
        {
            title: "ARTICLE 11 (DPA) – VIOLATIONS DE DONNÉES",
            content: `Toute violation de données personnelles est notifiée à l’Utilisateur sans délai excessif, conformément aux articles 33 et 34 du RGPD.`
        },
        {
            title: "ARTICLE 12 (DPA) – SORT DES DONNÉES",
            content: `Les données personnelles et documents transmis sont supprimés automatiquement dans un délai maximal de quarante-huit (48) heures après la réalisation des analyses, sauf obligation légale contraire.`
        },
        {
            title: "ARTICLE 13 (DPA) – ABSENCE DE RÉUTILISATION DES DONNÉES",
            content: `VerifDoc s’engage expressément à ne jamais :
            • réutiliser,
            • conserver,
            • exploiter,
            • analyser à des fins secondaires,
            • entraîner ou améliorer ses modèles d’intelligence artificielle
            les données ou documents transmis, sauf accord écrit, préalable, explicite et spécifique de l’Utilisateur.`
        },
        {
            title: "ARTICLE 14 (DPA) – DROIT D’AUDIT",
            content: `L’Utilisateur peut, dans des conditions raisonnables et proportionnées, vérifier la conformité de VerifDoc au présent DPA, sous réserve de ne pas compromettre la sécurité ou les secrets protégés.`
        },
        {
            title: "ARTICLE 15 (DPA) – RESPONSABILITÉ",
            content: `La responsabilité de VerifDoc au titre du présent DPA est strictement limitée conformément aux CGU et au droit applicable de l’Union européenne.`
        },
        {
            title: "ARTICLE 16 (DPA) – DURÉE",
            content: `Le présent DPA s’applique pendant toute la durée d’utilisation de la plateforme VerifDoc par l’Utilisateur.`
        },
        {
            title: "ARTICLE 17 (DPA) – DROIT APPLICABLE",
            content: `Le présent DPA est régi par le droit de l’Union européenne et, à titre supplétif, par le droit estonien.`
        },
        {
            title: "ARTICLE 18 (DPA) – OPPOSABILITÉ",
            content: `Le présent DPA est accepté par voie électronique lors de l’acceptation des CGU et fait foi entre les parties.`
        },
        {
            title: "FIN DU DPA – VERSION FINALE",
            content: `✅ STATUT FINAL`
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-500/30 text-slate-800">
            {/* NAVBAR SIMPLE */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src="/images/verifdoc-logo-real.png" alt="VerifDoc" className="h-8 w-auto grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                        <span className="font-bold text-slate-900 tracking-tight">VERIFDOC</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                        <ArrowLeft size={16} /> Retour
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">

                    {/* HEADER */}
                    <div className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 pattern-grid-lg opacity-20"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 backdrop-blur-sm border border-white/10">
                                <FileText size={32} />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">CGU VERIFDOC – VERSION MAXIMALE</h1>
                            <p className="text-slate-400 text-sm uppercase tracking-widest font-mono">
                                Bloc 1 : Articles 1 à 60
                            </p>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="p-8 md:p-12 space-y-12">

                        {/* INTRODUCTION */}
                        <div className="prose prose-slate max-w-none">
                            <p className="lead text-lg text-slate-600 border-l-4 border-blue-500 pl-4 py-2 bg-slate-50 rounded-r-lg">
                                Conditions générales d'utilisation régissant l'usage de la plateforme VerifDoc dans le strict respect de la réglementation européenne.
                            </p>
                        </div>

                        {/* ARTICLES */}
                        <div className="space-y-8">
                            {ARTICLES.map((article) => (
                                <Section key={article.title} title={article.title}>
                                    {article.content.split('\n').map((line, i) => (
                                        <p key={i} className="mb-2 whitespace-pre-line">
                                            {line.trim()}
                                        </p>
                                    ))}
                                </Section>
                            ))}
                        </div>
                    </div>

                    {/* FOOTER OF PAGE */}
                    <div className="bg-slate-50 p-8 text-center border-t border-slate-100">
                        <div className="flex justify-center gap-6 text-sm font-medium text-slate-500 mb-4">
                            <Link to="/privacy" className="hover:text-blue-600 transition-colors">Politique de Confidentialité</Link>
                            <span>•</span>
                            <Link to="/join-us" className="hover:text-blue-600 transition-colors">Carrières</Link>
                        </div>
                        <Link to="/" className="text-blue-600 font-bold hover:underline">Retour à l'accueil</Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="border-b border-slate-100 pb-8 last:border-0 last:pb-0">
        <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-slate-300 rounded-full shrink-0"></span>
            <span className="leading-snug">{title}</span>
        </h2>
        <div className="text-slate-600 leading-relaxed pl-4">
            {children}
        </div>
    </div>
);

export default TermsOfServicePage;
