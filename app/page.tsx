import Image from "next/image";

const packages = [
  {
    name: "Cleano Grabber",
    ar: "تنظّف وتشدّ الحاجة من غير ما تنحني",
    price: "35 د.ت",
    delivery: "+ 8 د.ت livraison = 43 د.ت total",
    option: "Cleano Grabber - 35 DT + 8 DT livraison = 43 DT total",
    items: ["1 عصا التقاط قابلة للطي", "للتنظيف والاستعمال اليومي", "دفع عند التسليم"],
    tag: "Offre lancement",
  },
];

const steps = [
  ["Commander", "عمّر الطلب على الموقع"],
  ["Confirmer", "نعيطولك باش نثبتو العنوان والمبلغ"],
  ["Recevoir", "تخلّص 43 د عند التسليم"],
  ["Commencer", "استعملها في الدار، الحانوت، ولا قدّام بابك"],
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
          <a className="brand" href="#top" aria-label="Cleano accueil">
            <span className="brand-mark">ن</span>
            <span>Cleano</span>
          </a>
          <div className="nav-links">
            <a href="#packages">Offre</a>
            <a href="#usages">Usages</a>
            <a href="#mission">Mission</a>
            <a href="#order">Commander</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">تحدّي نظّف قدّام دارك</span>
            <h1>نظّف قدّام دارك، تونس تولّي أنظف.</h1>
            <p>
              La pince pliable qui aide à ramasser sans se baisser et sans
              toucher les déchets. Pour la maison, la boutique et le quartier.
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
              <span>Sans se baisser</span>
              <span>Paiement à la livraison</span>
            </div>
          </div>

          <div className="hero-media">
            <Image
              src="/usage/product-details.webp"
              alt="Pince de ramassage pliable Cleano"
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
          Le message est simple: un outil pratique facilite le geste. Si chaque
          personne nettoie devant sa porte, son magasin ou son immeuble, la
          Tunisie devient plus propre rue par rue.
        </p>
      </section>

      <section className="section kit-showcase">
        <div className="kit-image">
          <Image
            src="/usage/pickup-demo.webp"
            alt="Démonstration de la pince de ramassage Cleano"
            fill
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </div>
        <div>
          <p className="section-kicker">Un seul outil, plusieurs usages</p>
          <h2>خفيفة، قابلة للطي، وسهلة الاستعمال</h2>
          <p>
            La pince Cleano sert à ramasser les déchets, atteindre les objets au
            sol, accéder sous les meubles et faciliter les gestes du quotidien.
          </p>
          <div className="kit-list">
            <span>Pliable et légère</span>
            <span>Sans toucher les déchets</span>
            <span>Maison, jardin, boutique</span>
            <span>Utile pour les parents</span>
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
          <h2>من الطلب للاستعمال في 4 خطوات</h2>
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
          <h2>عرض واضح، من غير مفاجآت</h2>
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

      <section className="section split" id="mission">
        <div className="panel dark">
          <p className="section-kicker">Mission Cleano</p>
          <h2>النظافة تبدأ من قدّام بابنا</h2>
          <p>
            Une action simple répétée par plusieurs personnes peut transformer
            une rue, une cité puis tout un quartier.
          </p>
        </div>
        <div className="panel rewards">
          <h3>Pourquoi Cleano?</h3>
          <ul>
            <li>نشجّعو المبادرة من غير لوم</li>
            <li>نخلّيو التنظيف أسهل وأسرع</li>
            <li>نبدأو بالدار والحانوت والحومة</li>
            <li>نبيّنو النتيجة قبل وبعد</li>
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
            <p>Activités جماعية ونتيجة واضحة قدّام المدرسة أو الجمعية.</p>
          </article>
        </div>
      </section>

      <section className="section order" id="order">
        <div>
          <p className="section-kicker">Commander maintenant</p>
          <h2>Prêt باش تبدأ تحدّي النظافة؟</h2>
          <p>
            Commandez directement sur le site. Nous vous appelons pour confirmer
            l'adresse. Paiement à la livraison: 43 DT au total.
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
            Produit
            <select name="package" defaultValue={packages[0].option}>
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
          <h2>Les réponses avant de commander</h2>
        </div>
        <div className="faq-grid">
          <article>
            <h3>Quel est le montant total?</h3>
            <p>
              35 DT pour la pince et 8 DT pour la livraison, soit 43 DT à payer
              au total.
            </p>
          </article>
          <article>
            <h3>Comment payer?</h3>
            <p>
              Le paiement se fait à la livraison, après confirmation de votre
              commande par téléphone.
            </p>
          </article>
          <article>
            <h3>Où utiliser la pince?</h3>
            <p>
              À la maison, au jardin, dans la boutique, sous les meubles ou pour
              ramasser des déchets sans les toucher.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
