import Image from "next/image";

const packages = [
  {
    name: "Solo Pack",
    ar: "للبداية قدّام دارك",
    price: "28 د.ت",
    delivery: "+ 7 د.ت livraison = 35 د.ت total",
    option: "Solo Pack - 28 DT + 7 DT livraison = 35 DT total",
    items: ["1 عصا التقاط", "مناسب للدار أو الحانوت", "دفع عند التسليم"],
    tag: "Pour particuliers",
  },
  {
    name: "Duo Pack",
    ar: "انتي وشخص آخر",
    price: "45 د.ت",
    delivery: "+ 7 د.ت livraison = 52 د.ت total",
    option: "Duo Pack - 45 DT + 7 DT livraison = 52 DT total",
    items: ["2 عصي التقاط", "أفضل قيمة للعائلة", "ممتاز كهدية للوالد أو الجد", "دفع عند التسليم"],
    tag: "Le plus demandé",
  },
  {
    name: "Trio Pack",
    ar: "للدار، الحانوت، والعائلة",
    price: "59 د.ت",
    delivery: "+ 7 د.ت livraison = 66 د.ت total",
    option: "Trio Pack - 59 DT + 7 DT livraison = 66 DT total",
    items: ["3 عصي التقاط", "لكل العائلة أو فريق صغير", "أكثر مردود مقابل السعر", "دفع عند التسليم"],
    tag: "Meilleur prix",
  },
  {
    name: "Premium Pack",
    ar: "لتجربة التنظيف الكاملة",
    price: "39 د.ت",
    delivery: "+ 7 د.ت livraison = 46 د.ت total",
    option: "Premium Pack - 39 DT + 7 DT livraison = 46 DT total",
    items: ["1 عصا التقاط", "1 زوج قفازات", "5 أكياس قوية", "QR للمنصة"],
    tag: "Pack complet",
  },
];

const steps = [
  ["Acheter le pack", "اختار الباك اللي يناسبك"],
  ["Nettoyer 10 minutes", "نظّف قدّام دارك، حانوتك، ولا حومتك"],
  ["Photo avant / après", "صوّر قبل وبعد باش نثبتو الخدمة"],
  ["Gagner des points", "كل كيس معمّر يعطيك نقاط ومكانة في الترتيب"],
];

const rewards = [
  "نقاط على كل كيس زبلة معمّر",
  "Badges: Clean Hero, Champion de quartier",
  "Classement par ville et quartier",
  "Coupons من sponsors وشركاء محليين",
  "Certificat شهري لأكثر ناس نشيطة",
  "Challenges للعائلات، الحوانت، والمدارس",
];

const usageCards = [
  {
    image: "/usage/home-floor.gif",
    alt: "Utiliser la pince pour ramasser un objet au sol sans se baisser",
    title: "Sans se baisser",
    text: "Pratique pour les parents, les seniors et toute personne qui veut éviter l'effort inutile.",
  },
  {
    image: "/usage/garden-clean.gif",
    alt: "Ramasser des déchets dans le jardin avec la pince",
    title: "Jardin & terrasse",
    text: "Ramasser bouteilles, papier et plastique devient plus rapide et plus propre.",
  },
  {
    image: "/usage/high-shelf.gif",
    alt: "Atteindre une étagère haute avec la pince",
    title: "Atteindre plus loin",
    text: "Pour les étagères, dessous des meubles, coins hauts et endroits difficiles.",
  },
  {
    image: "/usage/mobility-helper.webp",
    alt: "Personne senior utilisant une pince de ramassage à la maison",
    title: "Cadeau utile",
    text: "Une idée simple pour aider vos parents à ramasser les objets sans fatigue.",
  },
  {
    image: "/usage/car-reach.webp",
    alt: "Utiliser la pince pour atteindre un objet près de la voiture",
    title: "Voiture & garage",
    text: "Attraper ce qui tombe sous la voiture, près du garage ou dans les coins étroits.",
  },
  {
    image: "/usage/pickup-demo.webp",
    alt: "Démonstration de la pince qui ramasse un objet",
    title: "Geste rapide",
    text: "Un clic, tu ramasses. Plus propre, plus facile, plus confortable.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Navigation principale">
          <a className="brand" href="#top" aria-label="Ndhaf Tounes accueil">
            <span className="brand-mark">ن</span>
            <span>Ndhaf Tounes</span>
          </a>
          <div className="nav-links">
            <a href="#packages">Packages</a>
            <a href="#usages">Usages</a>
            <a href="#points">Points</a>
            <a href="#order">Commander</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">تحدّي نظّف قدّام دارك</span>
            <h1>نظّف قدّام دارك، تونس تولّي أنظف.</h1>
            <p>
              Une pince pratique pour nettoyer devant votre maison, boutique ou
              quartier. Choisissez l'offre simple ou le Premium Pack avec gants,
              sacs, photos avant/après et points sur notre plateforme.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#order">
                اطلب الباك
              </a>
              <a className="button secondary" href="#how">
                Comment ça marche
              </a>
            </div>
            <div className="proof-strip" aria-label="Arguments principaux">
              <span>10 minutes</span>
              <span>Avant / Après</span>
              <span>Points & récompenses</span>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src="/clean-tunisia-hero.png"
              alt="Pack de nettoyage avec pince, gants et sacs utilisé dans une rue tunisienne"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 52vw"
            />
          </div>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="section-kicker">L'idée</p>
          <h2>مش عصا التقاط برك. حركة صغيرة تعمل فرق كبير.</h2>
        </div>
        <p>
          Le message est simple: si chaque personne nettoie devant sa porte,
          son magasin ou son immeuble, la Tunisie devient plus propre rue par
          rue. Le pack transforme cette action en activité facile, utile et même
          agréable pour la famille.
        </p>
      </section>

      <section className="section kit-showcase">
        <div className="kit-image">
          <Image
            src="/kit-product.png"
            alt="Ndhaf Tounes pack avec pince de ramassage, gants, sacs et carte QR"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
        <div>
          <p className="section-kicker">Offre simple + Premium</p>
          <h2>نفس العصا القوية، والباك الكامل بزيادة</h2>
          <p>
            Les packs Solo, Duo et Trio contiennent les pinces de ramassage. Le
            Premium Pack ajoute les gants, les sacs solides et le QR plateforme
            pour participer au challenge.
          </p>
          <div className="kit-list">
            <span>Pince de ramassage</span>
            <span>Duo & Trio disponibles</span>
            <span>Premium: gants + sacs</span>
            <span>QR plateforme Premium</span>
          </div>
        </div>
      </section>

      <section className="section life-helper" id="usages">
        <div className="section-heading">
          <p className="section-kicker">Plus qu'une pince</p>
          <h2>تسهّل الحياة كل يوم، موش كان للتنظيف.</h2>
          <p>
            La même pince aide à ramasser sans se baisser, atteindre les coins
            difficiles, ranger la maison et aider les parents ou grands-parents
            dans les gestes du quotidien.
          </p>
        </div>
        <div className="usage-grid">
          <article className="usage-card large">
            <img
              src="/usage/product-details.webp"
              alt="Pince de ramassage pliable avec poignée ergonomique"
            />
            <div>
              <span>Outil nécessaire</span>
              <h3>Nettoyage, maison, jardin, boutique</h3>
              <p>خفيفة، طويلة، وتعاونك تشدّ الحاجة من غير ما تتعب ظهرك.</p>
            </div>
          </article>
          {usageCards.map((usage) => (
            <article className="usage-card" key={usage.title}>
              <img src={usage.image} alt={usage.alt} />
              <h3>{usage.title}</h3>
              <p>{usage.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section how" id="how">
        <div className="section-heading">
          <p className="section-kicker">Comment ça marche</p>
          <h2>من الباك إلى النقاط في 4 خطوات</h2>
        </div>
        <div className="steps">
          {steps.map(([fr, ar], index) => (
            <article className="step" key={fr}>
              <span>{index + 1}</span>
              <h3>{fr}</h3>
              <p>{ar}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section packages" id="packages">
        <div className="section-heading">
          <p className="section-kicker">Nos offres</p>
          <h2>Packages prêts للبيع</h2>
        </div>
        <div className="package-grid">
          {packages.map((pack) => (
            <article className="package-card" key={pack.name}>
              <div>
                <span className="tag">{pack.tag}</span>
                <h3>{pack.name}</h3>
                <p>{pack.ar}</p>
              </div>
              <strong>{pack.price}</strong>
              <small>{pack.delivery}</small>
              <ul>
                {pack.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a href="#order">Choisir ce pack</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section split" id="points">
        <div className="panel dark">
          <p className="section-kicker">Plateforme</p>
          <h2>كل كيس معمّر = نقاط</h2>
          <p>
            Le client ajoute une photo avant, une photo après, la ville, le
            quartier et le nombre de sacs remplis. Après validation, il gagne
            des points et monte dans le classement.
          </p>
        </div>
        <div className="panel rewards">
          <h3>Rewards à développer</h3>
          <ul>
            {rewards.map((reward) => (
              <li key={reward}>{reward}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section audience">
        <div className="section-heading">
          <p className="section-kicker">Pour qui?</p>
          <h2>كل واحد ينجم يشارك</h2>
        </div>
        <div className="audience-grid">
          <article>
            <h3>Maison</h3>
            <p>قدّام الدار، العمارة، ولا الكراج. Action rapide chaque semaine.</p>
          </article>
          <article>
            <h3>Commerce</h3>
            <p>واجهة نظيفة تزيد الثقة وتخلي الحانوت يبان منظم ومحترم.</p>
          </article>
          <article>
            <h3>Retraités</h3>
            <p>هدية مفيدة للوالد أو الجد: حركة خفيفة، نشاط، وفرحة بالمساهمة.</p>
          </article>
          <article>
            <h3>Écoles & associations</h3>
            <p>Challenges جماعية، points par équipe, et impact visible.</p>
          </article>
        </div>
      </section>

      <section className="section order" id="order">
        <div>
          <p className="section-kicker">Commander maintenant</p>
          <h2>Prêt باش تبدأ تحدّي النظافة؟</h2>
          <p>
            Version lancement: commande par téléphone ou WhatsApp, paiement à
            la livraison, puis accès plateforme avec QR code dans le pack.
          </p>
        </div>
        <form className="order-form">
          <label>
            Nom et prénom
            <input type="text" name="name" placeholder="Votre nom" />
          </label>
          <label>
            Ville / quartier
            <input type="text" name="city" placeholder="Tunis, Sfax, Sousse..." />
          </label>
          <label>
            Package
            <select name="package" defaultValue={packages[1].option}>
              {packages.map((pack) => (
                <option key={pack.name}>{pack.option}</option>
              ))}
            </select>
          </label>
          <label>
            Téléphone
            <input type="tel" name="phone" placeholder="+216 ..." />
          </label>
          <button type="button">Envoyer la demande</button>
        </form>
      </section>

      <section className="section faq">
        <div className="section-heading">
          <p className="section-kicker">Questions</p>
          <h2>À préparer avant le lancement</h2>
        </div>
        <div className="faq-grid">
          <article>
            <h3>Comment vérifier les photos?</h3>
            <p>
              Au début, validation manuelle par admin. Après, ajouter GPS,
              date, et contrôle anti-duplication.
            </p>
          </article>
          <article>
            <h3>Où vont les sacs remplis?</h3>
            <p>
              Définir des points de dépôt ou partenaires locaux pour collecte
              et recyclage quand possible.
            </p>
          </article>
          <article>
            <h3>Quel ton marketing?</h3>
            <p>
              Positif, fier, familial. On évite la culpabilité: on vend une
              action facile qui donne du plaisir et du résultat.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
